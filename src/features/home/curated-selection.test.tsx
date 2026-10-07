// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { CuratedSelection } from "@/features/home/curated-selection";
import { getPayloadClient } from "@/lib/payload";
import type { Product } from "../../../payload-types";

function richText(text: string): Product["description"] {
  return {
    root: {
      type: "root" as const,
      children: [
        {
          type: "paragraph" as const,
          children: [{ type: "text" as const, text, version: 1 }],
          direction: "ltr" as const,
          format: "" as const,
          indent: 0,
          version: 1,
        },
      ],
      direction: "ltr" as const,
      format: "" as const,
      indent: 0,
      version: 1,
    },
  };
}

async function createDesigner(slug: string, firstName: string, lastName: string) {
  const payload = await getPayloadClient();
  return payload.create({
    collection: "designers",
    data: { slug, firstName, lastName, biography: "Biographie." },
  });
}

async function createProduct(data: {
  name: string;
  slug: string;
  price: number;
  featured: boolean;
  image?: { url: string; alt: string };
  designers?: number[];
  creationDate?: string;
}) {
  const payload = await getPayloadClient();
  return payload.create({
    collection: "products",
    data: {
      name: data.name,
      slug: data.slug,
      description: richText("Une pièce de collection."),
      price: data.price,
      stock: 1,
      salesCount: 0,
      featured: data.featured,
      images: data.image ? [data.image] : undefined,
      designers: data.designers,
      creationDate: data.creationDate,
    },
  });
}

describe("CuratedSelection", () => {
  it("renders nothing when there are no featured products", async () => {
    const result = await CuratedSelection();

    expect(result).toBeNull();
  });

  it("only renders featured products", async () => {
    await createProduct({ name: "Womb Chair", slug: "womb-chair", price: 4435, featured: true });
    await createProduct({ name: "Chaise SERIE 7", slug: "serie-7", price: 558, featured: false });

    render(await CuratedSelection());

    expect(screen.getByText("Womb Chair")).toBeInTheDocument();
    expect(screen.queryByText("Chaise SERIE 7")).not.toBeInTheDocument();
  });

  it("shows the price, designer(s) and year", async () => {
    const designer = await createDesigner("eero-saarinen", "Eero", "Saarinen");
    await createProduct({
      name: "Womb Chair",
      slug: "womb-chair",
      price: 4435,
      featured: true,
      designers: [designer.id],
      creationDate: new Date(1946, 0, 1).toISOString(),
    });

    render(await CuratedSelection());

    expect(screen.getByText("4 435,00 €")).toBeInTheDocument();
    expect(screen.getByText("Eero Saarinen – 1946")).toBeInTheDocument();
  });

  it("shows the cover image when one is set", async () => {
    await createProduct({
      name: "Womb Chair",
      slug: "womb-chair",
      price: 4435,
      featured: true,
      image: {
        url: "https://res.cloudinary.com/demo/image/upload/womb-chair.jpg",
        alt: "Le fauteuil Womb Chair",
      },
    });

    render(await CuratedSelection());

    expect(screen.getByRole("img", { name: "Le fauteuil Womb Chair" })).toBeInTheDocument();
  });

  it("shows a fallback when a featured product has no cover image", async () => {
    await createProduct({ name: "Womb Chair", slug: "womb-chair", price: 4435, featured: true });

    render(await CuratedSelection());

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByText("Aucune image disponible pour Womb Chair")).toBeInTheDocument();
  });
});
