import { prisma } from "@/lib/prisma";

import { ProductFilters } from "../types";
import { buildProductWhere } from "./build-product-filters";

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
      orderBy: {
        createdAt: "desc",
      },
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
  ]);
}
