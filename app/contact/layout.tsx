import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'İletişim | LuxQr',
  description: 'LuxQr ekibiyle iletişime geçin. QR kod oluşturma, iş birliği ve teknik destek için bize ulaşın.',
  keywords: ['luxqr iletişim', 'destek', 'qr kod destek', 'iş birliği', 'iletişim'],
  openGraph: {
    title: 'İletişim | LuxQr',
    description: 'LuxQr ekibiyle iletişime geçin. QR kod oluşturma, iş birliği ve teknik destek için bize ulaşın.',
    url: 'https://luxqrpro.site/contact',
    siteName: 'LuxQr',
    locale: 'tr_TR',
    type: 'website',
    images: '/favicon.svg',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'İletişim | LuxQr',
    description: 'LuxQr ekibiyle iletişime geçin. QR kod oluşturma, iş birliği ve teknik destek için bize ulaşın.',
    images: '/favicon.svg',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
