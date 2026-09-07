import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, User } from "lucide-react";

import { getSession } from "@/lib/get-session";
import { Button } from "@/components/ui/button";
import { ProductsNav } from "@/components/products-nav";
import { MobileNav } from "@/components/mobile-nav";

type SiteHeaderProps = {
  theme?: "light" | "dark";
};

export async function SiteHeader({ theme = "light" }: SiteHeaderProps = {}) {
  const session = await getSession();
  const initial = session?.user
    ? (session.user.firstName?.trim()?.[0] ?? session.user.email?.[0] ?? "?").toUpperCase()
    : null;
  const isDark = theme === "dark";

  return (
    <header className="absolute top-0 right-0 left-0 z-10">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow"
      >
        Aller au contenu principal
      </a>
      <div className="mx-auto flex items-center justify-between px-4 py-4 sm:px-8 md:px-6">
        <div className="flex items-center gap-4">
          <MobileNav theme={theme} />
          <div className="flex items-center gap-8">
            <Link href="/">
              <Image
                src={isDark ? "/logo-pento-white.svg" : "/logo-pento.svg"}
                alt="Pento"
                className="max-w-64"
                width={150}
                height={40}
              />
            </Link>
            <ProductsNav theme={theme} />
          </div>
        </div>
        <nav aria-label="Compte et panier" className="flex items-center gap-2">
          {session?.user ? (
            <Link
              href="/profile"
              aria-label="Mon profil"
              className="flex items-center gap-2 transition-opacity hover:opacity-80"
            >
              <span className="bg-primary text-primary-foreground flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-medium">
                {initial}
              </span>
            </Link>
          ) : (
            <Button
              variant="ghost"
              size="icon-lg"
              render={<Link href="/login" />}
              nativeButton={false}
              aria-label="Se connecter"
              className={isDark ? "text-white hover:bg-white/10 hover:text-white" : undefined}
            >
              <User aria-hidden="true" className="size-5" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon-lg"
            render={<Link href="/cart" />}
            nativeButton={false}
            aria-label="Panier"
            className={isDark ? "text-white hover:bg-white/10 hover:text-white" : undefined}
          >
            <ShoppingCart aria-hidden="true" className="size-5" />
          </Button>
        </nav>
      </div>
    </header>
  );
}
