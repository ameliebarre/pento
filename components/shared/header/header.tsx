'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';
import MobileMenu from './mobile-menu';
import UserButton from './user-button';
import Cart from '@/components/shared/cart';

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
        <nav className='flex-end flex gap-8 items-center'>
          <Cart
            className='cursor-pointer text-bg-slate-900'
            triggerElement={
              <ShoppingCart
                className='w-6 h-6 md:w-6 md:h-6'
                strokeWidth={1.5}
              />
            }
          />
          <UserButton />
        </nav>
      </div>
    </header>
  );
};

export default Header;
