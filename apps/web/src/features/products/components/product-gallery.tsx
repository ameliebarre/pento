"use client";

import { ImageOff } from "lucide-react";

import { ProductImage } from "@/components/product-image";
import { cn } from "@/lib/utils";

import type { MedusaProductImage, MedusaProductVariant } from "../medusa-types";

type ProductGalleryProps = {
  images: MedusaProductImage[];
  variants: MedusaProductVariant[];
  selectedVariantId: string | undefined;
  productTitle: string;
};

export function ProductGallery({ images, variants, selectedVariantId, productTitle }: ProductGalleryProps) {
  // Images tagged to a variant only belong on screen while that variant is
  // selected; images tagged to no variant at all are shared and always shown.
  const variantTaggedImageIds = new Set(variants.flatMap((variant) => variant.images.map((image) => image.id)));
  const selectedVariantImageIds = new Set(
    variants.find((variant) => variant.id === selectedVariantId)?.images.map((image) => image.id) ?? [],
  );
  const visibleImages = images.filter(
    (image) => !variantTaggedImageIds.has(image.id) || selectedVariantImageIds.has(image.id),
  );

  if (visibleImages.length === 0) {
    return (
      <div className="bg-muted text-muted-foreground relative flex aspect-4/5 w-full items-center justify-center overflow-hidden">
        <ImageOff aria-hidden="true" className="size-8" />
        <span className="sr-only">Aucune image disponible pour {productTitle}</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {/*
        Every variant-tagged image stays mounted at all times — only its
        visibility and grid order change — so switching variants is a CSS
        toggle instead of mounting a brand-new <Image>, which would
        otherwise cold-fetch/re-transform the Cloudinary asset on first
        selection and show up as a multi-second delay.
      */}
      {images.map((image) => {
        const isVariantImage = selectedVariantImageIds.has(image.id);
        const isHidden = variantTaggedImageIds.has(image.id) && !isVariantImage;

        return (
          <div
            key={image.id}
            className={cn(
              "bg-muted relative aspect-4/5 w-full overflow-hidden",
              isVariantImage && "order-first",
              isHidden && "hidden",
            )}
          >
            <ProductImage
              src={image.url}
              alt={productTitle}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover"
              loading="eager"
            />
          </div>
        );
      })}
    </div>
  );
}
