import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import ProductPrice from './product-price';
import { Product } from '@/types';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className='w-full border-none shadow-none'>
      <CardHeader className='p-0 items-center'>
        <div className='relative w-full aspect-[3/4] block'>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className='object-cover relative'
            priority={true}
          />
          <div className='absolute inset-0 flex items-end justify-center'>
            <span className='bg-white/50 w-full text-black px-4 py-2 text-center text-xs'>
              © Unsplash -{' '}
              <Link
                href={product.authorImageLink}
                className='underline'
                target='_blank'
              >
                {product.authorImage}
              </Link>
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className='pt-2 pb-0 px-0'>
        <Link href={`/product/${product.slug}`}>
          <h2 className='text-md font-medium'>{product.name}</h2>
        </Link>
        <div className='text-sm text-gray-600'>{product.brand}</div>
        <div className='flex-between gap-4'>
          <p>{product.rating} stars</p>
          {product.stock > 0 ? (
            <ProductPrice price={Number(product.price)} />
          ) : (
            <p className='text-destructive text-sm text-red-600'>
              Out of stock
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
