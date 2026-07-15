import type { Metadata } from "next";
import SesDosyasiContent from '@/components/SesDosyasiContent';

export const metadata: Metadata = {
  title: "Ses Dosyası QR Kod Oluşturucu | MP3, WAV, M4A | LuxQr",
  description: "Ses dosyalarınız yükleyerek QR kod oluşturun. Podcast bölümleri, sesli rehberler ve müzik dosyalarınız için QR kod. MP3, WAV, M4A format desteği.",
  keywords: ["ses dosyası qr kod", "mp3 qr kod", "wav qr kod", "m4a qr kod", "sesli rehber qr", "podcast qr kod", "ses qr oluşturucu"],
  openGraph: {
    title: "Ses Dosyası QR Kod Oluşturucu | MP3, WAV, M4A | LuxQr",
    description: "Ses dosyalarınız yükleyerek QR kod oluşturun. Podcast bölümleri, sesli rehberler ve müzik dosyalarınız için QR kod.",
    url: "https://luxqrpro.site/qr/ses-dosyasi",
    type: "website",
  },
  twitter: {
    title: "Ses Dosyası QR Kod Oluşturucu | MP3, WAV, M4A",
    description: "Ses dosyalarınız yükleyerek QR kod oluşturun. Podcast bölümleri, sesli rehberler ve müzik dosyalarınız için QR kod.",
  },
};

export default function SesDosyasiPage() {
  return <SesDosyasiContent />;
}
