import {
  DesignerSpotlightSlider,
  type DesignerSlide,
} from "@/features/home/designer-spotlight-slider";

const SLIDES: DesignerSlide[] = [
  {
    name: "Pierre Paulin",
    image: "/images/pierre-paulin.jpg",
    title: "Le confort comme œuvre d’art",
    description: `Figure incontournable du design français, Pierre Paulin a révolutionné le mobilier en imaginant des assises aux formes organiques et enveloppantes.
  Guidé par la recherche du confort absolu, il transforme fauteuils et canapés en véritables sculptures où l’ergonomie rencontre l’audace.
  Ses créations, devenues iconiques, incarnent un design à la fois chaleureux, innovant et résolument intemporel.`,
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
  {
    name: "Ettore Sottsass",
    image: "/images/ettore-sottsass.jpg",
    title: "La couleur comme manifeste",
    description: `Architecte et designer italien, Ettore Sottsass a bouleversé les codes du mobilier en faisant de chaque création un terrain d’expression artistique.
  Fondateur du mouvement Memphis, il célèbre les couleurs vives, les formes géométriques et la liberté créative, loin des conventions du design moderniste.
  Ses pièces iconiques continuent d’inspirer une vision joyeuse, audacieuse et profondément expressive du design contemporain.`,
  },
  {
    name: "Achille Castiglioni",
    image: "/images/achille-castiglioni.jpg",
    title: "L’intelligence de la simplicité",
    description: `Maître du design italien, Achille Castiglioni a marqué l’histoire par sa capacité à transformer les objets les plus simples en créations d’une remarquable ingéniosité.
  Son travail repose sur une observation attentive des usages, où chaque détail répond à une fonction avec élégance et humour.
  Des luminaires aux assises, ses créations illustrent un design intemporel, pensé pour durer et enrichir le quotidien.`,
  },
];

export function DesignerSpotlight() {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-sm font-semibold uppercase">Designers à l&apos;honneur</h2>
      <DesignerSpotlightSlider slides={SLIDES} />
    </section>
  );
}
