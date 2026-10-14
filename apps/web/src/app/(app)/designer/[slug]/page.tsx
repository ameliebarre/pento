import { notFound } from "next/navigation";
import { ImageOff } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { ProductImage } from "@/components/product-image";
import { getDesignerBySlug } from "@/features/designers/server/get-designer-by-slug";
import { TimelineReveal } from "@/features/designers/components/timeline-reveal";

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
  return died ? `${born}–${died}` : `Born ${born}`;
}

function formatYear(date: string | null | undefined) {
  return date ? `${new Date(date).getFullYear()}` : null;
}

export default async function DesignerPage({ params }: DesignerPageProps) {
  const { slug } = await params;
  const designer = await getDesignerBySlug(slug);

  if (!designer) {
    notFound();
  }

  const firstName = designer.first_name.replace(/ /g, " ");
  const lastName = designer.last_name.replace(/ /g, " ");
  const lifespan = formatLifespan(designer.birth_date, designer.death_date);
  const birthYear = formatYear(designer.birth_date);
  const deathYear = formatYear(designer.death_date);
  const tags = [designer.design_movement, designer.profession].filter(Boolean) as string[];

  const bannerItems = [
    birthYear && {
      label: "Born",
      value: designer.birth_place ? `${birthYear} - ${designer.birth_place}` : birthYear,
    },
    deathYear && {
      label: "Dead",
      value: designer.death_place ? `${deathYear} - ${designer.death_place}` : deathYear,
    },
    designer.design_movement && { label: "Design language", value: designer.design_movement },
    designer.nationality && { label: "Nationality", value: designer.nationality },
  ].filter((item): item is { label: string; value: string } => Boolean(item));

  const timeline = designer.timeline;
  const timelineEntries = timeline?.entries ?? [];

  return (
    <div className="flex flex-col gap-16 pt-32 pb-16">
      {await SiteHeader()}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
        <div className="flex w-full flex-col gap-6 lg:w-1/2">
          <div className="flex flex-col gap-2">
            <h1 className="font-heading text-4xl uppercase sm:text-5xl">
              {firstName}
              <br />
              <span className="italic">{lastName}</span>
            </h1>
            <p className="text-sm tracking-[.25em] text-[#26221B]">{lifespan}</p>
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-[#26221B]/30 px-3 py-1 text-xs tracking-wide text-[#26221B] uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {designer.biography && (
            <p className="text-sm whitespace-pre-line text-[#26221B]">{designer.biography}</p>
          )}
        </div>

        <div className="bg-muted relative aspect-3/4 w-full overflow-hidden lg:w-1/2">
          {designer.image_url ? (
            <ProductImage
              src={designer.image_url}
              alt={`Portrait of ${firstName} ${lastName}`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div className="text-muted-foreground flex h-full w-full items-center justify-center">
              <ImageOff aria-hidden="true" className="size-8" />
              <span className="sr-only">
                No portrait available for {firstName} {lastName}
              </span>
            </div>
          )}
        </div>
      </div>

      {bannerItems.length > 0 && (
        <div className="relative right-1/2 left-1/2 mx-[-50vw] w-screen bg-[#EFE9DF]">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 divide-y divide-[#26221B]/15 px-6 py-8 sm:grid-cols-4 sm:divide-x sm:divide-y-0 sm:px-10">
            {bannerItems.map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <p className="text-xs tracking-wide text-[#8a8070] uppercase">{item.label}</p>
                <p className="font-heading text-lg">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {timeline && timelineEntries.length > 0 && (
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium tracking-wide text-[#c5964b] uppercase">
              {timeline.eyebrow}
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl">{timeline.heading}</h2>
          </div>

          <TimelineReveal entries={timelineEntries} name={`${firstName} ${lastName}`} />
        </div>
      )}
    </div>
  );
}
