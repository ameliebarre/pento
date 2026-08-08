import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buildClearFilterHref, buildToggleFilterHref } from "@/features/products/utils/build-filter-href";
import type { ProductFilters } from "@/features/products/types";
import type { Category } from "@/generated/prisma/client";

type CategoryFiltersProps = {
  categories: Pick<Category, "id" | "slug" | "name">[];
  filters: ProductFilters;
};

export function CategoryFilters({ categories, filters }: CategoryFiltersProps) {
  if (categories.length === 0) return null;

  const resetHref =
    filters.categories.length > 0 ? buildClearFilterHref(filters, "categories") : null;

  return (
    <div role="group" aria-label="Catégories" className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-xs font-semibold uppercase">Catégories</h3>
        {resetHref && (
          <a
            href={resetHref}
            className="text-muted-foreground text-xs underline-offset-2 hover:underline"
          >
            Réinitialiser
          </a>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {categories.map((category) => {
          const isSelected = filters.categories.includes(category.slug);
          return (
            <a
              key={category.id}
              href={buildToggleFilterHref(filters, "categories", category.slug)}
              role="button"
              aria-pressed={isSelected}
              className={cn(
                buttonVariants({ variant: isSelected ? "default" : "outline", size: "sm" }),
                "h-auto min-h-10 w-full justify-center rounded-[6px] px-3 py-2 text-center whitespace-normal",
              )}
            >
              {category.name}
            </a>
          );
        })}
      </div>
    </div>
  );
}
