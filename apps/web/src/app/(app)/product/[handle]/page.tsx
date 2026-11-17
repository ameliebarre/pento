import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/site-header";
import { ProductDesignerSection } from "@/features/products/components/product-designer-section";
import { ProductDetails } from "@/features/products/components/product-details";
import { getProductByHandle } from "@/features/products/server/get-product-by-handle";
import { getProductsByDesigner } from "@/features/designers/server/get-products-by-designer";

type ProductPageProps = {
  params: Promise<{ handle: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const designer = product.designers[0] ?? null;
  const designerProducts = designer
    ? (await getProductsByDesigner(designer.slug, 4)).filter((p) => p.id !== product.id).slice(0, 3)
    : [];

  return (
    <div className="flex flex-col gap-16 pt-32 pb-16">
      {await SiteHeader()}
      <ProductDetails product={product} />
      {designer && <ProductDesignerSection designer={designer} products={designerProducts} />}
    </div>
  );
}
