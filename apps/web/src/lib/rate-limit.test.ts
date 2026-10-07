import { describe, expect, it } from "vitest";

import { hitRateLimit } from "@/lib/rate-limit";
import { prisma } from "@/lib/prisma";

describe("hitRateLimit", () => {
  it("allows requests under the limit", async () => {
    const allowed = await hitRateLimit("test:under-limit", { max: 3, windowMs: 60_000 });

    expect(allowed).toBe(true);
  });

  it("blocks once the max is reached within the window", async () => {
    const key = "test:at-limit";
    const options = { max: 3, windowMs: 60_000 };

    expect(await hitRateLimit(key, options)).toBe(true);
    expect(await hitRateLimit(key, options)).toBe(true);
    expect(await hitRateLimit(key, options)).toBe(true);
    expect(await hitRateLimit(key, options)).toBe(false);
  });

  it("does not extend the window when a blocked attempt comes in", async () => {
    const key = "test:no-extend";
    const options = { max: 1, windowMs: 60_000 };

    await hitRateLimit(key, options);
    const beforeBlockedAttempt = await prisma.rateLimitBucket.findUniqueOrThrow({ where: { key } });

    await hitRateLimit(key, options);
    const afterBlockedAttempt = await prisma.rateLimitBucket.findUniqueOrThrow({ where: { key } });

    expect(afterBlockedAttempt.resetAt.getTime()).toBe(beforeBlockedAttempt.resetAt.getTime());
    expect(afterBlockedAttempt.count).toBe(beforeBlockedAttempt.count);
  });

  it("resets the count once the window has elapsed", async () => {
    const key = "test:window-reset";

    await prisma.rateLimitBucket.create({
      data: { key, count: 5, resetAt: new Date(Date.now() - 1000) },
    });

    const allowed = await hitRateLimit(key, { max: 5, windowMs: 60_000 });

    expect(allowed).toBe(true);
    const bucket = await prisma.rateLimitBucket.findUniqueOrThrow({ where: { key } });
    expect(bucket.count).toBe(1);
  });

  it("tracks separate keys independently", async () => {
    const options = { max: 1, windowMs: 60_000 };

    expect(await hitRateLimit("test:key-a", options)).toBe(true);
    expect(await hitRateLimit("test:key-b", options)).toBe(true);
    expect(await hitRateLimit("test:key-a", options)).toBe(false);
  });
});
