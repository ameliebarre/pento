// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { PriceFilters } from "@/features/products/components/price-filters";
import type { ProductFilters } from "@/features/products/types";

const BOUNDS = { min: 0, max: 1000 };

function filters(overrides: Partial<ProductFilters> = {}): ProductFilters {
  return { categories: [], designers: [], materials: [], minPrice: null, maxPrice: null, ...overrides };
}

let location: { href: string };

beforeEach(() => {
  // Committing a new price range navigates via `location.href =`, not
  // next/link — see designer-filters.test.tsx for why.
  location = { href: "" };
  vi.stubGlobal("location", location);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("PriceFilters", () => {
  it("renders nothing when the catalog has no price range", () => {
    const { container } = render(<PriceFilters bounds={{ min: 0, max: 0 }} filters={filters()} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("shows the catalog bounds as the initial min and max values", () => {
    render(<PriceFilters bounds={BOUNDS} filters={filters()} />);

    expect(screen.getByRole("slider", { name: "Prix minimum" })).toHaveAttribute(
      "aria-valuenow",
      "0",
    );
    expect(screen.getByRole("slider", { name: "Prix maximum" })).toHaveAttribute(
      "aria-valuenow",
      "1000",
    );
  });

  it("shows the active filter's values instead of the catalog bounds", () => {
    render(<PriceFilters bounds={BOUNDS} filters={filters({ minPrice: 200, maxPrice: 800 })} />);

    expect(screen.getByRole("slider", { name: "Prix minimum" })).toHaveAttribute(
      "aria-valuenow",
      "200",
    );
    expect(screen.getByRole("slider", { name: "Prix maximum" })).toHaveAttribute(
      "aria-valuenow",
      "800",
    );
  });

  it("does not show a reset link when no price filter is active", () => {
    render(<PriceFilters bounds={BOUNDS} filters={filters()} />);

    expect(screen.queryByRole("link", { name: "Réinitialiser" })).not.toBeInTheDocument();
  });

  it("shows a reset link clearing only the price filter when active", () => {
    render(
      <PriceFilters
        bounds={BOUNDS}
        filters={filters({ categories: ["chairs"], minPrice: 200, maxPrice: 800 })}
      />,
    );

    expect(screen.getByRole("link", { name: "Réinitialiser" })).toHaveAttribute(
      "href",
      "/products?category=chairs",
    );
  });

  it("moves the min thumb with the keyboard and updates its value", async () => {
    const user = userEvent.setup();
    render(<PriceFilters bounds={BOUNDS} filters={filters()} />);

    const minThumb = screen.getByRole("slider", { name: "Prix minimum" });
    minThumb.focus();
    await user.keyboard("{ArrowRight}");

    expect(minThumb).toHaveAttribute("aria-valuenow", "10");
  });

  it("navigates with the new range once a keyboard change commits, keeping other filters", async () => {
    const user = userEvent.setup();
    render(<PriceFilters bounds={BOUNDS} filters={filters({ categories: ["chairs"] })} />);

    const minThumb = screen.getByRole("slider", { name: "Prix minimum" });
    minThumb.focus();
    await user.keyboard("{ArrowRight}");

    expect(location.href).toBe("/products?category=chairs&minPrice=10&maxPrice=1000");
  });
});
