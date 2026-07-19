import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ücretsiz Dijital vCard Kartvizit QR Kodu Oluştur - LuxQR',
  description: 'Kağıt kartvizitleri bırakın. iOS ve Android uyumlu, tüm iletişim bilgilerinizi içeren modern dijital vCard QR kodunuzu hemen tasarlayın.',
  keywords: ['kartvizit qr kod', 'vcard qr', 'iş kartı qr', 'digital business card qr', 'contact qr code'],
  openGraph: {
    title: 'Ücretsiz Dijital vCard Kartvizit QR Kodu Oluştur - LuxQR',
    description: 'Kağıt kartvizitleri bırakın. iOS ve Android uyumlu, tüm iletişim bilgilerinizi içeren modern dijital vCard QR kodunuzu hemen tasarlayın.',
    url: 'https://luxqrpro.site/qr/kartvizit',
    siteName: 'LuxQR',
    locale: 'tr_TR',
    type: 'website',
    images: '/luxqrlogo2.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ücretsiz Dijital vCard Kartvizit QR Kodu Oluştur - LuxQR',
    description: 'Kağıt kartvizitleri bırakın. iOS ve Android uyumlu, tüm iletişim bilgilerinizi içeren modern dijital vCard QR kodunuzu hemen tasarlayın.',
    images: '/luxqrlogo2.png',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
