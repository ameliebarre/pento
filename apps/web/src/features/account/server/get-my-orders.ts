import { medusa } from "@/lib/medusa";
import { getMedusaCustomerToken } from "@/lib/medusa-customer-auth";

import type { MedusaOrderSummary } from "../types";

const ORDER_FIELDS = "id,display_id,email,created_at,currency_code,total,status";

export async function getMyOrders(user: {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
}): Promise<MedusaOrderSummary[]> {
  const token = await getMedusaCustomerToken(user);

  const { orders } = await medusa.client.fetch<{ orders: MedusaOrderSummary[] }>("/store/orders", {
    headers: { Authorization: `Bearer ${token}` },
    query: { fields: ORDER_FIELDS, order: "-created_at", limit: 100 },
  });

  return orders;
}
