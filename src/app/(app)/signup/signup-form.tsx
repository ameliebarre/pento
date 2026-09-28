"use client";

import { useActionState } from "react";
import Link from "next/link";

import { signupAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignupForm() {
  const [state, formAction, pending] = useActionState(signupAction, undefined);

  return (
    <div className="flex min-h-full items-center justify-center">
      <Card className="w-full max-w-sm ring-0">
        <CardHeader>
          <CardTitle as="h1" className="pb-8 text-center text-4xl">
            Créer un compte
          </CardTitle>
        </CardHeader>
        <CardContent>
          {state?.success ? (
            <p role="status" className="text-muted-foreground text-center text-sm">
              Un email de confirmation vient de vous être envoyé. Cliquez sur le lien qu&apos;il
              contient pour activer votre compte.
            </p>
          ) : (
            <form action={formAction} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  className="h-10 rounded-[6px]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  className="h-10 rounded-[6px]"
                />
              </div>
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
              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Mot de passe</Label>
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
              {state?.error && (
                <p role="alert" className="text-destructive text-sm">
                  {state.error}
                </p>
              )}
              <Button type="submit" disabled={pending} className="h-10 rounded-[6px]">
                {pending ? "Création..." : "Créer mon compte"}
              </Button>
              <p className="text-muted-foreground text-center text-sm">
                Déjà un compte ?{" "}
                <Link href="/login" className="underline">
                  Se connecter
                </Link>
              </p>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
