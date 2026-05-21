import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 512, height: 512 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '24%',
          border: '8px solid #3b82f6',
          boxShadow: '0 0 60px rgba(59, 130, 246, 0.5)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* QR Code SVG */}
          <svg
            width="240"
            height="240"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.8))',
            }}
          >
            <rect x="3" y="3" width="7" height="7" rx="1" fill="#3b82f6" />
            <rect x="14" y="3" width="7" height="7" rx="1" fill="#3b82f6" />
            <rect x="3" y="14" width="7" height="7" rx="1" fill="#3b82f6" />
            <rect x="5" y="5" width="3" height="3" rx="0.5" fill="#0f172a" />
            <rect x="16" y="5" width="3" height="3" rx="0.5" fill="#0f172a" />
            <rect x="5" y="16" width="3" height="3" rx="0.5" fill="#0f172a" />
            <rect x="12" y="12" width="4" height="4" rx="1" fill="#8b5cf6" />
            <rect x="12" y="6" width="2" height="2" rx="0.5" fill="#8b5cf6" />
            <rect x="6" y="12" width="2" height="2" rx="0.5" fill="#8b5cf6" />
            <rect x="16" y="14" width="2" height="2" rx="0.5" fill="#8b5cf6" />
            <rect x="14" y="16" width="2" height="2" rx="0.5" fill="#8b5cf6" />
          </svg>
          <span
            style={{
              color: '#ffffff',
              fontSize: 48,
              fontWeight: 'bold',
              marginTop: '20px',
              letterSpacing: '4',
              textShadow: '0 0 20px rgba(139, 92, 246, 0.8)',
            }}
          >
            LuxQr
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
