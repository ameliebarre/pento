import { describe, expect, it } from "vitest";

import { cn, formatPrice } from "@/lib/utils";

describe("cn", () => {
  it("merges class names and resolves Tailwind conflicts", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });

  it("drops falsy values", () => {
    expect(cn("text-sm", false, undefined, null, "font-medium")).toBe("text-sm font-medium");
  });
});

// Intl.NumberFormat inserts Unicode space separators (e.g. narrow no-break
// space) as thousands/currency separators in fr-FR — normalize any
// whitespace to a plain space so assertions stay readable and don't depend
// on which exact character got saved in this file.
function normalizeSpaces(value: string) {
  return value.replace(/\s+/g, " ");
}

describe("formatPrice", () => {
  it("formats a number as EUR currency in fr-FR locale", () => {
    expect(normalizeSpaces(formatPrice(1445))).toBe("1 445,00 €");
  });

  it("formats a string (as returned by Prisma Decimal) the same way", () => {
    expect(normalizeSpaces(formatPrice("1445"))).toBe("1 445,00 €");
  });

  it("supports a different currency", () => {
    expect(normalizeSpaces(formatPrice(100, "USD"))).toBe("100,00 $US");
  });

  it("formats decimal values", () => {
    expect(normalizeSpaces(formatPrice("19.9"))).toBe("19,90 €");
  });
});
