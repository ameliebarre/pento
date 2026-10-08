import { medusa } from "@/lib/medusa";

import type { MedusaOrder } from "../types";

export async function getOrder(orderId: string): Promise<MedusaOrder | null> {
  try {
    const { order } = await medusa.client.fetch<{ order: MedusaOrder }>(`/store/orders/${orderId}`);
    return order;
  } catch {
    return null;
  }
}
