// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { CategoryFilters } from "@/components/category-filters";

const CATEGORIES = [
  { id: "cat_chairs", slug: "chairs", name: "Chairs" },
  { id: "cat_tables", slug: "tables", name: "Tables" },
];

describe("CategoryFilters", () => {
  it("renders nothing when there are no categories", () => {
    const { container } = render(<CategoryFilters categories={[]} selectedCategories={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("exposes the buttons as a named group for assistive tech", () => {
    render(<CategoryFilters categories={CATEGORIES} selectedCategories={[]} />);

    const group = screen.getByRole("group", { name: "Filtrer par catégorie" });
    expect(group).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Chairs" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Tables" })).toBeInTheDocument();
  });

  it("marks unselected categories as not pressed, linking to add them to the filter", () => {
    render(<CategoryFilters categories={CATEGORIES} selectedCategories={[]} />);

    const chairs = screen.getByRole("button", { name: "Chairs" });
    expect(chairs).toHaveAttribute("aria-pressed", "false");
    expect(chairs).toHaveAttribute("href", "/products?category=chairs");
  });

  it("marks a selected category as pressed, linking to remove it from the filter", () => {
    render(<CategoryFilters categories={CATEGORIES} selectedCategories={["chairs"]} />);

    const chairs = screen.getByRole("button", { name: "Chairs" });
    expect(chairs).toHaveAttribute("aria-pressed", "true");
    expect(chairs).toHaveAttribute("href", "/products");
  });

  it("links an unselected category so it adds to the other already-selected categories", () => {
    render(<CategoryFilters categories={CATEGORIES} selectedCategories={["chairs"]} />);

    const tables = screen.getByRole("button", { name: "Tables" });
    expect(tables).toHaveAttribute("href", "/products?category=chairs&category=tables");
  });

  it("does not show a reset link when no category is selected", () => {
    render(<CategoryFilters categories={CATEGORIES} selectedCategories={[]} />);

    expect(screen.queryByRole("link", { name: "Réinitialiser" })).not.toBeInTheDocument();
  });

  it("shows a reset link back to the unfiltered page when a category is selected", () => {
    render(<CategoryFilters categories={CATEGORIES} selectedCategories={["chairs"]} />);

    expect(screen.getByRole("link", { name: "Réinitialiser" })).toHaveAttribute(
      "href",
      "/products",
    );
  });
});
