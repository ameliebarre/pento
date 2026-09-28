// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { TheMasters } from "@/features/home/the-masters";
import { getPayloadClient } from "@/lib/payload";

async function createDesigner(overrides: {
  slug: string;
  firstName: string;
  lastName: string;
  biography?: string;
  nationality?: string;
  image?: string;
  featured?: boolean;
}) {
  const payload = await getPayloadClient();
  return payload.create({
    collection: "designers",
    data: {
      biography: "Biographie.",
      featured: true,
      ...overrides,
    },
  });
}

describe("TheMasters", () => {
  it("renders the heading and each featured designer's name", async () => {
    await createDesigner({ slug: "gio-ponti", firstName: "Gio", lastName: "Ponti" });
    await createDesigner({ slug: "charlotte-perriand", firstName: "Charlotte", lastName: "Perriand" });

    render(await TheMasters());

    expect(
      screen.getByRole("heading", { name: "The designers behind the icons" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Gio Ponti")).toBeInTheDocument();
    expect(screen.getByText("Charlotte Perriand")).toBeInTheDocument();
  });

  it("renders a designer's portrait and nationality when set", async () => {
    await createDesigner({
      slug: "gio-ponti",
      firstName: "Gio",
      lastName: "Ponti",
      nationality: "Italienne",
      image: "https://res.cloudinary.com/dasujyncc/image/upload/v1/pento/designers/gio-ponti.png",
    });

    render(await TheMasters());

    expect(screen.getByRole("img", { name: "Portrait de Gio Ponti" })).toBeInTheDocument();
    expect(screen.getByText("Italienne")).toBeInTheDocument();
  });

  it("merges Charles and Ray Eames into a single card under their joint name", async () => {
    await createDesigner({ slug: "charles-eames", firstName: "Charles", lastName: "Eames" });
    await createDesigner({
      slug: "ray-eames",
      firstName: "Ray",
      lastName: "Eames",
      featured: false,
    });

    render(await TheMasters());

    expect(screen.getByText("Charles & Ray Eames")).toBeInTheDocument();
    expect(screen.queryByText("Charles Eames")).not.toBeInTheDocument();
    expect(screen.queryByText("Ray Eames")).not.toBeInTheDocument();
  });

  it("excludes designers that are not featured", async () => {
    await createDesigner({ slug: "gio-ponti", firstName: "Gio", lastName: "Ponti" });
    await createDesigner({
      slug: "achille-castiglioni",
      firstName: "Achille",
      lastName: "Castiglioni",
      featured: false,
    });

    render(await TheMasters());

    expect(screen.getByText("Gio Ponti")).toBeInTheDocument();
    expect(screen.queryByText("Achille Castiglioni")).not.toBeInTheDocument();
  });

  it("renders nothing when there are no featured designers", async () => {
    await createDesigner({
      slug: "achille-castiglioni",
      firstName: "Achille",
      lastName: "Castiglioni",
      featured: false,
    });

    const result = await TheMasters();

    expect(result).toBeNull();
  });
});
