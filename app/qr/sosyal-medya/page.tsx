import type { Metadata } from "next";
import SosyalMedyaContent from '@/components/SosyalMedyaContent';

export const metadata: Metadata = {
  title: "Sosyal Medya QR Kod Oluşturucu | Instagram, TikTok, Facebook, YouTube | LuxQr",
  description: "Instagram, TikTok, Facebook ve YouTube sayfalarınız için QR kod oluşturun. Link-in-bio çözümleri ile tüm sosyal medya hesaplarınızı tek noktada toplayın.",
  keywords: ["sosyal medya qr kod", "instagram qr", "tiktok qr", "facebook qr", "youtube qr", "link-in-bio qr", "sosyal medya qr oluşturucu"],
  openGraph: {
    title: "Sosyal Medya QR Kod Oluşturucu | Instagram, TikTok, Facebook, YouTube | LuxQr",
    description: "Instagram, TikTok, Facebook ve YouTube sayfalarınız için QR kod oluşturun. Link-in-bio çözümleri ile tüm sosyal medya hesaplarınızı tek noktada toplayın.",
    url: "https://luxqrpro.site/qr/sosyal-medya",
    type: "website",
  },
  twitter: {
    title: "Sosyal Medya QR Kod Oluşturucu | Instagram, TikTok, Facebook, YouTube",
    description: "Instagram, TikTok, Facebook ve YouTube sayfalarınız için QR kod oluşturun. Link-in-bio çözümleri ile tüm sosyal medya hesaplarınızı tek noktada toplayın.",
  },
};

export default function SosyalMedyaPage() {
  return <SosyalMedyaContent />;
}
