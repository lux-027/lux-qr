import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hızlı ve Güvenli WiFi QR Kodu Oluşturucu - LuxQR',
  description: 'İşletmeniz veya eviniz için şifre yazma derdine son veren, tek tıkla otomatik bağlanan güvenli WiFi QR kodları oluşturun.',
  keywords: ['wifi qr kod', 'wifi şifre qr', 'wifi paylaşım qr', 'wpa qr kod', 'ağ qr kodu'],
  openGraph: {
    title: 'Hızlı ve Güvenli WiFi QR Kodu Oluşturucu - LuxQR',
    description: 'İşletmeniz veya eviniz için şifre yazma derdine son veren, tek tıkla otomatik bağlanan güvenli WiFi QR kodları oluşturun.',
    url: 'https://luxqrpro.site/qr/wifi',
    siteName: 'LuxQR',
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hızlı ve Güvenli WiFi QR Kodu Oluşturucu - LuxQR',
    description: 'İşletmeniz veya eviniz için şifre yazma derdine son veren, tek tıkla otomatik bağlanan güvenli WiFi QR kodları oluşturun.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
