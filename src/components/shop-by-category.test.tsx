// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { ShopByCategory } from "@/components/shop-by-category";

describe("ShopByCategory", () => {
  it("renders a link for every category, pointing at /products/<slug>", () => {
    render(<ShopByCategory />);

    expect(screen.getByRole("heading", { name: "Shop by categories" })).toBeInTheDocument();

    const categories = [
      { label: "Sofas", slug: "sofas" },
      { label: "Armchairs", slug: "armchairs" },
      { label: "Chairs", slug: "chairs" },
      { label: "Tables", slug: "tables" },
      { label: "Lighting", slug: "lighting" },
    ];

    for (const category of categories) {
      expect(screen.getByRole("link", { name: new RegExp(category.label) })).toHaveAttribute(
        "href",
        `/products/${category.slug}`,
      );
    }
  });
});
