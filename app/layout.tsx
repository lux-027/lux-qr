import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import Script from "next/script";
import { CounterProvider } from "@/context/CounterContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.luxqrpro.site'),
  title: {
    default: "LuxQr - Premium QR Code Generator",
    template: "%s | LuxQr"
  },
  description: "Dijital içeriklerinizi, metinlerinizi ve dosyalarınızı saniyeler içinde yüksek kaliteli, güvenli ve modern QR kodlara dönüştürün.",
  keywords: ["qr kod oluştur", "free qr generator", "premium qr", "dosya qr yapma", "luxqr"],
  authors: [{ name: "LuxQr Team" }],
  openGraph: {
    title: "LuxQr - Premium QR Code Generator",
    description: "Modern ve hızlı QR kod oluşturma platformu.",
    url: "https://www.luxqrpro.site",
    siteName: "LuxQr",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  other: {
    "google-adsense-account": "ca-pub-6964506660604767",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <meta charSet="UTF-8" />
        <link rel="canonical" href="https://www.luxqrpro.site/" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6964506660604767"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      </head>
      <body className={`${inter.className} overflow-x-hidden`}>
        <Sidebar />
        <div className="md:ml-64">
          <CounterProvider>
            {children}
            <Footer />
          </CounterProvider>
        </div>
      </body>
    </html>
  );
}
