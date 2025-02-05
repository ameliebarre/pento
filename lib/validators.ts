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
  category: z.string().min(5, 'Category must be at least 5 characters'),
  brand: z.string().min(5, 'Brand must be at least 5 characters'),
  description: z.string().min(5, 'Description must be at least 5 characters'),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, 'Product must have at least one image'),
  isFeatured: z.boolean(),
  price: currency,
  authorImage: z.string(),
  authorImageLink: z.string(),
});
