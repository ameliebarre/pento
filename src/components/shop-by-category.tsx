import Image from "next/image";
import Link from "next/link";

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
      <div className="relative inline-block pb-2">
        <h2 className="text-md font-bold uppercase">Shop by categories</h2>
        <span className="bg-foreground absolute bottom-0 left-0 h-[1.5] w-[190%]" />
      </div>
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
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
