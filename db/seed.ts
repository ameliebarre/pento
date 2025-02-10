import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import sampleData from './sample-data';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();

  // Insert categories first
  await prisma.category.createMany({
    data: sampleData.categories,
  });

  // Retrieve the actual category IDs from the database
  const categories = await prisma.category.findMany();

  if (categories.length === 0) {
    throw new Error(
      'No categories found after seeding! Cannot assign categoryId to products.'
    );
  }

  // Assign valid category IDs to products
  const productsWithValidCategories = sampleData.products.map((product) => ({
    id: randomUUID(),
    categoryId: categories[Math.floor(Math.random() * categories.length)].id,
    ...product,
  }));

  // Insert products
  await prisma.product.createMany({
    data: productsWithValidCategories,
  });

  // Insert users
  await prisma.user.createMany({
    data: sampleData.users,
  });

  console.log('Database seeded successfully !');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
