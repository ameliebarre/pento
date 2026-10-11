// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/lib/medusa", () => ({
  medusa: { client: { fetch: vi.fn() } },
}));

import { ShopByCategory } from "@/features/home/shop-by-category";
import { medusa } from "@/lib/medusa";
import type { MedusaProductCategory } from "@/features/products/medusa-types";

function buildCategory(
  handle: string,
  name: string,
  rank: number,
  imageUrl?: string,
): MedusaProductCategory {
  return {
    id: handle,
    handle,
    name,
    rank,
    metadata: imageUrl ? { image_url: imageUrl } : null,
  };
}

function setupMedusa(categories: MedusaProductCategory[]) {
  vi.mocked(medusa.client.fetch).mockImplementation(async (path: unknown) => {
    if (path === "/store/product-categories") return { product_categories: categories };
    throw new Error(`Unexpected path: ${String(path)}`);
  });
}

describe("ShopByCategory", () => {
  it("renders the heading", async () => {
    setupMedusa([]);
    render(await ShopByCategory());

    expect(
      screen.getByRole("heading", { name: "Every corner of the home, considered." }),
    ).toBeInTheDocument();
  });

  it("renders a link to view all categories", async () => {
    setupMedusa([]);
    render(await ShopByCategory());

    expect(screen.getByRole("link", { name: /view all categories/i })).toHaveAttribute(
      "href",
      "/products",
    );
  });

  it("renders a link for every category, pointing at /products/<handle>", async () => {
    setupMedusa([buildCategory("chairs", "Chaises", 1), buildCategory("tables", "Tables", 2)]);

    render(await ShopByCategory());

    expect(screen.getByRole("link", { name: /chaises/i })).toHaveAttribute(
      "href",
      "/products/chairs",
    );
    expect(screen.getByRole("link", { name: /tables/i })).toHaveAttribute(
      "href",
      "/products/tables",
    );
  });

  it("shows the cover image when one is set", async () => {
    setupMedusa([
      buildCategory(
        "chairs",
        "Chaises",
        1,
        "https://res.cloudinary.com/dasujyncc/image/upload/v1/pento/categories/chairs.webp",
      ),
    ]);

    render(await ShopByCategory());

    expect(screen.getByRole("img", { name: "Chaises" })).toBeInTheDocument();
  });

  it("shows a fallback when a category has no cover image", async () => {
    setupMedusa([buildCategory("lighting", "Luminaires", 1)]);

    render(await ShopByCategory());

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByText("Aucune image disponible pour Luminaires")).toBeInTheDocument();
  });

  it("only renders categories that have a slot in the curated homepage layout", async () => {
    setupMedusa([
      buildCategory("chairs", "Chaises", 1),
      buildCategory("not-in-the-layout", "Hors sujet", 2),
    ]);

    render(await ShopByCategory());

    expect(screen.getByRole("link", { name: /chaises/i })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /hors sujet/i })).not.toBeInTheDocument();
  });

  it("orders categories by their rank field", async () => {
    setupMedusa([buildCategory("sofas", "Sofas", 2), buildCategory("armchairs", "Armchairs", 1)]);

    render(await ShopByCategory());

    const links = screen.getAllByRole("link");
    const armchairsIndex = links.findIndex((link) => link.textContent?.includes("Armchairs"));
    const sofasIndex = links.findIndex((link) => link.textContent?.includes("Sofas"));
    expect(armchairsIndex).toBeLessThan(sofasIndex);
  });
});
