// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/lib/get-session", () => ({
  getSession: vi.fn().mockResolvedValue(null),
}));

const notFoundSentinel = new Error("NEXT_NOT_FOUND");
const mockNotFound = vi.fn(() => {
  throw notFoundSentinel;
});
vi.mock("next/navigation", () => ({
  notFound: () => mockNotFound(),
}));

vi.mock("@/lib/medusa", () => ({
  medusa: { client: { fetch: vi.fn() } },
}));

import DesignerPage from "@/app/(app)/designer/[slug]/page";
import { medusa } from "@/lib/medusa";
import { QueryProvider } from "@/components/query-provider";
import { CartDrawerProvider } from "@/features/cart/components/cart-drawer-provider";
import type { MedusaDesigner } from "@/features/products/medusa-types";

function buildDesigner(overrides: Partial<MedusaDesigner> = {}): MedusaDesigner {
  return {
    id: "des_1",
    slug: "gio-ponti",
    first_name: "Gio",
    last_name: "Ponti",
    ...overrides,
  };
}

function setupMedusa(designers: MedusaDesigner[]) {
  vi.mocked(medusa.client.fetch).mockImplementation(async () => ({ designers }));
}

async function renderPage(slug: string) {
  const element = await DesignerPage({ params: Promise.resolve({ slug }) });

  return (
    <QueryProvider>
      <CartDrawerProvider>{element}</CartDrawerProvider>
    </QueryProvider>
  );
}

describe("DesignerPage", () => {
  it("renders the designer's name", async () => {
    setupMedusa([buildDesigner()]);

    render(await renderPage("gio-ponti"));

    expect(screen.getByRole("heading", { name: "Gio Ponti" })).toBeInTheDocument();
  });

  it("shows the portrait and lifespan when set", async () => {
    setupMedusa([
      buildDesigner({
        nationality: "Italienne",
        birth_date: "1891-11-18T00:00:00.000Z",
        death_date: "1979-09-16T00:00:00.000Z",
        image_url: "https://example.com/gio-ponti.jpg",
      }),
    ]);

    render(await renderPage("gio-ponti"));

    expect(screen.getByRole("img", { name: "Portrait of Gio Ponti" })).toBeInTheDocument();
    expect(screen.getByText("1891–1979")).toBeInTheDocument();
  });

  it("shows a fallback when the designer has no portrait", async () => {
    setupMedusa([buildDesigner()]);

    render(await renderPage("gio-ponti"));

    expect(screen.queryByRole("img", { name: /portrait/i })).not.toBeInTheDocument();
    expect(screen.getByText("No portrait available for Gio Ponti")).toBeInTheDocument();
  });

  it("shows the biography when set", async () => {
    setupMedusa([
      buildDesigner({
        biography: "Une biographie détaillée.",
      }),
    ]);

    render(await renderPage("gio-ponti"));

    expect(screen.getByText("Une biographie détaillée.")).toBeInTheDocument();
  });

  it("renders the timeline section inline below the banner when the designer has one", async () => {
    setupMedusa([
      buildDesigner({
        timeline: {
          eyebrow: "A life in design",
          heading: "Key moments",
          entries: [
            {
              year: "1902",
              eyebrow: "Copenhagen, Denmark",
              title: "A Danish Beginning",
              description: "Arne Emil Jacobsen is born in Copenhagen.",
            },
            {
              year: "1924–1927",
              eyebrow: "From painting to architecture",
              title: "Education & Influence",
              description: "Jacobsen studies architecture at the Royal Danish Academy of Fine Arts.",
              image_url: "https://example.com/education.jpg",
            },
          ],
        },
      }),
    ]);

    render(await renderPage("gio-ponti"));

    expect(screen.getByRole("heading", { name: "Key moments" })).toBeInTheDocument();
    expect(screen.getByText("A Danish Beginning")).toBeInTheDocument();
    expect(screen.getByText("Education & Influence")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /Education & Influence/i })).toBeInTheDocument();
  });

  it("omits the timeline section when the designer has no timeline", async () => {
    setupMedusa([buildDesigner()]);

    render(await renderPage("gio-ponti"));

    expect(screen.queryByRole("heading", { name: "Key moments" })).not.toBeInTheDocument();
  });

  it("puts the last name on its own line in the heading", async () => {
    setupMedusa([buildDesigner()]);

    render(await renderPage("gio-ponti"));

    const heading = screen.getByRole("heading", { name: "Gio Ponti" });
    expect(heading.querySelector("br")).toBeInTheDocument();
  });

  it("shows profession and design movement as tags", async () => {
    setupMedusa([
      buildDesigner({
        profession: "Architect & Designer",
        design_movement: "Danish Modern",
      }),
    ]);

    render(await renderPage("gio-ponti"));

    expect(screen.getByText("Architect & Designer")).toBeInTheDocument();
    expect(screen.getAllByText("Danish Modern").length).toBeGreaterThan(0);
  });

  it("shows a banner with nationality, birth details, death details, and the design movement", async () => {
    setupMedusa([
      buildDesigner({
        nationality: "Danish",
        birth_date: "1902-02-11T00:00:00.000Z",
        birth_place: "Copenhagen",
        death_date: "1971-03-24T00:00:00.000Z",
        death_place: "Copenhagen",
        design_movement: "Danish Modern",
      }),
    ]);

    render(await renderPage("gio-ponti"));

    expect(screen.getByText("Nationality")).toBeInTheDocument();
    expect(screen.getByText("Danish")).toBeInTheDocument();
    expect(screen.getByText("Born")).toBeInTheDocument();
    expect(screen.getByText("1902 - Copenhagen")).toBeInTheDocument();
    expect(screen.getByText("Dead")).toBeInTheDocument();
    expect(screen.getByText("1971 - Copenhagen")).toBeInTheDocument();
    expect(screen.getByText("Design language")).toBeInTheDocument();
    expect(screen.getAllByText("Danish Modern").length).toBeGreaterThan(0);
  });

  it("omits the Nationality banner item when the designer has no nationality", async () => {
    setupMedusa([buildDesigner()]);

    render(await renderPage("gio-ponti"));

    expect(screen.queryByText("Nationality")).not.toBeInTheDocument();
  });

  it("omits the Dead banner item when the designer has no death date", async () => {
    setupMedusa([
      buildDesigner({
        birth_date: "1902-02-11T00:00:00.000Z",
      }),
    ]);

    render(await renderPage("gio-ponti"));

    expect(screen.queryByText("Dead")).not.toBeInTheDocument();
  });

  it("omits the Born banner item when the designer has no birth date", async () => {
    setupMedusa([buildDesigner()]);

    render(await renderPage("gio-ponti"));

    expect(screen.queryByText("Born")).not.toBeInTheDocument();
    expect(screen.queryByText("Dead")).not.toBeInTheDocument();
  });

  it("calls notFound() when the designer slug does not exist", async () => {
    setupMedusa([buildDesigner()]);

    await expect(renderPage("unknown-designer")).rejects.toThrow(notFoundSentinel);
    expect(mockNotFound).toHaveBeenCalled();
  });
});
