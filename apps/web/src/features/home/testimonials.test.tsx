// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { Testimonials } from "@/features/home/testimonials";

describe("Testimonials", () => {
  it("renders the heading", () => {
    render(<Testimonials />);

    expect(
      screen.getByRole("heading", { name: "Loved by collectors worldwide" }),
    ).toBeInTheDocument();
  });

  it("renders three testimonial cards with distinct attributions", () => {
    render(<Testimonials />);

    expect(screen.getAllByText(/Every piece feels like it has a soul/)).toHaveLength(3);
    expect(screen.getByText("Camille R.")).toBeInTheDocument();
    expect(screen.getByText("Paris")).toBeInTheDocument();
    expect(screen.getByText("Julian M.")).toBeInTheDocument();
    expect(screen.getByText("Berlin")).toBeInTheDocument();
    expect(screen.getByText("Sofia L.")).toBeInTheDocument();
    expect(screen.getByText("Milan")).toBeInTheDocument();
  });
});
