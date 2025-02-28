'use client';
import { useActionState, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { signInDefaultValues } from '@/lib/constants';
import { signInUser } from '@/lib/actions/user.actions';
import { FieldError } from '@/components/shared/field-error';
import { EMPTY_FORM_STATE } from '@/types';

const CredentialsSignInForm = () => {
  const [formState, action, isPending] = useActionState(
    signInUser,
    EMPTY_FORM_STATE
  );

  const [formData, setFormData] = useState({
    email: signInDefaultValues.email,
    password: signInDefaultValues.password,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const SignInButton = () => (
    <Button
      disabled={isPending}
      className='uppercase w-full font-medium tracking-wide'
      variant='default'
    >
      {isPending ? 'Signing In...' : 'Sign In'}
    </Button>
  );

  return (
    <form action={action}>
      <input type='hidden' name='callbackUrl' value={callbackUrl} />
      <div className='flex-1'></div>
      <div className='space-y-6'>
        <div>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            name='email'
            type='email'
            required
            autoComplete='email'
            className='focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 mt-2'
            value={formData.email}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className='flex flex-col gap-y-2'>
          <Label htmlFor='password'>Password</Label>
          <Input
            id='password'
            name='password'
            type='password'
            required
            autoComplete='password'
            className='focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2'
            value={formData.password}
            onChange={(e) => handleChange(e)}
          />
          <span className='text-sm'>
            Forgotten your password?{' '}
            <Link href='/' className='underline underline-offset-4'>
              Reset it now
            </Link>
          </span>
        </div>
        <div>
          <SignInButton />
        </div>
        <div className='text-center'>
          <FieldError formState={formState} name='unknownError' />
          <FieldError formState={formState} name='credentials' />
        </div>
        <p className='text-center'>
          Don&apos;t have an account ?{' '}
          <Link
            href='/sign-up'
            target='_self'
            className='underline underline-offset-4'
          >
            Sign Up
          </Link>
        </p>
      </div>
    </form>
  );
};

export default CredentialsSignInForm;
