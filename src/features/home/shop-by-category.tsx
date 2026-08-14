import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ImageOff } from "lucide-react";

import { getPayloadClient } from "@/lib/payload";

export async function ShopByCategory() {
  const payload = await getPayloadClient();
  const { docs: categories } = await payload.find({
    collection: "categories",
    sort: "position",
    depth: 1,
  });

  return (
    <section aria-labelledby="shop-by-category-heading" className="flex flex-col gap-2 py-16">
      <h2 id="shop-by-category-heading" className="shrink-0 text-sm uppercase">
        Shop by categories
      </h2>
      <ul className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => {
          const image = typeof category.image === "object" ? category.image : null;

          return (
            <li key={category.slug}>
              <Link
                href={`/products/${category.slug}`}
                className="group flex flex-col items-center gap-3"
              >
                <div className="bg-muted relative aspect-3/4 w-full overflow-hidden">
                  {image?.url ? (
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 20vw, (min-width: 640px) 25vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="text-muted-foreground flex h-full w-full items-center justify-center">
                      <ImageOff aria-hidden="true" className="size-8" />
                      <span className="sr-only">Aucune image disponible pour {category.title}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/15 to-transparent" />
                  <span className="absolute inset-x-4 bottom-4 inline-flex items-center gap-1 text-xs whitespace-nowrap text-white uppercase">
                    {category.title}
                    <ArrowRight
                      aria-hidden="true"
                      className="size-3 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
