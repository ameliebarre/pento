import { notFound } from "next/navigation";
import { ImageOff } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { ProductImage } from "@/components/product-image";
import { getDesignerBySlug } from "@/features/designers/server/get-designer-by-slug";

type DesignerPageProps = {
  params: Promise<{ slug: string }>;
};

function formatLifespan(birthDate: string | null | undefined, deathDate: string | null | undefined) {
  if (!birthDate) return null;
  const born = new Date(birthDate).getFullYear();
  const died = deathDate ? new Date(deathDate).getFullYear() : null;
  return died ? `${born}–${died}` : `Né en ${born}`;
}

export default async function DesignerPage({ params }: DesignerPageProps) {
  const { slug } = await params;
  const designer = await getDesignerBySlug(slug);

  if (!designer) {
    notFound();
  }

  const name = `${designer.first_name} ${designer.last_name}`;
  const lifespan = formatLifespan(designer.birth_date, designer.death_date);

  return (
    <div className="flex flex-col gap-6 pt-32 pb-16">
      {await SiteHeader()}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
        <div className="bg-muted relative aspect-3/4 w-full flex-1 overflow-hidden">
          {designer.image_url ? (
            <ProductImage
              src={designer.image_url}
              alt={`Portrait de ${name}`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div className="text-muted-foreground flex h-full w-full items-center justify-center">
              <ImageOff aria-hidden="true" className="size-8" />
              <span className="sr-only">Aucun portrait disponible pour {name}</span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-6 lg:sticky lg:top-32 lg:max-w-md">
          <div className="flex flex-col gap-2">
            <h1 className="font-heading text-2xl uppercase">{name}</h1>
            {(designer.nationality || lifespan) && (
              <p className="text-muted-foreground text-sm">
                {[designer.nationality, lifespan].filter(Boolean).join(" — ")}
              </p>
            )}
          </div>

          {designer.quote && (
            <p className="font-heading border-l-2 pl-4 text-lg italic">“{designer.quote}”</p>
          )}

          {designer.biography && (
            <p className="text-muted-foreground text-sm whitespace-pre-line">
              {designer.biography}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
