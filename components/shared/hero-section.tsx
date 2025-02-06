import { playfair_display } from '@/app/layout';
import { MoveRightIcon } from 'lucide-react';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className='w-full flex flex-col md:flex-row min-h-auto md:min-h-[700px]'>
      <div className='flex-1 flex flex-col justify-center px-8 pt-8 md:px-8 text-center'>
        <h2
          className={`${playfair_display.className} text-4xl sm:text-5xl lg:text-7xl text-slate-900 font-normal italic mb-4`}
        >
          Discover Designer <br /> Furniture That Inspires
        </h2>
        <h3
          className={`${playfair_display.className} text-lg font-normal text-gray-800 italic mb-8`}
        >
          Timeless Elegance for Your Home
        </h3>
        <button className='bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-md w-fit mx-auto flex items-center gap-2'>
          Shop now <MoveRightIcon className='w-4 h-4' />
        </button>
      </div>
      <div className='flex-1 relative mt-8 md:mt-0 hidden md:block'>
        <Image
          src='/images/hero-image.jpg'
          alt='Hero Image'
          className='object-cover'
          fill
          sizes='(max-width: 768px) 100vw, 50vw'
          priority
        />
      </div>
    </section>
  );
};

export default HeroSection;
