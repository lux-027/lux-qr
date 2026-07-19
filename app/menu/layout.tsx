import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dijital Menü | LuxQr',
  description: 'LuxQr ile oluşturulmuş dijital menü. Restoran, kafe ve hizmet listelerini kolayca görüntüleyin.',
  openGraph: {
    title: 'Dijital Menü | LuxQr',
    description: 'LuxQr ile oluşturulmuş dijital menü. Restoran, kafe ve hizmet listelerini kolayca görüntüleyin.',
    siteName: 'LuxQr',
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dijital Menü | LuxQr',
    description: 'LuxQr ile oluşturulmuş dijital menü. Restoran, kafe ve hizmet listelerini kolayca görüntüleyin.',
  },
};

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-white">{children}</div>;
}
