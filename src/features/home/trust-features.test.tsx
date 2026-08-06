// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { TrustFeatures } from "@/components/trust-features";

describe("TrustFeatures", () => {
  it("renders all four trust features with their titles", () => {
    render(<TrustFeatures />);

    expect(screen.getByText("Pièces authentiques")).toBeInTheDocument();
    expect(screen.getByText("Livraison internationale")).toBeInTheDocument();
    expect(screen.getByText("Conseil personnalisé")).toBeInTheDocument();
    expect(screen.getByText("Retours offerts")).toBeInTheDocument();
  });

  it("has an accessible section heading even though it's visually hidden", () => {
    render(<TrustFeatures />);

    expect(screen.getByRole("heading", { name: "Nos engagements" })).toBeInTheDocument();
  });
});
