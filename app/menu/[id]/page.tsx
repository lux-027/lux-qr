'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Menu, ChevronRight, Sparkles, ArrowLeft, MapPin, Phone, Home, LayoutGrid, Info, ExternalLink, Navigation, CheckCircle, Handshake, Globe, Users, Building, Coffee, UtensilsCrossed, Store, Smartphone, Scissors, Share2, Copy, Check } from 'lucide-react';
import { showNotification } from '@/components/Notification';

interface MenuItem {
  id: string;
  name: string;
  price: string;
  description: string;
  imageUrl?: string;
  discount?: string;
  discountedPrice?: string;
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
  coverImageUrl?: string;
  categories: Category[];
  address?: string;
  city?: string;
  mapsUrl?: string;
  phone?: string;
  instagram?: string;
  website?: string;
}

const currencySymbols: Record<string, string> = { TL: '₺', USD: '$', EUR: '€', GBP: '£' };

type View = 'home' | 'category';

const fallbackImg = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect fill="#f3f4f6" width="400" height="300"/><circle cx="200" cy="130" r="45" fill="#e5e7eb"/><text x="50%" y="210" text-anchor="middle" fill="#9ca3af" font-family="sans-serif" font-size="18">Görsel yüklenemedi</text></svg>`
)}`;

