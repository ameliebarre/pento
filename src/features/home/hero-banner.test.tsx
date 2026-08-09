// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { HeroBanner } from "@/features/home/hero-banner";

describe("HeroBanner", () => {
  it("renders the heading, tagline and a link to the shop", () => {
    render(<HeroBanner />);

    expect(
      screen.getByRole("heading", { name: /find the most icon design furniture/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /shop now/i })).toHaveAttribute("href", "/products");
  });

  it("renders a descriptive alt text for the background image", () => {
    render(<HeroBanner />);

    expect(
      screen.getByRole("img", { name: "Intérieur design mettant en scène du mobilier haut de gamme" }),
    ).toBeInTheDocument();
  });
});
