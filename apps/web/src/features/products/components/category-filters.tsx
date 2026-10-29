import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FiltersNavigationLink } from "@/features/products/components/filters-navigation";
import {
  buildClearFilterHref,
  buildToggleFilterHref,
} from "@/features/products/utils/build-filter-href";
import type { ProductFilters } from "@/features/products/types";
import type { MedusaCategory } from "@/features/products/medusa-types";

type CategoryFiltersProps = {
  categories: Pick<MedusaCategory, "id" | "handle" | "name">[];
  filters: ProductFilters;
};

export function CategoryFilters({ categories, filters }: CategoryFiltersProps) {
  if (categories.length === 0) return null;

  const resetHref =
    filters.categories.length > 0 ? buildClearFilterHref(filters, "categories") : null;

  return (
    <div role="group" aria-label="Catégories" className="flex flex-col gap-2">
      {resetHref && (
        <FiltersNavigationLink
          href={resetHref}
          className="text-muted-foreground self-start text-xs underline-offset-2 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
        >
          Réinitialiser
        </FiltersNavigationLink>
      )}
      <div className="grid grid-cols-2 gap-2">
        {categories.map((category) => {
          const isSelected = filters.categories.includes(category.handle);
          return (
            <FiltersNavigationLink
              key={category.id}
              href={buildToggleFilterHref(filters, "categories", category.handle)}
              aria-pressed={isSelected}
              className={cn(
                buttonVariants({ variant: isSelected ? "default" : "outline", size: "sm" }),
                "h-auto min-h-10 w-full justify-center rounded-[6px] px-3 py-2 text-center whitespace-normal",
              )}
            >
              {category.name}
            </FiltersNavigationLink>
          );
        })}
      </div>
    </div>
  );
}
