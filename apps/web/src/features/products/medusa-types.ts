export type MedusaMovement = {
  id: string;
  slug: string;
  name: string;
};

export type DesignerTimelineEntry = {
  date: string;
  title: string;
  subtitle: string;
  description: string;
};

export type DesignerInFocus = {
  title: string;
  image_url: string | null;
  paragraphs: string[];
};

export type MedusaDesigner = {
  id: string;
  slug: string;
  first_name: string;
  last_name: string;
  nationality?: string | null;
  movements?: MedusaMovement[];
  birth_date?: string | null;
  death_date?: string | null;
  biography?: string | null;
  quote?: string | null;
  image_url?: string | null;
  featured?: boolean;
  timeline?: { entries: DesignerTimelineEntry[] } | null;
  in_focus?: DesignerInFocus | null;
};

export type MedusaMaterial = {
  id: string;
  slug: string;
  name: string;
};

export type MedusaManufacturer = {
  id: string;
  slug: string;
  name: string;
  country_name: string | null;
};

export type MedusaCategory = {
  id: string;
  handle: string;
  name: string;
};

export type MedusaProductCategory = {
  id: string;
  handle: string;
  name: string;
  rank: number;
  metadata: Record<string, unknown> | null;
};

export type MedusaProductImage = {
  id: string;
  url: string;
};

export type MedusaProductVariantPrice = {
  currency_code: string;
  amount: number;
};

export type MedusaProductVariant = {
  id: string;
  sku: string | null;
  prices: MedusaProductVariantPrice[];
};

export type MedusaProduct = {
  id: string;
  title: string;
  handle: string;
  description: string | null;
  created_at: string;
  thumbnail?: string | null;
  metadata?: Record<string, unknown> | null;
  images: MedusaProductImage[];
  categories: MedusaCategory[];
  tags: { id: string; value: string }[];
  variants: MedusaProductVariant[];
  designers: MedusaDesigner[];
  movement: MedusaMovement | null;
  materials: MedusaMaterial[];
  manufacturer: MedusaManufacturer | null;
};
