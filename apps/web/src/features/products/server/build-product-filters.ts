import type { MedusaProduct } from "../medusa-types";
import type { ProductFilters } from "../types";
import { getProductPrice } from "../utils/get-product-price";

function matchesFilters(product: MedusaProduct, filters: ProductFilters): boolean {
  if (
    filters.categories.length > 0 &&
    !product.categories.some((category) => filters.categories.includes(category.handle))
  ) {
    return false;
  }

  if (
    filters.designers.length > 0 &&
    !product.designers.some((designer) => filters.designers.includes(designer.slug))
  ) {
    return false;
  }

  if (
    filters.materials.length > 0 &&
    !product.materials.some((material) => filters.materials.includes(material.slug))
  ) {
    return false;
  }

  if (
    filters.movements.length > 0 &&
    !(product.movement && filters.movements.includes(product.movement.slug))
  ) {
    return false;
  }

  if (filters.minPrice !== null || filters.maxPrice !== null) {
    const price = getProductPrice(product);
    if (filters.minPrice !== null && price < filters.minPrice) return false;
    if (filters.maxPrice !== null && price > filters.maxPrice) return false;
  }

  return true;
}

function compareProducts(a: MedusaProduct, b: MedusaProduct, filters: ProductFilters): number {
  if (filters.sort === "price-asc") return getProductPrice(a) - getProductPrice(b);
  if (filters.sort === "price-desc") return getProductPrice(b) - getProductPrice(a);
  return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
}

export function filterAndSortProducts(
  products: MedusaProduct[],
  filters: ProductFilters,
): MedusaProduct[] {
  return products
    .filter((product) => matchesFilters(product, filters))
    .sort((a, b) => compareProducts(a, b, filters));
}
