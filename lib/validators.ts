import { z } from 'zod';
import { formatNumberWithDecimal } from './utils';

const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    'Price must have exactly 2 decimal places'
  );

export const insertProductSchema = z.object({
  name: z.string().min(5, 'Name must be at least 5 characters'),
  slug: z.string().min(5, 'Slug must be at least 5 characters'),
  brand: z.string().min(5, 'Brand must be at least 5 characters'),
  description: z.string().min(5, 'Description must be at least 5 characters'),
  stock: z.coerce.number(),
  image: z.string().min(1, 'Product must have at least one image'),
  isFeatured: z.boolean(),
  price: currency,
  authorImage: z.string(),
  authorImageLink: z.string(),
});

export const insertCategorySchema = z.object({
  name: z.string().min(5, 'Name must be at least 5 characters'),
  slug: z.string().min(5, 'Slug must be at least 5 characters'),
  image: z.string().min(1, 'Category must have at least one image'),
  authorImage: z.string(),
  authorImageLink: z.string(),
});

export const signInFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string(),
});

export const signUpFormSchema = z
  .object({
    name: z.string().min(5, 'Name must be at least 5 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: `Passwords don't match`,
    path: ['confirmPassword'],
  });

export const cartItemSchema = z.object({
  productId: z.string().min(1, 'Product is required'),
  name: z.number().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  quantity: z.number().int().nonnegative('Quantity must be a positive number'),
  image: z.string().min(1, 'Image is required'),
  price: currency,
});

export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  sessionCartId: z.string().min(1, 'Session cart ID is required'),
  userId: z.string().optional().nullable(),
});
