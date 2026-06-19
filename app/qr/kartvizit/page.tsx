import type { Metadata } from "next";
import KartvizitContent from '@/components/KartvizitContent';

export const metadata: Metadata = {
  title: "Kartvizit QR Kod Oluşturucu | vCard Dijital Kartvizit | LuxQr",
  description: "Profesyonel dijital kartvizit QR kodu oluşturun. vCard formatında isim, telefon, e-posta, şirket ve adres bilgilerinizi QR koda dönüştürün. Ücretsiz ve hızlı.",
  keywords: ["kartvizit qr kod", "vcard qr", "dijital kartvizit", "iş kartı qr", "kartvizit oluşturucu", "vcf qr kod"],
  openGraph: {
    title: "Kartvizit QR Kod Oluşturucu | vCard Dijital Kartvizit | LuxQr",
    description: "Profesyonel dijital kartvizit QR kodu oluşturun. vCard formatında kartvizit bilgilerinizi QR koda dönüştürün.",
    url: "https://www.luxqrpro.site/qr/kartvizit",
    type: "website",
  },
  twitter: {
    title: "Kartvizit QR Kod Oluşturucu | vCard Dijital Kartvizit",
    description: "Profesyonel dijital kartvizit QR kodu oluşturun. vCard formatında kartvizit bilgilerinizi QR koda dönüştürün.",
  },
};

export default function KartvizitPage() {
  return <KartvizitContent />;
}
