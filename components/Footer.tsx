'use client';

import Link from 'next/link';
import { QrCode, HelpCircle, Info, FileText, MessageSquare, BarChart3, ScanLine, ChevronRight } from 'lucide-react';
import { useCounter } from '@/context/CounterContext';

export default function Footer() {
  const { globalCounter } = useCounter();

  return (
    <footer className="border-t border-white/10 bg-slate-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Left Block - Brand & Counter */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg flex items-center justify-center">
                <QrCode className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-xl">LuxQr</p>
                <p className="text-gray-400 text-xs">Modern QR Kod Çözümleri</p>
              </div>
            </div>
            <div className="card-premium p-4">
              <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                <QrCode className="w-3 h-3 text-blue-400" />
                <span>Toplam Oluşturulan</span>
              </div>
              <p className="text-white text-2xl font-bold text-gradient">
                {globalCounter.toLocaleString('tr-TR')}+
              </p>
              <p className="text-gray-500 text-xs mt-1">QR Kod</p>
            </div>
          </div>

          {/* Hizmet */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                <BarChart3 className="w-3 h-3 text-white" />
              </div>
              Hizmet
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/qr/metin-belge" className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1 group">
                  Metin, Resim, Video ve Belge
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
              <li>
                <Link href="/qr/kartvizit" className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1 group">
                  Dijital Kartvizit
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
              <li>
                <Link href="/qr/wifi" className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1 group">
                  WiFi
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
              <li>
                <Link href="/qr/sosyal-medya" className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1 group">
                  Sosyal Medya
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
              <li>
                <Link href="/qr/ses-dosyasi" className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1 group">
                  Ses Dosyası
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Şirket */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                <Info className="w-3 h-3 text-white" />
              </div>
              Şirket
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1 group">
                  Hakkımızda
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1 group">
                  Gizlilik Politikası
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1 group">
                  Şartlar ve Koşullar
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Yardım */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 shadow-lg">
                <HelpCircle className="w-3 h-3 text-white" />
              </div>
              Yardım
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1 group">
                  İletişim
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1 group">
                  SSS
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-xs">© 2026 LuxQr. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
