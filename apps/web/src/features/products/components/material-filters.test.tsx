// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const pushMock = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

import { MaterialFilters } from "@/features/products/components/material-filters";
import { FiltersNavigationProvider } from "@/features/products/components/filters-navigation";
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
  return { categories: [], designers: [], materials: [], movements: [], minPrice: null, maxPrice: null, sort: null, ...overrides };
}

function renderWithProvider(ui: React.ReactElement) {
  pushMock.mockClear();
  return render(<FiltersNavigationProvider>{ui}</FiltersNavigationProvider>);
}

describe("MaterialFilters", () => {
  it("renders nothing when there are no materials", () => {
    const { container } = renderWithProvider(<MaterialFilters materials={[]} filters={filters()} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("shows each material's name as a checkbox", () => {
    renderWithProvider(<MaterialFilters materials={MATERIALS} filters={filters()} />);

    expect(screen.getByRole("checkbox", { name: "Cuir" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Chêne massif" })).toBeInTheDocument();
  });

  it("checks the box for an already-selected material", () => {
    renderWithProvider(
      <MaterialFilters materials={MATERIALS} filters={filters({ materials: ["cuir"] })} />,
    );

    expect(screen.getByRole("checkbox", { name: "Cuir" })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: "Chêne massif" })).not.toBeChecked();
  });

  it("navigates to add a material, keeping an already-selected category", async () => {
    const user = userEvent.setup();
    renderWithProvider(
      <MaterialFilters materials={MATERIALS} filters={filters({ categories: ["chairs"] })} />,
    );

    await user.click(screen.getByRole("checkbox", { name: "Cuir" }));

    expect(pushMock).toHaveBeenCalledWith("/products?category=chairs&material=cuir&showFilters=1", {
      scroll: false,
    });
  });

  it("navigates to remove an already-selected material", async () => {
    const user = userEvent.setup();
    renderWithProvider(
      <MaterialFilters materials={MATERIALS} filters={filters({ materials: ["cuir"] })} />,
    );

    await user.click(screen.getByRole("checkbox", { name: "Cuir" }));

    expect(pushMock).toHaveBeenCalledWith("/products?showFilters=1", { scroll: false });
  });

  it("only shows the first 12 materials with a 'Voir plus' button beyond that", () => {
    renderWithProvider(<MaterialFilters materials={MANY_MATERIALS} filters={filters()} />);

    expect(screen.getAllByRole("checkbox")).toHaveLength(12);
    expect(screen.getByRole("button", { name: "Voir plus" })).toBeInTheDocument();
  });

  it("reveals the rest of the list when clicking 'Voir plus'", async () => {
    const user = userEvent.setup();
    renderWithProvider(<MaterialFilters materials={MANY_MATERIALS} filters={filters()} />);

    await user.click(screen.getByRole("button", { name: "Voir plus" }));

    expect(screen.getAllByRole("checkbox")).toHaveLength(14);
    expect(screen.getByRole("button", { name: "Voir moins" })).toBeInTheDocument();
  });

  it("starts expanded when a selected material is past the visible count", () => {
    const selectedSlug = MANY_MATERIALS[13].slug;

    renderWithProvider(
      <MaterialFilters materials={MANY_MATERIALS} filters={filters({ materials: [selectedSlug] })} />,
    );

    expect(screen.getAllByRole("checkbox")).toHaveLength(14);
    expect(screen.getByRole("checkbox", { name: "Material 13" })).toBeChecked();
    expect(screen.getByRole("button", { name: "Voir moins" })).toBeInTheDocument();
  });

  it("does not show a reset button when no material is selected", () => {
    renderWithProvider(<MaterialFilters materials={MATERIALS} filters={filters()} />);

    expect(screen.queryByRole("button", { name: "Réinitialiser" })).not.toBeInTheDocument();
  });

  it("resets only the material filter, keeping the category filter untouched", async () => {
    renderWithProvider(
      <MaterialFilters
        materials={MATERIALS}
        filters={filters({ categories: ["chairs"], materials: ["cuir"] })}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "Réinitialiser" }));
    expect(pushMock).toHaveBeenCalledWith("/products?category=chairs&showFilters=1", {
      scroll: false,
    });
  });
});
