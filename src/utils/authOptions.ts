import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import bcrypt from "bcrypt";
import dbConnect from "@/utils/dbConnect";

interface Credentials {
  email: string;
  password: string;
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET!,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await dbConnect();
        const { email, password } = credentials as Credentials;
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("User not found");
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
          throw new Error("Invalid user or password");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/account/login",
  },
};
