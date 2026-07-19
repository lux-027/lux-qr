import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sıkça Sorulan Sorular | LuxQr',
  description: 'LuxQr QR kod oluşturucu hakkında merak edilen tüm soruların yanıtları. Ücretsiz QR kod oluşturma, kullanım ve güvenlik bilgileri.',
  keywords: ['luxqr sss', 'sıkça sorulan sorular', 'qr kod nasıl oluşturulur', 'qr kod destek'],
  openGraph: {
    title: 'Sıkça Sorulan Sorular | LuxQr',
    description: 'LuxQr QR kod oluşturucu hakkında merak edilen tüm soruların yanıtları.',
    url: 'https://luxqrpro.site/faq',
    siteName: 'LuxQr',
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sıkça Sorulan Sorular | LuxQr',
    description: 'LuxQr QR kod oluşturucu hakkında merak edilen tüm soruların yanıtları.',
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
