import { SearchParams } from "../types";

// Deliberately separate from build-filter-href.ts: this toggle is page UI
// state (whether the filters column is shown), not a product query
// criterion, so it operates on the raw incoming search params rather than
// the typed ProductFilters shape — every other param is passed through
// untouched, whatever it is. Filters are hidden by default, so only the
// "shown" state needs an explicit marker in the URL.
export function buildFiltersVisibilityHref(searchParams: SearchParams, visible: boolean): string {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams)) {
    if (value === undefined || key === "showFilters") continue;
    for (const entry of Array.isArray(value) ? value : [value]) params.append(key, entry);
  }

  if (visible) params.set("showFilters", "1");

  const query = params.toString();
  return query ? `/products?${query}` : "/products";
}
