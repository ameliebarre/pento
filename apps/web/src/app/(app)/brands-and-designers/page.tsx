import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { ScrollReveal, ScrollRevealGroup, ScrollRevealItem } from "@/components/scroll-reveal";
import { SmoothScrollAnchors } from "@/features/designers/components/smooth-scroll-anchors";
import { getAllDesigners } from "@/features/designers/server/get-all-designers";
import { getAllManufacturers } from "@/features/manufacturers/server/get-all-manufacturers";
import { getEntryName, type CatalogueEntry } from "@/features/brands-and-designers/types";
import {
  ALPHABET,
  groupEntriesByLetter,
} from "@/features/brands-and-designers/utils/group-entries-by-letter";

export default async function BrandsAndDesignersPage() {
  const [designers, manufacturers] = await Promise.all([
    getAllDesigners(),
    getAllManufacturers(),
  ]);

  const entries: CatalogueEntry[] = [
    ...designers.map(
      (designer): CatalogueEntry => ({
        kind: "designer",
        id: designer.id,
        firstName: designer.first_name,
        lastName: designer.last_name,
        secondary: designer.nationality ?? null,
        href: `/designer/${designer.slug}`,
      }),
    ),
    ...manufacturers.map(
      (manufacturer): CatalogueEntry => ({
        kind: "manufacturer",
        id: manufacturer.id,
        name: manufacturer.name,
        secondary: manufacturer.country_name ?? null,
        href: null,
      }),
    ),
  ];

  const groups = groupEntriesByLetter(entries);
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
              Aucun élément disponible pour le moment.
            </p>
          ) : (
            availableLetters.map((letter) => (
              <section key={letter} id={letter} className="flex scroll-mt-32 flex-col gap-6">
                <h2 className="font-heading text-ink text-3xl sm:text-4xl">{letter}</h2>
                <ScrollRevealGroup
                  as="ul"
                  className="border-border/60 divide-border/60 flex flex-col divide-y border-t"
                >
                  {groups.get(letter)!.map((entry) => {
                    const row = (
                      <>
                        <span className="font-heading text-ink text-lg sm:text-xl">
                          {getEntryName(entry)}
                        </span>
                        {entry.secondary && (
                          <span className="text-muted-foreground shrink-0 text-xs tracking-wide uppercase">
                            {entry.secondary}
                          </span>
                        )}
                      </>
                    );

                    return (
                      <ScrollRevealItem key={entry.id} as="li">
                        {entry.href ? (
                          <Link
                            href={entry.href}
                            className="group flex items-center justify-between gap-4 py-4 transition-opacity hover:opacity-70"
                          >
                            {row}
                          </Link>
                        ) : (
                          <div className="flex items-center justify-between gap-4 py-4">{row}</div>
                        )}
                      </ScrollRevealItem>
                    );
                  })}
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
