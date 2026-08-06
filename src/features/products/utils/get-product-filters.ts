import { ProductFilters, SearchParams } from "../types";

function toSlugArray(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

export function getProductFilters(params: SearchParams): ProductFilters {
  return {
    categories: toSlugArray(params.category),
    designers: toSlugArray(params.designer),
  };
}
