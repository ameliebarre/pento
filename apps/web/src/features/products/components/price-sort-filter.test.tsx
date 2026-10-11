// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const pushMock = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

import { PriceSortFilter } from "@/features/products/components/price-sort-filter";
import { FiltersNavigationProvider } from "@/features/products/components/filters-navigation";
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

function renderWithProvider(ui: React.ReactElement) {
  pushMock.mockClear();
  return render(<FiltersNavigationProvider>{ui}</FiltersNavigationProvider>);
}

describe("PriceSortFilter", () => {
  it("shows both sort options as radio buttons", () => {
    renderWithProvider(<PriceSortFilter filters={filters()} />);

    expect(screen.getByRole("radio", { name: "Prix : - au +" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Prix : + au -" })).toBeInTheDocument();
  });

  it("checks neither option when no sort is active", () => {
    renderWithProvider(<PriceSortFilter filters={filters()} />);

    expect(screen.getByRole("radio", { name: "Prix : - au +" })).not.toBeChecked();
    expect(screen.getByRole("radio", { name: "Prix : + au -" })).not.toBeChecked();
  });

  it("checks the active sort option", () => {
    renderWithProvider(<PriceSortFilter filters={filters({ sort: "price-asc" })} />);

    expect(screen.getByRole("radio", { name: "Prix : - au +" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Prix : + au -" })).not.toBeChecked();
  });

  it("navigates to ascending sort, keeping an already-selected category", async () => {
    const user = userEvent.setup();
    renderWithProvider(<PriceSortFilter filters={filters({ categories: ["chairs"] })} />);

    await user.click(screen.getByRole("radio", { name: "Prix : - au +" }));

    expect(pushMock).toHaveBeenCalledWith("/products?category=chairs&sort=price-asc&showFilters=1", {
      scroll: false,
    });
  });

  it("navigates to descending sort when the other option is chosen", async () => {
    const user = userEvent.setup();
    renderWithProvider(<PriceSortFilter filters={filters({ sort: "price-asc" })} />);

    await user.click(screen.getByRole("radio", { name: "Prix : + au -" }));

    expect(pushMock).toHaveBeenCalledWith("/products?sort=price-desc&showFilters=1", {
      scroll: false,
    });
  });

  it("does not show a reset button when no sort is active", () => {
    renderWithProvider(<PriceSortFilter filters={filters()} />);

    expect(screen.queryByRole("button", { name: "Réinitialiser" })).not.toBeInTheDocument();
  });

  it("resets only the sort, keeping the category filter untouched", async () => {
    renderWithProvider(
      <PriceSortFilter filters={filters({ categories: ["chairs"], sort: "price-asc" })} />,
    );

    await userEvent.click(screen.getByRole("button", { name: "Réinitialiser" }));
    expect(pushMock).toHaveBeenCalledWith("/products?category=chairs&showFilters=1", {
      scroll: false,
    });
  });
});
