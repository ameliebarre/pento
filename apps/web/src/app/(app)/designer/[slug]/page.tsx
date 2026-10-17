import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/site-header";
import { ProductImage } from "@/components/product-image";
import { getDesignerBySlug } from "@/features/designers/server/get-designer-by-slug";

type DesignerPageProps = {
  params: Promise<{ slug: string }>;
};

function formatLifespan(
  birthDate: string | null | undefined,
  deathDate: string | null | undefined,
) {
  if (!birthDate) return null;
  const born = new Date(birthDate).getFullYear();
  const died = deathDate ? new Date(deathDate).getFullYear() : null;
  return died ? `${born} — ${died}` : `Born ${born}`;
}

export default async function DesignerPage({ params }: DesignerPageProps) {
  const { slug } = await params;
  const designer = await getDesignerBySlug(slug);

  if (!designer) {
    notFound();
  }

  const lifespan = formatLifespan(designer.birth_date, designer.death_date);
  const biographyParagraphs = (designer.biography ?? "").split("\n\n").filter(Boolean);

  return (
    <div className="flex flex-col gap-16 pt-32 pb-16">
      {await SiteHeader()}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-16">
        <div className="flex w-full flex-col gap-6 lg:w-1/2">
          <div className="flex flex-col gap-2">
            <h1 className="font-heading text-[40px] leading-tight text-[#26221B]">
              {designer.first_name}
              <br />
              <span className="italic">{designer.last_name}</span>
            </h1>
          </div>

          {lifespan && <p className="text-base text-[#26221B]">{lifespan}</p>}

          {designer.movements && designer.movements.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {designer.movements.map((movement) => (
                <span
                  key={movement.id}
                  className="inline-block w-fit border border-[#26221B]/30 px-3 py-1.5 text-[10px] tracking-wide text-[#26221B] uppercase"
                >
                  {movement.name}
                </span>
              ))}
            </div>
          )}

          {biographyParagraphs.length > 0 && (
            <div className="flex flex-col gap-4 text-sm text-[#26221B]">
              {biographyParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          )}

          <button
            type="button"
            className="inline-flex w-fit items-center bg-[#282828] px-6 py-3 text-sm text-white uppercase"
          >
            Explore his story
          </button>
        </div>

        {designer.image_url && (
          <div className="bg-muted relative aspect-3/4 w-full overflow-hidden lg:w-1/2">
            <ProductImage
              src={designer.image_url}
              alt={`Portrait of ${designer.first_name} ${designer.last_name}`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
}
