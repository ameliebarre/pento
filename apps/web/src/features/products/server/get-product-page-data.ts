import { medusa } from "@/lib/medusa";

import type { MedusaCategory, MedusaDesigner, MedusaMaterial, MedusaMovement, MedusaProduct } from "../medusa-types";
import { ProductFilters } from "../types";
import { getProductPrice } from "../utils/get-product-price";
import { filterAndSortProducts } from "./build-product-filters";

export type PriceBounds = {
  min: number;
  max: number;
};

function getPriceBounds(products: MedusaProduct[]): PriceBounds {
  if (products.length === 0) return { min: 0, max: 0 };

  const prices = products.map(getProductPrice);
  return {
    min: Math.floor(Math.min(...prices)),
    max: Math.ceil(Math.max(...prices)),
  };
}

// The category list for the filter sidebar is derived from the categories
// actually attached to a product, rather than fetched wholesale from Medusa's
// product-categories endpoint — that endpoint also returns Medusa's own demo
// seed categories (Shirts, Sweatshirts...), which aren't part of this catalog.
function getUsedCategories(products: MedusaProduct[]): MedusaCategory[] {
  const byId = new Map<string, MedusaCategory>();
  for (const product of products) {
    for (const category of product.categories) {
      byId.set(category.id, category);
    }
  }
  return [...byId.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export async function getProductPageData(filters: ProductFilters) {
  const [{ products: allProducts }, { designers }, { materials }, { movements }] = await Promise.all([
    medusa.client.fetch<{ products: MedusaProduct[] }>("/store/products/full"),
    medusa.client.fetch<{ designers: MedusaDesigner[] }>("/store/designers"),
    medusa.client.fetch<{ materials: MedusaMaterial[] }>("/store/materials"),
    medusa.client.fetch<{ movements: MedusaMovement[] }>("/store/movements"),
  ]);

  const categories = getUsedCategories(allProducts);
  const sortedDesigners = [...designers].sort((a, b) => a.last_name.localeCompare(b.last_name));
  const sortedMaterials = [...materials].sort((a, b) => a.name.localeCompare(b.name));
  const sortedMovements = [...movements].sort((a, b) => a.name.localeCompare(b.name));

  const priceBounds = getPriceBounds(allProducts);
  const products = filterAndSortProducts(allProducts, filters);

  return [products, categories, sortedDesigners, sortedMaterials, sortedMovements, priceBounds] as const;
}
