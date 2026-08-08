export type SortOrder = "price-asc" | "price-desc";

export type ProductFilters = {
  categories: string[];
  designers: string[];
  materials: string[];
  minPrice: number | null;
  maxPrice: number | null;
  sort: SortOrder | null;
};

export type SearchParams = Record<string, string | string[] | undefined>;
