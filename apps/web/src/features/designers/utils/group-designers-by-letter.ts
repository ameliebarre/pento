import type { MedusaDesigner } from "@/features/products/medusa-types";

export const ALPHABET = Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index));

const DIACRITICS_PATTERN = /[\u0300-\u036f]/g;

function getFirstLetter(name: string): string {
  return name.normalize("NFD").replace(DIACRITICS_PATTERN, "").charAt(0).toUpperCase();
}

export function groupDesignersByLetter(designers: MedusaDesigner[]): Map<string, MedusaDesigner[]> {
  const groups = new Map<string, MedusaDesigner[]>();

  for (const designer of designers) {
    const letter = getFirstLetter(designer.first_name);
    if (!ALPHABET.includes(letter)) continue;

    const group = groups.get(letter) ?? [];
    group.push(designer);
    groups.set(letter, group);
  }

  for (const group of groups.values()) {
    group.sort((a, b) =>
      `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`),
    );
  }

  return groups;
}
