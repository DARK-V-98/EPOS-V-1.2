import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Inter, Lexend } from 'next/font/google';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-body' });
const lexend = Lexend({ subsets: ['latin'], variable: '--font-headline' });

export const metadata: Metadata = {
  title: 'Inventory Ace',
  description: 'Manage your inventory with ease.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-body antialiased', inter.variable, lexend.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
