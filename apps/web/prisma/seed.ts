import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// The product catalog used to be seeded here too — it now lives entirely in
// Medusa (apps/medusa/src/migration-scripts/initial-data-seed.ts).
async function main() {
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
