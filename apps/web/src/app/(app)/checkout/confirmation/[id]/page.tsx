import { notFound } from "next/navigation";
import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { ProductImage } from "@/components/product-image";
import { getOrder } from "@/features/checkout/server/get-order";
import { formatPrice } from "@/lib/utils";

type ConfirmationPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ConfirmationPage({ params }: ConfirmationPageProps) {
  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
    notFound();
  }

  const currency = order.currency_code.toUpperCase();

  return (
    <div className="flex flex-col gap-6 pt-32 pb-16">
      {await SiteHeader()}
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-2xl uppercase">Merci pour votre commande !</h1>
        <p className="text-muted-foreground text-sm">
          Commande n°{order.display_id} — une confirmation a été envoyée à {order.email}.
        </p>
      </div>

      <ul className="flex flex-col gap-4">
        {order.items.map((item) => (
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

      <div className="flex flex-col gap-2 border-t pt-4 text-sm sm:max-w-xs">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Sous-total</span>
          <span>{formatPrice(order.item_total, currency)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Livraison</span>
          <span>{formatPrice(order.shipping_total, currency)}</span>
        </div>
        <div className="flex justify-between text-base font-medium">
          <span>Total</span>
          <span>{formatPrice(order.total, currency)}</span>
        </div>
      </div>

      {order.shipping_address && (
        <div className="flex flex-col gap-1 text-sm">
          <h2 className="font-heading text-lg uppercase">Livraison</h2>
          <p>
            {order.shipping_address.first_name} {order.shipping_address.last_name}
          </p>
          <p>{order.shipping_address.address_1}</p>
          <p>
            {order.shipping_address.postal_code} {order.shipping_address.city}
          </p>
        </div>
      )}

      <Link href="/products" className="self-start text-sm underline-offset-2 hover:underline">
        Continuer vos achats
      </Link>
    </div>
  );
}
