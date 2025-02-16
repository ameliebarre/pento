'use server';

import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { hashSync } from 'bcrypt-ts-edge';
import { signIn, signOut, auth } from '@/auth';
import { signInFormSchema, signUpFormSchema } from '../validators';
import { prisma } from '@/db/prisma';
import { FormState } from '@/types';
import { fromErrorToFormState, toFormState } from '../utils';

export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    await signIn('credentials', user);

    return toFormState('SUCCESS', 'Signed in successfully !');
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return fromErrorToFormState(error);
  }
}

export async function signOutUser() {
  await signOut();
}

export async function signUpUser(formState: FormState, formData: FormData) {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    });

    const plainPassword = user.password;

    user.password = hashSync(user.password);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    await signIn('credentials', {
      email: user.email,
      password: plainPassword,
    });

    return toFormState('SUCCESS', 'User created successfully');
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return fromErrorToFormState(error);
  }
}

export const getSession = async () => {
  return await auth();
};
