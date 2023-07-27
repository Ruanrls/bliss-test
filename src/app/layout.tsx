import NetworkWatchModal from '@/components/NetworkWatchModal';
import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import './globals.css';

const raleway = Raleway({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bliss Test',
  description: 'Bliss frontend application test',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={raleway.className} suppressHydrationWarning>
        <NetworkWatchModal />
        {children}
      </body>
    </html>
  );
}
