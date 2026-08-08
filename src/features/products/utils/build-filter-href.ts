import { ProductFilters, SortOrder } from "../types";

type ToggleDimension = "categories" | "designers" | "materials" | "movements";

const TOGGLE_PARAM_NAMES: Record<ToggleDimension, string> = {
  categories: "category",
  designers: "designer",
  materials: "material",
  movements: "movement",
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
  if (filters.sort !== null) params.set("sort", filters.sort);

  // Every caller of this function (toggle links, checkboxes, the price
  // slider, sort radios, and their "Réinitialiser" links) only ever renders
  // inside the already-visible filters panel — so the panel must stay open
  // across the navigation, or it silently collapses on every filter click.
  params.set("showFilters", "1");

  return `/products?${params.toString()}`;
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

export function buildSortHref(filters: ProductFilters, sort: SortOrder): string {
  return toHref({ ...filters, sort });
}

export function buildClearFilterHref(
  filters: ProductFilters,
  dimension: ToggleDimension | "price" | "sort",
): string {
  if (dimension === "price") {
    return toHref({ ...filters, minPrice: null, maxPrice: null });
  }
  if (dimension === "sort") {
    return toHref({ ...filters, sort: null });
  }
  return toHref({ ...filters, [dimension]: [] });
}
