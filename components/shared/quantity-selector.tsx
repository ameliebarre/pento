'use client';
import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { Button } from '../ui/button';

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    if (quantity < 5) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className='flex items-center justify-between w-fit border border-1 border-slate-300 p-1 bg-white rounded-full gap-4'>
      <Button
        variant='ghost'
        onClick={decrement}
        className='p-2 text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed shadow-none hover:bg-transparent'
        disabled={quantity === 1}
      >
        <Minus size={16} />
      </Button>
      <span className='text-lg font-semibold w-6 text-center select-none'>
        {quantity}
      </span>
      <Button
        variant='ghost'
        onClick={increment}
        className='p-2 text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed shadow-none hover:bg-transparent'
        disabled={quantity === 5}
      >
        <Plus size={16} />
      </Button>
    </div>
  );
};

export default QuantitySelector;
