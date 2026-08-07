import { ProductFilters } from "../types";

type ToggleDimension = "categories" | "designers";

const TOGGLE_PARAM_NAMES: Record<ToggleDimension, string> = {
  categories: "category",
  designers: "designer",
};

function toHref(filters: ProductFilters): string {
  const params = new URLSearchParams();

  for (const [dimension, paramName] of Object.entries(TOGGLE_PARAM_NAMES) as [
    ToggleDimension,
    string,
  ][]) {
    for (const slug of filters[dimension]) params.append(paramName, slug);
  }

  if (filters.minPrice !== null) params.set("minPrice", String(filters.minPrice));
  if (filters.maxPrice !== null) params.set("maxPrice", String(filters.maxPrice));

  const query = params.toString();
  return query ? `/products?${query}` : "/products";
}

export function buildToggleFilterHref(
  filters: ProductFilters,
  dimension: ToggleDimension,
  slug: string,
): string {
  const current = filters[dimension];
  const next = current.includes(slug)
    ? current.filter((selected) => selected !== slug)
    : [...current, slug];

  return toHref({ ...filters, [dimension]: next });
}

export function buildPriceFilterHref(
  filters: ProductFilters,
  minPrice: number,
  maxPrice: number,
): string {
  return toHref({ ...filters, minPrice, maxPrice });
}

export function buildClearFilterHref(
  filters: ProductFilters,
  dimension: ToggleDimension | "price",
): string {
  if (dimension === "price") {
    return toHref({ ...filters, minPrice: null, maxPrice: null });
  }
  return toHref({ ...filters, [dimension]: [] });
}
