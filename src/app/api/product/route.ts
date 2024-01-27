import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/Product";
import queryString from "query-string";

export async function GET(req: Request) {
  await dbConnect();

  const searchParams = queryString.parseUrl(req.url).query;

  const { page } = searchParams || {};
  const pageSize = 6;

  try {
    const currentPage = Number(page);

    const skip = (currentPage - 1) * pageSize;
    const totalProducts = await Product.countDocuments({});
    const products = await Product.find({})
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    return NextResponse.json({
      products,
      currentPage,
      totalProducts: Math.ceil(totalProducts / pageSize),
    });
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
