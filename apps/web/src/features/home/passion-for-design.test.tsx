// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { PassionForDesign } from "@/features/home/passion-for-design";
import { getPayloadClient } from "@/lib/payload";

async function seedSection(overrides: {
  imageUrl?: string;
  eyebrow?: string;
  heading?: string;
  headingAccent?: string;
  description?: string;
  values?: { title: string; description: string }[];
}) {
  const payload = await getPayloadClient();
  return payload.updateGlobal({
    slug: "passion-for-design",
    data: {
      imageUrl: "https://res.cloudinary.com/demo/image/upload/armchair.jpg",
      eyebrow: "A passion for enduring design",
      heading: "Objects with a story.",
      headingAccent: "Pieces with a soul.",
      description: "Premier paragraphe.\n\nSecond paragraphe.",
      values: [{ title: "Timelessness", description: "Ne se démode jamais." }],
      ...overrides,
    },
  });
}

describe("PassionForDesign", () => {
  it("renders the heading and both paragraphs", async () => {
    await seedSection({});

    render(await PassionForDesign());

    expect(
      screen.getByRole("heading", { name: "Objects with a story. Pieces with a soul." }),
    ).toBeInTheDocument();
    expect(screen.getByText("Premier paragraphe.")).toBeInTheDocument();
    expect(screen.getByText("Second paragraphe.")).toBeInTheDocument();
  });

  it("renders the background image from the Payload global", async () => {
    await seedSection({
      imageUrl: "https://res.cloudinary.com/demo/image/upload/rattan-chair.jpg",
    });

    render(await PassionForDesign());

    const image = screen.getByRole("img", {
      name: "Intérieur mettant en valeur une pièce de design emblématique",
    });
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining(
        encodeURIComponent("https://res.cloudinary.com/demo/image/upload/rattan-chair.jpg"),
      ),
    );
  });

  it("renders every value pillar with its title and description", async () => {
    await seedSection({
      values: [
        { title: "Timelessness", description: "Ne se démode jamais." },
        { title: "Authenticity", description: "Chaque pièce a une histoire." },
      ],
    });

    render(await PassionForDesign());

    expect(screen.getByText("Timelessness")).toBeInTheDocument();
    expect(screen.getByText("Ne se démode jamais.")).toBeInTheDocument();
    expect(screen.getByText("Authenticity")).toBeInTheDocument();
    expect(screen.getByText("Chaque pièce a une histoire.")).toBeInTheDocument();
  });
});
