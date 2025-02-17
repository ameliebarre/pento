'use server';
import { prisma } from '@/db/prisma';
import { Product } from '@/types';
import { convertToPlainObject } from '../utils';
import { LATEST_PRODUCTS_LIMIT } from '../constants';

export async function getLatestProducts(): Promise<Product[]> {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: 'desc' },
  });

  return convertToPlainObject(data);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return await prisma.product.findFirst({
    where: { slug },
  });
}
