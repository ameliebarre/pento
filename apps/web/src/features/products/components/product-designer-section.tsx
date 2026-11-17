import Link from "next/link";
import { ArrowUpRight, ImageOff } from "lucide-react";

import { ProductImage } from "@/components/product-image";
import { ScrollReveal, ScrollRevealGroup, ScrollRevealItem } from "@/components/scroll-reveal";
import { formatPrice } from "@/lib/utils";

import type { MedusaDesigner, MedusaProduct } from "../medusa-types";
import { getProductPrice } from "../utils/get-product-price";

type ProductDesignerSectionProps = {
  designer: MedusaDesigner;
  products: MedusaProduct[];
};

function DesignerProductRow({ product }: { product: MedusaProduct }) {
  const imageUrl = product.images[0]?.url ?? product.thumbnail ?? null;
  const secondaryDetail = product.materials[0]?.name ?? null;

  return (
    <Link
      href={`/product/${product.handle}`}
      className="group focus-visible:ring-ring/50 -m-2 flex items-center gap-4 rounded-md p-2 outline-none transition-colors duration-300 hover:bg-muted/60 focus-visible:ring-2"
    >
      <div className="bg-muted relative size-16 shrink-0 overflow-hidden">
        {imageUrl ? (
          <ProductImage
            src={imageUrl}
            alt=""
            fill
            sizes="64px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110 group-focus-visible:scale-110 motion-reduce:transition-none"
          />
        ) : (
          <div className="text-muted-foreground flex h-full w-full items-center justify-center">
            <ImageOff aria-hidden="true" className="size-5" />
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="font-heading text-ink truncate text-xl">{product.title}</span>
        <span className="text-muted-foreground text-sm">{formatPrice(getProductPrice(product), "EUR")}</span>
        {secondaryDetail && (
          <span className="text-muted-foreground max-h-0 text-xs opacity-0 transition-all duration-300 ease-out group-hover:max-h-5 group-hover:opacity-100 group-focus-visible:max-h-5 group-focus-visible:opacity-100 motion-reduce:max-h-5 motion-reduce:opacity-100">
            {secondaryDetail}
          </span>
        )}
      </div>

      <ArrowUpRight
        aria-hidden="true"
        className="text-muted-foreground size-4 shrink-0 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5 group-focus-visible:opacity-100 motion-reduce:opacity-100"
      />
    </Link>
  );
}

export function ProductDesignerSection({ designer, products }: ProductDesignerSectionProps) {
  const name = `${designer.first_name} ${designer.last_name}`;
  const bioParagraph = (designer.biography ?? "").split("\n\n").filter(Boolean)[0] ?? null;

  return (
    <section aria-labelledby="designer-section-heading" className="flex flex-col gap-10 border-t border-gray-200 pt-16">
      <ScrollReveal>
        <h2 id="designer-section-heading" className="font-heading text-ink text-3xl sm:text-4xl">
          The designer
        </h2>
      </ScrollReveal>

      <div className="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-0">
        <ScrollReveal
          fromX={-32}
          className="flex flex-col gap-6 sm:flex-row sm:items-start lg:w-[50%] lg:pr-12"
        >
          {designer.image_url && (
            <div className="bg-muted relative aspect-square w-full shrink-0 overflow-hidden sm:w-40 lg:w-44">
              <ProductImage
                src={designer.image_url}
                alt={`Portrait of ${name}`}
                fill
                sizes="(min-width: 1024px) 15vw, (min-width: 640px) 160px, 100vw"
                className="object-cover"
              />
            </div>
          )}
          <div className="flex flex-col gap-3">
            <h3 className="font-heading text-ink text-xl">{name}</h3>
            {bioParagraph && <p className="text-muted-foreground text-xs leading-relaxed">{bioParagraph}</p>}
          </div>
        </ScrollReveal>

        {products.length > 0 && (
          <div className="flex flex-col gap-6 lg:w-[50%] lg:border-l lg:border-gray-200 lg:pl-12">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <h3 className="font-heading text-ink truncate text-base sm:text-xl">
                Discover {name}&apos;s design furnitures
              </h3>
              <Link
                href={`/products?designer=${designer.slug}`}
                className="group inline-flex shrink-0 items-center gap-1 text-sm whitespace-nowrap"
              >
                View more
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>

            <ScrollRevealGroup as="ul" className="flex flex-col gap-4">
              {products.map((product) => (
                <ScrollRevealItem key={product.id} as="li">
                  <DesignerProductRow product={product} />
                </ScrollRevealItem>
              ))}
            </ScrollRevealGroup>
          </div>
        )}
      </div>
    </section>
  );
}
