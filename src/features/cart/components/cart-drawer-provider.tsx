"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addToCartAction } from "@/actions/cart";
import { CART_QUERY_KEY } from "@/features/cart/constants";

type CartDrawerContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  addToCart: (productId: string) => void;
  pendingProductId: string | null;
  addError: string | null;
};

const CartDrawerContext = createContext<CartDrawerContextValue | null>(null);

export function CartDrawerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const [liveMessage, setLiveMessage] = useState("");

  const mutation = useMutation({
    mutationFn: addToCartAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
      setLiveMessage("Produit ajouté au panier.");
    },
    onError: (error) => {
      setLiveMessage(error.message);
    },
  });

  const value = useMemo<CartDrawerContextValue>(
    () => ({
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      addToCart: (productId: string) => {
        setIsOpen(true);
        mutation.mutate(productId);
      },
      pendingProductId: mutation.isPending ? mutation.variables : null,
      addError: mutation.isError ? mutation.error.message : null,
    }),
    [isOpen, mutation],
  );

  return (
    <CartDrawerContext.Provider value={value}>
      {children}
      <p aria-live="polite" className="sr-only">
        {liveMessage}
      </p>
    </CartDrawerContext.Provider>
  );
}

export function useCartDrawer() {
  const context = useContext(CartDrawerContext);
  if (!context) {
    throw new Error("useCartDrawer must be used within a CartDrawerProvider");
  }
  return context;
}
