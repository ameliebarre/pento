import { describe, expect, it } from "vitest";

import { buildFiltersVisibilityHref } from "@/features/products/utils/build-page-href";

describe("buildFiltersVisibilityHref", () => {
  it("adds the showFilters marker when showing with no other params", () => {
    expect(buildFiltersVisibilityHref({}, true)).toBe("/products?showFilters=1");
  });

  it("returns the bare path when hiding with no other params", () => {
    expect(buildFiltersVisibilityHref({}, false)).toBe("/products");
  });

  it("preserves every other param, whatever it is, when showing", () => {
    expect(
      buildFiltersVisibilityHref({ category: ["chairs", "tables"], sort: "price-asc" }, true),
    ).toBe("/products?category=chairs&category=tables&sort=price-asc&showFilters=1");
  });

  it("preserves every other param when hiding again", () => {
    expect(
      buildFiltersVisibilityHref({ category: "chairs", showFilters: "1" }, false),
    ).toBe("/products?category=chairs");
  });

  it("drops any existing showFilters value before recomputing it", () => {
    expect(buildFiltersVisibilityHref({ showFilters: "1" }, true)).toBe(
      "/products?showFilters=1",
    );
  });
});
