import { getCartId } from "@/actions/cart";
import { medusa } from "@/lib/medusa";

import type { MedusaCheckoutCart, MedusaRegionCountry, MedusaShippingOption } from "../types";

export type CheckoutData = {
  cart: MedusaCheckoutCart | null;
  shippingOptions: MedusaShippingOption[];
  countries: MedusaRegionCountry[];
};

export async function getCheckoutData(): Promise<CheckoutData> {
  const cartId = await getCartId();

  if (!cartId) {
    return { cart: null, shippingOptions: [], countries: [] };
  }

  const { cart } = await medusa.client.fetch<{ cart: MedusaCheckoutCart }>(`/store/carts/${cartId}`);

  if (cart.items.length === 0) {
    return { cart, shippingOptions: [], countries: [] };
  }

  const [{ shipping_options }, { region }] = await Promise.all([
    medusa.client.fetch<{ shipping_options: MedusaShippingOption[] }>("/store/shipping-options", {
      query: { cart_id: cartId },
    }),
    medusa.client.fetch<{ region: { countries: MedusaRegionCountry[] } }>(
      `/store/regions/${cart.region_id}`,
    ),
  ]);

  return { cart, shippingOptions: shipping_options, countries: region.countries };
}
