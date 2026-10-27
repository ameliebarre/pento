"use client";

import { Label } from "@/components/ui/label";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
import {
  FiltersNavigationLink,
  useFiltersNavigation,
} from "@/features/products/components/filters-navigation";
import { buildClearFilterHref, buildSortHref } from "@/features/products/utils/build-filter-href";
import type { ProductFilters, SortOrder } from "@/features/products/types";

type PriceSortFilterProps = {
  filters: ProductFilters;
};

const OPTIONS: { value: SortOrder; label: string }[] = [
  { value: "price-asc", label: "Prix : - au +" },
  { value: "price-desc", label: "Prix : + au -" },
];

export function PriceSortFilter({ filters }: PriceSortFilterProps) {
  const { navigate, isPending } = useFiltersNavigation();
  return (
    <div role="group" aria-label="Trier par prix" className="flex flex-col gap-2">
      {filters.sort !== null && (
        <FiltersNavigationLink
          href={buildClearFilterHref(filters, "sort")}
          className="text-muted-foreground cursor-pointer self-start text-xs underline-offset-2 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
        >
          Réinitialiser
        </FiltersNavigationLink>
      )}

      <RadioGroup
        value={filters.sort ?? undefined}
        disabled={isPending}
        onValueChange={(value) => navigate(buildSortHref(filters, value as SortOrder))}
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
