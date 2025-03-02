'use client';
import { useActionState, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { signUpDefaultValues } from '@/lib/constants';
import { signUpUser } from '@/lib/actions/user.actions';
import { FieldError } from '@/components/shared/field-error';
import { EMPTY_FORM_STATE } from '@/types';

const SignUpForm = () => {
  const [formState, action, isPending] = useActionState(
    signUpUser,
    EMPTY_FORM_STATE
  );

  const [formData, setFormData] = useState({
    name: signUpDefaultValues.name,
    email: signUpDefaultValues.email,
    password: signUpDefaultValues.password,
    confirmPassword: signUpDefaultValues.confirmPassword,
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

  const SignUpButton = () => (
    <Button
      disabled={isPending}
      className='uppercase w-full font-medium tracking-wide'
      variant='default'
    >
      {isPending ? 'Submitting...' : 'Sign Up'}
    </Button>
  );

  return (
    <form action={action}>
      <input type='hidden' name='callbackUrl' value={callbackUrl} />
      <div className='flex-1'></div>
      <div className='space-y-6'>
        <div>
          <Label htmlFor='email'>Full name</Label>
          <Input
            id='name'
            name='name'
            type='text'
            autoComplete='email'
            className='focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 mt-2'
            value={formData.name}
            onChange={(e) => handleChange(e)}
          />
          <FieldError formState={formState} name='name' />
        </div>
        <div>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            name='email'
            type='email'
            autoComplete='email'
            className='focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 mt-2'
            value={formData.email}
            onChange={(e) => handleChange(e)}
          />
          <FieldError formState={formState} name='email' />
        </div>
        <div>
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
          <FieldError formState={formState} name='password' />
        </div>
        <div>
          <Label htmlFor='confirmPassword'>Confirm password</Label>
          <Input
            id='confirmPassword'
            name='confirmPassword'
            type='password'
            required
            autoComplete='confirmPassword'
            className='focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2'
            value={formData.confirmPassword}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <SignUpButton />
        </div>
        <div className='text-center pt-2'>
          <FieldError formState={formState} name='unknownError' />
          {formState.status === 'ERROR' ? (
            <FieldError formState={formState} name='customMessage' />
          ) : null}
        </div>
        <p className='text-center'>
          Already have an account ?{' '}
          <Link
            href='/sign-in'
            target='_self'
            className='underline underline-offset-4'
          >
            Sign In
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignUpForm;
