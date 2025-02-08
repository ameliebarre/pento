'use client';
import { useRef, useState, MouseEvent, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Category } from '@/types';
import Link from 'next/link';

type CategoryListProps = {
  categories: Category[];
};

const CategoryList = ({ categories }: CategoryListProps) => {
  const categoriesRef = useRef<HTMLDivElement | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!categoriesRef.current) return;

    setIsMouseDown(true);
    setStartX(e.pageX - categoriesRef.current.offsetLeft);
    setScrollLeft(categoriesRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown || !categoriesRef.current) return;

    e.preventDefault();
    const x = e.pageX - categoriesRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    categoriesRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollLeftHandler = () => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollBy({ left: -450, behavior: 'smooth' });
    }
  };

  const scrollRightHandler = () => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollBy({ left: 450, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const categoriesRefCurrent = categoriesRef.current;

    const checkScrollPosition = () => {
      if (!categoriesRefCurrent) return;

      const { scrollLeft, scrollWidth, clientWidth } = categoriesRefCurrent;
      setIsAtStart(scrollLeft === 0);
      setIsAtEnd(scrollLeft === scrollWidth - clientWidth);
    };

    if (categoriesRefCurrent) {
      categoriesRefCurrent.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition();
    }

    return () => {
      if (categoriesRefCurrent) {
        categoriesRefCurrent.removeEventListener('scroll', checkScrollPosition);
      }
    };
  }, []);

  return (
    <div className='relative w-full'>
      <div className='mb-4'>
        <h2 className='h2-bold text-lg mb-1'>Shop by category</h2>
        <hr className='border-t border-black w-48 hidden xs:block' />
      </div>
      {!isAtStart && (
        <button
          className='absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/60 shadow-md p-2 rounded-full'
          onClick={scrollLeftHandler}
        >
          <ChevronLeft size={32} strokeWidth='1' />
        </button>
      )}
      {categories.length > 0 ? (
        <div
          className='flex gap-3 w-[200%] md:w-[150%] lg:w-[120%] xl:w-[100%] overflow-x-auto select-none cursor-grab active:cursor-grabbing no-scrollbar'
          ref={categoriesRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {categories.map((category) => (
            <div
              key={category.slug}
              className='relative w-[316px] h-[414px] aspect-[3/4] overflow-hidden rounded-tr-2xl rounded-bl-2xl shrink-0'
            >
              <Link href={`/categories/${category.slug}`} draggable={false}>
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  className='object-cover'
                  priority={true}
                  draggable={false}
                />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>No categories found</p>
        </div>
      )}
      {!isAtEnd && (
        <button
          className='absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/60 shadow-md p-2 rounded-full'
          onClick={scrollRightHandler}
        >
          <ChevronRight size={32} strokeWidth={1} />
        </button>
      )}
    </div>
  );
};

export default CategoryList;
