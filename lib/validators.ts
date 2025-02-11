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
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
