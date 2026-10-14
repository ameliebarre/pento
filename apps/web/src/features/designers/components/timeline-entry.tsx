import { ImageOff } from "lucide-react";

import { ProductImage } from "@/components/product-image";
import type { DesignerTimelineEntry } from "@/features/products/medusa-types";

type TimelineEntryProps = {
  entry: DesignerTimelineEntry;
  name: string;
};

export function TimelineEntry({ entry, name }: TimelineEntryProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-heading text-2xl text-[#c5964b]">{entry.year}</p>
      <p className="text-xs tracking-wide text-[#8a8070] uppercase">{entry.eyebrow}</p>
      <h3 className="font-heading text-xl text-[#26221B]">{entry.title}</h3>
      <p className="text-sm text-[#26221B]/70">{entry.description}</p>

      <div className="bg-muted relative mt-2 aspect-4/3 w-full overflow-hidden">
        {entry.image_url ? (
          <ProductImage
            src={entry.image_url}
            alt={`${entry.title} · ${name}`}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="text-muted-foreground flex h-full w-full items-center justify-center">
            <ImageOff aria-hidden="true" className="size-6" />
            <span className="sr-only">No image available for {entry.title}</span>
          </div>
        )}
      </div>
    </div>
  );
}
