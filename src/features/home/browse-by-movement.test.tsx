// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { BrowseByMovement } from "@/features/home/browse-by-movement";
import { prisma } from "@/lib/prisma";

describe("BrowseByMovement", () => {
  it("renders the heading and a link to view all movements", async () => {
    render(await BrowseByMovement());

    expect(screen.getByRole("heading", { name: "Browse by movement" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view all movements/i })).toHaveAttribute(
      "href",
      "/products",
    );
  });

  it("shows a fallback icon when a movement has no cover image", async () => {
    await prisma.movement.create({
      data: { slug: "no-cover", name: "Sans Image", description: "desc" },
    });

    render(await BrowseByMovement());

    expect(screen.getByText("Aucune image disponible pour Sans Image")).toBeInTheDocument();
  });

  it("keeps the piece count singular for 0 and 1 product", async () => {
    await prisma.movement.create({
      data: { slug: "zero-products", name: "Zero Produit", description: "desc" },
    });
    const oneProduct = await prisma.movement.create({
      data: { slug: "one-product", name: "Un Produit", description: "desc" },
    });
    await prisma.product.create({
      data: {
        name: "Seul produit",
        slug: "movement-single-product",
        description: "desc",
        price: 100,
        movementId: oneProduct.id,
      },
    });

    render(await BrowseByMovement());

    const zeroCard = screen.getByText("Zero Produit").closest("li");
    const oneCard = screen.getByText("Un Produit").closest("li");
    expect(zeroCard).toHaveTextContent("0 pièce");
    expect(zeroCard).not.toHaveTextContent("0 pièces");
    expect(oneCard).toHaveTextContent("1 pièce");
    expect(oneCard).not.toHaveTextContent("1 pièces");
  });

  it("pluralizes the piece count once there is more than one product", async () => {
    const movement = await prisma.movement.create({
      data: { slug: "many-products", name: "Plusieurs Produits", description: "desc" },
    });
    await prisma.product.create({
      data: { name: "P1", slug: "movement-multi-1", description: "desc", price: 100, movementId: movement.id },
    });
    await prisma.product.create({
      data: { name: "P2", slug: "movement-multi-2", description: "desc", price: 100, movementId: movement.id },
    });

    render(await BrowseByMovement());

    expect(screen.getByText("Plusieurs Produits").closest("li")).toHaveTextContent("2 pièces");
  });

  it("orders movements alphabetically by name", async () => {
    await prisma.movement.create({ data: { slug: "z-move", name: "Zed Movement", description: "d" } });
    await prisma.movement.create({ data: { slug: "a-move", name: "Alpha Movement", description: "d" } });

    render(await BrowseByMovement());

    const headings = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    expect(headings.indexOf("Alpha Movement")).toBeLessThan(headings.indexOf("Zed Movement"));
  });
});
