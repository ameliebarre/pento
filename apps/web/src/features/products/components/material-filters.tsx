"use client";

import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  FiltersNavigationLink,
  useFiltersNavigation,
} from "@/features/products/components/filters-navigation";
import {
  buildClearFilterHref,
  buildToggleFilterHref,
} from "@/features/products/utils/build-filter-href";
import type { ProductFilters } from "@/features/products/types";
import type { MedusaMaterial } from "@/features/products/medusa-types";

const VISIBLE_COUNT = 12;

type MaterialFiltersProps = {
  materials: Pick<MedusaMaterial, "id" | "slug" | "name">[];
  filters: ProductFilters;
};

export function MaterialFilters({ materials, filters }: MaterialFiltersProps) {
  const { navigate, isPending } = useFiltersNavigation();
  // Selecting a material navigates, which remounts this
  // component and would otherwise always collapse back to the first
  // VISIBLE_COUNT — hiding a just-selected material past that cutoff. Default
  // to expanded whenever the current selection has one of those.
  const [showAll, setShowAll] = useState(() =>
    materials.some(
      (material, index) => index >= VISIBLE_COUNT && filters.materials.includes(material.slug),
    ),
  );

  if (materials.length === 0) return null;

  const visibleMaterials = showAll ? materials : materials.slice(0, VISIBLE_COUNT);
  const hasMore = materials.length > VISIBLE_COUNT;

  return (
    <div role="group" aria-label="Matériaux" className="flex flex-col gap-2">
      {filters.materials.length > 0 && (
        <FiltersNavigationLink
          href={buildClearFilterHref(filters, "materials")}
          className="text-muted-foreground self-start text-xs underline-offset-2 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
        >
          Réinitialiser
        </FiltersNavigationLink>
      )}

      <ul className="flex flex-col gap-2.5">
        {visibleMaterials.map((material) => {
          const isSelected = filters.materials.includes(material.slug);
          const inputId = `material-filter-${material.slug}`;
          return (
            <li key={material.id} className="flex items-center gap-2">
              <Checkbox
                id={inputId}
                checked={isSelected}
                disabled={isPending}
                onCheckedChange={() =>
                  navigate(buildToggleFilterHref(filters, "materials", material.slug))
                }
              />
              <Label htmlFor={inputId} className="text-sm font-normal">
                {material.name}
              </Label>
            </li>
          );
        })}
      </ul>

      {hasMore && (
        <button
          type="button"
          onClick={() => setShowAll((current) => !current)}
          className="text-muted-foreground self-start text-xs underline-offset-2 hover:underline"
        >
          {showAll ? "Voir moins" : "Voir plus"}
        </button>
      )}
    </div>
  );
}
