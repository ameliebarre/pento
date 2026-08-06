import { ProductFilters } from "../types";

const FILTER_PARAM_NAMES: Record<keyof ProductFilters, string> = {
  categories: "category",
  designers: "designer",
};

function toHref(filters: ProductFilters): string {
  const params = new URLSearchParams();
  for (const [dimension, paramName] of Object.entries(FILTER_PARAM_NAMES) as [
    keyof ProductFilters,
    string,
  ][]) {
    for (const slug of filters[dimension]) params.append(paramName, slug);
  }

  const query = params.toString();
  return query ? `/products?${query}` : "/products";
}

export function buildToggleFilterHref(
  filters: ProductFilters,
  dimension: keyof ProductFilters,
  slug: string,
): string {
  const current = filters[dimension];
  const next = current.includes(slug)
    ? current.filter((selected) => selected !== slug)
    : [...current, slug];

  return toHref({ ...filters, [dimension]: next });
}

export function buildClearFilterHref(filters: ProductFilters, dimension: keyof ProductFilters): string {
  return toHref({ ...filters, [dimension]: [] });
}
