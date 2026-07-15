import type { Metadata } from 'next';
import FiyatListesiContent from '@/components/FiyatListesiContent';

export const metadata: Metadata = {
  title: "Fiyat Listesi QR Kod Oluşturucu | LuxQr",
  description: "Restoran menüsü, hizmet listesi veya ürün fiyatlarınız için ücretsiz QR kod oluşturun. Kategori ve ürün bazlı fiyat listesi QR kodu.",
  keywords: ["fiyat listesi qr kod", "menü qr kod", "restoran qr menü", "hizmet listesi qr kod", "ürün fiyat qr"],
  openGraph: {
    title: "Fiyat Listesi QR Kod Oluşturucu | LuxQr",
    description: "Restoran menüsü, hizmet listesi veya ürün fiyatlarınız için ücretsiz QR kod oluşturun.",
    url: "https://luxqrpro.site/qr/fiyat-listesi",
    type: "website",
  },
  twitter: {
    title: "Fiyat Listesi QR Kod Oluşturucu",
    description: "Restoran menüsü, hizmet listesi veya ürün fiyatlarınız için ücretsiz QR kod oluşturun.",
  },
};

export default function FiyatListesiPage() {
  return <FiyatListesiContent />;
}
