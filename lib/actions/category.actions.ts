'use server';
import { prisma } from '@/db/prisma';
import { Category } from '@/types';
import { convertToPlainObject } from '../utils';

export async function getAllCategories(): Promise<Category[]> {
  const data = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });

  return convertToPlainObject(data);
}
