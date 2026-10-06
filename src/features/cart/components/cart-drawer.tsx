"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { X as XIcon } from "lucide-react";

import { removeFromCartAction } from "@/actions/cart";
import { ProductImage } from "@/components/product-image";
import { useCartDrawer } from "@/features/cart/components/cart-drawer-provider";
import { CART_QUERY_KEY } from "@/features/cart/constants";
import { getCart } from "@/features/cart/server/get-cart";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { isOpen, close, addError } = useCartDrawer();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();
  const shouldReduceMotion = useReducedMotion();
  const [removeMessage, setRemoveMessage] = useState("");

  const { data, isPending } = useQuery({
    queryKey: CART_QUERY_KEY,
    queryFn: getCart,
  });

  const removeMutation = useMutation({
    mutationFn: removeFromCartAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
      setRemoveMessage("Article retiré du panier.");
    },
  });

  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  const items = data?.items ?? [];
  const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const currency = items[0]?.product.currency ?? "EUR";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            onClick={close}
            aria-hidden="true"
            className="fixed inset-0 z-40 bg-black/50"
          />
          <motion.aside
            key="panel"
            aria-label="Panier"
            role="dialog"
            aria-modal="true"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="bg-background fixed inset-y-0 right-0 z-50 flex h-dvh w-full flex-col overflow-y-auto overscroll-contain shadow-xl sm:w-[30%] sm:min-w-105"
          >
            <div className="flex items-center justify-between border-b px-6 py-5">
              <h2 className="font-heading text-xl uppercase">Votre panier</h2>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={close}
                aria-label="Fermer le panier"
                className="hover:bg-muted flex size-8 items-center justify-center rounded-full transition-colors"
              >
                <XIcon aria-hidden="true" className="size-5" />
              </button>
            </div>

            {addError && (
              <p role="alert" className="bg-destructive/10 text-destructive px-6 py-3 text-sm">
                {addError}
              </p>
            )}

            <div className="flex-1 px-6 py-4">
              {isPending ? (
                <p className="text-muted-foreground text-sm">Chargement…</p>
              ) : items.length === 0 ? (
                <p className="text-muted-foreground text-sm">Votre panier est vide.</p>
              ) : (
                <ul className="flex flex-col gap-6">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4">
                      <div className="bg-muted relative aspect-square size-20 shrink-0 overflow-hidden">
                        {item.product.image && (
                          <ProductImage
                            src={item.product.image.url}
                            alt={item.product.image.alt}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="flex flex-1 flex-col gap-1">
                        <div className="flex items-start justify-between gap-2">
                          <span className="min-w-0 truncate text-sm font-medium uppercase">
                            {item.product.name}
                          </span>
                          <span className="shrink-0 text-sm font-medium whitespace-nowrap">
                            {formatPrice(item.product.price, item.product.currency)}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-xs">Quantité : {item.quantity}</p>
                        <button
                          type="button"
                          onClick={() => removeMutation.mutate(item.id)}
                          disabled={removeMutation.isPending}
                          className="text-muted-foreground self-start text-xs underline-offset-2 hover:underline"
                        >
                          Retirer
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t px-6 py-5">
                <div className="flex items-center justify-between text-sm font-medium">
                  <span>Sous-total</span>
                  <span>{formatPrice(subtotal, currency)}</span>
                </div>
              </div>
            )}

            <p aria-live="polite" className="sr-only">
              {removeMessage}
            </p>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
