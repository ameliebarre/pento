'use client';

import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { Button } from './ui/button';

const GoogleSocialButton = () => {
  const onButtonClick = () => {
    signIn('google');
  };

  return (
    <Button className='w-full bg-transparent hover:bg-transparent border-slate-900 border mt-4 flex gap-3'>
      <Image src='/google.svg' alt='Google' width={20} height={20} />
      <span className='text-slate-900' onClick={onButtonClick}>
        Sign In with Google
      </span>
    </Button>
  );
};

export default GoogleSocialButton;
