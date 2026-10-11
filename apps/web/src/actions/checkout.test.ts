import { beforeEach, describe, expect, it, vi } from "vitest";

const cookieStore = new Map<string, string>();

vi.mock("next/headers", () => ({
  cookies: vi.fn(async () => ({
    get: (name: string) => (cookieStore.has(name) ? { value: cookieStore.get(name)! } : undefined),
    set: (name: string, value: string) => {
      cookieStore.set(name, value);
    },
    delete: (name: string) => {
      cookieStore.delete(name);
    },
  })),
}));

const mockRedirect = vi.fn((url: string) => {
  throw new Error(`NEXT_REDIRECT:${url}`);
});
vi.mock("next/navigation", () => ({
  redirect: (url: string) => mockRedirect(url),
}));

vi.mock("@/lib/medusa", () => ({
  medusa: { client: { fetch: vi.fn() } },
}));

vi.mock("@/lib/get-session", () => ({
  getSession: vi.fn().mockResolvedValue(null),
}));

vi.mock("@/lib/medusa-customer-auth", () => ({
  getMedusaCustomerToken: vi.fn().mockResolvedValue("customer-token"),
}));

import { placeOrderAction } from "@/actions/checkout";
import { getSession } from "@/lib/get-session";
import { medusa } from "@/lib/medusa";

const CART_ID = "cart_1";

function buildFormData(overrides: Record<string, string> = {}) {
  const defaults: Record<string, string> = {
    email: "test@example.com",
    firstName: "Jean",
    lastName: "Dupont",
    address1: "1 Rue de Paris",
    city: "Paris",
    postalCode: "75001",
    countryCode: "fr",
    phone: "0600000000",
    shippingOptionId: "so_standard",
  };
  const data = new FormData();
  for (const [key, value] of Object.entries({ ...defaults, ...overrides })) {
    data.set(key, value);
  }
  return data;
}

function setupMedusa(completeResult: { type: "order"; order: { id: string } } | { type: "cart"; error: { message: string } }) {
  vi.mocked(medusa.client.fetch).mockImplementation(async (path: unknown) => {
    const p = String(path);
    if (p === `/store/carts/${CART_ID}/customer`) return { cart: { id: CART_ID } };
    if (p === `/store/carts/${CART_ID}`) return { cart: { id: CART_ID } };
    if (p === `/store/carts/${CART_ID}/shipping-methods`) return { cart: { id: CART_ID } };
    if (p === "/store/payment-collections") return { payment_collection: { id: "pay_col_1" } };
    if (p === "/store/payment-collections/pay_col_1/payment-sessions") {
      return { payment_collection: { id: "pay_col_1" } };
    }
    if (p === `/store/carts/${CART_ID}/complete`) return completeResult;
    throw new Error(`Unhandled request: ${p}`);
  });
}

beforeEach(() => {
  cookieStore.clear();
  cookieStore.set("medusa_cart_id", CART_ID);
  mockRedirect.mockClear();
  vi.mocked(medusa.client.fetch).mockReset();
  vi.mocked(getSession).mockReset().mockResolvedValue(null);
});

describe("placeOrderAction", () => {
  it("returns an error when there is no cart", async () => {
    cookieStore.clear();

    const result = await placeOrderAction({ error: null }, buildFormData());

    expect(result.error).toBe("Votre panier est introuvable.");
  });

  it("returns an error when no shipping option is selected", async () => {
    const result = await placeOrderAction({ error: null }, buildFormData({ shippingOptionId: "" }));

    expect(result.error).toBe("Merci de choisir un mode de livraison.");
  });

  it("updates the cart, pays, completes the order and redirects to the confirmation page", async () => {
    setupMedusa({ type: "order", order: { id: "order_1" } });

    await expect(placeOrderAction({ error: null }, buildFormData())).rejects.toThrow(
      "NEXT_REDIRECT:/checkout/confirmation/order_1",
    );

    expect(mockRedirect).toHaveBeenCalledWith("/checkout/confirmation/order_1");
  });

  it("clears the cart cookie once the order is placed", async () => {
    setupMedusa({ type: "order", order: { id: "order_1" } });

    await expect(placeOrderAction({ error: null }, buildFormData())).rejects.toThrow();

    expect(cookieStore.has("medusa_cart_id")).toBe(false);
  });

  it("returns the error message when Medusa fails to complete the cart", async () => {
    setupMedusa({ type: "cart", error: { message: "Le paiement a échoué." } });

    const result = await placeOrderAction({ error: null }, buildFormData());

    expect(result.error).toBe("Le paiement a échoué.");
    expect(cookieStore.has("medusa_cart_id")).toBe(true);
  });

  it("links the cart to the Medusa customer when the user is signed in", async () => {
    setupMedusa({ type: "order", order: { id: "order_1" } });
    vi.mocked(getSession).mockResolvedValue({
      user: { id: "user_1", email: "test@example.com", firstName: "Jean", lastName: "Dupont" },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    await expect(placeOrderAction({ error: null }, buildFormData())).rejects.toThrow();

    expect(medusa.client.fetch).toHaveBeenCalledWith(`/store/carts/${CART_ID}/customer`, {
      method: "POST",
      headers: { Authorization: "Bearer customer-token" },
    });
  });
});
