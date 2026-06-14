import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sosyal Medya QR Kod Oluşturucu - LuxQr',
  description: 'Instagram, TikTok, Facebook ve YouTube hesaplarınız için QR kod oluşturun. Takipçi kazanımını artırın.',
  keywords: ['instagram qr kod', 'tiktok qr', 'facebook qr', 'youtube qr', 'sosyal medya qr', 'link-in-bio qr'],
  openGraph: {
    title: 'Sosyal Medya QR Kod Oluşturucu - LuxQr',
    description: 'Instagram, TikTok, Facebook ve YouTube hesaplarınız için QR kod oluşturun.',
    url: 'https://www.luxqrpro.site/qr/sosyal-medya',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
