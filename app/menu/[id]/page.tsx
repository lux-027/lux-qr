'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, QrCode, X, Menu, ChevronRight, Sparkles, Search } from 'lucide-react';
import Link from 'next/link';

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

export default function MenuPage({ params }: { params: { id: string } }) {
  const [pl, setPl] = useState<PriceListData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCat, setActiveCat] = useState<string>('');
  const [search, setSearch] = useState('');
  const catRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/qr/${params.id}`);
        const json = await res.json();
        if (json.success && json.data?.contentType === 'price-list') {
          const parsed = JSON.parse(json.data.content);
          setPl(parsed);
          if (parsed.categories?.length > 0) setActiveCat(parsed.categories[0].id);
        } else {
          setError('Menü bulunamadı.');
        }
      } catch {
        setError('Bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !pl) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <p className="text-gray-400">{error || 'Menü yüklenemedi.'}</p>
      </div>
    );
  }

  const symbol = currencySymbols[pl.currency] || pl.currency;
  const totalItems = pl.categories.reduce((a, c) => a + c.items.length, 0);

  const scrollToCategory = (catId: string) => {
    setActiveCat(catId);
    setSidebarOpen(false);
    const el = catRefs.current[catId];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Featured items: first item of each category
  const featured = pl.categories
    .filter(c => c.items.length > 0)
    .slice(0, 3)
    .map(c => ({ ...c.items[0], categoryName: c.name }));

  // Filtered items based on search
  const filtered = search.trim()
    ? pl.categories.map(cat => ({
        ...cat,
        items: cat.items.filter(item =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.description?.toLowerCase().includes(search.toLowerCase())
        ),
      })).filter(cat => cat.items.length > 0)
    : pl.categories;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed left-0 top-0 h-full w-72 bg-slate-900 border-r border-white/10 z-50 flex flex-col"
            >
              {/* Sidebar Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  {pl.logoUrl ? (
                    <img src={pl.logoUrl} alt={pl.brandName} className="w-9 h-9 rounded-xl object-cover" />
                  ) : (
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div>
                    <p className="text-white font-bold text-sm leading-tight">{pl.brandName}</p>
                    <p className="text-gray-500 text-xs">{pl.categories.length} kategori</p>
                  </div>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="text-gray-500 hover:text-white transition-all">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categories List */}
              <nav className="flex-1 overflow-y-auto py-3">
                {pl.categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => scrollToCategory(cat.id)}
                    className={`w-full flex items-center justify-between px-5 py-3.5 text-left transition-all ${
                      activeCat === cat.id
                        ? 'bg-orange-500/10 text-orange-400 border-r-2 border-orange-500'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="font-medium text-sm">{cat.name}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${activeCat === cat.id ? 'bg-orange-500/20 text-orange-400' : 'bg-white/5 text-gray-500'}`}>
                        {cat.items.length}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                    </div>
                  </button>
                ))}
              </nav>

              {/* Sidebar Footer */}
              <div className="px-5 py-4 border-t border-white/10">
                <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-400 transition-all text-xs">
                  <div className="w-5 h-5 rounded-md bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <QrCode className="w-3 h-3 text-white" />
                  </div>
                  LuxQr ile oluşturuldu
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Top Bar */}
      <div className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {pl.logoUrl ? (
              <img src={pl.logoUrl} alt={pl.brandName} className="w-8 h-8 rounded-lg object-cover" />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-white" />
              </div>
            )}
            <span className="text-white font-bold text-sm">{pl.brandName}</span>
          </div>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 pb-20">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="pt-8 pb-6 text-center"
        >
          {pl.logoUrl ? (
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-500/15 blur-3xl rounded-full scale-150" />
                <img src={pl.logoUrl} alt={pl.brandName} className="relative w-20 h-20 rounded-2xl object-cover border-2 border-white/10 shadow-2xl" />
              </div>
            </div>
          ) : (
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-500/15 blur-3xl rounded-full scale-150" />
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-2xl">
                  <ShoppingBag className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          )}
          <h1 className="text-2xl font-bold text-white mb-1">{pl.brandName}</h1>
          {pl.brandDescription && <p className="text-gray-400 text-sm max-w-xs mx-auto">{pl.brandDescription}</p>}
          <div className="flex items-center justify-center gap-4 mt-4 text-sm">
            <span className="text-gray-500">{pl.categories.length} kategori</span>
            <span className="text-gray-700">·</span>
            <span className="text-gray-500">{totalItems} ürün</span>
          </div>
        </motion.div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Ürün ara..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/40 text-sm transition-all"
          />
        </div>

        {/* Featured Items */}
        {!search && featured.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <h2 className="text-sm font-semibold text-gray-300">Öne Çıkanlar</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {featured.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  className="bg-gradient-to-br from-orange-500/10 to-amber-500/5 border border-orange-500/15 rounded-2xl p-4"
                >
                  <p className="text-xs text-orange-400/70 mb-1">{item.categoryName}</p>
                  <p className="text-white font-semibold text-sm mb-1">{item.name}</p>
                  {item.description && <p className="text-gray-500 text-xs mb-2 line-clamp-2">{item.description}</p>}
                  <p className="text-orange-400 font-bold">{symbol}{item.price}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Category Pills */}
        {!search && (
          <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
            {pl.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => scrollToCategory(cat.id)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCat === cat.id
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                    : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {/* Menu Items */}
        <div className="space-y-8">
          {filtered.map((cat, idx) => (
            <motion.div
              key={cat.id}
              ref={(el) => { catRefs.current[cat.id] = el; }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-base font-bold text-white">{cat.name}</h2>
                <div className="flex-1 h-px bg-white/5" />
                <span className="text-xs text-gray-600">{cat.items.length} ürün</span>
              </div>

              <div className="space-y-2">
                {cat.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] rounded-xl px-4 py-3.5 transition-all"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm">{item.name}</p>
                      {item.description && (
                        <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{item.description}</p>
                      )}
                    </div>
                    <span className="text-orange-400 font-bold text-base flex-shrink-0 tabular-nums">
                      {symbol}{item.price}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-6 border-t border-white/5 text-center">
          <Link href="/" className="inline-flex items-center gap-1.5 text-gray-600 hover:text-gray-400 text-xs transition-all">
            <div className="w-4 h-4 rounded-md bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <QrCode className="w-2.5 h-2.5 text-white" />
            </div>
            LuxQr ile oluşturulmuştur
          </Link>
        </div>
      </div>
    </div>
  );
}
