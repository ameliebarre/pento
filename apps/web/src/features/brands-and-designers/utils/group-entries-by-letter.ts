import { getEntryName, type CatalogueEntry } from "@/features/brands-and-designers/types";

export const ALPHABET = Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index));

const DIACRITICS_PATTERN = /[\u0300-\u036f]/g;

function getFirstLetter(text: string): string {
  return text.normalize("NFD").replace(DIACRITICS_PATTERN, "").charAt(0).toUpperCase();
}

export function groupEntriesByLetter(entries: CatalogueEntry[]): Map<string, CatalogueEntry[]> {
  const groups = new Map<string, CatalogueEntry[]>();

  for (const entry of entries) {
    const letter = getFirstLetter(getEntryName(entry));
    if (!ALPHABET.includes(letter)) continue;

    const group = groups.get(letter) ?? [];
    group.push(entry);
    groups.set(letter, group);
  }

  for (const group of groups.values()) {
    group.sort((a, b) => getEntryName(a).localeCompare(getEntryName(b)));
  }

  return groups;
}
