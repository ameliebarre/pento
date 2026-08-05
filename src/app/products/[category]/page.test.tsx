// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

const notFoundSentinel = new Error("NEXT_NOT_FOUND");
const mockNotFound = vi.fn(() => {
  throw notFoundSentinel;
});
vi.mock("next/navigation", () => ({
  notFound: () => mockNotFound(),
}));

import CategoryPage from "@/app/products/[category]/page";

describe("CategoryPage", () => {
  it("renders the category label as the heading for a known category", async () => {
    const element = await CategoryPage({ params: Promise.resolve({ category: "armchairs" }) });
    render(element);

    expect(screen.getByRole("heading", { name: "Armchairs" })).toBeInTheDocument();
  });

  it("calls notFound() for an unknown category slug", async () => {
    await expect(
      CategoryPage({ params: Promise.resolve({ category: "not-a-real-category" }) }),
    ).rejects.toThrow(notFoundSentinel);
    expect(mockNotFound).toHaveBeenCalled();
  });
});
