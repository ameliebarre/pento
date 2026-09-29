"use server";

import { randomUUID } from "crypto";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";

const CART_TOKEN_COOKIE = "cart_token";
const CART_TOKEN_MAX_AGE = 60 * 60 * 24 * 365;

// Carts aren't tied to a user account — a guest can add to cart without
// signing in. Identity is a random token stored in a long-lived cookie.
export async function getCartToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(CART_TOKEN_COOKIE)?.value ?? null;
}

async function getOrCreateCartToken(): Promise<string> {
  const cookieStore = await cookies();
  const existing = cookieStore.get(CART_TOKEN_COOKIE)?.value;

  if (existing) return existing;

  const token = randomUUID();

  cookieStore.set(CART_TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: CART_TOKEN_MAX_AGE,
  });
  return token;
}

async function getOrCreateCart(token: string) {
  return prisma.cart.upsert({
    where: { token },
    update: {},
    create: { token },
  });
}

export async function addToCartAction(productId: string) {
  const token = await getOrCreateCartToken();
  const cart = await getOrCreateCart(token);

  await prisma.cartItem.upsert({
    where: { cartId_productId: { cartId: cart.id, productId } },
    update: { quantity: { increment: 1 } },
    create: { cartId: cart.id, productId, quantity: 1 },
  });
}

export async function removeFromCartAction(cartItemId: string) {
  const token = await getCartToken();
  if (!token) return;

  // Scope the delete to the current cart so one shopper can't remove
  // another shopper's cart item by guessing an id.
  await prisma.cartItem.deleteMany({
    where: { id: cartItemId, cart: { token } },
  });
}
