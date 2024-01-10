import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";

export async function POST(request: Request) {
  await dbConnect();

  const { name, email, password } = await request.json();

  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return NextResponse.json(
      {
        key: "USER_CREATED",
        message: `Welcome in Pento ${newUser.name} !`,
        status: 201,
      },
      {
        status: 201,
      },
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          key: "USER_ERROR",
          error: error.message,
          status: 500,
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        key: "USER_ERROR",
        error: "Internal Server Error",
        status: 500,
      },
      { status: 500 },
    );
  }
}
