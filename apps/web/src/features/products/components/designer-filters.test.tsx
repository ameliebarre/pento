// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const pushMock = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

import { DesignerFilters } from "@/features/products/components/designer-filters";
import { FiltersNavigationProvider } from "@/features/products/components/filters-navigation";
import type { ProductFilters } from "@/features/products/types";

const DESIGNERS = [
  { id: "des_1", slug: "hans-j-wegner", first_name: "Hans J.", last_name: "Wegner" },
  { id: "des_2", slug: "arne-jacobsen", first_name: "Arne", last_name: "Jacobsen" },
];

const MANY_DESIGNERS = Array.from({ length: 8 }, (_, index) => ({
  id: `des_${index}`,
  slug: `designer-${index}`,
  first_name: "Designer",
  last_name: String(index),
}));

function filters(overrides: Partial<ProductFilters> = {}): ProductFilters {
  return { categories: [], designers: [], materials: [], movements: [], minPrice: null, maxPrice: null, sort: null, ...overrides };
}

function renderWithProvider(ui: React.ReactElement) {
  pushMock.mockClear();
  return render(<FiltersNavigationProvider>{ui}</FiltersNavigationProvider>);
}

describe("DesignerFilters", () => {
  it("renders nothing when there are no designers", () => {
    const { container } = renderWithProvider(<DesignerFilters designers={[]} filters={filters()} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("shows each designer's full name as a checkbox", () => {
    renderWithProvider(<DesignerFilters designers={DESIGNERS} filters={filters()} />);

    expect(screen.getByRole("checkbox", { name: "Hans J. Wegner" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Arne Jacobsen" })).toBeInTheDocument();
  });

  it("checks the box for an already-selected designer", () => {
    renderWithProvider(
      <DesignerFilters designers={DESIGNERS} filters={filters({ designers: ["hans-j-wegner"] })} />,
    );

    expect(screen.getByRole("checkbox", { name: "Hans J. Wegner" })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: "Arne Jacobsen" })).not.toBeChecked();
  });

  it("navigates to add a designer, keeping an already-selected category", async () => {
    const user = userEvent.setup();
    renderWithProvider(
      <DesignerFilters designers={DESIGNERS} filters={filters({ categories: ["chairs"] })} />,
    );

    await user.click(screen.getByRole("checkbox", { name: "Hans J. Wegner" }));

    expect(pushMock).toHaveBeenCalledWith(
      "/products?category=chairs&designer=hans-j-wegner&showFilters=1",
      { scroll: false },
    );
  });

  it("navigates to remove an already-selected designer", async () => {
    const user = userEvent.setup();
    renderWithProvider(
      <DesignerFilters designers={DESIGNERS} filters={filters({ designers: ["hans-j-wegner"] })} />,
    );

    await user.click(screen.getByRole("checkbox", { name: "Hans J. Wegner" }));

    expect(pushMock).toHaveBeenCalledWith("/products?showFilters=1", { scroll: false });
  });

  it("filters the list as the user types in the search box", async () => {
    const user = userEvent.setup();
    renderWithProvider(<DesignerFilters designers={DESIGNERS} filters={filters()} />);

    await user.type(screen.getByRole("searchbox", { name: "Rechercher un designer" }), "Wegner");

    expect(screen.getByRole("checkbox", { name: "Hans J. Wegner" })).toBeInTheDocument();
    expect(screen.queryByRole("checkbox", { name: "Arne Jacobsen" })).not.toBeInTheDocument();
  });

  it("shows an empty state when the search matches no designer", async () => {
    const user = userEvent.setup();
    renderWithProvider(<DesignerFilters designers={DESIGNERS} filters={filters()} />);

    await user.type(screen.getByRole("searchbox", { name: "Rechercher un designer" }), "zzz");

    expect(screen.getByText("Aucun designer trouvé.")).toBeInTheDocument();
  });

  it("only shows the first designers with a 'Voir plus' button beyond the visible count", () => {
    renderWithProvider(<DesignerFilters designers={MANY_DESIGNERS} filters={filters()} />);

    expect(screen.getAllByRole("checkbox")).toHaveLength(6);
    expect(screen.getByRole("button", { name: "Voir plus" })).toBeInTheDocument();
  });

  it("reveals the rest of the list when clicking 'Voir plus'", async () => {
    const user = userEvent.setup();
    renderWithProvider(<DesignerFilters designers={MANY_DESIGNERS} filters={filters()} />);

    await user.click(screen.getByRole("button", { name: "Voir plus" }));

    expect(screen.getAllByRole("checkbox")).toHaveLength(8);
    expect(screen.getByRole("button", { name: "Voir moins" })).toBeInTheDocument();
  });

  it("starts expanded when a selected designer is past the visible count", () => {
    const selectedSlug = MANY_DESIGNERS[7].slug;

    renderWithProvider(
      <DesignerFilters designers={MANY_DESIGNERS} filters={filters({ designers: [selectedSlug] })} />,
    );

    expect(screen.getAllByRole("checkbox")).toHaveLength(8);
    expect(screen.getByRole("checkbox", { name: "Designer 7" })).toBeChecked();
    expect(screen.getByRole("button", { name: "Voir moins" })).toBeInTheDocument();
  });

  it("does not show a reset button when no designer is selected", () => {
    renderWithProvider(<DesignerFilters designers={DESIGNERS} filters={filters()} />);

    expect(screen.queryByRole("button", { name: "Réinitialiser" })).not.toBeInTheDocument();
  });

  it("resets only the designer filter, keeping the category filter untouched", async () => {
    renderWithProvider(
      <DesignerFilters
        designers={DESIGNERS}
        filters={filters({ categories: ["chairs"], designers: ["hans-j-wegner"] })}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "Réinitialiser" }));
    expect(pushMock).toHaveBeenCalledWith("/products?category=chairs&showFilters=1", {
      scroll: false,
    });
  });
});
