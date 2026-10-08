import { medusaAdminFetch } from "@/lib/medusa-admin";

import type { MedusaOrderSummary } from "../types";

const ORDER_FIELDS = "id,display_id,email,created_at,currency_code,total,status";

// Medusa doesn't know about storefront accounts (see features/account) — orders
// are matched to the signed-in user purely by email. The admin orders list
// route silently ignores an `email` filter and its `q` search does unsafe
// substring matching (e.g. "test@x.com" matches "longtest@x.com"), so we pull
// every order and filter for an exact match ourselves.
export async function getMyOrders(email: string): Promise<MedusaOrderSummary[]> {
  const { orders } = await medusaAdminFetch<{ orders: MedusaOrderSummary[] }>(
    `/admin/orders?fields=${ORDER_FIELDS}&order=-created_at&limit=100`,
  );

  return orders.filter((order) => order.email?.toLowerCase() === email.toLowerCase());
}
