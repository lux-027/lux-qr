import type { Metadata } from "next";
import HomeContent from '@/components/HomeContent';

export const metadata: Metadata = {
  title: "LuxQr ⚡ Ücretsiz QR Kod Oluştur | WiFi, Kartvizit, Sosyal Medya",
  description: "Türkiye'nin en hızlı ve ücretsiz QR kod oluşturucusu. Metin, WiFi, kartvizit, sosyal medya, ses ve dosyalarınız için saniyeler içinde QR kod hazırlayın. Şimdi ücretsiz deneyin!",
  keywords: ["qr kod oluşturucu", "ücretsiz qr kod", "bedava qr kod", "wifi qr kod", "kartvizit qr", "instagram qr", "tiktok qr", "metin qr", "dosya qr", "türkiye qr kod", "online qr kod", "hızlı qr kod", "qr kod yap"],
  alternates: {
    canonical: "https://luxqrpro.site",
  },
  openGraph: {
    title: "LuxQr ⚡ Ücretsiz QR Kod Oluştur | WiFi, Kartvizit, Sosyal Medya",
    description: "Türkiye'nin en hızlı ve ücretsiz QR kod oluşturucusu. Metin, WiFi, kartvizit, sosyal medya, ses ve dosyalarınız için saniyeler içinde QR kod hazırlayın.",
    url: "https://luxqrpro.site",
    siteName: "LuxQR",
    locale: "tr_TR",
    type: "website",
    images: '/favicon.svg',
  },
  twitter: {
    card: "summary_large_image",
    title: "LuxQr ⚡ Ücretsiz QR Kod Oluşturucu",
    description: "Türkiye'nin en hızlı ve ücretsiz QR kod oluşturucusu. Metin, WiFi, kartvizit, sosyal medya ve ses dosyaları için saniyeler içinde QR kod oluşturun.",
    images: '/favicon.svg',
  },
};

export default function Home() {
  return <HomeContent />;
}
