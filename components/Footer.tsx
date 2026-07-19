'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  HelpCircle, Info, FileText, MessageSquare, BarChart3, ChevronRight,
  Type, Image as ImageIcon, CreditCard, Wifi, Share2, Mic, Landmark, ShoppingBag,
  Shield, Scale, Mail, BookOpen, Zap, Users, ExternalLink,
} from 'lucide-react';
import { useCounter } from '@/context/CounterContext';

export default function Footer() {
  const { globalCounter } = useCounter();

  const qrLinks = [
    { href: '/qr/metin', label: 'Metin', icon: Type, color: 'text-blue-400' },
    { href: '/qr/resim-video-belge', label: 'Resim/Video/Belge', icon: ImageIcon, color: 'text-violet-400' },
    { href: '/qr/kartvizit', label: 'Dijital Kartvizit', icon: CreditCard, color: 'text-cyan-400' },
    { href: '/qr/wifi', label: 'WiFi', icon: Wifi, color: 'text-emerald-400' },
    { href: '/qr/sosyal-medya', label: 'Sosyal Medya', icon: Share2, color: 'text-pink-400' },
    { href: '/qr/ses-dosyasi', label: 'Ses Dosyası', icon: Mic, color: 'text-orange-400' },
    { href: '/qr/iban', label: 'IBAN', icon: Landmark, color: 'text-yellow-400' },
    { href: '/qr/fiyat-listesi', label: 'Fiyat Listesi', icon: ShoppingBag, color: 'text-rose-400' },
    { href: '/qr/bio-link', label: 'Bio Link', icon: ExternalLink, color: 'text-emerald-400' },
  ];

  const companyLinks = [
    { href: '/about', label: 'Hakkımızda', icon: Users, color: 'text-blue-400' },
    { href: '/privacy', label: 'Gizlilik Politikası', icon: Shield, color: 'text-emerald-400' },
    { href: '/terms', label: 'Şartlar ve Koşullar', icon: Scale, color: 'text-purple-400' },
  ];

  const helpLinks = [
    { href: '/contact', label: 'İletişim', icon: Mail, color: 'text-cyan-400' },
    { href: '/faq', label: 'SSS', icon: BookOpen, color: 'text-amber-400' },
  ];

  return (
    <footer className="border-t border-gray-200 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-8">

          {/* Brand Block */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <Image src="/luxqrlogo2.png" alt="LuxQr" width={40} height={40} className="rounded-2xl shadow-lg shadow-blue-500/30" />
              <div>
                <p className="text-gray-900 font-bold text-xl">LuxQr</p>
                <p className="text-gray-600 text-xs">Modern QR Kod Çözümleri</p>
              </div>
            </div>

            {/* Counter */}
            <div className="relative overflow-hidden rounded-2xl p-2.5 md:p-4"
              style={{
                background: 'linear-gradient(160deg,rgba(255,255,255,0.92) 0%,rgba(248,250,252,0.85) 100%)',
                border: '1.5px solid rgba(99,102,241,0.14)',
                boxShadow: '0 8px 28px rgba(99,102,241,0.12), 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,1)',
                backdropFilter: 'blur(16px)',
              }}>
              {/* top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                style={{ background: 'linear-gradient(90deg,#6366f1,#8b5cf6,#06b6d4)' }} />
              {/* top shine */}
              <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl pointer-events-none"
                style={{ background: 'linear-gradient(180deg,rgba(255,255,255,0.6) 0%,transparent 100%)' }} />
              {/* glow blob */}
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle,rgba(99,102,241,0.10) 0%,transparent 70%)', filter: 'blur(12px)' }} />

              <div className="relative z-10">
                {/* label row */}
                <div className="flex items-center gap-1 md:gap-1.5 mb-2 md:mb-3">
                  <div className="w-4 h-4 md:w-5 md:h-5 rounded-md md:rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg,#f59e0b,#f97316)', boxShadow: '0 2px 8px rgba(245,158,11,0.35)' }}>
                    <Zap className="w-2 h-2 md:w-2.5 md:h-2.5 text-white" />
                  </div>
                  <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.14em] md:tracking-[0.18em] text-indigo-400">Toplam Oluşturulan</span>
                </div>

                {/* counter number */}
                <div className="mb-2">
                  <p className="text-2xl md:text-4xl tabular-nums leading-none text-gray-900"
                    style={{ fontWeight: 300, letterSpacing: '-0.03em' }}>
                    {globalCounter.toLocaleString('tr-TR')}<span style={{ fontWeight: 700, color: '#6366f1' }}>+</span>
                  </p>
                  {/* RGB underline */}
                  <div className="mt-1 h-[3px] rounded-full w-full"
                    style={{ backgroundImage: 'linear-gradient(90deg,#6366f1,#8b5cf6,#ec4899,#f97316,#06b6d4,#6366f1)', backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }} />
                </div>

                {/* live indicator */}
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span className="text-[9px] md:text-[10px] text-gray-500 font-medium">QR Kod oluşturuldu</span>
                </div>
              </div>
            </div>

          </div>

          {/* QR Hizmetleri */}
          <div className="border border-blue-200 bg-blue-50/50 backdrop-blur-sm rounded-xl p-4 md:p-5 md:col-span-2">
            <div className="flex items-center gap-2 mb-1">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
              <div className="flex items-center gap-1.5">
                <div className="p-1 rounded-md bg-gradient-to-br from-blue-500 to-cyan-500 shadow">
                  <BarChart3 className="w-3 h-3 text-white" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-blue-600">QR Hizmetleri</span>
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
            </div>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-4 mt-4">
              {qrLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-2 text-gray-700 hover:text-blue-700 text-xs md:text-sm font-medium transition-colors"
                  >
                    <item.icon className={`w-3.5 h-3.5 ${item.color} flex-shrink-0`} />
                    <span className="truncate">{item.label}</span>
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Şirket */}
          <div className="bg-gray-50 backdrop-blur-sm border border-gray-200 rounded-xl p-4 md:p-5 md:col-span-2">
            <h3 className="text-gray-900 font-semibold mb-4 flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                <Info className="w-3 h-3 text-white" />
              </div>
              Şirket
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-2 text-gray-700 hover:text-gray-900 text-xs md:text-sm transition-colors"
                  >
                    <item.icon className={`w-3.5 h-3.5 ${item.color} flex-shrink-0`} />
                    <span>{item.label}</span>
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all ml-auto" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Yardım */}
          <div className="bg-gray-50 backdrop-blur-sm border border-gray-200 rounded-xl p-4 md:p-5 md:col-span-1">
            <h3 className="text-gray-900 font-semibold mb-4 flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 shadow-lg">
                <HelpCircle className="w-3 h-3 text-white" />
              </div>
              Yardım
            </h3>
            <ul className="space-y-3">
              {helpLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-2 text-gray-700 hover:text-gray-900 text-xs md:text-sm transition-colors"
                  >
                    <item.icon className={`w-3.5 h-3.5 ${item.color} flex-shrink-0`} />
                    <span>{item.label}</span>
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all ml-auto" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 relative">
          {/* gradient divider */}
          <div className="h-px w-full mb-6" style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.25) 30%, rgba(6,182,212,0.25) 70%, transparent)' }} />
          <div className="relative overflow-hidden rounded-2xl px-5 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{
              background: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(99,102,241,0.12)',
              boxShadow: '0 4px 20px rgba(99,102,241,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
              backdropFilter: 'blur(12px)',
            }}>
            {/* top shine */}
            <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl pointer-events-none"
              style={{ background: 'linear-gradient(180deg,rgba(255,255,255,0.5) 0%,transparent 100%)' }} />
            {/* left — brand */}
            <div className="relative z-10 flex items-center gap-2.5">
              <Image src="/luxqrlogo2.png" alt="LuxQr" width={28} height={28} className="rounded-lg shadow-md" />
              <span className="text-gray-800 text-xs font-semibold">
                © 2026 <span className="font-black text-gray-900">LuxQr</span>
                <span className="text-gray-500 font-normal ml-1">— Tüm hakları saklıdır.</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
