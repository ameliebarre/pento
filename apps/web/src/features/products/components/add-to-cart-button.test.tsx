// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const useCartDrawerMock = vi.fn();

vi.mock("@/features/cart/components/cart-drawer-provider", () => ({
  useCartDrawer: () => useCartDrawerMock(),
}));

import { AddToCartButton } from "@/features/products/components/add-to-cart-button";

describe("AddToCartButton", () => {
  it("adds the variant to the cart when clicked", async () => {
    const addToCart = vi.fn();
    useCartDrawerMock.mockReturnValue({ addToCart, pendingVariantId: null });

    const user = userEvent.setup();
    render(<AddToCartButton variantId="variant_1" />);

    await user.click(screen.getByRole("button", { name: "Ajouter au panier" }));

    expect(addToCart).toHaveBeenCalledWith("variant_1");
  });

  it("disables the button while its own mutation is pending", () => {
    useCartDrawerMock.mockReturnValue({ addToCart: vi.fn(), pendingVariantId: "variant_1" });

    render(<AddToCartButton variantId="variant_1" />);

    expect(screen.getByRole("button", { name: "Ajouter au panier" })).toBeDisabled();
  });

  it("does not disable the button while a different variant is being added", () => {
    useCartDrawerMock.mockReturnValue({ addToCart: vi.fn(), pendingVariantId: "variant_2" });

    render(<AddToCartButton variantId="variant_1" />);

    expect(screen.getByRole("button", { name: "Ajouter au panier" })).not.toBeDisabled();
  });
});
