import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { getPayloadClient } from "@/lib/payload";
import { ProductImage } from "@/components/product-image";

// Charles and Ray Eames are stored as two distinct Designer records (each
// individually attributed on products), but they share a single portrait
// and are presented here as one card under their joint name.
const DESIGNER_NAME_OVERRIDES: Record<string, string> = {
  "charles-eames": "Charles & Ray Eames",
};

export async function TheMasters() {
  const payload = await getPayloadClient();
  const { docs: designers } = await payload.find({
    collection: "designers",
    where: { featured: { equals: true } },
    depth: 1,
    limit: 6,
    sort: "lastName",
  });

  if (designers.length === 0) return null;

  return (
    <section aria-labelledby="the-masters-heading" className="flex flex-col gap-8 py-16">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium tracking-wide text-[#c5964b] uppercase">The Masters</p>
          <h2 id="the-masters-heading" className="font-heading max-w-xl text-3xl md:text-4xl">
            The designers behind the icons
          </h2>
          <p className="text-muted-foreground max-w-xl text-sm sm:text-base">
            Meet the visionaries whose ideas defined a century of furniture — and whose pieces we
            are proud to carry forward.
          </p>
        </div>
        <Link
          href="/products"
          className="group inline-flex shrink-0 items-center gap-1 text-sm font-medium whitespace-nowrap uppercase"
        >
          View all designers
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>

      <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3">
        {designers.map((designer) => {
          const name =
            DESIGNER_NAME_OVERRIDES[designer.slug] ?? `${designer.firstName} ${designer.lastName}`;

          return (
            <li key={designer.id}>
              <div className="bg-muted relative aspect-3/4 w-full overflow-hidden">
                {designer.image ? (
                  <ProductImage
                    src={designer.image}
                    alt={`Portrait de ${name}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover"
                  />
                ) : null}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/5 to-transparent" />
                <div className="absolute inset-x-4 bottom-4">
                  <p className="font-heading text-xl text-white sm:text-2xl">{name}</p>
                  {designer.nationality ? (
                    <p className="text-sm text-white/70">{designer.nationality}</p>
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
