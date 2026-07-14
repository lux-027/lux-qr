'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Instagram } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Star {
  id: number;
  left: number;
  top: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

function generateStars(count: number): Star[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    opacity: Math.random() * 0.7 + 0.3,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 5,
  }));
}

export default function LuxStudioPage() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(generateStars(140));
  }, []);

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-12">
      {/* deep space gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #1a1025 100%)',
        }}
      />

      {/* starfield */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {stars.map(star => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              boxShadow: `0 0 ${star.size * 2}px rgba(255,255,255,${star.opacity})`,
              animation: `twinkle ${star.duration}s ease-in-out infinite alternate`,
              animationDelay: `${star.delay}s`,
              '--star-opacity': star.opacity,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* nebula glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] rounded-full bg-indigo-600/20 blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-5xl">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">
          {/* Left: LuxQr */}
          <div className="flex-1 flex flex-col items-center md:items-end text-center md:text-right px-4 md:px-12">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/favicon-32x32.png"
                alt="LuxQr Logo"
                width={40}
                height={40}
                className="drop-shadow-lg"
                unoptimized
              />
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight drop-shadow-lg">
                Lux<span className="text-purple-400">Qr</span>
              </h1>
            </div>
            <p className="text-purple-200/80 text-sm md:text-base max-w-xs">
              Modern, ücretsiz ve güvenli QR kod çözümleri.
            </p>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-56 bg-gradient-to-b from-transparent via-purple-400/60 to-transparent opacity-70" />
          <div className="md:hidden w-48 h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent opacity-70" />

          {/* Right: LUX INC */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left px-4 md:px-12">
            <Image
              src="/luxstudio_logo.png"
              alt="LUX INC Logo"
              width={120}
              height={120}
              className="mb-4 drop-shadow-2xl rounded-2xl"
              unoptimized
            />
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight drop-shadow-lg mb-2">
              LUX <span className="text-purple-400">INC</span>
            </h2>
            <p className="text-purple-200/80 text-sm md:text-base mb-6 max-w-xs">
              Ana markamız. Dijital stüdyo çözümleri için LUX INC.
            </p>
            <Link
              href="https://www.instagram.com/lux.studio.inc/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm md:text-base"
            >
              <Instagram className="w-4 h-4 md:w-5 md:h-5" />
              Bizi Instagram&apos;dan takip edin
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
