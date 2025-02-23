'use client';
import { useState } from 'react';
import QuantitySelector from '@/components/shared/quantity-selector';
import AddToCartButton from '@/components/shared/product/add-to-cart-button';

interface ProductActionsProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: string;
    image: string;
  };
}

const AddToCart = ({ product }: ProductActionsProps) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className='w-full mt-6 flex items-center gap-3'>
      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
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
