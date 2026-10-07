// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { HeroBanner } from "@/features/home/hero-banner";
import { getPayloadClient } from "@/lib/payload";

async function seedHeroBanner(overrides: {
  backgroundImageUrl?: string;
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
      backgroundImageUrl: "https://res.cloudinary.com/demo/image/upload/hero.jpg",
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
    await seedHeroBanner({});

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
    await seedHeroBanner({
      backgroundImageUrl: "https://res.cloudinary.com/demo/image/upload/living-room.jpg",
    });

    render(await HeroBanner());

    const image = screen.getByRole("img", {
      name: "Intérieur design mettant en scène du mobilier haut de gamme",
    });
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining(encodeURIComponent("https://res.cloudinary.com/demo/image/upload/living-room.jpg")),
    );
  });
});
