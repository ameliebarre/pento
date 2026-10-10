"use server";

import { cookies } from "next/headers";

import { medusa } from "@/lib/medusa";

const CART_ID_COOKIE = "medusa_cart_id";
const CART_ID_MAX_AGE = 60 * 60 * 24 * 365;

type MedusaCart = { id: string };
type MedusaRegion = { id: string; currency_code: string };

// Carts aren't tied to a user account — a guest can add to cart without
// signing in. Identity is the Medusa cart id itself, stored in a long-lived
// cookie (Medusa cart ids are unguessable ULIDs, safe to use directly).
export async function getCartId(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(CART_ID_COOKIE)?.value ?? null;
}

// Called once an order is placed — the cart is completed server-side and
// can't be added to again, so the cookie must be dropped to start a fresh
// one on the next add-to-cart.
export async function clearCartId(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(CART_ID_COOKIE);
}

async function getEurRegionId(): Promise<string> {
  const { regions } = await medusa.client.fetch<{ regions: MedusaRegion[] }>("/store/regions");
  const region = regions.find((r) => r.currency_code === "eur") ?? regions[0];

  if (!region) {
    throw new Error("No region configured in Medusa.");
  }

  return region.id;
}

async function getOrCreateCartId(): Promise<string> {
  const cookieStore = await cookies();
  const existing = cookieStore.get(CART_ID_COOKIE)?.value;

  if (existing) return existing;

  const regionId = await getEurRegionId();
  const { cart } = await medusa.client.fetch<{ cart: MedusaCart }>("/store/carts", {
    method: "POST",
    body: { region_id: regionId },
  });

  cookieStore.set(CART_ID_COOKIE, cart.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: CART_ID_MAX_AGE,
  });

  return cart.id;
}

export async function addToCartAction(variantId: string) {
  const cartId = await getOrCreateCartId();

  await medusa.client.fetch(`/store/carts/${cartId}/line-items`, {
    method: "POST",
    body: { variant_id: variantId, quantity: 1 },
  });
}

export async function removeFromCartAction(lineItemId: string) {
  const cartId = await getCartId();
  if (!cartId) return;

  await medusa.client.fetch(`/store/carts/${cartId}/line-items/${lineItemId}`, {
    method: "DELETE",
  });
}
