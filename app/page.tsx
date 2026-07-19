import type { Metadata } from "next";
import HomeContent from '@/components/HomeContent';

export const metadata: Metadata = {
  title: "LuxQr - Ücretsiz QR Kod Oluşturucu | Metin, WiFi, Kartvizit, Sosyal Medya",
  description: "Türkiye'nin en gelişmiş QR kod oluşturucu. Metin, resim, video, belge, WiFi, kartvizit, sosyal medya ve ses dosyaları için ücretsiz QR kod oluşturun. Hızlı, güvenli ve modern.",
  keywords: ["qr kod oluşturucu", "ücretsiz qr kod", "wifi qr kod", "kartvizit qr", "instagram qr", "tiktok qr", "metin qr", "dosya qr", "türkiye qr kod", "qr kod yap"],
  openGraph: {
    title: "LuxQr - Ücretsiz QR Kod Oluşturucu | Metin, WiFi, Kartvizit, Sosyal Medya",
    description: "Türkiye'nin en gelişmiş QR kod oluşturucu. Ücretsiz ve güvenli QR kod oluşturma platformu.",
    url: "https://luxqrpro.site",
    type: "website",
    images: '/favicon.svg',
  },
  twitter: {
    title: "LuxQr - Ücretsiz QR Kod Oluşturucu",
    description: "Türkiye'nin en gelişmiş QR kod oluşturucu. Metin, resim, video, belge, WiFi, kartvizit, sosyal medya ve ses dosyaları için ücretsiz QR kod oluşturun.",
    images: '/favicon.svg',
  },
};

export default function Home() {
  return <HomeContent />;
}
