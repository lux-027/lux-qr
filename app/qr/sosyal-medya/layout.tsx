import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sosyal Medya Link-in-Bio QR Kodu Oluşturma - LuxQR',
  description: 'Instagram, TikTok, Facebook ve YouTube hesaplarınızı tek bir şık ekranda toplayan Link-in-Bio QR kodları ile etkileşiminizi artırın.',
  keywords: ['instagram qr kod', 'tiktok qr', 'facebook qr', 'youtube qr', 'sosyal medya qr', 'link-in-bio qr'],
  openGraph: {
    title: 'Sosyal Medya Link-in-Bio QR Kodu Oluşturma - LuxQR',
    description: 'Instagram, TikTok, Facebook ve YouTube hesaplarınızı tek bir şık ekranda toplayan Link-in-Bio QR kodları ile etkileşiminizi artırın.',
    url: 'https://luxqrpro.site/qr/sosyal-medya',
    siteName: 'LuxQR',
    locale: 'tr_TR',
    type: 'website',
    images: '/favicon.svg',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sosyal Medya Link-in-Bio QR Kodu Oluşturma - LuxQR',
    description: 'Instagram, TikTok, Facebook ve YouTube hesaplarınızı tek bir şık ekranda toplayan Link-in-Bio QR kodları ile etkileşiminizi artırın.',
    images: '/favicon.svg',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
