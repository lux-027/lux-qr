'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Menu, ChevronRight, Sparkles, ArrowLeft } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  price: string;
  description: string;
  imageUrl?: string;
}

interface Category {
  id: string;
  name: string;
  imageUrl?: string;
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

type View = 'home' | 'category';

export default function MenuPage({ params }: { params: { id: string } }) {
  const [pl, setPl] = useState<PriceListData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState<View>('home');
  const [selectedCat, setSelectedCat] = useState<Category | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/qr/${params.id}`);
        const json = await res.json();
        if (json.success && json.data?.contentType === 'price-list') {
          const parsed: PriceListData = JSON.parse(json.data.content);
          setPl(parsed);
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !pl) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">{error || 'Menü yüklenemedi.'}</p>
      </div>
    );
  }

  const symbol = currencySymbols[pl.currency] || pl.currency;

  // Featured: her kategoriden ilk ürün, max 6
  const featured = pl.categories
    .filter(c => c.items.length > 0)
    .slice(0, 6)
    .map(c => ({ ...c.items[0], categoryName: c.name, catId: c.id }));

  const openCategory = (cat: Category) => {
    setSelectedCat(cat);
    setView('category');
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => {
    setView('home');
    setSelectedCat(null);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed left-0 top-0 h-full w-72 bg-white border-r border-gray-200 z-50 flex flex-col"
            >
              {/* Sidebar Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  {pl.logoUrl ? (
                    <img src={pl.logoUrl} alt={pl.brandName} className="w-9 h-9 rounded-xl object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0">
                      <ShoppingBag className="w-5 h-5 text-gray-900" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-gray-900 font-bold text-sm leading-tight truncate">{pl.brandName}</p>
                    <p className="text-gray-500 text-xs">{pl.categories.length} kategori</p>
                  </div>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="text-gray-500 hover:text-gray-900 transition-all flex-shrink-0 ml-2">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Ana Sayfa linki */}
              <button
                onClick={goHome}
                className={`w-full flex items-center gap-3 px-5 py-3.5 text-left transition-all border-b border-gray-100 ${
                  view === 'home' ? 'text-orange-500 bg-orange-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Sparkles className="w-4 h-4 flex-shrink-0" />
                <span className="font-medium text-sm">Ana Sayfa</span>
              </button>

              {/* Categories */}
              <nav className="flex-1 overflow-y-auto py-2">
                <p className="px-5 pt-2 pb-1 text-xs text-gray-600 uppercase tracking-wider">Kategoriler</p>
                {pl.categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => openCategory(cat)}
                    className={`w-full flex items-center justify-between px-5 py-3.5 text-left transition-all ${
                      view === 'category' && selectedCat?.id === cat.id
                        ? 'bg-orange-50 text-orange-500 border-r-2 border-orange-500'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-medium text-sm">{cat.name}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        view === 'category' && selectedCat?.id === cat.id
                          ? 'bg-orange-50 text-orange-500'
                          : 'bg-gray-50 text-gray-600'
                      }`}>
                        {cat.items.length}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                    </div>
                  </button>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Top Bar */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Sol: geri butonu (sadece kategori görünümünde) veya logo */}
          <div className="flex items-center gap-3">
            {view === 'category' ? (
              <button
                onClick={goHome}
                className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            ) : null}
            <button onClick={() => setSidebarOpen(false)} onMouseDown={(e) => e.preventDefault()}>
              {pl.logoUrl ? (
                <img src={pl.logoUrl} alt={pl.brandName} className="w-8 h-8 rounded-lg object-cover" />
              ) : (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4 text-gray-900" />
                </div>
              )}
            </button>
            <span className="text-gray-900 font-bold text-sm">
              {view === 'category' && selectedCat ? selectedCat.name : pl.brandName}
            </span>
          </div>

          {/* Sağ: 3 çizgi */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">

        {/* HOME VIEW */}
        {view === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="max-w-2xl mx-auto px-4 pb-20"
          >
            {/* Brand Hero */}
            <div className="py-10 text-center">
              {pl.logoUrl ? (
                <div className="flex justify-center mb-5">
                  <div className="relative">
                    <div className="absolute inset-0 bg-orange-50 blur-3xl rounded-full scale-150" />
                    <img
                      src={pl.logoUrl}
                      alt={pl.brandName}
                      className="relative w-24 h-24 rounded-3xl object-cover border-2 border-gray-200 shadow-2xl"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex justify-center mb-5">
                  <div className="relative">
                    <div className="absolute inset-0 bg-orange-50 blur-3xl rounded-full scale-150" />
                    <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-2xl">
                      <ShoppingBag className="w-10 h-10 text-gray-900" />
                    </div>
                  </div>
                </div>
              )}
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{pl.brandName}</h1>
              {pl.brandDescription && (
                <p className="text-gray-600 text-sm max-w-xs mx-auto leading-relaxed">{pl.brandDescription}</p>
              )}
            </div>

            {/* Featured Section */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-orange-500" />
                <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Öne Çıkanlar</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {featured.map((item, i) => (
                  <motion.button
                    key={item.id + i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => {
                      const cat = pl.categories.find(c => c.id === item.catId);
                      if (cat) openCategory(cat);
                    }}
                    className="text-left bg-white hover:bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden transition-all"
                  >
                    {item.imageUrl && (
                      <img src={item.imageUrl} alt={item.name} className="w-full h-28 object-cover" />
                    )}
                    <div className="p-4">
                      <p className="text-xs text-orange-500/80 mb-1.5">{item.categoryName}</p>
                      <p className="text-gray-900 font-semibold text-sm mb-1 leading-tight">{item.name}</p>
                      {item.description && (
                        <p className="text-gray-600 text-xs mb-2 line-clamp-2 leading-relaxed">{item.description}</p>
                      )}
                      <p className="text-orange-500 font-bold">{symbol}{item.price}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Category Cards */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Kategoriler</h2>
              </div>
              <div className="space-y-2">
                {pl.categories.map((cat, i) => (
                  <motion.button
                    key={cat.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    onClick={() => openCategory(cat)}
                    className="w-full flex items-center justify-between bg-white hover:bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden transition-all group"
                  >
                    <div className="flex items-center gap-3 px-5 py-4">
                      {cat.imageUrl ? (
                        <img src={cat.imageUrl} alt={cat.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-orange-500 text-xs font-bold">{cat.items.length}</span>
                        </div>
                      )}
                      <div className="text-left">
                        <span className="text-gray-900 font-medium text-sm block">{cat.name}</span>
                        <span className="text-gray-600 text-xs">{cat.items.length} ürün</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-600 transition-all mr-4" />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* CATEGORY VIEW */}
        {view === 'category' && selectedCat && (
          <motion.div
            key={`cat-${selectedCat.id}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="max-w-2xl mx-auto px-4 pb-20 pt-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center flex-shrink-0">
                <span className="text-orange-500 text-sm font-bold">{selectedCat.items.length}</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedCat.name}</h2>
                <p className="text-gray-500 text-xs">{selectedCat.items.length} ürün</p>
              </div>
            </div>

            <div className="space-y-2">
              {selectedCat.items.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl overflow-hidden"
                >
                  {item.imageUrl && (
                    <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0 flex items-center justify-between gap-3 px-4 py-4" style={{ paddingLeft: item.imageUrl ? '0' : undefined }}>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 font-medium text-sm">{item.name}</p>
                      {item.description && (
                        <p className="text-gray-500 text-xs mt-1 leading-relaxed">{item.description}</p>
                      )}
                    </div>
                    <span className="text-orange-500 font-bold text-base flex-shrink-0 tabular-nums">
                      {symbol}{item.price}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
