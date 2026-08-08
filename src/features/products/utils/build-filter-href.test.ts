import { describe, expect, it } from "vitest";

import {
  buildClearFilterHref,
  buildPriceFilterHref,
  buildSortHref,
  buildToggleFilterHref,
} from "@/features/products/utils/build-filter-href";
import type { ProductFilters } from "@/features/products/types";

function filters(overrides: Partial<ProductFilters> = {}): ProductFilters {
  return { categories: [], designers: [], materials: [], minPrice: null, maxPrice: null, sort: null, ...overrides };
}

describe("buildToggleFilterHref", () => {
  it("adds a slug to an empty filter set", () => {
    expect(buildToggleFilterHref(filters(), "categories", "chairs")).toBe(
      "/products?category=chairs",
    );
  });

  it("removes an already-selected slug", () => {
    expect(buildToggleFilterHref(filters({ categories: ["chairs"] }), "categories", "chairs")).toBe(
      "/products",
    );
  });

  it("preserves the other dimension's selection when toggling a category", () => {
    expect(
      buildToggleFilterHref(filters({ designers: ["hans-j-wegner"] }), "categories", "chairs"),
    ).toBe("/products?category=chairs&designer=hans-j-wegner");
  });

  it("preserves the other dimension's selection when toggling a designer", () => {
    expect(
      buildToggleFilterHref(filters({ categories: ["chairs"] }), "designers", "hans-j-wegner"),
    ).toBe("/products?category=chairs&designer=hans-j-wegner");
  });

  it("preserves the other dimension's selection when removing a slug from one dimension", () => {
    expect(
      buildToggleFilterHref(
        filters({ categories: ["chairs"], designers: ["hans-j-wegner"] }),
        "categories",
        "chairs",
      ),
    ).toBe("/products?designer=hans-j-wegner");
  });

  it("preserves an active price range when toggling a category", () => {
    expect(
      buildToggleFilterHref(filters({ minPrice: 500, maxPrice: 2000 }), "categories", "chairs"),
    ).toBe("/products?category=chairs&minPrice=500&maxPrice=2000");
  });

  it("toggles a material, preserving categories and designers", () => {
    expect(
      buildToggleFilterHref(
        filters({ categories: ["chairs"], designers: ["hans-j-wegner"] }),
        "materials",
        "cuir",
      ),
    ).toBe("/products?category=chairs&designer=hans-j-wegner&material=cuir");
  });
});

describe("buildPriceFilterHref", () => {
  it("sets the min and max price, preserving other filters", () => {
    expect(buildPriceFilterHref(filters({ categories: ["chairs"] }), 500, 2000)).toBe(
      "/products?category=chairs&minPrice=500&maxPrice=2000",
    );
  });

  it("overwrites an already-set price range", () => {
    expect(buildPriceFilterHref(filters({ minPrice: 100, maxPrice: 1000 }), 500, 2000)).toBe(
      "/products?minPrice=500&maxPrice=2000",
    );
  });
});

describe("buildSortHref", () => {
  it("sets the sort order, preserving other filters", () => {
    expect(buildSortHref(filters({ categories: ["chairs"] }), "price-asc")).toBe(
      "/products?category=chairs&sort=price-asc",
    );
  });

  it("overwrites an already-set sort order", () => {
    expect(buildSortHref(filters({ sort: "price-asc" }), "price-desc")).toBe(
      "/products?sort=price-desc",
    );
  });
});

describe("buildClearFilterHref", () => {
  it("clears only the given dimension, preserving the other one", () => {
    expect(
      buildClearFilterHref(filters({ categories: ["chairs"], designers: ["hans-j-wegner"] }), "categories"),
    ).toBe("/products?designer=hans-j-wegner");
  });

  it("returns the bare path when clearing the only active dimension", () => {
    expect(buildClearFilterHref(filters({ categories: ["chairs"] }), "categories")).toBe(
      "/products",
    );
  });

  it("clears only the price range, preserving categories and designers", () => {
    expect(
      buildClearFilterHref(
        filters({ categories: ["chairs"], minPrice: 500, maxPrice: 2000 }),
        "price",
      ),
    ).toBe("/products?category=chairs");
  });

  it("clears only the sort order, preserving other filters", () => {
    expect(
      buildClearFilterHref(filters({ categories: ["chairs"], sort: "price-asc" }), "sort"),
    ).toBe("/products?category=chairs");
  });
});
