import { notFound } from "next/navigation";
import { ImageOff } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { ProductImage } from "@/components/product-image";
import { AddToCartButton } from "@/features/products/components/add-to-cart-button";
import { getProductByHandle } from "@/features/products/server/get-product-by-handle";
import { getProductPrice } from "@/features/products/utils/get-product-price";
import { formatPrice } from "@/lib/utils";

type ProductPageProps = {
  params: Promise<{ handle: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const variantId = product.variants[0]?.id;
  const designerNames = product.designers
    .map((designer) => `${designer.first_name} ${designer.last_name}`)
    .join(", ");
  const materialNames = product.materials.map((material) => material.name).join(", ");

  return (
    <div className="flex flex-col gap-6 pt-32 pb-16">
      {await SiteHeader()}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
        <div className="flex flex-1 flex-col gap-2">
          {product.images.length > 0 ? (
            product.images.map((image) => (
              <div key={image.id} className="bg-muted relative aspect-4/5 w-full overflow-hidden">
                <ProductImage
                  src={image.url}
                  alt={product.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))
          ) : (
            <div className="bg-muted text-muted-foreground relative flex aspect-4/5 w-full items-center justify-center overflow-hidden">
              <ImageOff aria-hidden="true" className="size-8" />
              <span className="sr-only">Aucune image disponible pour {product.title}</span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-6 lg:sticky lg:top-32 lg:max-w-md">
          <div className="flex flex-col gap-2">
            <h1 className="font-heading text-2xl uppercase">{product.title}</h1>
            {designerNames && <p className="text-muted-foreground text-sm">{designerNames}</p>}
            <p className="text-lg font-medium">{formatPrice(getProductPrice(product), "EUR")}</p>
          </div>

          {variantId && <AddToCartButton variantId={variantId} className="self-start" />}

          {product.description && (
            <p className="text-muted-foreground text-sm whitespace-pre-line">
              {product.description}
            </p>
          )}

          <dl className="flex flex-col gap-2 border-t pt-4 text-sm">
            {product.manufacturer && (
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Fabricant</dt>
                <dd className="text-right">
                  {product.manufacturer.name}
                  {product.manufacturer.country_name ? ` — ${product.manufacturer.country_name}` : ""}
                </dd>
              </div>
            )}
            {product.movement && (
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Mouvement</dt>
                <dd className="text-right">{product.movement.name}</dd>
              </div>
            )}
            {materialNames && (
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Matériaux</dt>
                <dd className="text-right">{materialNames}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
}
