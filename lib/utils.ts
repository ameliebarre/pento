import { Prisma } from '@prisma/client';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ZodError } from 'zod';

type ErrorResponse = {
  status: 'ERROR';
  message: string;
  fieldErrors: Record<string, string[]>;
  timestamp: number;
};

type AuthError = {
  type: string;
};

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
 * Handles Zod validation errors.
 */
function handleZodError(error: ZodError): ErrorResponse {
  return {
    status: 'ERROR',
    message: '',
    fieldErrors: error.flatten().fieldErrors as Record<string, string[]>,
    timestamp: Date.now(),
  };
}

/**
 * Handles known Prisma errors.
 */
function handlePrismaError(
  error: Prisma.PrismaClientKnownRequestError
): ErrorResponse {
  if (error.code === 'P2002') {
    return {
      status: 'ERROR',
      message: 'A user with this email already exists.',
      fieldErrors: {
        email: ['It seems this email is already taken. Try to sign instead.'],
      },
      timestamp: Date.now(),
    };
  }

  return handleUnknownError();
}

/**
 * Handles authentication errors (e.g., from NextAuth).
 */
function handleAuthError(error: unknown): ErrorResponse {
  const errorMessages: Record<string, string> = {
    CredentialsSignin:
      'The email or password you entered is incorrect. Please try again.',
    AccessDenied:
      'You do not have permission to access this account. Try with another one.',
    OAuthAccountNotLinked:
      'This email is linked to another sign-in method. Use the correct provider.',
    MissingCredentials: 'Please enter both email and password.',
    Verification:
      'Your verification link has expired. Please request a new one.',
  };

  if (typeof error === 'object' && error !== null && 'type' in error) {
    const authError = error as AuthError;
    if (authError.type in errorMessages) {
      return {
        status: 'ERROR',
        message: errorMessages[authError.type],
        fieldErrors: { credentials: [errorMessages[authError.type]] },
        timestamp: Date.now(),
      };
    }
  }

  return handleUnknownError();
}

/**
 * Handles unknown errors.
 */
function handleUnknownError(): ErrorResponse {
  return {
    status: 'ERROR',
    message: 'An unknown error occurred',
    fieldErrors: {
      unknownError: [
        'It seems like there was an error. Please try again later.',
      ],
    },
    timestamp: Date.now(),
  };
}

/**
 * Main function to format error messages.
 */
export async function formatErrorMessage(
  error: unknown
): Promise<ErrorResponse> {
  console.log('ERROR !!!', error);
  if (error instanceof Error) {
    return handleAuthError(error);
  }

  if (error instanceof ZodError) {
    return handleZodError(error);
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return handlePrismaError(error);
  }

  return handleUnknownError();
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
