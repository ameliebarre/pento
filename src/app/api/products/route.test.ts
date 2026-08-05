import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";

import { GET } from "@/app/api/products/route";
import { prisma } from "@/lib/prisma";

describe("GET /api/products", () => {
  it("returns every product when no category filter is given", async () => {
    await prisma.product.create({
      data: { name: "Chaise", slug: "api-chaise", description: "desc", price: 100 },
    });
    await prisma.product.create({
      data: { name: "Table", slug: "api-table", description: "desc", price: 200 },
    });

    const response = await GET(new NextRequest("http://localhost/api/products"));
    const body = await response.json();

    expect(body.products).toHaveLength(2);
  });

  it("filters products by the category query param", async () => {
    const category = await prisma.category.create({ data: { name: "Chairs", slug: "api-chairs" } });
    await prisma.product.create({
      data: {
        name: "Chaise filtrée",
        slug: "api-filtered-chair",
        description: "desc",
        price: 100,
        categoryId: category.id,
      },
    });
    await prisma.product.create({
      data: { name: "Table non filtrée", slug: "api-unfiltered-table", description: "desc", price: 200 },
    });

    const response = await GET(
      new NextRequest("http://localhost/api/products?category=api-chairs"),
    );
    const body = await response.json();

    expect(body.products).toHaveLength(1);
    expect(body.products[0].slug).toBe("api-filtered-chair");
    expect(body.products[0].category.slug).toBe("api-chairs");
  });

  it("returns an empty list for a category with no products", async () => {
    await prisma.category.create({ data: { name: "Empty", slug: "api-empty-category" } });

    const response = await GET(
      new NextRequest("http://localhost/api/products?category=api-empty-category"),
    );
    const body = await response.json();

    expect(body.products).toEqual([]);
  });
});
