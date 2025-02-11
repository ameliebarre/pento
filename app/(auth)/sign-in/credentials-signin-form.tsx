'use client';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { signInDefaultValues } from '@/lib/constants';

const CredentialsSignInForm = () => {
  return (
    <form>
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
            defaultValue={signInDefaultValues.email}
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
            defaultValue={signInDefaultValues.password}
          />
          <span className='text-sm'>
            Forgotten your password?{' '}
            <Link href='/' className='underline underline-offset-4'>
              Reset it now
            </Link>
          </span>
        </div>
        <div>
          <Button
            className='uppercase w-full font-medium tracking-wide'
            variant='default'
          >
            Sign in
          </Button>
        </div>
        <p className='text-center'>
          Don&apos;t have an account ?{' '}
          <Link
            href='/sing-up'
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
