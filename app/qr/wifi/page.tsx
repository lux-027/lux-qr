import type { Metadata } from "next";
import WifiContent from '@/components/WifiContent';

export const metadata: Metadata = {
  title: "WiFi QR Kod Oluşturucu | WiFi Ağ Paylaşımı | LuxQr",
  description: "WiFi ağ bilgilerinizi QR kod ile kolayca paylaşın. Şifreli ve şifresiz WiFi ağları için QR kod oluşturun. Misafirlerinize WiFi şifresini söylemeden paylaşın.",
  keywords: ["wifi qr kod", "wifi ağ qr", "wifi şifre qr", "wifi paylaşım qr", "wpa qr kod", "wifi qr oluşturucu"],
  openGraph: {
    title: "WiFi QR Kod Oluşturucu | WiFi Ağ Paylaşımı | LuxQr",
    description: "WiFi ağ bilgilerinizi QR kod ile kolayca paylaşın. Şifreli ve şifresiz WiFi ağları için QR kod oluşturun.",
    url: "https://luxqrpro.site/qr/wifi",
    type: "website",
    images: '/luxqrlogo2.png',
  },
  twitter: {
    title: "WiFi QR Kod Oluşturucu | WiFi Ağ Paylaşımı",
    description: "WiFi ağ bilgilerinizi QR kod ile kolayca paylaşın. Şifreli ve şifresiz WiFi ağları için QR kod oluşturun.",
    images: '/luxqrlogo2.png',
  },
};

export default function WifiPage() {
  return <WifiContent />;
}
