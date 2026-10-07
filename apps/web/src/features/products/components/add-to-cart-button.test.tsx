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
  it("adds the product to the cart when clicked", async () => {
    const addToCart = vi.fn();
    useCartDrawerMock.mockReturnValue({ addToCart, pendingProductId: null });

    const user = userEvent.setup();
    render(<AddToCartButton productId="product_1" />);

    await user.click(screen.getByRole("button", { name: "Ajouter au panier" }));

    expect(addToCart).toHaveBeenCalledWith("product_1");
  });

  it("disables the button while its own mutation is pending", () => {
    useCartDrawerMock.mockReturnValue({ addToCart: vi.fn(), pendingProductId: "product_1" });

    render(<AddToCartButton productId="product_1" />);

    expect(screen.getByRole("button", { name: "Ajouter au panier" })).toBeDisabled();
  });

  it("does not disable the button while a different product is being added", () => {
    useCartDrawerMock.mockReturnValue({ addToCart: vi.fn(), pendingProductId: "product_2" });

    render(<AddToCartButton productId="product_1" />);

    expect(screen.getByRole("button", { name: "Ajouter au panier" })).not.toBeDisabled();
  });
});
