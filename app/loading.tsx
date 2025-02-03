import Image from 'next/image';
import loader from '@/assets/loader.gif';
import Header from '@/components/shared/header';
import Footer from '@/components/footer';

const LoadingPage = () => {
  return (
    <div className='h-screen flex flex-col'>
      <Header />
      <main className='flex-grow flex-col flex items-center justify-center'>
        <Image src={loader} width={60} height={60} alt='Loading...'></Image>
      </main>
      <Footer />
    </div>
  );
};

export default LoadingPage;
