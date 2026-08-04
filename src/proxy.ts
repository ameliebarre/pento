import { NextResponse, type NextRequest } from "next/server";

import { getSession } from "@/lib/get-session";

export async function proxy(request: NextRequest) {
  const session = await getSession();

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Add new protected route prefixes here (e.g. "/checkout/:path*") as they're built.
export const config = {
  matcher: ["/profile/:path*"],
};
