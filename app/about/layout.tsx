import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hakkımızda | LuxQr',
  description: 'LuxQr, Türkiye merkezli modern QR kod oluşturma platformudur. Misyonumuz, metin, dosya, WiFi, kartvizit ve sosyal medya içeriklerini kolayca QR koda dönüştürmeyi sağlamak.',
  keywords: ['luxqr hakkında', 'qr kod platformu', 'dijital çözümler', 'hakkımızda'],
  openGraph: {
    title: 'Hakkımızda | LuxQr',
    description: 'LuxQr, Türkiye merkezli modern QR kod oluşturma platformudur. Misyonumuz, metin, dosya, WiFi, kartvizit ve sosyal medya içeriklerini kolayca QR koda dönüştürmeyi sağlamak.',
    url: 'https://luxqrpro.site/about',
    siteName: 'LuxQr',
    locale: 'tr_TR',
    type: 'website',
    images: '/favicon.svg',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hakkımızda | LuxQr',
    description: 'LuxQr, Türkiye merkezli modern QR kod oluşturma platformudur.',
    images: '/favicon.svg',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
