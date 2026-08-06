import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Category } from "@/generated/prisma/client";

type CategoryFiltersProps = {
  categories: Pick<Category, "id" | "slug" | "name">[];
  selectedCategories: string[];
};

function buildCategoryHref(slug: string, selectedCategories: string[]): string {
  const categories = selectedCategories.includes(slug)
    ? selectedCategories.filter((selected) => selected !== slug)
    : [...selectedCategories, slug];

  if (categories.length === 0) return "/products";

  const params = new URLSearchParams();
  for (const category of categories) params.append("category", category);
  return `/products?${params.toString()}`;
}

export function CategoryFilters({ categories, selectedCategories }: CategoryFiltersProps) {
  if (categories.length === 0) return null;

  return (
    <div role="group" aria-label="Filtrer par catégorie" className="mt-5 flex flex-col gap-3">
      {selectedCategories.length > 0 && (
        <a
          href="/products"
          className="text-muted-foreground self-start text-xs underline-offset-2 hover:underline"
        >
          Réinitialiser
        </a>
      )}
      <div className="grid grid-cols-2 gap-2">
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category.slug);
          return (
            <a
              key={category.id}
              href={buildCategoryHref(category.slug, selectedCategories)}
              role="button"
              aria-pressed={isSelected}
              className={cn(
                buttonVariants({ variant: isSelected ? "default" : "outline", size: "sm" }),
                "h-10 w-full justify-center rounded-[6px]",
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
