// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/lib/get-session", () => ({
  getSession: vi.fn(),
}));

vi.mock("@/auth", () => ({
  auth: { api: { revokeOtherSessions: vi.fn(), signOut: vi.fn() } },
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
import ProfilePage from "@/app/profile/page";

const mockedGetSession = vi.mocked(getSession);

function search(params: Record<string, string> = {}) {
  return Promise.resolve(params);
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

    render(await ProfilePage({ searchParams: search() }));

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

    render(await ProfilePage({ searchParams: search() }));

    expect(screen.getAllByText("—")).toHaveLength(2);
  });

  it("shows a confirmation once other devices have been revoked", async () => {
    mockedGetSession.mockResolvedValueOnce({
      user: { firstName: "Amelie", lastName: "Barre", email: "amelie@example.com" },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    render(await ProfilePage({ searchParams: search({ revoked: "1" }) }));

    expect(screen.getByRole("status")).toHaveTextContent(
      "Les autres appareils ont été déconnectés.",
    );
  });

  it("does not show the revoked confirmation by default", async () => {
    mockedGetSession.mockResolvedValueOnce({
      user: { firstName: "Amelie", lastName: "Barre", email: "amelie@example.com" },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    render(await ProfilePage({ searchParams: search() }));

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
