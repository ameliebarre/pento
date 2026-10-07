"use client";

import { useId, useState, type SubmitEvent } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollReveal } from "@/components/scroll-reveal";

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
      className="relative right-1/2 left-1/2 mx-[-50vw] w-screen"
    >
      <div className="relative flex min-h-[38rem] w-full items-center justify-center overflow-hidden py-16 sm:py-20">
        <Image
          src="/images/newsletter-background.jpg"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />

        <ScrollReveal className="relative mx-auto flex max-w-xl flex-col items-center gap-6 px-6 text-center">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium tracking-wide text-[#c5964b] uppercase">
              Join the maison
            </p>
            <h2 id="newsletter-heading" className="font-heading text-4xl text-white sm:text-5xl">
              First access to new arrivals
            </h2>
            <p className="text-sm text-white/70 sm:text-base">
              Subscribe for private previews of rare pieces, designer stories, and invitations to
              our showroom events.
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
                spellCheck={false}
                placeholder="you@example.com…"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-12 flex-1 border-white/40 bg-white/10 px-4 text-white placeholder:text-white/60 focus-visible:border-white/60 focus-visible:ring-white/50"
              />
              <Button
                type="submit"
                size="lg"
                className="group h-12 cursor-pointer rounded-[6px] bg-[#c5964b] px-6 font-semibold tracking-wide text-black uppercase hover:bg-[#c5964b]/90"
              >
                Subscribe
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Button>
            </form>
          )}

          <p className="text-xs text-white/50">No spam, only design. Unsubscribe anytime.</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
