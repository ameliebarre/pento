import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

import { prisma } from "@/lib/prisma";
import { sendPasswordResetEmail, sendVerificationEmail } from "@/lib/email";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  secret: process.env.AUTH_SECRET,
  baseURL: process.env.AUTH_URL,
  user: {
    additionalFields: {
      firstName: { type: "string", required: false },
      lastName: { type: "string", required: false },
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url }) => {
      await sendPasswordResetEmail(user.email, url);
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendVerificationEmail(user.email, url);
    },
    sendOnSignUp: true,
    // Resend a fresh link automatically if someone tries to log in before verifying,
    // instead of needing a separate "resend" button/page.
    sendOnSignIn: true,
    autoSignInAfterVerification: true,
  },
  // We keep our own Postgres-backed limiter (src/lib/rate-limit.ts) so email-scoped
  // limiting (not just IP+path) applies to login and forgot-password.
  rateLimit: {
    enabled: false,
  },
  plugins: [nextCookies()],
});
