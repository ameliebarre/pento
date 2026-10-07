"use client";

import { useState } from "react";

import { Slider } from "@/components/ui/slider";
import {
  buildClearFilterHref,
  buildPriceFilterHref,
} from "@/features/products/utils/build-filter-href";
import { formatPrice } from "@/lib/utils";
import type { PriceBounds } from "@/features/products/server/get-product-page-data";
import type { ProductFilters } from "@/features/products/types";

const STEP = 10;

type PriceFiltersProps = {
  bounds: PriceBounds;
  filters: ProductFilters;
};

function navigateTo(href: string) {
  // Real navigation on purpose, not next/link or router.push: with several
  // filters toggling the same repeated search params, Next's client-side
  // router can get stuck showing stale content after a soft navigation (see
  // category-filters for the full writeup) — a full navigation sidesteps it.
  window.location.href = href;
}

function getAriaLabel(index: number) {
  return index === 0 ? "Prix minimum" : "Prix maximum";
}

export function PriceFilters({ bounds, filters }: PriceFiltersProps) {
  const [range, setRange] = useState<readonly [number, number]>([
    filters.minPrice ?? bounds.min,
    filters.maxPrice ?? bounds.max,
  ]);

  if (bounds.min >= bounds.max) return null;

  const isActive = filters.minPrice !== null || filters.maxPrice !== null;

  return (
    <div role="group" aria-label="Prix" className="flex flex-col gap-3">
      {isActive && (
        <a
          href={buildClearFilterHref(filters, "price")}
          className="text-muted-foreground self-start text-xs underline-offset-2 hover:underline"
        >
          Réinitialiser
        </a>
      )}

      <div className="flex items-center justify-between text-sm font-medium">
        <span>{formatPrice(range[0])}</span>
        <span>{formatPrice(range[1])}</span>
      </div>

      <Slider
        min={bounds.min}
        max={bounds.max}
        step={STEP}
        value={range}
        format={{ style: "currency", currency: "EUR" }}
        getAriaLabel={getAriaLabel}
        onValueChange={(value) => setRange(value as [number, number])}
        onValueCommitted={(value) => {
          const [min, max] = value as [number, number];
          navigateTo(buildPriceFilterHref(filters, min, max));
        }}
        className="mt-1"
      />
    </div>
  );
}
