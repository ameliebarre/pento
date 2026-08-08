"use client";

import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  buildClearFilterHref,
  buildToggleFilterHref,
} from "@/features/products/utils/build-filter-href";
import type { ProductFilters } from "@/features/products/types";
import type { Movement } from "@/generated/prisma/client";

const VISIBLE_COUNT = 12;

type MovementFiltersProps = {
  movements: Pick<Movement, "id" | "slug" | "name">[];
  filters: ProductFilters;
};

function navigateTo(href: string) {
  // Real navigation on purpose, not next/link or router.push — see
  // designer-filters.tsx for the full writeup on why.
  window.location.href = href;
}

export function MovementFilters({ movements, filters }: MovementFiltersProps) {
  // Selecting a movement navigates (full page reload), which remounts this
  // component and would otherwise always collapse back to the first
  // VISIBLE_COUNT — hiding a just-selected movement past that cutoff. Default
  // to expanded whenever the current selection has one of those.
  const [showAll, setShowAll] = useState(() =>
    movements.some(
      (movement, index) => index >= VISIBLE_COUNT && filters.movements.includes(movement.slug),
    ),
  );

  if (movements.length === 0) return null;

  const visibleMovements = showAll ? movements : movements.slice(0, VISIBLE_COUNT);
  const hasMore = movements.length > VISIBLE_COUNT;

  return (
    <div role="group" aria-label="Mouvements" className="flex flex-col gap-3">
      {filters.movements.length > 0 && (
        <a
          href={buildClearFilterHref(filters, "movements")}
          className="text-muted-foreground self-start text-xs underline-offset-2 hover:underline"
        >
          Réinitialiser
        </a>
      )}

      <ul className="flex flex-col gap-2.5">
        {visibleMovements.map((movement) => {
          const isSelected = filters.movements.includes(movement.slug);
          const inputId = `movement-filter-${movement.slug}`;
          return (
            <li key={movement.id} className="flex items-center gap-2">
              <Checkbox
                id={inputId}
                checked={isSelected}
                onCheckedChange={() =>
                  navigateTo(buildToggleFilterHref(filters, "movements", movement.slug))
                }
              />
              <Label htmlFor={inputId} className="text-sm font-normal">
                {movement.name}
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
