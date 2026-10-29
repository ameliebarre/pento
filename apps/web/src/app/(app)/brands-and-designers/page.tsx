import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { ScrollReveal, ScrollRevealGroup, ScrollRevealItem } from "@/components/scroll-reveal";
import { SmoothScrollAnchors } from "@/features/designers/components/smooth-scroll-anchors";
import { getAllDesigners } from "@/features/designers/server/get-all-designers";
import {
  ALPHABET,
  groupDesignersByLetter,
} from "@/features/designers/utils/group-designers-by-letter";

export default async function BrandsAndDesignersPage() {
  const designers = await getAllDesigners();
  const groups = groupDesignersByLetter(designers);
  const availableLetters = ALPHABET.filter((letter) => groups.has(letter));

  return (
    <div className="flex flex-col gap-12 pt-32 pb-16">
      <SmoothScrollAnchors />
      {await SiteHeader()}

      <ScrollReveal className="flex flex-col gap-2">
        <p className="text-dark-buff text-sm font-medium tracking-wide uppercase">Catalogue</p>
        <h1 className="font-heading text-ink text-4xl sm:text-5xl">Brands & Designers</h1>
        <p className="text-muted-foreground max-w-xl text-sm sm:text-base">
          The names and houses behind the pieces we carry, from icons of the last century to the
          studios shaping the next.
        </p>
      </ScrollReveal>

      <div className="flex flex-col gap-12 lg:flex-row lg:items-start">
        <div className="flex min-w-0 flex-1 flex-col gap-16">
          {availableLetters.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              Aucun designer disponible pour le moment.
            </p>
          ) : (
            availableLetters.map((letter) => (
              <section key={letter} id={letter} className="flex scroll-mt-32 flex-col gap-6">
                <h2 className="font-heading text-ink text-3xl sm:text-4xl">{letter}</h2>
                <ScrollRevealGroup
                  as="ul"
                  className="border-border/60 divide-border/60 flex flex-col divide-y border-t"
                >
                  {groups.get(letter)!.map((designer) => (
                    <ScrollRevealItem key={designer.id} as="li">
                      <Link
                        href={`/designer/${designer.slug}`}
                        className="group flex items-center justify-between gap-4 py-4 transition-opacity hover:opacity-70"
                      >
                        <span className="font-heading text-ink text-lg sm:text-xl">
                          {designer.first_name} <span className="italic">{designer.last_name}</span>
                        </span>
                        {designer.nationality && (
                          <span className="text-muted-foreground shrink-0 text-xs tracking-wide uppercase">
                            {designer.nationality}
                          </span>
                        )}
                      </Link>
                    </ScrollRevealItem>
                  ))}
                </ScrollRevealGroup>
              </section>
            ))
          )}
        </div>

        <nav
          aria-label="Navigation alphabétique"
          className="sticky top-32 hidden shrink-0 flex-col items-center gap-1 lg:flex"
        >
          {ALPHABET.map((letter) =>
            groups.has(letter) ? (
              <a
                key={letter}
                href={`#${letter}`}
                className="text-ink hover:text-dark-buff flex size-6 items-center justify-center text-xs font-medium uppercase transition-colors"
              >
                {letter}
              </a>
            ) : (
              <span
                key={letter}
                className="text-muted-foreground/40 flex size-6 items-center justify-center text-xs font-medium uppercase"
              >
                {letter}
              </span>
            ),
          )}
        </nav>
      </div>
    </div>
  );
}
