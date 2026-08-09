import { describe, expect, it, vi } from "vitest";

const mockHeaders = vi.fn();
vi.mock("next/headers", () => ({
  headers: () => mockHeaders(),
}));

import { getClientIp } from "@/lib/request-ip";

describe("getClientIp", () => {
  it("returns the first address from x-forwarded-for", async () => {
    mockHeaders.mockResolvedValueOnce(new Headers({ "x-forwarded-for": "203.0.113.1, 70.41.3.18" }));

    await expect(getClientIp()).resolves.toBe("203.0.113.1");
  });

  it("trims whitespace around the first x-forwarded-for address", async () => {
    mockHeaders.mockResolvedValueOnce(new Headers({ "x-forwarded-for": "  203.0.113.1 ,70.41.3.18" }));

    await expect(getClientIp()).resolves.toBe("203.0.113.1");
  });

  it("falls back to x-real-ip when x-forwarded-for is absent", async () => {
    mockHeaders.mockResolvedValueOnce(new Headers({ "x-real-ip": "198.51.100.7" }));

    await expect(getClientIp()).resolves.toBe("198.51.100.7");
  });

  it("falls back to \"unknown\" when neither header is present", async () => {
    mockHeaders.mockResolvedValueOnce(new Headers());

    await expect(getClientIp()).resolves.toBe("unknown");
  });
});
