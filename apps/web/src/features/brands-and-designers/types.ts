export type CatalogueEntry =
  | {
      kind: "designer";
      id: string;
      firstName: string;
      lastName: string;
      secondary: string | null;
      href: string;
    }
  | {
      kind: "manufacturer";
      id: string;
      name: string;
      secondary: string | null;
      href: null;
    };

export function getEntryName(entry: CatalogueEntry): string {
  return entry.kind === "designer" ? `${entry.firstName} ${entry.lastName}` : entry.name;
}
