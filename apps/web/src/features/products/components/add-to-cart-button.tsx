"use client";

import { ShoppingCart } from "lucide-react";

import { useCartDrawer } from "@/features/cart/components/cart-drawer-provider";
import { cn } from "@/lib/utils";

type AddToCartButtonProps = {
  variantId: string;
  className?: string;
};

export function AddToCartButton({ variantId, className }: AddToCartButtonProps) {
  const { addToCart, pendingVariantId } = useCartDrawer();
  const isAdding = pendingVariantId === variantId;

  return (
    <button
      type="button"
      aria-label="Ajouter au panier"
      disabled={isAdding}
      onClick={() => addToCart(variantId)}
      className={cn(
        "cursor-pointer rounded-[8px] bg-white p-2 text-black transition-[opacity,background-color] duration-300 hover:bg-neutral-200 disabled:pointer-events-none",
        className,
      )}
    >
      <ShoppingCart aria-hidden="true" className="size-4" />
    </button>
  );
}
