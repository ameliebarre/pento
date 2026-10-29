import { BadgeCheck, Globe, MessageCircle, RotateCcw } from "lucide-react";

import { ScrollRevealGroup, ScrollRevealItem } from "@/components/scroll-reveal";

const FEATURES = [
  {
    icon: BadgeCheck,
    title: "Authentic pieces",
    description: "We work with official editors to guarantee the authenticity of every piece",
  },
  {
    icon: Globe,
    title: "International shipping",
    description: "Secure delivery worldwide, handled by specialized carriers",
  },
  {
    icon: MessageCircle,
    title: "Personalized advice",
    description:
      "Our team helps you choose the pieces that best suit your spaces and your style",
  },
  {
    icon: RotateCcw,
    title: "Free returns",
    description: "You have 14 days to change your mind — free returns and refund within 7 days.",
  },
];

export function TrustFeatures() {
  return (
    <section aria-labelledby="trust-features-heading" className="py-16">
      <h2 id="trust-features-heading" className="sr-only">
        Our commitments
      </h2>
      <ScrollRevealGroup
        as="ul"
        className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4"
      >
        {FEATURES.map((feature) => (
          <ScrollRevealItem
            key={feature.title}
            as="li"
            className="flex flex-col items-center gap-2 text-center"
          >
            <feature.icon aria-hidden="true" className="size-6" />
            <h3 className="font-heading text-lg font-semibold">{feature.title}</h3>
            <p className="text-muted-foreground text-sm">{feature.description}</p>
          </ScrollRevealItem>
        ))}
      </ScrollRevealGroup>
    </section>
  );
}
