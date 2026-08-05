// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import ShopAllPage from "@/app/products/page";
import { prisma } from "@/lib/prisma";

async function createProduct(slug: string, name: string) {
  return prisma.product.create({
    data: { name, slug, description: "desc", price: 100 },
  });
}

describe("ShopAllPage", () => {
  it("shows an empty state when there are no products", async () => {
    render(await ShopAllPage());

    expect(screen.getByText("Aucun produit disponible pour le moment.")).toBeInTheDocument();
  });

  it("lists every product with a link to its detail page", async () => {
    await createProduct("shop-all-1", "Chaise Test");
    await createProduct("shop-all-2", "Table Test");

    render(await ShopAllPage());

    expect(screen.getByText("Chaise Test")).toBeInTheDocument();
    expect(screen.getByText("Table Test")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /chaise test/i })).toHaveAttribute(
      "href",
      "/product/shop-all-1",
    );
  });

  it("orders products most-recently-created first", async () => {
    await createProduct("shop-all-older", "Ancien produit");
    await new Promise((resolve) => setTimeout(resolve, 10));
    await createProduct("shop-all-newer", "Nouveau produit");

    render(await ShopAllPage());

    const links = screen.getAllByRole("link");
    const newerIndex = links.findIndex((link) => link.textContent?.includes("Nouveau produit"));
    const olderIndex = links.findIndex((link) => link.textContent?.includes("Ancien produit"));
    expect(newerIndex).toBeLessThan(olderIndex);
  });
});
