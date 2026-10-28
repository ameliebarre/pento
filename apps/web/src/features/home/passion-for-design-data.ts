export type PassionForDesignData = {
  imageUrl: string;
  imageAlt: string;
  eyebrow: string;
  heading: string;
  headingAccent: string;
  paragraphs: string[];
  values: { title: string; description: string }[];
};

export const PASSION_FOR_DESIGN_DATA: PassionForDesignData = {
  imageUrl: "/images/curated-selection-image.png",
  imageAlt: "Intérieur mettant en valeur une pièce de design emblématique",
  eyebrow: "A passion for enduring design",
  heading: "Objects with a story.",
  headingAccent: "Pieces with a soul.",
  paragraphs: [
    "Pento was born from a simple belief: great design deserves to live on. We curate iconic furniture and objects that have shaped the history of design — pieces imagined by visionary designers, produced with exceptional craftsmanship, and made to transcend generations. From celebrated classics to lesser-known gems, every piece in our collection has a story worth telling.",
    "For us, buying design is not simply about furnishing a space. It is about choosing objects that speak to us, discovering the ideas and people behind them, and bringing a piece of design history into our everyday lives.",
  ],
  values: [
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
};
