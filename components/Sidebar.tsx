'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Home, QrCode, FileText, MessageSquare, Phone, Scale, Lock, Info, Type, CreditCard, Wifi, Share2, Mic, Landmark, Image as ImageIcon, ShoppingBag } from 'lucide-react';
import ShareButton from './ShareButton';
import { useState } from 'react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  const mainItems = [
    { href: '/', label: 'Ana Sayfa', icon: Home, color: 'text-amber-400' },
  ];

  const qrItems = [
    { href: '/qr/metin', label: 'Metin', icon: Type, color: 'text-blue-400' },
    { href: '/qr/metin-belge', label: 'Resim/Video/Belge', icon: ImageIcon, color: 'text-violet-400' },
    { href: '/qr/kartvizit', label: 'Kartvizit', icon: CreditCard, color: 'text-cyan-400' },
    { href: '/qr/wifi', label: 'WiFi', icon: Wifi, color: 'text-emerald-400' },
    { href: '/qr/sosyal-medya', label: 'Sosyal Medya', icon: Share2, color: 'text-pink-400' },
    { href: '/qr/ses-dosyasi', label: 'Ses Dosyası', icon: Mic, color: 'text-orange-400' },
    { href: '/qr/iban', label: 'IBAN', icon: Landmark, color: 'text-yellow-400' },
    { href: '/qr/fiyat-listesi', label: 'Fiyat Listesi', icon: ShoppingBag, color: 'text-rose-400' },
  ];

  const otherItems = [
    { href: '/blog', label: 'LuxQr Blog', icon: FileText, color: 'text-sky-400' },
    { href: '/faq', label: 'Sıkça Sorulan Sorular', icon: MessageSquare, color: 'text-indigo-400' },
    { href: '/contact', label: 'İletişim', icon: Phone, color: 'text-teal-400' },
  ];

  const legalItems = [
    { href: '/terms', label: 'Kullanım Şartları', icon: FileText, color: 'text-orange-400' },
    { href: '/privacy', label: 'Gizlilik Politikası', icon: Lock, color: 'text-purple-400' },
    { href: '/about', label: 'Hakkımızda', icon: Info, color: 'text-blue-400' },
  ];

  return (
    <>
      {/* Overlay - Only on mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
        />
      )}

      {/* Sidebar - Fixed on desktop, overlay on mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-slate-800/90 backdrop-blur-xl z-50 border-r border-white/20 transition-transform duration-300 ease-in-out md:translate-x-0 flex flex-col  ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="px-6 pt-8 pb-6 border-b border-white/20">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-400 shadow-lg flex items-center justify-center">
                <QrCode className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white text-gradient">LuxQr</span>
            </div>
            <ShareButton />
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto py-6 px-4 bg-slate-700/50">
          <nav className="space-y-2">
            {/* Main Items */}
            {mainItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-blue-400/50 text-white'
                      : 'text-gray-200 hover:bg-white/10 hover:text-white'
                  }`}
                  style={
                    isActive
                      ? {
                          boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)',
                        }
                      : {}
                  }
                >
                  <item.icon className={`w-4 h-4 ${isActive ? 'text-white' : item.color}`} />
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              );
            })}

            {/* Divider */}
            <div className="border-t border-white/20 my-4"></div>

            {/* QR Categories */}
            <div className="flex items-center gap-2 px-2 py-1.5 mb-1">
              <QrCode className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-gray-300 font-semibold uppercase tracking-wider">QR Kod Türleri</span>
            </div>

            <div className="space-y-1 pl-1">
              {qrItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2 transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-blue-400/50 text-white'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                    style={isActive ? { boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)' } : {}}
                  >
                    <item.icon className={`w-4 h-4 ${isActive ? 'text-white' : item.color}`} />
                    <span className="font-medium text-sm">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Divider */}
            <div className="border-t border-white/20 my-4"></div>

            {/* Other Items */}
            {otherItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-blue-400/50 text-white'
                      : 'text-gray-200 hover:bg-white/10 hover:text-white'
                  }`}
                  style={
                    isActive
                      ? {
                          boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)',
                        }
                      : {}
                  }
                >
                  <item.icon className={`w-4 h-4 ${isActive ? 'text-white' : item.color}`} />
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Legal Section - Fixed at bottom */}
        <div className="border-t border-white/10">
          <div className="px-4 pt-4 pb-2">
            <div className="flex items-center gap-1.5 mb-3 px-2">
              <Scale className="w-4 h-4 text-slate-500" />
              <p className="text-xs text-gray-500 uppercase tracking-wider">Yasal Sayfalar</p>
            </div>
            <nav className="space-y-1">
              {legalItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-2 py-2 transition-all duration-300 text-sm ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/50 text-white'
                        : 'text-gray-400 hover:bg-white/5 hover:text-gray-300'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 ${isActive ? 'text-white' : item.color}`} />
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
