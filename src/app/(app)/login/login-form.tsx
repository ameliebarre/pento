"use client";

import { useActionState, useEffect, useRef } from "react";
import Link from "next/link";

import { loginAction } from "@/actions/auth";
import { AuthCard } from "@/components/auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, undefined);
  const errorRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (state?.error) errorRef.current?.focus();
  }, [state?.error]);

  return (
    <AuthCard title="Se connecter">
      <form action={formAction} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            spellCheck={false}
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
          <p ref={errorRef} role="alert" tabIndex={-1} className="text-destructive text-sm">
            {state.error}
          </p>
        )}
        <Button type="submit" disabled={pending} className="h-10 cursor-pointer rounded-[6px]">
          {pending ? "Connexion…" : "Se connecter"}
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
    </AuthCard>
  );
}
