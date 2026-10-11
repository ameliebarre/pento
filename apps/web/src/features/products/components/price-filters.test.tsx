// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const pushMock = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

import { PriceFilters } from "@/features/products/components/price-filters";
import { FiltersNavigationProvider } from "@/features/products/components/filters-navigation";
import type { ProductFilters } from "@/features/products/types";

const BOUNDS = { min: 0, max: 1000 };

function filters(overrides: Partial<ProductFilters> = {}): ProductFilters {
  return { categories: [], designers: [], materials: [], movements: [], minPrice: null, maxPrice: null, sort: null, ...overrides };
}

function renderWithProvider(ui: React.ReactElement) {
  pushMock.mockClear();
  return render(<FiltersNavigationProvider>{ui}</FiltersNavigationProvider>);
}

describe("PriceFilters", () => {
  it("renders nothing when the catalog has no price range", () => {
    const { container } = renderWithProvider(
      <PriceFilters bounds={{ min: 0, max: 0 }} filters={filters()} />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("shows the catalog bounds as the initial min and max values", () => {
    renderWithProvider(<PriceFilters bounds={BOUNDS} filters={filters()} />);

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
    renderWithProvider(
      <PriceFilters bounds={BOUNDS} filters={filters({ minPrice: 200, maxPrice: 800 })} />,
    );

    expect(screen.getByRole("slider", { name: "Prix minimum" })).toHaveAttribute(
      "aria-valuenow",
      "200",
    );
    expect(screen.getByRole("slider", { name: "Prix maximum" })).toHaveAttribute(
      "aria-valuenow",
      "800",
    );
  });

  it("does not show a reset button when no price filter is active", () => {
    renderWithProvider(<PriceFilters bounds={BOUNDS} filters={filters()} />);

    expect(screen.queryByRole("button", { name: "Réinitialiser" })).not.toBeInTheDocument();
  });

  it("shows a reset button clearing only the price filter when active", async () => {
    renderWithProvider(
      <PriceFilters
        bounds={BOUNDS}
        filters={filters({ categories: ["chairs"], minPrice: 200, maxPrice: 800 })}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "Réinitialiser" }));
    expect(pushMock).toHaveBeenCalledWith("/products?category=chairs&showFilters=1", {
      scroll: false,
    });
  });

  it("moves the min thumb with the keyboard and updates its value", async () => {
    const user = userEvent.setup();
    renderWithProvider(<PriceFilters bounds={BOUNDS} filters={filters()} />);

    const minThumb = screen.getByRole("slider", { name: "Prix minimum" });
    minThumb.focus();
    await user.keyboard("{ArrowRight}");

    expect(minThumb).toHaveAttribute("aria-valuenow", "10");
  });

  it("navigates with the new range once a keyboard change commits, keeping other filters", async () => {
    const user = userEvent.setup();
    renderWithProvider(<PriceFilters bounds={BOUNDS} filters={filters({ categories: ["chairs"] })} />);

    const minThumb = screen.getByRole("slider", { name: "Prix minimum" });
    minThumb.focus();
    await user.keyboard("{ArrowRight}");

    expect(pushMock).toHaveBeenCalledWith(
      "/products?category=chairs&minPrice=10&maxPrice=1000&showFilters=1",
      { scroll: false },
    );
  });
});
