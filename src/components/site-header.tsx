import Link from "next/link";

import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export async function SiteHeader() {
  const session = await auth();

  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold">
          Pento
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/cart">Panier</Link>
          {session?.user ? (
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <Button variant="ghost" type="submit">
                Se déconnecter
              </Button>
            </form>
          ) : (
            <>
              <Link href="/login">Se connecter</Link>
              <Link href="/signup">Créer un compte</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
