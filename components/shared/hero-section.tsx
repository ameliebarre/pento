import { playfair_display } from '@/app/layout';
import { MoveRightIcon } from 'lucide-react';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className='w-full flex flex-col md:flex-row min-h-[700px]'>
      {/* Left Content Block */}
      <div className='flex-1 flex flex-col justify-center p-8 md:p-16 text-center'>
        <h2
          className={`${playfair_display.className} text-3xl font-normal mb-2 text-gray-800 italic`}
        >
          Timeless Elegance for Your Home
        </h2>
        <h3
          className={`${playfair_display.className} text-7xl text-slate-900 font-normal italic mb-12`}
        >
          Discover Designer <br /> Furniture That Inspires
        </h3>
        <button className=' bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-md w-fit mx-auto flex items-center gap-2'>
          Shop now <MoveRightIcon className='w-4 h-4' />
        </button>
      </div>

      {/* Right Image Block */}
      <div className='flex-1 relative'>
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
