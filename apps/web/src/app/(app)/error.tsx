"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="font-heading text-2xl">Une erreur est survenue</h1>
      <p className="text-muted-foreground max-w-sm text-sm">
        Quelque chose s&apos;est mal passé. Réessayez, ou revenez un peu plus tard si le problème
        persiste.
      </p>
      <Button type="button" onClick={() => reset()} className="h-10 cursor-pointer rounded-[6px]">
        Réessayer
      </Button>
    </div>
  );
}
