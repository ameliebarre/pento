"use client";

import { Suspense, useActionState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { resetPasswordAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [state, formAction, pending] = useActionState(resetPasswordAction, undefined);

  if (state?.success) {
    return (
      <>
        <p className="text-muted-foreground text-center text-sm">
          Votre mot de passe a bien été mis à jour.
        </p>
        <Link href="/login" className="text-center text-sm underline">
          Se connecter
        </Link>
      </>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="token" value={token} />
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Nouveau mot de passe</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className="h-10 rounded-[6px]"
        />
      </div>
      {!token && (
        <p className="text-destructive text-sm">Lien de réinitialisation manquant ou invalide.</p>
      )}
      {state?.error && <p className="text-destructive text-sm">{state.error}</p>}
      <Button type="submit" disabled={pending || !token} className="h-10 rounded-[6px]">
        {pending ? "Mise à jour..." : "Mettre à jour le mot de passe"}
      </Button>
      <p className="text-center text-sm">
        <Link href="/login" className="underline">
          Retour à la connexion
        </Link>
      </p>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-full items-center justify-center">
      <Card className="w-full max-w-sm ring-0">
        <CardHeader>
          <CardTitle className="pb-4 text-center text-4xl">Nouveau mot de passe</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Suspense fallback={null}>
            <ResetPasswordForm />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
