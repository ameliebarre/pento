"use server";

import { medusa } from "@/lib/medusa";
import { getCartId } from "@/actions/cart";

export type CartData = {
  items: {
    id: string;
    quantity: number;
    product: {
      id: string;
      slug: string;
      name: string;
      price: number;
      currency: string;
      image: { url: string; alt: string } | null;
    };
  }[];
};

type MedusaCartLineItem = {
  id: string;
  quantity: number;
  unit_price: number;
  product_id: string;
  product_handle: string;
  product_title: string;
  thumbnail: string | null;
};

type MedusaCart = {
  currency_code: string;
  items: MedusaCartLineItem[];
};

export async function getCart(): Promise<CartData> {
  const cartId = await getCartId();

  if (!cartId) {
    return { items: [] };
  }

  let cart: MedusaCart;
  try {
    ({ cart } = await medusa.client.fetch<{ cart: MedusaCart }>(`/store/carts/${cartId}`));
  } catch {
    // Stale/invalid cart id (e.g. cart deleted server-side) — treat as empty
    // rather than surfacing an error for something the shopper can't fix.
    return { items: [] };
  }

  return {
    items: cart.items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      product: {
        id: item.product_id,
        slug: item.product_handle,
        name: item.product_title,
        price: item.unit_price,
        currency: cart.currency_code,
        image: item.thumbnail ? { url: item.thumbnail, alt: item.product_title } : null,
      },
    })),
  };
}
