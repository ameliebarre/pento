import { beforeEach, describe, expect, it, vi } from "vitest";

const cookieStore = new Map<string, string>();

vi.mock("next/headers", () => ({
  cookies: vi.fn(async () => ({
    get: (name: string) =>
      cookieStore.has(name) ? { value: cookieStore.get(name)! } : undefined,
    set: (name: string, value: string) => {
      cookieStore.set(name, value);
    },
  })),
}));

import { addToCartAction, removeFromCartAction } from "@/actions/cart";
import { getCart } from "@/features/cart/server/get-cart";
import { prisma } from "@/lib/prisma";

beforeEach(() => {
  cookieStore.clear();
});

async function createProduct(slug: string, name: string, price = 100) {
  return prisma.product.create({ data: { name, slug, description: "desc", price } });
}

describe("cart actions", () => {
  it("returns an empty cart when there is no cart token yet", async () => {
    const cart = await getCart();

    expect(cart.items).toEqual([]);
  });

  it("creates a guest cart token on the first add and adds the product", async () => {
    const product = await createProduct("cart-product-1", "Chaise Test");

    await addToCartAction(product.id);
    const cart = await getCart();

    expect(cookieStore.get("cart_token")).toBeTruthy();
    expect(cart.items).toHaveLength(1);
    expect(cart.items[0].product.name).toBe("Chaise Test");
    expect(cart.items[0].quantity).toBe(1);
  });

  it("increments the quantity when adding the same product twice", async () => {
    const product = await createProduct("cart-product-2", "Table Test");

    await addToCartAction(product.id);
    await addToCartAction(product.id);
    const cart = await getCart();

    expect(cart.items).toHaveLength(1);
    expect(cart.items[0].quantity).toBe(2);
  });

  it("reuses the same cart across calls instead of creating a new one", async () => {
    const productA = await createProduct("cart-product-3", "Lampe Test");
    const productB = await createProduct("cart-product-4", "Vase Test");

    await addToCartAction(productA.id);
    await addToCartAction(productB.id);
    const cart = await getCart();

    expect(cart.items).toHaveLength(2);
  });

  it("removes an item from the cart", async () => {
    const product = await createProduct("cart-product-5", "Miroir Test");
    await addToCartAction(product.id);
    const cart = await getCart();

    await removeFromCartAction(cart.items[0].id);
    const cartAfter = await getCart();

    expect(cartAfter.items).toHaveLength(0);
  });

  it("does nothing when removing without an existing cart token", async () => {
    await expect(removeFromCartAction("nonexistent")).resolves.toBeUndefined();
  });
});
