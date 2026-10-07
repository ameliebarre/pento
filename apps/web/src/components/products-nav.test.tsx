// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { ProductsNav, PRODUCT_LINKS } from "@/components/products-nav";

describe("ProductsNav", () => {
  it("renders a link for every entry in PRODUCT_LINKS", () => {
    render(<ProductsNav />);

    for (const link of PRODUCT_LINKS) {
      expect(screen.getByRole("link", { name: link.label })).toHaveAttribute("href", link.href);
    }
  });

  // Regression test: PRODUCT_LINKS used to have two entries pointing to the
  // same href, and the list was keyed by href, which produced a duplicate
  // React key warning (see components/mobile-nav.tsx, keyed the same way).
  it("does not warn about duplicate React keys", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(<ProductsNav />);

    const duplicateKeyWarning = errorSpy.mock.calls.some((args) =>
      String(args[0]).includes("same key"),
    );
    expect(duplicateKeyWarning).toBe(false);

    errorSpy.mockRestore();
  });
});
