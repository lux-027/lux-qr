'use client';

import Link from 'next/link';
import {
  QrCode, HelpCircle, Info, FileText, MessageSquare, BarChart3, ChevronRight,
  Type, Image as ImageIcon, CreditCard, Wifi, Share2, Mic, Landmark, ShoppingBag,
  Shield, Scale, Mail, BookOpen, Zap, Users, Star,
} from 'lucide-react';
import { useCounter } from '@/context/CounterContext';

export default function Footer() {
  const { globalCounter } = useCounter();

  const qrLinks = [
    { href: '/qr/metin', label: 'Metin', icon: Type, color: 'text-blue-400' },
    { href: '/qr/metin-belge', label: 'Resim/Video/Belge', icon: ImageIcon, color: 'text-violet-400' },
    { href: '/qr/kartvizit', label: 'Dijital Kartvizit', icon: CreditCard, color: 'text-cyan-400' },
    { href: '/qr/wifi', label: 'WiFi', icon: Wifi, color: 'text-emerald-400' },
    { href: '/qr/sosyal-medya', label: 'Sosyal Medya', icon: Share2, color: 'text-pink-400' },
    { href: '/qr/ses-dosyasi', label: 'Ses Dosyası', icon: Mic, color: 'text-orange-400' },
    { href: '/qr/iban', label: 'IBAN', icon: Landmark, color: 'text-yellow-400' },
    { href: '/qr/fiyat-listesi', label: 'Fiyat Listesi', icon: ShoppingBag, color: 'text-rose-400' },
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
    <footer className="border-t border-white/10 bg-slate-900/60 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-8">

          {/* Brand Block */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30 flex items-center justify-center">
                <QrCode className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-xl">LuxQr</p>
                <p className="text-gray-400 text-xs">Modern QR Kod Çözümleri</p>
              </div>
            </div>

            {/* Counter */}
            <div className="card-premium p-4">
              <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                <Zap className="w-3 h-3 text-yellow-400" />
                <span>Toplam Oluşturulan</span>
              </div>
              <p className="text-white text-2xl font-bold text-gradient">
                {globalCounter.toLocaleString('tr-TR')}+
              </p>
              <p className="text-gray-500 text-xs mt-1">QR Kod</p>
            </div>

            {/* Badge */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
              <Star className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-gray-300 text-xs font-medium">Ücretsiz & Hızlı</span>
            </div>
          </div>

          {/* QR Hizmetleri */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-5 md:col-span-2">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                <BarChart3 className="w-3 h-3 text-white" />
              </div>
              QR Hizmetleri
            </h3>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-3">
              {qrLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-1.5 text-gray-400 hover:text-white text-xs transition-colors"
                  >
                    <item.icon className={`w-3 h-3 ${item.color} flex-shrink-0`} />
                    <span className="truncate">{item.label}</span>
                    <ChevronRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Şirket */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-5 md:col-span-2">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
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
                    className="group flex items-center gap-2 text-gray-400 hover:text-white text-xs md:text-sm transition-colors"
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
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-5 md:col-span-1">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
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
                    className="group flex items-center gap-2 text-gray-400 hover:text-white text-xs md:text-sm transition-colors"
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
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <QrCode className="w-3 h-3 text-white" />
            </div>
            <p className="text-gray-500 text-xs">© 2026 <span className="text-gray-400 font-medium">LuxQr</span>. Tüm hakları saklıdır.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-gray-500 hover:text-gray-300 text-xs transition-colors flex items-center gap-1">
              <Shield className="w-3 h-3 text-emerald-500" />
              Gizlilik
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-gray-300 text-xs transition-colors flex items-center gap-1">
              <Scale className="w-3 h-3 text-purple-500" />
              Şartlar
            </Link>
            <Link href="/contact" className="text-gray-500 hover:text-gray-300 text-xs transition-colors flex items-center gap-1">
              <Mail className="w-3 h-3 text-cyan-500" />
              İletişim
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
