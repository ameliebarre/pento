"use client";

import { ProductImage } from "@/components/product-image";
import { cn } from "@/lib/utils";

import type { MedusaProductVariant } from "../medusa-types";

type ProductVariantSelectorProps = {
  variants: MedusaProductVariant[];
  selectedVariantId: string | undefined;
  onSelect: (variantId: string) => void;
  productTitle: string;
};

export function ProductVariantSelector({
  variants,
  selectedVariantId,
  onSelect,
  productTitle,
}: ProductVariantSelectorProps) {
  if (variants.length === 0) return null;

  const selectedVariant = variants.find((variant) => variant.id === selectedVariantId);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => {
          const isSelected = variant.id === selectedVariantId;
          const thumbnail = variant.images[0];

          return (
            <button
              key={variant.id}
              type="button"
              aria-pressed={isSelected}
              aria-label={variant.title}
              onClick={() => onSelect(variant.id)}
              className={cn(
                "bg-muted relative size-16 shrink-0 cursor-pointer overflow-hidden border transition-colors",
                isSelected ? "border-ink" : "border-transparent hover:border-ink/30",
              )}
            >
              {thumbnail && (
                <ProductImage src={thumbnail.url} alt={productTitle} fill sizes="64px" className="object-cover" />
              )}
            </button>
          );
        })}
      </div>

      {selectedVariant && selectedVariant.options.length > 0 && (
        <div className="text-sm">
          {selectedVariant.options.map((option, index) => (
            <p key={index}>
              <span className="font-semibold">{option.option?.title ?? "Variant"}</span>: {option.value}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
