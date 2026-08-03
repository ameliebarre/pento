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
    <section aria-labelledby="shop-by-category-heading" className="flex flex-col items-start gap-6 py-16">
      <h2 id="shop-by-category-heading" className="font-heading text-2xl font-semibold">
        Shop by categories
      </h2>
      <ul className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {CATEGORIES.map((category) => (
          <li key={category.slug}>
            <Link
              href={`/products/${category.slug}`}
              className="group flex flex-col items-center gap-3"
            >
              <div className="relative aspect-3/4 w-full overflow-hidden">
                <Image
                  src={category.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/15 to-transparent" />
                <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 text-sm text-white">
                  {category.label}
                  <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
