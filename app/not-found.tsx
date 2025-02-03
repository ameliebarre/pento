'use client';
import Link from 'next/link';
import Header from '@/components/shared/header';
import Footer from '@/components/footer';

const NotFoundPage = () => {
  return (
    <div className='h-screen flex flex-col'>
      <Header />
      <main className='flex-grow flex-col flex items-center justify-center'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold text-gray-800'>
            404 Page Not Found
          </h2>
          <p className='text-gray-600 mt-4'>
            The page you requested does not exist. Click{' '}
            <Link href='/' className='font-bold'>
              here
            </Link>
            <br /> to continue shopping
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
