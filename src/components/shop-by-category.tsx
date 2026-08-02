import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CATEGORIES = [
  { label: "Sofas", slug: "sofas", image: "/images/sofa.png" },
  { label: "Armchairs", slug: "armchairs", image: "/images/armchairs.png" },
  { label: "Chairs", slug: "chairs", image: "/images/chairs.png" },
  { label: "Tables", slug: "tables", image: "/images/tables.png" },
  { label: "Lighting", slug: "lighting", image: "/images/lighting.png" },
];

export function ShopByCategory() {
  return (
    <section className="flex flex-col items-start gap-6 py-16">
      <h2 className="font-heading text-2xl font-semibold">Shop by categories</h2>
      <div className="flex w-full flex-col gap-4 sm:flex-row">
        {CATEGORIES.map((category) => (
          <Link
            key={category.slug}
            href={`/products/${category.slug}`}
            className="group flex flex-1 flex-col items-center gap-3"
          >
            <div className="relative aspect-3/4 w-full overflow-hidden">
              <Image
                src={category.image}
                alt={category.label}
                fill
                sizes="(min-width: 640px) 20vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 text-sm text-white">
                {category.label}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
