'use client';
import { useEffect, useState } from 'react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { CartWithFormattedPrices } from '@/types';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet';
import { playfair_display } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import ButtonLink from './button-link';
import { getCart } from '@/lib/actions/cart.actions';
import Image from 'next/image';

type CartProps = {
  triggerElement: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

const EmptyCartMessage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <p className='text-2xl font-bold text-slate-900'>Your cart is empty</p>
      <ButtonLink
        href='/products'
        className='mt-4 w-[70%] rounded-full hover:bg-slate-800'
        variant='default'
      >
        Shop now
      </ButtonLink>
    </div>
  );
};

const CartTitle = () => {
  return (
    <SheetTitle className={cn(playfair_display.className, 'text-3xl')}>
      Your cart
    </SheetTitle>
  );
};

const Cart = ({ triggerElement, disabled, className, onClick }: CartProps) => {
  const [cart, setCart] = useState<CartWithFormattedPrices | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await getCart();
        setCart(cartData);
      } catch {
        console.error('Failed to load cart. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, []);

  const isCartEmpty = !cart || cart.items.length === 0;

  return (
    <Sheet>
      <SheetTrigger
        className={className}
        asChild
        onClick={onClick}
        disabled={disabled}
      >
        {triggerElement}
      </SheetTrigger>
      <SheetContent className='flex flex-col h-full'>
        {isCartEmpty ? (
          <VisuallyHidden asChild>
            <CartTitle />
          </VisuallyHidden>
        ) : (
          <CartTitle />
        )}
        {isLoading ? (
          <div className='flex items-center justify-center h-full'>
            <p>Loading...</p>
          </div>
        ) : isCartEmpty ? (
          <EmptyCartMessage />
        ) : (
          cart.items.map((cartItem) => (
            <div key={cartItem.productId} className='flex flex-row gap-2'>
              <Image
                src={cartItem.image}
                width={50}
                height={50}
                alt={cartItem.name}
              />
              <div className='flex flex-col gap-2'>
                <p>{cartItem.name}</p>
                <p>{cartItem.quantity}</p>
                <p>{cartItem.price}</p>
              </div>
            </div>
          ))
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
