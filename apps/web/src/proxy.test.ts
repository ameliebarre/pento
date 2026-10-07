import { NextRequest } from "next/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/get-session", () => ({
  getSession: vi.fn(),
}));

import { getSession } from "@/lib/get-session";
import { proxy } from "@/proxy";

const mockedGetSession = vi.mocked(getSession);

describe("proxy", () => {
  it("redirects to /login when there is no session", async () => {
    mockedGetSession.mockResolvedValueOnce(null);

    const response = await proxy(new NextRequest("http://localhost:3000/profile"));

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost:3000/login");
  });

  it("lets the request through when there is a session", async () => {
    mockedGetSession.mockResolvedValueOnce({
      user: { id: "user_1" },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    const response = await proxy(new NextRequest("http://localhost:3000/profile"));

    expect(response.headers.get("location")).toBeNull();
    expect(response.status).toBe(200);
  });
});
