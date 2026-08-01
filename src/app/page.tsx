import { HeroBanner } from "@/components/hero-banner";
import { ShopByCategory } from "@/components/shop-by-category";

export default async function HomePage() {
  return (
    <div className="flex flex-col gap-6">
      <HeroBanner />
      <ShopByCategory />
      <h1 className="text-2xl font-semibold">Nos produits</h1>
    </div>
  );
}
