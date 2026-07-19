import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kullanım Koşulları | LuxQr',
  description: 'LuxQr kullanım koşulları ve hizmet şartları. Platformu güvenli ve yasal çerçevede kullanmak için gerekli bilgiler.',
  keywords: ['luxqr kullanım koşulları', 'hizmet şartları', 'koşullar', 'kullanım'],
  openGraph: {
    title: 'Kullanım Koşulları | LuxQr',
    description: 'LuxQr kullanım koşulları ve hizmet şartları.',
    url: 'https://luxqrpro.site/terms',
    siteName: 'LuxQr',
    locale: 'tr_TR',
    type: 'website',
    images: '/luxqrlogo2.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kullanım Koşulları | LuxQr',
    description: 'LuxQr kullanım koşulları ve hizmet şartları.',
    images: '/luxqrlogo2.png',
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
