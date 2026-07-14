'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Instagram, Handshake, ArrowLeft, QrCode } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Star {
  id: number;
  left: number;
  top: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
  driftDuration: number;
  driftDelay: number;
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
    driftX: (Math.random() - 0.5) * 30,
    driftY: (Math.random() - 0.5) * 30,
    driftDuration: Math.random() * 40 + 40,
    driftDelay: Math.random() * 20,
  }));
}

export default function LuxStudioPage() {
  const [stars, setStars] = useState<Star[]>([]);
  const router = useRouter();

  useEffect(() => {
    setStars(generateStars(140));
  }, []);

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-12">
      {/* Desktop back button */}
      <button
        type="button"
        onClick={() => router.back()}
        className="hidden md:flex absolute top-4 left-4 z-50 items-center gap-2 text-white/90 hover:text-white bg-white/10 hover:bg-white/15 px-4 py-2 rounded-2xl backdrop-blur-md transition-all"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-semibold">Geri</span>
      </button>
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
              animation: `twinkle ${star.duration}s ease-in-out infinite alternate, drift ${star.driftDuration}s linear infinite alternate`,
              animationDelay: `${star.delay}s, ${star.driftDelay}s`,
              '--star-opacity': star.opacity,
              '--drift-x': `${star.driftX}vmin`,
              '--drift-y': `${star.driftY}vmin`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* nebula glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] rounded-full bg-indigo-600/20 blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-5xl">
        {/* Title */}
        <div className="text-center mb-10 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight drop-shadow-lg">
            Lux<span className="text-purple-400">Studio</span>
          </h1>
          <p className="text-white/60 text-sm md:text-base mt-2">İki marka, bir vizyon</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* LuxQr */}
          <div className="group relative flex flex-col items-center text-center p-8 rounded-3xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
            <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex flex-col items-center">
              <Image
                src="/luxqrlogo1.png"
                alt="LuxQr Logo"
                width={120}
                height={120}
                className="w-28 h-28 md:w-32 md:h-32 mb-6 drop-shadow-2xl rounded-2xl"
                unoptimized
              />
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight drop-shadow-lg mb-2">
                Lux<span className="text-purple-400">Qr</span>
              </h2>
              <p className="text-white/60 text-sm md:text-base mb-6 max-w-xs">
                Modern, ücretsiz ve güvenli QR kod çözümleri.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-gray-900 font-semibold text-sm hover:bg-white/90 hover:scale-105 transition-all"
              >
                <QrCode className="w-4 h-4" />
                QR Oluştur
              </Link>
            </div>
          </div>

          {/* LUX INC */}
          <div className="group relative flex flex-col items-center text-center p-8 rounded-3xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
            <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex flex-col items-center">
              <Image
                src="/luxstudio_logo.png"
                alt="LUX INC Logo"
                width={120}
                height={120}
                className="w-28 h-28 md:w-32 md:h-32 mb-6 drop-shadow-2xl rounded-2xl"
                unoptimized
              />
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight drop-shadow-lg mb-2">
                LUX <span className="text-white/40 mx-1">|</span>{' '}
                <span className="text-gray-800">INC</span>
              </h2>
              <p className="text-white/60 text-sm md:text-base mb-6 max-w-xs">
                Ana markamız. Dijital stüdyo çözümleri için LUX INC.
              </p>
              <Link
                href="https://www.instagram.com/lux.studio.inc/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-gray-900 font-semibold text-sm hover:bg-white/90 hover:scale-105 transition-all"
              >
                <Instagram className="w-4 h-4" />
                Instagram&apos;dan takip edin
              </Link>
            </div>
          </div>
        </div>

        {/* Ortak Çalışma */}
        <div className="relative z-10 mt-12 md:mt-16 text-center px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-purple-200 text-xs md:text-sm">
            <Handshake className="w-4 h-4 md:w-5 md:h-5 text-purple-300" />
            <span>LuxQr x LUX INC — Ortak çalışma</span>
          </div>
        </div>
      </div>
    </main>
  );
}
