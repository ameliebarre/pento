import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import { NextAuthProvider } from "@/providers/NextAuthProvider";
import { CategoryProvider } from "@/context/category";

import "./globals.css";

const hk_grotesk = Hanken_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pento",
  description: "Pento | Meet the most famous design of the world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <CategoryProvider>
          <body className={hk_grotesk.className}>
            <Navbar />
            <Toaster />
            {children}
          </body>
        </CategoryProvider>
      </NextAuthProvider>
    </html>
  );
}
