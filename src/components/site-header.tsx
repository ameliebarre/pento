import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, User } from "lucide-react";

import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { ProductsNav } from "@/components/products-nav";

export async function SiteHeader() {
  const session = await auth();

  return (
    <header className="border-b">
      <div className="mx-auto flex items-center justify-between px-24 py-6">
        <Link href="/">
          <Image src="/logo.svg" alt="Pento" className="max-w-24" width={124} height={30} />
        </Link>
        <ProductsNav />
        <nav className="flex items-center gap-2">
          {session?.user ? (
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <Button variant="ghost" size="icon-lg" type="submit" aria-label="Se déconnecter">
                <User className="size-5" />
              </Button>
            </form>
          ) : (
            <Button
              variant="ghost"
              size="icon-lg"
              render={<Link href="/login" />}
              nativeButton={false}
              aria-label="Se connecter"
            >
              <User className="size-5" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon-lg"
            render={<Link href="/cart" />}
            nativeButton={false}
            aria-label="Panier"
          >
            <ShoppingCart className="size-5" />
          </Button>
        </nav>
      </div>
    </header>
  );
}
