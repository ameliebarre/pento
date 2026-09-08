import Image from "next/image";
import { ImageOff } from "lucide-react";

import { getPayloadClient } from "@/lib/payload";
import { formatPrice } from "@/lib/utils";

export async function CuratedSelection() {
  const payload = await getPayloadClient();
  const { docs: products } = await payload.find({
    collection: "products",
    where: { featured: { equals: true } },
    depth: 2,
    limit: 6,
    sort: "id",
  });

  if (products.length === 0) return null;

  return (
    <section
      aria-labelledby="curated-selection-heading"
      className="relative right-1/2 left-1/2 mx-[-50vw] w-screen bg-[#EFE9DF] py-16 sm:py-20"
    >
      <div className="mx-auto flex max-w-xl flex-col items-center gap-3 px-6 text-center">
        <p className="text-sm font-medium tracking-wide text-[#c5964b] uppercase">
          Curated selection
        </p>
        <h2 id="curated-selection-heading" className="font-heading text-3xl md:text-4xl">
          The pieces our collectors covet
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          A rotating gallery of icons and rare editions — each authenticated by our curators and
          restored to its original glory.
        </p>
      </div>

      <ul className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-x-4 gap-y-8 px-6 sm:mt-12 sm:grid-cols-2 sm:gap-x-3 lg:grid-cols-3">
        {products.map((product) => {
          const image = product.images?.find((item) => typeof item === "object") ?? null;
          const designers = Array.isArray(product.designers)
            ? product.designers.filter((designer) => typeof designer === "object")
            : [];
          const designerNames = designers
            .map((designer) => `${designer.firstName} ${designer.lastName}`)
            .join(" & ");
          const year = product.creationDate ? new Date(product.creationDate).getFullYear() : null;
          const caption = [designerNames, year].filter(Boolean).join(" – ");

          return (
            <li key={product.id} className="flex flex-col">
              <div className="bg-card relative aspect-5/6 w-full overflow-hidden">
                {image?.url ? (
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-contain p-10 transition-transform duration-500 hover:scale-105 sm:p-12"
                  />
                ) : (
                  <div className="text-muted-foreground flex h-full w-full items-center justify-center">
                    <ImageOff aria-hidden="true" className="size-8" />
                    <span className="sr-only">Aucune image disponible pour {product.name}</span>
                  </div>
                )}
              </div>
              <div className="flex items-start justify-between gap-4 pt-4">
                <div className="flex flex-col gap-0.5">
                  <p className="font-heading text-lg">{product.name}</p>
                  {caption ? (
                    <p className="text-muted-foreground text-xs">{caption}</p>
                  ) : null}
                </div>
                <p className="shrink-0 text-sm font-medium whitespace-nowrap">
                  {formatPrice(product.price, product.currency ?? "EUR")}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
