// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { HeroBanner } from "@/features/home/hero-banner";
import { getPayloadClient } from "@/lib/payload";
import { prisma } from "@/lib/prisma";

// Inserted directly rather than through Payload's Local API: its upload
// validation pulls in `file-type`, whose Node/browser dual build resolves
// to the browser build under Vitest's jsdom environment and can't read a
// real Node Buffer there. This test is about HeroBanner's rendering, not
// Payload's upload pipeline, so a raw row is the more direct fixture.
async function createTestImage(alt: string) {
  const rows = await prisma.$queryRaw<{ id: number }[]>`
    INSERT INTO payload.media (alt, url, filename, mime_type, filesize, width, height)
    VALUES (${alt}, ${"/api/media/file/test.png"}, ${"test.png"}, ${"image/png"}, 90, 1, 1)
    RETURNING id;
  `;
  return rows[0];
}

async function seedHeroBanner(overrides: {
  backgroundImage: number;
  heading?: string;
  headingAccent?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  const payload = await getPayloadClient();
  return payload.updateGlobal({
    slug: "hero-banner",
    data: {
      heading: "Timeless design,",
      headingAccent: "curated with reverence.",
      description: "From mid-century icons to contemporary masterpieces.",
      ctaLabel: "Explore the collection",
      ctaHref: "/products",
      ...overrides,
    },
  });
}

describe("HeroBanner", () => {
  it("renders the heading, tagline and a link to the shop", async () => {
    const image = await createTestImage("Intérieur design");
    await seedHeroBanner({ backgroundImage: image.id });

    render(await HeroBanner());

    expect(
      screen.getByRole("heading", { name: /timeless design, curated with reverence\./i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /explore the collection/i })).toHaveAttribute(
      "href",
      "/products",
    );
  });

  it("renders the background image from the Payload global", async () => {
    const image = await createTestImage("Intérieur design mettant en scène du mobilier haut de gamme");
    await seedHeroBanner({ backgroundImage: image.id });

    render(await HeroBanner());

    expect(
      screen.getByRole("img", { name: "Intérieur design mettant en scène du mobilier haut de gamme" }),
    ).toBeInTheDocument();
  });
});
