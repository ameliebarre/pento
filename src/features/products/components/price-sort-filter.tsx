"use client";

import { Label } from "@/components/ui/label";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
import { buildClearFilterHref, buildSortHref } from "@/features/products/utils/build-filter-href";
import type { ProductFilters, SortOrder } from "@/features/products/types";

type PriceSortFilterProps = {
  filters: ProductFilters;
};

function navigateTo(href: string) {
  // Real navigation on purpose, not next/link or router.push — see
  // designer-filters.tsx for the full writeup on why.
  window.location.href = href;
}

const OPTIONS: { value: SortOrder; label: string }[] = [
  { value: "price-asc", label: "Prix : - au +" },
  { value: "price-desc", label: "Prix : + au -" },
];

export function PriceSortFilter({ filters }: PriceSortFilterProps) {
  return (
    <div role="group" aria-label="Trier par prix" className="flex flex-col gap-3">
      {filters.sort !== null && (
        <a
          href={buildClearFilterHref(filters, "sort")}
          className="text-muted-foreground cursor:pointer self-start text-xs underline-offset-2 hover:underline"
        >
          Réinitialiser
        </a>
      )}

      <RadioGroup
        value={filters.sort ?? undefined}
        onValueChange={(value) => navigateTo(buildSortHref(filters, value as SortOrder))}
      >
        {OPTIONS.map((option) => {
          const inputId = `price-sort-${option.value}`;
          return (
            <div key={option.value} className="flex items-center gap-2">
              <Radio value={option.value} id={inputId} />
              <Label htmlFor={inputId} className="text-sm font-normal">
                {option.label}
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
}
