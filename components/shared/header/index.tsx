import Image from 'next/image';
import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';
import { ShoppingCart } from 'lucide-react';
import { UserRoundIcon } from 'lucide-react';
import Menu from './menu';
import ButtonLink from '../buttonLink';

const Header = () => {
  return (
    <header className='h-18 border-b flex items-center justify-center'>
      <div className='wrapper flex-between'>
        <div className='flex-start gap-3 md:gap-8'>
          <div className='md:hidden'>
            <Menu />
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
          <nav className='hidden md:flex'>
            <ul className='list-none flex flex-row gap-6'>
              <li className='hover:underline underline-offset-8'>
                <Link href='/products'>Products</Link>
              </li>
              <li>
                <Link href='/showcase'>Showcase</Link>
              </li>
              <li>
                <Link href='/contact'>Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
        <nav className='flex-end flex gap-6'>
          <ButtonLink href='/cart'>
            <ShoppingCart className='!w-6 !h-6 md:!w-4 md:!h-4' />
            <span className='hidden md:inline'>Cart</span>
          </ButtonLink>
          <ButtonLink href='/sign-in' className='hidden md:flex'>
            <UserRoundIcon /> Sign In
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
