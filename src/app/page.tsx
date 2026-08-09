import { HeroBanner } from "@/features/home/hero-banner";
import { ShopByCategory } from "@/features/home/shop-by-category";
import { ProductShowcase } from "@/features/home/product-showcase";
import { DesignerSpotlight } from "@/features/home/designer-spotlight";
import { BrowseByMovement } from "@/features/home/browse-by-movement";
import { Newsletter } from "@/features/home/newsletter";
import { TrustFeatures } from "@/features/home/trust-features";

export default async function HomePage() {
  return (
    <div className="flex flex-col gap-6">
      <HeroBanner />
      <ShopByCategory />
      <ProductShowcase />
      <DesignerSpotlight />
      <BrowseByMovement />
      <Newsletter />
      <TrustFeatures />
    </div>
  );
}
