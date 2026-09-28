import { SiteHeader } from "@/components/site-header";
import { HeroBanner } from "@/features/home/hero-banner";
import { ShopByCategory } from "@/features/home/shop-by-category";
import { CuratedSelection } from "@/features/home/curated-selection";
import { PassionForDesign } from "@/features/home/passion-for-design";
import { TheMasters } from "@/features/home/the-masters";
import { Testimonials } from "@/features/home/testimonials";
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
      <TheMasters />
      <Testimonials />
      <Newsletter />
      <TrustFeatures />
    </div>
  );
}
