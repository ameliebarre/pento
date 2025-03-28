import Footer from '@/components/footer';
import Header from '@/components/shared/header';
import { Toaster } from '@/components/ui/sonner';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-col'>
      <Header />
      <main className='flex-1 flex wrapper flex-grow flex-col gap-10'>
        {children}
      </main>
      <Toaster />
      <Footer />
    </div>
  );
}
