import { NextResponse } from "next/server";

import { medusa } from "@/lib/medusa";

export async function GET() {
  try {
    const { product_categories, count } = await medusa.store.category.list({ limit: 1 });

    return NextResponse.json({
      ok: true,
      backendUrl: process.env.MEDUSA_BACKEND_URL,
      productCategoryCount: count,
      sampleCategory: product_categories[0]?.name ?? null,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        backendUrl: process.env.MEDUSA_BACKEND_URL,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 502 },
    );
  }
}
