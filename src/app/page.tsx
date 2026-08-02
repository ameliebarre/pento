import { HeroBanner } from "@/components/hero-banner";
import { ShopByCategory } from "@/components/shop-by-category";
import { DesignerSpotlight } from "@/components/designer-spotlight";

export default async function HomePage() {
  return (
    <div className="flex flex-col gap-6">
      <HeroBanner />
      <ShopByCategory />
      <DesignerSpotlight />
    </div>
  );
}
