import Link from "next/link";
import { ImageOff } from "lucide-react";

import { ProductImage } from "@/components/product-image";
import { formatLifespan } from "@/features/designers/utils/format-lifespan";
import type { MedusaDesigner } from "@/features/products/medusa-types";

type SimilarDesignersProps = {
  designers: MedusaDesigner[];
};

export function SimilarDesigners({ designers }: SimilarDesignersProps) {
  if (designers.length === 0) return null;

  return (
    <div id="similar-designers" className="flex scroll-mt-32 flex-col gap-10">
      <div className="flex flex-col gap-2">
        <p className="text-dark-buff text-sm font-medium tracking-wide uppercase">
          Similar Designers
        </p>
        <h2 className="font-heading text-ink text-3xl sm:text-4xl">A shared sense of design</h2>
      </div>

      <ul className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {designers.map((designer) => {
          const name = `${designer.first_name} ${designer.last_name}`;
          const lifespan = formatLifespan(designer.birth_date, designer.death_date);

          return (
            <li key={designer.id}>
              <Link href={`/designer/${designer.slug}`} className="group flex flex-col gap-2">
                <div className="bg-muted relative aspect-3/4 w-full overflow-hidden">
                  {designer.image_url ? (
                    <ProductImage
                      src={designer.image_url}
                      alt={`Portrait of ${name}`}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 25vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="text-muted-foreground flex h-full w-full items-center justify-center">
                      <ImageOff aria-hidden="true" className="size-8" />
                      <span className="sr-only">No portrait available for {name}</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-heading text-ink text-xl">{name}</p>
                  {lifespan && <p className="text-sm text-[#8a8070]">{lifespan}</p>}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
