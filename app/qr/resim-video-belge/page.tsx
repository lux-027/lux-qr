import type { Metadata } from "next";
import MetinBelgeContent from '@/components/MetinBelgeContent';

export const metadata: Metadata = {
  title: "Resim, Video, Belge QR Kod Oluşturucu | LuxQr",
  description: "Resim, video ve belge dosyalarınız için ücretsiz QR kod oluşturun. Görseller, videolar ve dosyalarınızı saniyeler içinde QR koda dönüştürün.",
  keywords: ["resim qr kod", "video qr kod", "belge qr kod", "dosya qr kod", "görsel qr oluşturucu"],
  openGraph: {
    title: "Resim, Video, Belge QR Kod Oluşturucu | LuxQr",
    description: "Resim, video ve belge dosyalarınız için ücretsiz QR kod oluşturun.",
    url: "https://luxqrpro.site/qr/resim-video-belge",
    type: "website",
    images: '/luxqrlogo2.png',
  },
  twitter: {
    title: "Resim, Video, Belge QR Kod Oluşturucu",
    description: "Resim, video ve belge dosyalarınız için ücretsiz QR kod oluşturun.",
    images: '/luxqrlogo2.png',
  },
};

export default function MetinBelgePage() {
  return <MetinBelgeContent />;
}
