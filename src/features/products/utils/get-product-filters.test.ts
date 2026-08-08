import { describe, expect, it } from "vitest";

import { getProductFilters } from "@/features/products/utils/get-product-filters";

describe("getProductFilters", () => {
  it("returns empty filters when no search params are given", () => {
    expect(getProductFilters({})).toEqual({
      categories: [],
      designers: [],
      materials: [],
      minPrice: null,
      maxPrice: null,
      sort: null,
    });
  });

  it("wraps a single category, designer, or material value into an array", () => {
    expect(
      getProductFilters({ category: "chairs", designer: "hans-j-wegner", material: "cuir" }),
    ).toEqual({
      categories: ["chairs"],
      designers: ["hans-j-wegner"],
      materials: ["cuir"],
      minPrice: null,
      maxPrice: null,
      sort: null,
    });
  });

  it("keeps multiple category, designer, or material values as an array", () => {
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

  it("parses a valid sort value", () => {
    expect(getProductFilters({ sort: "price-asc" }).sort).toBe("price-asc");
    expect(getProductFilters({ sort: "price-desc" }).sort).toBe("price-desc");
  });

  it("ignores an invalid sort value", () => {
    expect(getProductFilters({ sort: "not-a-real-sort" }).sort).toBeNull();
  });
});
