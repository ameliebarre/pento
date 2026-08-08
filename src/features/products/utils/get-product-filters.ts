import { ProductFilters, SearchParams, SortOrder } from "../types";

function toSlugArray(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function toNullableNumber(value: string | string[] | undefined): number | null {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return null;

  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : null;
}

function toSortOrder(value: string | string[] | undefined): SortOrder | null {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw === "price-asc" || raw === "price-desc" ? raw : null;
}

export function getProductFilters(params: SearchParams): ProductFilters {
  return {
    categories: toSlugArray(params.category),
    designers: toSlugArray(params.designer),
    materials: toSlugArray(params.material),
    minPrice: toNullableNumber(params.minPrice),
    maxPrice: toNullableNumber(params.maxPrice),
    sort: toSortOrder(params.sort),
  };
}
