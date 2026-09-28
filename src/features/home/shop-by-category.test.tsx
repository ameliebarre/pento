// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { ShopByCategory } from "@/features/home/shop-by-category";
import { getPayloadClient } from "@/lib/payload";

async function createCategory(data: { title: string; slug: string; position: number; image?: string }) {
  const payload = await getPayloadClient();
  return payload.create({ collection: "categories", data });
}

describe("ShopByCategory", () => {
  it("renders the heading", async () => {
    render(await ShopByCategory());

    expect(
      screen.getByRole("heading", { name: "Every corner of the home, considered." }),
    ).toBeInTheDocument();
  });

  it("renders a link to view all categories", async () => {
    render(await ShopByCategory());

    expect(screen.getByRole("link", { name: /view all categories/i })).toHaveAttribute(
      "href",
      "/products",
    );
  });

  it("renders a link for every category, pointing at /products/<slug>", async () => {
    await createCategory({ title: "Chaises", slug: "chairs", position: 1 });
    await createCategory({ title: "Tables", slug: "tables", position: 2 });

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
    await createCategory({
      title: "Chaises",
      slug: "chairs",
      position: 1,
      image: "https://res.cloudinary.com/dasujyncc/image/upload/v1/pento/categories/chairs.webp",
    });

    render(await ShopByCategory());

    expect(screen.getByRole("img", { name: "Chaises" })).toBeInTheDocument();
  });

  it("shows a fallback when a category has no cover image", async () => {
    await createCategory({ title: "Luminaires", slug: "lighting", position: 1 });

    render(await ShopByCategory());

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByText("Aucune image disponible pour Luminaires")).toBeInTheDocument();
  });

  it("only renders categories that have a slot in the curated homepage layout", async () => {
    await createCategory({ title: "Chaises", slug: "chairs", position: 1 });
    await createCategory({ title: "Hors sujet", slug: "not-in-the-layout", position: 2 });

    render(await ShopByCategory());

    expect(screen.getByRole("link", { name: /chaises/i })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /hors sujet/i })).not.toBeInTheDocument();
  });

  it("orders categories by their position field", async () => {
    await createCategory({ title: "Sofas", slug: "sofas", position: 2 });
    await createCategory({ title: "Armchairs", slug: "armchairs", position: 1 });

    render(await ShopByCategory());

    const links = screen.getAllByRole("link");
    const armchairsIndex = links.findIndex((link) => link.textContent?.includes("Armchairs"));
    const sofasIndex = links.findIndex((link) => link.textContent?.includes("Sofas"));
    expect(armchairsIndex).toBeLessThan(sofasIndex);
  });
});
