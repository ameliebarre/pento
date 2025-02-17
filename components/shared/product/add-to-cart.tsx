'use client';

import Link from 'next/link';
import { useCallback, useState } from 'react';
import { toast, ToastOptions } from 'react-toastify';
import { CartItem } from '@/types';
import { Button } from '@/components/ui/button';
import { addItemToCart } from '@/lib/actions/cart.actions';
import Toast from '../../ui/toast';

type AddToCartProps = {
  product: CartItem;
};

const toastConfig: ToastOptions = {
  position: 'bottom-right',
  autoClose: 3000,
  hideProgressBar: false,
  pauseOnHover: true,
};

const AddToCart = ({ product }: AddToCartProps) => {
  const [loading, setLoading] = useState(false);

  const showToast = useCallback(
    (
      variant: 'success' | 'error',
      title: string,
      subTitle: React.ReactNode
    ) => {
      toast(<Toast variant={variant} title={title} subTitle={subTitle} />, {
        ...toastConfig,
        className: `custom-toast custom-${variant}-toast`,
      });
    },
    []
  );

  const handleAddToCart = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await addItemToCart(product);
      if (!res.success) {
        showToast('error', 'Oops! Something went wrong', res.message);
      } else {
        showToast(
          'success',
          'Nice Choice!',
          <span>
            This item is now in your cart.{' '}
            <Link href='/cart' className='text-slate-900 underline'>
              Ready to checkout?
            </Link>
          </span>
        );
      }
    } catch {
      showToast(
        'error',
        'An unexpected error occurred',
        'Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  }, [product, loading, showToast]);

  return (
    <Button
      className='w-full rounded-full select-none'
      onClick={handleAddToCart}
    >
      {loading ? 'Adding to cart...' : 'Add to cart'}
    </Button>
  );
};

export default AddToCart;
