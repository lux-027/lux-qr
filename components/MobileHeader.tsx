'use client';

import Link from 'next/link';
import Image from 'next/image';
import ShareButton from './ShareButton';

interface MobileHeaderProps {
  isOpen: boolean;
  onMenuClick: () => void;
}

export default function MobileHeader({ isOpen, onMenuClick }: MobileHeaderProps) {
  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-black/08 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/luxqrlogo2.png" alt="LuxQr" width={32} height={32} className="rounded-lg shadow-md" />
          <span className="text-xl font-bold text-gradient">LuxQr</span>
        </Link>

        <div className="flex items-center gap-2">
          <ShareButton />
          <button
            onClick={onMenuClick}
          aria-label={isOpen ? "Menüyü Kapat" : "Menüyü Aç"}
          className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all duration-200"
        >
          {isOpen ? (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="x-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3b82f6" />
                  <stop offset="1" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
              <line x1="18" y1="6" x2="6" y2="18" stroke="url(#x-gradient)" strokeWidth="2" strokeLinecap="round" />
              <line x1="6" y1="6" x2="18" y2="18" stroke="url(#x-gradient)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="hamburger-gradient" x1="0" y1="0" x2="24" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3b82f6" />
                  <stop offset="1" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
              <line x1="2" y1="6" x2="22" y2="6" stroke="url(#hamburger-gradient)" strokeWidth="2" strokeLinecap="round" />
              <line x1="2" y1="12" x2="16" y2="12" stroke="url(#hamburger-gradient)" strokeWidth="2" strokeLinecap="round" />
              <line x1="2" y1="18" x2="22" y2="18" stroke="url(#hamburger-gradient)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
        </div>
      </div>
    </header>
  );
}
