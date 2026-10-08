"use server";

import { redirect } from "next/navigation";

import { clearCartId, getCartId } from "@/actions/cart";
import { medusa } from "@/lib/medusa";

export type CheckoutState = { error: string | null };

type MedusaCompleteCartResponse =
  | { type: "order"; order: { id: string } }
  | { type: "cart"; error: { message: string } };

export async function placeOrderAction(
  _prevState: CheckoutState,
  formData: FormData,
): Promise<CheckoutState> {
  const cartId = await getCartId();
  if (!cartId) {
    return { error: "Votre panier est introuvable." };
  }

  const shippingOptionId = formData.get("shippingOptionId");
  if (typeof shippingOptionId !== "string" || !shippingOptionId) {
    return { error: "Merci de choisir un mode de livraison." };
  }

  const email = String(formData.get("email") ?? "");
  const address = {
    first_name: String(formData.get("firstName") ?? ""),
    last_name: String(formData.get("lastName") ?? ""),
    address_1: String(formData.get("address1") ?? ""),
    city: String(formData.get("city") ?? ""),
    postal_code: String(formData.get("postalCode") ?? ""),
    country_code: String(formData.get("countryCode") ?? ""),
    phone: String(formData.get("phone") ?? "") || null,
  };

  let orderId: string;

  try {
    await medusa.client.fetch(`/store/carts/${cartId}`, {
      method: "POST",
      body: { email, shipping_address: address, billing_address: address },
    });

    await medusa.client.fetch(`/store/carts/${cartId}/shipping-methods`, {
      method: "POST",
      body: { option_id: shippingOptionId },
    });

    const { payment_collection } = await medusa.client.fetch<{
      payment_collection: { id: string };
    }>("/store/payment-collections", {
      method: "POST",
      body: { cart_id: cartId },
    });

    await medusa.client.fetch(
      `/store/payment-collections/${payment_collection.id}/payment-sessions`,
      { method: "POST", body: { provider_id: "pp_system_default" } },
    );

    const result = await medusa.client.fetch<MedusaCompleteCartResponse>(
      `/store/carts/${cartId}/complete`,
      { method: "POST" },
    );

    if (result.type === "cart") {
      return { error: result.error.message };
    }

    orderId = result.order.id;
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Une erreur est survenue." };
  }

  await clearCartId();
  redirect(`/checkout/confirmation/${orderId}`);
}
