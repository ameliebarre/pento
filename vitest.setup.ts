import { afterAll, beforeEach } from "vitest";

import { prisma } from "@/lib/prisma";

beforeEach(async () => {
  await prisma.verification.deleteMany();
  await prisma.rateLimitBucket.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});
