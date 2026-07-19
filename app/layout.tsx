import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import LayoutWrapper from "@/components/LayoutWrapper";
import PageWrapper from "@/components/PageWrapper";
import Script from "next/script";
import { CounterProvider } from "@/context/CounterContext";
import { NotificationProvider } from "@/components/Notification";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://luxqrpro.site'),
  title: {
    default: "LuxQr - Ücretsiz QR Kod Oluşturucu | Metin, WiFi, Kartvizit, Sosyal Medya",
    template: "%s | LuxQr"
  },
  description: "Türkiye'nin en gelişmiş QR kod oluşturucu. Metin, resim, video, belge, WiFi, kartvizit, sosyal medya ve ses dosyaları için ücretsiz QR kod oluşturun.",
  keywords: ["qr kod oluşturucu", "ücretsiz qr kod", "wifi qr kod", "kartvizit qr", "instagram qr", "tiktok qr", "metin qr", "dosya qr", "türkiye qr kod"],
  authors: [{ name: "LuxQr Team" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/icon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/icon-144x144.png", type: "image/png", sizes: "144x144" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ]
  },
  openGraph: {
    title: "LuxQr - Ücretsiz QR Kod Oluşturucu | Metin, WiFi, Kartvizit, Sosyal Medya",
    description: "Türkiye'nin en gelişmiş QR kod oluşturucu. Ücretsiz ve güvenli QR kod oluşturma platformu.",
    url: "https://luxqrpro.site",
    siteName: "LuxQR",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LuxQr - Ücretsiz QR Kod Oluşturucu",
    description: "Türkiye'nin en gelişmiş QR kod oluşturucu. Metin, resim, video, belge, WiFi, kartvizit, sosyal medya ve ses dosyaları için ücretsiz QR kod oluşturun.",
  },
  alternates: {
    canonical: './',
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
    <html lang="tr" className="overflow-x-hidden" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="LuxQr" />
        <Script
          id="structured-data-webapp"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "LuxQr - Ücretsiz QR Kod Oluşturucu",
              "description": "Türkiye'nin en gelişmiş QR kod oluşturucu. Metin, resim, video, belge, WiFi, kartvizit, sosyal medya ve ses dosyaları için ücretsiz QR kod oluşturun.",
              "url": "https://luxqrpro.site",
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "TRY"
              },
              "featureList": [
                "Metin QR kod oluşturma",
                "WiFi QR kod oluşturma",
                "Kartvizit QR kod oluşturma",
                "Sosyal medya QR kod oluşturma",
                "Dosya QR kod oluşturma",
                "Ses dosyası QR kod oluşturma"
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "1250",
                "bestRating": "5",
                "worstRating": "1"
              },
              "author": {
                "@type": "Organization",
                "name": "LuxQr Team",
                "url": "https://luxqrpro.site"
              }
            })
          }}
        />
        <Script
          id="structured-data-organization"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "LuxQr",
              "url": "https://luxqrpro.site",
              "logo": "https://luxqrpro.site/luxqrlogo1.png",
              "description": "Türkiye'nin en gelişmiş QR kod oluşturucu",
              "sameAs": [
                "https://www.facebook.com/luxqr",
                "https://www.twitter.com/luxqr",
                "https://www.instagram.com/luxqr"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "info@luxqrpro.site"
              }
            })
          }}
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6964506660604767"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </head>
      <body className={`${inter.className} overflow-x-hidden`}>
        <CounterProvider>
          <NotificationProvider>
            <LayoutWrapper footer={<Footer />}>
              <PageWrapper>
                {children}
              </PageWrapper>
            </LayoutWrapper>
          </NotificationProvider>
        </CounterProvider>
      </body>
    </html>
  );
}
