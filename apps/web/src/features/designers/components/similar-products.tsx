import { ScrollReveal, ScrollRevealGroup, ScrollRevealItem } from "@/components/scroll-reveal";
import { ProductCard } from "@/features/products/components/product-card";
import type { MedusaProduct } from "@/features/products/medusa-types";

type SimilarProductsProps = {
  products: MedusaProduct[];
};

export function SimilarProducts({ products }: SimilarProductsProps) {
  if (products.length === 0) return null;

  return (
    <div id="similar-products" className="flex scroll-mt-32 flex-col gap-10">
      <ScrollReveal>
        <div className="flex flex-col gap-2">
          <p className="text-dark-buff text-sm font-medium tracking-wide uppercase">
            Similar Products
          </p>
          <h2 className="font-heading text-ink text-3xl sm:text-4xl">You may also like</h2>
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
