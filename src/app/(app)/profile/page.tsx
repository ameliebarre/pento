import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { auth } from "@/auth";
import { getSession } from "@/lib/get-session";
import { SiteHeader } from "@/components/site-header";
import { AuthCard } from "@/components/auth-card";
import { SubmitButton } from "@/app/(app)/profile/submit-button";

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ revoked?: string }>;
}) {
  const session = await getSession();
  if (!session?.user) {
    redirect("/login");
  }

  const { revoked } = await searchParams;
  const { firstName, lastName, email } = session.user;

  return (
    <>
      {await SiteHeader()}
      <AuthCard title="Mon profil">
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
        {revoked && (
          <p role="status" className="text-muted-foreground text-center text-sm">
            Les autres appareils ont été déconnectés.
          </p>
        )}
        <form
          action={async () => {
            "use server";
            await auth.api.revokeOtherSessions({ headers: await headers() });
            redirect("/profile?revoked=1");
          }}
        >
          <SubmitButton
            pendingLabel="Déconnexion…"
            confirmMessage="Déconnecter tous les autres appareils ?"
          >
            Déconnecter les autres appareils
          </SubmitButton>
        </form>
        <form
          action={async () => {
            "use server";
            await auth.api.signOut({ headers: await headers() });
            redirect("/");
          }}
        >
          <SubmitButton pendingLabel="Déconnexion…">Se déconnecter</SubmitButton>
        </form>
      </AuthCard>
    </>
  );
}
