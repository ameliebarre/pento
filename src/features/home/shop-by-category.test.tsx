// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { ShopByCategory } from "@/features/home/shop-by-category";
import { prisma } from "@/lib/prisma";

describe("ShopByCategory", () => {
  it("renders the heading", async () => {
    render(await ShopByCategory());

    expect(screen.getByRole("heading", { name: "Shop by categories" })).toBeInTheDocument();
  });

  it("renders a link for every category, pointing at /products/<slug>", async () => {
    await prisma.category.create({ data: { name: "Chaises", slug: "chaises" } });
    await prisma.category.create({ data: { name: "Tables", slug: "tables" } });

    render(await ShopByCategory());

    expect(screen.getByRole("link", { name: /chaises/i })).toHaveAttribute(
      "href",
      "/products/chaises",
    );
    expect(screen.getByRole("link", { name: /tables/i })).toHaveAttribute(
      "href",
      "/products/tables",
    );
  });

  it("shows the cover image when one is set", async () => {
    const cover = await prisma.image.create({
      data: { url: "/images/chairs.png", alt: "Une chaise design" },
    });
    await prisma.category.create({
      data: { name: "Chaises", slug: "chaises", coverImageId: cover.id },
    });

    render(await ShopByCategory());

    expect(screen.getByRole("img", { name: "Une chaise design" })).toBeInTheDocument();
  });

  it("shows a fallback when a category has no cover image", async () => {
    await prisma.category.create({ data: { name: "Sans Image", slug: "sans-image" } });

    render(await ShopByCategory());

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByText("Aucune image disponible pour Sans Image")).toBeInTheDocument();
  });

  it("orders categories alphabetically by name", async () => {
    await prisma.category.create({ data: { name: "Zed", slug: "zed" } });
    await prisma.category.create({ data: { name: "Alpha", slug: "alpha" } });

    render(await ShopByCategory());

    const links = screen.getAllByRole("link");
    const alphaIndex = links.findIndex((link) => link.textContent?.includes("Alpha"));
    const zedIndex = links.findIndex((link) => link.textContent?.includes("Zed"));
    expect(alphaIndex).toBeLessThan(zedIndex);
  });
});
