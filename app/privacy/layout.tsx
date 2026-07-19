import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası | LuxQr',
  description: 'LuxQr gizlilik politikası. Verilerinizin nasıl toplandığı, saklandığı ve korunduğu hakkında bilgi edinin.',
  keywords: ['luxqr gizlilik politikası', 'gizlilik', 'veri koruma', 'kvkk'],
  openGraph: {
    title: 'Gizlilik Politikası | LuxQr',
    description: 'LuxQr gizlilik politikası. Verilerinizin nasıl toplandığı, saklandığı ve korunduğu hakkında bilgi edinin.',
    url: 'https://luxqrpro.site/privacy',
    siteName: 'LuxQr',
    locale: 'tr_TR',
    type: 'website',
    images: '/luxqrlogo2.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gizlilik Politikası | LuxQr',
    description: 'LuxQr gizlilik politikası. Verilerinizin nasıl toplandığı, saklandığı ve korunduğu hakkında bilgi edinin.',
    images: '/luxqrlogo2.png',
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
