"use client";

import { useId, useState, type SubmitEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const inputId = useId();

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    setEmail("");
  }

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="relative right-1/2 left-1/2 mx-[-50vw] w-screen bg-neutral-900 py-16 sm:py-20"
    >
      <div className="mx-auto flex max-w-xl flex-col items-center gap-6 px-6 text-center">
        <div className="flex flex-col gap-2">
          <h2
            id="newsletter-heading"
            className="font-heading text-3xl text-white italic sm:text-4xl"
          >
            Restez inspiré
          </h2>
          <p className="text-sm text-white/70 sm:text-base">
            Inscrivez-vous à notre newsletter pour recevoir en avant-première nos nouvelles
            collections et les histoires de nos designers.
          </p>
        </div>

        {submitted ? (
          <p role="status" className="text-sm font-medium text-white">
            Merci ! Votre inscription a bien été prise en compte.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-3 sm:flex-row sm:items-start"
          >
            <Label htmlFor={inputId} className="sr-only">
              Adresse e-mail
            </Label>
            <Input
              id={inputId}
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-11 flex-1 border-white/40 bg-white/10 px-4 text-white placeholder:text-white/60 focus-visible:border-white/60 focus-visible:ring-white/50"
            />
            <Button
              type="submit"
              size="lg"
              className="h-11 cursor-pointer rounded-[6px] bg-white text-black hover:bg-white/90"
            >
              S&apos;inscrire
            </Button>
          </form>
        )}

        <p className="text-xs text-white/50">
          En vous inscrivant, vous acceptez de recevoir nos e-mails. Désinscription possible à tout
          moment.
        </p>
      </div>
    </section>
  );
}
