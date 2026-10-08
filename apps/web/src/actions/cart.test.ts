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

vi.mock("@/lib/medusa", () => ({
  medusa: { client: { fetch: vi.fn() } },
}));

import { addToCartAction, removeFromCartAction } from "@/actions/cart";
import { getCart } from "@/features/cart/server/get-cart";
import { medusa } from "@/lib/medusa";

type Variant = { productId: string; handle: string; title: string; thumbnail: string | null; price: number };
type LineItem = {
  id: string;
  variant_id: string;
  product_id: string;
  product_handle: string;
  product_title: string;
  thumbnail: string | null;
  unit_price: number;
  quantity: number;
};
type Cart = { id: string; currency_code: string; items: LineItem[] };

const VARIANTS = new Map<string, Variant>();
let carts: Map<string, Cart>;
let cartCounter = 0;
let itemCounter = 0;

function registerVariant(variantId: string, variant: Variant) {
  VARIANTS.set(variantId, variant);
}

function setupFakeMedusa() {
  carts = new Map();
  cartCounter = 0;
  itemCounter = 0;

  vi.mocked(medusa.client.fetch).mockImplementation(async (path: unknown, init?: unknown) => {
    const p = String(path);
    const method = (init as { method?: string } | undefined)?.method ?? "GET";
    const body = (init as { body?: Record<string, unknown> } | undefined)?.body;

    if (p === "/store/regions") {
      return { regions: [{ id: "reg_eur", currency_code: "eur" }] };
    }

    if (p === "/store/carts" && method === "POST") {
      const id = `cart_${++cartCounter}`;
      const cart: Cart = { id, currency_code: "eur", items: [] };
      carts.set(id, cart);
      return { cart };
    }

    const cartMatch = p.match(/^\/store\/carts\/([^/]+)$/);
    if (cartMatch && method === "GET") {
      const cart = carts.get(cartMatch[1]);
      if (!cart) throw new Error("Cart not found");
      return { cart };
    }

    const addMatch = p.match(/^\/store\/carts\/([^/]+)\/line-items$/);
    if (addMatch && method === "POST") {
      const cart = carts.get(addMatch[1]);
      if (!cart) throw new Error("Cart not found");
      const variantId = body!.variant_id as string;
      const variant = VARIANTS.get(variantId)!;
      const quantity = (body!.quantity as number) ?? 1;
      const existing = cart.items.find((item) => item.variant_id === variantId);
      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.items.push({
          id: `item_${++itemCounter}`,
          variant_id: variantId,
          product_id: variant.productId,
          product_handle: variant.handle,
          product_title: variant.title,
          thumbnail: variant.thumbnail,
          unit_price: variant.price,
          quantity,
        });
      }
      return { cart };
    }

    const removeMatch = p.match(/^\/store\/carts\/([^/]+)\/line-items\/([^/]+)$/);
    if (removeMatch && method === "DELETE") {
      const cart = carts.get(removeMatch[1]);
      if (cart) {
        cart.items = cart.items.filter((item) => item.id !== removeMatch[2]);
      }
      return { cart };
    }

    throw new Error(`Unhandled request: ${method} ${p}`);
  });
}

beforeEach(() => {
  cookieStore.clear();
  setupFakeMedusa();
  registerVariant("variant-1", {
    productId: "prod-1",
    handle: "cart-product-1",
    title: "Chaise Test",
    thumbnail: null,
    price: 100,
  });
  registerVariant("variant-2", {
    productId: "prod-2",
    handle: "cart-product-2",
    title: "Table Test",
    thumbnail: null,
    price: 100,
  });
  registerVariant("variant-5", {
    productId: "prod-5",
    handle: "cart-product-5",
    title: "Miroir Test",
    thumbnail: null,
    price: 100,
  });
});

describe("cart actions", () => {
  it("returns an empty cart when there is no cart id yet", async () => {
    const cart = await getCart();

    expect(cart.items).toEqual([]);
  });

  it("creates a guest cart id on the first add and adds the product", async () => {
    await addToCartAction("variant-1");
    const cart = await getCart();

    expect(cookieStore.get("medusa_cart_id")).toBeTruthy();
    expect(cart.items).toHaveLength(1);
    expect(cart.items[0].product.name).toBe("Chaise Test");
    expect(cart.items[0].quantity).toBe(1);
  });

  it("increments the quantity when adding the same variant twice", async () => {
    await addToCartAction("variant-2");
    await addToCartAction("variant-2");
    const cart = await getCart();

    expect(cart.items).toHaveLength(1);
    expect(cart.items[0].quantity).toBe(2);
  });

  it("reuses the same cart across calls instead of creating a new one", async () => {
    await addToCartAction("variant-1");
    await addToCartAction("variant-2");
    const cart = await getCart();

    expect(cart.items).toHaveLength(2);
    expect(carts.size).toBe(1);
  });

  it("removes an item from the cart", async () => {
    await addToCartAction("variant-5");
    const cart = await getCart();

    await removeFromCartAction(cart.items[0].id);
    const cartAfter = await getCart();

    expect(cartAfter.items).toHaveLength(0);
  });

  it("does nothing when removing without an existing cart id", async () => {
    await expect(removeFromCartAction("nonexistent")).resolves.toBeUndefined();
  });
});
