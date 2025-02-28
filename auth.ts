export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import NextAuth, { type NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compareSync } from 'bcrypt-ts-edge';

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
      async authorize(credentials) {
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

          const data = await res.json();
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
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub ?? '',
          role: (token.role as string) ?? 'user',
          name: (token.name as string) ?? '',
        },
      };
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;

        if (user.name === 'NO_NAME' && user.email) {
          token.name = user.email.split('@')[0];

          await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/update-user`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id: user.id, name: token.name }),
            }
          ).catch((error) => console.error('Error updating user:', error));
        }
      }
      return token;
    },
    async authorized({ request }) {
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
