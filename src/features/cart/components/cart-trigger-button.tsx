"use client";

import { useQuery } from "@tanstack/react-query";
import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCartDrawer } from "@/features/cart/components/cart-drawer-provider";
import { CART_QUERY_KEY } from "@/features/cart/constants";
import { getCart } from "@/features/cart/server/get-cart";

export function CartTriggerButton() {
  const { open } = useCartDrawer();
  const { data } = useQuery({ queryKey: CART_QUERY_KEY, queryFn: getCart });

  const itemCount = data?.items.reduce((total, item) => total + item.quantity, 0) ?? 0;

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-lg"
      onClick={open}
      aria-label={itemCount > 0 ? `Panier (${itemCount} article${itemCount > 1 ? "s" : ""})` : "Panier"}
      className="relative"
    >
      <ShoppingCart aria-hidden="true" className="size-5" />
      {itemCount > 0 && (
        <span
          aria-hidden="true"
          className="bg-primary text-primary-foreground absolute top-1 right-1 flex size-4 items-center justify-center rounded-full text-[10px] font-medium"
        >
          {itemCount}
        </span>
      )}
    </Button>
  );
}
