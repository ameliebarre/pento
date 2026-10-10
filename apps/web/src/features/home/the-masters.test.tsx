// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/lib/medusa", () => ({
  medusa: { client: { fetch: vi.fn() } },
}));

import { TheMasters } from "@/features/home/the-masters";
import { medusa } from "@/lib/medusa";
import type { MedusaDesigner } from "@/features/products/medusa-types";

function buildDesigner(overrides: {
  slug: string;
  firstName: string;
  lastName: string;
  nationality?: string;
  imageUrl?: string;
  featured?: boolean;
}): MedusaDesigner {
  return {
    id: overrides.slug,
    slug: overrides.slug,
    first_name: overrides.firstName,
    last_name: overrides.lastName,
    nationality: overrides.nationality ?? null,
    image_url: overrides.imageUrl ?? null,
    featured: overrides.featured ?? true,
  };
}

function setupMedusa(designers: MedusaDesigner[]) {
  vi.mocked(medusa.client.fetch).mockImplementation(async (path: unknown) => {
    if (path === "/store/designers") return { designers };
    throw new Error(`Unexpected path: ${String(path)}`);
  });
}

describe("TheMasters", () => {
  it("renders the heading and each featured designer's name", async () => {
    setupMedusa([
      buildDesigner({ slug: "gio-ponti", firstName: "Gio", lastName: "Ponti" }),
      buildDesigner({ slug: "charlotte-perriand", firstName: "Charlotte", lastName: "Perriand" }),
    ]);

    render(await TheMasters());

    expect(
      screen.getByRole("heading", { name: "The designers behind the icons" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Gio Ponti")).toBeInTheDocument();
    expect(screen.getByText("Charlotte Perriand")).toBeInTheDocument();
  });

  it("renders a designer's portrait and nationality when set", async () => {
    setupMedusa([
      buildDesigner({
        slug: "gio-ponti",
        firstName: "Gio",
        lastName: "Ponti",
        nationality: "Italienne",
        imageUrl: "https://res.cloudinary.com/dasujyncc/image/upload/v1/pento/designers/gio-ponti.png",
      }),
    ]);

    render(await TheMasters());

    expect(screen.getByRole("img", { name: "Portrait de Gio Ponti" })).toBeInTheDocument();
    expect(screen.getByText("Italienne")).toBeInTheDocument();
  });

  it("merges Charles and Ray Eames into a single card under their joint name", async () => {
    setupMedusa([
      buildDesigner({ slug: "charles-eames", firstName: "Charles", lastName: "Eames" }),
      buildDesigner({
        slug: "ray-eames",
        firstName: "Ray",
        lastName: "Eames",
        featured: false,
      }),
    ]);

    render(await TheMasters());

    expect(screen.getByText("Charles & Ray Eames")).toBeInTheDocument();
    expect(screen.queryByText("Charles Eames")).not.toBeInTheDocument();
    expect(screen.queryByText("Ray Eames")).not.toBeInTheDocument();
  });

  it("excludes designers that are not featured", async () => {
    setupMedusa([
      buildDesigner({ slug: "gio-ponti", firstName: "Gio", lastName: "Ponti" }),
      buildDesigner({
        slug: "achille-castiglioni",
        firstName: "Achille",
        lastName: "Castiglioni",
        featured: false,
      }),
    ]);

    render(await TheMasters());

    expect(screen.getByText("Gio Ponti")).toBeInTheDocument();
    expect(screen.queryByText("Achille Castiglioni")).not.toBeInTheDocument();
  });

  it("renders nothing when there are no featured designers", async () => {
    setupMedusa([
      buildDesigner({
        slug: "achille-castiglioni",
        firstName: "Achille",
        lastName: "Castiglioni",
        featured: false,
      }),
    ]);

    const result = await TheMasters();

    expect(result).toBeNull();
  });
});
