import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { ProductImage } from "@/components/product-image";
import { CheckoutForm } from "@/features/checkout/components/checkout-form";
import { getCheckoutData } from "@/features/checkout/server/get-checkout-data";
import { getSession } from "@/lib/get-session";
import { formatPrice } from "@/lib/utils";

export default async function CheckoutPage() {
  const [{ cart, shippingOptions, countries }, session] = await Promise.all([
    getCheckoutData(),
    getSession(),
  ]);
  const accountEmail = session?.user?.email ?? null;

  if (!cart || cart.items.length === 0) {
    return (
      <div className="flex flex-col gap-6 pt-32 pb-16">
        {await SiteHeader()}
        <p className="text-muted-foreground text-sm">
          Votre panier est vide.{" "}
          <Link href="/products" className="underline">
            Continuer vos achats
          </Link>
        </p>
      </div>
    );
  }

  const currency = cart.currency_code.toUpperCase();
  const hasShippingMethod = cart.shipping_methods.length > 0;

  return (
    <div className="flex flex-col gap-6 pt-32 pb-16">
      {await SiteHeader()}
      <h1 className="font-heading text-2xl uppercase">Finaliser la commande</h1>
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
        <div className="flex-1">
          <CheckoutForm
            cart={cart}
            shippingOptions={shippingOptions}
            countries={countries}
            accountEmail={accountEmail}
          />
        </div>

        <div className="flex w-full flex-col gap-4 lg:w-96 lg:shrink-0">
          <h2 className="font-heading text-lg uppercase">Votre commande</h2>
          <ul className="flex flex-col gap-4">
            {cart.items.map((item) => (
              <li key={item.id} className="flex gap-4">
                <div className="bg-muted relative aspect-square size-16 shrink-0 overflow-hidden">
                  {item.thumbnail && (
                    <ProductImage
                      src={item.thumbnail}
                      alt={item.product_title}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex items-start justify-between gap-2">
                    <span className="min-w-0 truncate text-sm font-medium uppercase">
                      {item.product_title}
                    </span>
                    <span className="shrink-0 text-sm font-medium whitespace-nowrap">
                      {formatPrice(item.unit_price * item.quantity, currency)}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-xs">Quantité : {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2 border-t pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sous-total</span>
              <span>{formatPrice(cart.item_total, currency)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Livraison</span>
              <span>
                {hasShippingMethod ? formatPrice(cart.shipping_total, currency) : "Selon le mode choisi"}
              </span>
            </div>
            <div className="flex justify-between text-base font-medium">
              <span>Total</span>
              <span>{formatPrice(cart.total, currency)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
