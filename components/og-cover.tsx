import { ImageResponse } from 'next/og';

export const alt = 'LuxQr - Ücretsiz QR Kod Oluşturucu';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function ogCoverImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #0891b2 100%)',
          color: '#ffffff',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Decorative blurred orbs */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            left: -80,
            width: 420,
            height: 420,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.16)',
            filter: 'blur(80px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -140,
            right: -60,
            width: 520,
            height: 520,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.12)',
            filter: 'blur(100px)',
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 22,
            marginBottom: 28,
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: 92,
              height: 92,
              borderRadius: 24,
              background: 'rgba(255, 255, 255, 0.18)',
              border: '2px solid rgba(255, 255, 255, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 24px 48px rgba(0, 0, 0, 0.18)',
            }}
          >
            <span style={{ fontSize: 42, fontWeight: 900 }}>QR</span>
          </div>
          <span style={{ fontSize: 64, fontWeight: 900, letterSpacing: -1.5 }}>LuxQr</span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: 52,
            fontWeight: 800,
            marginBottom: 18,
            zIndex: 1,
            textAlign: 'center',
          }}
        >
          Ücretsiz QR Kod Oluşturucu
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 28,
            fontWeight: 500,
            opacity: 0.92,
            zIndex: 1,
            textAlign: 'center',
          }}
        >
          Metin • WiFi • Kartvizit • Sosyal Medya • Dosya
        </p>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
