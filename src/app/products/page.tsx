import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/product-card";

export default async function ShopAllPage() {
  const products = await prisma.product.findMany({
    include: {
      images: { take: 1, orderBy: { position: "asc" } },
      designers: { include: { designer: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-6 pt-8">
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
  );
}
