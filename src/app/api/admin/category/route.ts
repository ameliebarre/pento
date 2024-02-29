import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Category from "@/models/Category";
import slugify from "slugify";

export async function POST(req: Request) {
  await dbConnect();

  const body = await req.json();

  try {
    const category = await Category.create({
      ...body,
      slug: slugify(body.name),
    });

    console.log("CATEGORY RESPONSE : ", category);

    return NextResponse.json(category, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

export async function GET() {
  await dbConnect();

  try {
    const categories = await Category.find({}).sort({ createdAt: -1 });

    return NextResponse.json(categories);
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
