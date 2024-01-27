import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/Product";
import slugify from "slugify";

export async function POST(req: Request) {
  await dbConnect();

  const body = await req.json();

  try {
    const product = await Product.create({
      ...body,
      slug: slugify(body.title),
    });

    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
