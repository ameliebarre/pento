import { cn } from '@/lib/utils';

type ProductPriceProps = {
  price: number;
  className?: string;
};

const ProductPrice = ({ price, className }: ProductPriceProps) => {
  // Ensure two decimal places
  const stringValue = price.toFixed(2);

  // Get the int/float
  const [intValue, floatValue] = stringValue.split('.');

  return (
    <p className={cn('text-2xl', className)}>
      <span className='text-xs align-super'>$</span>
      {intValue}
      <span className='text-xs align-super'>{floatValue}</span>
    </p>
  );
};

export default ProductPrice;
