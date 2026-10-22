/**
 * Adds timeline, in_focus and similar_designers to the 15 designers created
 * by seed-influential-designers.ts — same depth as Arne Jacobsen's flagship
 * page, minus images (added later).
 *
 *   npx medusa exec ./src/scripts/seed-influential-designers-extras.ts
 */
import type { ExecArgs } from "@medusajs/framework/types"
import { DESIGNER_MODULE } from "../modules/designer"
import type DesignerModuleService from "../modules/designer/service"

type TimelineEntry = { date: string; title: string; subtitle: string; description: string }
type InFocus = { title: string; image_url: null; paragraphs: string[] }

type Extras = {
  slug: string
  timeline: TimelineEntry[]
  inFocus: InFocus
  similarDesignerSlugs: string[]
}

const EXTRAS: Extras[] = [
  {
    slug: "le-corbusier",
    similarDesignerSlugs: ["charlotte-perriand", "jean-prouve", "marcel-breuer"],
    inFocus: {
      title: "Villa Savoye – 1931",
      image_url: null,
      paragraphs: [
        "Built outside Paris between 1928 and 1931, the Villa Savoye is the clearest built statement of Le Corbusier's \"Five Points of Architecture\" — a house raised on slender pilotis, wrapped in a continuous ribbon window, and topped with a roof garden in place of the ground it displaced.",
        "The house reads as a machine tuned for living: a ramp rather than a staircase organises movement through it, and the free plan lets interior walls be placed without regard for structure. Its stark white volume, floating above the landscape, became the single most reproduced image of international modernism.",
        "Neglected for decades and twice threatened with demolition, the Villa Savoye was restored and is now a UNESCO World Heritage Site — as influential on architects today as it was controversial to its first visitors.",
      ],
    },
    timeline: [
      {
        date: "1887",
        title: "Born Charles-Édouard Jeanneret",
        subtitle: "La Chaux-de-Fonds, Switzerland",
        description:
          "Born in the Swiss watchmaking town of La Chaux-de-Fonds, he trains first as an engraver before turning to architecture through travel and self-study.",
      },
      {
        date: "1917",
        title: "Settling in Paris",
        subtitle: "A new name, a new direction",
        description:
          "He moves to Paris and begins publishing under the pseudonym Le Corbusier, aligning himself with the Purist avant-garde.",
      },
      {
        date: "1927",
        title: "The LC Collection Begins",
        subtitle: "With Perriand and Jeanneret",
        description:
          "Charlotte Perriand joins the studio and, with Pierre Jeanneret, the trio begins developing the tubular steel LC chair collection.",
      },
      {
        date: "1931",
        title: "Villa Savoye",
        subtitle: "The Five Points realised",
        description:
          "The Villa Savoye near Paris becomes the definitive built expression of his functionalist architectural principles.",
      },
      {
        date: "1952",
        title: "Unité d'Habitation",
        subtitle: "A vertical village",
        description:
          "The Unité d'Habitation opens in Marseille, a single concrete building containing homes, shops and services — a prototype for postwar mass housing.",
      },
      {
        date: "1965",
        title: "Death at Cap Martin",
        subtitle: "A contested legacy",
        description:
          "Le Corbusier dies swimming near his cabin on the French Riviera, leaving behind one of modernism's most influential and most debated bodies of work.",
      },
    ],
  },
  {
    slug: "charlotte-perriand",
    similarDesignerSlugs: ["le-corbusier", "jean-prouve", "eileen-gray"],
    inFocus: {
      title: "Les Arcs Ski Resort – 1967–1989",
      image_url: null,
      paragraphs: [
        "Over two decades, Charlotte Perriand led the interior design of the Les Arcs ski resort in the French Alps, shaping everything from the architecture's relationship to the mountain down to built-in furniture for its compact apartments.",
        "The project distilled a lifetime of thinking about efficient, communal living: modular wooden furniture, warm materials and carefully planned small spaces designed to feel generous rather than cramped — a direct continuation of the functionalist ideas she had helped develop decades earlier with Le Corbusier.",
        "Les Arcs remains one of the most complete expressions of Perriand's independent voice, built on her own terms after a career spent working, and fighting for credit, alongside better-known male collaborators.",
      ],
    },
    timeline: [
      {
        date: "1903",
        title: "Born in Paris",
        subtitle: "Paris, France",
        description: "Charlotte Perriand is born in Paris and trains in furniture design at the École de l'Union Centrale des Arts Décoratifs.",
      },
      {
        date: "1927",
        title: "Joining Le Corbusier's Studio",
        subtitle: "\"We don't embroider cushions here\"",
        description:
          "Initially turned away, she is hired after her Bar sous le toit installation proves her command of industrial materials.",
      },
      {
        date: "1928",
        title: "The LC Chaise Longue",
        subtitle: "A collaborative icon",
        description:
          "With Le Corbusier and Pierre Jeanneret, she co-designs the LC2 and LC4 tubular steel furniture collection.",
      },
      {
        date: "1940",
        title: "Advisor in Japan",
        subtitle: "A new material language",
        description:
          "Appointed an industrial design advisor to the Japanese government, she develops a lasting appreciation for natural materials and craft.",
      },
      {
        date: "1967 – 1989",
        title: "Les Arcs",
        subtitle: "Two decades in the Alps",
        description:
          "She leads the interior design of the Les Arcs ski resort, one of the most complete expressions of her independent practice.",
      },
      {
        date: "1999",
        title: "Death in Paris",
        subtitle: "A legacy reclaimed",
        description:
          "Perriand dies in Paris, having lived to see renewed recognition of her individual authorship after decades of being overshadowed.",
      },
    ],
  },
  {
    slug: "eero-saarinen",
    similarDesignerSlugs: ["charles-eames", "ray-eames", "harry-bertoia", "florence-knoll"],
    inFocus: {
      title: "TWA Flight Center – 1962",
      image_url: null,
      paragraphs: [
        "Designed for Trans World Airlines at New York's Idlewild Airport (now JFK), the TWA Flight Center is a single, swooping concrete shell meant to evoke flight itself — a building with almost no straight lines or right angles.",
        "Saarinen and his team sculpted the interior as continuously as the exterior, designing custom signage, seating and even ashtrays so that no borrowed element would interrupt the building's total, flowing identity.",
        "Saarinen died before the terminal opened in 1962. Closed for years after TWA's collapse, it was eventually restored and reopened in 2019 as a hotel, preserving one of the twentieth century's most ambitious single architectural gestures.",
      ],
    },
    timeline: [
      {
        date: "1910",
        title: "Born in Finland",
        subtitle: "Kirkkonummi, Finland",
        description: "Eero Saarinen is born to architect Eliel Saarinen and emigrates with his family to the United States as a child.",
      },
      {
        date: "1920s – 1930s",
        title: "Cranbrook",
        subtitle: "A creative circle forms",
        description:
          "He studies and later teaches at Cranbrook Academy of Art, meeting Charles Eames and Ray Kaiser among a tight circle of future collaborators.",
      },
      {
        date: "1948",
        title: "The Womb Chair",
        subtitle: "\"A chair to curl up in\"",
        description:
          "Designed for Knoll at Florence Knoll's request, the Womb Chair becomes an instant success in American postwar homes.",
      },
      {
        date: "1956",
        title: "The Tulip Collection",
        subtitle: "Eliminating \"the slum of legs\"",
        description:
          "The Pedestal (Tulip) collection replaces conventional table and chair legs with a single sculptural stem.",
      },
      {
        date: "1962",
        title: "TWA Flight Center",
        subtitle: "Architecture as flight",
        description: "His swooping terminal at New York's Idlewild Airport opens posthumously to international acclaim.",
      },
      {
        date: "1961",
        title: "Death at Fifty-One",
        subtitle: "A sudden end",
        description: "Saarinen dies of a brain tumour in 1961, cutting short one of mid-century architecture's most daring careers.",
      },
    ],
  },
  {
    slug: "charles-eames",
    similarDesignerSlugs: ["ray-eames", "eero-saarinen", "harry-bertoia", "isamu-noguchi"],
    inFocus: {
      title: "Eames House (Case Study House #8) – 1949",
      image_url: null,
      paragraphs: [
        "Built in Pacific Palisades, Los Angeles, as part of the Case Study House program, the Eames House was Charles and Ray's own home — assembled from off-the-shelf industrial parts ordered from catalogues, including steel decking and sash windows.",
        "Set into a hillside behind a screen of eucalyptus trees, the house proved that prefabricated, mass-produced components could be composed into something warm and personal rather than cold and uniform — a direct architectural counterpart to the couple's furniture philosophy.",
        "The Eames House remained Charles and Ray's home for the rest of their lives and is preserved today by the Eames Foundation as one of the most visited landmarks of American modernist architecture.",
      ],
    },
    timeline: [
      {
        date: "1907",
        title: "Born in St. Louis",
        subtitle: "St. Louis, Missouri",
        description: "Charles Eames is born and later studies architecture at Washington University before leaving for views considered too modern.",
      },
      {
        date: "1940",
        title: "Cranbrook and Early Plywood Experiments",
        subtitle: "Meeting his future collaborators",
        description:
          "At Cranbrook Academy of Art he meets Eero Saarinen and Ray Kaiser, and begins experimenting with moulded plywood.",
      },
      {
        date: "1941",
        title: "Marrying Ray Kaiser",
        subtitle: "A creative partnership begins",
        description: "Charles and Ray marry and found the Eames Office in Los Angeles, working as equal creative partners.",
      },
      {
        date: "1949",
        title: "The Eames House",
        subtitle: "Case Study House #8",
        description: "Their own home, built from catalogue-ordered industrial parts, becomes a landmark of American residential modernism.",
      },
      {
        date: "1956",
        title: "The Eames Lounge Chair",
        subtitle: "A refined icon",
        description:
          "Developed with Herman Miller, the Lounge Chair and Ottoman becomes one of the most recognisable pieces of furniture ever produced.",
      },
      {
        date: "1978",
        title: "Death in St. Louis",
        subtitle: "The end of an era",
        description: "Charles Eames dies in 1978, having helped define the visual language of American mid-century modernism.",
      },
    ],
  },
  {
    slug: "ray-eames",
    similarDesignerSlugs: ["charles-eames", "eero-saarinen", "isamu-noguchi"],
    inFocus: {
      title: "Powers of Ten – 1977",
      image_url: null,
      paragraphs: [
        "Directed by Charles and Ray together, Powers of Ten is a nine-minute film that zooms from a picnic in a Chicago park out to the edge of the observable universe, then back down into the atomic structure of a hand — each step a jump by a factor of ten.",
        "The film distils Ray's eye for pacing, composition and clarity of idea, honed across dozens of short films the Eames Office produced for exhibitions, corporate clients and their own curiosity, often with Ray directing the visual and editorial decisions.",
        "Still shown in classrooms worldwide, Powers of Ten stands as proof that Ray's contribution to the Eames Office extended far beyond furniture, shaping how a generation learned to see scale itself.",
      ],
    },
    timeline: [
      {
        date: "1912",
        title: "Born Ray Kaiser",
        subtitle: "Sacramento, California",
        description: "Ray Kaiser is born and trains as a painter, studying under Hans Hofmann and exhibiting with the American Abstract Artists.",
      },
      {
        date: "1940",
        title: "Meeting Charles at Cranbrook",
        subtitle: "A shared direction",
        description: "She enrols at Cranbrook Academy of Art, where she meets Charles Eames.",
      },
      {
        date: "1941",
        title: "Founding the Eames Office",
        subtitle: "An equal partnership",
        description: "Charles and Ray marry and establish the Eames Office in Los Angeles as joint creative directors.",
      },
      {
        date: "1949",
        title: "The Eames House",
        subtitle: "A home as a manifesto",
        description: "Ray shapes the colour, textile and furnishing of their own Case Study House in Pacific Palisades.",
      },
      {
        date: "1977",
        title: "Powers of Ten",
        subtitle: "Scale, made visible",
        description: "The short film Powers of Ten becomes one of the most widely shown educational films ever produced.",
      },
      {
        date: "1988",
        title: "Death, Ten Years to the Day",
        subtitle: "A final symmetry",
        description: "Ray dies in 1988, exactly ten years after Charles, closing one of design's most complete creative partnerships.",
      },
    ],
  },
  {
    slug: "alvar-aalto",
    similarDesignerSlugs: ["arne-jacobsen", "hans-j-wegner", "eero-saarinen"],
    inFocus: {
      title: "Paimio Sanatorium – 1933",
      image_url: null,
      paragraphs: [
        "Commissioned to design a tuberculosis sanatorium in Paimio, Finland, Aalto treated the entire building as a medical instrument — orienting wards for maximum sunlight, engineering silent door closers, and designing wash basins shaped to minimise splashing noise.",
        "The project's most enduring object, the Paimio Chair, grew directly from this logic: its bent plywood frame and reclined angle were shaped specifically to ease the breathing of patients confined to it for hours, furniture designed for a precise physical need rather than a general one.",
        "Paimio established the template for Aalto's career-long humanist modernism — technically rigorous, but always oriented toward the comfort of the person actually using the space or the object.",
      ],
    },
    timeline: [
      {
        date: "1898",
        title: "Born in Kuortane",
        subtitle: "Kuortane, Finland",
        description: "Alvar Aalto is born and studies architecture at the Helsinki University of Technology.",
      },
      {
        date: "1924",
        title: "Marrying Aino Marsio",
        subtitle: "A lifelong partnership",
        description: "He marries architect Aino Marsio, who becomes his closest professional collaborator.",
      },
      {
        date: "1933",
        title: "Paimio Sanatorium",
        subtitle: "Architecture as medicine",
        description: "The Paimio Sanatorium and its accompanying bent-plywood chair establish his humanist approach to modernism.",
      },
      {
        date: "1935",
        title: "Founding Artek",
        subtitle: "Furniture, manufactured on his terms",
        description: "With Aino and two collaborators, he founds Artek to produce and distribute his bent-wood furniture designs.",
      },
      {
        date: "1936",
        title: "The Savoy Vase",
        subtitle: "A rippled icon",
        description: "Designed for Helsinki's Savoy restaurant, the free-form glass vase becomes a lasting symbol of Finnish design.",
      },
      {
        date: "1976",
        title: "Death in Helsinki",
        subtitle: "A national legacy",
        description: "Aalto dies in Helsinki, remembered as the central figure of twentieth-century Finnish design and architecture.",
      },
    ],
  },
  {
    slug: "eileen-gray",
    similarDesignerSlugs: ["le-corbusier", "charlotte-perriand", "jean-prouve"],
    inFocus: {
      title: "E-1027 – 1929",
      image_url: null,
      paragraphs: [
        "Designed and largely self-taught by Eileen Gray, E-1027 is a modernist villa on the French Riviera built for herself and her partner, the architecture critic Jean Badovici — its name encoding their initials and the alphabet's position of E, 10 (J), 2 (B), 7 (G).",
        "Gray designed furniture specifically for the house as she built it, including the adjustable E-1027 table, conceived so a breakfast tray could pass over a bed, and the Bibendum and Transat chairs, softening the era's industrial materials into something more intimate.",
        "Le Corbusier, a frequent guest, later painted a series of murals directly onto the house's walls without Gray's consent — an act she considered a violation that overshadowed her authorship for decades, until the house's long, contested restoration helped restore her name to it.",
      ],
    },
    timeline: [
      {
        date: "1878",
        title: "Born in Ireland",
        subtitle: "Near Enniscorthy, Ireland",
        description: "Eileen Gray is born and later studies at the Slade School of Art in London before settling in Paris.",
      },
      {
        date: "1900s",
        title: "Learning Lacquer",
        subtitle: "A Japanese technique",
        description: "She trains in lacquer technique under the Japanese craftsman Seizo Sugawara, shaping her earliest celebrated work.",
      },
      {
        date: "1922",
        title: "Opening a Paris Gallery",
        subtitle: "Jean Désert",
        description: "Gray opens her own gallery in Paris to sell her furniture and interiors directly.",
      },
      {
        date: "1929",
        title: "E-1027",
        subtitle: "A house of her own design",
        description: "She completes E-1027 on the French Riviera, designing both the building and its furniture.",
      },
      {
        date: "1930s – 1960s",
        title: "Decades of Obscurity",
        subtitle: "Working, unrecognised",
        description: "Gray continues designing privately, largely overlooked by a design establishment that credited her male contemporaries instead.",
      },
      {
        date: "1976",
        title: "Death at Ninety-Eight",
        subtitle: "A rediscovery begins",
        description: "She dies in Paris in 1976, just as renewed scholarly interest begins to restore her standing in design history.",
      },
    ],
  },
  {
    slug: "harry-bertoia",
    similarDesignerSlugs: ["eero-saarinen", "charles-eames", "isamu-noguchi", "florence-knoll"],
    inFocus: {
      title: "The Sonambient Barn – 1970s",
      image_url: null,
      paragraphs: [
        "Once the commercial success of the Diamond Chair gave him financial independence, Bertoia largely stepped back from furniture to pursue sculpture full-time, converting a barn near his Pennsylvania studio into what he called the Sonambient Barn.",
        "There he filled the space with hundreds of flexible metal rod sculptures — tall, closely spaced bronze and beryllium copper rods that produce shimmering, bell-like tones when touched or moved by wind — and recorded more than a dozen albums of the sounds they made.",
        "The Sonambient works represent the fullest expression of Bertoia's belief that his furniture and his sculpture were never really separate practices, both built from his sense of metal as a material that could be made to feel weightless.",
      ],
    },
    timeline: [
      {
        date: "1915",
        title: "Born in Italy",
        subtitle: "San Lorenzo, Italy",
        description: "Harry Bertoia is born and emigrates to Detroit at fifteen to join his brother.",
      },
      {
        date: "1937",
        title: "Cranbrook",
        subtitle: "A metalworking education",
        description: "He studies and later teaches metalworking at Cranbrook Academy of Art, developing the skills behind his later furniture.",
      },
      {
        date: "1950",
        title: "Joining Knoll",
        subtitle: "An open invitation",
        description: "Hans and Florence Knoll invite him to develop a new seating line with full creative freedom.",
      },
      {
        date: "1952",
        title: "The Diamond Chair",
        subtitle: "\"Made mainly of air\"",
        description: "His welded wire mesh Diamond Chair becomes an instant commercial and critical success.",
      },
      {
        date: "1960s – 1970s",
        title: "The Sonambient Works",
        subtitle: "Sculpture, made to sound",
        description: "Financially independent, he devotes himself to sound sculpture, filling a converted barn with tonal metal rod works.",
      },
      {
        date: "1978",
        title: "Death in Pennsylvania",
        subtitle: "A dual legacy",
        description: "Bertoia dies at his Pennsylvania studio, remembered equally as a furniture designer and a sculptor.",
      },
    ],
  },
  {
    slug: "isamu-noguchi",
    similarDesignerSlugs: ["charles-eames", "ray-eames", "harry-bertoia"],
    inFocus: {
      title: "The Noguchi Museum – 1985",
      image_url: null,
      paragraphs: [
        "In 1985, Noguchi converted a former industrial building across the street from his Long Island City studio into a museum dedicated entirely to his own work — one of the few instances of an artist designing and building a permanent home for his life's output during his own lifetime.",
        "The museum's indoor galleries and open-air sculpture garden were arranged by Noguchi himself, placing stone, bronze and wood sculptures, models, and Akari light sculptures in deliberate relationship to one another and to natural light — an extension of his belief that sculpture, architecture and landscape were never truly separate disciplines.",
        "Still operating today, the Noguchi Museum remains the clearest record of how he wanted his work to be seen and understood, on his own terms rather than a curator's.",
      ],
    },
    timeline: [
      {
        date: "1904",
        title: "Born in Los Angeles",
        subtitle: "Los Angeles, California",
        description: "Isamu Noguchi is born to an American mother and Japanese father, and spends much of his childhood in Japan.",
      },
      {
        date: "1927",
        title: "Apprenticing with Brâncuși",
        subtitle: "Paris, France",
        description: "A Guggenheim Fellowship brings him to Paris, where he briefly apprentices with sculptor Constantin Brâncuși.",
      },
      {
        date: "1944",
        title: "The Noguchi Table",
        subtitle: "Sculpture as furniture",
        description: "Designed for Herman Miller, the Noguchi Table treats a glass-topped table as a work of biomorphic sculpture.",
      },
      {
        date: "1951",
        title: "The Akari Lanterns",
        subtitle: "Light, sculpted",
        description: "Beginning collaborations with craftsmen in Gifu, Japan, he starts the Akari series of paper light sculptures.",
      },
      {
        date: "1985",
        title: "Founding His Own Museum",
        subtitle: "Long Island City, New York",
        description: "He opens the Noguchi Museum in a converted industrial building across from his studio.",
      },
      {
        date: "1988",
        title: "Death in New York",
        subtitle: "A singular practice",
        description: "Noguchi dies in New York, having worked fluidly across sculpture, furniture, stage design and public space for six decades.",
      },
    ],
  },
  {
    slug: "jean-prouve",
    similarDesignerSlugs: ["le-corbusier", "charlotte-perriand", "marcel-breuer"],
    inFocus: {
      title: "Maison Tropicale – 1949–1951",
      image_url: null,
      paragraphs: [
        "Commissioned by the French government for its colonial territories in Africa, the Maison Tropicale was a prefabricated aluminium house designed by Prouvé to be manufactured entirely in France, flown to West Africa, and assembled on site — extending his furniture logic of demountable, standardised parts to an entire building.",
        "Its folded aluminium panels, adjustable sun louvres and ventilated double roof were engineered specifically for tropical climates, built from the same structural honesty that shaped his Standard Chair: every component sized according to the load or condition it actually had to handle.",
        "Only three were ever built. Decades later, the surviving examples became some of the most expensive houses ever sold at auction — a strange afterlife for a project originally conceived as affordable, functional colonial housing.",
      ],
    },
    timeline: [
      {
        date: "1901",
        title: "Born in Nancy",
        subtitle: "Nancy, France",
        description: "Jean Prouvé is born into a family of artists associated with the École de Nancy and trains as a metalworker.",
      },
      {
        date: "1923",
        title: "Opening His Workshop",
        subtitle: "A metalworker's start",
        description: "He opens his own metalworking workshop in Nancy, the base for his furniture and building experiments.",
      },
      {
        date: "1934",
        title: "The Standard Chair",
        subtitle: "Structure, made visible",
        description: "His Standard Chair places its reinforced rear legs exactly where the sitter's weight falls.",
      },
      {
        date: "1949 – 1951",
        title: "Maison Tropicale",
        subtitle: "Prefabrication, taken further",
        description: "He designs a prefabricated aluminium house for colonial Africa, shipped in components and assembled on site.",
      },
      {
        date: "1950s",
        title: "Industrial Construction Systems",
        subtitle: "Beyond furniture",
        description: "He develops folded and pressed sheet steel building systems, blurring the line between furniture-maker and builder.",
      },
      {
        date: "1984",
        title: "Death in Nancy",
        subtitle: "A quiet rediscovery",
        description: "Prouvé dies in Nancy; his work, long undervalued, later becomes some of the most sought-after design of the century.",
      },
    ],
  },
  {
    slug: "marcel-breuer",
    similarDesignerSlugs: ["ludwig-mies-van-der-rohe", "le-corbusier", "jean-prouve"],
    inFocus: {
      title: "Whitney Museum of American Art – 1966",
      image_url: null,
      paragraphs: [
        "Commissioned to design a new home for the Whitney Museum on Madison Avenue in New York, Breuer produced an inverted, granite-clad concrete volume that widens as it rises — a deliberately fortress-like presence on a street of glass office towers.",
        "The building marked a dramatic shift from the light, bent tubular steel of his early furniture toward the heavy, sculptural concrete language now known as Brutalism, of which Breuer became one of its most prominent American practitioners.",
        "The Whitney moved out in 2014, and the building — now known as the Met Breuer, later Frick Madison — continues to house major collections, its uncompromising concrete form still as polarising as when it first opened.",
      ],
    },
    timeline: [
      {
        date: "1902",
        title: "Born in Pécs",
        subtitle: "Pécs, Hungary",
        description: "Marcel Breuer is born and enrols at the Bauhaus in Weimar in 1920.",
      },
      {
        date: "1925",
        title: "The Wassily Chair",
        subtitle: "Inspired by a bicycle",
        description: "Now head of the Bauhaus furniture workshop at twenty-four, he designs the tubular steel Wassily Chair.",
      },
      {
        date: "1928",
        title: "The Cesca Chair",
        subtitle: "Cantilevered and caned",
        description: "He designs the cantilevered, cane-seated Cesca Chair, among the most widely copied chairs of the century.",
      },
      {
        date: "1937",
        title: "Emigrating to the United States",
        subtitle: "Teaching at Harvard",
        description: "Breuer moves to the US to teach at Harvard's Graduate School of Design, shaping students including Philip Johnson and I. M. Pei.",
      },
      {
        date: "1966",
        title: "The Whitney Museum",
        subtitle: "A turn to Brutalism",
        description: "His granite-clad Whitney Museum building in New York becomes a landmark of American Brutalist architecture.",
      },
      {
        date: "1981",
        title: "Death in New York",
        subtitle: "From tube to concrete",
        description: "Breuer dies in New York, remembered for a career spanning the lightest furniture and the heaviest buildings of modernism.",
      },
    ],
  },
  {
    slug: "michael-thonet",
    similarDesignerSlugs: ["le-corbusier", "marcel-breuer", "ludwig-mies-van-der-rohe"],
    inFocus: {
      title: "The Gebrüder Thonet Production System – From 1853",
      image_url: null,
      paragraphs: [
        "Beyond any single chair, Thonet's most significant design was arguably the manufacturing system itself: standardised, interchangeable steam-bent wood components, produced in specialised factories and shipped unassembled to be put together locally — logic that would not look out of place in a flat-pack furniture catalogue a century later.",
        "This system let Chair No. 14 be sold at a fraction of the cost of carved, joined furniture, and at a scale no previous furniture maker had attempted: by the start of the twentieth century, Gebrüder Thonet had produced tens of millions of chairs, exported across Europe and beyond.",
        "That combination — industrial efficiency serving an elegant, minimal form — makes Thonet a direct ancestor of the furniture Breuer, Mies van der Rohe and Le Corbusier would later have manufactured by the very same company he founded.",
      ],
    },
    timeline: [
      {
        date: "1796",
        title: "Born in Boppard",
        subtitle: "Boppard, Germany",
        description: "Michael Thonet is born and trains as a cabinetmaker.",
      },
      {
        date: "1830s",
        title: "Experimenting with Bent Wood",
        subtitle: "Steam, not carving",
        description: "He develops techniques for steam-bending solid wood into curved forms without carving or joinery.",
      },
      {
        date: "1842",
        title: "A Royal Patent",
        subtitle: "Vienna, Austria",
        description: "Invited to Vienna by the Austrian state, he secures a patent protecting his bentwood process.",
      },
      {
        date: "1853",
        title: "Founding Gebrüder Thonet",
        subtitle: "A family company",
        description: "He founds Gebrüder Thonet with his sons, building the factories that will mass-produce his designs.",
      },
      {
        date: "1859",
        title: "Chair No. 14",
        subtitle: "The \"consumer chair\"",
        description: "His six-part, flat-packed Chair No. 14 becomes the ubiquitous chair of European cafés, selling in the tens of millions.",
      },
      {
        date: "1871",
        title: "Death in Vienna",
        subtitle: "A foundation for modernism",
        description: "Thonet dies in Vienna, having built the industrial template that twentieth-century modernists would later build upon.",
      },
    ],
  },
  {
    slug: "dieter-rams",
    similarDesignerSlugs: ["jean-prouve", "marcel-breuer", "le-corbusier"],
    inFocus: {
      title: "The 606 Universal Shelving System – 1960",
      image_url: null,
      paragraphs: [
        "Designed for the furniture company Vitsöe in 1960, the 606 Universal Shelving System is a modular, wall-mounted set of aluminium E-Tracks, shelves and cabinets that can be configured, extended or reconfigured indefinitely without specialist tools.",
        "The system embodies Rams's core conviction that good design should last: rather than a fixed object, 606 is a kit of parts meant to adapt to a user's changing needs over decades, still built today to the same specification and compatible with components sold sixty years ago.",
        "Alongside his product design for Braun, 606 is the clearest statement of Rams's \"Ten Principles of Good Design\" in physical form — honest, unobtrusive, long-lasting, and about as little design as the problem allows.",
      ],
    },
    timeline: [
      {
        date: "1932",
        title: "Born in Wiesbaden",
        subtitle: "Wiesbaden, Germany",
        description: "Dieter Rams is born and studies architecture and interior design at the Wiesbaden School of Art.",
      },
      {
        date: "1955",
        title: "Joining Braun",
        subtitle: "A new design language",
        description: "He joins the electronics manufacturer Braun, soon becoming its chief design officer.",
      },
      {
        date: "1956",
        title: "The SK4 Record Player",
        subtitle: "\"Snow White's Coffin\"",
        description: "His SK4, with its clear acrylic lid, becomes an early, defining statement of Braun's design philosophy.",
      },
      {
        date: "1960",
        title: "The 606 Shelving System",
        subtitle: "Furniture meant to last",
        description: "Designed for Vitsöe, the modular 606 Universal Shelving System remains in production, largely unchanged, to this day.",
      },
      {
        date: "1970s – 1980s",
        title: "Ten Principles of Good Design",
        subtitle: "A design philosophy, written down",
        description: "Frustrated by \"a world of unnecessary products,\" Rams formulates his ten principles, later hugely influential on Apple's design under Jony Ive.",
      },
      {
        date: "Today",
        title: "An Ongoing Influence",
        subtitle: "Still active",
        description: "Rams remains active in retirement in Kronberg, Germany, his restraint-driven philosophy more widely cited than ever.",
      },
    ],
  },
  {
    slug: "gio-ponti",
    similarDesignerSlugs: ["achille-castiglioni", "ettore-sottsass", "vico-magistretti", "marco-zanuso"],
    inFocus: {
      title: "Pirelli Tower – 1960",
      image_url: null,
      paragraphs: [
        "Designed with structural engineer Pier Luigi Nervi, the Pirelli Tower in Milan was, on completion in 1960, one of the tallest reinforced concrete buildings in the world — a slender, tapered hexagonal slab that broke sharply from the rectangular glass-box skyscrapers then dominating postwar architecture.",
        "Ponti treated the tower's structure itself as the source of its elegance, letting the building's tapering profile express the diminishing loads of its upper floors rather than disguising them, a logic he applied with equal care to the furniture, lighting and ceramics he designed throughout his career.",
        "Still Milan's second-tallest building decades later, the Pirelli Tower remains a defining symbol of Italy's postwar economic and design renaissance — the same era Ponti chronicled, and helped shape, through his magazine Domus.",
      ],
    },
    timeline: [
      {
        date: "1891",
        title: "Born in Milan",
        subtitle: "Milan, Italy",
        description: "Gio Ponti is born and studies architecture at the Politecnico di Milano.",
      },
      {
        date: "1928",
        title: "Founding Domus",
        subtitle: "A platform for Italian design",
        description: "He founds and edits Domus magazine, which remains one of design's most influential publications nearly a century later.",
      },
      {
        date: "1957",
        title: "The Superleggera Chair",
        subtitle: "Lightness, demonstrated",
        description: "Refined from a traditional Chiavari chair, the ultra-light Superleggera becomes a defining Cassina design.",
      },
      {
        date: "1960",
        title: "Pirelli Tower",
        subtitle: "A new Milan skyline",
        description: "His tapered concrete skyscraper, designed with Pier Luigi Nervi, becomes a landmark of Italian postwar architecture.",
      },
      {
        date: "1960s – 1970s",
        title: "A Total Designer",
        subtitle: "Ceramics, glass, cutlery",
        description: "Ponti continues designing across every scale, from buildings to tableware, guided by a belief in everyday elegance.",
      },
      {
        date: "1979",
        title: "Death in Milan",
        subtitle: "Five decades of influence",
        description: "Ponti dies in Milan, having shaped Italian design taste for most of the twentieth century, as both practitioner and editor.",
      },
    ],
  },
  {
    slug: "gaetano-pesce",
    similarDesignerSlugs: ["ettore-sottsass", "achille-castiglioni", "joe-colombo"],
    inFocus: {
      title: "Up5 & Up6 – 1969",
      image_url: null,
      paragraphs: [
        "Designed for B&B Italia, the Up5 armchair — nicknamed \"La Mamma\" for its voluptuous, body-like form — is tethered by a cord to the spherical Up6 ottoman, a deliberate reference by Pesce to the social constraints historically placed on women.",
        "The pair also showcased Pesce's experimental approach to manufacturing: vacuum-packed flat into a fraction of its final size, the polyurethane foam chair would visibly expand into shape within moments of being unwrapped by its owner — turning the act of unpacking furniture into a small performance.",
        "Reissued since its original release, Up5 & Up6 remains both one of the most recognisable objects of Italian radical design and one of its most direct pieces of social commentary, built into a mass-produced armchair.",
      ],
    },
    timeline: [
      {
        date: "1939",
        title: "Born in La Spezia",
        subtitle: "La Spezia, Italy",
        description: "Gaetano Pesce is born and studies architecture in Venice.",
      },
      {
        date: "1960s",
        title: "Radical Design",
        subtitle: "Breaking with rationalism",
        description: "He emerges from Italy's radical design movements, rejecting the clean rationalism of the previous generation.",
      },
      {
        date: "1969",
        title: "Up5 & Up6",
        subtitle: "\"La Mamma\"",
        description: "His vacuum-packed foam armchair for B&B Italia becomes an icon of social commentary disguised as furniture.",
      },
      {
        date: "1970s – 1980s",
        title: "Working in Resin",
        subtitle: "Embracing imperfection",
        description: "He becomes a prominent experimenter with resin, deliberately producing pieces so that no two are ever quite identical.",
      },
      {
        date: "1980s – 2000s",
        title: "A Base in New York",
        subtitle: "Furniture, architecture, art",
        description: "Working from New York, Pesce continues across furniture, architecture and art, arguing for difference over uniformity.",
      },
      {
        date: "2024",
        title: "Death in New York",
        subtitle: "A sixty-year argument",
        description: "Pesce dies in New York in 2024, having spent six decades insisting that imperfection was a design virtue, not a flaw.",
      },
    ],
  },
]

export default async function seedInfluentialDesignersExtras({ container }: ExecArgs) {
  const designerModuleService: DesignerModuleService = container.resolve(DESIGNER_MODULE)

  for (const extra of EXTRAS) {
    const [designer] = await designerModuleService.listDesigners({ slug: extra.slug })
    if (!designer) {
      console.warn(`Skipping ${extra.slug}: designer not found`)
      continue
    }

    await designerModuleService.updateDesigners({
      id: designer.id,
      timeline: { entries: extra.timeline },
      in_focus: extra.inFocus,
      similar_designers: { slugs: extra.similarDesignerSlugs },
    })
    console.log(`Updated extras for ${extra.slug}`)
  }

  console.log(`Done. Updated ${EXTRAS.length} designer(s).`)
}
