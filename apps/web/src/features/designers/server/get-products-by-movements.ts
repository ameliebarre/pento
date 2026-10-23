import { medusa } from "@/lib/medusa";

import type { MedusaProduct } from "@/features/products/medusa-types";

export async function getProductsByMovements(
  movementSlugs: string[],
  excludeDesignerSlug: string,
  limit: number,
): Promise<MedusaProduct[]> {
  if (movementSlugs.length === 0) return [];

  const { products } = await medusa.client.fetch<{ products: MedusaProduct[] }>(
    "/store/products/full",
  );

  return products
    .filter((product) => product.movement && movementSlugs.includes(product.movement.slug))
    .filter((product) => !product.designers.some((designer) => designer.slug === excludeDesignerSlug))
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, limit);
}
