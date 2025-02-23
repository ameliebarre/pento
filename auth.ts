export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import NextAuth, { type NextAuthConfig, User, Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compareSync } from 'bcrypt-ts-edge';

interface ExtendedUser extends User {
  id: string;
  role: string;
}

interface ExtendedJWT extends JWT {
  id?: string;
  role?: string;
}

interface ExtendedSession extends Session {
  user: ExtendedUser;
}

interface AuthResponse {
  success: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
    password?: string;
  };
}

export const config = {
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials): Promise<ExtendedUser | null> {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          // Fetch user from API
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/get-user`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: credentials.email }),
            }
          );

          if (!res.ok) {
            console.error('Failed to fetch user:', res.statusText);
            return null;
          }

          const data: AuthResponse = await res.json();
          if (!data.success || !data.user) return null;

          const { id, name, email, role, password } = data.user;

          // Verify password
          if (
            password &&
            compareSync(credentials.password as string, password)
          ) {
            return { id, name, email, role };
          }
        } catch (error) {
          console.error('Error in authorize:', error);
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub ?? '',
          role: (token as ExtendedJWT).role ?? 'user',
          name: (token.name as string) ?? '',
        },
      } as ExtendedSession;
    },
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        const extendedUser = user as ExtendedUser;
        token.id = extendedUser.id;
        token.name = extendedUser.name;
        token.email = extendedUser.email;
        token.role = extendedUser.role;

        if (extendedUser.name === 'NO_NAME' && extendedUser.email) {
          token.name = extendedUser.email.split('@')[0];

          await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/update-user`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id: extendedUser.id, name: token.name }),
            }
          ).catch((error) => console.error('Error updating user:', error));
        }
      }
      return token as ExtendedJWT;
    },
    async authorized({ request }: { request: Request }) {
      const cookies = request.headers.get('cookie') || '';
      const sessionCartId = cookies.includes('sessionCartId');

      if (!sessionCartId) {
        const newCartId = crypto.randomUUID();
        const response = NextResponse.next();
        response.cookies.set('sessionCartId', newCartId);
        return response;
      }

      return true;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
