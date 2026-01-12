import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Inter, Space_Grotesk } from 'next/font/google';
import { cn } from '@/lib/utils';
import Providers from './providers';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { BackToSystemsButton } from '@/components/layout/BackToSystemsButton';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'EPOS V 1.2',
  description: 'Inventory Management System',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', inter.variable, spaceGrotesk.variable)}>
        <Providers>
          <FirebaseClientProvider>
            <BackToSystemsButton />
            {children}
            <Toaster />
          </FirebaseClientProvider>
        </Providers>
      </body>
    </html>
  );
}
