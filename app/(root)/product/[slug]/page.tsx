import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/actions/product.actions';
import { cn } from '@/lib/utils';
import { playfair_display } from '@/app/layout';
import QuantitySelector from '@/components/shared/quantity-selector';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

type ProductDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

const ProductDetailsPage = async (props: ProductDetailsPageProps) => {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  const hasStock = product.stock > 0 ? true : false;

  return (
    <section className='px-24'>
      <div className='grid grid-cols-1 md:grid-cols-5 gap-3'>
        <div className='col-span-2'>
          <div className='w-full z-0 sticky top-4'>
            <div className='aspect-[4/3]'>
              <Image
                src={product.image}
                alt={product.slug}
                className='w-full h-full'
                layout='responsive'
                width={200}
                height={300}
              />
            </div>
          </div>
        </div>
        <div className='col-span-3 px-5'>
          <div className='flex flex-col'>
            <p className='text-sm text-gray-500'>{product.brand}</p>
            <h2
              className={`${playfair_display.className} text-4xl font-medium`}
            >
              {product.name}
            </h2>
            <div className='flex items-center gap-2 mt-2'>
              <p>{product.rating}</p>
              <p className='text-gray-500 text-sm'>
                {product.numReviews}{' '}
                {product.numReviews > 1 ? `reviews` : `review`}
              </p>
            </div>
            <div className='flex flex-col sm:flex-row sm:items-center gap-3 mt-2'>
              <p className='text-2xl font-medium'>${product.price}</p>
              <div
                className={cn(
                  'text-slate-900 px-4 py-1 font-medium rounded-full text-sm',
                  hasStock ? 'bg-emerald-200' : 'bg-red-400'
                )}
              >
                {hasStock ? `Available` : `Out of stock`}
              </div>
            </div>
          </div>
          <div className='mt-4 text-slate-600'>{product.description}</div>
          <div className='mt-6 flex items-center gap-3'>
            <QuantitySelector />
            <Button className='w-full rounded-full select-none'>
              Add to cart
            </Button>
          </div>
          <div className='mt-12'>
            <Link
              href=''
              className='text-sm border-b border-[#e5e7eb] font-medium pb-4 w-full block'
            >
              Details
            </Link>
            <Accordion type='single' collapsible className='w-full'>
              <AccordionItem value='item-1'>
                <AccordionTrigger className='text-sm'>
                  Description
                </AccordionTrigger>
                <AccordionContent className='text-slate-600'>
                  {product.description}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-2'>
                <AccordionTrigger className='text-sm'>
                  Shipping & Returns
                </AccordionTrigger>
                <AccordionContent className='text-slate-600'>
                  Learn about our shipping options and return policies. Shipping
                  costs vary depending on your country of residence. For more
                  details, please check our shipping terms. <br />
                  Once your order has been delivered, you have 14 calendar days
                  to request a return or report an issue, free of charge,
                  directly from your customer account.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPage;
