'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, QrCode, ChevronDown, ChevronUp, Menu, ChevronLeft, FileText, X, Tag } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface MenuItem {
  id: string;
  name: string;
  price: string;
  discount?: string;
  discountedPrice?: string;
  description: string;
  imageUrl?: string;
  categoryName?: string;
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

export default function PriceListPage({ content }: { content: string }) {
  const router = useRouter();
  const [openCats, setOpenCats] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<(MenuItem & { categoryName: string }) | null>(null);

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

  const getFinalPrice = (item: MenuItem): string | null => {
    if (item.discountedPrice && Number(item.discountedPrice) > 0) return Number(item.discountedPrice).toFixed(2);
    if (item.discount && Number(item.discount) > 0) return (Number(item.price) * (1 - Number(item.discount) / 100)).toFixed(2);
    return null;
  };
  const hasItemDiscount = (item: MenuItem) =>
    (!!item.discountedPrice && Number(item.discountedPrice) > 0) || (!!item.discount && Number(item.discount) > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-2xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 text-gray-400 hover:text-white transition-all">
              <Menu className="w-6 h-6" />
            </button>
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <QrCode className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-lg">LuxQr</span>
            </Link>
          </div>
          <button onClick={() => router.back()} className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm transition-all">
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Geri</span>
          </button>
        </div>
        {menuOpen && (
          <div className="max-w-2xl mx-auto px-4 pb-3 border-t border-white/5 pt-2">
            <Link href="/" className="flex items-center gap-2 py-2 text-gray-400 hover:text-white text-sm transition-all" onClick={() => setMenuOpen(false)}>
              <QrCode className="w-4 h-4" /> QR Kod Oluştur
            </Link>
            <Link href="/blog" className="flex items-center gap-2 py-2 text-gray-400 hover:text-white text-sm transition-all" onClick={() => setMenuOpen(false)}>
              <FileText className="w-4 h-4" /> Blog
            </Link>
          </div>
        )}
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-16">

        {/* Brand Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="py-10 text-center">
          {pl.logoUrl ? (
            <div className="flex justify-center mb-5">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-500/20 blur-2xl rounded-full scale-150" />
                <img src={pl.logoUrl} alt={pl.brandName} className="relative w-24 h-24 rounded-2xl object-cover border-2 border-white/15 shadow-2xl" />
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
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-gray-500 text-xs font-medium tracking-wider uppercase">LuxQr</span>
            <span className="text-gray-600">×</span>
            <span className="text-gray-400 text-xs font-medium tracking-wider uppercase">{pl.brandName}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{pl.brandName}</h1>
          {pl.brandDescription && (
            <p className="text-gray-400 text-sm max-w-xs mx-auto leading-relaxed">{pl.brandDescription}</p>
          )}
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
              className={`flex-shrink-0 px-4 py-1.5 rounded-full border text-sm transition-all whitespace-nowrap ${
                openCats.includes(cat.id)
                  ? 'border-orange-500/50 bg-orange-500/15 text-orange-300'
                  : 'border-white/10 bg-white/5 hover:bg-white/10 text-gray-300'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Featured Items - Horizontal Scroll Carousel */}
        {(() => {
          const allItems = pl!.categories.flatMap((c) =>
            c.items.map((item) => ({ ...item, categoryName: c.name }))
          );
          const discounted = allItems.filter((item) => hasItemDiscount(item));
          const nonDiscounted = allItems.filter((item) => !hasItemDiscount(item));
          const discountedSlice = discounted.slice(0, 6);
          const needed = Math.max(0, 4 - discountedSlice.length);
          const featured = [...discountedSlice, ...nonDiscounted.slice(0, needed)];

          if (featured.length === 0) return null;
          return (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="mb-6">
              <div className="flex items-center gap-2 mb-3 px-1">
                <Tag className="w-4 h-4 text-orange-400" />
                <h2 className="text-sm font-semibold text-white">Öne Çıkan Ürünler</h2>
                {discounted.length > 0 && (
                  <span className="ml-auto text-[10px] text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full">
                    {discounted.length} indirimli
                  </span>
                )}
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
                {featured.map((item, i) => {
                  const hasDiscount = item.discount && Number(item.discount) > 0;
                  const finalPrice = hasDiscount
                    ? (Number(item.price) * (1 - Number(item.discount!) / 100)).toFixed(2)
                    : null;
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedItem(item)}
                      className="flex-shrink-0 w-[calc(50%-6px)] snap-start bg-white/5 border border-white/10 rounded-2xl overflow-hidden text-left hover:bg-white/10 transition-all"
                    >
                      {item.imageUrl ? (
                        <div className="relative">
                          <img src={item.imageUrl} alt={item.name} className="w-full h-28 object-cover" />
                          {hasDiscount && (
                            <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-lg leading-none shadow">
                              %{item.discount}
                            </div>
                          )}
                        </div>
                      ) : hasDiscount ? (
                        <div className="h-10 flex items-center px-3 bg-red-500/10 border-b border-red-500/20">
                          <span className="text-red-400 text-xs font-bold">%{item.discount} İndirim</span>
                        </div>
                      ) : null}
                      <div className="p-3">
                        <p className="text-white text-xs font-semibold leading-tight line-clamp-2 mb-1">{item.name}</p>
                        <p className="text-gray-600 text-[10px] mb-2">{item.categoryName}</p>
                        {hasDiscount ? (
                          <div>
                            <p className="text-gray-500 text-[10px] line-through tabular-nums">{symbol}{item.price}</p>
                            <p className="text-orange-400 font-bold text-sm tabular-nums">{symbol}{finalPrice}</p>
                          </div>
                        ) : (
                          <p className="text-orange-400 font-bold text-sm tabular-nums">{symbol}{item.price}</p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          );
        })()}

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
                    {cat.imageUrl ? (
                      <img src={cat.imageUrl} alt={cat.name} className="w-9 h-9 rounded-xl object-cover flex-shrink-0 border border-white/10" />
                    ) : (
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-orange-400 text-xs font-bold">{cat.items.length}</span>
                      </div>
                    )}
                    <div className="text-left">
                      <span className="text-white font-semibold text-base">{cat.name}</span>
                      <p className="text-gray-500 text-xs">{cat.items.length} ürün</p>
                    </div>
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
                        {cat.items.map((item) => {
                          const hasDiscount = hasItemDiscount(item);
                          const finalPrice = getFinalPrice(item);
                          return (
                            <button
                              key={item.id}
                              onClick={() => setSelectedItem({ ...item, categoryName: cat.name })}
                              className="w-full flex items-center gap-4 px-5 py-4 hover:bg-white/5 transition-all text-left"
                            >
                              {/* Thumbnail */}
                              {item.imageUrl ? (
                                <div className="relative flex-shrink-0">
                                  <img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded-xl object-cover border border-white/10" />
                                  {hasDiscount && (
                                    <div className="absolute -top-1.5 -left-1.5 bg-red-500 text-white text-[9px] font-bold px-1 py-0.5 rounded-md shadow leading-none">
                                      %{item.discount}
                                    </div>
                                  )}
                                </div>
                              ) : hasDiscount ? (
                                <div className="flex-shrink-0 bg-red-500/20 border border-red-500/30 rounded-lg px-1.5 py-0.5">
                                  <span className="text-red-400 text-[10px] font-bold">{item.discount ? `%${item.discount}` : 'İndirim'}</span>
                                </div>
                              ) : null}

                              {/* Name + desc */}
                              <div className="flex-1 min-w-0">
                                <p className="text-white font-medium text-sm">{item.name}</p>
                                {item.description && (
                                  <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{item.description}</p>
                                )}
                              </div>

                              {/* Price */}
                              <div className="flex-shrink-0 text-right">
                                {hasDiscount ? (
                                  <>
                                    <p className="text-gray-500 text-xs line-through tabular-nums">{symbol}{item.price}</p>
                                    <p className="text-orange-400 font-bold text-base tabular-nums">{symbol}{finalPrice}</p>
                                  </>
                                ) : (
                                  <p className="text-orange-400 font-bold text-base tabular-nums">{symbol}{item.price}</p>
                                )}
                              </div>
                            </button>
                          );
                        })}
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

      {/* Item Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 60, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Modal Image */}
              {selectedItem.imageUrl ? (
                <div className="relative">
                  <img src={selectedItem.imageUrl} alt={selectedItem.name} className="w-full h-52 object-cover" />
                  {selectedItem.discount && Number(selectedItem.discount) > 0 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-sm font-bold px-2.5 py-1 rounded-xl shadow-lg flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" />
                      %{selectedItem.discount} İndirim
                    </div>
                  )}
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="absolute top-3 right-3 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="relative flex items-center justify-center h-28 bg-gradient-to-br from-orange-500/10 to-amber-500/5 border-b border-white/10">
                  <ShoppingBag className="w-12 h-12 text-orange-400/40" />
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Modal Content */}
              <div className="p-5">
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">{selectedItem.categoryName}</p>
                <h2 className="text-white text-xl font-bold mb-2">{selectedItem.name}</h2>
                {selectedItem.description && (
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{selectedItem.description}</p>
                )}

                {/* Price */}
                <div className="flex items-center justify-between bg-white/5 rounded-2xl px-4 py-3">
                  <span className="text-gray-400 text-sm">Fiyat</span>
                  {hasItemDiscount(selectedItem) ? (
                    <div className="text-right">
                      <p className="text-gray-500 text-xs line-through tabular-nums">
                        {symbol}{selectedItem.price}
                      </p>
                      <p className="text-orange-400 font-bold text-xl tabular-nums">
                        {symbol}{getFinalPrice(selectedItem)}
                      </p>
                    </div>
                  ) : (
                    <p className="text-orange-400 font-bold text-xl tabular-nums">{symbol}{selectedItem.price}</p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
