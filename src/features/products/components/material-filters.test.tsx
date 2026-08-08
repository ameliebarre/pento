// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { MaterialFilters } from "@/features/products/components/material-filters";
import type { ProductFilters } from "@/features/products/types";

const MATERIALS = [
  { id: "mat_1", slug: "cuir", name: "Cuir" },
  { id: "mat_2", slug: "chene-massif", name: "Chêne massif" },
];

const MANY_MATERIALS = Array.from({ length: 14 }, (_, index) => ({
  id: `mat_${index}`,
  slug: `material-${index}`,
  name: `Material ${index}`,
}));

function filters(overrides: Partial<ProductFilters> = {}): ProductFilters {
  return { categories: [], designers: [], materials: [], minPrice: null, maxPrice: null, sort: null, ...overrides };
}

let location: { href: string };

beforeEach(() => {
  // Checkbox selection navigates via `location.href =`, not next/link,
  // so it needs a writable stub here instead of a real (jsdom-unsupported) navigation.
  location = { href: "" };
  vi.stubGlobal("location", location);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("MaterialFilters", () => {
  it("renders nothing when there are no materials", () => {
    const { container } = render(<MaterialFilters materials={[]} filters={filters()} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("shows each material's name as a checkbox", () => {
    render(<MaterialFilters materials={MATERIALS} filters={filters()} />);

    expect(screen.getByRole("checkbox", { name: "Cuir" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Chêne massif" })).toBeInTheDocument();
  });

  it("checks the box for an already-selected material", () => {
    render(<MaterialFilters materials={MATERIALS} filters={filters({ materials: ["cuir"] })} />);

    expect(screen.getByRole("checkbox", { name: "Cuir" })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: "Chêne massif" })).not.toBeChecked();
  });

  it("navigates to add a material, keeping an already-selected category", async () => {
    const user = userEvent.setup();
    render(<MaterialFilters materials={MATERIALS} filters={filters({ categories: ["chairs"] })} />);

    await user.click(screen.getByRole("checkbox", { name: "Cuir" }));

    expect(location.href).toBe("/products?category=chairs&material=cuir");
  });

  it("navigates to remove an already-selected material", async () => {
    const user = userEvent.setup();
    render(<MaterialFilters materials={MATERIALS} filters={filters({ materials: ["cuir"] })} />);

    await user.click(screen.getByRole("checkbox", { name: "Cuir" }));

    expect(location.href).toBe("/products");
  });

  it("only shows the first 12 materials with a 'Voir plus' button beyond that", () => {
    render(<MaterialFilters materials={MANY_MATERIALS} filters={filters()} />);

    expect(screen.getAllByRole("checkbox")).toHaveLength(12);
    expect(screen.getByRole("button", { name: "Voir plus" })).toBeInTheDocument();
  });

  it("reveals the rest of the list when clicking 'Voir plus'", async () => {
    const user = userEvent.setup();
    render(<MaterialFilters materials={MANY_MATERIALS} filters={filters()} />);

    await user.click(screen.getByRole("button", { name: "Voir plus" }));

    expect(screen.getAllByRole("checkbox")).toHaveLength(14);
    expect(screen.getByRole("button", { name: "Voir moins" })).toBeInTheDocument();
  });

  it("starts expanded when a selected material is past the visible count", () => {
    const selectedSlug = MANY_MATERIALS[13].slug;

    render(
      <MaterialFilters materials={MANY_MATERIALS} filters={filters({ materials: [selectedSlug] })} />,
    );

    expect(screen.getAllByRole("checkbox")).toHaveLength(14);
    expect(screen.getByRole("checkbox", { name: "Material 13" })).toBeChecked();
    expect(screen.getByRole("button", { name: "Voir moins" })).toBeInTheDocument();
  });

  it("does not show a reset link when no material is selected", () => {
    render(<MaterialFilters materials={MATERIALS} filters={filters()} />);

    expect(screen.queryByRole("link", { name: "Réinitialiser" })).not.toBeInTheDocument();
  });

  it("resets only the material filter, keeping the category filter untouched", () => {
    render(
      <MaterialFilters
        materials={MATERIALS}
        filters={filters({ categories: ["chairs"], materials: ["cuir"] })}
      />,
    );

    expect(screen.getByRole("link", { name: "Réinitialiser" })).toHaveAttribute(
      "href",
      "/products?category=chairs",
    );
  });
});
