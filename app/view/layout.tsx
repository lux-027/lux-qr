import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'QR Kod İçeriği | LuxQr',
  description: 'LuxQr ile oluşturulmuş paylaşılabilir QR kod içeriği. Metin, dosya, resim, video ve daha fazlasını görüntüleyin.',
  openGraph: {
    title: 'QR Kod İçeriği | LuxQr',
    description: 'LuxQr ile oluşturulmuş paylaşılabilir QR kod içeriği.',
    siteName: 'LuxQr',
    locale: 'tr_TR',
    type: 'website',
    images: '/favicon.svg',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QR Kod İçeriği | LuxQr',
    description: 'LuxQr ile oluşturulmuş paylaşılabilir QR kod içeriği.',
    images: '/favicon.svg',
  },
};

export default function ViewLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-white">{children}</div>;
}
