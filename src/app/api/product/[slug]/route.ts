import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/Product";
import queryString from "query-string";

interface RequestContext {
  params: {
    slug: string;
  };
}

export async function GET(req: Request, context: RequestContext) {
  await dbConnect();

  try {
    const product = await Product.findOne({ slug: context.params.slug });

    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
