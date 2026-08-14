"use client";

import { useActionState } from "react";
import Link from "next/link";

import { loginAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, undefined);

  return (
    <div className="flex min-h-full items-center justify-center">
      <Card className="w-full max-w-sm ring-0">
        <CardHeader>
          <CardTitle as="h1" className="pb-8 text-center text-4xl">
            Se connecter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="flex flex-col gap-4">
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
                autoComplete="current-password"
                className="h-10 rounded-[6px]"
              />
            </div>
            {state?.error && (
              <p role="alert" className="text-destructive text-sm">
                {state.error}
              </p>
            )}
            <Button type="submit" disabled={pending} className="h-10 cursor-pointer rounded-[6px]">
              {pending ? "Signing in..." : "Sign in"}
            </Button>
            <p className="text-muted-foreground text-center text-sm">
              Pas encore de compte ?{" "}
              <Link href="/signup" className="underline">
                Créer un compte
              </Link>
            </p>
            <p className="text-muted-foreground text-center text-sm">
              <Link href="/forgot-password" className="underline">
                Mot de passe oublié ?
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
