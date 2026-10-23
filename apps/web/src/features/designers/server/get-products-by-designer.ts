import { medusa } from "@/lib/medusa";

import type { MedusaProduct } from "@/features/products/medusa-types";

export async function getProductsByDesigner(
  designerSlug: string,
  limit: number,
): Promise<MedusaProduct[]> {
  const { products } = await medusa.client.fetch<{ products: MedusaProduct[] }>(
    "/store/products/full",
  );

  return products
    .filter((product) => product.designers.some((designer) => designer.slug === designerSlug))
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, limit);
}
