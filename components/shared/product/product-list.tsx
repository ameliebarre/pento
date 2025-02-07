import { Product } from '@/types';
import Link from 'next/link';
import { MoveRightIcon } from 'lucide-react';
import ProductCard from './product-card';
import { getLatestProducts } from '@/lib/actions/product.actions';

const ProductList = async () => {
  const latestProducts = await getLatestProducts();

  return (
    <div className='my-10'>
      <div className='mb-4 flex flex-col xs:flex-row gap-1 xs-gap-0 items-start xs:items-center xs:justify-between'>
        <div>
          <h2 className='h2-bold text-lg mb-1'>Catalog</h2>
          <hr className='border-t border-black w-48 hidden xs:block' />
        </div>
        <Link href='/products' className='flex items-center group'>
          View all products{' '}
          <MoveRightIcon
            strokeWidth='1.25'
            className='w-12 transition-transform duration-200 ease-in-out group-hover:translate-x-2'
          />
        </Link>
      </div>
      {latestProducts.length > 0 ? (
        <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6'>
          {latestProducts.map((product: Product) => (
            <div key={product.slug} className='h-full'>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>No products found</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
