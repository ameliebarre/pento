// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/lib/get-session", () => ({
  getSession: vi.fn().mockResolvedValue(null),
}));

const notFoundSentinel = new Error("NEXT_NOT_FOUND");
const mockNotFound = vi.fn(() => {
  throw notFoundSentinel;
});
vi.mock("next/navigation", () => ({
  notFound: () => mockNotFound(),
}));

vi.mock("@/lib/medusa", () => ({
  medusa: { client: { fetch: vi.fn() } },
}));

import ConfirmationPage from "@/app/(app)/checkout/confirmation/[id]/page";
import { QueryProvider } from "@/components/query-provider";
import { CartDrawerProvider } from "@/features/cart/components/cart-drawer-provider";
import { medusa } from "@/lib/medusa";

function setupMedusa(order: unknown | null) {
  vi.mocked(medusa.client.fetch).mockImplementation(async () => {
    if (!order) throw new Error("Order not found");
    return { order };
  });
}

function buildOrder() {
  return {
    id: "order_1",
    display_id: 42,
    email: "test@example.com",
    currency_code: "eur",
    item_total: 1445,
    shipping_total: 10,
    tax_total: 0,
    total: 1455,
    items: [
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
    shipping_address: {
      first_name: "Jean",
      last_name: "Dupont",
      address_1: "1 Rue de Paris",
      city: "Paris",
      postal_code: "75001",
      country_code: "fr",
      phone: null,
    },
    shipping_methods: [{ id: "sm_1", name: "Standard Shipping", amount: 10 }],
  };
}

describe("ConfirmationPage", () => {
  it("shows the order number, email, items and totals", async () => {
    setupMedusa(buildOrder());

    const element = await ConfirmationPage({ params: Promise.resolve({ id: "order_1" }) });
    render(
      <QueryProvider>
        <CartDrawerProvider>{element}</CartDrawerProvider>
      </QueryProvider>,
    );

    expect(screen.getByText(/Commande n°42/)).toBeInTheDocument();
    expect(screen.getByText(/test@example.com/)).toBeInTheDocument();
    expect(screen.getByText("Barcelona Chair")).toBeInTheDocument();
    expect(screen.getByText(/1.455,00.€/)).toBeInTheDocument();
    expect(screen.getByText("Jean Dupont")).toBeInTheDocument();
  });

  it("calls notFound() when the order does not exist", async () => {
    setupMedusa(null);

    await expect(
      ConfirmationPage({ params: Promise.resolve({ id: "not-a-real-order" }) }),
    ).rejects.toThrow(notFoundSentinel);
    expect(mockNotFound).toHaveBeenCalled();
  });
});
