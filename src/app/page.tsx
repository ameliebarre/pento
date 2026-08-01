import { HeroBanner } from "@/components/hero-banner";

export default async function HomePage() {
  return (
    <div className="flex flex-col gap-6">
      <HeroBanner />
      <h1 className="text-2xl font-semibold">Nos produits</h1>
    </div>
  );
}
