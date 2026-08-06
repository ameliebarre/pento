import { describe, expect, it } from "vitest";

import { buildClearFilterHref, buildToggleFilterHref } from "@/features/products/utils/build-filter-href";
import type { ProductFilters } from "@/features/products/types";

describe("buildToggleFilterHref", () => {
  it("adds a slug to an empty filter set", () => {
    const filters: ProductFilters = { categories: [], designers: [] };

    expect(buildToggleFilterHref(filters, "categories", "chairs")).toBe(
      "/products?category=chairs",
    );
  });

  it("removes an already-selected slug", () => {
    const filters: ProductFilters = { categories: ["chairs"], designers: [] };

    expect(buildToggleFilterHref(filters, "categories", "chairs")).toBe("/products");
  });

  it("preserves the other dimension's selection when toggling a category", () => {
    const filters: ProductFilters = { categories: [], designers: ["hans-j-wegner"] };

    expect(buildToggleFilterHref(filters, "categories", "chairs")).toBe(
      "/products?category=chairs&designer=hans-j-wegner",
    );
  });

  it("preserves the other dimension's selection when toggling a designer", () => {
    const filters: ProductFilters = { categories: ["chairs"], designers: [] };

    expect(buildToggleFilterHref(filters, "designers", "hans-j-wegner")).toBe(
      "/products?category=chairs&designer=hans-j-wegner",
    );
  });

  it("preserves the other dimension's selection when removing a slug from one dimension", () => {
    const filters: ProductFilters = { categories: ["chairs"], designers: ["hans-j-wegner"] };

    expect(buildToggleFilterHref(filters, "categories", "chairs")).toBe(
      "/products?designer=hans-j-wegner",
    );
  });
});

describe("buildClearFilterHref", () => {
  it("clears only the given dimension, preserving the other one", () => {
    const filters: ProductFilters = { categories: ["chairs"], designers: ["hans-j-wegner"] };

    expect(buildClearFilterHref(filters, "categories")).toBe("/products?designer=hans-j-wegner");
  });

  it("returns the bare path when clearing the only active dimension", () => {
    const filters: ProductFilters = { categories: ["chairs"], designers: [] };

    expect(buildClearFilterHref(filters, "categories")).toBe("/products");
  });
});
