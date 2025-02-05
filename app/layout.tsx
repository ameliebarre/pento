import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import { APP_NAME, APP_DESCRIPTION, SERVER_URL } from '@/lib/constants';
import '@/assets/styles/globals.css';
import 'tailwindcss/tailwind.css';

const dm_sans = DM_Sans({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: `%s | Pento`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${dm_sans.className} antialiased`}>{children}</body>
    </html>
  );
}
