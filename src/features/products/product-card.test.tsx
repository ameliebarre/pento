// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { ProductCard, type ProductWithImage } from "@/components/product-card";
import { Prisma } from "@/generated/prisma/client";

function buildProduct(overrides: Partial<ProductWithImage> = {}): ProductWithImage {
  return {
    id: "product_1",
    sku: null,
    name: "Barcelona Chair",
    slug: "barcelona-chair",
    description: "A very nice chair.",
    price: new Prisma.Decimal(1445),
    currency: "EUR",
    stock: 4,
    salesCount: 0,
    featured: false,
    width: null,
    height: null,
    depth: null,
    weight: null,
    categoryId: null,
    manufacturerId: null,
    movementId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    images: [{ id: "img_1", url: "/images/armchairs.png", alt: "Barcelona Chair", productId: "product_1", createdAt: new Date() }],
    designers: [],
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

    expect(screen.queryByText(/./, { selector: ".text-muted-foreground.text-xs" })).not.toBeInTheDocument();
  });

  it("shows a single designer's full name", () => {
    const product = buildProduct({
      designers: [
        {
          productId: "product_1",
          designerId: "designer_1",
          designer: {
            id: "designer_1",
            slug: "ludwig-mies-van-der-rohe",
            firstName: "Ludwig",
            lastName: "Mies van der Rohe",
            birthDate: null,
            deathDate: null,
            nationality: null,
            biography: "",
            quote: null,
            imageId: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      ],
    });

    render(<ProductCard product={product} />);

    expect(screen.getByText("Ludwig Mies van der Rohe")).toBeInTheDocument();
  });

  it("joins multiple designers with a comma", () => {
    const designer = (id: string, firstName: string, lastName: string) => ({
      productId: "product_1",
      designerId: id,
      designer: {
        id,
        slug: id,
        firstName,
        lastName,
        birthDate: null,
        deathDate: null,
        nationality: null,
        biography: "",
        quote: null,
        imageId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const product = buildProduct({
      designers: [
        designer("d1", "Achille", "Castiglioni"),
        designer("d2", "Pier Giacomo", "Castiglioni"),
      ],
    });

    render(<ProductCard product={product} />);

    expect(screen.getByText("Achille Castiglioni, Pier Giacomo Castiglioni")).toBeInTheDocument();
  });
});
