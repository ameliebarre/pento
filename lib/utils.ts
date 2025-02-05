import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Convert Prisma object into a regular JS object
 */
export function convertToPlainObject<T>(value: T) {
  return JSON.parse(JSON.stringify(value));
}
