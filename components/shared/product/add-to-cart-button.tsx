'use client';
import { useCallback, useState } from 'react';
import { CartItem } from '@/types';
import { addItemToCart } from '@/lib/actions/cart.actions';
import { playfair_display } from '@/lib/fonts';
import { toast } from 'sonner';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

type AddToCartButtonProps = {
  product: CartItem;
  quantity: number;
};

const AddToCartButton = ({ product, quantity }: AddToCartButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = useCallback(async () => {
    setLoading((prev) => {
      if (prev) return prev;
      return true;
    });

    try {
      const productWithQuantity = {
        ...product,
        quantity: quantity,
      };

      const addItemToCartResponse = await addItemToCart(productWithQuantity);

      if (!addItemToCartResponse.success) {
        toast.error('Oops! Something went wrong!', {
          description: addItemToCartResponse.message,
        });
      }
    } catch {
      toast.error('Oops! something went wrong!', {
        description: 'Please try again in a few minutes.',
      });
    } finally {
      setLoading(false);
    }
  }, [product, quantity]);

  return (
    <Sheet>
      <SheetTrigger
        className='w-full cursor-pointer rounded-full select-none bg-slate-900 text-white h-[50px] flex items-center justify-center hover:bg-slate-800'
        onClick={handleAddToCart}
        disabled={loading}
        asChild
      >
        <span>
          {loading ? 'Adding to cart...' : `Add to cart`} - $
          {Number(product.price) * quantity}
        </span>
      </SheetTrigger>
      <SheetContent className='flex flex-col h-full'>
        <SheetTitle className={`${playfair_display.className} text-3xl`}>
          Your cart
        </SheetTitle>
        <p>Cart items will appear here</p>
        <SheetDescription></SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default AddToCartButton;
