'use server';
import { prisma } from '@/db/prisma';
import { convertToPlainObject } from '../utils';

export async function getAllCategories() {
  const data = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });

  return convertToPlainObject(data);
}
