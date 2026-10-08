import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";

import { auth } from "@/auth";
import { getSession } from "@/lib/get-session";
import { SiteHeader } from "@/components/site-header";
import { AuthCard } from "@/components/auth-card";
import { SubmitButton } from "@/app/(app)/profile/submit-button";
import { getMyOrders } from "@/features/account/server/get-my-orders";
import { formatPrice } from "@/lib/utils";

const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: "En attente",
  completed: "Terminée",
  canceled: "Annulée",
  archived: "Archivée",
  requires_action: "Action requise",
};

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
  const orders = await getMyOrders(email);

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

      <div className="mx-auto flex w-full max-w-sm flex-col gap-4 pb-16">
        <h2 className="font-heading text-lg uppercase">Mes commandes</h2>
        {orders.length === 0 ? (
          <p className="text-muted-foreground text-sm">Vous n&apos;avez pas encore de commande.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {orders.map((order) => (
              <li key={order.id}>
                <Link
                  href={`/checkout/confirmation/${order.id}`}
                  className="hover:bg-muted flex items-center justify-between gap-4 rounded-[6px] border px-4 py-3 text-sm transition-colors"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">Commande n°{order.display_id}</span>
                    <span className="text-muted-foreground text-xs">
                      {new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium" }).format(
                        new Date(order.created_at),
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="font-medium">
                      {formatPrice(order.total, order.currency_code.toUpperCase())}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {ORDER_STATUS_LABELS[order.status] ?? order.status}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
