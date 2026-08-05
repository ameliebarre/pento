import { afterAll, beforeEach } from "vitest";

import { prisma } from "@/lib/prisma";

beforeEach(async () => {
  await prisma.verification.deleteMany();
  await prisma.rateLimitBucket.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  // Product catalog — deleted after `user` so any CartItem referencing a
  // product (via a still-required, non-cascading relation) is already gone.
  await prisma.product.deleteMany();
  await prisma.designer.deleteMany();
  await prisma.manufacturer.deleteMany();
  await prisma.movement.deleteMany();
  await prisma.material.deleteMany();
  await prisma.image.deleteMany();
  await prisma.category.deleteMany();
  await prisma.country.deleteMany();
  await prisma.tag.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});