export default function MenuPage({ params }: { params: { id: string } }) {
  const [pl, setPl] = useState<PriceListData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState<View>('home');
  const [selectedCat, setSelectedCat] = useState<Category | null>(null);
  const [selectedItem, setSelectedItem] = useState<(MenuItem & { categoryName?: string }) | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'menu' | 'location' | 'about'>('home');
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

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
  const totalItems = pl.categories.reduce((a, c) => a + c.items.length, 0);

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

  const scrollToSection = (id: 'home' | 'menu' | 'location' | 'about') => {
    setActiveTab(id);
    if (id === 'home') {
      goHome();
      return;
    }

    const doScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        const offset = 110;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    };

    if (view === 'category') {
      setView('home');
      setSelectedCat(null);
      window.setTimeout(doScroll, 300);
    } else {
      doScroll();
    }
  };

  const formatPrice = (value: string | number) => {
    const num = Number(value);
    if (Number.isNaN(num)) return `${symbol}${value}`;
    return `${symbol}${num.toFixed(2).replace(/\.00$/, '')}`;
  };

  const getDiscountedPrice = (item: MenuItem) => {
    if (!item.discount || Number(item.discount) <= 0) return null;
    return (Number(item.price) * (1 - Number(item.discount) / 100)).toFixed(2).replace(/\.00$/, '');
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = fallbackImg;
  };

  const shareMenuUrl = pl ? `${window.location.origin}/menu/${params.id}` : '';
  const shareTitle = pl ? `${pl.brandName || 'LuxQr'} Menü` : 'LuxQr Menü';
  const shareText = pl ? `${pl.brandName || 'Menü'}'yu görüntülemek için tıklayın.` : 'Menüyü görüntülemek için tıklayın.';

  const copyShareUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareMenuUrl);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    } catch {}
  };

  const shareNative = async () => {
    if (!pl) return;
    const shareData: any = {
      title: shareTitle,
      text: shareText,
      url: shareMenuUrl,
    };
    if (pl.logoUrl) {
      try {
        const res = await fetch(pl.logoUrl);
        const blob = await res.blob();
        const ext = blob.type?.split('/')[1] || 'jpg';
        const file = new File([blob], `logo.${ext}`, { type: blob.type });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          shareData.files = [file];
        }
      } catch {}
    }
    if (navigator.share) {
      try { await navigator.share(shareData); } catch {}
    } else {
      copyShareUrl();
      showNotification('Menü linki kopyalandı', 'success');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-24">

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
              className="fixed left-0 top-0 h-full w-80 bg-white z-50 flex flex-col shadow-2xl"
            >
              {/* Sidebar Header */}
              <div className="relative bg-slate-900 text-white px-6 pt-8 pb-6">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="absolute top-3 right-3 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="relative z-10 flex items-center gap-4">
                  {pl.logoUrl ? (
                    <img
                      src={pl.logoUrl}
                      alt={pl.brandName}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-white/10 shadow-xl flex-shrink-0"
                      onError={handleImgError}
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-xl flex-shrink-0">
                      <ShoppingBag className="w-8 h-8 text-gray-900" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-white font-bold text-lg leading-tight truncate">{pl.brandName}</p>
                    <p className="text-white/70 text-xs mt-1">{pl.categories.length} kategori · {totalItems} ürün</p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-3">
                {/* Ana Sayfa */}
                <button
                  onClick={goHome}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left transition-all ${
                    view === 'home'
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30 hover:from-orange-600 hover:to-amber-600'
                      : 'bg-white border border-gray-200 text-gray-800 shadow-md hover:border-orange-300 hover:text-orange-600 hover:shadow-lg'
                  }`}
                >
                  <Home className={`w-5 h-5 flex-shrink-0 ${view === 'home' ? 'text-white' : 'text-orange-500'}`} />
                  <span className="font-bold text-sm">Ana Sayfa</span>
                </button>

                {/* Categories */}
                <div>
                  <div className="px-1 pt-1 pb-3 mb-2 text-center">
                    <p className="text-sm font-black text-gray-900 uppercase tracking-wider mb-2">Kategoriler</p>
                    <div className="flex justify-center">
                      <div className="w-20 h-0.5 rounded-full bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    {pl.categories.map((cat) => {
                      const active = view === 'category' && selectedCat?.id === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => openCategory(cat)}
                          className={`group w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-left transition-all border ${
                            active
                              ? 'bg-gradient-to-r from-orange-500 to-amber-500 border-transparent shadow-md shadow-orange-500/20'
                              : 'bg-white border-gray-100 hover:border-orange-200 hover:shadow-sm hover:bg-orange-50/30'
                          }`}
                        >
                          {cat.imageUrl ? (
                            <img src={cat.imageUrl} alt={cat.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0 shadow-sm" onError={handleImgError} />
                          ) : (
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${active ? 'bg-white/20' : 'bg-orange-50'}`}>
                              <ShoppingBag className={`w-6 h-6 ${active ? 'text-white' : 'text-orange-500'}`} />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className={`font-bold text-sm truncate ${active ? 'text-white' : 'text-gray-900'}`}>
                              {cat.name}
                            </p>
                            <p className={`text-xs ${active ? 'text-white/80' : 'text-gray-500'}`}>
                              {cat.items.length} ürün
                            </p>
                          </div>
                          <ChevronRight className={`w-5 h-5 flex-shrink-0 transition-transform ${active ? 'text-white rotate-180' : 'text-gray-400 group-hover:text-orange-500 group-hover:translate-x-0.5'}`} />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Contact snippet */}
                {(pl.phone || pl.address) && (
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
                        <Info className="w-3.5 h-3.5 text-white" />
                      </div>
                      <p className="text-xs font-bold text-gray-900 uppercase tracking-wider">Hakkımızda</p>
                    </div>
                    <div className="space-y-3">
                      {pl.phone && (
                        <a
                          href={`tel:${pl.phone}`}
                          className="flex items-center gap-3 p-2.5 -mx-2 rounded-xl bg-white border border-gray-100 text-sm font-semibold text-gray-800 hover:border-orange-300 hover:text-orange-600 transition-all shadow-sm"
                        >
                          <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                            <Phone className="w-4 h-4 text-orange-500" />
                          </div>
                          {pl.phone}
                        </a>
                      )}
                      {pl.address && (
                        <div className="flex items-start gap-3 p-2.5 -mx-2 rounded-xl bg-white border border-gray-100 shadow-sm">
                          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0 flex-shrink-0">
                            <MapPin className="w-4 h-4 text-emerald-500" />
                          </div>
                          <p className="text-sm font-medium text-gray-700 leading-snug line-clamp-2">
                            {pl.address}{pl.city ? `, ${pl.city}` : ''}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {view === 'category' ? (
              <button
                onClick={goHome}
                className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            ) : null}
            <button onClick={() => setSidebarOpen(true)} onMouseDown={(e) => e.preventDefault()}>
              {pl.logoUrl ? (
                <img src={pl.logoUrl} alt={pl.brandName} className="w-8 h-8 rounded-lg object-cover border border-gray-100" onError={handleImgError} />
              ) : (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4 text-gray-900" />
                </div>
              )}
            </button>
            <span className="text-gray-900 font-bold text-sm truncate max-w-[160px]">
              {view === 'category' && selectedCat ? selectedCat.name : pl.brandName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShareModalOpen(true)}
              className="p-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl shadow-sm hover:text-orange-600 hover:border-orange-300 transition-all"
              title="Menüyü Paylaş"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2.5 bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-xl shadow-md shadow-orange-500/20 hover:shadow-lg hover:from-orange-600 hover:to-amber-600 transition-all"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="12" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      {view === 'home' && (
        <section
          className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
        >
          {pl.coverImageUrl && (
            <>
              <img src={pl.coverImageUrl} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" onError={handleImgError} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-slate-900/40" />
            </>
          )}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-orange-500 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-500 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto px-4 pt-10 pb-12 text-center">
            <div className="flex justify-center mb-5">
              {pl.logoUrl ? (
                <img
                  src={pl.logoUrl}
                  alt={pl.brandName}
                  className="w-24 h-24 rounded-3xl object-cover border-4 border-white/10 shadow-2xl"
                  onError={handleImgError}
                />
              ) : (
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-2xl">
                  <ShoppingBag className="w-12 h-12 text-gray-900" />
                </div>
              )}
            </div>
            <h1 className="text-3xl font-black tracking-tight mb-2">{pl.brandName}</h1>
            {pl.brandDescription && (
              <p className="text-white/80 text-sm max-w-sm mx-auto leading-relaxed">{pl.brandDescription}</p>
            )}
            <div className="flex items-center justify-center gap-6 mt-6">
              <div className="text-center">
                <p className="text-2xl font-bold">{pl.categories.length}</p>
                <p className="text-white/60 text-xs uppercase tracking-wide">Kategori</p>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="text-center">
                <p className="text-2xl font-bold">{totalItems}</p>
                <p className="text-white/60 text-xs uppercase tracking-wide">Ürün</p>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="text-center">
                <p className="text-2xl font-bold">{symbol}</p>
                <p className="text-white/60 text-xs uppercase tracking-wide">{pl.currency}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Sticky Category Chips */}
      {view === 'home' && pl.categories.length > 0 && (
        <div className="sticky top-[60px] z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-2xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory">
            {pl.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => openCategory(cat)}
                className="flex-shrink-0 snap-start inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-200 text-gray-700 hover:text-orange-600 text-xs font-semibold transition-all"
              >
                {cat.imageUrl && <img src={cat.imageUrl} alt={cat.name} className="w-5 h-5 rounded-full object-cover" onError={handleImgError} />}
                {cat.name}
                <span className="text-[10px] text-gray-400">({cat.items.length})</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <AnimatePresence mode="wait">

        {/* HOME VIEW */}
        {view === 'home' && (
          <motion.main
            key="home"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="max-w-2xl mx-auto px-3 md:px-4 py-4 md:py-6 space-y-5 md:space-y-8"
          >
            {/* Featured Section */}
            {featured.length > 0 && (
              <section id="menu">
                <div className="bg-white rounded-3xl p-5 shadow-xl border border-gray-200/80">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 shadow-md shadow-orange-500/20">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Öne Çıkanlar</h2>
                    <span className="ml-auto text-[10px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                      {featured.length} ürün
                    </span>
                  </div>
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
                    {featured.map((item, i) => {
                      const discountedPrice = getDiscountedPrice(item);
                      return (
                        <motion.button
                          key={item.id + i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.06 }}
                          onClick={() => setSelectedItem(item)}
                          className="flex-shrink-0 w-[calc(50%-6px)] snap-start text-left bg-white hover:bg-gray-50 border border-gray-200 hover:border-orange-300 rounded-2xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1"
                        >
                          {item.imageUrl && (
                            <img src={item.imageUrl} alt={item.name} className="w-full h-36 object-cover" onError={handleImgError} />
                          )}
                          <div className="p-4">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-orange-500/90 mb-1.5">
                              {item.categoryName}
                            </p>
                            <p className="text-gray-900 font-bold text-sm mb-1 leading-tight">{item.name}</p>
                            {item.description && (
                              <p className="text-gray-600 text-xs mb-2 line-clamp-2 leading-relaxed">{item.description}</p>
                            )}
                            <div className="flex items-center gap-2 flex-wrap">
                              {discountedPrice ? (
                                <>
                                  <span className="text-gray-400 text-xs line-through">{formatPrice(item.price)}</span>
                                  <span className="inline-block bg-orange-50 text-orange-600 text-xs font-bold px-2 py-1 rounded-full">
                                    {formatPrice(discountedPrice)}
                                  </span>
                                  <span className="text-[10px] font-bold text-red-500">%{item.discount}</span>
                                </>
                              ) : (
                                <span className="inline-block bg-orange-50 text-orange-600 text-xs font-bold px-2 py-1 rounded-full">
                                  {formatPrice(item.price)}
                                </span>
                              )}
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </section>
            )}

            {/* Category Cards */}
            <section>
              <div className="bg-white rounded-3xl p-5 shadow-xl border border-gray-200/80">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 shadow-md shadow-blue-500/20">
                    <LayoutGrid className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Kategoriler</h2>
                  <span className="ml-auto text-[10px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {pl.categories.length} kategori
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {(showAllCategories ? pl.categories : pl.categories.slice(0, 4)).map((cat, i) => (
                    <motion.button
                      key={cat.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      onClick={() => openCategory(cat)}
                      className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-gray-100 text-left shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ring-1 ring-black/5 hover:ring-orange-300/60"
                    >
                      {cat.imageUrl ? (
                        <img
                          src={cat.imageUrl}
                          alt={cat.name}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={handleImgError}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-amber-50" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-white font-bold text-sm leading-tight drop-shadow-md line-clamp-1">
                          {cat.name}
                        </p>
                        <p className="text-white/85 text-xs mt-0.5">{cat.items.length} ürün</p>
                      </div>
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ChevronRight className="w-5 h-5 text-white drop-shadow" />
                      </div>
                    </motion.button>
                  ))}
                </div>
                {pl.categories.length > 4 && (
                  <button
                    onClick={() => setShowAllCategories((s) => !s)}
                    className="w-full mt-3 py-2.5 rounded-2xl bg-gray-50 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors border border-gray-100"
                  >
                    {showAllCategories ? 'Daha Az Göster' : `+${pl.categories.length - 4} Kategori Daha`}
                  </button>
                )}
              </div>
            </section>

            {/* Location */}
            {pl.address && (
              <section id="location">
                <div className="bg-white rounded-3xl p-5 shadow-xl border border-gray-200/80 overflow-hidden">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md shadow-emerald-500/20">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Konum</h2>
                  </div>

                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-gray-200 shadow-inner bg-gray-100 mb-4">
                    <iframe
                      title="Konum Haritası"
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(
                        pl.address + (pl.city ? ', ' + pl.city : '')
                      )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                      className="absolute inset-0 w-full h-full border-0"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>

                  <div className="flex items-start gap-3 mb-4">
                    <MapPin className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {pl.address}{pl.city ? `, ${pl.city}` : ''}
                    </p>
                  </div>

                  <a
                    href={
                      pl.mapsUrl ||
                      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        pl.address + (pl.city ? ', ' + pl.city : '')
                      )}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3.5 rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-emerald-500/25"
                  >
                    <Navigation className="w-5 h-5" />
                    Haritada Aç
                  </a>
                </div>
              </section>
            )}

            {/* QR Menu Benefits */}
            <section>
              <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-500 rounded-3xl p-4 sm:p-5 text-white shadow-xl">
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-indigo-400/20 rounded-full blur-3xl" />

                <div className="relative z-10 flex flex-row items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 rounded-lg bg-white/20">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <h2 className="text-sm font-bold uppercase tracking-wider">Neden QR Liste?</h2>
                    </div>
                    <p className="text-white/90 text-sm leading-relaxed mb-4">
                      QR listeniz sayesinde müşterileriniz menü, fiyat listesi veya kataloğunuzu telefondan anında görür. Kağıt baskı maliyeti olmadan, güncel fiyatlarla temassız bir deneyim sunarsınız.
                    </p>
                    <ul className="space-y-2 text-sm text-white/95">
                      {[
                        'Menü ve fiyat listesi tek yerde',
                        'Anında güncelleme imkanı',
                        'Baskı maliyetine son',
                        'Telefonda her an erişilebilir',
                      ].map((text) => (
                        <li key={text} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 flex-shrink-0" />
                          <span>{text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="w-20 h-20 sm:w-32 sm:h-32 flex-shrink-0 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-2xl opacity-30" />
                      <svg viewBox="0 0 200 200" className="relative w-full h-full drop-shadow-2xl">
                        <defs>
                          <linearGradient id="qrGrad" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#6366f1" />
                            <stop offset="100%" stopColor="#9333ea" />
                          </linearGradient>
                        </defs>
                        <rect x="40" y="20" width="120" height="160" rx="18" fill="url(#qrGrad)" />
                        <rect x="50" y="40" width="100" height="120" rx="8" fill="white" />
                        <rect x="60" y="50" width="28" height="28" rx="5" fill="#4f46e5" />
                        <rect x="112" y="50" width="28" height="28" rx="5" fill="#4f46e5" />
                        <rect x="60" y="108" width="28" height="28" rx="5" fill="#4f46e5" />
                        <rect x="88" y="82" width="24" height="6" rx="2" fill="#a5b4fc" />
                        <rect x="88" y="94" width="16" height="6" rx="2" fill="#a5b4fc" />
                        <rect x="60" y="118" width="80" height="6" rx="2" fill="#c7d2fe" />
                        <rect x="60" y="132" width="56" height="6" rx="2" fill="#c7d2fe" />
                        <line x1="52" y1="92" x2="148" y2="92" stroke="#f97316" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
                        <circle cx="100" cy="160" r="5" fill="#ffffff" opacity="0.5" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Target sectors */}
            <section>
              <div className="bg-white rounded-3xl p-5 shadow-xl border border-gray-200/80 overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-4 h-4 text-gray-700" />
                  <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Kimler Bizimle Çalışıyor?</h2>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Restoranlar', icon: UtensilsCrossed, color: 'from-red-500 to-orange-500', shadow: 'shadow-red-500/20' },
                    { label: 'Kafeler', icon: Coffee, color: 'from-amber-500 to-orange-400', shadow: 'shadow-amber-500/20' },
                    { label: 'Oteller', icon: Building, color: 'from-blue-500 to-indigo-500', shadow: 'shadow-blue-500/20' },
                    { label: 'Butikler', icon: Store, color: 'from-pink-500 to-rose-500', shadow: 'shadow-pink-500/20' },
                    { label: 'Güzellik & SPA', icon: Scissors, color: 'from-purple-500 to-fuchsia-500', shadow: 'shadow-purple-500/20' },
                    { label: 'Teknoloji', icon: Smartphone, color: 'from-cyan-500 to-blue-500', shadow: 'shadow-cyan-500/20' },
                  ].map(({ label, icon: Icon, color, shadow }) => (
                    <div
                      key={label}
                      className="group flex items-center gap-3 rounded-2xl bg-white border border-gray-100 p-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                    >
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} text-white shadow-lg ${shadow} flex items-center justify-center transform -rotate-3 group-hover:rotate-0 transition-transform`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-semibold text-gray-800">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* About / Contact */}
            {(pl.brandDescription || pl.phone || pl.instagram || pl.website) && (
              <section id="about">
                <div className="bg-white rounded-3xl p-5 shadow-xl border border-gray-200/80 overflow-hidden">
                  <div className="flex items-center gap-2 mb-4">
                    <Info className="w-4 h-4 text-gray-700" />
                    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Hakkımızda</h2>
                  </div>

                  {/* User brand card (gray glass) */}
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50/90 to-white/80 backdrop-blur border border-gray-100 shadow-sm p-4 mb-4">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-amber-500" />
                    <div className="flex items-center gap-3 mb-3">
                      {pl.logoUrl ? (
                        <img
                          src={pl.logoUrl}
                          alt={pl.brandName}
                          className="w-12 h-12 rounded-xl object-cover border border-gray-100 shadow-sm"
                          onError={handleImgError}
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-sm">
                          <ShoppingBag className="w-6 h-6 text-gray-900" />
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-gray-900">{pl.brandName}</p>
                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">İşletme</p>
                      </div>
                    </div>

                    {pl.brandDescription && (
                      <p className="text-sm text-gray-600 leading-relaxed mb-3">{pl.brandDescription}</p>
                    )}
                    <div className="space-y-2">
                      {pl.phone && (
                        <a href={`tel:${pl.phone}`} className="flex items-center gap-2.5 text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors bg-white/60 rounded-xl px-3 py-2">
                          <Phone className="w-4 h-4 text-orange-500" /> {pl.phone}
                        </a>
                      )}
                      {pl.instagram && (
                        <a
                          href={
                            pl.instagram.startsWith('http')
                              ? pl.instagram
                              : `https://instagram.com/${pl.instagram.replace('@', '')}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2.5 text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors bg-white/60 rounded-xl px-3 py-2"
                        >
                          <ExternalLink className="w-4 h-4 text-orange-500" /> Instagram
                        </a>
                      )}
                      {pl.website && (
                        <a
                          href={pl.website.startsWith('http') ? pl.website : `https://${pl.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2.5 text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors bg-white/60 rounded-xl px-3 py-2"
                        >
                          <Globe className="w-4 h-4 text-orange-500" /> Web Sitesi
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Collaboration banner */}
                  <div className="flex items-center justify-center mb-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-50 border border-gray-100 shadow-sm">
                      <Handshake className="w-4 h-4 text-orange-500" />
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-600">Birlikte Çalışıyoruz</span>
                    </div>
                  </div>

                  {/* LuxQr card (gray glass) */}
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50/90 to-white/80 backdrop-blur border border-gray-100 shadow-sm p-4">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src="/lux-inc-logo.png"
                        alt="LuxQr"
                        className="w-12 h-12 rounded-xl object-contain bg-white p-1 border border-gray-100 shadow-sm"
                        style={{ imageRendering: '-webkit-optimize-contrast' }}
                      />
                      <div>
                        <p className="font-bold text-gray-900">LuxQr</p>
                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Teknoloji Ortağı</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Kolayca güncellenebilir, profesyonel görünümlü dijital menüler ve fiyat listeleri oluşturun. QR kodunuzu tarayan müşteriler anında ürünlerinize ulaşsın.
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <a
                        href="https://luxqrpro.site"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-500 transition-colors bg-blue-50 rounded-xl px-3 py-2"
                      >
                        luxqrpro.site <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href="https://www.instagram.com/lux.studio.inc/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-pink-600 hover:text-pink-500 transition-colors bg-pink-50 rounded-xl px-3 py-2"
                      >
                        Instagram <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </motion.main>
        )}

        {/* CATEGORY VIEW */}
        {view === 'category' && selectedCat && (
          <motion.main
            key={`cat-${selectedCat.id}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="max-w-2xl mx-auto px-4 pb-28 pt-6"
          >
            <div className="flex items-center gap-3 mb-6">
              {selectedCat.imageUrl && (
                <img src={selectedCat.imageUrl} alt={selectedCat.name} className="w-12 h-12 rounded-xl object-cover" onError={handleImgError} />
              )}
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedCat.name}</h2>
                <p className="text-gray-500 text-xs">{selectedCat.items.length} ürün</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {selectedCat.items.map((item, i) => {
                const discountedPrice = getDiscountedPrice(item);
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setSelectedItem({ ...item, categoryName: selectedCat.name })}
                    className="text-left bg-white border border-gray-200 hover:border-orange-300 rounded-2xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1"
                  >
                    {item.imageUrl && (
                      <img src={item.imageUrl} alt={item.name} className="w-full h-36 object-cover" onError={handleImgError} />
                    )}
                    <div className="p-4">
                      <p className="text-gray-900 font-bold text-sm mb-1 leading-tight">{item.name}</p>
                      {item.description && (
                        <p className="text-gray-600 text-xs mb-2 line-clamp-2 leading-relaxed">{item.description}</p>
                      )}
                      <div className="flex items-center gap-2 flex-wrap">
                        {discountedPrice ? (
                          <>
                            <span className="text-gray-400 text-xs line-through">{formatPrice(item.price)}</span>
                            <span className="inline-block bg-orange-50 text-orange-600 text-xs font-bold px-2 py-1 rounded-full">
                              {formatPrice(discountedPrice)}
                            </span>
                            <span className="text-[10px] font-bold text-red-500">%{item.discount}</span>
                          </>
                        ) : (
                          <span className="inline-block bg-orange-50 text-orange-600 text-xs font-bold px-2 py-1 rounded-full">
                            {formatPrice(item.price)}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Other Categories */}
            <div className="mt-8 bg-white rounded-3xl p-5 shadow-xl border border-gray-200/80">
              <div className="flex items-center gap-2 mb-4">
                <LayoutGrid className="w-4 h-4 text-orange-500" />
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Diğer Kategoriler</h3>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
                {pl.categories
                  .filter((c) => c.id !== selectedCat.id)
                  .map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => openCategory(cat)}
                      className="flex-shrink-0 w-32 snap-start text-left group"
                    >
                      <div className="relative overflow-hidden rounded-2xl aspect-square mb-2 bg-gray-100">
                        {cat.imageUrl ? (
                          <img src={cat.imageUrl} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" onError={handleImgError} />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-amber-100">
                            <ShoppingBag className="w-8 h-8 text-orange-400" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-2">
                          <p className="text-white text-xs font-bold leading-tight line-clamp-2 drop-shadow">{cat.name}</p>
                          <p className="text-white/80 text-[10px]">{cat.items.length} ürün</p>
                        </div>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          </motion.main>
        )}

      </AnimatePresence>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-lg max-h-[75vh] bg-white rounded-3xl shadow-2xl overflow-y-auto"
              >
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-3 right-3 z-10 p-2.5 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-gray-100 transition-all"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>

                {selectedItem.imageUrl && (
                  <div className="relative">
                    <img
                      src={selectedItem.imageUrl}
                      alt={selectedItem.name}
                      className="w-full h-64 object-cover"
                      onError={handleImgError}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                )}

                <div className="px-6 pb-8 pt-4">
                  <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-5" />
                  <p className="text-[11px] font-bold uppercase tracking-widest text-orange-500 mb-2">
                    {selectedItem.categoryName}
                  </p>
                  <h3 className="text-3xl font-black text-gray-900 leading-tight mb-4">{selectedItem.name}</h3>
                  {selectedItem.description && (
                    <p className="text-gray-600 text-base leading-relaxed mb-6">{selectedItem.description}</p>
                  )}

                  <div className="flex items-center gap-4 bg-orange-50 rounded-2xl p-5">
                    {(() => {
                      const dp = getDiscountedPrice(selectedItem);
                      return dp ? (
                        <>
                          <div>
                            <p className="text-gray-400 text-sm line-through">{formatPrice(selectedItem.price)}</p>
                            <p className="text-3xl font-black text-orange-600">{formatPrice(dp)}</p>
                          </div>
                          <span className="ml-auto text-sm font-bold text-red-500 bg-white px-3 py-1 rounded-full shadow-sm">
                            %{selectedItem.discount} İndirim
                          </span>
                        </>
                      ) : (
                        <p className="text-3xl font-black text-orange-600">{formatPrice(selectedItem.price)}</p>
                      );
                    })()}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="max-w-2xl mx-auto px-2 py-2 flex justify-around">
          {[
            { id: 'home', label: 'Ana Sayfa', icon: Home },
            { id: 'menu', label: 'Menü', icon: LayoutGrid },
            { id: 'location', label: 'Konum', icon: MapPin },
            { id: 'about', label: 'Hakkında', icon: Info },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = view !== 'category' && activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id as any)}
                className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all ${
                  active ? 'text-orange-600 bg-orange-50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'stroke-[2.5px]' : ''}`} />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Share Modal */}
      <AnimatePresence>
        {shareModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShareModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.96 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-white">
                <button
                  onClick={() => setShareModalOpen(false)}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex flex-col items-center">
                  {pl?.logoUrl ? (
                    <img
                      src={pl.logoUrl}
                      alt={pl.brandName}
                      className="w-16 h-16 rounded-2xl object-cover border-4 border-white/30 shadow-lg mb-3"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center border-4 border-white/30 shadow-lg mb-3">
                      <ShoppingBag className="w-7 h-7 text-gray-900" />
                    </div>
                  )}
                  <h3 className="text-lg font-bold">{pl?.brandName || 'Menü'}</h3>
                  <p className="text-white/80 text-xs mt-1">Menüyü Paylaş</p>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-xl px-3 py-2">
                  <input
                    readOnly
                    value={shareMenuUrl}
                    className="flex-1 bg-transparent text-xs text-gray-600 focus:outline-none truncate"
                  />
                  <button
                    onClick={copyShareUrl}
                    className="p-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md hover:shadow-lg transition-all"
                  >
                    {shareCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareMenuUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-green-50 hover:bg-green-100 text-green-600 transition-all"
                  >
                    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.422 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892a11.782 11.782 0 001.58 5.975L0 24l6.305-1.654a11.88 11.88 0 005.697 1.457h.006c6.552 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span className="text-[10px] font-semibold">WhatsApp</span>
                  </a>

                  <a
                    href={`https://t.me/share/url?url=${encodeURIComponent(shareMenuUrl)}&text=${encodeURIComponent(shareText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-sky-50 hover:bg-sky-100 text-sky-600 transition-all"
                  >
                    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
                      <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.29l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.9-.74 1.12-1.5.7l-4.15-3.06-2.05 1.9c-.23.22-.43.31-.6.31-.1 0-.21-.03-.31-.1z"/>
                    </svg>
                    <span className="text-[10px] font-semibold">Telegram</span>
                  </a>

                  <button
                    onClick={shareNative}
                    className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-orange-50 hover:bg-orange-100 text-orange-600 transition-all"
                  >
                    <Share2 className="w-7 h-7" />
                    <span className="text-[10px] font-semibold">Diğer</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
