import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sosyal Medya Link-in-Bio QR Kodu Oluşturma - LuxQR',
  description: 'Instagram, TikTok, Facebook ve YouTube hesaplarınızı tek bir şık ekranda toplayan Link-in-Bio QR kodları ile etkileşiminizi artırın.',
  keywords: ['instagram qr kod', 'tiktok qr', 'facebook qr', 'youtube qr', 'sosyal medya qr', 'link-in-bio qr'],
  openGraph: {
    title: 'Sosyal Medya Link-in-Bio QR Kodu Oluşturma - LuxQR',
    description: 'Instagram, TikTok, Facebook ve YouTube hesaplarınızı tek bir şık ekranda toplayan Link-in-Bio QR kodları ile etkileşiminizi artırın.',
    url: 'https://www.luxqrpro.site/qr/sosyal-medya',
    siteName: 'LuxQR',
    images: [
      {
        url: 'https://www.luxqrpro.site/logo.svg',
        width: 1200,
        height: 630,
        alt: 'LuxQR Logo',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sosyal Medya Link-in-Bio QR Kodu Oluşturma - LuxQR',
    description: 'Instagram, TikTok, Facebook ve YouTube hesaplarınızı tek bir şık ekranda toplayan Link-in-Bio QR kodları ile etkileşiminizi artırın.',
    images: ['https://www.luxqrpro.site/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
