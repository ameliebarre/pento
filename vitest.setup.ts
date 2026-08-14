import { afterAll, beforeEach } from "vitest";

import { prisma } from "@/lib/prisma";

// jsdom doesn't implement PointerEvent, which Base UI's interactive
// primitives (Checkbox, Button, ...) rely on for click handling.
if (typeof window !== "undefined" && !window.PointerEvent) {
  class PointerEventPolyfill extends MouseEvent {
    pointerId?: number;
    pointerType?: string;
    isPrimary?: boolean;

    constructor(type: string, params: PointerEventInit = {}) {
      super(type, params);
      this.pointerId = params.pointerId;
      this.pointerType = params.pointerType;
      this.isPrimary = params.isPrimary;
    }
  }
  window.PointerEvent = PointerEventPolyfill as unknown as typeof PointerEvent;

  Element.prototype.hasPointerCapture ??= () => false;
  Element.prototype.setPointerCapture ??= () => {};
  Element.prototype.releasePointerCapture ??= () => {};
  Element.prototype.scrollIntoView ??= () => {};
}

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

  // Payload-managed catalog (dedicated "payload" Postgres schema) — no Local
  // API bulk-delete, so truncate directly via the same Postgres connection.
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE
      payload.products_rels,
      payload.products,
      payload.categories,
      payload.designers,
      payload.manufacturers,
      payload.materials,
      payload.movements,
      payload.tags,
      payload.countries,
      payload.media,
      payload.hero_banner,
      payload.users_sessions,
      payload.users
    RESTART IDENTITY CASCADE;
  `);
});

afterAll(async () => {
  await prisma.$disconnect();
});
