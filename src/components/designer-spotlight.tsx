import {
  DesignerSpotlightSlider,
  type DesignerSlide,
} from "@/components/designer-spotlight-slider";

const SLIDES: DesignerSlide[] = [
  {
    name: "Gae Aulenti",
    image: "/images/gae-aulenti.jpg",
    title: "La puissance d’un design architectural",
    description: `Architecte et designer italienne majeure du XXᵉ siècle, Gae Aulenti a bouleversé les codes du mobilier avec des
    créations où rigueur architecturale et élégance intemporelle se rencontrent.
    Son travail, marqué par des formes fortes et une grande maîtrise des volumes, illustre une vision du design comme un dialogue
    entre l’espace, la lumière et la matière. Ses pièces emblématiques continuent aujourd’hui d’incarner l’excellence du design italien.`,
  },
  {
    name: "Werner Aisslinger",
    image: "/images/werner-aisslinger.jpg",
    title: "Quand l’innovation rencontre l’émotion",
    description: `Designer allemand visionnaire, Werner Aisslinger explore depuis plus de trente ans les frontières entre technologie, artisanat et nouvelles façons d’habiter.
    À travers ses créations, il imagine un mobilier contemporain où fonctionnalité et poésie dialoguent avec des matériaux innovants.
    Son approche expérimentale transforme les objets du quotidien en expériences sensibles, pensées pour accompagner les modes de vie d’aujourd’hui.`,
  },
  {
    name: "Andrée Putman",
    image: "/images/andree-putman.jpg",
    title: "L’élégance française réinventée",
    description: `Figure emblématique du design français, Andrée Putman a marqué son époque par son approche minimaliste, sophistiquée et intemporelle.
    Entre lignes épurées, contrastes graphiques et amour des matières nobles, elle a créé des espaces et des objets où le luxe se révèle dans la simplicité.
    Son regard unique a donné naissance à une esthétique reconnaissable entre toutes, mêlant modernité et héritage parisien.`,
  },
];

export function DesignerSpotlight() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-heading text-2xl font-semibold">Designers à l&apos;honneur</h2>
      </div>
      <DesignerSpotlightSlider slides={SLIDES} />
    </section>
  );
}
