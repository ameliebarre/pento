'use client';
import { useCallback, useState } from 'react';
import { toast, ToastOptions } from 'react-toastify';
import { CartItem } from '@/types';
import { addItemToCart } from '@/lib/actions/cart.actions';
import Toast from '@/components/ui/toast';
import Cart from '@/components/shared/cart';

type AddToCartButtonProps = {
  product: CartItem;
  quantity: number;
};

const toastConfig: ToastOptions = {
  position: 'bottom-right',
  autoClose: 3000,
  hideProgressBar: false,
  pauseOnHover: true,
};

const showToast = (
  variant: 'success' | 'error',
  title: string,
  subTitle: React.ReactNode
) => {
  toast(<Toast variant={variant} title={title} subTitle={subTitle} />, {
    ...toastConfig,
    className: `custom-toast custom-${variant}-toast`,
  });
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

      const res = await addItemToCart(productWithQuantity);

      if (!res?.success) {
        showToast('error', 'Oops! Something went wrong', res?.message);
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
  }, [product, quantity]);

  return (
    <Cart
      className='w-full cursor-pointer rounded-full select-none bg-slate-900 text-white h-[50px] flex items-center justify-center hover:bg-slate-800'
      onClick={handleAddToCart}
      disabled={loading}
      triggerElement={
        <span>
          {loading ? 'Adding to cart...' : `Add to cart`} - $
          {Number(product.price) * quantity}
        </span>
      }
    />
  );
};

export default AddToCartButton;
