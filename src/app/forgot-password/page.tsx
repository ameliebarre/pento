import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-full items-center justify-center">
      <Card className="w-full max-w-sm ring-0">
        <CardHeader>
          <CardTitle className="pb-4 text-center text-4xl">Mot de passe oublié</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-muted-foreground text-center text-sm">
            Cette fonctionnalité arrive bientôt. En attendant, contactez-nous si vous avez besoin
            d&apos;aide pour accéder à votre compte.
          </p>
          <p className="text-center text-sm">
            <Link href="/login" className="underline">
              Retour à la connexion
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
