import { ProductWhereInput } from "@/generated/prisma/models";
import { ProductFilters } from "../types";

export function buildProductWhere(filters: ProductFilters): ProductWhereInput {
  const where: ProductWhereInput = {};

  if (filters.categories.length > 0) {
    where.category = {
      slug: {
        in: filters.categories,
      },
    };
  }

  if (filters.designers.length > 0) {
    where.designers = {
      some: {
        designer: {
          slug: {
            in: filters.designers,
          },
        },
      },
    };
  }

  if (filters.minPrice !== null || filters.maxPrice !== null) {
    where.price = {
      ...(filters.minPrice !== null ? { gte: filters.minPrice } : {}),
      ...(filters.maxPrice !== null ? { lte: filters.maxPrice } : {}),
    };
  }

  return where;
}
