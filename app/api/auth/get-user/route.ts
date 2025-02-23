import { NextResponse } from 'next/server';
import { prisma } from '@/db/prisma';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' });
    }

    return NextResponse.json({ success: true, user });
  } catch {
    return NextResponse.json({
      success: false,
      message: 'Error fetching user',
    });
  }
}
