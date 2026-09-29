import type { Metadata } from "next";
import { DM_Sans, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

import { SmoothScroll } from "@/components/smooth-scroll";
import { Footer } from "@/components/footer";
import { QueryProvider } from "@/components/query-provider";
import { CartDrawerProvider } from "@/features/cart/components/cart-drawer-provider";
import { CartDrawer } from "@/features/cart/components/cart-drawer";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pento",
  description: "Boutique en ligne construite avec Next.js, Prisma et Tailwind.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${dmSans.variable} ${geistMono.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="flex h-full flex-col overflow-x-hidden">
        <QueryProvider>
          <CartDrawerProvider>
            <SmoothScroll />
            <main id="main-content" className="mx-auto w-full flex-1 px-24">
              {children}
            </main>
            <Footer />
            <CartDrawer />
          </CartDrawerProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
