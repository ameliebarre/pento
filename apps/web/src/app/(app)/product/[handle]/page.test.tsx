// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/lib/get-session", () => ({
  getSession: vi.fn().mockResolvedValue(null),
}));

const notFoundSentinel = new Error("NEXT_NOT_FOUND");
const mockNotFound = vi.fn(() => {
  throw notFoundSentinel;
});
vi.mock("next/navigation", () => ({
  notFound: () => mockNotFound(),
}));

vi.mock("@/lib/medusa", () => ({
  medusa: { client: { fetch: vi.fn() } },
}));

import ProductPage from "@/app/(app)/product/[handle]/page";
import { medusa } from "@/lib/medusa";
import { QueryProvider } from "@/components/query-provider";
import { CartDrawerProvider } from "@/features/cart/components/cart-drawer-provider";
import type { MedusaProduct } from "@/features/products/medusa-types";

function buildProduct(overrides: Partial<MedusaProduct> = {}): MedusaProduct {
  return {
    id: "prod_1",
    title: "Barcelona Chair",
    handle: "barcelona-chair",
    description: "Un fauteuil emblématique du design moderne.",
    created_at: "2026-01-01T00:00:00.000Z",
    images: [{ id: "img_1", url: "https://example.com/chair.jpg" }],
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

function setupMedusa(product: MedusaProduct | null) {
  vi.mocked(medusa.client.fetch).mockImplementation(async () => {
    if (!product) throw new Error("Product not found");
    return { product };
  });
}

async function renderPage(handle: string) {
  const element = await ProductPage({ params: Promise.resolve({ handle }) });

  return (
    <QueryProvider>
      <CartDrawerProvider>{element}</CartDrawerProvider>
    </QueryProvider>
  );
}

describe("ProductPage", () => {
  it("renders the product name, price, description and image", async () => {
    setupMedusa(buildProduct());

    render(await renderPage("barcelona-chair"));

    expect(screen.getByRole("heading", { name: "Barcelona Chair" })).toBeInTheDocument();
    expect(screen.getByText(/1.445,00.€/)).toBeInTheDocument();
    expect(screen.getByText("Un fauteuil emblématique du design moderne.")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Barcelona Chair" })).toBeInTheDocument();
  });

  it("shows a fallback when the product has no image", async () => {
    setupMedusa(buildProduct({ images: [] }));

    render(await renderPage("barcelona-chair"));

    expect(screen.queryByRole("img", { name: "Barcelona Chair" })).not.toBeInTheDocument();
    expect(screen.getByText("Aucune image disponible pour Barcelona Chair")).toBeInTheDocument();
  });

  it("shows the designers, movement, materials and manufacturer", async () => {
    setupMedusa(
      buildProduct({
        designers: [{ id: "des_1", slug: "mies", first_name: "Ludwig", last_name: "Mies van der Rohe" }],
        movement: { id: "mov_1", slug: "bauhaus", name: "Bauhaus" },
        materials: [{ id: "mat_1", slug: "cuir", name: "Cuir" }],
        manufacturer: { id: "man_1", slug: "knoll", name: "Knoll", country_name: "États-Unis" },
      }),
    );

    render(await renderPage("barcelona-chair"));

    expect(screen.getByText("Ludwig Mies van der Rohe")).toBeInTheDocument();
    expect(screen.getByText("Bauhaus")).toBeInTheDocument();
    expect(screen.getByText("Cuir")).toBeInTheDocument();
    expect(screen.getByText("Knoll — États-Unis")).toBeInTheDocument();
  });

  it("renders an add to cart button for the first variant", async () => {
    setupMedusa(buildProduct());

    render(await renderPage("barcelona-chair"));

    expect(screen.getByRole("button", { name: "Ajouter au panier" })).toBeInTheDocument();
  });

  it("calls notFound() when the product handle does not exist", async () => {
    setupMedusa(null);

    await expect(
      ProductPage({ params: Promise.resolve({ handle: "not-a-real-product" }) }),
    ).rejects.toThrow(notFoundSentinel);
    expect(mockNotFound).toHaveBeenCalled();
  });
});
