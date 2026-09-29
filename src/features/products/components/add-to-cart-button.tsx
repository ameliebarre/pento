"use client";

import { ShoppingCart } from "lucide-react";

import { useCartDrawer } from "@/features/cart/components/cart-drawer-provider";
import { cn } from "@/lib/utils";

type AddToCartButtonProps = {
  productId: string;
  className?: string;
};

export function AddToCartButton({ productId, className }: AddToCartButtonProps) {
  const { addToCart, pendingProductId } = useCartDrawer();
  const isAdding = pendingProductId === productId;

  return (
    <button
      type="button"
      aria-label="Ajouter au panier"
      disabled={isAdding}
      onClick={() => addToCart(productId)}
      className={cn(
        "cursor-pointer rounded-[8px] bg-white p-2 text-black transition-opacity duration-300 disabled:pointer-events-none",
        className,
      )}
    >
      <ShoppingCart aria-hidden="true" className="size-4" />
    </button>
  );
}
