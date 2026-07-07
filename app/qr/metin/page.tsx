import type { Metadata } from "next";
import MetinContent from '@/components/MetinContent';

export const metadata: Metadata = {
  title: "Metin QR Kod Oluşturucu | LuxQr",
  description: "Metin içeriğiniz için ücretsiz QR kod oluşturun. Notlar, açıklamalar ve kısa metinleri saniyeler içinde QR koda dönüştürün.",
  keywords: ["metin qr kod", "not qr kod", "açıklama qr kod", "metin qr oluşturucu"],
  openGraph: {
    title: "Metin QR Kod Oluşturucu | LuxQr",
    description: "Metin içeriğiniz için ücretsiz QR kod oluşturun.",
    url: "https://www.luxqrpro.site/qr/metin",
    type: "website",
  },
  twitter: {
    title: "Metin QR Kod Oluşturucu",
    description: "Metin içeriğiniz için ücretsiz QR kod oluşturun.",
  },
};

export default function MetinPage() {
  return <MetinContent />;
}
