// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/lib/get-session", () => ({
  getSession: vi.fn(),
}));

vi.mock("@/auth", () => ({
  auth: { api: { revokeOtherSessions: vi.fn(), signOut: vi.fn() } },
}));

vi.mock("@/lib/medusa-admin", () => ({
  medusaAdminFetch: vi.fn().mockResolvedValue({ orders: [] }),
}));

vi.mock("next/headers", () => ({
  headers: vi.fn().mockResolvedValue(new Headers()),
}));

const redirectSentinel = new Error("NEXT_REDIRECT");
const mockRedirect = vi.fn();
vi.mock("next/navigation", () => ({
  redirect: (url: string) => {
    mockRedirect(url);
    throw redirectSentinel;
  },
}));

import { getSession } from "@/lib/get-session";
import ProfilePage from "@/app/(app)/profile/page";
import { QueryProvider } from "@/components/query-provider";
import { CartDrawerProvider } from "@/features/cart/components/cart-drawer-provider";
import { medusaAdminFetch } from "@/lib/medusa-admin";

const mockedGetSession = vi.mocked(getSession);

function setupOrders(orders: unknown[]) {
  vi.mocked(medusaAdminFetch).mockResolvedValue({ orders });
}

function search(params: Record<string, string> = {}) {
  return Promise.resolve(params);
}

async function renderProfilePage(searchParams: ReturnType<typeof search>) {
  const page = await ProfilePage({ searchParams });

  return render(
    <QueryProvider>
      <CartDrawerProvider>{page}</CartDrawerProvider>
    </QueryProvider>,
  );
}

describe("ProfilePage", () => {
  it("redirects to /login when there is no session", async () => {
    mockedGetSession.mockResolvedValueOnce(null);

    await expect(ProfilePage({ searchParams: search() })).rejects.toThrow(redirectSentinel);
    expect(mockRedirect).toHaveBeenCalledWith("/login");
  });

  it("shows the signed-in user's information", async () => {
    mockedGetSession.mockResolvedValueOnce({
      user: { firstName: "Amelie", lastName: "Barre", email: "amelie@example.com" },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    await renderProfilePage(search());

    expect(screen.getByText("Amelie")).toBeInTheDocument();
    expect(screen.getByText("Barre")).toBeInTheDocument();
    expect(screen.getByText("amelie@example.com")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Se déconnecter" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Déconnecter les autres appareils" }),
    ).toBeInTheDocument();
  });

  it("falls back to a dash for a missing first/last name", async () => {
    mockedGetSession.mockResolvedValueOnce({
      user: { firstName: null, lastName: null, email: "amelie@example.com" },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    await renderProfilePage(search());

    expect(screen.getAllByText("—")).toHaveLength(2);
  });

  it("shows a confirmation once other devices have been revoked", async () => {
    mockedGetSession.mockResolvedValueOnce({
      user: { firstName: "Amelie", lastName: "Barre", email: "amelie@example.com" },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    await renderProfilePage(search({ revoked: "1" }));

    expect(screen.getByRole("status")).toHaveTextContent(
      "Les autres appareils ont été déconnectés.",
    );
  });

  it("does not show the revoked confirmation by default", async () => {
    mockedGetSession.mockResolvedValueOnce({
      user: { firstName: "Amelie", lastName: "Barre", email: "amelie@example.com" },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    await renderProfilePage(search());

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("shows an empty-state message when the account has no orders", async () => {
    mockedGetSession.mockResolvedValueOnce({
      user: { firstName: "Amelie", lastName: "Barre", email: "amelie@example.com" },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
    setupOrders([]);

    await renderProfilePage(search());

    expect(screen.getByText("Vous n'avez pas encore de commande.")).toBeInTheDocument();
  });

  it("lists the account's orders with their total and status", async () => {
    mockedGetSession.mockResolvedValueOnce({
      user: { firstName: "Amelie", lastName: "Barre", email: "amelie@example.com" },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
    setupOrders([
      {
        id: "order_1",
        display_id: 7,
        email: "amelie@example.com",
        created_at: "2026-01-15T00:00:00.000Z",
        currency_code: "eur",
        total: 1455,
        status: "pending",
      },
    ]);

    await renderProfilePage(search());

    expect(screen.getByText("Commande n°7")).toBeInTheDocument();
    expect(screen.getByText(/1.455,00.€/)).toBeInTheDocument();
    expect(screen.getByText("En attente")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Commande n°7/ })).toHaveAttribute(
      "href",
      "/checkout/confirmation/order_1",
    );
  });

  it("only shows orders matching the account's email exactly", async () => {
    mockedGetSession.mockResolvedValueOnce({
      user: { firstName: "Amelie", lastName: "Barre", email: "test@example.com" },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
    setupOrders([
      {
        id: "order_mine",
        display_id: 1,
        email: "test@example.com",
        created_at: "2026-01-15T00:00:00.000Z",
        currency_code: "eur",
        total: 1455,
        status: "pending",
      },
      {
        id: "order_someone_elses",
        display_id: 2,
        email: "longtest@example.com",
        created_at: "2026-01-16T00:00:00.000Z",
        currency_code: "eur",
        total: 2000,
        status: "pending",
      },
    ]);

    await renderProfilePage(search());

    expect(screen.getByText("Commande n°1")).toBeInTheDocument();
    expect(screen.queryByText("Commande n°2")).not.toBeInTheDocument();
  });
});
