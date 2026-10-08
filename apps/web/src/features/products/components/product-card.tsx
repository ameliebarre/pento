import Link from "next/link";
import { ImageOff } from "lucide-react";

import { ProductImage } from "@/components/product-image";
import { AddToCartButton } from "@/features/products/components/add-to-cart-button";
import { formatPrice } from "@/lib/utils";
import type { MedusaProduct } from "@/features/products/medusa-types";
import { getProductPrice } from "@/features/products/utils/get-product-price";

export function ProductCard({ product }: { product: MedusaProduct }) {
  const image = product.images[0];
  const variantId = product.variants[0]?.id;
  const designerNames = product.designers
    .map((designer) => `${designer.first_name} ${designer.last_name}`)
    .join(", ");

  return (
    <div className="group relative flex flex-col gap-3">
      <div className="bg-muted relative aspect-4/5 w-full overflow-hidden">
        {image ? (
          <ProductImage
            src={image.url}
            alt={product.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover"
          />
        ) : (
          <div className="text-muted-foreground flex h-full w-full items-center justify-center">
            <ImageOff aria-hidden="true" className="size-8" />
            <span className="sr-only">Aucune image disponible pour {product.title}</span>
          </div>
        )}
        {variantId && (
          <AddToCartButton
            variantId={variantId}
            className="absolute right-4 bottom-4 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
          />
        )}
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between gap-2">
          <span className="min-w-0 truncate text-sm font-medium uppercase">{product.title}</span>
          <span className="shrink-0 text-xs font-medium">
            {formatPrice(getProductPrice(product), "EUR")}
          </span>
        </div>
        {designerNames && (
          <span className="text-muted-foreground truncate text-xs">{designerNames}</span>
        )}
      </div>
      <Link
        href={`/product/${product.handle}`}
        aria-label={product.title}
        className="absolute inset-0 z-0"
      />
    </div>
  );
}
