'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';
import MobileMenu from './mobile-menu';
import ButtonLink from '../button-link';
import UserButton from './user-button';

const navLinks = [
  { name: 'Products', href: '/products' },
  { name: 'Who we are', href: '/' },
  { name: 'Contact', href: '/' },
];

const Header = () => {
  return (
    <header className='h-18 border-b flex items-center justify-center'>
      <div className='wrapper flex-between'>
        <div className='flex-start gap-3 md:gap-8'>
          <div className='md:hidden'>
            <MobileMenu />
          </div>
          <Link href='/' className='flex-start'>
            <Image
              src='/images/logo.svg'
              alt={`${APP_NAME} logo`}
              width={180}
              height={51}
              priority={true}
            />
          </Link>
          <nav className='hidden md:flex md:space-x-8'>
            {navLinks.map((link) => (
              <div key={link.name} className='relative group'>
                <Link href={link.href} className='text-slate-900'>
                  {link.name}
                </Link>
                <div className='absolute left-0 -bottom-1 w-full h-[1.5px] bg-slate-900 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100'></div>
              </div>
            ))}
          </nav>
        </div>
        <nav className='flex-end flex gap-6'>
          <ButtonLink href='/cart'>
            <ShoppingCart className='!w-6 !h-6 md:!w-4 md:!h-4' />
            <span className='hidden md:inline'>Cart</span>
          </ButtonLink>
          <UserButton />
        </nav>
      </div>
    </header>
  );
};

export default Header;
