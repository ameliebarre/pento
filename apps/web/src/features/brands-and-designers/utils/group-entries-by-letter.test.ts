import { describe, expect, it } from "vitest";

import { ALPHABET, groupEntriesByLetter } from "@/features/brands-and-designers/utils/group-entries-by-letter";
import type { CatalogueEntry } from "@/features/brands-and-designers/types";

function designer(overrides: Partial<Extract<CatalogueEntry, { kind: "designer" }>> = {}): CatalogueEntry {
  return {
    kind: "designer",
    id: "designer_1",
    firstName: "First",
    lastName: "Last",
    secondary: null,
    href: "/designer/slug",
    ...overrides,
  };
}

function manufacturer(
  overrides: Partial<Extract<CatalogueEntry, { kind: "manufacturer" }>> = {},
): CatalogueEntry {
  return {
    kind: "manufacturer",
    id: "manufacturer_1",
    name: "Brand",
    secondary: null,
    href: null,
    ...overrides,
  };
}

describe("groupEntriesByLetter", () => {
  it("returns an empty map for an empty list", () => {
    expect(groupEntriesByLetter([]).size).toBe(0);
  });

  it("groups a designer under the uppercase first letter of their first name", () => {
    const groups = groupEntriesByLetter([designer({ id: "1", firstName: "hans", lastName: "Wegner" })]);

    expect(groups.get("H")).toEqual([expect.objectContaining({ id: "1", firstName: "hans" })]);
  });

  it("groups a manufacturer under the uppercase first letter of its name", () => {
    const groups = groupEntriesByLetter([manufacturer({ id: "1", name: "vitra" })]);

    expect(groups.get("V")).toEqual([expect.objectContaining({ id: "1", name: "vitra" })]);
  });

  it("strips diacritics so accented names group with their base letter", () => {
    const groups = groupEntriesByLetter([designer({ firstName: "Émile", lastName: "Guimard" })]);

    expect(groups.has("E")).toBe(true);
    expect(groups.get("É")).toBeUndefined();
  });

  it("merges designers and manufacturers under the same letter, sorted by display name", () => {
    const groups = groupEntriesByLetter([
      designer({ id: "1", firstName: "Charlotte", lastName: "Perriand" }),
      manufacturer({ id: "2", name: "Cassina" }),
      designer({ id: "3", firstName: "Charles", lastName: "Eames" }),
    ]);

    expect(groups.get("C")!.map((entry) => entry.id)).toEqual(["2", "3", "1"]);
  });

  it("does not create an entry for letters with no matching entry", () => {
    const groups = groupEntriesByLetter([designer({ firstName: "Zaha" })]);

    expect(ALPHABET.filter((letter) => groups.has(letter))).toEqual(["Z"]);
  });
});
