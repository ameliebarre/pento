// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("@/lib/get-session", () => ({
  getSession: vi.fn().mockResolvedValue(null),
}));

vi.mock("next/headers", () => ({
  headers: vi.fn().mockResolvedValue(new Headers()),
  cookies: vi.fn().mockResolvedValue({ get: () => undefined }),
}));

vi.mock("@/lib/medusa", () => ({
  medusa: { client: { fetch: vi.fn() } },
}));

import ShopAllPage from "@/app/(app)/products/page";
import { medusa } from "@/lib/medusa";
import { QueryProvider } from "@/components/query-provider";
import { CartDrawerProvider } from "@/features/cart/components/cart-drawer-provider";
import type {
  MedusaCategory,
  MedusaDesigner,
  MedusaMaterial,
  MedusaMovement,
  MedusaProduct,
} from "@/features/products/medusa-types";

function buildCategory(id: string, handle: string, name: string): MedusaCategory {
  return { id, handle, name };
}

function buildDesigner(id: string, slug: string, firstName: string, lastName: string): MedusaDesigner {
  return { id, slug, first_name: firstName, last_name: lastName };
}

function buildMaterial(id: string, slug: string, name: string): MedusaMaterial {
  return { id, slug, name };
}

function buildMovement(id: string, slug: string, name: string): MedusaMovement {
  return { id, slug, name };
}

function buildProduct(
  id: string,
  title: string,
  options: {
    category?: MedusaCategory;
    designer?: MedusaDesigner;
    material?: MedusaMaterial;
    movement?: MedusaMovement;
    price?: number;
    createdAt?: string;
  } = {},
): MedusaProduct {
  return {
    id,
    title,
    handle: id,
    description: "desc",
    created_at: options.createdAt ?? "2026-01-01T00:00:00.000Z",
    images: [],
    categories: options.category ? [options.category] : [],
    tags: [],
    variants: [
      { id: `${id}-variant`, sku: null, prices: [{ currency_code: "eur", amount: options.price ?? 100 }] },
    ],
    designers: options.designer ? [options.designer] : [],
    movement: options.movement ?? null,
    materials: options.material ? [options.material] : [],
    manufacturer: null,
  };
}

function setupMedusa(
  data: {
    products?: MedusaProduct[];
    designers?: MedusaDesigner[];
    materials?: MedusaMaterial[];
    movements?: MedusaMovement[];
  } = {},
) {
  vi.mocked(medusa.client.fetch).mockImplementation(async (path: unknown) => {
    if (path === "/store/products/full") return { products: data.products ?? [] };
    if (path === "/store/designers") return { designers: data.designers ?? [] };
    if (path === "/store/materials") return { materials: data.materials ?? [] };
    if (path === "/store/movements") return { movements: data.movements ?? [] };
    throw new Error(`Unexpected path: ${String(path)}`);
  });
}

async function renderPage(
  category?: string | string[],
  designer?: string | string[],
  price?: { min?: number; max?: number },
  material?: string | string[],
  extra?: Record<string, string | string[]>,
) {
  const params: Record<string, string | string[]> = { ...extra };
  if (category) params.category = category;
  if (designer) params.designer = designer;
  if (price?.min !== undefined) params.minPrice = String(price.min);
  if (price?.max !== undefined) params.maxPrice = String(price.max);
  if (material) params.material = material;
  const page = await ShopAllPage({ searchParams: Promise.resolve(params) });

  return (
    <QueryProvider>
      <CartDrawerProvider>{page}</CartDrawerProvider>
    </QueryProvider>
  );
}

async function expandSection(name: string) {
  const user = userEvent.setup();
  await user.click(screen.getByRole("button", { name }));
}

