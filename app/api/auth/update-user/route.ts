import { NextResponse } from 'next/server';
import { prisma } from '@/db/prisma';

export async function POST(req: Request) {
  try {
    const { id, name } = await req.json();
    await prisma.user.update({
      where: { id },
      data: { name },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
}
