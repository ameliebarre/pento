'use client';
import { Minus, Plus } from 'lucide-react';
import { Button } from '../ui/button';

interface QuantitySelectorProps {
  quantity: number;
  increment: () => void;
  decrement: () => void;
  min?: number;
  max?: number;
}

const QuantitySelector = ({
  quantity,
  increment,
  decrement,
  min = 1,
  max = 5,
}: QuantitySelectorProps) => {
  return (
    <div className='flex items-center justify-between w-fit border border-1 border-slate-300 p-1 bg-white rounded-full gap-4'>
      <Button
        variant='ghost'
        onClick={decrement}
        className='p-2 text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed shadow-none hover:bg-transparent'
        disabled={quantity <= min}
        aria-label='Decrease quantity'
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
        disabled={quantity >= max}
        aria-label='Increase quantity'
      >
        <Plus size={16} />
      </Button>
    </div>
  );
};

export default QuantitySelector;
