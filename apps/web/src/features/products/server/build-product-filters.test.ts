import { describe, expect, it } from "vitest";

import { filterAndSortProducts } from "@/features/products/server/build-product-filters";
import type { MedusaProduct } from "@/features/products/medusa-types";
import type { ProductFilters } from "@/features/products/types";

function filters(overrides: Partial<ProductFilters> = {}): ProductFilters {
  return {
    categories: [],
    designers: [],
    materials: [],
    movements: [],
    minPrice: null,
    maxPrice: null,
    sort: null,
    ...overrides,
  };
}

function product(overrides: Partial<MedusaProduct> = {}): MedusaProduct {
  return {
    id: "prod_1",
    title: "Chaise Test",
    handle: "chaise-test",
    description: "",
    created_at: "2026-01-01T00:00:00.000Z",
    images: [],
    categories: [],
    tags: [],
    variants: [{ id: "variant_1", sku: null, prices: [{ currency_code: "eur", amount: 1000 }] }],
    designers: [],
    movement: null,
    materials: [],
    manufacturer: null,
    ...overrides,
  };
}

describe("filterAndSortProducts", () => {
  it("keeps every product when no filter is active", () => {
    const products = [product({ id: "a" }), product({ id: "b" })];

    expect(filterAndSortProducts(products, filters())).toHaveLength(2);
  });

  it("filters by category handle", () => {
    const matching = product({ id: "a", categories: [{ id: "cat_1", handle: "chairs", name: "Chairs" }] });
    const other = product({ id: "b", categories: [{ id: "cat_2", handle: "tables", name: "Tables" }] });

    const result = filterAndSortProducts([matching, other], filters({ categories: ["chairs"] }));

    expect(result.map((p) => p.id)).toEqual(["a"]);
  });

  it("filters by designer slug", () => {
    const matching = product({
      id: "a",
      designers: [{ id: "des_1", slug: "hans-j-wegner", first_name: "Hans J.", last_name: "Wegner" }],
    });
    const other = product({ id: "b", designers: [] });

    const result = filterAndSortProducts([matching, other], filters({ designers: ["hans-j-wegner"] }));

    expect(result.map((p) => p.id)).toEqual(["a"]);
  });

  it("filters by material slug", () => {
    const matching = product({ id: "a", materials: [{ id: "mat_1", slug: "cuir", name: "Cuir" }] });
    const other = product({ id: "b", materials: [] });

    const result = filterAndSortProducts([matching, other], filters({ materials: ["cuir"] }));

    expect(result.map((p) => p.id)).toEqual(["a"]);
  });

  it("filters by movement slug", () => {
    const matching = product({ id: "a", movement: { id: "mov_1", slug: "bauhaus", name: "Bauhaus" } });
    const other = product({ id: "b", movement: null });

    const result = filterAndSortProducts([matching, other], filters({ movements: ["bauhaus"] }));

    expect(result.map((p) => p.id)).toEqual(["a"]);
  });

  it("filters by a minimum price only", () => {
    const cheap = product({ id: "a", variants: [{ id: "v1", sku: null, prices: [{ currency_code: "eur", amount: 100 }] }] });
    const expensive = product({ id: "b", variants: [{ id: "v2", sku: null, prices: [{ currency_code: "eur", amount: 2000 }] }] });

    const result = filterAndSortProducts([cheap, expensive], filters({ minPrice: 500 }));

    expect(result.map((p) => p.id)).toEqual(["b"]);
  });

  it("filters by a maximum price only", () => {
    const cheap = product({ id: "a", variants: [{ id: "v1", sku: null, prices: [{ currency_code: "eur", amount: 100 }] }] });
    const expensive = product({ id: "b", variants: [{ id: "v2", sku: null, prices: [{ currency_code: "eur", amount: 2000 }] }] });

    const result = filterAndSortProducts([cheap, expensive], filters({ maxPrice: 500 }));

    expect(result.map((p) => p.id)).toEqual(["a"]);
  });

  it("filters by a full price range", () => {
    const cheap = product({ id: "a", variants: [{ id: "v1", sku: null, prices: [{ currency_code: "eur", amount: 100 }] }] });
    const mid = product({ id: "b", variants: [{ id: "v2", sku: null, prices: [{ currency_code: "eur", amount: 1000 }] }] });
    const expensive = product({ id: "c", variants: [{ id: "v3", sku: null, prices: [{ currency_code: "eur", amount: 3000 }] }] });

    const result = filterAndSortProducts([cheap, mid, expensive], filters({ minPrice: 500, maxPrice: 1500 }));

    expect(result.map((p) => p.id)).toEqual(["b"]);
  });

  it("combines category, designer, material, movement, and price filters", () => {
    const matching = product({
      id: "a",
      categories: [{ id: "cat_1", handle: "chairs", name: "Chairs" }],
      designers: [{ id: "des_1", slug: "hans-j-wegner", first_name: "Hans J.", last_name: "Wegner" }],
      materials: [{ id: "mat_1", slug: "cuir", name: "Cuir" }],
      movement: { id: "mov_1", slug: "bauhaus", name: "Bauhaus" },
      variants: [{ id: "v1", sku: null, prices: [{ currency_code: "eur", amount: 1000 }] }],
    });
    const wrongCategory = product({
      id: "b",
      categories: [{ id: "cat_2", handle: "tables", name: "Tables" }],
      designers: matching.designers,
      materials: matching.materials,
      movement: matching.movement,
      variants: matching.variants,
    });

    const result = filterAndSortProducts(
      [matching, wrongCategory],
      filters({
        categories: ["chairs"],
        designers: ["hans-j-wegner"],
        materials: ["cuir"],
        movements: ["bauhaus"],
        minPrice: 500,
        maxPrice: 2000,
      }),
    );

    expect(result.map((p) => p.id)).toEqual(["a"]);
  });

  it("sorts by price ascending", () => {
    const mid = product({ id: "mid", variants: [{ id: "v1", sku: null, prices: [{ currency_code: "eur", amount: 1000 }] }] });
    const cheap = product({ id: "cheap", variants: [{ id: "v2", sku: null, prices: [{ currency_code: "eur", amount: 100 }] }] });
    const expensive = product({ id: "expensive", variants: [{ id: "v3", sku: null, prices: [{ currency_code: "eur", amount: 3000 }] }] });

    const result = filterAndSortProducts([mid, cheap, expensive], filters({ sort: "price-asc" }));

    expect(result.map((p) => p.id)).toEqual(["cheap", "mid", "expensive"]);
  });

  it("sorts by price descending", () => {
    const mid = product({ id: "mid", variants: [{ id: "v1", sku: null, prices: [{ currency_code: "eur", amount: 1000 }] }] });
    const cheap = product({ id: "cheap", variants: [{ id: "v2", sku: null, prices: [{ currency_code: "eur", amount: 100 }] }] });
    const expensive = product({ id: "expensive", variants: [{ id: "v3", sku: null, prices: [{ currency_code: "eur", amount: 3000 }] }] });

    const result = filterAndSortProducts([mid, cheap, expensive], filters({ sort: "price-desc" }));

    expect(result.map((p) => p.id)).toEqual(["expensive", "mid", "cheap"]);
  });

  it("defaults to most-recently-created first", () => {
    const older = product({ id: "older", created_at: "2026-01-01T00:00:00.000Z" });
    const newer = product({ id: "newer", created_at: "2026-02-01T00:00:00.000Z" });

    const result = filterAndSortProducts([older, newer], filters());

    expect(result.map((p) => p.id)).toEqual(["newer", "older"]);
  });
});
