'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Home, QrCode, FileText, MessageSquare, Phone, Scale, Lock, Info } from 'lucide-react';

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
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 p-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 glow-border"
        style={{
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)',
        }}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-slate-900/95 backdrop-blur-xl z-50 border-r border-white/10 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Logo */}
        <div className="px-6 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <QrCode className="w-8 h-8 text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
            <span className="text-2xl font-bold text-white">LuxQr</span>
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

          {/* Legal Section */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-4">
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
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 text-sm ${
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
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <p className="text-xs text-gray-500 text-center">
            © 2026 LuxQr. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </>
  );
}
