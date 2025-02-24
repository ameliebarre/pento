'use client';
import { useCallback, useState } from 'react';
import QuantitySelector from '@/components/shared/quantity-selector';
import AddToCartButton from '@/components/shared/product/add-to-cart-button';
import { Product } from '@/types';

const AddToCart = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState(1);
  const minQuantity = 1;

  const increment = useCallback(() => {
    setQuantity((prev) => Math.min(prev + 1, product.stock));
  }, [product.stock]);

  const decrement = useCallback(() => {
    setQuantity((prev) => Math.max(prev - 1, minQuantity));
  }, [minQuantity]);

  return (
    <div className='w-full mt-6 flex items-center gap-3'>
      <QuantitySelector
        quantity={quantity}
        increment={increment}
        decrement={decrement}
      />
      <AddToCartButton
        product={{
          productId: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          quantity: quantity,
          image: product.image,
        }}
        quantity={quantity}
      />
    </div>
  );
};

export default AddToCart;
