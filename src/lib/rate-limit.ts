import { prisma } from "@/lib/prisma";

type RateLimitOptions = { max: number; windowMs: number };

// Fixed-window counter backed by Postgres so the limit holds across every
// server instance instead of an in-memory map that resets per process. Under
// heavy concurrent traffic on the same key there's a small race between the
// read and the write below; an occasional extra attempt slipping through is
// an acceptable trade-off here over the complexity of row-level locking.
export async function hitRateLimit(key: string, { max, windowMs }: RateLimitOptions): Promise<boolean> {
  const now = new Date();
  const bucket = await prisma.rateLimitBucket.findUnique({ where: { key } });

  if (!bucket || bucket.resetAt <= now) {
    await prisma.rateLimitBucket.upsert({
      where: { key },
      create: { key, count: 1, resetAt: new Date(now.getTime() + windowMs) },
      update: { count: 1, resetAt: new Date(now.getTime() + windowMs) },
    });
    return true;
  }

  if (bucket.count >= max) {
    return false;
  }

  await prisma.rateLimitBucket.update({
    where: { key },
    data: { count: { increment: 1 } },
  });
  return true;
}
