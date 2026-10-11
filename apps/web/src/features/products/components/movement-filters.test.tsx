// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const pushMock = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

import { MovementFilters } from "@/features/products/components/movement-filters";
import { FiltersNavigationProvider } from "@/features/products/components/filters-navigation";
import type { ProductFilters } from "@/features/products/types";

const MOVEMENTS = [
  { id: "mov_1", slug: "bauhaus", name: "Bauhaus" },
  { id: "mov_2", slug: "mid-century", name: "Mid-Century" },
];

const MANY_MOVEMENTS = Array.from({ length: 14 }, (_, index) => ({
  id: `mov_${index}`,
  slug: `movement-${index}`,
  name: `Movement ${index}`,
}));

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

describe("MovementFilters", () => {
  it("renders nothing when there are no movements", () => {
    const { container } = renderWithProvider(<MovementFilters movements={[]} filters={filters()} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("shows each movement's name as a checkbox", () => {
    renderWithProvider(<MovementFilters movements={MOVEMENTS} filters={filters()} />);

    expect(screen.getByRole("checkbox", { name: "Bauhaus" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Mid-Century" })).toBeInTheDocument();
  });

  it("checks the box for an already-selected movement", () => {
    renderWithProvider(
      <MovementFilters movements={MOVEMENTS} filters={filters({ movements: ["bauhaus"] })} />,
    );

    expect(screen.getByRole("checkbox", { name: "Bauhaus" })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: "Mid-Century" })).not.toBeChecked();
  });

  it("navigates to add a movement, keeping an already-selected category", async () => {
    const user = userEvent.setup();
    renderWithProvider(
      <MovementFilters movements={MOVEMENTS} filters={filters({ categories: ["chairs"] })} />,
    );

    await user.click(screen.getByRole("checkbox", { name: "Bauhaus" }));

    expect(pushMock).toHaveBeenCalledWith(
      "/products?category=chairs&movement=bauhaus&showFilters=1",
      { scroll: false },
    );
  });

  it("navigates to remove an already-selected movement", async () => {
    const user = userEvent.setup();
    renderWithProvider(
      <MovementFilters movements={MOVEMENTS} filters={filters({ movements: ["bauhaus"] })} />,
    );

    await user.click(screen.getByRole("checkbox", { name: "Bauhaus" }));

    expect(pushMock).toHaveBeenCalledWith("/products?showFilters=1", { scroll: false });
  });

  it("only shows the first 12 movements with a 'Voir plus' button beyond that", () => {
    renderWithProvider(<MovementFilters movements={MANY_MOVEMENTS} filters={filters()} />);

    expect(screen.getAllByRole("checkbox")).toHaveLength(12);
    expect(screen.getByRole("button", { name: "Voir plus" })).toBeInTheDocument();
  });

  it("reveals the rest of the list when clicking 'Voir plus'", async () => {
    const user = userEvent.setup();
    renderWithProvider(<MovementFilters movements={MANY_MOVEMENTS} filters={filters()} />);

    await user.click(screen.getByRole("button", { name: "Voir plus" }));

    expect(screen.getAllByRole("checkbox")).toHaveLength(14);
    expect(screen.getByRole("button", { name: "Voir moins" })).toBeInTheDocument();
  });

  it("starts expanded when a selected movement is past the visible count", () => {
    const selectedSlug = MANY_MOVEMENTS[13].slug;

    renderWithProvider(
      <MovementFilters
        movements={MANY_MOVEMENTS}
        filters={filters({ movements: [selectedSlug] })}
      />,
    );

    expect(screen.getAllByRole("checkbox")).toHaveLength(14);
    expect(screen.getByRole("checkbox", { name: "Movement 13" })).toBeChecked();
    expect(screen.getByRole("button", { name: "Voir moins" })).toBeInTheDocument();
  });

  it("does not show a reset button when no movement is selected", () => {
    renderWithProvider(<MovementFilters movements={MOVEMENTS} filters={filters()} />);

    expect(screen.queryByRole("button", { name: "Réinitialiser" })).not.toBeInTheDocument();
  });

  it("resets only the movement filter, keeping the category filter untouched", async () => {
    renderWithProvider(
      <MovementFilters
        movements={MOVEMENTS}
        filters={filters({ categories: ["chairs"], movements: ["bauhaus"] })}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "Réinitialiser" }));
    expect(pushMock).toHaveBeenCalledWith("/products?category=chairs&showFilters=1", {
      scroll: false,
    });
  });
});
