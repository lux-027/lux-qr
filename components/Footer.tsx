'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { QrCode, HelpCircle, Info, FileText, MessageSquare, BarChart3, ScanLine, ChevronRight } from 'lucide-react';

export default function Footer() {
  const [globalCounter, setGlobalCounter] = useState(1723);

  useEffect(() => {
    fetchGlobalCounter();
  }, []);

  const fetchGlobalCounter = async () => {
    try {
      const response = await fetch('/api/counter');
      const data = await response.json();
      if (data.success) {
        setGlobalCounter(data.counter);
      }
    } catch (err) {
      console.error('Error fetching global counter:', err);
    }
  };

  return (
    <footer className="border-t border-white/10 bg-slate-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Left Block - Brand & Counter */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 glow-border flex items-center justify-center">
                <QrCode className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-white font-bold text-xl">LuxQr</p>
                <p className="text-gray-400 text-xs">Modern QR Kod Çözümleri</p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 glow-border border-white/10">
              <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                <QrCode className="w-3 h-3 text-blue-400" />
                <span>Toplam Oluşturulan</span>
              </div>
              <p className="text-white text-2xl font-bold">
                {globalCounter.toLocaleString('tr-TR')}+
              </p>
              <p className="text-gray-500 text-xs mt-1">QR Kod</p>
            </div>
          </div>

          {/* Hizmet */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-400" />
              Hizmet
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1">
                  QR Oluştur
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Şirket */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-400" />
              Şirket
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1">
                  Hakkımızda
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1">
                  Gizlilik Politikası
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1">
                  Şartlar ve Koşullar
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Yardım */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-blue-400" />
              Yardım
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1">
                  İletişim
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1">
                  SSS
                  <ChevronRight className="w-3 h-3" />
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
