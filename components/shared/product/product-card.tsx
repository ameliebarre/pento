import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import ProductPrice from './product-price';

type Product = {
  slug: string;
  name: string;
  price: number;
  images: string[];
  description?: string;
  brand: string;
  rating: number;
  stock: number;
};

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className='w-full max-w-sm border-none shadow-none'>
      <CardHeader className='p-0 items-center'>
        <Link
          href={`/products/${product.slug}`}
          className='relative w-full aspect-[3/4] block'
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className='object-cover'
            priority={true}
          />
        </Link>
      </CardHeader>
      <CardContent className='grid px-0 pt-2'>
        <Link href={`/products/${product.slug}`}>
          <h2 className='text-md font-medium'>{product.name}</h2>
        </Link>
        <div className='text-sm text-gray-600'>{product.brand}</div>
        <div className='flex-between gap-4'>
          <p>{product.rating} stars</p>
          {product.stock > 0 ? (
            <ProductPrice price={product.price} />
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
