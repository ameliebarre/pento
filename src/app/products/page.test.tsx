// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import ShopAllPage from "@/app/products/page";
import { prisma } from "@/lib/prisma";

function renderPage(category?: string | string[], designer?: string | string[]) {
  const params: Record<string, string | string[]> = {};
  if (category) params.category = category;
  if (designer) params.designer = designer;
  return ShopAllPage({ searchParams: Promise.resolve(params) });
}

async function createProduct(
  slug: string,
  name: string,
  categoryId?: string,
  designerId?: string,
) {
  const product = await prisma.product.create({
    data: { name, slug, description: "desc", price: 100, categoryId },
  });
  if (designerId) {
    await prisma.productDesigner.create({ data: { productId: product.id, designerId } });
  }
  return product;
}

async function createCategory(slug: string, name: string) {
  return prisma.category.create({ data: { name, slug } });
}

async function createDesigner(slug: string, firstName: string, lastName: string) {
  return prisma.designer.create({
    data: { slug, firstName, lastName, biography: "" },
  });
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

  it("lists every designer as a filter checkbox", async () => {
    await createDesigner("hans-j-wegner", "Hans J.", "Wegner");

    render(await renderPage());

    expect(screen.getByRole("checkbox", { name: "Hans J. Wegner" })).toBeInTheDocument();
  });

  it("only shows products from the selected designer", async () => {
    const wegner = await createDesigner("hans-j-wegner", "Hans J.", "Wegner");
    const jacobsen = await createDesigner("arne-jacobsen", "Arne", "Jacobsen");
    await createProduct("shop-all-wegner", "Wishbone Chair", undefined, wegner.id);
    await createProduct("shop-all-jacobsen", "Egg Chair", undefined, jacobsen.id);

    render(await renderPage(undefined, "hans-j-wegner"));

    expect(screen.getByText("Wishbone Chair")).toBeInTheDocument();
    expect(screen.queryByText("Egg Chair")).not.toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Hans J. Wegner" })).toBeChecked();
  });

  it("combines a category filter and a designer filter", async () => {
    const chairs = await createCategory("chairs", "Chairs");
    const tables = await createCategory("tables", "Tables");
    const wegner = await createDesigner("hans-j-wegner", "Hans J.", "Wegner");
    await createProduct("shop-all-matching", "Wishbone Chair", chairs.id, wegner.id);
    await createProduct("shop-all-wrong-category", "CH327 Table", tables.id, wegner.id);

    render(await renderPage("chairs", "hans-j-wegner"));

    expect(screen.getByText("Wishbone Chair")).toBeInTheDocument();
    expect(screen.queryByText("CH327 Table")).not.toBeInTheDocument();
  });

  it("keeps the designer filter when resetting the category filter", async () => {
    await createCategory("chairs", "Chairs");
    await createDesigner("hans-j-wegner", "Hans J.", "Wegner");

    render(await renderPage("chairs", "hans-j-wegner"));

    const resetLinks = screen.getAllByRole("link", { name: "Réinitialiser" });
    const categoryReset = resetLinks.find((link) =>
      link.getAttribute("href")?.startsWith("/products?designer"),
    );
    expect(categoryReset).toHaveAttribute("href", "/products?designer=hans-j-wegner");
  });
});
