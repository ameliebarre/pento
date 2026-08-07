import { describe, expect, it } from "vitest";

import { getProductFilters } from "@/features/products/utils/get-product-filters";

describe("getProductFilters", () => {
  it("returns empty filters when no search params are given", () => {
    expect(getProductFilters({})).toEqual({
      categories: [],
      designers: [],
      minPrice: null,
      maxPrice: null,
    });
  });

  it("wraps a single category or designer value into an array", () => {
    expect(getProductFilters({ category: "chairs", designer: "hans-j-wegner" })).toEqual({
      categories: ["chairs"],
      designers: ["hans-j-wegner"],
      minPrice: null,
      maxPrice: null,
    });
  });

  it("keeps multiple category or designer values as an array", () => {
    const filters = getProductFilters({ category: ["chairs", "tables"] });

    expect(filters.categories).toEqual(["chairs", "tables"]);
  });

  it("parses minPrice and maxPrice as numbers", () => {
    const filters = getProductFilters({ minPrice: "500", maxPrice: "2000" });

    expect(filters.minPrice).toBe(500);
    expect(filters.maxPrice).toBe(2000);
  });

  it("ignores a non-numeric minPrice or maxPrice", () => {
    const filters = getProductFilters({ minPrice: "not-a-number", maxPrice: "2000" });

    expect(filters.minPrice).toBeNull();
    expect(filters.maxPrice).toBe(2000);
  });
});
