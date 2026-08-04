import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const MOVEMENTS = [
  {
    name: "Bauhaus",
    image: "/images/styles/bauhaus.webp",
    description: "Fusion de l'art, de l'artisanat et de la fonction, sans ornement superflu.",
    pieces: 15,
  },
  {
    name: "Mid-Century",
    image: "/images/styles/mid-century.jpg",
    description: "Lignes organiques et fonctionnalité optimiste de l'après-guerre.",
    pieces: 8,
  },
  {
    name: "Scandinave",
    image: "/images/styles/scandinavian.jpeg",
    description: "Bois clair, fonctionnalité et douceur minimaliste.",
    pieces: 57,
  },
  {
    name: "Memphis Milano",
    image: "/images/styles/memphis-milano.jpg",
    description: "Couleurs vives, motifs audacieux et formes ludiques.",
    pieces: 27,
  },
  {
    name: "Art Déco",
    image: "/images/styles/art-deco.jpg",
    description: "Lignes géométriques, matériaux luxueux et symétrie affirmée.",
    pieces: 34,
  },
  {
    name: "Minimalisme japonais",
    image: "/images/styles/minimalisme-japonais.jpg",
    description: "Simplicité, matières naturelles et sens du vide.",
    pieces: 31,
  },
];

export function BrowseByMovement() {
  return (
    <section aria-labelledby="browse-by-movement-heading" className="flex flex-col gap-2 py-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 id="browse-by-movement-heading" className="text-sm font-semibold uppercase">
          Browse by movement
        </h2>
        <Link href="/products" className="group inline-flex items-center gap-2 text-sm font-medium">
          View all movements
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MOVEMENTS.map((movement) => (
          <li key={movement.name} className="flex flex-col gap-2">
            <div className="relative aspect-4/3 w-full overflow-hidden">
              <Image
                src={movement.image}
                alt={movement.name}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-start justify-between">
                <h3 className="uppercase">{movement.name}</h3>
                <span className="shrink-0 pt-1 text-xs whitespace-nowrap">
                  {movement.pieces} pièces
                </span>
              </div>
              <p className="text-muted-foreground text-sm">{movement.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
