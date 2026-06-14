import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Metin ve Belge QR Kod Oluşturucu - LuxQr',
  description: 'Metin, resim, video ve belge dosyalarınızı saniyeler içinde QR koda dönüştürün. Ücretsiz ve güvenli QR kod oluşturma.',
  keywords: ['metin qr kod', 'belge qr kod', 'dosya qr yapma', 'resim qr kod', 'video qr kod', 'qr kod oluşturucu'],
  openGraph: {
    title: 'Metin ve Belge QR Kod Oluşturucu - LuxQr',
    description: 'Metin, resim, video ve belge dosyalarınızı saniyeler içinde QR koda dönüştürün.',
    url: 'https://www.luxqrpro.site/qr/metin-belge',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
