import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ImageOff } from "lucide-react";

import { cn } from "@/lib/utils";
import { getPayloadClient } from "@/lib/payload";

// Curated 3x3 mosaic: each column is 3 grid rows tall. "large" tiles span
// 2 rows (a 1x2 cell, ~3:4 once cropped) and sit above a "small" 1-row tile
// (~3:2) in the same column, so every column adds up to the same height.
const CATEGORY_LAYOUT: Record<string, { colStart: string; rowStart: string; rowSpan?: string }> = {
  chairs: { colStart: "lg:col-start-1", rowStart: "lg:row-start-1", rowSpan: "lg:row-span-2" },
  armchairs: { colStart: "lg:col-start-2", rowStart: "lg:row-start-1" },
  sofas: { colStart: "lg:col-start-2", rowStart: "lg:row-start-2" },
  tables: { colStart: "lg:col-start-3", rowStart: "lg:row-start-1", rowSpan: "lg:row-span-2" },
  lighting: { colStart: "lg:col-start-1", rowStart: "lg:row-start-3" },
  accessoiries: { colStart: "lg:col-start-2", rowStart: "lg:row-start-3" },
  outdoor: { colStart: "lg:col-start-3", rowStart: "lg:row-start-3" },
};

export async function ShopByCategory() {
  const payload = await getPayloadClient();
  const { docs: categories } = await payload.find({
    collection: "categories",
    sort: "position",
    depth: 1,
  });

  return (
    <section aria-labelledby="shop-by-category-heading" className="flex flex-col gap-8 py-16">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium tracking-wide text-[#c5964b] uppercase">
            Browse by categories
          </p>
          <h2 id="shop-by-category-heading" className="font-heading max-w-xl text-3xl md:text-4xl">
            Every corner of the home, considered.
          </h2>
        </div>
        <Link
          href="/products"
          className="group inline-flex shrink-0 items-center gap-1 text-sm font-medium whitespace-nowrap uppercase"
        >
          View all categories
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>

      <ul className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:aspect-3/2 lg:grid-cols-3 lg:grid-rows-3 lg:gap-6">
        {categories
          .filter(
            (category): category is typeof category & { slug: string } =>
              !!category.slug && category.slug in CATEGORY_LAYOUT,
          )
          .map((category) => {
            const image = typeof category.image === "object" ? category.image : null;
            const layout = CATEGORY_LAYOUT[category.slug];

            return (
              <li
                key={category.slug}
                className={cn(layout.colStart, layout.rowStart, layout.rowSpan)}
              >
                <Link href={`/products/${category.slug}`} className="group block h-full">
                  <div
                    className={cn(
                      "bg-muted relative w-full overflow-hidden",
                      "aspect-4/3 lg:aspect-auto lg:h-full",
                    )}
                  >
                    {image?.url ? (
                      <Image
                        src={image.url}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="text-muted-foreground flex h-full w-full items-center justify-center">
                        <ImageOff aria-hidden="true" className="size-8" />
                        <span className="sr-only">
                          Aucune image disponible pour {category.title}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/5 to-transparent" />
                    <span className="font-heading absolute inset-x-4 bottom-4 text-xl text-white sm:text-2xl">
                      {category.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute right-4 bottom-4 inline-flex size-9 items-center justify-center rounded-full border border-white/40 bg-white/20 backdrop-blur-sm transition-colors duration-300 group-hover:bg-white/30 sm:size-10"
                    >
                      <ArrowUpRight className="size-4 text-white" />
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
