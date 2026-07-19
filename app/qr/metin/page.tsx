import type { Metadata } from "next";
import MetinContent from '@/components/MetinContent';

export const metadata: Metadata = {
  title: "Metin QR Kod Oluşturucu | LuxQr",
  description: "Metin içeriğiniz için ücretsiz QR kod oluşturun. Notlar, açıklamalar ve kısa metinleri saniyeler içinde QR koda dönüştürün.",
  keywords: ["metin qr kod", "not qr kod", "açıklama qr kod", "metin qr oluşturucu"],
  openGraph: {
    title: "Metin QR Kod Oluşturucu | LuxQr",
    description: "Metin içeriğiniz için ücretsiz QR kod oluşturun.",
    url: "https://luxqrpro.site/qr/metin",
    type: "website",
    images: '/luxqrlogo2.png',
  },
  twitter: {
    title: "Metin QR Kod Oluşturucu",
    description: "Metin içeriğiniz için ücretsiz QR kod oluşturun.",
    images: '/luxqrlogo2.png',
  },
};

export default function MetinPage() {
  return <MetinContent />;
}
