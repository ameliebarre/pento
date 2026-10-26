import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ScrollReveal, ScrollRevealGroup, ScrollRevealItem } from "@/components/scroll-reveal";
import { ProductCard } from "@/features/products/components/product-card";
import type { MedusaProduct } from "@/features/products/medusa-types";

type DesignerCollectionProps = {
  designerSlug: string;
  designerName: string;
  products: MedusaProduct[];
};

export function DesignerCollection({ designerSlug, designerName, products }: DesignerCollectionProps) {
  if (products.length === 0) return null;

  return (
    <div id="collection" className="flex flex-col gap-10 scroll-mt-32">
      <ScrollReveal>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium tracking-wide text-[#c5964b] uppercase">
              The Collection
            </p>
            <h2 className="font-heading text-3xl text-ink sm:text-4xl">
              Design worth living with
            </h2>
          </div>
          <Link
            href={`/products?designer=${designerSlug}`}
            className="group inline-flex shrink-0 items-center gap-1 text-sm font-medium whitespace-nowrap uppercase"
          >
            View all {designerName} pieces
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </ScrollReveal>

      <ScrollRevealGroup as="ul" className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ScrollRevealItem key={product.id} as="li">
            <ProductCard product={product} />
          </ScrollRevealItem>
        ))}
      </ScrollRevealGroup>
    </div>
  );
}
