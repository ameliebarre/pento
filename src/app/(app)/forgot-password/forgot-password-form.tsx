"use client";

import { useActionState } from "react";
import Link from "next/link";

import { requestPasswordResetAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState(requestPasswordResetAction, undefined);

  return (
    <div className="flex min-h-full items-center justify-center">
      <Card className="w-full max-w-sm ring-0">
        <CardHeader>
          <CardTitle as="h1" className="pb-4 text-center text-4xl">
            Mot de passe oublié
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {state?.success ? (
            <p role="status" className="text-muted-foreground text-center text-sm">
              Si un compte existe pour cet email, un lien de réinitialisation vient de lui être
              envoyé.
            </p>
          ) : (
            <form action={formAction} className="flex flex-col gap-4">
              <p className="text-muted-foreground text-center text-sm">
                Indiquez votre email, nous vous enverrons un lien pour réinitialiser votre mot de
                passe.
              </p>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="h-10 rounded-[6px]"
                />
              </div>
              {state?.error && (
                <p role="alert" className="text-destructive text-sm">
                  {state.error}
                </p>
              )}
              <Button type="submit" disabled={pending} className="h-10 rounded-[6px]">
                {pending ? "Envoi..." : "Envoyer le lien"}
              </Button>
            </form>
          )}
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
