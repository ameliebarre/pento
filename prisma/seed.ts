import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new PrismaClient();

// The catalog (everything below) is reset and rebuilt on every run — it's
// reference/demo data, not user data. `User` keeps using upsert further
// down so re-seeding never touches real accounts.
async function resetCatalog() {
  await prisma.productTag.deleteMany();
  await prisma.productMaterial.deleteMany();
  await prisma.productDesigner.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.product.deleteMany();
  await prisma.designer.deleteMany();
  await prisma.manufacturer.deleteMany();
  await prisma.movement.deleteMany();
  await prisma.material.deleteMany();
  await prisma.image.deleteMany();
  await prisma.country.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.category.deleteMany();
}

function image(url: string, alt: string) {
  return prisma.image.create({ data: { url, alt } });
}

async function main() {
  await resetCatalog();

  // ---------------------------------------------------------------------
  // Categories
  // ---------------------------------------------------------------------
  const categoryDefs = [
    {
      name: "Chairs",
      slug: "chairs",
      image:
        "https://res.cloudinary.com/dasujyncc/image/upload/v1785966873/pento/categories/chairs.webp",
    },
    {
      name: "Armchairs",
      slug: "armchairs",
      image:
        "https://res.cloudinary.com/dasujyncc/image/upload/v1785966961/pento/categories/armchairs.jpg",
    },
    {
      name: "Sofas",
      slug: "sofas",
      image:
        "https://res.cloudinary.com/dasujyncc/image/upload/v1785965914/pento/categories/sofas_ek6cls.jpg",
    },
    {
      name: "Tables",
      slug: "tables",
      image:
        "https://res.cloudinary.com/dasujyncc/image/upload/v1785966060/pento/categories/tables.png",
    },
    {
      name: "Lighting",
      slug: "lighting",
      image:
        "https://res.cloudinary.com/dasujyncc/image/upload/v1785966756/pento/categories/lighting.webp",
    },
    {
      name: "Accessoiries",
      slug: "accessoiries",
      image:
        "https://res.cloudinary.com/dasujyncc/image/upload/v1785966133/pento/categories/accessoiries_z3hmd2.jpg",
    },
  ];
  const categories = Object.fromEntries(
    await Promise.all(
      categoryDefs.map(async (c) => {
        const cover = await image(c.image, c.name);
        const category = await prisma.category.create({
          data: { name: c.name, slug: c.slug, coverImageId: cover.id },
        });
        return [c.slug, category] as const;
      }),
    ),
  );

  // ---------------------------------------------------------------------
  // Countries
  // ---------------------------------------------------------------------
  const countryNames = [
    "France",
    "Italie",
    "Allemagne",
    "Danemark",
    "États-Unis",
    "Suisse",
    "Pays-Bas",
  ];
  const countries = Object.fromEntries(
    await Promise.all(
      countryNames.map(
        async (name) => [name, await prisma.country.create({ data: { name } })] as const,
      ),
    ),
  );

  // ---------------------------------------------------------------------
  // Tags (used by search/filtering)
  // ---------------------------------------------------------------------
  const tagNames = [
    "bestseller",
    "armchairs",
    "chairs",
    "sofas",
    "lighting",
    "accessoiries",
    "outdoor",
    "italian design",
    "nordic design",
    "japanese design",
  ];
  const tags = Object.fromEntries(
    await Promise.all(
      tagNames.map(async (name) => [name, await prisma.tag.create({ data: { name } })] as const),
    ),
  );

  // ---------------------------------------------------------------------
  // Designers
  // ---------------------------------------------------------------------
  const designerDefs = [
    {
      slug: "pierre-paulin",
      firstName: "Pierre",
      lastName: "Paulin",
      birthDate: new Date("1927-07-09"),
      deathDate: new Date("2009-06-13"),
      nationality: "Française",
      biography: `Figure incontournable du design français, Pierre Paulin a révolutionné le mobilier en imaginant des assises aux formes organiques et enveloppantes.
      Guidé par la recherche du confort absolu, il transforme fauteuils et canapés en véritables sculptures où l'ergonomie rencontre l'audace.
      Ses créations, devenues iconiques, incarnent un design à la fois chaleureux, innovant et résolument intemporel.`,
      quote: "Le confort est une émotion avant d'être une posture.",
      image: "/images/pierre-paulin.jpg",
    },
    {
      slug: "werner-aisslinger",
      firstName: "Werner",
      lastName: "Aisslinger",
      birthDate: new Date("1957-08-31"),
      deathDate: null,
      nationality: "Allemande",
      biography: `Designer allemand visionnaire, Werner Aisslinger explore depuis plus de trente ans les frontières entre technologie, artisanat et nouvelles façons d'habiter.
      À travers ses créations, il imagine un mobilier contemporain où fonctionnalité et poésie dialoguent avec des matériaux innovants.
      Son approche expérimentale transforme les objets du quotidien en expériences sensibles, pensées pour accompagner les modes de vie d'aujourd'hui.`,
      quote: "La matière doit raconter une histoire avant même d'être touchée.",
      image: "/images/werner-aisslinger.jpg",
    },
    {
      slug: "andree-putman",
      firstName: "Andrée",
      lastName: "Putman",
      birthDate: new Date("1925-12-23"),
      deathDate: new Date("2013-01-19"),
      nationality: "Française",
      biography: `Figure emblématique du design français, Andrée Putman a marqué son époque par son approche minimaliste, sophistiquée et intemporelle.
      Entre lignes épurées, contrastes graphiques et amour des matières nobles, elle a créé des espaces et des objets où le luxe se révèle dans la simplicité.
      Son regard unique a donné naissance à une esthétique reconnaissable entre toutes, mêlant modernité et héritage parisien.`,
      quote: "Le luxe, c'est l'espace et la lumière — jamais l'accumulation.",
      image: "/images/andree-putman.jpg",
    },
    {
      slug: "ettore-sottsass",
      firstName: "Ettore",
      lastName: "Sottsass",
      birthDate: new Date("1917-09-14"),
      deathDate: new Date("2007-12-31"),
      nationality: "Italienne",
      biography: `Architecte et designer italien, Ettore Sottsass a bouleversé les codes du mobilier en faisant de chaque création un terrain d'expression artistique.
      Fondateur du mouvement Memphis, il célèbre les couleurs vives, les formes géométriques et la liberté créative, loin des conventions du design moderniste.
      Ses pièces iconiques continuent d'inspirer une vision joyeuse, audacieuse et profondément expressive du design contemporain.`,
      quote: "Le design devrait aussi être une manière de discuter de la vie.",
      image: "/images/ettore-sottsass.jpg",
    },
    {
      slug: "achille-castiglioni",
      firstName: "Achille",
      lastName: "Castiglioni",
      birthDate: new Date("1918-02-16"),
      deathDate: new Date("2002-12-02"),
      nationality: "Italienne",
      biography: `Maître du design italien, Achille Castiglioni a marqué l'histoire par sa capacité à transformer les objets les plus simples en créations d'une remarquable ingéniosité.
      Son travail repose sur une observation attentive des usages, où chaque détail répond à une fonction avec élégance et humour.
      Des luminaires aux assises, ses créations illustrent un design intemporel, pensé pour durer et enrichir le quotidien.`,
      quote:
        "Regardez les choses avec les yeux d'un enfant qui ne sait pas encore qu'elles sont impossibles.",
      image: "/images/achille-castiglioni.jpg",
    },
    {
      slug: "pier-giacomo-castiglioni",
      firstName: "Pier Giacomo",
      lastName: "Castiglioni",
      birthDate: new Date("1913-04-22"),
      deathDate: new Date("1968-11-27"),
      nationality: "Italienne",
      biography: `Pier Giacomo Castiglioni est l'un des designers les plus influents de design italien et parmi les plus célèbres
      dans le monde, considéré par Dino Gavina comme l'un des dix plus grands designers au monde. Ses œuvres sont exposées et 
      conservées dans les collections des musées les plus importants de la conception industrielle et de l'art contemporain dans 
      le monde, du Musée d'art moderne de New York à la Triennale Design Museum de Milan.`,
      quote:
        "Regardez les choses avec les yeux d'un enfant qui ne sait pas encore qu'elles sont impossibles.",
      image: "/images/pier-giacomo-castiglioni.jpg",
    },
    {
      slug: "ludwig-mies-van-der-rohe",
      firstName: "Ludwig",
      lastName: "Mies van der Rohe",
      birthDate: new Date("1886-03-27"),
      deathDate: new Date("1969-08-17"),
      nationality: "Allemande",
      biography: `Architecte et designer allemand, Ludwig Mies van der Rohe est l'un des pères fondateurs de l'architecture moderne et du mouvement Bauhaus, qu'il dirigea jusqu'à sa fermeture en 1933.
      Son credo, « less is more », traverse toute son œuvre : des lignes pures, une structure apparente et un refus total de l'ornement superflu.
      Créé pour le pavillon allemand de l'Exposition universelle de Barcelone en 1929, son fauteuil éponyme reste aujourd'hui l'une des icônes absolues du design du XXᵉ siècle.`,
      quote: "Less is more.",
      image: null,
    },
    {
      slug: "arne-jacobsen",
      firstName: "Arne",
      lastName: "Jacobsen",
      birthDate: new Date("1902-02-11"),
      deathDate: new Date("1971-03-24"),
      nationality: "Danoise",
      biography: `Architecte et designer danois, Arne Jacobsen incarne l'âge d'or du design scandinave par son approche organique et sa maîtrise du moulage en une seule pièce.
      Conçu à l'origine pour le hall du Royal Hotel de Copenhague, son fauteuil Œuf enveloppe le corps dans une coque sculpturale qui a redéfini la notion de confort dans un espace ouvert.
      Son travail, entre rigueur fonctionnaliste et sensualité des formes, continue d'incarner l'excellence du design danois à travers le monde.`,
      quote: "Une chaise n'a pas de dos à cacher : sa beauté doit se voir sous tous les angles.",
      image: null,
    },
  ];

  const designers = Object.fromEntries(
    await Promise.all(
      designerDefs.map(async (d) => {
        const portrait = d.image
          ? await image(d.image, `Portrait de ${d.firstName} ${d.lastName}`)
          : null;
        const designer = await prisma.designer.create({
          data: {
            slug: d.slug,
            firstName: d.firstName,
            lastName: d.lastName,
            birthDate: d.birthDate,
            deathDate: d.deathDate,
            nationality: d.nationality,
            biography: d.biography,
            quote: d.quote,
            imageId: portrait?.id,
          },
        });
        return [d.slug, designer] as const;
      }),
    ),
  );

  // ---------------------------------------------------------------------
  // Manufacturers
  // ---------------------------------------------------------------------
  const manufacturerDefs = [
    {
      slug: "knoll",
      name: "Knoll",
      country: "États-Unis",
      website: "https://www.knoll.com",
      history: `Fondée en 1938 à New York par Hans Knoll, la maison s'impose dès l'après-guerre comme l'éditrice de référence du mobilier moderniste, en produisant notamment les créations de Mies van der Rohe et Eero Saarinen.
      Aujourd'hui encore, Knoll perpétue cet héritage en rééditant fidèlement les icônes du XXᵉ siècle.`,
    },
    {
      slug: "fritz-hansen",
      name: "Fritz Hansen",
      country: "Danemark",
      website: "https://www.fritzhansen.com",
      history: `Manufacture danoise fondée en 1872, Fritz Hansen a accompagné l'essor du design scandinave en collaborant avec ses plus grands noms, d'Arne Jacobsen à Hans Wegner.
      Chaque pièce est produite au Danemark selon un savoir-faire artisanal transmis depuis plus de 150 ans.`,
    },
    {
      slug: "vitra",
      name: "Vitra",
      country: "Suisse",
      website: "https://www.vitra.com",
      history: `Fondée en 1950 en Suisse, Vitra a fait le pari audacieux d'importer en Europe les créations du couple Eames avant de devenir elle-même un pôle majeur de création contemporaine.
      La marque conjugue aujourd'hui recherche, architecture et mobilier avec la même exigence.`,
    },
    {
      slug: "cassina",
      name: "Cassina",
      country: "Italie",
      website: "https://www.cassina.com",
      history: `Manufacture milanaise fondée en 1927, Cassina s'est imposée comme la gardienne du patrimoine moderniste italien, rééditant les créations de Le Corbusier, Charlotte Perriand et Gio Ponti.
      Elle demeure une référence pour l'excellence de sa fabrication artisanale.`,
    },
    {
      slug: "artifort",
      name: "Artifort",
      country: "Pays-Bas",
      website: "https://www.artifort.com",
      history: `Fondée en 1890 aux Pays-Bas, Artifort doit sa renommée internationale à sa collaboration historique avec Pierre Paulin dans les années 1960, dont elle a produit les formes les plus audacieuses.
      La maison continue d'éditer un mobilier résolument sculptural.`,
    },
    {
      slug: "memphis-milano",
      name: "Memphis Milano",
      country: "Italie",
      website: "https://www.memphis-milano.com",
      history: `Collectif fondé à Milan en 1981 par Ettore Sottsass et un groupe de jeunes designers, Memphis a bouleversé les codes du design en assumant la couleur, le motif et l'ironie contre le fonctionnalisme ambiant.
      Son héritage irrigue encore la création contemporaine la plus audacieuse.`,
    },
    {
      slug: "flos",
      name: "Flos",
      country: "Italie",
      website: "https://flos.com/",
      history: `Flos luminaires fondée en 1962 à Merano, Flos est une entreprise internationale qui offre une gamme de produits 
      et systèmes d’éclairage destinés au secteur résidentiel et architectural. Célèbre pour ses luminaires design et innovants, 
      la société dispose d’un catalogue riche en produits emblématiques, des lampes iconiques, des luminaires intemprelles qui ont 
      été conçus par des légendes dans l’histoire du design, telles qu’ Achille Castiglioni, Philippe Starck, Antonio Citterio, 
      Marcel Wanders, Konstantin Grcic, Jasper Morrison, Patricia Urquiola, Ron Gilad, Ronan et Erwan Bouroullec et beaucoup 
      d’autres architectes ou designers. En effet en 1988, la société "flash" sur un certain Philippe Starck, de là, la lampe 
      Ara naît de cette collaboration qui dure maintenant depuis plus de 20 ans. Flos fait preuve d’un engagement permanent dans 
      la recherche et l’innovation technologique, et témoigne d’une extraordinaire capacité à trouver de nouveaux talents créatifs. `,
    },
  ];

  const manufacturers = Object.fromEntries(
    await Promise.all(
      manufacturerDefs.map(async (m) => {
        const manufacturer = await prisma.manufacturer.create({
          data: {
            slug: m.slug,
            name: m.name,
            history: m.history,
            website: m.website,
            countryId: countries[m.country].id,
          },
        });
        return [m.slug, manufacturer] as const;
      }),
    ),
  );

  // ---------------------------------------------------------------------
  // Movements (aka "styles" — shown as "Browse by movement" on the homepage)
  // ---------------------------------------------------------------------
  const movementDefs = [
    {
      slug: "bauhaus",
      name: "Bauhaus",
      description:
        "Le Bauhaus a été fondé par Walter Gropius en 1919 à Weimar, en Allemagne. L'école Bauhaus a été créée avec l'idée révolutionnaire de réunir l'artisanat, l'art et la technologie. Walter Gropius voulait éliminer la distinction entre les beaux-arts et les arts appliqués. Cette approche novatrice a permis au Bauhaus de devenir un creuset de nouvelles idées et de pratiques avant-gardistes.",
      startDate: new Date("1919-01-01"),
      endDate: new Date("1933-01-01"),
      image:
        "https://res.cloudinary.com/dasujyncc/image/upload/v1785933605/pento/movements/bauhaus.webp",
    },
    {
      slug: "mid-century",
      name: "Mid-Century",
      description:
        "Apparu dans les années 40 aux Etats-Unis, le mid-century modern émerge d’abord dans le domaine de l’architecture avec de grands noms comme Frank Lloyd Wright et Richard Neutra, puis influence ensuite le monde du design. Ce style épuré se veut une réaction aux intérieurs opulents et chargés des décennies qui l’ont précédé, et tire notamment son inspiration du courant artistique Bauhaus et du mouvement moderne.",
      startDate: new Date("1945-01-01"),
      endDate: new Date("1970-01-01"),
      image:
        "https://res.cloudinary.com/dasujyncc/image/upload/v1785934984/pento/movements/mid-century.webp",
    },
    {
      slug: "memphis-milano",
      name: "Memphis Milano",
      description:
        "Fondée en 1981 par Ettore Sottsass et d'autres designers, Memphis Milano a révolutionné le design avec ses créations colorées et excentriques, symboles de l'Anti-design des années 1980. Aujourd'hui, la marque continue de produire artisanalement des pièces emblématiques recherchées par des collectionneurs et exposées dans des musées prestigieux.",
      startDate: new Date("1981-01-01"),
      endDate: new Date("1988-12-31"),
      image:
        "https://res.cloudinary.com/dasujyncc/image/upload/v1785916034/pento/movements/memphis-design.webp",
    },
    {
      slug: "postmodernism",
      name: "Postmodernisme",
      description:
        "Le mobilier conçu par les designers postmodernes se caractérise par des surfaces de couleur chaude, à fort motifs, généralement en plastique ; des proportions étranges et des angles non conventionnels et une relation éloignée entre la forme et la fonction de l'objet. Les critiques ont tourné en dérision le design postmoderne en présentant le mobilier comme étant uniquement distractif mais n'amenant pas de valeur ajoutée au mobilier. Le fait est que, trente ans plus tard, le design postmoderne a toujours le pouvoir de provoquer des étonnements et cela prouve que les critiques n'étaient pas tout à fait fondées.",
      startDate: new Date("1960-01-01"),
      endDate: null,
      image:
        "https://res.cloudinary.com/dasujyncc/image/upload/v1785933360/pento/movements/postmodernism.jpg",
    },
    {
      slug: "organic-design",
      name: "Design Organique",
      description:
        "Avec leurs courbes asymétriques, le mouvement presque naturel des pièces organiques rompt avec les lignes et angles droits traditionnels. Dans un intérieur, elles appellent à une esthétique plus harmonieuse, entre minimalisme et caractère.L’organique s’impose subtilement dans l’espace. Tandis que les miroirs ondulés apportent une douceur visuelle à l'espace, les canapés arrondis invitent à la convivialité et les meubles boisés rendent le lieu plus chaleureux, presque imposant.",
      startDate: null,
      endDate: null,
      image:
        "https://res.cloudinary.com/dasujyncc/image/upload/v1785915349/pento/movements/design-organique.jpg",
    },
  ];

  const movements = Object.fromEntries(
    await Promise.all(
      movementDefs.map(async (m) => {
        const cover = await image(m.image, m.name);
        const movement = await prisma.movement.create({
          data: {
            slug: m.slug,
            name: m.name,
            description: m.description,
            startDate: m.startDate,
            endDate: m.endDate,
            coverImageId: cover.id,
          },
        });
        return [m.slug, movement] as const;
      }),
    ),
  );

  // ---------------------------------------------------------------------
  // Materials — no dedicated photography yet, so left without images
  // rather than pointing at files that don't exist.
  // ---------------------------------------------------------------------
  const materialDefs = [
    {
      slug: "chene-massif",
      name: "Chêne massif",
      description:
        "Bois noble et durable, prisé pour sa résistance et le veinage chaleureux qu'il révèle avec le temps.",
    },
    {
      slug: "acier-inoxydable-poli",
      name: "Acier inoxydable poli",
      description:
        "Structure fine et résistante à la corrosion, pour un fini miroir d'une grande précision.",
    },
    {
      slug: "cuir-pleine-fleur",
      name: "Cuir pleine fleur",
      description: "Cuir de la plus haute qualité, qui se patine et se bonifie avec les années.",
    },
    {
      slug: "velours",
      name: "Velours",
      description:
        "Tissu au toucher soyeux et à la teinte profonde, pour une assise à la fois cosy et élégante.",
    },
    {
      slug: "marbre-de-carrare",
      name: "Marbre de Carrare",
      description:
        "Pierre italienne d'exception aux veinures uniques, symbole intemporel de raffinement.",
    },
    {
      slug: "rotin-naturel",
      name: "Rotin naturel",
      description:
        "Fibre végétale tressée à la main, légère et aérienne, pour une allure naturelle et estivale.",
    },
    {
      slug: "laiton-brosse",
      name: "Laiton brossé",
      description: "Alliage chaleureux à la patine dorée mate, qui se bonifie avec l'usage.",
    },
    {
      slug: "laine-bouclee",
      name: "Laine bouclée",
      description:
        "Fibre naturelle isolante et texturée, pour un confort enveloppant toute l'année.",
    },
    {
      slug: "metal-laque",
      name: "Métal laqué",
      description:
        "Métal recouvert d'une laque colorée brillante, pour une finition graphique et durable.",
    },
    {
      slug: "verre",
      name: "Verre",
      description:
        "Matière translucide et précise, souvent associée au métal pour un rendu à la fois léger et technique.",
    },
  ];

  const materials = Object.fromEntries(
    await Promise.all(
      materialDefs.map(async (m) => [m.slug, await prisma.material.create({ data: m })] as const),
    ),
  );

  // ---------------------------------------------------------------------
  // Products
  // ---------------------------------------------------------------------
  const productDefs = [
    {
      slug: "barcelona-chair",
      sku: "KNL-BAR-001",
      name: "Barcelona Chair",
      description: `Véritable icône du design du XXᵉ siècle, la Barcelona Chair incarne l'élégance intemporelle et le minimalisme sophistiqué imaginés par Ludwig Mies van der Rohe.
      Avec ses lignes épurées, sa silhouette aérienne et son confort remarquable, elle traverse les décennies sans jamais perdre de sa modernité.
      Conçue pour apporter une touche de prestige à un salon, un bureau ou un espace d'accueil, cette chaise design associe un piètement en acier inoxydable poli à une assise généreusement capitonnée.
      Son esthétique équilibrée s'intègre aussi bien dans les intérieurs contemporains que dans les ambiances plus classiques. Pensée pour durer, elle séduit autant par la qualité de ses matériaux que par la précision de ses finitions.
      Son assise ergonomique offre un excellent confort tout en faisant de cette pièce un véritable objet de décoration.`,
      price: 1445,
      stock: 4,
      salesCount: 128,
      featured: true,
      width: 75,
      height: 77,
      depth: 75,
      weight: 32,
      category: "armchairs",
      manufacturer: "knoll",
      movement: "bauhaus",
      designers: ["ludwig-mies-van-der-rohe"],
      materials: ["cuir-pleine-fleur", "acier-inoxydable-poli"],
      tags: [
        "Bauhaus",
        "Modernisme",
        "Fauteuil lounge",
        "Design iconique",
        "Mobilier du XXe siècle",
        "Acier chromé",
        "Cuir",
        "Minimalisme",
        "Luxe",
        "Intemporel",
        "Knoll",
        "Salon",
        "Architecture",
        "Less is more",
      ],
      image:
        "https://res.cloudinary.com/dasujyncc/image/upload/v1785876690/pento/products/barcelona-chair.jpg",
      imageAlt: "Fauteuil Barcelona en cuir capitonné sur piètement en acier inoxydable",
    },
    {
      slug: "mr-chair",
      sku: "KNL-BAR-002",
      name: "MR Chair",
      description: `La MR Chair, imaginée par Ludwig Mies van der Rohe à la fin des années 1920, est l'une des expressions
      les plus emblématiques du mouvement moderniste. Inspirée des fauteuils en acier utilisés dans les premiers meubles cantilever, 
      elle se distingue par sa structure en acier tubulaire courbé qui semble défier la gravité tout en offrant une assise d'un grand confort.
       Son dessin épuré, dépourvu de tout ornement superflu, reflète parfaitement la philosophie de Mies van der Rohe : « Less is more. »
        Aujourd'hui encore, la MR Chair séduit par son élégance intemporelle et sa capacité à s'intégrer aussi naturellement dans 
        un intérieur contemporain que dans un espace au caractère plus classique.`,
      price: 2780,
      stock: 4,
      salesCount: 128,
      featured: true,
      width: 49,
      height: 69,
      depth: 79,
      weight: 9,
      category: "chairs",
      manufacturer: "knoll",
      movement: "bauhaus",
      designers: ["ludwig-mies-van-der-rohe"],
      materials: ["cuir-pleine-fleur", "acier-inoxydable-poli"],
      tags: [
        "Bauhaus",
        "Modernisme",
        "Chaise cantilever",
        "Acier tubulaire",
        "Minimalisme",
        "Design iconique",
        "Mobilier du XXe siècle",
        "Architecture",
        "Ligne épurée",
        "Intemporel",
        "Salon",
        "Salle à manger",
        "Knoll",
        "Less is more",
      ],
      image:
        "https://res.cloudinary.com/dasujyncc/image/upload/v1785879904/pento/products/mr-chair.webp",
      imageAlt: "Chaise MR",
    },
    {
      slug: "snoopy-lamp",
      sku: "FLO-SNP-001",
      name: "Snoopy Lamp",
      description: `Imaginée en 1967 par Achille et Pier Giacomo Castiglioni, la Snoopy Lamp est devenue une véritable icône du design italien. Son abat-jour émaillé aux courbes généreuses, évoquant le célèbre personnage de bande dessinée, contraste élégamment avec son imposant socle en marbre blanc de Carrare.
  À la fois sculpturale et fonctionnelle, cette lampe de table diffuse une lumière directe idéale pour un bureau, une bibliothèque ou une table d'appoint. Le mariage du métal laqué et de la pierre naturelle met en valeur le savoir-faire italien tout en offrant une présence graphique forte.
  Plus de cinquante ans après sa création, la Snoopy Lamp demeure une référence incontournable du design, appréciée pour son esthétique audacieuse, la qualité de ses matériaux et son caractère intemporel.`,
      price: 1280,
      stock: 6,
      salesCount: 74,
      featured: true,
      width: 39.4,
      height: 36.9,
      depth: 39.4,
      weight: 7.9,
      category: "lighting",
      manufacturer: "flos",
      movement: "mid-century",
      designers: ["achille-castiglioni", "pier-giacomo-castiglioni"],
      materials: ["marbre-de-carrare", "metal-laque", "verre"],
      tags: [
        "Lampe de table",
        "Design italien",
        "Mid-Century",
        "Marbre",
        "Métal émaillé",
        "Éclairage",
        "Flos",
        "Design iconique",
        "Sculptural",
        "Élégance",
        "Bureau",
        "Salon",
        "Luxe",
        "Collection",
      ],
      image:
        "https://res.cloudinary.com/dasujyncc/image/upload/v1786016899/pento/products/snoopy-lamp_jggznu.jpg",
      imageAlt: "Lampe Snoopy de Flos avec abat-jour noir et socle en marbre blanc de Carrare",
    },
  ];

  for (const p of productDefs) {
    const product = await prisma.product.create({
      data: {
        slug: p.slug,
        sku: p.sku,
        name: p.name,
        description: p.description,
        price: p.price,
        stock: p.stock,
        salesCount: p.salesCount,
        featured: p.featured,
        width: p.width,
        height: p.height,
        depth: p.depth,
        weight: p.weight,
        categoryId: categories[p.category].id,
        manufacturerId: p.manufacturer ? manufacturers[p.manufacturer].id : null,
        movementId: movements[p.movement].id,
      },
    });

    await prisma.image.create({
      data: { url: p.image, alt: p.imageAlt, productId: product.id },
    });

    await Promise.all([
      ...p.designers.map((slug) =>
        prisma.productDesigner.create({
          data: { productId: product.id, designerId: designers[slug].id },
        }),
      ),
      ...p.materials.map((slug) =>
        prisma.productMaterial.create({
          data: { productId: product.id, materialId: materials[slug].id },
        }),
      ),
      ...p.tags.map((name) =>
        prisma.productTag.create({ data: { productId: product.id, tagId: tags[name].id } }),
      ),
    ]);
  }

  // ---------------------------------------------------------------------
  // Demo user (kept as upsert — real account, not reference data)
  // ---------------------------------------------------------------------
  await prisma.user.upsert({
    where: { email: "john@gmail.com" },
    update: { firstName: "John", lastName: "Doe" },
    create: { name: "John Doe", firstName: "John", lastName: "Doe", email: "john@gmail.com" },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
