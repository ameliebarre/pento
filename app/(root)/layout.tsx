import Footer from '@/components/footer';
import Header from '@/components/shared/header';
import HeroSection from '@/components/shared/hero-section';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex h-screen flex-col'>
      <Header />
      <HeroSection />
      <main className='flex-1 wrapper flex-grow'>{children}</main>
      <Footer />
    </div>
  );
}
