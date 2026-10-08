// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { ProductCard } from "@/features/products/components/product-card";
import type { MedusaProduct } from "@/features/products/medusa-types";

function buildProduct(overrides: Partial<MedusaProduct> = {}): MedusaProduct {
  return {
    id: "prod_1",
    title: "Barcelona Chair",
    handle: "barcelona-chair",
    description: "A very nice chair.",
    created_at: "2026-01-01T00:00:00.000Z",
    images: [{ id: "img_1", url: "/images/armchairs.png" }],
    categories: [],
    tags: [],
    variants: [{ id: "variant_1", sku: null, prices: [{ currency_code: "eur", amount: 1445 }] }],
    designers: [],
    movement: null,
    materials: [],
    manufacturer: null,
    ...overrides,
  };
}

describe("ProductCard", () => {
  it("renders the product name, formatted price and image", () => {
    render(<ProductCard product={buildProduct()} />);

    expect(screen.getByText("Barcelona Chair")).toBeInTheDocument();
    expect(screen.getByText(/1.445,00.€/)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Barcelona Chair" })).toBeInTheDocument();
  });

  it("links to the product detail page", () => {
    render(<ProductCard product={buildProduct()} />);

    expect(screen.getByRole("link")).toHaveAttribute("href", "/product/barcelona-chair");
  });

  it("shows a fallback when the product has no image", () => {
    render(<ProductCard product={buildProduct({ images: [] })} />);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByText("Aucune image disponible pour Barcelona Chair")).toBeInTheDocument();
  });

  it("does not show a designer line when the product has no designer", () => {
    render(<ProductCard product={buildProduct()} />);

    expect(
      screen.queryByText(/./, { selector: ".text-muted-foreground.text-xs" }),
    ).not.toBeInTheDocument();
  });

  it("shows a single designer's full name", () => {
    const product = buildProduct({
      designers: [
        { id: "designer_1", slug: "ludwig-mies-van-der-rohe", first_name: "Ludwig", last_name: "Mies van der Rohe" },
      ],
    });

    render(<ProductCard product={product} />);

    expect(screen.getByText("Ludwig Mies van der Rohe")).toBeInTheDocument();
  });

  it("joins multiple designers with a comma", () => {
    const product = buildProduct({
      designers: [
        { id: "d1", slug: "achille-castiglioni", first_name: "Achille", last_name: "Castiglioni" },
        { id: "d2", slug: "pier-giacomo-castiglioni", first_name: "Pier Giacomo", last_name: "Castiglioni" },
      ],
    });

    render(<ProductCard product={product} />);

    expect(screen.getByText("Achille Castiglioni, Pier Giacomo Castiglioni")).toBeInTheDocument();
  });
});
