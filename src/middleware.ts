import { withAuth } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",
    "/account/profile",
    "/account/admin/:path*",
    "/api/admin/:path*",
  ],
};

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});
