import type { Metadata } from 'next';
import { Manrope, Playfair_Display } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
import { ReactNode } from 'react';
import ScrollRevealObserver from '@/components/scroll-reveal-observer';
import PublicShell from '@/components/public-shell';

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope'
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair'
});

export const metadata: Metadata = {
  title: 'Tugai Realtors — Contemporary Luxury Real Estate',
  description:
    'Discover curated luxury properties across Nairobi. Refined experiences, thoughtful design, and personalized service.',
  metadataBase: new URL('https://tugairealtors.com'),
  icons: {
    icon: '/tugss.png'
  },
  openGraph: {
    title: 'Tugai Realtors',
    description: 'Curated luxury real estate in Nairobi',
    url: 'https://tugairealtors.com',
    siteName: 'Tugai Realtors'
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${playfair.variable}`}>
      <body className="min-h-screen overflow-x-hidden bg-sand-50 text-ink-900">
        <ScrollRevealObserver />
        <PublicShell>{children}</PublicShell>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
