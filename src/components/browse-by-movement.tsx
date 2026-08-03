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
    <section className="flex flex-col gap-6 py-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-2xl font-semibold">Browse by movement</h2>
        <Link href="/products" className="group inline-flex items-center gap-2 text-sm font-medium">
          View all movements
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-3">
        {MOVEMENTS.map((movement) => (
          <div key={movement.name} className="flex flex-col gap-2">
            <div className="relative aspect-4/3 w-full overflow-hidden">
              <Image
                src={movement.image}
                alt={movement.name}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-heading text-xl font-semibold">{movement.name}</h3>
                <span className="text-muted-foreground text-xs">{movement.pieces} pièces</span>
              </div>
              <p className="text-muted-foreground text-sm">{movement.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
