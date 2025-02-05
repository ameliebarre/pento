import ProductCard from './product-card';

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

type ProductListProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  title?: string;
};

const ProductList = ({ data, title }: ProductListProps) => {
  return (
    <div className='my-10'>
      <div className='mb-4'>
        <h2 className='h2-bold text-lg mb-1'>{title}</h2>
        <hr className='border-t border-black w-48' />
      </div>
      {data.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {data.map((product: Product) => (
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
