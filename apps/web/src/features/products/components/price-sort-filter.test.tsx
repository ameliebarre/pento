// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { PriceSortFilter } from "@/features/products/components/price-sort-filter";
import type { ProductFilters } from "@/features/products/types";

function filters(overrides: Partial<ProductFilters> = {}): ProductFilters {
  return {
    categories: [],
    designers: [],
    materials: [],
    movements: [],
    minPrice: null,
    maxPrice: null,
    sort: null,
    ...overrides,
  };
}

let location: { href: string };

beforeEach(() => {
  // Selecting a radio navigates via `location.href =`, not next/link — see
  // designer-filters.test.tsx for why.
  location = { href: "" };
  vi.stubGlobal("location", location);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("PriceSortFilter", () => {
  it("shows both sort options as radio buttons", () => {
    render(<PriceSortFilter filters={filters()} />);

    expect(screen.getByRole("radio", { name: "Prix : - au +" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Prix : + au -" })).toBeInTheDocument();
  });

  it("checks neither option when no sort is active", () => {
    render(<PriceSortFilter filters={filters()} />);

    expect(screen.getByRole("radio", { name: "Prix : - au +" })).not.toBeChecked();
    expect(screen.getByRole("radio", { name: "Prix : + au -" })).not.toBeChecked();
  });

  it("checks the active sort option", () => {
    render(<PriceSortFilter filters={filters({ sort: "price-asc" })} />);

    expect(screen.getByRole("radio", { name: "Prix : - au +" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Prix : + au -" })).not.toBeChecked();
  });

  it("navigates to ascending sort, keeping an already-selected category", async () => {
    const user = userEvent.setup();
    render(<PriceSortFilter filters={filters({ categories: ["chairs"] })} />);

    await user.click(screen.getByRole("radio", { name: "Prix : - au +" }));

    expect(location.href).toBe("/products?category=chairs&sort=price-asc&showFilters=1");
  });

  it("navigates to descending sort when the other option is chosen", async () => {
    const user = userEvent.setup();
    render(<PriceSortFilter filters={filters({ sort: "price-asc" })} />);

    await user.click(screen.getByRole("radio", { name: "Prix : + au -" }));

    expect(location.href).toBe("/products?sort=price-desc&showFilters=1");
  });

  it("does not show a reset link when no sort is active", () => {
    render(<PriceSortFilter filters={filters()} />);

    expect(screen.queryByRole("link", { name: "Réinitialiser" })).not.toBeInTheDocument();
  });

  it("resets only the sort, keeping the category filter untouched", () => {
    render(<PriceSortFilter filters={filters({ categories: ["chairs"], sort: "price-asc" })} />);

    expect(screen.getByRole("link", { name: "Réinitialiser" })).toHaveAttribute(
      "href",
      "/products?category=chairs&showFilters=1",
    );
  });
});
