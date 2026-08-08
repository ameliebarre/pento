import { describe, expect, it } from "vitest";

import { buildProductWhere } from "@/features/products/server/build-product-filters";
import type { ProductFilters } from "@/features/products/types";

function filters(overrides: Partial<ProductFilters> = {}): ProductFilters {
  return { categories: [], designers: [], materials: [], minPrice: null, maxPrice: null, sort: null, ...overrides };
}

describe("buildProductWhere", () => {
  it("returns an empty where clause when no filter is active", () => {
    expect(buildProductWhere(filters())).toEqual({});
  });

  it("filters by category slug", () => {
    expect(buildProductWhere(filters({ categories: ["chairs"] }))).toEqual({
      category: { slug: { in: ["chairs"] } },
    });
  });

  it("filters by designer slug", () => {
    expect(buildProductWhere(filters({ designers: ["hans-j-wegner"] }))).toEqual({
      designers: { some: { designer: { slug: { in: ["hans-j-wegner"] } } } },
    });
  });

  it("filters by material slug", () => {
    expect(buildProductWhere(filters({ materials: ["cuir"] }))).toEqual({
      materials: { some: { material: { slug: { in: ["cuir"] } } } },
    });
  });

  it("filters by a minimum price only", () => {
    expect(buildProductWhere(filters({ minPrice: 500 }))).toEqual({
      price: { gte: 500 },
    });
  });

  it("filters by a maximum price only", () => {
    expect(buildProductWhere(filters({ maxPrice: 2000 }))).toEqual({
      price: { lte: 2000 },
    });
  });

  it("filters by a full price range", () => {
    expect(buildProductWhere(filters({ minPrice: 500, maxPrice: 2000 }))).toEqual({
      price: { gte: 500, lte: 2000 },
    });
  });

  it("combines category, designer, material, and price filters", () => {
    expect(
      buildProductWhere(
        filters({
          categories: ["chairs"],
          designers: ["hans-j-wegner"],
          materials: ["cuir"],
          minPrice: 500,
          maxPrice: 2000,
        }),
      ),
    ).toEqual({
      category: { slug: { in: ["chairs"] } },
      designers: { some: { designer: { slug: { in: ["hans-j-wegner"] } } } },
      materials: { some: { material: { slug: { in: ["cuir"] } } } },
      price: { gte: 500, lte: 2000 },
    });
  });
});
