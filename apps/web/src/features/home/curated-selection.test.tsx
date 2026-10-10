// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/lib/medusa", () => ({
  medusa: { client: { fetch: vi.fn() } },
}));

import { CuratedSelection } from "@/features/home/curated-selection";
import { medusa } from "@/lib/medusa";
import type { MedusaProduct } from "@/features/products/medusa-types";

function buildProduct(data: {
  title: string;
  handle: string;
  price: number;
  featured: boolean;
  image?: { url: string; alt: string };
  designers?: { first_name: string; last_name: string }[];
  createdAt?: string;
}): MedusaProduct {
  return {
    id: data.handle,
    title: data.title,
    handle: data.handle,
    description: "Une pièce de collection.",
    created_at: data.createdAt ?? "2026-01-01T00:00:00.000Z",
    metadata: { featured: data.featured ? "true" : "false" },
    images: data.image ? [{ id: `${data.handle}-image`, url: data.image.url }] : [],
    categories: [],
    tags: [],
    variants: [
      {
        id: `${data.handle}-variant`,
        sku: null,
        prices: [{ currency_code: "eur", amount: data.price }],
      },
    ],
    designers: (data.designers ?? []).map((designer, index) => ({
      id: `${data.handle}-designer-${index}`,
      slug: `${data.handle}-designer-${index}`,
      first_name: designer.first_name,
      last_name: designer.last_name,
    })),
    movement: null,
    materials: [],
    manufacturer: null,
  };
}

function setupMedusa(products: MedusaProduct[]) {
  vi.mocked(medusa.client.fetch).mockImplementation(async (path: unknown) => {
    if (path === "/store/products/full") return { products };
    throw new Error(`Unexpected path: ${String(path)}`);
  });
}

describe("CuratedSelection", () => {
  it("renders nothing when there are no featured products", async () => {
    setupMedusa([]);

    const result = await CuratedSelection();

    expect(result).toBeNull();
  });

  it("only renders featured products", async () => {
    setupMedusa([
      buildProduct({ title: "Womb Chair", handle: "womb-chair", price: 4435, featured: true }),
      buildProduct({ title: "Chaise SERIE 7", handle: "serie-7", price: 558, featured: false }),
    ]);

    render(await CuratedSelection());

    expect(screen.getByText("Womb Chair")).toBeInTheDocument();
    expect(screen.queryByText("Chaise SERIE 7")).not.toBeInTheDocument();
  });

  it("shows the price and designer(s)", async () => {
    setupMedusa([
      buildProduct({
        title: "Womb Chair",
        handle: "womb-chair",
        price: 4435,
        featured: true,
        designers: [{ first_name: "Eero", last_name: "Saarinen" }],
      }),
    ]);

    render(await CuratedSelection());

    expect(screen.getByText("4 435,00 €")).toBeInTheDocument();
    expect(screen.getByText("Eero Saarinen")).toBeInTheDocument();
  });

  it("shows the cover image when one is set", async () => {
    setupMedusa([
      buildProduct({
        title: "Womb Chair",
        handle: "womb-chair",
        price: 4435,
        featured: true,
        image: {
          url: "https://res.cloudinary.com/demo/image/upload/womb-chair.jpg",
          alt: "Le fauteuil Womb Chair",
        },
      }),
    ]);

    render(await CuratedSelection());

    expect(screen.getByRole("img", { name: "Womb Chair" })).toBeInTheDocument();
  });

  it("shows a fallback when a featured product has no cover image", async () => {
    setupMedusa([
      buildProduct({ title: "Womb Chair", handle: "womb-chair", price: 4435, featured: true }),
    ]);

    render(await CuratedSelection());

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByText("Aucune image disponible pour Womb Chair")).toBeInTheDocument();
  });
});
