"use client";

import { useState } from "react";

import { useCartDrawer } from "@/features/cart/components/cart-drawer-provider";
import { cn } from "@/lib/utils";

type AddToCartWithQuantityProps = {
  variantId: string;
  className?: string;
};

export function AddToCartWithQuantity({ variantId, className }: AddToCartWithQuantityProps) {
  const { addToCart, pendingVariantId } = useCartDrawer();
  const [quantity, setQuantity] = useState(1);
  const isAdding = pendingVariantId === variantId;

  return (
    <div className={cn("flex items-stretch gap-3", className)}>
      <div className="border-ink/15 flex items-center justify-between border">
        <button
          type="button"
          aria-label="Diminuer la quantité"
          disabled={quantity <= 1}
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="cursor-pointer px-3 py-3 text-base leading-none disabled:pointer-events-none disabled:opacity-30"
        >
          −
        </button>
        <span className="w-5 text-center text-sm" aria-live="polite">
          {quantity}
        </span>
        <button
          type="button"
          aria-label="Augmenter la quantité"
          onClick={() => setQuantity((q) => q + 1)}
          className="cursor-pointer px-3 py-3 text-base leading-none"
        >
          +
        </button>
      </div>

      <button
        type="button"
        disabled={isAdding}
        onClick={() => addToCart(variantId, quantity)}
        className="bg-ink flex-1 cursor-pointer px-6 py-3 text-sm text-white uppercase transition-opacity duration-300 disabled:pointer-events-none disabled:opacity-50"
      >
        Ajouter au panier
      </button>
    </div>
  );
}
