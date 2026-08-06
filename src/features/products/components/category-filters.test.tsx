// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { CategoryFilters } from "@/features/products/components/category-filters";
import type { ProductFilters } from "@/features/products/types";

const CATEGORIES = [
  { id: "cat_chairs", slug: "chairs", name: "Chairs" },
  { id: "cat_tables", slug: "tables", name: "Tables" },
];

function filters(overrides: Partial<ProductFilters> = {}): ProductFilters {
  return { categories: [], designers: [], ...overrides };
}

describe("CategoryFilters", () => {
  it("renders nothing when there are no categories", () => {
    const { container } = render(<CategoryFilters categories={[]} filters={filters()} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("exposes the buttons as a named group for assistive tech", () => {
    render(<CategoryFilters categories={CATEGORIES} filters={filters()} />);

    expect(screen.getByRole("group", { name: "Catégories" })).toBeInTheDocument();
  });

  it("marks unselected categories as not pressed, linking to add them to the filter", () => {
    render(<CategoryFilters categories={CATEGORIES} filters={filters()} />);

    const chairs = screen.getByRole("button", { name: "Chairs" });
    expect(chairs).toHaveAttribute("aria-pressed", "false");
    expect(chairs).toHaveAttribute("href", "/products?category=chairs");
  });

  it("marks a selected category as pressed, linking to remove it from the filter", () => {
    render(<CategoryFilters categories={CATEGORIES} filters={filters({ categories: ["chairs"] })} />);

    const chairs = screen.getByRole("button", { name: "Chairs" });
    expect(chairs).toHaveAttribute("aria-pressed", "true");
    expect(chairs).toHaveAttribute("href", "/products");
  });

  it("keeps an already-selected designer filter when toggling a category", () => {
    render(
      <CategoryFilters
        categories={CATEGORIES}
        filters={filters({ designers: ["hans-j-wegner"] })}
      />,
    );

    expect(screen.getByRole("button", { name: "Chairs" })).toHaveAttribute(
      "href",
      "/products?category=chairs&designer=hans-j-wegner",
    );
  });

  it("resets only the category filter, keeping the designer filter untouched", () => {
    render(
      <CategoryFilters
        categories={CATEGORIES}
        filters={filters({ categories: ["chairs"], designers: ["hans-j-wegner"] })}
      />,
    );

    expect(screen.getByRole("link", { name: "Réinitialiser" })).toHaveAttribute(
      "href",
      "/products?designer=hans-j-wegner",
    );
  });
});
