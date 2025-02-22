'use server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { Prisma } from '@prisma/client';
import { CartItem } from '@/types';
import { auth } from '@/auth';
import { prisma } from '@/db/prisma';
import { CartWithFormattedPrices } from '@/types';
import { convertToPlainObject, roundTo2Decimals } from '../utils';
import { cartItemSchema, insertCartSchema } from '../validators';

// Calculate cart price
const calculateCartPrice = (items: CartItem[]) => {
  const itemsPrice = roundTo2Decimals(
    items.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0)
  );
  const shippingPrice = roundTo2Decimals(itemsPrice > 250 ? 0 : 10);
  const taxPrice = roundTo2Decimals(0.15 * itemsPrice);
  const totalPrice = roundTo2Decimals(itemsPrice + shippingPrice + taxPrice);

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};

export async function addItemToCart(productItem: CartItem) {
  try {
    const sessionCartId = (await cookies()).get('sessionCartId')?.value;
    if (!sessionCartId) throw new Error('Cart session not found');

    const session = await auth();
    if (!session) throw new Error('User not authenticated');

    const userId = session.user?.id as string | undefined;
    const cart = await getMyCart();
    const addedProduct = cartItemSchema.parse(productItem);

    // Find product in database
    const product = await prisma.product.findUnique({
      where: { id: addedProduct.productId },
    });
    if (!product) throw new Error('Product not found');

    if (!cart) {
      const newCart = insertCartSchema.parse({
        userId,
        items: [addedProduct],
        sessionCartId,
        ...calculateCartPrice([addedProduct]),
      });

      await prisma.cart.create({ data: newCart });

      revalidatePath(`/product/${product.slug}`);
      return {
        success: true,
        message: 'Product was successfully added to cart',
      };
    }

    if (!cart) {
      // Create a new cart
      const newCart = insertCartSchema.parse({
        userId,
        items: [addedProduct],
        sessionCartId,
        ...calculateCartPrice([addedProduct]),
      });

      await prisma.cart.create({ data: newCart });

      revalidatePath(`/product/${product.slug}`);

      return {
        success: true,
        message: 'Product was successfully added to cart',
      };
    }
    // If we reach here, cart already exists → Proceed with updating
    const productInCart = cart.items.find(
      (item) => item.productId === addedProduct.productId
    );

    let updatedItems = cart.items;

    if (productInCart) {
      if (product.stock < productInCart.quantity + 1)
        throw new Error('Not enough stock');

      updatedItems = cart.items.map((item) =>
        item.productId === addedProduct.productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      if (product.stock < 1) throw new Error('Not enough stock');
      updatedItems = [...cart.items, addedProduct];
    }

    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: updatedItems as Prisma.InputJsonValue[],
        ...calculateCartPrice(updatedItems),
      },
    });

    revalidatePath(`/product/${product.slug}`);

    return {
      success: true,
      message: `${product.name} is now in your cart.`,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'An error occurred while adding the product to the cart',
    };
  }
}

export async function getMyCart(): Promise<
  CartWithFormattedPrices | undefined
> {
  const sessionCartId = (await cookies()).get('sessionCartId')?.value;

  if (!sessionCartId) {
    throw new Error('Cart session not found');
  }

  let userId: string | undefined;
  const session = await auth();

  if (session?.user?.id) {
    userId = session.user.id;
  }

  const cart = await prisma.cart.findFirst({
    where: userId ? { userId } : { sessionCartId },
  });

  if (!cart) return undefined;

  return convertToPlainObject({
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  });
}

export async function removeItemFromCart(productId: string) {
  try {
    const sessionCartId = (await cookies()).get('sessionCartId')?.value;
    if (!sessionCartId) throw new Error('Cart session not found');

    // Get the user's cart
    const cart = await getMyCart();
    if (!cart) {
      throw new Error('Cart not found');
    }

    // Find the product in cart
    const cartItem = cart.items.find((item) => item.productId === productId);
    if (!cartItem) throw new Error('Product not found in the cart');

    // Update cart items: remove or decrement quantity
    const updatedItems =
      cartItem.quantity === 1
        ? cart.items.filter((item) => item.productId !== productId) // Remove if quantity is 1
        : cart.items.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity - 1 } // Reduce quantity
              : item
          );

    // Update cart in database
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: updatedItems,
        ...calculateCartPrice(updatedItems),
      },
    });

    revalidatePath('/cart');

    return {
      success: true,
      message: `${cartItem.name} was successfully removed from the cart`,
    };
  } catch (error) {
    console.error('Error removing item from cart:', error);
    return {
      success: false,
      message: 'An error occurred while removing the item from the cart',
    };
  }
}