describe("ShopAllPage", () => {
  it("shows an empty state when there are no products", async () => {
    setupMedusa();
    render(await renderPage());

    expect(screen.getByText("Aucun produit disponible pour le moment.")).toBeInTheDocument();
  });

  it("lists every product with a link to its detail page", async () => {
    setupMedusa({
      products: [buildProduct("shop-all-1", "Chaise Test"), buildProduct("shop-all-2", "Table Test")],
    });

    render(await renderPage());

    expect(screen.getByText("Chaise Test")).toBeInTheDocument();
    expect(screen.getByText("Table Test")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /chaise test/i })).toHaveAttribute(
      "href",
      "/product/shop-all-1",
    );
  });

  it("orders products most-recently-created first", async () => {
    setupMedusa({
      products: [
        buildProduct("shop-all-older", "Ancien produit", { createdAt: "2026-01-01T00:00:00.000Z" }),
        buildProduct("shop-all-newer", "Nouveau produit", { createdAt: "2026-01-02T00:00:00.000Z" }),
      ],
    });

    render(await renderPage());

    const links = screen.getAllByRole("link");
    const newerIndex = links.findIndex((link) =>
      link.getAttribute("aria-label")?.includes("Nouveau produit"),
    );
    const olderIndex = links.findIndex((link) =>
      link.getAttribute("aria-label")?.includes("Ancien produit"),
    );
    expect(newerIndex).toBeLessThan(olderIndex);
  });

  it("lists every category as a filter button", async () => {
    const chairs = buildCategory("cat_chairs", "chairs", "Chairs");
    const tables = buildCategory("cat_tables", "tables", "Tables");
    setupMedusa({
      products: [
        buildProduct("p1", "Chaise", { category: chairs }),
        buildProduct("p2", "Table", { category: tables }),
      ],
    });

    render(await renderPage(undefined, undefined, undefined, undefined, { showFilters: "1" }));
    await expandSection("Catégories");

    expect(screen.getByRole("button", { name: "Chairs" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Tables" })).toBeInTheDocument();
  });

  it("only shows products from the selected category", async () => {
    const chairs = buildCategory("cat_chairs", "chairs", "Chairs");
    const tables = buildCategory("cat_tables", "tables", "Tables");
    setupMedusa({
      products: [
        buildProduct("shop-all-chair", "Chaise Test", { category: chairs }),
        buildProduct("shop-all-table", "Table Test", { category: tables }),
      ],
    });

    render(await renderPage("chairs", undefined, undefined, undefined, { showFilters: "1" }));

    expect(screen.getByText("Chaise Test")).toBeInTheDocument();
    expect(screen.queryByText("Table Test")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Chairs" })).toHaveAttribute("aria-pressed", "true");
  });

  it("shows products from any of the selected categories", async () => {
    const chairs = buildCategory("cat_chairs", "chairs", "Chairs");
    const tables = buildCategory("cat_tables", "tables", "Tables");
    const sofas = buildCategory("cat_sofas", "sofas", "Sofas");
    setupMedusa({
      products: [
        buildProduct("shop-all-chair", "Chaise Test", { category: chairs }),
        buildProduct("shop-all-table", "Table Test", { category: tables }),
        buildProduct("shop-all-sofa", "Canapé Test", { category: sofas }),
      ],
    });

    render(await renderPage(["chairs", "tables"]));

    expect(screen.getByText("Chaise Test")).toBeInTheDocument();
    expect(screen.getByText("Table Test")).toBeInTheDocument();
    expect(screen.queryByText("Canapé Test")).not.toBeInTheDocument();
  });

  it("lists every designer as a filter checkbox", async () => {
    const wegner = buildDesigner("des_wegner", "hans-j-wegner", "Hans J.", "Wegner");
    setupMedusa({ designers: [wegner] });

    render(await renderPage(undefined, undefined, undefined, undefined, { showFilters: "1" }));
    await expandSection("Designers");

    expect(screen.getByRole("checkbox", { name: "Hans J. Wegner" })).toBeInTheDocument();
  });

  it("only shows products from the selected designer", async () => {
    const wegner = buildDesigner("des_wegner", "hans-j-wegner", "Hans J.", "Wegner");
    const jacobsen = buildDesigner("des_jacobsen", "arne-jacobsen", "Arne", "Jacobsen");
    setupMedusa({
      products: [
        buildProduct("shop-all-wegner", "Wishbone Chair", { designer: wegner }),
        buildProduct("shop-all-jacobsen", "Egg Chair", { designer: jacobsen }),
      ],
      designers: [wegner, jacobsen],
    });

    render(
      await renderPage(undefined, "hans-j-wegner", undefined, undefined, { showFilters: "1" }),
    );

    expect(screen.getByText("Wishbone Chair")).toBeInTheDocument();
    expect(screen.queryByText("Egg Chair")).not.toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Hans J. Wegner" })).toBeChecked();
  });

  it("combines a category filter and a designer filter", async () => {
    const chairs = buildCategory("cat_chairs", "chairs", "Chairs");
    const tables = buildCategory("cat_tables", "tables", "Tables");
    const wegner = buildDesigner("des_wegner", "hans-j-wegner", "Hans J.", "Wegner");
    setupMedusa({
      products: [
        buildProduct("shop-all-matching", "Wishbone Chair", { category: chairs, designer: wegner }),
        buildProduct("shop-all-wrong-category", "CH327 Table", { category: tables, designer: wegner }),
      ],
    });

    render(await renderPage("chairs", "hans-j-wegner"));

    expect(screen.getByText("Wishbone Chair")).toBeInTheDocument();
    expect(screen.queryByText("CH327 Table")).not.toBeInTheDocument();
  });

  it("keeps the designer filter when resetting the category filter", async () => {
    const chairs = buildCategory("cat_chairs", "chairs", "Chairs");
    const wegner = buildDesigner("des_wegner", "hans-j-wegner", "Hans J.", "Wegner");
    setupMedusa({
      products: [buildProduct("p1", "Wishbone Chair", { category: chairs, designer: wegner })],
      designers: [wegner],
    });

    render(
      await renderPage("chairs", "hans-j-wegner", undefined, undefined, { showFilters: "1" }),
    );

    const resetLinks = screen.getAllByRole("link", { name: "Réinitialiser" });
    const categoryReset = resetLinks.find((link) =>
      link.getAttribute("href")?.startsWith("/products?designer"),
    );
    expect(categoryReset).toHaveAttribute(
      "href",
      "/products?designer=hans-j-wegner&showFilters=1",
    );
  });

  it("shows the price slider bounded by the catalog's actual min and max price", async () => {
    setupMedusa({
      products: [
        buildProduct("shop-all-cheap", "Petite lampe", { price: 100 }),
        buildProduct("shop-all-expensive", "Grand canapé", { price: 3000 }),
      ],
    });

    render(await renderPage(undefined, undefined, undefined, undefined, { showFilters: "1" }));
    await expandSection("Prix");

    expect(screen.getByRole("slider", { name: "Prix minimum" })).toHaveAttribute(
      "aria-valuenow",
      "100",
    );
    expect(screen.getByRole("slider", { name: "Prix maximum" })).toHaveAttribute(
      "aria-valuenow",
      "3000",
    );
  });

  it("only shows products within the selected price range", async () => {
    setupMedusa({
      products: [
        buildProduct("shop-all-cheap", "Petite lampe", { price: 100 }),
        buildProduct("shop-all-mid", "Chaise Test", { price: 1000 }),
        buildProduct("shop-all-expensive", "Grand canapé", { price: 3000 }),
      ],
    });

    render(await renderPage(undefined, undefined, { min: 500, max: 1500 }));

    expect(screen.getByText("Chaise Test")).toBeInTheDocument();
    expect(screen.queryByText("Petite lampe")).not.toBeInTheDocument();
    expect(screen.queryByText("Grand canapé")).not.toBeInTheDocument();
  });

  it("combines a price filter with a category filter", async () => {
    const chairs = buildCategory("cat_chairs", "chairs", "Chairs");
    const tables = buildCategory("cat_tables", "tables", "Tables");
    setupMedusa({
      products: [
        buildProduct("shop-all-matching", "Chaise Test", { category: chairs, price: 1000 }),
        buildProduct("shop-all-wrong-category", "Table Test", { category: tables, price: 1000 }),
        buildProduct("shop-all-wrong-price", "Chaise Chère", { category: chairs, price: 3000 }),
      ],
    });

    render(await renderPage("chairs", undefined, { min: 500, max: 1500 }));

    expect(screen.getByText("Chaise Test")).toBeInTheDocument();
    expect(screen.queryByText("Table Test")).not.toBeInTheDocument();
    expect(screen.queryByText("Chaise Chère")).not.toBeInTheDocument();
  });

  it("lists every material as a filter checkbox", async () => {
    const leather = buildMaterial("mat_cuir", "cuir", "Cuir");
    const oak = buildMaterial("mat_chene", "chene-massif", "Chêne massif");
    setupMedusa({ materials: [leather, oak] });

    render(await renderPage(undefined, undefined, undefined, undefined, { showFilters: "1" }));
    await expandSection("Matériaux");

    expect(screen.getByRole("checkbox", { name: "Cuir" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Chêne massif" })).toBeInTheDocument();
  });

  it("only shows products with the selected material", async () => {
    const leather = buildMaterial("mat_cuir", "cuir", "Cuir");
    const oak = buildMaterial("mat_chene", "chene-massif", "Chêne massif");
    setupMedusa({
      products: [
        buildProduct("shop-all-leather", "Fauteuil Cuir", { material: leather }),
        buildProduct("shop-all-oak", "Table Chêne", { material: oak }),
      ],
      materials: [leather, oak],
    });

    render(await renderPage(undefined, undefined, undefined, "cuir", { showFilters: "1" }));

    expect(screen.getByText("Fauteuil Cuir")).toBeInTheDocument();
    expect(screen.queryByText("Table Chêne")).not.toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Cuir" })).toBeChecked();
  });

  it("combines a material filter with a category filter", async () => {
    const chairs = buildCategory("cat_chairs", "chairs", "Chairs");
    const tables = buildCategory("cat_tables", "tables", "Tables");
    const leather = buildMaterial("mat_cuir", "cuir", "Cuir");
    setupMedusa({
      products: [
        buildProduct("shop-all-matching", "Fauteuil Cuir", { category: chairs, material: leather }),
        buildProduct("shop-all-wrong-category", "Table Cuir", { category: tables, material: leather }),
      ],
    });

    render(await renderPage("chairs", undefined, undefined, "cuir"));

    expect(screen.getByText("Fauteuil Cuir")).toBeInTheDocument();
    expect(screen.queryByText("Table Cuir")).not.toBeInTheDocument();
  });

  it("lists every movement as a filter checkbox", async () => {
    const bauhaus = buildMovement("mov_bauhaus", "bauhaus", "Bauhaus");
    const midCentury = buildMovement("mov_mid", "mid-century", "Mid-Century");
    setupMedusa({ movements: [bauhaus, midCentury] });

    render(await renderPage(undefined, undefined, undefined, undefined, { showFilters: "1" }));
    await expandSection("Mouvements");

    expect(screen.getByRole("checkbox", { name: "Bauhaus" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Mid-Century" })).toBeInTheDocument();
  });

  it("only shows products with the selected movement", async () => {
    const bauhaus = buildMovement("mov_bauhaus", "bauhaus", "Bauhaus");
    const midCentury = buildMovement("mov_mid", "mid-century", "Mid-Century");
    setupMedusa({
      products: [
        buildProduct("shop-all-bauhaus", "Chaise Bauhaus", { movement: bauhaus }),
        buildProduct("shop-all-mid-century", "Chaise Mid-Century", { movement: midCentury }),
      ],
      movements: [bauhaus, midCentury],
    });

    render(
      await renderPage(undefined, undefined, undefined, undefined, {
        movement: "bauhaus",
        showFilters: "1",
      }),
    );

    expect(screen.getByText("Chaise Bauhaus")).toBeInTheDocument();
    expect(screen.queryByText("Chaise Mid-Century")).not.toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Bauhaus" })).toBeChecked();
  });

  it("combines a movement filter with a category filter", async () => {
    const chairs = buildCategory("cat_chairs", "chairs", "Chairs");
    const tables = buildCategory("cat_tables", "tables", "Tables");
    const bauhaus = buildMovement("mov_bauhaus", "bauhaus", "Bauhaus");
    setupMedusa({
      products: [
        buildProduct("shop-all-matching", "Chaise Bauhaus", { category: chairs, movement: bauhaus }),
        buildProduct("shop-all-wrong-category", "Table Bauhaus", { category: tables, movement: bauhaus }),
      ],
    });

    render(await renderPage("chairs", undefined, undefined, undefined, { movement: "bauhaus" }));

    expect(screen.getByText("Chaise Bauhaus")).toBeInTheDocument();
    expect(screen.queryByText("Table Bauhaus")).not.toBeInTheDocument();
  });

  it("sorts products by price ascending", async () => {
    setupMedusa({
      products: [
        buildProduct("shop-all-mid", "Milieu", { price: 1000 }),
        buildProduct("shop-all-cheap", "Pas cher", { price: 100 }),
        buildProduct("shop-all-expensive", "Cher", { price: 3000 }),
      ],
    });

    render(await renderPage(undefined, undefined, undefined, undefined, { sort: "price-asc" }));

    const links = screen.getAllByRole("link");
    const order = ["Pas cher", "Milieu", "Cher"].map((name) =>
      links.findIndex((link) => link.getAttribute("aria-label")?.includes(name)),
    );
    expect(order).toEqual([...order].sort((a, b) => a - b));
  });

  it("sorts products by price descending", async () => {
    setupMedusa({
      products: [
        buildProduct("shop-all-mid", "Milieu", { price: 1000 }),
        buildProduct("shop-all-cheap", "Pas cher", { price: 100 }),
        buildProduct("shop-all-expensive", "Cher", { price: 3000 }),
      ],
    });

    render(await renderPage(undefined, undefined, undefined, undefined, { sort: "price-desc" }));

    const links = screen.getAllByRole("link");
    const order = ["Cher", "Milieu", "Pas cher"].map((name) =>
      links.findIndex((link) => link.getAttribute("aria-label")?.includes(name)),
    );
    expect(order).toEqual([...order].sort((a, b) => a - b));
  });

  it("hides the filters column and shows an 'Afficher les filtres' link by default", async () => {
    setupMedusa();
    render(await renderPage());

    expect(screen.queryByLabelText("Filtres")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Afficher les filtres" })).toHaveAttribute(
      "href",
      "/products?showFilters=1",
    );
  });

  it("shows the filters column and a 'Masquer les filtres' link when showFilters=1", async () => {
    setupMedusa();
    render(await renderPage(undefined, undefined, undefined, undefined, { showFilters: "1" }));

    expect(screen.getByLabelText("Filtres")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Masquer les filtres" })).toHaveAttribute(
      "href",
      "/products",
    );
  });

  it("keeps other filters when toggling the filters column visibility", async () => {
    const chairs = buildCategory("cat_chairs", "chairs", "Chairs");
    setupMedusa({ products: [buildProduct("p1", "Chaise", { category: chairs })] });

    render(await renderPage("chairs"));

    expect(screen.getByRole("link", { name: "Afficher les filtres" })).toHaveAttribute(
      "href",
      "/products?category=chairs&showFilters=1",
    );
  });
});
