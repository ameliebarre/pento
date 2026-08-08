// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { DesignerFilters } from "@/features/products/components/designer-filters";
import type { ProductFilters } from "@/features/products/types";

const DESIGNERS = [
  { id: "des_1", slug: "hans-j-wegner", firstName: "Hans J.", lastName: "Wegner" },
  { id: "des_2", slug: "arne-jacobsen", firstName: "Arne", lastName: "Jacobsen" },
];

const MANY_DESIGNERS = Array.from({ length: 8 }, (_, index) => ({
  id: `des_${index}`,
  slug: `designer-${index}`,
  firstName: "Designer",
  lastName: String(index),
}));

function filters(overrides: Partial<ProductFilters> = {}): ProductFilters {
  return { categories: [], designers: [], materials: [], minPrice: null, maxPrice: null, ...overrides };
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

describe("DesignerFilters", () => {
  it("renders nothing when there are no designers", () => {
    const { container } = render(<DesignerFilters designers={[]} filters={filters()} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("shows each designer's full name as a checkbox", () => {
    render(<DesignerFilters designers={DESIGNERS} filters={filters()} />);

    expect(screen.getByRole("checkbox", { name: "Hans J. Wegner" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Arne Jacobsen" })).toBeInTheDocument();
  });

  it("checks the box for an already-selected designer", () => {
    render(
      <DesignerFilters designers={DESIGNERS} filters={filters({ designers: ["hans-j-wegner"] })} />,
    );

    expect(screen.getByRole("checkbox", { name: "Hans J. Wegner" })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: "Arne Jacobsen" })).not.toBeChecked();
  });

  it("navigates to add a designer, keeping an already-selected category", async () => {
    const user = userEvent.setup();
    render(
      <DesignerFilters designers={DESIGNERS} filters={filters({ categories: ["chairs"] })} />,
    );

    await user.click(screen.getByRole("checkbox", { name: "Hans J. Wegner" }));

    expect(location.href).toBe("/products?category=chairs&designer=hans-j-wegner");
  });

  it("navigates to remove an already-selected designer", async () => {
    const user = userEvent.setup();
    render(
      <DesignerFilters designers={DESIGNERS} filters={filters({ designers: ["hans-j-wegner"] })} />,
    );

    await user.click(screen.getByRole("checkbox", { name: "Hans J. Wegner" }));

    expect(location.href).toBe("/products");
  });

  it("filters the list as the user types in the search box", async () => {
    const user = userEvent.setup();
    render(<DesignerFilters designers={DESIGNERS} filters={filters()} />);

    await user.type(screen.getByRole("searchbox", { name: "Rechercher un designer" }), "Wegner");

    expect(screen.getByRole("checkbox", { name: "Hans J. Wegner" })).toBeInTheDocument();
    expect(screen.queryByRole("checkbox", { name: "Arne Jacobsen" })).not.toBeInTheDocument();
  });

  it("shows an empty state when the search matches no designer", async () => {
    const user = userEvent.setup();
    render(<DesignerFilters designers={DESIGNERS} filters={filters()} />);

    await user.type(screen.getByRole("searchbox", { name: "Rechercher un designer" }), "zzz");

    expect(screen.getByText("Aucun designer trouvé.")).toBeInTheDocument();
  });

  it("only shows the first designers with a 'Voir plus' button beyond the visible count", () => {
    render(<DesignerFilters designers={MANY_DESIGNERS} filters={filters()} />);

    expect(screen.getAllByRole("checkbox")).toHaveLength(6);
    expect(screen.getByRole("button", { name: "Voir plus" })).toBeInTheDocument();
  });

  it("reveals the rest of the list when clicking 'Voir plus'", async () => {
    const user = userEvent.setup();
    render(<DesignerFilters designers={MANY_DESIGNERS} filters={filters()} />);

    await user.click(screen.getByRole("button", { name: "Voir plus" }));

    expect(screen.getAllByRole("checkbox")).toHaveLength(8);
    expect(screen.getByRole("button", { name: "Voir moins" })).toBeInTheDocument();
  });

  it("starts expanded when a selected designer is past the visible count", () => {
    const selectedSlug = MANY_DESIGNERS[7].slug;

    render(
      <DesignerFilters designers={MANY_DESIGNERS} filters={filters({ designers: [selectedSlug] })} />,
    );

    expect(screen.getAllByRole("checkbox")).toHaveLength(8);
    expect(screen.getByRole("checkbox", { name: "Designer 7" })).toBeChecked();
    expect(screen.getByRole("button", { name: "Voir moins" })).toBeInTheDocument();
  });

  it("does not show a reset link when no designer is selected", () => {
    render(<DesignerFilters designers={DESIGNERS} filters={filters()} />);

    expect(screen.queryByRole("link", { name: "Réinitialiser" })).not.toBeInTheDocument();
  });

  it("resets only the designer filter, keeping the category filter untouched", () => {
    render(
      <DesignerFilters
        designers={DESIGNERS}
        filters={filters({ categories: ["chairs"], designers: ["hans-j-wegner"] })}
      />,
    );

    expect(screen.getByRole("link", { name: "Réinitialiser" })).toHaveAttribute(
      "href",
      "/products?category=chairs",
    );
  });
});
