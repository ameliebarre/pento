export type MedusaDesigner = {
  id: string;
  slug: string;
  first_name: string;
  last_name: string;
};

export type MedusaMaterial = {
  id: string;
  slug: string;
  name: string;
};

export type MedusaMovement = {
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
  images: MedusaProductImage[];
  categories: MedusaCategory[];
  tags: { id: string; value: string }[];
  variants: MedusaProductVariant[];
  designers: MedusaDesigner[];
  movement: MedusaMovement | null;
  materials: MedusaMaterial[];
  manufacturer: MedusaManufacturer | null;
};
