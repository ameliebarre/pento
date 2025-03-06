import NextAuth from 'next-auth';
import { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compareSync } from 'bcrypt-ts-edge';
import { NextResponse } from 'next/server';
import Google from 'next-auth/providers/google';

const config = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

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
            throw new Error('Failed to fetch user data');
          }

          let data;
          try {
            data = await res.json();
          } catch {
            throw new Error('Invalid response from authentication server');
          }

          if (!data?.success || !data?.user) {
            throw new Error('Invalid email or password');
          }

          const { id, name, email, role, password } = data.user;

          // Verify password
          if (
            !password ||
            !compareSync(credentials.password as string, password)
          ) {
            throw new Error('Invalid email or password');
          }

          return { id, name, email, role };
        } catch {
          throw new Error('Authentication failed');
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      console.log('token', token);
      console.log('session', session);
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
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
