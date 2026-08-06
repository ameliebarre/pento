import { ProductCard } from "@/features/products/components/product-card";
import { CategoryFilters } from "@/features/products/components/category-filters";
import { DesignerFilters } from "@/features/products/components/designer-filters";
import { SearchParams } from "@/features/products/types";
import { getProductFilters } from "@/features/products/utils/get-product-filters";
import { getProductPageData } from "@/features/products/server/get-product-page-data";

type ShopAllPageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function ShopAllPage({ searchParams }: ShopAllPageProps) {
  const filters = getProductFilters(await searchParams);

  const [products, categories, designers] = await getProductPageData(filters);

  return (
    <div className="flex flex-col gap-8 pt-8 lg:flex-row lg:items-start lg:gap-10">
      <aside aria-label="Filtres" className="w-full shrink-0 lg:w-56">
        <h2 className="mb-4 text-lg font-semibold">Filtres</h2>
        <div className="mt-5 flex flex-col gap-6">
          <CategoryFilters categories={categories} filters={filters} />
          <DesignerFilters designers={designers} filters={filters} />
        </div>
      </aside>
      <div className="flex flex-1 flex-col gap-6">
        {products.length === 0 ? (
          <p className="text-muted-foreground text-sm">Aucun produit disponible pour le moment.</p>
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
  );
}
