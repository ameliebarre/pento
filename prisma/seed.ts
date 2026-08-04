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
  await prisma.style.deleteMany();
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
    { name: "Chairs", slug: "chairs" },
    { name: "Armchairs", slug: "armchairs" },
    { name: "Sofas", slug: "sofas" },
    { name: "Tables", slug: "tables" },
    { name: "Lighting", slug: "lighting" },
  ];
  const categories = Object.fromEntries(
    await Promise.all(
      categoryDefs.map(async (c) => [c.slug, await prisma.category.create({ data: c })] as const),
    ),
  );

  // ---------------------------------------------------------------------
  // Countries
  // ---------------------------------------------------------------------
  const countryNames = ["France", "Italie", "Allemagne", "Danemark", "États-Unis", "Suisse", "Pays-Bas"];
  const countries = Object.fromEntries(
    await Promise.all(
      countryNames.map(async (name) => [name, await prisma.country.create({ data: { name } })] as const),
    ),
  );

  // ---------------------------------------------------------------------
  // Tags (used by search/filtering)
  // ---------------------------------------------------------------------
  const tagNames = [
    "Bestseller",
    "Édition limitée",
    "Nouveauté",
    "Iconique",
    "Fait main",
    "Extérieur",
    "Durable",
  ];
  const tags = Object.fromEntries(
    await Promise.all(tagNames.map(async (name) => [name, await prisma.tag.create({ data: { name } })] as const)),
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
      quote: "Regardez les choses avec les yeux d'un enfant qui ne sait pas encore qu'elles sont impossibles.",
      image: "/images/achille-castiglioni.jpg",
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
        const portrait = d.image ? await image(d.image, `Portrait de ${d.firstName} ${d.lastName}`) : null;
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
  // Styles (aka "movements" in the homepage UI)
  // ---------------------------------------------------------------------
  const styleDefs = [
    {
      slug: "bauhaus",
      name: "Bauhaus",
      description: "Fusion de l'art, de l'artisanat et de la fonction, sans ornement superflu.",
      image: "/images/styles/bauhaus.webp",
    },
    {
      slug: "mid-century",
      name: "Mid-Century",
      description: "Lignes organiques et fonctionnalité optimiste de l'après-guerre.",
      image: "/images/styles/mid-century.jpg",
    },
    {
      slug: "scandinave",
      name: "Scandinave",
      description: "Bois clair, fonctionnalité et douceur minimaliste.",
      image: "/images/styles/scandinavian.jpeg",
    },
    {
      slug: "memphis-milano",
      name: "Memphis Milano",
      description: "Couleurs vives, motifs audacieux et formes ludiques.",
      image: "/images/styles/memphis-milano.jpg",
    },
    {
      slug: "art-deco",
      name: "Art Déco",
      description: "Lignes géométriques, matériaux luxueux et symétrie affirmée.",
      image: "/images/styles/art-deco.jpg",
    },
    {
      slug: "minimalisme-japonais",
      name: "Minimalisme japonais",
      description: "Simplicité, matières naturelles et sens du vide.",
      image: "/images/styles/minimalisme-japonais.jpg",
    },
  ];

  const styles = Object.fromEntries(
    await Promise.all(
      styleDefs.map(async (s) => {
        const cover = await image(s.image, s.name);
        const style = await prisma.style.create({
          data: { slug: s.slug, name: s.name, description: s.description, coverImageId: cover.id },
        });
        return [s.slug, style] as const;
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
      description: "Bois noble et durable, prisé pour sa résistance et le veinage chaleureux qu'il révèle avec le temps.",
    },
    {
      slug: "acier-inoxydable-poli",
      name: "Acier inoxydable poli",
      description: "Structure fine et résistante à la corrosion, pour un fini miroir d'une grande précision.",
    },
    {
      slug: "cuir-pleine-fleur",
      name: "Cuir pleine fleur",
      description: "Cuir de la plus haute qualité, qui se patine et se bonifie avec les années.",
    },
    {
      slug: "velours",
      name: "Velours",
      description: "Tissu au toucher soyeux et à la teinte profonde, pour une assise à la fois cosy et élégante.",
    },
    {
      slug: "marbre-de-carrare",
      name: "Marbre de Carrare",
      description: "Pierre italienne d'exception aux veinures uniques, symbole intemporel de raffinement.",
    },
    {
      slug: "rotin-naturel",
      name: "Rotin naturel",
      description: "Fibre végétale tressée à la main, légère et aérienne, pour une allure naturelle et estivale.",
    },
    {
      slug: "laiton-brosse",
      name: "Laiton brossé",
      description: "Alliage chaleureux à la patine dorée mate, qui se bonifie avec l'usage.",
    },
    {
      slug: "laine-bouclee",
      name: "Laine bouclée",
      description: "Fibre naturelle isolante et texturée, pour un confort enveloppant toute l'année.",
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
      style: "bauhaus",
      designers: ["ludwig-mies-van-der-rohe"],
      materials: ["cuir-pleine-fleur", "acier-inoxydable-poli"],
      tags: ["Iconique", "Bestseller"],
      image: "/images/armchairs.png",
      imageAlt: "Fauteuil Barcelona en cuir capitonné sur piètement en acier inoxydable",
    },
    {
      slug: "fauteuil-oeuf",
      sku: "FH-EGG-001",
      name: "Fauteuil Œuf",
      description: `Conçu en 1958 pour le hall du Royal Hotel de Copenhague, le Fauteuil Œuf enveloppe son occupant dans une coque sculpturale moulée d'une seule pièce.
      Son piètement pivotant en aluminium et son assise généreusement rembourrée en font un cocon d'intimité au cœur même des espaces ouverts.
      Pièce maîtresse du design scandinave, elle continue d'incarner l'équilibre parfait entre audace formelle et confort absolu.`,
      price: 6900,
      stock: 2,
      salesCount: 41,
      featured: true,
      width: 86,
      height: 107,
      depth: 86,
      weight: 28,
      category: "armchairs",
      manufacturer: "fritz-hansen",
      style: "scandinave",
      designers: ["arne-jacobsen"],
      materials: ["laine-bouclee"],
      tags: ["Iconique", "Bestseller"],
      image: "/images/egg-chair.jpg",
      imageAlt: "Fauteuil Œuf tapissé de laine bouclée sur piètement pivotant en aluminium",
    },
    {
      slug: "fauteuil-groovy",
      sku: "ART-GRV-001",
      name: "Fauteuil Groovy",
      description: `Imaginé par Pierre Paulin pour Artifort au début des années 1970, le Groovy tend un jersey de velours sur une coque de mousse aux courbes fluides.
      Sa silhouette basse et enveloppante invite à s'y lover plutôt qu'à s'y asseoir, dans le plus pur esprit du design organique de l'époque.
      Disponible dans une palette de coloris affirmés, il apporte une touche résolument pop à tout intérieur.`,
      price: 2100,
      stock: 6,
      salesCount: 22,
      featured: false,
      width: 75,
      height: 70,
      depth: 80,
      weight: 18,
      category: "armchairs",
      manufacturer: "artifort",
      style: "mid-century",
      designers: ["pierre-paulin"],
      materials: ["velours"],
      tags: ["Iconique"],
      image: "/images/armchairs.png",
      imageAlt: "Fauteuil Groovy à coque tendue de velours et structure tubulaire",
    },
    {
      slug: "canape-panton",
      sku: "VTR-PAN-001",
      name: "Canapé Panton",
      description: `Ce canapé associe une assise profonde et un dossier généreusement galbé pour un confort enveloppant au quotidien.
      Sa structure en bois massif et son piètement fuselé rappellent les lignes optimistes du mobilier des années 1950.
      Habillé de velours, il s'impose comme la pièce centrale d'un salon contemporain sans jamais sacrifier la chaleur d'un intérieur habité.`,
      price: 3200,
      stock: 3,
      salesCount: 35,
      featured: true,
      width: 210,
      height: 78,
      depth: 95,
      weight: 65,
      category: "sofas",
      manufacturer: "vitra",
      style: "mid-century",
      designers: [],
      materials: ["velours"],
      tags: ["Bestseller"],
      image: "/images/sofa.png",
      imageAlt: "Canapé trois places tapissé de velours sur piètement en bois",
    },
    {
      slug: "table-bauhaus",
      sku: "KNL-TBL-001",
      name: "Table Bauhaus",
      description: `Un plateau de marbre de Carrare posé sur un piètement croisé en acier chromé : la table Bauhaus incarne à elle seule la rencontre entre matière brute et rigueur géométrique.
      Héritière directe des principes fonctionnalistes de l'école allemande, elle refuse tout artifice pour ne garder que l'essentiel.
      Une pièce de caractère, pensée pour traverser les décennies sans prendre une ride.`,
      price: 1890,
      stock: 5,
      salesCount: 14,
      featured: false,
      width: 120,
      height: 40,
      depth: 120,
      weight: 55,
      category: "tables",
      manufacturer: "knoll",
      style: "bauhaus",
      designers: ["ludwig-mies-van-der-rohe"],
      materials: ["marbre-de-carrare", "acier-inoxydable-poli"],
      tags: ["Iconique"],
      image: "/images/tables.png",
      imageAlt: "Table basse carrée en marbre de Carrare sur piètement croisé en acier",
    },
    {
      slug: "chaise-castiglioni",
      sku: "CAS-CHR-001",
      name: "Chaise Castiglioni",
      description: `Fidèle à la démarche d'Achille Castiglioni, cette chaise en chêne massif réduit la forme à sa plus stricte fonction sans jamais sacrifier l'élégance.
      Son assise légèrement galbée et ses pieds fuselés témoignent d'un souci du détail hérité de décennies d'observation des usages.
      Fabriquée à la main en Italie, elle incarne un design intemporel pensé pour durer.`,
      price: 640,
      stock: 12,
      salesCount: 19,
      featured: false,
      width: 48,
      height: 82,
      depth: 52,
      weight: 6,
      category: "chairs",
      manufacturer: "cassina",
      style: "mid-century",
      designers: ["achille-castiglioni"],
      materials: ["chene-massif"],
      tags: ["Fait main"],
      image: "/images/chairs.png",
      imageAlt: "Chaise en chêne massif à l'assise galbée et aux pieds fuselés",
    },
    {
      slug: "lampe-sottsass",
      sku: "MMP-LMP-001",
      name: "Lampe Sottsass",
      description: `Manifeste du mouvement Memphis, cette lampe assemble volumes géométriques et couleurs franches dans une composition résolument ludique.
      Signée Ettore Sottsass, elle rejette les codes du design fonctionnaliste pour affirmer une esthétique libre et joyeuse.
      Éditée en série limitée, elle transforme chaque intérieur en terrain d'expression artistique.`,
      price: 980,
      stock: 7,
      salesCount: 9,
      featured: false,
      width: 30,
      height: 55,
      depth: 30,
      weight: 4,
      category: "lighting",
      manufacturer: "memphis-milano",
      style: "memphis-milano",
      designers: ["ettore-sottsass"],
      materials: ["laiton-brosse"],
      tags: ["Édition limitée", "Iconique"],
      image: "/images/lighting.png",
      imageAlt: "Lampe sculpturale en laiton brossé aux formes géométriques colorées",
    },
    {
      slug: "console-putman",
      sku: "PUT-CNS-001",
      name: "Console Putman",
      description: `Andrée Putman revisite ici les codes de l'Art déco avec une console aux lignes strictes, rehaussée de fins liserés de laiton.
      Le chêne massif, sobre et chaleureux, contraste avec la précision géométrique du dessin pour un résultat résolument parisien.
      Une pièce d'entrée ou de salon qui conjugue élégance graphique et savoir-faire artisanal.`,
      price: 1560,
      stock: 4,
      salesCount: 3,
      featured: false,
      width: 140,
      height: 78,
      depth: 40,
      weight: 38,
      category: "tables",
      manufacturer: null,
      style: "art-deco",
      designers: ["andree-putman"],
      materials: ["chene-massif", "laiton-brosse"],
      tags: ["Nouveauté"],
      image: "/images/tables.png",
      imageAlt: "Console en chêne massif rehaussée de laiton, aux lignes géométriques Art déco",
    },
    {
      slug: "chauffeuse-aisslinger",
      sku: "VTR-CHF-001",
      name: "Chauffeuse Aisslinger",
      description: `Werner Aisslinger explore ici les vertus du rotin naturel, matière vivante et durable, tressée à la main sur une structure légère.
      Ses lignes épurées et son assise aérienne invitent à repenser le confort loin du superflu, dans un dialogue permanent avec la matière brute.
      Une pièce pensée pour vieillir avec grâce, aussi à l'aise en intérieur que sur une terrasse abritée.`,
      price: 890,
      stock: 8,
      salesCount: 6,
      featured: false,
      width: 68,
      height: 75,
      depth: 70,
      weight: 9,
      category: "armchairs",
      manufacturer: "vitra",
      style: "minimalisme-japonais",
      designers: ["werner-aisslinger"],
      materials: ["rotin-naturel"],
      tags: ["Durable", "Nouveauté"],
      image: "/images/armchairs.png",
      imageAlt: "Chauffeuse en rotin tressé à la structure légère et épurée",
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
        styleId: styles[p.style].id,
      },
    });

    await prisma.image.create({
      data: { url: p.image, alt: p.imageAlt, productId: product.id, position: 0 },
    });

    await Promise.all([
      ...p.designers.map((slug) =>
        prisma.productDesigner.create({ data: { productId: product.id, designerId: designers[slug].id } }),
      ),
      ...p.materials.map((slug) =>
        prisma.productMaterial.create({ data: { productId: product.id, materialId: materials[slug].id } }),
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
