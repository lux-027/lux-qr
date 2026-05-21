import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
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
          borderRadius: '40px',
          border: '4px solid #3b82f6',
          boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)',
        }}
      >
        {/* Background Glow - matching page.tsx */}
        <div
          style={{
            position: 'absolute',
            width: '120px',
            height: '120px',
            background: 'rgba(59, 130, 246, 0.2)',
            filter: 'blur(40px)',
            borderRadius: '50%',
          }}
        />
        
        {/* QR Code Icon - matching page.tsx QrCode component */}
        <svg
          width="100"
          height="100"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.6))',
          }}
        >
          <rect x="3" y="3" width="7" height="7" rx="1" fill="#60a5fa" />
          <rect x="14" y="3" width="7" height="7" rx="1" fill="#60a5fa" />
          <rect x="3" y="14" width="7" height="7" rx="1" fill="#60a5fa" />
          <rect x="5" y="5" width="3" height="3" rx="0.5" fill="#0f172a" />
          <rect x="16" y="5" width="3" height="3" rx="0.5" fill="#0f172a" />
          <rect x="5" y="16" width="3" height="3" rx="0.5" fill="#0f172a" />
          <rect x="12" y="12" width="4" height="4" rx="1" fill="#a78bfa" />
          <rect x="12" y="6" width="2" height="2" rx="0.5" fill="#a78bfa" />
          <rect x="6" y="12" width="2" height="2" rx="0.5" fill="#a78bfa" />
          <rect x="16" y="14" width="2" height="2" rx="0.5" fill="#a78bfa" />
          <rect x="14" y="16" width="2" height="2" rx="0.5" fill="#a78bfa" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
