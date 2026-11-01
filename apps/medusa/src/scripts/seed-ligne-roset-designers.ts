/**
 * Seeds the seven Ligne Roset designers needed before Togo, Pumpkin, Plumy,
 * Alster, CM 145, Indiscret, Ruché, Stump, Mobidec, Valmy Armchair and Valmy
 * Bridge can be linked to their designer(s) — Pierre Paulin already exists
 * and is left untouched. Each gets a biography and a career timeline built
 * from verified facts; where only a birth/death year (not the exact day) is
 * known, the date field is left null rather than guessing a day.
 *
 *   npx medusa exec ./src/scripts/seed-ligne-roset-designers.ts
 */
import type { ExecArgs } from "@medusajs/framework/types"
import { DESIGNER_MODULE } from "../modules/designer"
import type DesignerModuleService from "../modules/designer/service"

const DESIGNERS = [
  {
    slug: "michel-ducaroy",
    first_name: "Michel",
    last_name: "Ducaroy",
    nationality: "French",
    birth_date: null,
    death_date: new Date("2009-07-30"),
    quote: null,
    biography:
      "Michel Ducaroy was born in 1925 and trained as a sculptor at the École des Beaux-Arts in Lyon, an education he put to use early on in his family's furniture-making business, which produced pieces for ocean liners, exhibitions and government commissions.\n\nHe set up as an independent designer in 1952 and began working with the Roset family's furniture workshop in 1954, becoming one of its key in-house designers through the 1960s. He favoured biomorphic, cushioned forms and the new synthetic materials of the period — foam, thermoformed plastics, quilted textiles — producing pieces such as Adria in 1968, one of the first fully modular, springless all-foam chairs, and the Kashima and Safi ranges of cushions set on altuglass frames.\n\nHis best-known design, Togo, was unveiled at the Salon des Arts Ménagers in Paris in 1973: a sofa, armchair and pouf built entirely from stacked foam with no internal frame or springs at all. It became Ligne Roset's best-selling design, sold in dozens of countries and in well over a million units. Ducaroy died in Lyon on 30 July 2009.",
    image_url: null,
    featured: false,
    timeline: {
      entries: [
        {
          date: "1925",
          title: "Born in France",
          subtitle: "Lyon region, France",
          description:
            "Michel Ducaroy is born into a family active in furniture-making for ocean liners, exhibitions and government commissions.",
        },
        {
          date: "1940s",
          title: "Training as a Sculptor",
          subtitle: "École des Beaux-Arts, Lyon",
          description:
            "He studies sculpture in Lyon, an education that shapes the soft, biomorphic volumes of his later furniture.",
        },
        {
          date: "1952",
          title: "An Independent Designer",
          subtitle: "Starting out",
          description: "Ducaroy sets up as an independent designer, working across furniture and exhibition design.",
        },
        {
          date: "1954",
          title: "Joining the Roset Family Workshop",
          subtitle: "A long partnership begins",
          description:
            "He begins designing for the Roset family's furniture workshop, soon becoming one of its key in-house designers.",
        },
        {
          date: "1968",
          title: "Adria",
          subtitle: "An early all-foam chair",
          description:
            "One of the first fully modular, springless chairs built entirely from foam — an early sign of the frame-free seating Ducaroy would push further with Togo.",
        },
        {
          date: "1973",
          title: "Togo",
          subtitle: "Salon des Arts Ménagers, Paris",
          description:
            "Ducaroy unveils Togo, a sofa, armchair and pouf built entirely from stacked foam with no internal frame or springs. It becomes Ligne Roset's best-selling design, sold in dozens of countries.",
        },
        {
          date: "1970s – 1990s",
          title: "A Lasting Design Language",
          subtitle: "Continuing with Ligne Roset",
          description: "He continues designing for Ligne Roset for decades, refining frame-free, cushioned seating in new synthetic materials.",
        },
        {
          date: "2009",
          title: "Death",
          subtitle: "Lyon, France",
          description:
            "Michel Ducaroy dies in Lyon on 30 July 2009, having helped define the relaxed, informal character of postwar French furniture.",
        },
      ],
    },
  },
  {
    slug: "annie-hieronimus",
    first_name: "Annie",
    last_name: "Hiéronimus",
    nationality: "French",
    birth_date: null,
    death_date: null,
    quote: null,
    biography:
      "Annie Hiéronimus trained at the École des Métiers d'Art et des Arts Appliqués in Paris, earning a BTS (brevet de technicien supérieur), before joining Ligne Roset's in-house design studio, its Bureau d'Études, in 1976 — the only woman on that team through the decade.\n\nWithin the studio she designed several pieces that became house classics, among them Sandra and, in 1980, Plumy, a deep, feather-and-foam lounge chair that would go on to define a certain relaxed, cocooning silhouette in Ligne Roset's catalogue. She continued designing for the brand with pieces including Opus, Petit Matin and Confidences.\n\nShe left the Bureau d'Études in 1997 to work independently, while continuing to design for Ligne Roset as an external collaborator — among other projects, the Sassi vases — and for other manufacturers, including the Zilia settee for the Dutch brand Leolux. She also maintains a parallel practice as a visual artist, exhibiting her work roughly once a year. Plumy returned to the Ligne Roset catalogue in a 2016 refresh described by the brand as channelling the relaxed spirit of the 1980s.",
    image_url: null,
    featured: false,
    timeline: {
      entries: [
        {
          date: "Formative years",
          title: "Training in Applied Arts",
          subtitle: "École des Métiers d'Art et des Arts Appliqués, Paris",
          description: "Hiéronimus trains in applied arts in Paris, earning a BTS (brevet de technicien supérieur).",
        },
        {
          date: "1976",
          title: "Joining Ligne Roset's Bureau d'Études",
          subtitle: "The only woman in the studio",
          description: "She joins Ligne Roset's in-house design studio, the only woman on the team through the decade.",
        },
        {
          date: "1980",
          title: "Designing Plumy",
          subtitle: "A house classic",
          description:
            "Hiéronimus designs Plumy, a deep, feather-and-foam lounge chair that becomes one of Ligne Roset's enduring silhouettes.",
        },
        {
          date: "1980s",
          title: "Sandra and Further House Designs",
          subtitle: "Continuing inside the studio",
          description: "She continues designing upholstered pieces for Ligne Roset from within the firm's in-house studio.",
        },
        {
          date: "1997",
          title: "Going Independent",
          subtitle: "A new chapter",
          description: "Hiéronimus leaves Ligne Roset's studio to work independently, while continuing to design for the brand as an external collaborator.",
        },
        {
          date: "2000s",
          title: "Sassi and Zilia",
          subtitle: "Ligne Roset and Leolux",
          description: "She designs the Sassi vases for Ligne Roset and the Zilia settee for the Dutch manufacturer Leolux.",
        },
        {
          date: "2016",
          title: "Plumy, Reissued",
          subtitle: "Back in the catalogue",
          description: "Plumy returns to the Ligne Roset catalogue in a design refresh described as channelling the relaxed spirit of the 1980s.",
        },
        {
          date: "Ongoing",
          title: "A Parallel Art Practice",
          subtitle: "Alongside design work",
          description: "Hiéronimus exhibits as a visual artist roughly once a year, alongside her design work.",
        },
      ],
    },
  },
  {
    slug: "emmanuel-dietrich",
    first_name: "Emmanuel",
    last_name: "Dietrich",
    nationality: "French",
    birth_date: null,
    death_date: null,
    quote: null,
    biography:
      "Born in 1969 in Besançon, Emmanuel Dietrich trained in interior architecture at the École Boulle in Paris before opening his own design practice, taking on early industrial clients such as Facom and Ardi.\n\nHis design of the Harnais watch for Hermès, displayed on the house's historic Faubourg Saint-Honoré façade in Paris, became an early signature success and broadened his client list considerably. His studio has since worked across a wide range of industries and houses, including Häagen-Dazs, Dinh Van, Artelano, Mobilier International, Haworth, Daum, Baccarat, Ruinart, Calvin Klein and Louis Vuitton.\n\nIn furniture, he designed Alster for Ligne Roset in 2006, a swivelling 'bridge' chair on a chrome base. In 2009 he founded his own watch brand, Dietrich 1969, built around what he calls an 'organic time companions' concept, extending into product design the same interest in sculptural, tactile objects that runs through his furniture work.",
    image_url: null,
    featured: false,
    timeline: {
      entries: [
        {
          date: "1969",
          title: "Born in Besançon",
          subtitle: "Besançon, France",
          description: "Emmanuel Dietrich is born in Besançon, France.",
        },
        {
          date: "Formative years",
          title: "Training in Interior Architecture",
          subtitle: "École Boulle, Paris",
          description: "He studies interior architecture at the École Boulle in Paris.",
        },
        {
          date: "Early career",
          title: "Opening His Own Studio",
          subtitle: "Facom and Ardi",
          description: "Dietrich opens his own design practice, taking on early industrial clients including Facom and Ardi.",
        },
        {
          date: "Early career",
          title: "The Harnais Watch for Hermès",
          subtitle: "Faubourg Saint-Honoré, Paris",
          description: "His design for Hermès is displayed on the house's historic Faubourg Saint-Honoré façade, bringing him wider recognition.",
        },
        {
          date: "2006",
          title: "Alster for Ligne Roset",
          subtitle: "A swivelling bridge chair",
          description: "Dietrich designs Alster, a 360°-swivel bridge chair for Ligne Roset on a chrome, aluminium or castor base.",
        },
        {
          date: "2000s",
          title: "An Expanding Practice",
          subtitle: "Beyond furniture",
          description: "His studio goes on to work with Häagen-Dazs, Artelano, Haworth, Daum, Baccarat, Ruinart, Calvin Klein and Louis Vuitton.",
        },
        {
          date: "2009",
          title: "Founding Dietrich 1969",
          subtitle: "A watch brand of his own",
          description: "He launches his own watch brand, built around what he calls 'organic time companions.'",
        },
      ],
    },
  },
  {
    slug: "constance-frapolli",
    first_name: "Constance",
    last_name: "Frapolli",
    nationality: "French",
    birth_date: null,
    death_date: null,
    quote: null,
    biography:
      "Born in 1991, Constance Frapolli studied interior architecture and design at the École Camondo in Paris, graduating in 2016, and trained along the way in the studios of Ora-Ito and Arik Levy.\n\nHer fourth-year student project, exploring the 'nomadism' of collections, was shown at the Musée des Arts Décoratifs in Paris in the summer of 2015, where her piece 'La Nef Nomade' won second prize; the following year, another of her pieces was preselected by the jury of the International Tapestry Centre's creation competition in Aubusson.\n\nIn 2017 she began collaborating with Ligne Roset, designing Indiscret, a secretaire-dressing table that pairs a clear glass top with compartmentalised drawers. She now leads her own design studio in Paris, describing her approach as a balance of functionality and emotion, with a poetic, narrative use of form and material.",
    image_url: null,
    featured: false,
    timeline: {
      entries: [
        {
          date: "1991",
          title: "Born in France",
          subtitle: "France",
          description: "Constance Frapolli is born in France.",
        },
        {
          date: "Studies",
          title: "École Camondo, Paris",
          subtitle: "Interior architecture and design",
          description: "She studies interior architecture and design at the École Camondo in Paris, training along the way with Ora-Ito and Arik Levy.",
        },
        {
          date: "2015",
          title: "'La Nef Nomade' at the Musée des Arts Décoratifs",
          subtitle: "Paris",
          description: "Her fourth-year project on the nomadism of collections is exhibited at the museum, winning second prize.",
        },
        {
          date: "2016",
          title: "Graduating École Camondo",
          subtitle: "Paris",
          description: "Frapolli completes her studies at the École Camondo.",
        },
        {
          date: "2016",
          title: "Aubusson Tapestry Competition",
          subtitle: "International Tapestry Centre",
          description: "A piece of hers is preselected by the jury of the centre's creation competition.",
        },
        {
          date: "2017",
          title: "Designing Indiscret for Ligne Roset",
          subtitle: "A first collaboration",
          description: "Frapolli designs Indiscret, a secretaire-dressing table combining a glass top with compartmentalised drawers.",
        },
        {
          date: "Today",
          title: "Running Her Own Studio",
          subtitle: "Paris",
          description: "She leads her own design practice in Paris, balancing functionality and emotion in her work.",
        },
      ],
    },
  },
  {
    slug: "inga-sempe",
    first_name: "Inga",
    last_name: "Sempé",
    nationality: "French",
    birth_date: null,
    death_date: null,
    quote: null,
    biography:
      "Born in Paris in 1968, the daughter of the graphic artist Jean-Jacques Sempé and the Danish artist Mette Ivers, Inga Sempé graduated from ENSCI-Les Ateliers in 1993. She worked first alongside Marc Newson, then for several years with Andrée Putman, before opening her own studio in Paris in 2000.\n\nIn 2000–2001 she was an artist-in-residence at the Villa Médicis, the Académie de France in Rome. Her work for manufacturers including Ligne Roset, Cappellini, Edra, Magis, Alessi, Baccarat, Wästberg, HAY and Svensk Tenn favours understated, softly geometric forms over overt styling.\n\nShe won the Grand Prix de la Création de la Ville de Paris in 2003 and the Red Dot Award in 2007 for the Moël armchair, designed for Ligne Roset. For the same manufacturer she later designed the Ruché armchair and sofa, among the pieces her studio remains best known for.",
    image_url: null,
    featured: false,
    timeline: {
      entries: [
        {
          date: "1968",
          title: "Born in Paris",
          subtitle: "Paris, France",
          description: "Inga Sempé is born in Paris, the daughter of graphic artist Jean-Jacques Sempé and artist Mette Ivers.",
        },
        {
          date: "1993",
          title: "Graduating ENSCI-Les Ateliers",
          subtitle: "Paris",
          description: "She completes her design studies at ENSCI-Les Ateliers.",
        },
        {
          date: "1990s",
          title: "Working with Marc Newson, then Andrée Putman",
          subtitle: "Early career",
          description: "She works first alongside Marc Newson, then for several years with Andrée Putman.",
        },
        {
          date: "2000",
          title: "Opening Her Own Studio",
          subtitle: "Paris",
          description: "Sempé founds her own design studio in Paris.",
        },
        {
          date: "2000 – 2001",
          title: "Villa Médicis Residency",
          subtitle: "Académie de France, Rome",
          description: "She is an artist-in-residence at the Villa Médicis in Rome.",
        },
        {
          date: "2003",
          title: "Grand Prix de la Création de la Ville de Paris",
          subtitle: "Recognition in Paris",
          description: "Sempé receives the city of Paris's creation prize.",
        },
        {
          date: "2007",
          title: "Red Dot Award",
          subtitle: "For the Moël armchair",
          description: "She wins the Red Dot Award for the Moël armchair, designed for Ligne Roset.",
        },
        {
          date: "Ongoing",
          title: "Ruché for Ligne Roset",
          subtitle: "A continuing collaboration",
          description: "Sempé designs the Ruché armchair and sofa, among her best-known pieces for the brand.",
        },
      ],
    },
  },
  {
    slug: "pierre-charpin",
    first_name: "Pierre",
    last_name: "Charpin",
    nationality: "French",
    birth_date: null,
    death_date: null,
    quote: null,
    biography:
      "Born in 1962 in Saint-Mandé, near Paris, into a family of artists, Pierre Charpin graduated from the École des Beaux-Arts de Bourges in 1984. He shifted his focus toward object and furniture design in the early 1990s, spending periods living and working in Milan.\n\nHe taught at ESAD Reims from 1998 to 2008 and has led workshops at ECAL in Lausanne since 2006, alongside a design practice based in the Paris region that has produced work for Hermès, Baccarat, Alessi, Zanotta and HAY, as well as Ligne Roset — including the Stump marble side table and the Mobidec pouf.\n\nHis honours include the VIA 'Valorisation de l'Innovation' award in 1995, the Compasso d'Oro in 1997, the Designpreis der Bundesrepublik Deutschland in 2003, the title of Créateur de l'Année at the Paris Salon du Meuble in 2005, and Designer of the Year at Maison & Objet in 2017.",
    image_url: null,
    featured: false,
    timeline: {
      entries: [
        {
          date: "1962",
          title: "Born in Saint-Mandé",
          subtitle: "Near Paris, France",
          description: "Pierre Charpin is born into a family of artists near Paris.",
        },
        {
          date: "1984",
          title: "Graduating École des Beaux-Arts de Bourges",
          subtitle: "Bourges, France",
          description: "He completes his studies at the Beaux-Arts de Bourges.",
        },
        {
          date: "Early 1990s",
          title: "Turning to Object & Furniture Design",
          subtitle: "Periods in Milan",
          description: "Charpin shifts his practice toward object and furniture design, spending time working in Milan.",
        },
        {
          date: "1995",
          title: "VIA Innovation Award",
          subtitle: "Valorisation de l'Innovation",
          description: "He receives the award for a body of furniture in moulded styrofoam.",
        },
        {
          date: "1997",
          title: "Compasso d'Oro",
          subtitle: "Italy's top design honour",
          description: "Charpin wins Italy's Compasso d'Oro.",
        },
        {
          date: "1998 – 2008",
          title: "Teaching at ESAD Reims",
          subtitle: "Reims, France",
          description: "He teaches design at ESAD Reims for a decade.",
        },
        {
          date: "2003",
          title: "Designpreis der Bundesrepublik Deutschland",
          subtitle: "German Design Award",
          description: "He receives Germany's federal design award.",
        },
        {
          date: "2005",
          title: "Créateur de l'Année",
          subtitle: "Paris Salon du Meuble",
          description: "Charpin is named Créateur de l'Année at the Paris furniture fair.",
        },
        {
          date: "2006",
          title: "Workshops at ECAL",
          subtitle: "Lausanne, Switzerland",
          description: "He begins leading design workshops at ECAL, a role he continues to hold.",
        },
        {
          date: "2017",
          title: "Designer of the Year",
          subtitle: "Maison & Objet",
          description: "Charpin is named Designer of the Year at the Maison & Objet trade fair.",
        },
      ],
    },
  },
  {
    slug: "ramy-fischler",
    first_name: "Ramy",
    last_name: "Fischler",
    nationality: "Belgian",
    birth_date: null,
    death_date: null,
    quote: null,
    biography:
      "Born in Belgium, Ramy Fischler moved to Paris in 1998 and graduated from ENSCI-Les Ateliers in 2004. Between 2001 and 2010 he worked with the designer Patrick Jouin, before being named a laureate of the Académie de France in Rome — the Villa Médicis — for 2010–2011, where he researched the history of furniture and its relationship to power.\n\nHe founded his own practice, RF Studio, in Paris, designing furniture, objects and interiors, including the Valmy armchair and its bridge-chair counterpart for Ligne Roset. From 2013 the studio's client list broadened to include the chef Thierry Marx, restaurateur Oliver Peyton, theatre director Cyril Teste and composer Jesper Nordin.\n\nSince February 2017 he has overseen the architectural design of Chanel's fragrance and beauty, and watches and fine jewellery divisions, and was named Créateur de l'Année at Maison & Objet in 2018. He is also active in zero-waste entrepreneurship through the catering concept Nu!.",
    image_url: null,
    featured: false,
    timeline: {
      entries: [
        {
          date: "1998",
          title: "Moving to Paris",
          subtitle: "A new base",
          description: "Ramy Fischler, born in Belgium, moves to Paris.",
        },
        {
          date: "2004",
          title: "Graduating ENSCI-Les Ateliers",
          subtitle: "Paris",
          description: "He completes his design studies at ENSCI-Les Ateliers.",
        },
        {
          date: "2001 – 2010",
          title: "Working with Patrick Jouin",
          subtitle: "An early apprenticeship",
          description: "Fischler works with designer Patrick Jouin for nearly a decade.",
        },
        {
          date: "2010 – 2011",
          title: "Villa Médicis Residency",
          subtitle: "Académie de France, Rome",
          description: "He researches the history of furniture and its relationship to power as a laureate in Rome.",
        },
        {
          date: "2010s",
          title: "Founding RF Studio",
          subtitle: "Paris",
          description: "Fischler founds his own practice, designing furniture, objects and interiors.",
        },
        {
          date: "2010s",
          title: "Valmy for Ligne Roset",
          subtitle: "An armchair and its bridge-chair counterpart",
          description: "He designs the Valmy armchair and Valmy bridge chair for Ligne Roset.",
        },
        {
          date: "2013",
          title: "Expanding the Client List",
          subtitle: "Beyond furniture",
          description: "RF Studio begins working with figures such as chef Thierry Marx and theatre director Cyril Teste.",
        },
        {
          date: "2017",
          title: "Architectural Design for Chanel",
          subtitle: "Fragrance, beauty, watches and fine jewellery",
          description: "He takes charge of architectural design for two of Chanel's divisions.",
        },
        {
          date: "2018",
          title: "Créateur de l'Année",
          subtitle: "Maison & Objet",
          description: "Fischler is named Créateur de l'Année at the Maison & Objet trade fair.",
        },
        {
          date: "Ongoing",
          title: "Nu!",
          subtitle: "Zero-waste entrepreneurship",
          description: "He is also active in zero-waste catering entrepreneurship through the Nu! concept.",
        },
      ],
    },
  },
]

export default async function seedLigneRosetDesigners({ container }: ExecArgs) {
  const designerModuleService: DesignerModuleService = container.resolve(DESIGNER_MODULE)

  let created = 0
  for (const designer of DESIGNERS) {
    const [existing] = await designerModuleService.listDesigners({ slug: designer.slug })
    if (existing) {
      console.log(`Skipping ${designer.slug}: already exists`)
      continue
    }
    await designerModuleService.createDesigners(designer)
    created += 1
    console.log(`Created designer ${designer.slug}`)
  }

  console.log(`Done. Created ${created}/${DESIGNERS.length} designer(s).`)
}
