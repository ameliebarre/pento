// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { Footer } from "@/components/footer";

describe("Footer", () => {
  it("renders the Pento logo linking home", () => {
    render(<Footer />);

    const logoLink = screen.getByRole("link", { name: "Pento" });
    expect(logoLink).toHaveAttribute("href", "/");
  });

  it("renders each navigation column with its links", () => {
    render(<Footer />);

    expect(screen.getByText("Shop")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Chairs" })).toHaveAttribute(
      "href",
      "/products/chairs",
    );
    expect(screen.getByText("Maison")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "The Designers" })).toBeInTheDocument();
    expect(screen.getByText("Support")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "FAQ" })).toBeInTheDocument();
  });

  it("renders the social links with accessible names", () => {
    render(<Footer />);

    expect(screen.getByRole("link", { name: "Instagram" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Facebook" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "X (Twitter)" })).toBeInTheDocument();
  });

  it("renders the copyright notice with the current year", () => {
    render(<Footer />);

    const year = new Date().getFullYear();
    expect(screen.getByText(`© ${year} Pento. All rights reserved.`)).toBeInTheDocument();
  });
});
