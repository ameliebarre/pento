import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
  uploadPreset: "pento",
});

export async function POST(req: Request) {
  const { image, folder } = await req.json();

  try {
    const result = await cloudinary.uploader.upload(image, {
      folder,
      resource_type: "image",
    });

    return NextResponse.json(
      {
        public_id: result.public_id,
        secure_url: result.secure_url,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const { public_id } = await req.json();

  try {
    const result = await cloudinary.uploader.destroy(public_id);

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
