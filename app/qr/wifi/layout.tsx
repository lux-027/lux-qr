import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hızlı ve Güvenli WiFi QR Kodu Oluşturucu - LuxQR',
  description: 'İşletmeniz veya eviniz için şifre yazma derdine son veren, tek tıkla otomatik bağlanan güvenli WiFi QR kodları oluşturun.',
  keywords: ['wifi qr kod', 'wifi şifre qr', 'wifi paylaşım qr', 'wpa qr kod', 'ağ qr kodu'],
  openGraph: {
    title: 'Hızlı ve Güvenli WiFi QR Kodu Oluşturucu - LuxQR',
    description: 'İşletmeniz veya eviniz için şifre yazma derdine son veren, tek tıkla otomatik bağlanan güvenli WiFi QR kodları oluşturun.',
    url: 'https://www.luxqrpro.site/qr/wifi',
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
    title: 'Hızlı ve Güvenli WiFi QR Kodu Oluşturucu - LuxQR',
    description: 'İşletmeniz veya eviniz için şifre yazma derdine son veren, tek tıkla otomatik bağlanan güvenli WiFi QR kodları oluşturun.',
    images: ['https://www.luxqrpro.site/logo.svg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
