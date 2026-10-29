import { ImageOff } from "lucide-react";

import { medusa } from "@/lib/medusa";
import { formatPrice } from "@/lib/utils";
import { ProductImage } from "@/components/product-image";
import { ScrollReveal, ScrollRevealGroup, ScrollRevealItem } from "@/components/scroll-reveal";
import type { MedusaProduct } from "@/features/products/medusa-types";
import { getProductPrice } from "@/features/products/utils/get-product-price";

export async function CuratedSelection() {
  const { products: allProducts } = await medusa.client.fetch<{ products: MedusaProduct[] }>(
    "/store/products/full",
  );

  const products = allProducts
    .filter((product) => product.metadata?.isFeatured === true)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 6);

  if (products.length === 0) return null;

  return (
    <section
      aria-labelledby="curated-selection-heading"
      className="bg-dull-white relative right-1/2 left-1/2 mx-[-50vw] w-screen py-16 sm:py-20"
    >
      <ScrollReveal>
        <div className="mx-auto flex max-w-xl flex-col items-center gap-2 px-6 text-center">
          <p className="text-dark-buff text-sm font-medium tracking-wide uppercase">
            Curated selection
          </p>
          <h2 id="curated-selection-heading" className="font-heading text-3xl md:text-4xl">
            The pieces our collectors covet
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            A rotating gallery of icons and rare editions — each authenticated by our curators and
            restored to its original glory.
          </p>
        </div>
      </ScrollReveal>

      <ScrollRevealGroup
        as="ul"
        className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-x-4 gap-y-8 sm:mt-12 sm:grid-cols-2 sm:gap-x-3 lg:grid-cols-3"
      >
        {products.map((product) => {
          const image = product.images[0] ?? null;
          const designerNames = product.designers
            .map((designer) => `${designer.first_name} ${designer.last_name}`)
            .join(" & ");

          return (
            <ScrollRevealItem key={product.id} as="li" className="flex flex-col">
              <div className="relative aspect-square w-full overflow-hidden">
                {image ? (
                  <ProductImage
                    src={image.url}
                    alt={product.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="text-muted-foreground flex h-full w-full items-center justify-center">
                    <ImageOff aria-hidden="true" className="size-8" />
                    <span className="sr-only">Aucune image disponible pour {product.title}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1 pt-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="min-w-0 truncate text-sm font-medium uppercase">
                    {product.title}
                  </span>
                  <span className="shrink-0 text-xs font-medium">
                    {formatPrice(getProductPrice(product), "EUR")}
                  </span>
                </div>
                {designerNames ? (
                  <span className="text-muted-foreground truncate text-xs">{designerNames}</span>
                ) : null}
              </div>
            </ScrollRevealItem>
          );
        })}
      </ScrollRevealGroup>
    </section>
  );
}
