'use client';
import { useActionState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { signUpDefaultValues } from '@/lib/constants';
import { signUpUser } from '@/lib/actions/user.actions';
import { useFormStatus } from 'react-dom';

const SignUpForm = () => {
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: '',
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const SignUpButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button
        disabled={pending}
        className='uppercase w-full font-medium tracking-wide'
        variant='default'
      >
        {pending ? 'Submitting...' : 'Sign Up'}
      </Button>
    );
  };

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
            required
            autoComplete='email'
            className='focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 mt-2'
            defaultValue={signUpDefaultValues.name}
          />
        </div>
        <div>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            name='email'
            type='email'
            required
            autoComplete='email'
            className='focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 mt-2'
            defaultValue={signUpDefaultValues.email}
          />
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
            defaultValue={signUpDefaultValues.password}
          />
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
            defaultValue={signUpDefaultValues.confirmPassword}
          />
        </div>
        <div>
          <SignUpButton />
        </div>
        {data && !data.success && (
          <div className='text-center text-destructive'>{data.message}</div>
        )}
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
