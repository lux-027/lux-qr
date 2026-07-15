import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PDF, Belge, Resim ve Metin QR Kod Dönüştürücü - LuxQR',
  description: 'PDF, Word, resim, video ve metin dosyalarınızı saniyeler içinde QR koda dönüştürün, dijital dökümantasyon hızını maksimuma çıkarın.',
  keywords: ['metin qr kod', 'belge qr kod', 'dosya qr yapma', 'resim qr kod', 'video qr kod', 'qr kod oluşturucu'],
  openGraph: {
    title: 'PDF, Belge, Resim ve Metin QR Kod Dönüştürücü - LuxQR',
    description: 'PDF, Word, resim, video ve metin dosyalarınızı saniyeler içinde QR koda dönüştürün, dijital dökümantasyon hızını maksimuma çıkarın.',
    url: 'https://www.luxqrpro.site/qr/metin-belge',
    siteName: 'LuxQR',
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF, Belge, Resim ve Metin QR Kod Dönüştürücü - LuxQR',
    description: 'PDF, Word, resim, video ve metin dosyalarınızı saniyeler içinde QR koda dönüştürün, dijital dökümantasyon hızını maksimuma çıkarın.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
