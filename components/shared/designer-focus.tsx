'use client';

import { GitGraph as Typography } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const DesignerFocus = () => {
  return (
    <main className='container mx-auto px-4 py-8 sm:py-12 lg:py-16'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
        <div className='flex flex-col gap-4 sm:gap-6'>
          <div className='flex-1'>
            <div className='space-y-3 sm:space-y-4'>
              <div className='flex items-center gap-2'>
                <Typography className='w-4 h-4 sm:w-5 sm:h-5' />
                <h3 className='text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider'>
                  Designer Focus
                </h3>
              </div>
              <h2 className='text-2xl sm:text-3xl lg:text-6xl font-bold uppercase'>
                Philippe Starck
              </h2>
              <p className='text-sm text-gray-600'>
                Philippe Starck. Born in Paris in 1949. Son of a French
                aeronautical engineer and inventor. He studied interior
                architecture and design at the École Nissim de Camondo, Paris.
                In 1976 he founded the company “Starck Product”. Designing the
                private rooms of François Mitterrand at the Élysée Palace made
                him famous. The Café Costes in Paris made him an international
                star. <br />
                <br />
                In 1995, he created a new category with the Delano boutique
                hotel in Miami: designer hotels. He has long been successful in
                international residential projects: Under the name Yoo, Philippe
                Starck creates outstanding apartments at unique locations all
                over the world. <br />
                <br /> In 2000 Philippe Starck received the National Order of
                the Legion of Honour. One of numerous coveted distinctions which
                he has been awarded over the course of his career, which spans
                more than 30 years. Find out more about Philippe Starck:{' '}
                <Link href='www.starck.com/en'>www.starck.com/en</Link>
              </p>
            </div>
          </div>
          <div className='flex-1 bg-white rounded-lg overflow-hidden relative aspect-square shadow-sm'>
            <Image
              src='/images/philippe-starck.jpg'
              alt='Philippe Starck'
              fill
              className='object-cover'
              sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
              priority
            />
          </div>
        </div>
        <div className='flex flex-col gap-4 sm:gap-6'>
          <div className='flex-1 bg-white rounded-lg overflow-hidden relative aspect-square shadow-sm'>
            <Image
              src='/images/starck-design-1.jpg'
              alt='Starck Design'
              fill
              className='object-cover'
              sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
            />
          </div>
          <div className='flex-1 bg-white rounded-lg overflow-hidden relative aspect-square shadow-sm'>
            <Image
              src='/images/starck-design-2.jpg'
              alt='Starck Design 4'
              fill
              className='object-cover'
              sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
            />
          </div>
        </div>
        <div className='hidden lg:flex flex-col gap-4 sm:gap-6'>
          <div className='flex-1 bg-white rounded-lg overflow-hidden relative aspect-square shadow-sm'>
            <Image
              src='/images/starck-design-3.jpg'
              alt='Starck Design 2'
              fill
              className='object-cover'
              sizes='33vw'
            />
          </div>
          <div className='flex-1 bg-white rounded-lg overflow-hidden relative aspect-square shadow-sm'>
            <Image
              src='/images/starck-design-4.jpg'
              alt='Starck Design 3'
              fill
              className='object-cover'
              sizes='33vw'
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default DesignerFocus;
