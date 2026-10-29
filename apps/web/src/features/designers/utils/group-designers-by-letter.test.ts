import { describe, expect, it } from "vitest";

import { ALPHABET, groupDesignersByLetter } from "@/features/designers/utils/group-designers-by-letter";
import type { MedusaDesigner } from "@/features/products/medusa-types";

function designer(overrides: Partial<MedusaDesigner> = {}): MedusaDesigner {
  return {
    id: "designer_1",
    slug: "slug",
    first_name: "First",
    last_name: "Last",
    ...overrides,
  };
}

describe("groupDesignersByLetter", () => {
  it("returns an empty map for an empty list", () => {
    expect(groupDesignersByLetter([]).size).toBe(0);
  });

  it("groups a designer under the uppercase first letter of their first name", () => {
    const groups = groupDesignersByLetter([
      designer({ id: "1", first_name: "hans", last_name: "Wegner" }),
    ]);

    expect(groups.get("H")).toEqual([
      expect.objectContaining({ id: "1", first_name: "hans" }),
    ]);
  });

  it("strips diacritics so accented names group with their base letter", () => {
    const groups = groupDesignersByLetter([
      designer({ id: "1", first_name: "Émile", last_name: "Guimard" }),
    ]);

    expect(groups.has("E")).toBe(true);
    expect(groups.get("É")).toBeUndefined();
  });

  it("sorts designers within a letter by first then last name", () => {
    const groups = groupDesignersByLetter([
      designer({ id: "1", first_name: "Charles", last_name: "Eames" }),
      designer({ id: "2", first_name: "Charlotte", last_name: "Perriand" }),
    ]);

    expect(groups.get("C")!.map((d) => d.id)).toEqual(["1", "2"]);
  });

  it("does not create an entry for letters with no matching designer", () => {
    const groups = groupDesignersByLetter([designer({ first_name: "Zaha" })]);

    expect(ALPHABET.filter((letter) => groups.has(letter))).toEqual(["Z"]);
  });
});
