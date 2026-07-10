'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, QrCode, ChevronDown, ChevronUp, Menu, ChevronLeft, FileText } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface MenuItem {
  id: string;
  name: string;
  price: string;
  description: string;
}

interface Category {
  id: string;
  name: string;
  items: MenuItem[];
}

interface PriceListData {
  brandName: string;
  brandDescription: string;
  currency: string;
  logoUrl?: string;
  categories: Category[];
}

const currencySymbols: Record<string, string> = { TL: '₺', USD: '$', EUR: '€', GBP: '£' };

export default function PriceListPage({ content }: { content: string }) {
  const router = useRouter();
  const [openCats, setOpenCats] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  let pl: PriceListData | null = null;
  try { pl = JSON.parse(content); } catch {}

  if (!pl) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <p className="text-gray-400">Fiyat listesi yüklenemedi.</p>
      </div>
    );
  }

  const symbol = currencySymbols[pl.currency] || pl.currency;
  const totalItems = pl.categories.reduce((a, c) => a + c.items.length, 0);

  const toggle = (id: string) =>
    setOpenCats((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1.5 text-gray-400 hover:text-white transition-all"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <QrCode className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold text-sm">LuxQr</span>
            </Link>
          </div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-gray-400 hover:text-white text-xs transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Geri</span>
          </button>
        </div>
        {menuOpen && (
          <div className="max-w-2xl mx-auto px-4 pb-3 border-t border-white/5 pt-2">
            <Link href="/" className="flex items-center gap-2 py-2 text-gray-400 hover:text-white text-sm transition-all" onClick={() => setMenuOpen(false)}>
              <QrCode className="w-4 h-4" />
              QR Kod Oluştur
            </Link>
            <Link href="/blog" className="flex items-center gap-2 py-2 text-gray-400 hover:text-white text-sm transition-all" onClick={() => setMenuOpen(false)}>
              <FileText className="w-4 h-4" />
              Blog
            </Link>
          </div>
        )}
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-16">

        {/* Brand Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="py-10 text-center"
        >
          {/* Logo */}
          {pl.logoUrl ? (
            <div className="flex justify-center mb-5">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-500/20 blur-2xl rounded-full scale-150" />
                <img
                  src={pl.logoUrl}
                  alt={pl.brandName}
                  className="relative w-24 h-24 rounded-2xl object-cover border-2 border-white/15 shadow-2xl"
                />
              </div>
            </div>
          ) : (
            <div className="flex justify-center mb-5">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-500/20 blur-2xl rounded-full scale-150" />
                <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-2xl">
                  <ShoppingBag className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
          )}

          {/* LuxQr + Brand collab */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-gray-500 text-xs font-medium tracking-wider uppercase">LuxQr</span>
            <span className="text-gray-600">×</span>
            <span className="text-gray-400 text-xs font-medium tracking-wider uppercase">{pl.brandName}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{pl.brandName}</h1>
          {pl.brandDescription && (
            <p className="text-gray-400 text-sm max-w-xs mx-auto leading-relaxed">{pl.brandDescription}</p>
          )}

          {/* Stats */}
          <div className="flex items-center justify-center gap-6 mt-5">
            <div className="text-center">
              <p className="text-xl font-bold text-white">{pl.categories.length}</p>
              <p className="text-gray-500 text-xs mt-0.5">Kategori</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <p className="text-xl font-bold text-white">{totalItems}</p>
              <p className="text-gray-500 text-xs mt-0.5">Ürün</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <p className="text-xl font-bold text-orange-400">{symbol}</p>
              <p className="text-gray-500 text-xs mt-0.5">{pl.currency}</p>
            </div>
          </div>
        </motion.div>

        {/* Category Pills - Quick Nav */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
          {pl.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                const el = document.getElementById(`cat-${cat.id}`);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                if (!openCats.includes(cat.id)) toggle(cat.id);
              }}
              className="flex-shrink-0 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 text-sm transition-all whitespace-nowrap"
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Categories */}
        <div className="space-y-3">
          {pl.categories.map((cat, idx) => {
            const isOpen = openCats.includes(cat.id);
            return (
              <motion.div
                key={cat.id}
                id={`cat-${cat.id}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.07 }}
                className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03]"
              >
                {/* Category Header */}
                <button
                  onClick={() => toggle(cat.id)}
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-400 text-xs font-bold">{cat.items.length}</span>
                    </div>
                    <span className="text-white font-semibold text-base">{cat.name}</span>
                  </div>
                  <div className="text-gray-500">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Items */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-white/10 divide-y divide-white/5">
                        {cat.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between gap-4 px-5 py-4">
                            <div className="flex-1 min-w-0">
                              <p className="text-white font-medium text-sm">{item.name}</p>
                              {item.description && (
                                <p className="text-gray-500 text-xs mt-1 leading-relaxed">{item.description}</p>
                              )}
                            </div>
                            <div className="flex-shrink-0">
                              <span className="text-orange-400 font-bold text-base tabular-nums">
                                {symbol}{item.price}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-white/10 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <QrCode className="w-3 h-3 text-white" />
            </div>
            <span className="text-gray-400 text-sm font-medium">LuxQr</span>
          </div>
          <p className="text-gray-600 text-xs">Bu sayfa LuxQr ile oluşturulmuştur</p>
          <Link href="/" className="inline-block mt-3 text-xs text-blue-400/70 hover:text-blue-400 transition-colors">
            Sen de ücretsiz QR oluştur →
          </Link>
        </div>
      </div>
    </div>
  );
}
