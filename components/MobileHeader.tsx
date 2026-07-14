'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ArrowLeft } from 'lucide-react';

interface MobileHeaderProps {
  isOpen: boolean;
  onMenuClick: () => void;
}

export default function MobileHeader({ isOpen, onMenuClick }: MobileHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';
  const isLuxStudio = pathname === '/lux-studio';

  const handleBack = () => {
    router.back();
  };

  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-black/08 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        {isLuxStudio ? (
          <button
            onClick={handleBack}
            aria-label="Geri dön"
            className="flex items-center gap-2 text-gray-900 hover:text-gray-600 transition-all"
          >
            <ArrowLeft className="w-6 h-6" />
            <span className="text-base font-semibold">Geri</span>
          </button>
        ) : (
          <Link href="/" className="flex items-center gap-2">
            <Image src="/luxqrlogo1.png" alt="LuxQr" width={32} height={32} className="rounded-lg shadow-md" />
            <span className="text-xl font-bold text-gradient">LuxQr</span>
          </Link>
        )}

        {!isLuxStudio && (
          <button
            onClick={onMenuClick}
            aria-label={isOpen ? "Menüyü Kapat" : "Menüyü Aç"}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all duration-200"
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
