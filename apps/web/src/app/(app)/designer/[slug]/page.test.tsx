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

  it("shows the portrait, nationality, and lifespan when set", async () => {
    setupMedusa([
      buildDesigner({
        nationality: "Italienne",
        birth_date: "1891-11-18T00:00:00.000Z",
        death_date: "1979-09-16T00:00:00.000Z",
        image_url: "https://example.com/gio-ponti.jpg",
      }),
    ]);

    render(await renderPage("gio-ponti"));

    expect(screen.getByRole("img", { name: "Portrait de Gio Ponti" })).toBeInTheDocument();
    expect(screen.getByText("Italienne — 1891–1979")).toBeInTheDocument();
  });

  it("shows a fallback when the designer has no portrait", async () => {
    setupMedusa([buildDesigner()]);

    render(await renderPage("gio-ponti"));

    expect(screen.queryByRole("img", { name: /portrait/i })).not.toBeInTheDocument();
    expect(screen.getByText("Aucun portrait disponible pour Gio Ponti")).toBeInTheDocument();
  });

  it("shows the quote and biography when set", async () => {
    setupMedusa([
      buildDesigner({
        quote: "Le design est une synthèse.",
        biography: "Une biographie détaillée.",
      }),
    ]);

    render(await renderPage("gio-ponti"));

    expect(screen.getByText("“Le design est une synthèse.”")).toBeInTheDocument();
    expect(screen.getByText("Une biographie détaillée.")).toBeInTheDocument();
  });

  it("calls notFound() when the designer slug does not exist", async () => {
    setupMedusa([buildDesigner()]);

    await expect(renderPage("unknown-designer")).rejects.toThrow(notFoundSentinel);
    expect(mockNotFound).toHaveBeenCalled();
  });
});
