import { HeroBanner } from "@/components/hero-banner";
import { ShopByCategory } from "@/components/shop-by-category";
import { ProductShowcase } from "@/components/product-showcase";
import { DesignerSpotlight } from "@/components/designer-spotlight";
import { BrowseByMovement } from "@/components/browse-by-movement";
import { Newsletter } from "@/components/newsletter";
import { TrustFeatures } from "@/components/trust-features";

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
