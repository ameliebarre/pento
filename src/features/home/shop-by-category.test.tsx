// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { ShopByCategory } from "@/features/home/shop-by-category";
import { getPayloadClient } from "@/lib/payload";
import { prisma } from "@/lib/prisma";

// Inserted directly rather than through Payload's Local API: its upload
// validation pulls in `file-type`, whose Node/browser dual build resolves
// to the browser build under Vitest's jsdom environment and can't read a
// real Node Buffer there. This test is about ShopByCategory's rendering,
// not Payload's upload pipeline, so a raw row is the more direct fixture.
async function createTestImage(alt: string) {
  const rows = await prisma.$queryRaw<{ id: number }[]>`
    INSERT INTO payload.media (alt, url, filename, mime_type, filesize, width, height)
    VALUES (${alt}, ${"/api/media/file/test.png"}, ${"test.png"}, ${"image/png"}, 90, 1, 1)
    RETURNING id;
  `;
  return rows[0];
}

async function createCategory(data: { title: string; slug: string; position: number; image?: number }) {
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
    const image = await createTestImage("Une chaise design");
    await createCategory({ title: "Chaises", slug: "chairs", position: 1, image: image.id });

    render(await ShopByCategory());

    expect(screen.getByRole("img", { name: "Une chaise design" })).toBeInTheDocument();
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
