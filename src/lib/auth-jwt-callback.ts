import type { User } from "next-auth";
import type { JWT } from "next-auth/jwt";

import { prisma } from "@/lib/prisma";

// Extracted from src/auth.ts so it can be unit-tested without going through
// the full NextAuth request cycle (importing next-auth's NextAuth(...) call
// pulls in next/server, which isn't available under the Vitest node environment).
export async function jwtCallback(token: JWT, user?: User): Promise<JWT | null> {
  if (user) {
    token.id = user.id;
    token.firstName = user.firstName;
    token.lastName = user.lastName;
    token.passwordChangedAt = user.passwordChangedAt?.toISOString() ?? null;
    return token;
  }

  if (!token.id) return token;

  const current = await prisma.user.findUnique({
    where: { id: token.id },
    select: { passwordChangedAt: true },
  });

  if (
    current?.passwordChangedAt &&
    (!token.passwordChangedAt || new Date(token.passwordChangedAt) < current.passwordChangedAt)
  ) {
    // Password changed (e.g. via reset) after this token was issued: force sign-out.
    return null;
  }

  return token;
}
