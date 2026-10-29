export type HeroData = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  /** Path under /public to the full-bleed background photo. */
  backgroundImageUrl: string;
  backgroundImageAlt: string;
  /** Shown in the badge over the photo, identifying the pictured piece. */
  product: {
    name: string;
    designer: string;
    year: string;
  };
};

export const HERO_DATA: HeroData = {
  eyebrow: "ICONS, IN EVERY DIMENSION",
  title: "A new angle on timeless design.",
  description: "Discover the pieces that shaped the way we live.",
  ctaLabel: "Explore the collection",
  ctaHref: "/products",
  backgroundImageUrl: "/images/egg-chair.png",
  backgroundImageAlt: "Egg™ Chair by Arne Jacobsen in a sunlit interior",
  product: {
    name: "Egg Chair",
    designer: "Arne Jacobsen",
    year: "1958",
  },
};
