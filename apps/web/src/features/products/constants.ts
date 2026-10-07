// Shared between a Server Component (products/page.tsx, reads it via
// cookies()) and a Client Component (persistent-filter-accordion.tsx,
// writes it via document.cookie). Deliberately kept in a plain module with
// no "use client"/"use server" directive: a named export from a "use client"
// file resolves to `undefined` when imported from server code, so this
// constant can't live in either of those files.
export const OPEN_FILTER_SECTIONS_COOKIE = "openFilterSections";
