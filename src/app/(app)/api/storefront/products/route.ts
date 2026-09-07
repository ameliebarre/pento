import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const categorySlug = request.nextUrl.searchParams.get("category") ?? undefined;

  const products = await prisma.product.findMany({
    where: categorySlug ? { category: { slug: categorySlug } } : undefined,
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });

  return NextResponse.json({ products });
}
