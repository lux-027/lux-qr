import type { Metadata } from 'next';
import IbanContent from '@/components/IbanContent';

export const metadata: Metadata = {
  title: "IBAN QR Kodu Oluşturucu | Havale ve Ödeme QR Kodu | LuxQr",
  description: "IBAN ve banka hesap bilgileriniz için ödeme QR kodu oluşturun. Havale ve para transferlerinde hızlı ödeme alın.",
  keywords: ["iban qr kod", "ödeme qr kod", "havale qr", "banka qr kod", "iban qr oluşturucu"],
  openGraph: {
    title: "IBAN QR Kodu Oluşturucu | Havale ve Ödeme QR Kodu | LuxQr",
    description: "IBAN ve banka hesap bilgileriniz için ödeme QR kodu oluşturun. Havale ve para transferlerinde hızlı ödeme alın.",
    url: "https://luxqrpro.site/qr/iban",
    type: "website",
    images: '/favicon.svg',
  },
  twitter: {
    title: "IBAN QR Kodu Oluşturucu | Havale ve Ödeme QR Kodu",
    description: "IBAN ve banka hesap bilgileriniz için ödeme QR kodu oluşturun.",
    images: '/favicon.svg',
  },
};

export default function IbanPage() {
  return <IbanContent />;
}
