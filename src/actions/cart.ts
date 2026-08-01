"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

async function getOrCreateCart(userId: string) {
  return prisma.cart.upsert({
    where: { userId },
    update: {},
    create: { userId },
  });
}

export async function addToCartAction(productId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Vous devez être connecté pour ajouter un produit au panier.");
  }

  const cart = await getOrCreateCart(session.user.id);

  await prisma.cartItem.upsert({
    where: { cartId_productId: { cartId: cart.id, productId } },
    update: { quantity: { increment: 1 } },
    create: { cartId: cart.id, productId, quantity: 1 },
  });

  revalidatePath("/cart");
}

export async function removeFromCartAction(cartItemId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Vous devez être connecté pour modifier votre panier.");
  }

  // Scope the delete to the current user's cart so one shopper can't remove
  // another shopper's cart item by guessing an id.
  await prisma.cartItem.deleteMany({
    where: { id: cartItemId, cart: { userId: session.user.id } },
  });

  revalidatePath("/cart");
}
