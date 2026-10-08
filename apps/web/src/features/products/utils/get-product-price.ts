import type { MedusaProduct } from "../medusa-types";

export function getProductPrice(product: MedusaProduct): number {
  const price = product.variants[0]?.prices.find((p) => p.currency_code === "eur");
  return price?.amount ?? 0;
}
