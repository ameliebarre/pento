import Link from "next/link";
import { ArrowRight, ImageOff } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { ProductImage } from "@/components/product-image";

export async function BrowseByMovement() {
  const movements = await prisma.movement.findMany({
    include: {
      coverImage: true,
      _count: { select: { products: true } },
    },
    take: 6,
    orderBy: { name: "asc" },
  });

  return (
    <section aria-labelledby="browse-by-movement-heading" className="flex flex-col gap-2 py-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 id="browse-by-movement-heading" className="text-sm font-semibold uppercase">
          Browse by movement
        </h2>
        <Link href="/products" className="group inline-flex items-center gap-2 text-sm font-medium">
          View all movements
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {movements.map((movement) => (
          <li key={movement.id}>
            <div className="bg-muted relative aspect-4/3 w-full overflow-hidden">
              {movement.coverImage ? (
                <ProductImage
                  src={movement.coverImage.url}
                  alt={movement.coverImage.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <div className="text-muted-foreground flex h-full w-full items-center justify-center">
                  <ImageOff aria-hidden="true" className="size-8" />
                  <span className="sr-only">Aucune image disponible pour {movement.name}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/15 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 flex items-end justify-between text-white">
                <h3 className="text-sm uppercase">{movement.name}</h3>
                <span className="shrink-0 pb-0.5 text-xs whitespace-nowrap">
                  {movement._count.products} pièce{movement._count.products > 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
