// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/lib/get-session", () => ({
  getSession: vi.fn().mockResolvedValue(null),
}));

const cookieStore = new Map<string, string>();

vi.mock("next/headers", () => ({
  cookies: vi.fn(async () => ({
    get: (name: string) => (cookieStore.has(name) ? { value: cookieStore.get(name)! } : undefined),
  })),
}));

vi.mock("@/lib/medusa", () => ({
  medusa: { client: { fetch: vi.fn() } },
}));

import CheckoutPage from "@/app/(app)/checkout/page";
import { QueryProvider } from "@/components/query-provider";
import { CartDrawerProvider } from "@/features/cart/components/cart-drawer-provider";
import { getSession } from "@/lib/get-session";
import { medusa } from "@/lib/medusa";

const CART_ID = "cart_1";
const REGION_ID = "reg_1";

function setupMedusa(
  data: {
    items?: unknown[];
  } = {},
) {
  vi.mocked(medusa.client.fetch).mockImplementation(async (path: unknown) => {
    const p = String(path);

    if (p === `/store/carts/${CART_ID}`) {
      return {
        cart: {
          id: CART_ID,
          region_id: REGION_ID,
          currency_code: "eur",
          email: null,
          item_total: 1445,
          shipping_total: 0,
          tax_total: 0,
          total: 1445,
          items: data.items ?? [
            {
              id: "item_1",
              quantity: 1,
              unit_price: 1445,
              product_id: "prod_1",
              product_handle: "barcelona-chair",
              product_title: "Barcelona Chair",
              thumbnail: null,
            },
          ],
          shipping_address: null,
          shipping_methods: [],
        },
      };
    }

    if (p === "/store/shipping-options") {
      return {
        shipping_options: [
          { id: "so_standard", name: "Standard Shipping", amount: 10 },
          { id: "so_express", name: "Express Shipping", amount: 20 },
        ],
      };
    }

    if (p === `/store/regions/${REGION_ID}`) {
      return {
        region: {
          countries: [
            { iso_2: "fr", display_name: "France" },
            { iso_2: "de", display_name: "Germany" },
          ],
        },
      };
    }

    throw new Error(`Unexpected path: ${p}`);
  });
}

async function renderPage() {
  const element = await CheckoutPage();
  render(
    <QueryProvider>
      <CartDrawerProvider>{element}</CartDrawerProvider>
    </QueryProvider>,
  );
}

describe("CheckoutPage", () => {
  it("shows an empty-cart message when there is no cart cookie", async () => {
    cookieStore.clear();

    await renderPage();

    expect(screen.getByText("Votre panier est vide.")).toBeInTheDocument();
  });

  it("lists the cart items, shipping options and countries when the cart has items", async () => {
    cookieStore.set("medusa_cart_id", CART_ID);
    setupMedusa();

    await renderPage();

    expect(screen.getByText("Barcelona Chair")).toBeInTheDocument();
    expect(screen.getByText("Standard Shipping")).toBeInTheDocument();
    expect(screen.getByText("Express Shipping")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "France" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Confirmer la commande/i })).toBeInTheDocument();
  });

  it("shows an empty-cart message when the cart has no items", async () => {
    cookieStore.set("medusa_cart_id", CART_ID);
    setupMedusa({ items: [] });

    await renderPage();

    expect(screen.getByText("Votre panier est vide.")).toBeInTheDocument();
  });

  it("locks the email field to the signed-in account's email", async () => {
    cookieStore.set("medusa_cart_id", CART_ID);
    setupMedusa();
    vi.mocked(getSession).mockResolvedValueOnce({
      user: { email: "amelie@example.com" },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    await renderPage();

    const emailInput = screen.getByLabelText("Email");
    expect(emailInput).toHaveValue("amelie@example.com");
    expect(emailInput).toHaveAttribute("readonly");
  });
});
