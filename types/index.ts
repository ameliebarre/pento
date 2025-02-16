import { z } from 'zod';
import { insertProductSchema, insertCategorySchema } from '@/lib/validators';

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
  createdAt: Date;
};

export type Category = z.infer<typeof insertCategorySchema> & {
  id: string;
  createdAt: Date;
};

export type FormState = {
  status: 'ERROR' | 'SUCCESS' | 'UNSET';
  message: string;
  fieldErrors: Record<string, string[]>;
  timestamp: number;
};

export const EMPTY_FORM_STATE: FormState = {
  status: 'UNSET',
  message: '',
  fieldErrors: {},
  timestamp: Date.now(),
};
