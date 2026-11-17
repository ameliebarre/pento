"use client";

import { useRef, useState } from "react";

import { formatPrice } from "@/lib/utils";

import type { MedusaProduct } from "../medusa-types";
import { getProductPrice } from "../utils/get-product-price";
import { AddToCartWithQuantity } from "./add-to-cart-with-quantity";
import { ProductDescription } from "./product-description";
import { ProductGallery } from "./product-gallery";
import { ProductTabs } from "./product-tabs";
import { ProductVariantSelector } from "./product-variant-selector";

type ProductDetailsProps = {
  product: MedusaProduct;
};

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0]?.id);
  const selectedVariant = product.variants.find((variant) => variant.id === selectedVariantId);

  const [openTab, setOpenTab] = useState<string[]>([]);
  const tabsRef = useRef<HTMLDivElement>(null);

  const designerNames = product.designers
    .map((designer) => `${designer.first_name} ${designer.last_name}`)
    .join(", ");

  const handleViewMoreDescription = () => {
    setOpenTab(["description"]);
    tabsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
      <div className="flex-1">
        <ProductGallery
          images={product.images}
          variants={product.variants}
          selectedVariantId={selectedVariant?.id}
          productTitle={product.title}
        />
      </div>

      <div className="flex flex-1 flex-col gap-6 lg:sticky lg:top-32 lg:max-w-md">
        <div className="flex flex-col gap-2">
          <h1 className="font-heading text-2xl uppercase">{product.title}</h1>
          {designerNames && <p className="text-muted-foreground text-sm">{designerNames}</p>}
          <p className="text-lg font-medium">{formatPrice(getProductPrice(product), "EUR")}</p>
        </div>

        {product.description && (
          <ProductDescription description={product.description} onViewMore={handleViewMoreDescription} />
        )}

        <ProductVariantSelector
          variants={product.variants}
          selectedVariantId={selectedVariant?.id}
          onSelect={setSelectedVariantId}
          productTitle={product.title}
        />

        {selectedVariant && (
          <div className="border-t border-gray-200 pt-6">
            <AddToCartWithQuantity variantId={selectedVariant.id} />
          </div>
        )}

        <ProductTabs product={product} value={openTab} onValueChange={setOpenTab} ref={tabsRef} />
      </div>
    </div>
  );
}
