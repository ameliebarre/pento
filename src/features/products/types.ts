export type ProductFilters = {
  categories: string[];
  designers: string[];
  materials: string[];
  minPrice: number | null;
  maxPrice: number | null;
};

export type SearchParams = Record<string, string | string[] | undefined>;
