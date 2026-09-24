import { SiteHeader } from "@/components/site-header";
import { HeroBanner } from "@/features/home/hero-banner";
import { ShopByCategory } from "@/features/home/shop-by-category";
import { CuratedSelection } from "@/features/home/curated-selection";
import { PassionForDesign } from "@/features/home/passion-for-design";
import { BrowseByMovement } from "@/features/home/browse-by-movement";
import { Newsletter } from "@/features/home/newsletter";
import { TrustFeatures } from "@/features/home/trust-features";

export default async function HomePage() {
  return (
    <div className="flex flex-col gap-6">
      <SiteHeader theme="dark" />
      <HeroBanner />
      <ShopByCategory />
      <div className="flex flex-col">
        <CuratedSelection />
        <PassionForDesign />
      </div>
      <BrowseByMovement />
      <Newsletter />
      <TrustFeatures />
    </div>
  );
}
