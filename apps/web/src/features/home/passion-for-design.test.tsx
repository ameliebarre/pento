// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { PassionForDesign } from "@/features/home/passion-for-design";
import { PASSION_FOR_DESIGN_DATA } from "@/features/home/passion-for-design-data";

describe("PassionForDesign", () => {
  it("renders the heading and every paragraph", () => {
    render(<PassionForDesign />);

    expect(
      screen.getByRole("heading", {
        name: `${PASSION_FOR_DESIGN_DATA.heading} ${PASSION_FOR_DESIGN_DATA.headingAccent}`,
      }),
    ).toBeInTheDocument();
    for (const paragraph of PASSION_FOR_DESIGN_DATA.paragraphs) {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    }
  });

  it("renders the background image", () => {
    render(<PassionForDesign />);

    const image = screen.getByRole("img", { name: PASSION_FOR_DESIGN_DATA.imageAlt });
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining(encodeURIComponent(PASSION_FOR_DESIGN_DATA.imageUrl)),
    );
  });

  it("renders every value pillar with its title and description", () => {
    render(<PassionForDesign />);

    for (const value of PASSION_FOR_DESIGN_DATA.values) {
      expect(screen.getByText(value.title)).toBeInTheDocument();
      expect(screen.getByText(value.description)).toBeInTheDocument();
    }
  });
});
