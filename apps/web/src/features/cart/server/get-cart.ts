"use server";

import { prisma } from "@/lib/prisma";
import { getCartToken } from "@/actions/cart";

export type CartData = {
  items: {
    id: string;
    quantity: number;
    product: {
      id: string;
      slug: string;
      name: string;
      price: number;
      currency: string;
      image: { url: string; alt: string } | null;
    };
  }[];
};

export async function getCart(): Promise<CartData> {
  const token = await getCartToken();

  if (!token) {
    return { items: [] };
  }

  const cart = await prisma.cart.findUnique({
    where: { token },
    include: {
      items: {
        include: {
          product: {
            include: {
              images: { take: 1, orderBy: { createdAt: "asc" } },
            },
          },
        },
      },
    },
  });

  return {
    items: (cart?.items ?? []).map((item) => ({
      id: item.id,
      quantity: item.quantity,
      product: {
        id: item.product.id,
        slug: item.product.slug,
        name: item.product.name,
        price: item.product.price.toNumber(),
        currency: item.product.currency,
        image: item.product.images[0]
          ? { url: item.product.images[0].url, alt: item.product.images[0].alt }
          : null,
      },
    })),
  };
}
