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
});

afterAll(async () => {
  await prisma.$disconnect();
});
