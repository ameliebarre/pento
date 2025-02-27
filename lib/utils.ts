import { Prisma } from '@prisma/client';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ZodError } from 'zod';

/**
 * Merge class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Convert Prisma object into a regular JS object
 */
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

/**
 * Format number with decimal places
 */
export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split('.');

  return decimal ? `${int}.${decimal.padEnd(2, '0')}` : `${int}.00`;
}

/**
 * Format errors
 */
export async function formatErrorMessage(error: unknown) {
  if (error instanceof ZodError) {
    return {
      status: 'ERROR' as const,
      message: '',
      fieldErrors: error.flatten().fieldErrors,
      timestamp: Date.now(),
    };
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return {
        status: 'ERROR' as const,
        message: 'A user with this email already exists.',
        fieldErrors: { email: ['Email is already taken'] }, // Attach error to the email field
        timestamp: Date.now(),
      };
    } else {
      return {
        status: 'ERROR' as const,
        message: `Database error: ${error.message}`,
        fieldErrors: {
          unknownErrors: [
            'It seems like there was an error. Please try again later.',
          ],
        },
        timestamp: Date.now(),
      };
    }
  }

  return {
    status: 'ERROR' as const,
    message: 'An unknown error occurred',
    fieldErrors: {
      unknownError: [
        'It seems like there was an error. Please try again later.',
      ],
    },
    timestamp: Date.now(),
  };
}

export function returnErrorMessage(
  status: 'SUCCESS' | 'ERROR',
  message: string
) {
  return {
    status,
    message,
    fieldErrors: {},
    timestamp: Date.now(),
  };
}

/**
 * Round number to 2 decimal places
 */
export function roundTo2Decimals(value: number | string) {
  if (typeof value === 'number') {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  } else if (typeof value === 'string') {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  } else {
    throw new Error('Value is not a number or a string');
  }
}
