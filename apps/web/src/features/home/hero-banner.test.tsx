// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { HeroBanner } from "@/features/home/hero-banner";
import { HERO_DATA } from "@/features/home/hero-data";

describe("HeroBanner", () => {
  it("renders the heading and a link to the collection", () => {
    render(<HeroBanner />);

    expect(screen.getByRole("heading", { level: 1, name: HERO_DATA.title })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: new RegExp(HERO_DATA.ctaLabel, "i") })).toHaveAttribute(
      "href",
      HERO_DATA.ctaHref,
    );
  });

  it("renders the background photo", () => {
    render(<HeroBanner />);

    expect(screen.getByAltText(HERO_DATA.backgroundImageAlt)).toBeInTheDocument();
  });
});
