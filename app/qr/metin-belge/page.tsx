import type { Metadata } from "next";
import MetinBelgeContent from '@/components/MetinBelgeContent';

export const metadata: Metadata = {
  title: "Metin, Resim, Video, Belge QR Kod Oluşturucu | LuxQr",
  description: "Metin, resim, video ve belge dosyalarınız için ücretsiz QR kod oluşturun. Notlar, açıklamalar, görseller ve dosyalarınızı saniyeler içinde QR koda dönüştürün.",
  keywords: ["metin qr kod", "resim qr kod", "video qr kod", "belge qr kod", "dosya qr kod", "metin qr oluşturucu"],
  openGraph: {
    title: "Metin, Resim, Video, Belge QR Kod Oluşturucu | LuxQr",
    description: "Metin, resim, video ve belge dosyalarınız için ücretsiz QR kod oluşturun.",
    url: "https://www.luxqrpro.site/qr/metin-belge",
    type: "website",
  },
  twitter: {
    title: "Metin, Resim, Video, Belge QR Kod Oluşturucu",
    description: "Metin, resim, video ve belge dosyalarınız için ücretsiz QR kod oluşturun.",
  },
};

export default function MetinBelgePage() {
  return <MetinBelgeContent />;
}
