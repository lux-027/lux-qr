'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Home, QrCode, FileText, MessageSquare, Phone, Scale, Lock, Info } from 'lucide-react';
import ShareButton from './ShareButton';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { href: '/', label: 'Ana Sayfa', icon: Home },
    { href: '/blog', label: 'LuxQr Blog', icon: FileText },
    { href: '/faq', label: 'Sıkça Sorulan Sorular', icon: MessageSquare },
    { href: '/contact', label: 'İletişim', icon: Phone },
  ];

  const legalItems = [
    { href: '/terms', label: 'Kullanım Şartları', icon: Scale },
    { href: '/privacy', label: 'Gizlilik Politikası', icon: Lock },
    { href: '/about', label: 'Hakkımızda', icon: Info },
  ];

  return (
    <>
      {/* Hamburger Button - Only show on mobile */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-16 left-4 z-50 p-3 rounded-2xl bg-slate-800/50 text-blue-500 hover:text-blue-400 hover:bg-slate-700/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300 border border-white/10"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="4" y1="5" x2="20" y2="5" />
          <line x1="4" y1="12" x2="16" y2="12" />
          <line x1="4" y1="19" x2="12" y2="19" />
        </svg>
      </button>

      {/* Overlay - Only on mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
        />
      )}

      {/* Sidebar - Fixed on desktop, overlay on mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-slate-900/95 backdrop-blur-xl z-50 border-r border-white/10 transition-transform duration-300 ease-in-out md:translate-x-0 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close Button - Only show on mobile */}
        <div className="md:hidden flex justify-end p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Logo */}
        <div className="px-6 pt-8 pb-6 border-b border-white/10">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <QrCode className="w-8 h-8 text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
              <span className="text-2xl font-bold text-white">LuxQr</span>
            </div>
            <ShareButton />
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto py-6 px-4">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/50 text-white'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                  style={
                    isActive
                      ? {
                          boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
                        }
                      : {}
                  }
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Legal Section - Fixed at bottom */}
        <div className="border-t border-white/10">
          <div className="px-4 pt-4 pb-2">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-2">
              Yasal Sayfalar
            </p>
            <nav className="space-y-1">
              {legalItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-2 py-2 rounded-lg transition-all duration-300 text-sm ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/50 text-white'
                        : 'text-gray-400 hover:bg-white/5 hover:text-gray-300'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <p className="text-xs text-gray-500 text-center">
              © 2026 LuxQr. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
