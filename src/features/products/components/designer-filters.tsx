"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  buildClearFilterHref,
  buildToggleFilterHref,
} from "@/features/products/utils/build-filter-href";
import type { ProductFilters } from "@/features/products/types";
import type { Designer } from "@/generated/prisma/client";

const VISIBLE_COUNT = 6;

type DesignerFiltersProps = {
  designers: Pick<Designer, "id" | "slug" | "firstName" | "lastName">[];
  filters: ProductFilters;
};

function navigateTo(href: string) {
  window.location.href = href;
}

export function DesignerFilters({ designers, filters }: DesignerFiltersProps) {
  const [search, setSearch] = useState("");
  // Selecting a designer navigates (full page reload), which remounts this
  // component and would otherwise always collapse back to the first
  // VISIBLE_COUNT — hiding a just-selected designer past that cutoff. Default
  // to expanded whenever the current selection has one of those.
  const [showAll, setShowAll] = useState(() =>
    designers.some(
      (designer, index) => index >= VISIBLE_COUNT && filters.designers.includes(designer.slug),
    ),
  );

  const filteredDesigners = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return designers;

    return designers.filter((designer) =>
      `${designer.firstName} ${designer.lastName}`.toLowerCase().includes(query),
    );
  }, [designers, search]);

  if (designers.length === 0) return null;

  const visibleDesigners = showAll ? filteredDesigners : filteredDesigners.slice(0, VISIBLE_COUNT);
  const hasMore = filteredDesigners.length > VISIBLE_COUNT;

  return (
    <div role="group" aria-label="Designers" className="flex flex-col gap-3">
      {filters.designers.length > 0 && (
        <a
          href={buildClearFilterHref(filters, "designers")}
          className="text-muted-foreground self-start text-xs underline-offset-2 hover:underline"
        >
          Réinitialiser
        </a>
      )}

      <div className="relative">
        <Search
          aria-hidden="true"
          className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2"
        />
        <Input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Rechercher un designer"
          aria-label="Rechercher un designer"
          className="rounded-[6px] pl-8"
        />
      </div>

      {visibleDesigners.length === 0 ? (
        <p className="text-muted-foreground text-xs">Aucun designer trouvé.</p>
      ) : (
        <ul className="flex flex-col gap-2.5">
          {visibleDesigners.map((designer) => {
            const isSelected = filters.designers.includes(designer.slug);
            const inputId = `designer-filter-${designer.slug}`;
            return (
              <li key={designer.id} className="flex items-center gap-2">
                <Checkbox
                  id={inputId}
                  checked={isSelected}
                  onCheckedChange={() =>
                    navigateTo(buildToggleFilterHref(filters, "designers", designer.slug))
                  }
                />
                <Label htmlFor={inputId} className="text-sm font-normal">
                  {designer.firstName} {designer.lastName}
                </Label>
              </li>
            );
          })}
        </ul>
      )}

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
