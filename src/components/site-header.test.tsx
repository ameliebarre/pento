// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/lib/get-session", () => ({
  getSession: vi.fn(),
}));

import { getSession } from "@/lib/get-session";
import { SiteHeader } from "@/components/site-header";

const mockedGetSession = vi.mocked(getSession);

describe("SiteHeader", () => {
  it("shows a login button and no account avatar when there is no session", async () => {
    mockedGetSession.mockResolvedValueOnce(null);

    render(await SiteHeader());

    expect(screen.getByRole("button", { name: "Se connecter" })).toHaveAttribute("href", "/login");
    expect(screen.queryByRole("link", { name: /profil/i })).not.toBeInTheDocument();
  });

  it("shows an avatar linking to the profile page with the first name's initial", async () => {
    mockedGetSession.mockResolvedValueOnce({
      user: { firstName: "Amelie", lastName: "Barre", email: "amelie@example.com" },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    render(await SiteHeader());

    const profileLink = screen.getByRole("link", { name: "Mon profil" });
    expect(profileLink).toHaveAttribute("href", "/profile");
    expect(profileLink).toHaveTextContent("A");
  });

  it("falls back to the email's initial when there is no first name", async () => {
    mockedGetSession.mockResolvedValueOnce({
      user: { firstName: null, lastName: null, email: "zeta@example.com" },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    render(await SiteHeader());

    const profileLink = screen.getByRole("link", { name: "Mon profil" });
    expect(profileLink).toHaveAttribute("href", "/profile");
    expect(profileLink).toHaveTextContent("Z");
  });

  it("always shows a link to the cart", async () => {
    mockedGetSession.mockResolvedValueOnce(null);

    render(await SiteHeader());

    expect(screen.getByRole("button", { name: "Panier" })).toHaveAttribute("href", "/cart");
  });
});
