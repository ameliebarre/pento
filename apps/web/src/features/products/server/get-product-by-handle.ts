import { medusa } from "@/lib/medusa";

import type { MedusaProduct } from "../medusa-types";

export async function getProductByHandle(handle: string): Promise<MedusaProduct | null> {
  try {
    const { product } = await medusa.client.fetch<{ product: MedusaProduct }>(
      `/store/products/${handle}/full`,
    );
    return product;
  } catch {
    return null;
  }
}
