import type { Metadata } from 'next';
import { Playfair_Display, Cormorant_Garamond, Outfit, Great_Vibes } from 'next/font/google';
import '@/styles/globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GrainOverlay from '@/components/GrainOverlay';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600'],
  variable: '--font-outfit',
  display: 'swap',
});

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-great-vibes',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'WBSK — Weddings by Siddhant Kapoor | Luxury Wedding Photography',
  description:
    'Timeless moments, preserved. Luxury wedding photography capturing authentic emotions and the quiet in-between moments that define your love.',
  openGraph: {
    title: 'WBSK — Weddings by Siddhant Kapoor',
    description: 'Luxury Wedding Photography — Timeless Moments, Preserved.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${outfit.variable} ${greatVibes.variable}`}
    >
      <body className="bg-cream-50 text-espresso-800 font-body">
        <SmoothScroll>
          <CustomCursor />
          <GrainOverlay />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
