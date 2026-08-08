import { SlidersHorizontal } from "lucide-react";

import { Accordion } from "@/components/ui/accordion";
import { ProductCard } from "@/features/products/components/product-card";
import { CategoryFilters } from "@/features/products/components/category-filters";
import { DesignerFilters } from "@/features/products/components/designer-filters";
import { FilterAccordionSection } from "@/features/products/components/filter-accordion-section";
import { MaterialFilters } from "@/features/products/components/material-filters";
import { PriceFilters } from "@/features/products/components/price-filters";
import { PriceSortFilter } from "@/features/products/components/price-sort-filter";
import { SearchParams } from "@/features/products/types";
import { buildFiltersVisibilityHref } from "@/features/products/utils/build-page-href";
import { getProductFilters } from "@/features/products/utils/get-product-filters";
import { getProductPageData } from "@/features/products/server/get-product-page-data";

type ShopAllPageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function ShopAllPage({ searchParams }: ShopAllPageProps) {
  const rawParams = await searchParams;
  const filters = getProductFilters(rawParams);
  const filtersVisible = rawParams.showFilters === "1";

  const [products, categories, designers, materials, priceBounds] =
    await getProductPageData(filters);

  // Auto-expand a section whenever it already has an active selection —
  // otherwise a filter applied earlier would become invisible (collapsed)
  // after a page reload, with no obvious way to tell it's still active.
  const openSections = [
    filters.sort !== null && "sort",
    filters.categories.length > 0 && "categories",
    filters.designers.length > 0 && "designers",
    filters.materials.length > 0 && "materials",
    (filters.minPrice !== null || filters.maxPrice !== null) && "price",
  ].filter((section): section is string => Boolean(section));

  return (
    <div className="flex flex-col gap-6 pt-8">
      <a
        href={buildFiltersVisibilityHref(rawParams, !filtersVisible)}
        className="flex items-center gap-1 self-start text-sm font-medium underline-offset-2 hover:underline"
      >
        {filtersVisible ? "Masquer les filtres" : "Afficher les filtres"}
        <SlidersHorizontal aria-hidden="true" className="size-4" />
      </a>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
        {filtersVisible && (
          <aside aria-label="Filtres" className="w-full shrink-0 lg:w-56">
            <h2 className="font-heading mb-4 text-xl uppercase">Filtres</h2>
            <Accordion multiple defaultValue={openSections}>
              <FilterAccordionSection value="sort" title="Trier par prix">
                <PriceSortFilter filters={filters} />
              </FilterAccordionSection>
              <FilterAccordionSection value="categories" title="Catégories">
                <CategoryFilters categories={categories} filters={filters} />
              </FilterAccordionSection>
              <FilterAccordionSection value="designers" title="Designers">
                <DesignerFilters designers={designers} filters={filters} />
              </FilterAccordionSection>
              <FilterAccordionSection value="materials" title="Matériaux">
                <MaterialFilters materials={materials} filters={filters} />
              </FilterAccordionSection>
              <FilterAccordionSection value="price" title="Prix">
                <PriceFilters bounds={priceBounds} filters={filters} />
              </FilterAccordionSection>
            </Accordion>
          </aside>
        )}
        <div className="flex flex-1 flex-col gap-6">
          {products.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              Aucun produit disponible pour le moment.
            </p>
          ) : (
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
