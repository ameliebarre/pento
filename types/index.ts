import { z } from 'zod';
import {
  insertProductSchema,
  insertCategorySchema,
  cartItemSchema,
  insertCartSchema,
} from '@/lib/validators';

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
  numReviews: number;
  createdAt: Date;
};

export type Category = z.infer<typeof insertCategorySchema> & {
  id: string;
  createdAt?: Date;
};

export type FormState = {
  status: 'ERROR' | 'SUCCESS' | 'UNSET';
  message: string;
  fieldErrors: Record<string, string[]>;
};

export const EMPTY_FORM_STATE: FormState = {
  status: 'UNSET',
  message: '',
  fieldErrors: {},
};

export type Cart = z.infer<typeof insertCartSchema>;

export type CartItem = z.infer<typeof cartItemSchema>;

export type CartWithFormattedPrices = Omit<
  Cart,
  'itemsPrice' | 'totalPrice' | 'shippingPrice' | 'taxPrice'
> & {
  id: string;
  items: CartItem[];
  itemsPrice: string;
  totalPrice: string;
  shippingPrice: string;
  taxPrice: string;
};
