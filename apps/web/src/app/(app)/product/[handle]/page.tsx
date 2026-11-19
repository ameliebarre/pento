import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/site-header";
import { ProductDetails } from "@/features/products/components/product-details";
import { getProductByHandle } from "@/features/products/server/get-product-by-handle";

type ProductPageProps = {
  params: Promise<{ handle: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6 pt-32 pb-16">
      {await SiteHeader()}
      <ProductDetails product={product} />
    </div>
  );
}
