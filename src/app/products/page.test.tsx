// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import ShopAllPage from "@/app/products/page";
import { prisma } from "@/lib/prisma";

function renderPage(category?: string | string[]) {
  return ShopAllPage({
    searchParams: Promise.resolve(category ? { category } : {}),
  });
}

async function createProduct(slug: string, name: string, categoryId?: string) {
  return prisma.product.create({
    data: { name, slug, description: "desc", price: 100, categoryId },
  });
}

async function createCategory(slug: string, name: string) {
  return prisma.category.create({ data: { name, slug } });
}

describe("ShopAllPage", () => {
  it("shows an empty state when there are no products", async () => {
    render(await renderPage());

    expect(screen.getByText("Aucun produit disponible pour le moment.")).toBeInTheDocument();
  });

  it("lists every product with a link to its detail page", async () => {
    await createProduct("shop-all-1", "Chaise Test");
    await createProduct("shop-all-2", "Table Test");

    render(await renderPage());

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

    render(await renderPage());

    const links = screen.getAllByRole("link");
    const newerIndex = links.findIndex((link) => link.textContent?.includes("Nouveau produit"));
    const olderIndex = links.findIndex((link) => link.textContent?.includes("Ancien produit"));
    expect(newerIndex).toBeLessThan(olderIndex);
  });

  it("lists every category as a filter button", async () => {
    await createCategory("chairs", "Chairs");
    await createCategory("tables", "Tables");

    render(await renderPage());

    expect(screen.getByRole("button", { name: "Chairs" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Tables" })).toBeInTheDocument();
  });

  it("only shows products from the selected category", async () => {
    const chairs = await createCategory("chairs", "Chairs");
    const tables = await createCategory("tables", "Tables");
    await createProduct("shop-all-chair", "Chaise Test", chairs.id);
    await createProduct("shop-all-table", "Table Test", tables.id);

    render(await renderPage("chairs"));

    expect(screen.getByText("Chaise Test")).toBeInTheDocument();
    expect(screen.queryByText("Table Test")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Chairs" })).toHaveAttribute("aria-pressed", "true");
  });

  it("shows products from any of the selected categories", async () => {
    const chairs = await createCategory("chairs", "Chairs");
    const tables = await createCategory("tables", "Tables");
    const sofas = await createCategory("sofas", "Sofas");
    await createProduct("shop-all-chair", "Chaise Test", chairs.id);
    await createProduct("shop-all-table", "Table Test", tables.id);
    await createProduct("shop-all-sofa", "Canapé Test", sofas.id);

    render(await renderPage(["chairs", "tables"]));

    expect(screen.getByText("Chaise Test")).toBeInTheDocument();
    expect(screen.getByText("Table Test")).toBeInTheDocument();
    expect(screen.queryByText("Canapé Test")).not.toBeInTheDocument();
  });
});
