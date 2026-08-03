import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.category.upsert({
    where: { slug: "chairs" },
    update: {},
    create: { name: "Chairs", slug: "chairs" },
  });

  const armchairs = await prisma.category.upsert({
    where: { slug: "armchairs" },
    update: {},
    create: { name: "Armchairs", slug: "armchairs" },
  });

  await prisma.category.upsert({
    where: { slug: "sofas" },
    update: {},
    create: { name: "Sofas", slug: "sofas" },
  });

  await prisma.category.upsert({
    where: { slug: "lighting" },
    update: {},
    create: { name: "Lighting", slug: "lighting" },
  });

  const products = [
    {
      name: "Barcelona Chair",
      slug: "barcelona-chair",
      description: `Véritable icône du design du XXᵉ siècle, la Barcelona Chair incarne l'élégance intemporelle et le minimalisme sophistiqué imaginés par Ludwig Mies van der Rohe.
      Avec ses lignes épurées, sa silhouette aérienne et son confort remarquable, elle traverse les décennies sans jamais perdre de sa modernité.
      Conçue pour apporter une touche de prestige à un salon, un bureau ou un espace d'accueil, cette chaise design associe un piètement en acier inoxydable poli à une assise généreusement capitonnée.
      Son esthétique équilibrée s'intègre aussi bien dans les intérieurs contemporains que dans les ambiances plus classiques. Pensée pour durer, elle séduit autant par la qualité de ses matériaux que par la précision de ses finitions.
      Son assise ergonomique offre un excellent confort tout en faisant de cette pièce un véritable objet de décoration.`,
      priceCents: 1445,
      stock: 4,
      categoryId: armchairs.id,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
  }

  await prisma.user.upsert({
    where: { email: "john@gmail.com" },
    update: { firstName: "John", lastName: "Doe" },
    create: { firstName: "John", lastName: "Doe", email: "john@gmail.com" },
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
