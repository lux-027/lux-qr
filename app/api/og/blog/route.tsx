import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0f172a',
          backgroundImage: 'linear-gradient(to bottom right, #1e293b, #0f172a)',
          position: 'relative',
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)
            `,
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 80,
            height: '100%',
            textAlign: 'center',
          }}
        >
          {/* Logo/Brand */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              marginBottom: 40,
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: 16,
                background: 'linear-gradient(135deg, #3b82f6, #9333ea)',
                display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 40,
              fontWeight: 700,
              color: '#fff',
              boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
            }}
            >
              QR
            </div>
            <div
              style={{
                fontSize: 48,
                fontWeight: 800,
                color: '#fff',
              }}
            >
              LuxQr
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              background: 'linear-gradient(135deg, #3b82f6, #9333ea)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: 24,
            }}
          >
            Blog
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 28,
              color: '#94a3b8',
              marginBottom: 40,
            }}
          >
            QR Kod Rehberi ve Güncel Haberler
          </div>

          {/* Features */}
          <div
            style={{
              display: 'flex',
              gap: 32,
              fontSize: 20,
              color: '#64748b',
            }}
          >
            <div>📱 QR Kod İpuçları</div>
            <div>🔧 Kullanım Rehberleri</div>
            <div>🚀 Teknoloji Haberleri</div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 400,
            height: 400,
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), transparent)',
            borderRadius: '50%',
            filter: 'blur(80px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 300,
            height: 300,
            background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.1), transparent)',
            borderRadius: '50%',
            filter: 'blur(80px)',
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
