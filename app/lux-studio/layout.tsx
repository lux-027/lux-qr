import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LUX Studio | LuxQr',
  description: 'LuxQr ve LUX INC markalarının yaratıcı merkezi. Dijital stüdyo çözümleri ve QR kod teknolojileri için LUX Studio.',
  keywords: ['lux studio', 'lux inc', 'dijital stüdyo', 'qr kod', 'luxqr marka'],
  openGraph: {
    title: 'LUX Studio | LuxQr',
    description: 'LuxQr ve LUX INC markalarının yaratıcı merkezi. Dijital stüdyo çözümleri ve QR kod teknolojileri için LUX Studio.',
    url: 'https://luxqrpro.site/lux-studio',
    siteName: 'LuxQr',
    locale: 'tr_TR',
    type: 'website',
    images: '/favicon.svg',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LUX Studio | LuxQr',
    description: 'LuxQr ve LUX INC markalarının yaratıcı merkezi. Dijital stüdyo çözümleri ve QR kod teknolojileri için LUX Studio.',
    images: '/favicon.svg',
  },
};

export default function LuxStudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
