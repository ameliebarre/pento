// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { PassionForDesign } from "@/features/home/passion-for-design";
import { getPayloadClient } from "@/lib/payload";
import { prisma } from "@/lib/prisma";

async function createTestImage(alt: string) {
  const rows = await prisma.$queryRaw<{ id: number }[]>`
    INSERT INTO payload.media (alt, url, filename, mime_type, filesize, width, height)
    VALUES (${alt}, ${"/api/media/file/test.png"}, ${"test.png"}, ${"image/png"}, 90, 1, 1)
    RETURNING id;
  `;
  return rows[0];
}

async function seedSection(overrides: {
  image: number;
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
    const image = await createTestImage("Fauteuil design");
    await seedSection({ image: image.id });

    render(await PassionForDesign());

    expect(
      screen.getByRole("heading", { name: "Objects with a story. Pieces with a soul." }),
    ).toBeInTheDocument();
    expect(screen.getByText("Premier paragraphe.")).toBeInTheDocument();
    expect(screen.getByText("Second paragraphe.")).toBeInTheDocument();
  });

  it("renders the background image from the Payload global", async () => {
    const image = await createTestImage("Fauteuil en rotin dans un intérieur épuré");
    await seedSection({ image: image.id });

    render(await PassionForDesign());

    expect(
      screen.getByRole("img", { name: "Fauteuil en rotin dans un intérieur épuré" }),
    ).toBeInTheDocument();
  });

  it("renders every value pillar with its title and description", async () => {
    const image = await createTestImage("Fauteuil design");
    await seedSection({
      image: image.id,
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
