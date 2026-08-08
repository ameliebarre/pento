import { prisma } from "@/lib/prisma";

import { ProductFilters } from "../types";
import { buildProductWhere } from "./build-product-filters";

export type PriceBounds = {
  min: number;
  max: number;
};

function buildProductOrderBy(filters: ProductFilters) {
  if (filters.sort === "price-asc") return { price: "asc" as const };
  if (filters.sort === "price-desc") return { price: "desc" as const };
  return { createdAt: "desc" as const };
}

async function getPriceBounds(): Promise<PriceBounds> {
  const { _min, _max } = await prisma.product.aggregate({
    _min: { price: true },
    _max: { price: true },
  });

  return {
    min: _min.price ? Math.floor(_min.price.toNumber()) : 0,
    max: _max.price ? Math.ceil(_max.price.toNumber()) : 0,
  };
}

export async function getProductPageData(filters: ProductFilters) {
  return Promise.all([
    prisma.product.findMany({
      where: buildProductWhere(filters),
      include: {
        images: {
          take: 1,
          orderBy: {
            createdAt: "asc",
          },
        },
        designers: {
          include: {
            designer: true,
          },
        },
      },
      orderBy: buildProductOrderBy(filters),
    }),
    prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    }),
    prisma.designer.findMany({
      orderBy: {
        lastName: "asc",
      },
    }),
    prisma.material.findMany({
      orderBy: {
        name: "asc",
      },
    }),
    getPriceBounds(),
  ]);
}
