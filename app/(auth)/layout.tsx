import Footer from '@/components/footer';
import Header from '@/components/shared/header/header';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex flex-1 items-center justify-center w-full'>
        {children}
      </main>
      <Footer />
    </div>
  );
}
