import { BadgeCheck, Globe, MessageCircle, RotateCcw } from "lucide-react";

const FEATURES = [
  {
    icon: BadgeCheck,
    title: "Pièces authentiques",
    description:
      "Nous travaillons avec les éditeurs officiels pour vous garantir l'authenticité de chaque pièce",
  },
  {
    icon: Globe,
    title: "Livraison internationale",
    description:
      "Livraison sécurisée partout dans le monde, assurée par des transporteurs spécialisés",
  },
  {
    icon: MessageCircle,
    title: "Conseil personnalisé",
    description:
      "Notre équipe vous accompagne dans le choix des pièces adaptées à vos espaces et vos envies",
  },
  {
    icon: RotateCcw,
    title: "Retours offerts",
    description:
      "Vous avez 14 jours pour changer d'avis, retour gratuit et remboursement sous 7 jours.",
  },
];

export function TrustFeatures() {
  return (
    <section aria-labelledby="trust-features-heading" className="py-16">
      <h2 id="trust-features-heading" className="sr-only">
        Nos engagements
      </h2>
      <ul className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature) => (
          <li key={feature.title} className="flex flex-col items-center gap-2 text-center">
            <feature.icon aria-hidden="true" className="size-6" />
            <h3 className="font-heading text-lg font-semibold">{feature.title}</h3>
            <p className="text-muted-foreground text-sm">{feature.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
