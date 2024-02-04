import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
export const config = {
  matcher: ["/", "/account/profile", "/api/admin/:path*"],
};

export default withAuth(
  async function middleware(req) {
    const url = req.nextUrl.pathname;
    const userRole = req?.nextauth?.token?.role;

    // if (url?.includes("/admin") && userRole !== "admin") {
    //   return NextResponse.redirect(new URL("/", req.url));
    // }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);
