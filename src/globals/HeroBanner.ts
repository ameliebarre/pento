import { GlobalConfig } from "payload";

export const HeroBanner: GlobalConfig = {
  slug: "hero-banner",
  label: "Hero Banner",
  access: { read: () => true },
  fields: [
    {
      name: "backgroundImage",
      type: "relationship",
      relationTo: "media",
      required: true,
    },
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Timeless design,",
      admin: {
        description: "Première ligne du titre, affichée en blanc.",
      },
    },
    {
      name: "headingAccent",
      type: "text",
      required: true,
      defaultValue: "curated with reverence.",
      admin: {
        description: "Deuxième ligne du titre, affichée en italique doré.",
      },
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "ctaLabel",
      type: "text",
      required: true,
      defaultValue: "Explore the collection",
    },
    {
      name: "ctaHref",
      type: "text",
      required: true,
      defaultValue: "/products",
    },
  ],
};
