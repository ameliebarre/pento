import Link from "next/link";
import { ImageOff } from "lucide-react";

import { ProductImage } from "@/components/product-image";
import { AddToCartButton } from "@/features/products/components/add-to-cart-button";
import { formatPrice } from "@/lib/utils";
import type { Prisma } from "@prisma/client";

export type ProductWithImage = Prisma.ProductGetPayload<{
  include: {
    images: { take: 1 };
    designers: { include: { designer: true } };
  };
}>;

export function ProductCard({ product }: { product: ProductWithImage }) {
  const image = product.images[0];
  const designerNames = product.designers
    .map(({ designer }) => `${designer.firstName} ${designer.lastName}`)
    .join(", ");

  return (
    <div className="group relative flex flex-col gap-3">
      <div className="bg-muted relative aspect-4/5 w-full overflow-hidden">
        {image ? (
          <ProductImage
            src={image.url}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover"
          />
        ) : (
          <div className="text-muted-foreground flex h-full w-full items-center justify-center">
            <ImageOff aria-hidden="true" className="size-8" />
            <span className="sr-only">Aucune image disponible pour {product.name}</span>
          </div>
        )}
        <AddToCartButton
          productId={product.id}
          className="absolute right-4 bottom-4 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-medium uppercase">{product.name}</span>
          <span className="text-xs font-medium">
            {formatPrice(product.price.toString(), product.currency)}
          </span>
        </div>
        {designerNames && <span className="text-muted-foreground text-xs">{designerNames}</span>}
      </div>
      <Link
        href={`/product/${product.slug}`}
        aria-label={product.name}
        className="absolute inset-0 z-0"
      />
    </div>
  );
}
