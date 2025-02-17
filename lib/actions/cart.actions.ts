'use server';
import { CartItem } from '@/types';

export async function addItemToCart(productItem: CartItem) {
  console.log(productItem);
  return {
    success: true,
    message: 'Item added to cart',
  };
}
