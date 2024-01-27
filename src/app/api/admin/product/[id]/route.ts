import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/Product";
import slugify from "slugify";

interface RequestContext {
  params: {
    id: string;
  };
}

export async function PUT(req: Request, context: RequestContext) {
  await dbConnect();

  const body = await req.json();

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      context.params.id,
      { ...body },
      { new: true },
    );

    return NextResponse.json(updatedProduct);
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
export async function DELETE(_: unknown, context: RequestContext) {
  await dbConnect();

  try {
    const deletedProduct = await Product.findByIdAndDelete(context.params.id);

    return NextResponse.json(deletedProduct);
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
