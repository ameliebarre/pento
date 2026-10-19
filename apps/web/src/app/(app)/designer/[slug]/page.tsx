import { notFound } from "next/navigation";
import { Quote } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { ProductImage } from "@/components/product-image";
import { CareerTimeline } from "@/features/designers/components/career-timeline";
import { DesignerCollection } from "@/features/designers/components/designer-collection";
import { DesignerInFocus } from "@/features/designers/components/designer-in-focus";
import { SimilarDesigners } from "@/features/designers/components/similar-designers";
import { getDesignerBySlug } from "@/features/designers/server/get-designer-by-slug";
import { getDesignersBySlugs } from "@/features/designers/server/get-designers-by-slugs";
import { getProductsByDesigner } from "@/features/designers/server/get-products-by-designer";
import { getProductsByMovements } from "@/features/designers/server/get-products-by-movements";
import { SimilarProducts } from "@/features/designers/components/similar-products";
import { formatLifespan } from "@/features/designers/utils/format-lifespan";

type DesignerPageProps = {
  params: Promise<{ slug: string }>;
};

const SECTION_LINKS = [
  { href: "#life-career", label: "Life & Career" },
  { href: "#quote", label: "Quote" },
  { href: "#collection", label: "The Collection" },
  { href: "#in-focus", label: "In Focus" },
  { href: "#similar-designers", label: "Similar Designers" },
  { href: "#similar-products", label: "Similar Products" },
];

export default async function DesignerPage({ params }: DesignerPageProps) {
  const { slug } = await params;
  const designer = await getDesignerBySlug(slug);

  if (!designer) {
    notFound();
  }

  const lifespan = formatLifespan(designer.birth_date, designer.death_date);
  const biographyParagraphs = (designer.biography ?? "").split("\n\n").filter(Boolean);
  const collectionProducts = await getProductsByDesigner(designer.slug, 4);
  const similarDesigners = await getDesignersBySlugs(designer.similar_designers?.slugs ?? []);
  const movementSlugs = (designer.movements ?? []).map((movement) => movement.slug);
  const similarProducts = await getProductsByMovements(movementSlugs, designer.slug, 4);

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

          <a
            href="#life-career"
            className="inline-flex w-fit items-center bg-[#282828] px-6 py-3 text-sm text-white uppercase"
          >
            Explore his story
          </a>
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

      <nav
        aria-label="Sections de la page designer"
        className="relative right-1/2 left-1/2 mx-[-50vw] w-screen bg-[#EFE9DF] py-8"
      >
        <ul className="flex flex-wrap items-center justify-center gap-18.75">
          {SECTION_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-sm text-[#26221B] uppercase">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {designer.timeline && designer.timeline.entries.length > 0 && (
        <div id="life-career" className="flex flex-col gap-10 scroll-mt-32">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium tracking-wide text-[#c5964b] uppercase">
              Life & Career
            </p>
            <h2 className="font-heading text-3xl text-[#26221B] sm:text-4xl">
              The story of <span className="italic">{`${designer.first_name} ${designer.last_name}`}</span>
            </h2>
          </div>

          <CareerTimeline entries={designer.timeline.entries} />
        </div>
      )}

      {designer.quote && (
        <div
          id="quote"
          className="relative right-1/2 left-1/2 mx-[-50vw] w-screen scroll-mt-32 bg-[#282828] py-15.5"
        >
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center">
            <Quote aria-hidden="true" className="size-10 fill-white text-white" />
            <p className="font-heading text-[40px] leading-tight text-white italic">
              {designer.quote}
            </p>
          </div>
        </div>
      )}

      <DesignerCollection
        designerSlug={designer.slug}
        designerName={`${designer.first_name} ${designer.last_name}`}
        products={collectionProducts}
      />

      {designer.in_focus && <DesignerInFocus inFocus={designer.in_focus} />}

      <SimilarDesigners designers={similarDesigners} />

      <SimilarProducts products={similarProducts} />
    </div>
  );
}
