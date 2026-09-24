import { GlobalConfig } from "payload";

export const PassionForDesign: GlobalConfig = {
  slug: "passion-for-design",
  label: "Passion for Design Section",
  access: { read: () => true },
  fields: [
    {
      name: "image",
      type: "relationship",
      relationTo: "media",
      required: true,
    },
    {
      name: "eyebrow",
      type: "text",
      required: true,
      defaultValue: "A passion for enduring design",
    },
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Objects with a story.",
      admin: {
        description: "Première ligne du titre, affichée en blanc.",
      },
    },
    {
      name: "headingAccent",
      type: "text",
      required: true,
      defaultValue: "Pieces with a soul.",
      admin: {
        description: "Deuxième ligne du titre, affichée en italique doré.",
      },
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      defaultValue:
        "Pento was born from a simple belief: great design deserves to live on. We curate iconic furniture and objects that have shaped the history of design — pieces imagined by visionary designers, produced with exceptional craftsmanship, and made to transcend generations. From celebrated classics to lesser-known gems, every piece in our collection has a story worth telling.\n\nFor us, buying design is not simply about furnishing a space. It is about choosing objects that speak to us, discovering the ideas and people behind them, and bringing a piece of design history into our everyday lives.",
      admin: {
        description: "Un ou deux paragraphes, séparés par une ligne vide.",
      },
    },
    {
      name: "values",
      type: "array",
      required: true,
      minRows: 1,
      maxRows: 4,
      defaultValue: [
        {
          title: "Timelessness",
          description:
            "We believe true design never goes out of style. We select pieces for their ability to remain relevant, beautiful and meaningful across generations.",
        },
        {
          title: "Authenticity",
          description:
            "Every piece has a story. We care about its origins, its designer, its craftsmanship and the details that make it genuinely special.",
        },
        {
          title: "Curiosity",
          description:
            "Design is a constantly evolving conversation. We explore its history, movements and creators to help you discover pieces you may not have encountered before.",
        },
        {
          title: "Sustainability",
          description:
            "The most sustainable object is often the one made to last. By celebrating enduring design and quality craftsmanship, we encourage a more thoughtful way of furnishing our homes.",
        },
      ],
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          required: true,
        },
      ],
    },
  ],
};
