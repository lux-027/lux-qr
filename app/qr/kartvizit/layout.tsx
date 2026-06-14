import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kartvizit QR Kod Oluşturucu - LuxQr',
  description: 'Dijital kartvizit QR kodu oluşturun. İsim, telefon, e-posta ve şirket bilgilerinizi QR koda dönüştürün.',
  keywords: ['kartvizit qr kod', 'vcard qr', 'iş kartı qr', 'digital business card qr', 'contact qr code'],
  openGraph: {
    title: 'Kartvizit QR Kod Oluşturucu - LuxQr',
    description: 'Dijital kartvizit QR kodu oluşturun. İsim, telefon, e-posta ve şirket bilgilerinizi QR koda dönüştürün.',
    url: 'https://www.luxqrpro.site/qr/kartvizit',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
