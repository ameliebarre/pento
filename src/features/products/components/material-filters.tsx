"use client";

import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  buildClearFilterHref,
  buildToggleFilterHref,
} from "@/features/products/utils/build-filter-href";
import type { ProductFilters } from "@/features/products/types";
import type { Material } from "@/generated/prisma/client";

const VISIBLE_COUNT = 12;

type MaterialFiltersProps = {
  materials: Pick<Material, "id" | "slug" | "name">[];
  filters: ProductFilters;
};

function navigateTo(href: string) {
  // Real navigation on purpose, not next/link or router.push — see
  // designer-filters.tsx for the full writeup on why.
  window.location.href = href;
}

export function MaterialFilters({ materials, filters }: MaterialFiltersProps) {
  // Selecting a material navigates (full page reload), which remounts this
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
    <div role="group" aria-label="Matériaux" className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-xs font-semibold uppercase">Matériaux</h3>
        {filters.materials.length > 0 && (
          <a
            href={buildClearFilterHref(filters, "materials")}
            className="text-muted-foreground text-xs underline-offset-2 hover:underline"
          >
            Réinitialiser
          </a>
        )}
      </div>

      <ul className="flex flex-col gap-2.5">
        {visibleMaterials.map((material) => {
          const isSelected = filters.materials.includes(material.slug);
          const inputId = `material-filter-${material.slug}`;
          return (
            <li key={material.id} className="flex items-center gap-2">
              <Checkbox
                id={inputId}
                checked={isSelected}
                onCheckedChange={() =>
                  navigateTo(buildToggleFilterHref(filters, "materials", material.slug))
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
