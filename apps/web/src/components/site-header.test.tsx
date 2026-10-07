// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/lib/get-session", () => ({
  getSession: vi.fn(),
}));

import { getSession } from "@/lib/get-session";
import { SiteHeader } from "@/components/site-header";
import { QueryProvider } from "@/components/query-provider";
import { CartDrawerProvider } from "@/features/cart/components/cart-drawer-provider";

const mockedGetSession = vi.mocked(getSession);

async function renderSiteHeader() {
  const header = await SiteHeader();

  return render(
    <QueryProvider>
      <CartDrawerProvider>{header}</CartDrawerProvider>
    </QueryProvider>,
  );
}

describe("SiteHeader", () => {
  it("shows a login button and no account avatar when there is no session", async () => {
    mockedGetSession.mockResolvedValueOnce(null);

    await renderSiteHeader();

    expect(screen.getByRole("button", { name: "Se connecter" })).toHaveAttribute("href", "/login");
    expect(screen.queryByRole("link", { name: /profil/i })).not.toBeInTheDocument();
  });

  it("shows an avatar linking to the profile page with the first name's initial", async () => {
    mockedGetSession.mockResolvedValueOnce({
      user: { firstName: "Amelie", lastName: "Barre", email: "amelie@example.com" },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    await renderSiteHeader();

    const profileLink = screen.getByRole("link", { name: "Mon profil" });
    expect(profileLink).toHaveAttribute("href", "/profile");
    expect(profileLink).toHaveTextContent("A");
  });

  it("falls back to the email's initial when there is no first name", async () => {
    mockedGetSession.mockResolvedValueOnce({
      user: { firstName: null, lastName: null, email: "zeta@example.com" },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    await renderSiteHeader();

    const profileLink = screen.getByRole("link", { name: "Mon profil" });
    expect(profileLink).toHaveAttribute("href", "/profile");
    expect(profileLink).toHaveTextContent("Z");
  });

  it("always shows a button that opens the cart", async () => {
    mockedGetSession.mockResolvedValueOnce(null);

    await renderSiteHeader();

    expect(screen.getByRole("button", { name: "Panier" })).not.toHaveAttribute("href");
  });
});
