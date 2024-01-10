import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Category from "@/models/Category";
import slugify from "slugify";

interface RequestContext {
  params: {
    id: string;
  };
}

export async function PUT(req: Request, context: RequestContext) {
  await dbConnect();

  const body = await req.json();
  const { name } = body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      context.params.id,
      { ...body, slug: slugify(name) },
      { new: true },
    );

    return NextResponse.json(updatedCategory);
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
export async function DELETE(req: Request, context: RequestContext) {
  await dbConnect();

  try {
    const deletedCategory = await Category.findByIdAndDelete(context.params.id);

    return NextResponse.json(deletedCategory);
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
