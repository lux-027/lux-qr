'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { QrCode, Menu, X, ArrowLeft } from 'lucide-react';

interface MobileHeaderProps {
  isOpen: boolean;
  onMenuClick: () => void;
}

export default function MobileHeader({ isOpen, onMenuClick }: MobileHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';

  const handleBack = () => {
    router.back();
  };

  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-white/10">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-400 shadow-lg flex items-center justify-center">
            <QrCode className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">LuxQr</span>
        </Link>

        {/* Back Button (on non-home pages) or Menu/Close Button */}
        {!isHomePage ? (
          <button
            onClick={handleBack}
            aria-label="Geri"
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all duration-200"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        ) : (
          <button
            onClick={onMenuClick}
            aria-label={isOpen ? "Menüyü Kapat" : "Menüyü Aç"}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all duration-200"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        )}
      </div>
    </header>
  );
}
