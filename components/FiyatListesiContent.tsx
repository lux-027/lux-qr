'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Plus, Trash2, ChevronDown, ChevronUp, Tag, Package,
  ShoppingBag, Store, Clock, ArrowRight, Loader2, CheckCircle, Zap,
  ImagePlus, X as XIcon
} from 'lucide-react';
import { useRef } from 'react';

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
  logoUrl: string;
  categories: Category[];
}

const generateId = () => Math.random().toString(36).substring(2, 9);

const expirationOptions = [
  { value: '1day', label: '1 Gün' },
  { value: '1week', label: '1 Hafta' },
  { value: '1month', label: '1 Ay' },
  { value: '3months', label: '3 Ay' },
];

const currencyOptions = [
  { value: 'TL', label: '₺ Türk Lirası' },
  { value: 'USD', label: '$ Dolar' },
  { value: 'EUR', label: '€ Euro' },
  { value: 'GBP', label: '£ Sterlin' },
];

export default function FiyatListesiContent() {
  const router = useRouter();
  const [expiration, setExpiration] = useState('1month');
  const [note, setNote] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const [logoUploading, setLogoUploading] = useState(false);
  const [logoPreview, setLogoPreview] = useState('');
  const logoInputRef = useRef<HTMLInputElement>(null);

  const [priceList, setPriceList] = useState<PriceListData>({
    brandName: '',
    brandDescription: '',
    currency: 'TL',
    logoUrl: '',
    categories: [
      {
        id: generateId(),
        name: '',
        items: [{ id: generateId(), name: '', price: '', description: '' }],
      },
    ],
  });

  const fillDemo = () => {
    setPriceList({
      brandName: 'Cafe Lux',
      brandDescription: 'Taze malzemelerle hazırlanan lezzetler',
      currency: 'TL',
      logoUrl: '',
      categories: [
        {
          id: generateId(),
          name: 'Başlangıçlar',
          items: [
            { id: generateId(), name: 'Mercimek Çorbası', price: '85', description: 'Taze sebzelerle' },
            { id: generateId(), name: 'Zeytinyağlı Yaprak Sarma', price: '110', description: '6 adet, limonlu' },
          ],
        },
        {
          id: generateId(),
          name: 'Ana Yemekler',
          items: [
            { id: generateId(), name: 'Izgara Köfte', price: '220', description: 'Pilav ve salata ile' },
            { id: generateId(), name: 'Tavuk Şiş', price: '195', description: 'Sebzeli, özel marine' },
            { id: generateId(), name: 'Karışık Izgara', price: '320', description: 'Et ve tavuk, 2 kişilik' },
          ],
        },
        {
          id: generateId(),
          name: 'İçecekler',
          items: [
            { id: generateId(), name: 'Ayran', price: '45', description: 'Ev yapımı' },
            { id: generateId(), name: 'Limonata', price: '75', description: 'Taze sıkılmış' },
            { id: generateId(), name: 'Çay', price: '30', description: '' },
          ],
        },
      ],
    });
    setOpenCategories([]);
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const localUrl = URL.createObjectURL(file);
    setLogoPreview(localUrl);
    setLogoUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.url) {
        setPriceList((p) => ({ ...p, logoUrl: data.url }));
        setLogoPreview('');
        URL.revokeObjectURL(localUrl);
      }
    } catch (err) {
      console.error('Logo upload error:', err);
    } finally {
      setLogoUploading(false);
    }
  };

  const toggleCategory = (id: string) => {
    setOpenCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const addCategory = () => {
    const newId = generateId();
    setPriceList((prev) => ({
      ...prev,
      categories: [
        ...prev.categories,
        { id: newId, name: '', items: [{ id: generateId(), name: '', price: '', description: '' }] },
      ],
    }));
    setOpenCategories((prev) => [...prev, newId]);
  };

  const removeCategory = (catId: string) => {
    setPriceList((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c.id !== catId),
    }));
  };

  const updateCategory = (catId: string, name: string) => {
    setPriceList((prev) => ({
      ...prev,
      categories: prev.categories.map((c) => (c.id === catId ? { ...c, name } : c)),
    }));
  };

  const addItem = (catId: string) => {
    setPriceList((prev) => ({
      ...prev,
      categories: prev.categories.map((c) =>
        c.id === catId
          ? { ...c, items: [...c.items, { id: generateId(), name: '', price: '', description: '' }] }
          : c
      ),
    }));
  };

  const removeItem = (catId: string, itemId: string) => {
    setPriceList((prev) => ({
      ...prev,
      categories: prev.categories.map((c) =>
        c.id === catId ? { ...c, items: c.items.filter((i) => i.id !== itemId) } : c
      ),
    }));
  };

  const updateItem = (catId: string, itemId: string, field: keyof MenuItem, value: string) => {
    setPriceList((prev) => ({
      ...prev,
      categories: prev.categories.map((c) =>
        c.id === catId
          ? { ...c, items: c.items.map((i) => (i.id === itemId ? { ...i, [field]: value } : i)) }
          : c
      ),
    }));
  };

  const isValid =
    priceList.brandName.trim() !== '' &&
    priceList.categories.some((c) => c.name.trim() !== '' && c.items.some((i) => i.name.trim() !== '' && i.price.trim() !== ''));

  const handleGenerate = async () => {
    if (!isValid) return;
    setIsGenerating(true);
    try {
      const content = JSON.stringify(priceList);
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          contentType: 'price-list',
          expiration,
          note: note || null,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setGeneratedUrl(data.viewUrl);
        router.push(`/qr/${data.id}`);
      }
    } catch (err) {
      console.error('Generate error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">

      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-12 md:mb-16"
      >
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full" />
          <div className="relative flex items-center justify-center gap-3 mb-4">
            <ShoppingBag className="w-10 h-10 md:w-12 md:h-14 text-orange-400 drop-shadow-[0_0_15px_rgba(249,115,22,0.6)]" />
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">LuxQr</h1>
          </div>
        </div>
        <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-300 mb-4">
          Modern <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(249,115,22,0.5)]">QR Kod Oluşturma</span>
        </p>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Restoran menüsü, hizmet veya ürün fiyat listenizi QR koda dönüştürün
        </p>
      </motion.div>

      <div className="space-y-6 md:space-y-8">
      {/* Brand Info Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="card-premium p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Fiyat Listesi QR Kodu</h2>
                <p className="text-gray-400 text-sm">Marka, kategori ve ürünlerinizi ekleyin</p>
              </div>
            </div>
            <button
              onClick={fillDemo}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-400 hover:text-gray-200 text-xs transition-all"
            >
              Demo Doldur
            </button>
          </div>

          {/* Brand Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Store className="w-4 h-4 inline mr-1" />
                Marka / İşletme Adı *
              </label>
              <input
                type="text"
                value={priceList.brandName}
                onChange={(e) => setPriceList((p) => ({ ...p, brandName: e.target.value }))}
                placeholder="Örn: Cafe Lux, Berber Mehmet..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
              />
            </div>
            {/* Logo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <ImagePlus className="w-4 h-4 inline mr-1" />
                İşletme Logosu (İsteğe Bağlı)
              </label>
              <div className="flex items-center gap-4">
                {(priceList.logoUrl || logoPreview) ? (
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <img
                      src={priceList.logoUrl || logoPreview}
                      alt="Logo"
                      className="w-20 h-20 rounded-xl object-cover border border-white/10"
                    />
                    {logoUploading && (
                      <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                        <Loader2 className="w-5 h-5 text-white animate-spin" />
                      </div>
                    )}
                    {!logoUploading && (
                      <button
                        onClick={() => { setPriceList((p) => ({ ...p, logoUrl: '' })); setLogoPreview(''); }}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all"
                      >
                        <XIcon className="w-3 h-3 text-white" />
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => logoInputRef.current?.click()}
                    disabled={logoUploading}
                    className="flex flex-col items-center justify-center w-20 h-20 border-2 border-dashed border-white/20 hover:border-orange-500/50 rounded-xl text-gray-400 hover:text-orange-400 transition-all flex-shrink-0"
                  >
                    <ImagePlus className="w-5 h-5 mb-1" />
                    <span className="text-xs">Yükle</span>
                  </button>
                )}
                <p className="text-gray-500 text-xs leading-relaxed">
                  PNG, JPG veya WebP formatında logo yükleyin. QR tarandığında marka başlığının yanında görünür.
                </p>
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={handleLogoUpload}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Kısa Açıklama (İsteğe Bağlı)
              </label>
              <input
                type="text"
                value={priceList.brandDescription}
                onChange={(e) => setPriceList((p) => ({ ...p, brandDescription: e.target.value }))}
                placeholder="Örn: Taze malzemelerle hazırlanan lezzetler"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Para Birimi</label>
              <select
                value={priceList.currency}
                onChange={(e) => setPriceList((p) => ({ ...p, currency: e.target.value }))}
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-all"
              >
                {currencyOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="card-premium p-6 md:p-8">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-semibold text-white">Kategoriler ve Ürünler</h3>
            <button
              onClick={addCategory}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-300 text-sm transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              Kategori Ekle
            </button>
          </div>

          <div className="space-y-3">
            {priceList.categories.map((cat, catIdx) => {
              const isOpen = openCategories.includes(cat.id);
              return (
                <div key={cat.id} className="border border-white/10 rounded-xl overflow-hidden">
                  {/* Category Header */}
                  <div
                    className="flex items-center gap-2 px-4 py-3 bg-slate-800/60 cursor-pointer hover:bg-slate-800/90 transition-all"
                    onClick={() => toggleCategory(cat.id)}
                  >
                    <span className="text-gray-500 flex-shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                    <input
                      type="text"
                      value={cat.name}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => updateCategory(cat.id, e.target.value)}
                      placeholder={`Kategori adı (Örn: Başlangıçlar, Saçlar...)`}
                      className="flex-1 bg-transparent text-white font-medium placeholder-gray-600 focus:outline-none text-sm cursor-text"
                    />
                    <span className="text-xs text-gray-600 flex-shrink-0">{cat.items.length} ürün</span>
                    {priceList.categories.length > 1 && (
                      <button
                        onClick={(e) => { e.stopPropagation(); removeCategory(cat.id); }}
                        className="text-gray-600 hover:text-gray-400 transition-all flex-shrink-0 ml-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Items */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="divide-y divide-white/5">
                          {cat.items.map((item, itemIdx) => (
                            <div key={item.id} className="flex items-center gap-2 px-4 py-3">
                              <span className="text-xs text-gray-600 w-4 flex-shrink-0">{itemIdx + 1}</span>
                              <input
                                type="text"
                                value={item.name}
                                onChange={(e) => updateItem(cat.id, item.id, 'name', e.target.value)}
                                placeholder="Ürün adı"
                                className="flex-1 bg-transparent border-b border-white/10 focus:border-white/30 py-1 text-white text-sm placeholder-gray-600 focus:outline-none transition-all"
                              />
                              <input
                                type="text"
                                value={item.description}
                                onChange={(e) => updateItem(cat.id, item.id, 'description', e.target.value)}
                                placeholder="Açıklama"
                                className="flex-1 bg-transparent border-b border-white/10 focus:border-white/30 py-1 text-gray-400 text-sm placeholder-gray-600 focus:outline-none transition-all hidden md:block"
                              />
                              <input
                                type="text"
                                value={item.price}
                                onChange={(e) => updateItem(cat.id, item.id, 'price', e.target.value)}
                                placeholder="Fiyat"
                                className="w-20 bg-transparent border-b border-white/10 focus:border-white/30 py-1 text-white text-sm placeholder-gray-600 focus:outline-none transition-all text-right flex-shrink-0"
                              />
                              {cat.items.length > 1 && (
                                <button
                                  onClick={() => removeItem(cat.id, item.id)}
                                  className="text-gray-700 hover:text-gray-400 transition-all flex-shrink-0"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          ))}
                          <div className="px-4 py-2">
                            <button
                              onClick={() => addItem(cat.id)}
                              className="flex items-center gap-1.5 text-gray-500 hover:text-gray-300 text-sm transition-all"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              Ürün ekle
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Expiration + Note */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className="card-premium p-6 md:p-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              <Clock className="w-4 h-4 inline mr-1" />
              QR Kod Geçerlilik Süresi
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {expirationOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setExpiration(opt.value)}
                  className={`py-3 rounded-xl border text-sm font-medium transition-all ${
                    expiration === opt.value
                      ? 'bg-blue-500/30 border-blue-500/50 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Not / Açıklama (İsteğe Bağlı)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="QR kod için ek not ekleyin..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all resize-none"
            />
          </div>
        </div>
      </motion.div>

      {/* Generate Button */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <button
          onClick={handleGenerate}
          disabled={!isValid || isGenerating}
          className={`btn-primary w-full py-4 rounded-2xl font-bold text-white text-lg flex items-center justify-center gap-3 transition-all duration-300 ${
            !isValid || isGenerating ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              QR Kod Oluşturuluyor...
            </>
          ) : (
            <>
              QR Kod Oluştur
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
        {!isValid && (
          <p className="text-center text-gray-500 text-sm mt-2">
            Marka adı, en az bir kategori ve ürün (ad + fiyat) giriniz
          </p>
        )}
      </motion.div>

      {/* Feature Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6"
      >
        <div className="card-premium p-3 md:p-6">
          <div className="inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 mb-2 md:mb-4 shadow-lg">
            <Zap className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <h3 className="text-sm md:text-xl font-semibold text-white mb-1 md:mb-2">Hızlı Paylaşım</h3>
          <p className="text-gray-400 text-xs md:text-sm hidden md:block">
            Fiyat listenizi saniyeler içinde QR koda dönüştürün.
          </p>
        </div>
        <div className="card-premium p-3 md:p-6">
          <div className="inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-2 md:mb-4 shadow-lg">
            <Store className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <h3 className="text-sm md:text-xl font-semibold text-white mb-1 md:mb-2">Her İşletme</h3>
          <p className="text-gray-400 text-xs md:text-sm hidden md:block">
            Restoran, berber, mağaza; her işletme için uygun.
          </p>
        </div>
        <div className="card-premium p-3 md:p-6 col-span-2 md:col-span-1">
          <div className="inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-2 md:mb-4 shadow-lg">
            <Clock className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <h3 className="text-sm md:text-xl font-semibold text-white mb-1 md:mb-2">Geçerlilik</h3>
          <p className="text-gray-400 text-xs md:text-sm hidden md:block">
            Belirli süre geçerli QR kod oluşturun.
          </p>
        </div>
      </motion.div>

      {/* Info Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
      >
        <div className="card-premium p-4 md:p-6">
          <h3 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3 text-gradient">Restoran Menüsü</h3>
          <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
            Başlangıç, ana yemek, tatlı gibi kategoriler ekleyip ürün ve fiyatlarınızı girin. QR kodu masalara koyun, müşteriler telefonuyla okutarak menüye erişsin.
          </p>
        </div>
        <div className="card-premium p-4 md:p-6">
          <h3 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3 text-gradient">Hizmet Listesi</h3>
          <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
            Berber, güzellik salonu, tamirci gibi işletmeler için hizmet kategorileri ve fiyatlarını paylaşın. Güncelleme gerektiğinde yeni QR kolayca oluşturun.
          </p>
        </div>
      </motion.div>

      {/* Detailed Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card-premium p-4 md:p-8"
      >
        <h2 className="text-lg md:text-2xl font-bold text-white mb-3 md:mb-4 text-gradient">Dijital Fiyat Listesiyle İşletmenizi Modernleştirin</h2>
        <p className="text-gray-400 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
          Kağıt menü ve fiyat listelerinin yerini artık dijital QR kodlar alıyor. Müşterileriniz telefonlarıyla saniyeler içinde güncel fiyat listenize ulaşabilir.
          Hem maliyet tasarrufu sağlarsınız hem de güncellemeler anında yansır.
        </p>
        <h3 className="text-base md:text-xl font-semibold text-white mb-2 md:mb-3">Fiyat Listesi QR Kodunun Avantajları</h3>
        <ul className="text-gray-400 space-y-2 md:space-y-3 mb-4 md:mb-6 text-sm md:text-base">
          <li className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center mt-0.5">
              <span className="text-orange-400 text-xs">✓</span>
            </div>
            <span>Kağıt menü maliyetini ortadan kaldırın</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center mt-0.5">
              <span className="text-amber-400 text-xs">✓</span>
            </div>
            <span>Fiyat değişikliklerini anında yansıtın</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5">
              <span className="text-blue-400 text-xs">✓</span>
            </div>
            <span>Sınırsız kategori ve ürün ekleyin</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5">
              <span className="text-purple-400 text-xs">✓</span>
            </div>
            <span>Restoran, kafe, berber, mağaza — her işletme için uygun</span>
          </li>
        </ul>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
          LuxQR ile fiyat listenizi saniyeler içinde QR koda dönüştürün. Modern işletmeler için ideal dijital çözüm.
        </p>
      </motion.div>
      </div>
      </div>
    </div>
  );
}
