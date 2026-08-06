export type ProductFilters = {
  categories: string[];
  designers: string[];
};

export type SearchParams = Record<string, string | string[] | undefined>;
