import Link from "next/link";
import { ArrowUpRight, ImageOff } from "lucide-react";

import { medusa } from "@/lib/medusa";
import { ProductImage } from "@/components/product-image";
import { ScrollReveal, ScrollRevealGroup, ScrollRevealItem } from "@/components/scroll-reveal";
import type { MedusaDesigner } from "@/features/products/medusa-types";

// Charles and Ray Eames are stored as two distinct Designer records (each
// individually attributed on products), but they share a single portrait
// and are presented here as one card under their joint name.
const DESIGNER_NAME_OVERRIDES: Record<string, string> = {
  "charles-eames": "Charles & Ray Eames",
};

export async function TheMasters() {
  const { designers: allDesigners } = await medusa.client.fetch<{ designers: MedusaDesigner[] }>(
    "/store/designers",
  );

  const designers = allDesigners
    .filter((designer) => designer.featured)
    .sort((a, b) => a.last_name.localeCompare(b.last_name))
    .slice(0, 6);

  if (designers.length === 0) return null;

  return (
    <section aria-labelledby="the-masters-heading" className="flex flex-col gap-8 py-16">
      <ScrollReveal>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium tracking-wide text-[#c5964b] uppercase">
              The Masters
            </p>
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
      </ScrollReveal>

      <ScrollRevealGroup as="ul" className="grid grid-cols-2 gap-6 sm:grid-cols-3">
        {designers.map((designer) => {
          const name =
            DESIGNER_NAME_OVERRIDES[designer.slug] ?? `${designer.first_name} ${designer.last_name}`;

          return (
            <ScrollRevealItem key={designer.id} as="li">
              <div className="bg-muted relative aspect-3/4 w-full overflow-hidden">
                {designer.image_url ? (
                  <ProductImage
                    src={designer.image_url}
                    alt={`Portrait de ${name}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="text-muted-foreground flex h-full w-full items-center justify-center">
                    <ImageOff aria-hidden="true" className="size-8" />
                    <span className="sr-only">Aucun portrait disponible pour {name}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/5 to-transparent" />
                <div className="absolute inset-x-4 bottom-4">
                  <p className="font-heading text-xl text-white sm:text-2xl">{name}</p>
                  {designer.nationality ? (
                    <p className="text-sm text-white/70">{designer.nationality}</p>
                  ) : null}
                </div>
              </div>
            </ScrollRevealItem>
          );
        })}
      </ScrollRevealGroup>
    </section>
  );
}
