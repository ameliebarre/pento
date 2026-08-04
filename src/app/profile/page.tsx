import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { auth } from "@/auth";
import { getSession } from "@/lib/get-session";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ProfilePage() {
  const session = await getSession();
  if (!session?.user) {
    redirect("/login");
  }

  const { firstName, lastName, email } = session.user;

  return (
    <div className="flex min-h-full items-center justify-center">
      <Card className="w-full max-w-sm ring-0">
        <CardHeader>
          <CardTitle className="pb-8 text-center text-4xl">Mon profil</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground text-sm">Prénom</span>
            <span className="text-sm font-medium">{firstName || "—"}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground text-sm">Nom</span>
            <span className="text-sm font-medium">{lastName || "—"}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground text-sm">Email</span>
            <span className="text-sm font-medium">{email}</span>
          </div>
          <form
            action={async () => {
              "use server";
              await auth.api.signOut({ headers: await headers() });
              redirect("/");
            }}
          >
            <Button type="submit" variant="outline" className="h-10 w-full rounded-[6px]">
              Se déconnecter
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
