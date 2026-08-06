import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/product-card";
import { CategoryFilters } from "@/components/category-filters";

type ShopAllPageProps = {
  searchParams: Promise<{ category?: string | string[] }>;
};

function toSlugArray(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

export default async function ShopAllPage({ searchParams }: ShopAllPageProps) {
  const selectedCategories = toSlugArray((await searchParams).category);
  const hasSelectedCategories = selectedCategories.length > 0;

  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where: hasSelectedCategories ? { category: { slug: { in: selectedCategories } } } : undefined,
      include: {
        images: { take: 1, orderBy: { createdAt: "asc" } },
        designers: { include: { designer: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="flex flex-col gap-8 pt-8 lg:flex-row lg:items-start lg:gap-10">
      <aside aria-label="Filtres" className="w-full shrink-0 lg:w-56">
        <h2 className="mb-4 text-lg font-semibold">Filtres</h2>
        <hr className="grow border-t border-gray-300" />
        <CategoryFilters categories={categories} selectedCategories={selectedCategories} />
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
