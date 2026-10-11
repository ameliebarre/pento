// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const pushMock = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

import { CategoryFilters } from "@/features/products/components/category-filters";
import { FiltersNavigationProvider } from "@/features/products/components/filters-navigation";
import type { ProductFilters } from "@/features/products/types";

const CATEGORIES = [
  { id: "cat_chairs", handle: "chairs", name: "Chairs" },
  { id: "cat_tables", handle: "tables", name: "Tables" },
];

function filters(overrides: Partial<ProductFilters> = {}): ProductFilters {
  return { categories: [], designers: [], materials: [], movements: [], minPrice: null, maxPrice: null, sort: null, ...overrides };
}

function renderWithProvider(ui: React.ReactElement) {
  pushMock.mockClear();
  return render(<FiltersNavigationProvider>{ui}</FiltersNavigationProvider>);
}

describe("CategoryFilters", () => {
  it("renders nothing when there are no categories", () => {
    const { container } = renderWithProvider(<CategoryFilters categories={[]} filters={filters()} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("exposes the buttons as a named group for assistive tech", () => {
    renderWithProvider(<CategoryFilters categories={CATEGORIES} filters={filters()} />);

    expect(screen.getByRole("group", { name: "Catégories" })).toBeInTheDocument();
  });

  it("marks unselected categories as not pressed, navigating to add them to the filter", async () => {
    renderWithProvider(<CategoryFilters categories={CATEGORIES} filters={filters()} />);

    const chairs = screen.getByRole("button", { name: "Chairs" });
    expect(chairs).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(chairs);
    expect(pushMock).toHaveBeenCalledWith("/products?category=chairs&showFilters=1", { scroll: false });
  });

  it("marks a selected category as pressed, navigating to remove it from the filter", async () => {
    renderWithProvider(
      <CategoryFilters categories={CATEGORIES} filters={filters({ categories: ["chairs"] })} />,
    );

    const chairs = screen.getByRole("button", { name: "Chairs" });
    expect(chairs).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(chairs);
    expect(pushMock).toHaveBeenCalledWith("/products?showFilters=1", { scroll: false });
  });

  it("keeps an already-selected designer filter when toggling a category", async () => {
    renderWithProvider(
      <CategoryFilters
        categories={CATEGORIES}
        filters={filters({ designers: ["hans-j-wegner"] })}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "Chairs" }));
    expect(pushMock).toHaveBeenCalledWith(
      "/products?category=chairs&designer=hans-j-wegner&showFilters=1",
      { scroll: false },
    );
  });

  it("resets only the category filter, keeping the designer filter untouched", async () => {
    renderWithProvider(
      <CategoryFilters
        categories={CATEGORIES}
        filters={filters({ categories: ["chairs"], designers: ["hans-j-wegner"] })}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "Réinitialiser" }));
    expect(pushMock).toHaveBeenCalledWith("/products?designer=hans-j-wegner&showFilters=1", {
      scroll: false,
    });
  });
});
