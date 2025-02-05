import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { UserRoundIcon } from 'lucide-react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import {
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import ButtonLink from '../buttonLink';

const Menu = () => {
  return (
    <nav className='md:hidden'>
      <Sheet>
        <SheetTrigger className='align-middle'>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent className='flex flex-col h-full' side='left'>
          <VisuallyHidden asChild>
            <SheetTitle>Menu</SheetTitle>
          </VisuallyHidden>
          <nav className='mt-2 flex-grow'>
            <ul className='list-none flex flex-col'>
              <li className='flex flex-row gap-2 items-center'>
                <ButtonLink href='/products' fontSize='2xl'>
                  Products
                </ButtonLink>
              </li>
              <li className='flex flex-row gap-2 items-center'>
                <ButtonLink href='/showcase' fontSize='2xl'>
                  Showcase
                </ButtonLink>
              </li>
              <li className='flex flex-row gap-2 items-center'>
                <ButtonLink href='/contact' fontSize='2xl'>
                  Contact
                </ButtonLink>
              </li>
            </ul>
          </nav>
          <SheetFooter className='!justify-start'>
            <Link
              href='/sign-in'
              className='flex items-center gap-2 hover:underline'
            >
              <UserRoundIcon size={16} /> Sign In
            </Link>
          </SheetFooter>
          <SheetDescription></SheetDescription>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Menu;
