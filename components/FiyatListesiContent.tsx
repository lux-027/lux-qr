'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Plus, Trash2, ChevronDown, ChevronUp, Tag, Package,
  ShoppingBag, Store, Clock, ArrowRight, Loader2, CheckCircle, Zap,
  ImagePlus, X as XIcon, FileText, DollarSign, Layers, Wand2, QrCode
} from 'lucide-react';
import { useRef } from 'react';

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
  logoUrl: string;
  categories: Category[];
}

const generateId = () => Math.random().toString(36).substring(2, 9);

const expirationOptions = [
  { value: '1day', label: '1 Gün' },
  { value: '1week', label: '1 Hafta' },
  { value: '1month', label: '1 Ay' },
  { value: '3months', label: '3 Ay' },
  { value: '6months', label: '6 Ay' },
  { value: '12months', label: '12 Ay' },
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
  const [itemUploading, setItemUploading] = useState<string | null>(null);
  const itemInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const [catUploading, setCatUploading] = useState<string | null>(null);
  const catInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

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
      brandDescription: 'Taze malzemelerle hazırlanan lezzetler ve özel içecekler',
      currency: 'TL',
      logoUrl: '',
      categories: [
        {
          id: generateId(),
          name: 'Başlangıçlar',
          imageUrl: 'https://images.unsplash.com/photo-1543353071-087092ec393a?w=400&q=80',
          items: [
            { id: generateId(), name: 'Mercimek Çorbası', price: '85', description: 'Taze sebzelerle hazırlanmış, kırmızı biber yağlı', imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80' },
            { id: generateId(), name: 'Zeytinyağlı Yaprak Sarma', price: '110', description: '6 adet, limon dilimiyle servis edilir', imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80' },
            { id: generateId(), name: 'Humus', price: '95', description: 'Tahin ve zeytinyağı ile, pide ekmeği eşliğinde', imageUrl: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=400&q=80' },
          ],
        },
        {
          id: generateId(),
          name: 'Ana Yemekler',
          imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80',
          items: [
            { id: generateId(), name: 'Izgara Köfte', price: '220', description: 'Pilav ve mevsim salata ile servis edilir', imageUrl: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&q=80' },
            { id: generateId(), name: 'Tavuk Şiş', price: '195', description: 'Sebzeli, özel baharatlı marine', imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80' },
            { id: generateId(), name: 'Karışık Izgara', price: '320', description: 'Et ve tavuk karışık, 2 kişilik porsiyon', imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80' },
            { id: generateId(), name: 'Levrek Izgara', price: '280', description: 'Taze levrek, sebze garnitürü ile', imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=80' },
          ],
        },
        {
          id: generateId(),
          name: 'Tatlılar',
          imageUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80',
          items: [
            { id: generateId(), name: 'Künefe', price: '130', description: 'Fıstıklı, sıcak servis', imageUrl: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=400&q=80' },
            { id: generateId(), name: 'Cheesecake', price: '115', description: 'Frambuaz soslu, ev yapımı', imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80' },
            { id: generateId(), name: 'Sütlaç', price: '85', description: 'Fırında pişirilmiş, tarçınlı', imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80' },
          ],
        },
        {
          id: generateId(),
          name: 'İçecekler',
          imageUrl: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80',
          items: [
            { id: generateId(), name: 'Ayran', price: '45', description: 'Ev yapımı, köpüklü', imageUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=80' },
            { id: generateId(), name: 'Limonata', price: '75', description: 'Taze sıkılmış nane yapraklı', imageUrl: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&q=80' },
            { id: generateId(), name: 'Türk Kahvesi', price: '65', description: 'Geleneksel pişirme, lokum ikramı', imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80' },
            { id: generateId(), name: 'Çay', price: '30', description: 'Demlik çay, şeker seçeneğiyle', imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80' },
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
        { id: newId, name: '', imageUrl: '', items: [{ id: generateId(), name: '', price: '', description: '', imageUrl: '' }] },
      ],
    }));
    setOpenCategories((prev) => [...prev, newId]);
  };

  const handleCatImageUpload = async (catId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const localUrl = URL.createObjectURL(file);
    setPriceList((prev) => ({
      ...prev,
      categories: prev.categories.map((c) => c.id === catId ? { ...c, imageUrl: localUrl } : c),
    }));
    setCatUploading(catId);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.url) {
        setPriceList((prev) => ({
          ...prev,
          categories: prev.categories.map((c) => c.id === catId ? { ...c, imageUrl: data.url } : c),
        }));
        URL.revokeObjectURL(localUrl);
      }
    } catch (err) {
      console.error('Category image upload error:', err);
    } finally {
      setCatUploading(null);
    }
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
          ? { ...c, items: [...c.items, { id: generateId(), name: '', price: '', description: '', imageUrl: '' }] }
          : c
      ),
    }));
  };

  const handleItemImageUpload = async (catId: string, itemId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const localUrl = URL.createObjectURL(file);
    updateItem(catId, itemId, 'imageUrl', localUrl);
    setItemUploading(itemId);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.url) {
        updateItem(catId, itemId, 'imageUrl', data.url);
        URL.revokeObjectURL(localUrl);
      }
    } catch (err) {
      console.error('Item image upload error:', err);
    } finally {
      setItemUploading(null);
    }
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-3 md:p-8">
      <div className="max-w-6xl mx-auto">

      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-6 md:mb-16"
      >
        <div className="flex items-center justify-center gap-3 md:gap-5 mb-3 md:mb-6">
          <div className="relative">
            <div className="w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-500/40 rotate-3 hover:-rotate-3 transition-transform duration-300">
              <ShoppingBag className="w-7 h-7 md:w-10 md:h-10 text-white drop-shadow-lg" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 md:w-7 md:h-7 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg -rotate-12">
              <QrCode className="w-3 h-3 md:w-4 md:h-4 text-white" />
            </div>
          </div>
          <div className="text-left">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">Fiyat Listesi</h1>
            <p className="text-lg md:text-2xl font-bold bg-gradient-to-r from-orange-400 via-amber-400 to-orange-400 bg-clip-text text-transparent">QR Kod</p>
          </div>
        </div>
        <p className="text-gray-500 text-sm md:text-lg max-w-2xl mx-auto hidden md:block">
          Restoran menüsü, hizmet veya ürün fiyat listenizi QR koda dönüştürün
        </p>
      </motion.div>

      <div className="space-y-3 md:space-y-8">
      {/* Brand Info Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="card-premium p-4 md:p-8">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="p-2 md:p-3 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg">
                <ShoppingBag className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h2 className="text-base md:text-xl font-bold text-white">Marka Bilgileri</h2>
                <p className="text-gray-500 text-xs hidden md:block">Marka, kategori ve ürünlerinizi ekleyin</p>
              </div>
            </div>
            <button
              onClick={fillDemo}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-400 hover:text-gray-200 text-xs transition-all"
            >
              <Wand2 className="w-3 h-3" />
              Demo
            </button>
          </div>

          {/* Brand Info */}
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <Store className="w-4 h-4 text-amber-400" />
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
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <ImagePlus className="w-4 h-4 text-pink-400" />
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
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <FileText className="w-4 h-4 text-violet-400" />
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
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                Para Birimi
              </label>
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
        <div className="card-premium p-4 md:p-10">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-500/30">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg md:text-2xl font-bold text-white">Kategoriler ve Ürünler</h3>
                <p className="text-gray-500 text-xs md:text-sm mt-0.5">Her kategori için ürün, fiyat ve resim ekleyin</p>
              </div>
            </div>
            <button
              onClick={addCategory}
              className="flex items-center gap-1.5 px-3 md:px-4 py-2 bg-gradient-to-r from-orange-500/20 to-amber-500/20 hover:from-orange-500/30 hover:to-amber-500/30 border border-orange-500/30 rounded-xl text-orange-300 text-sm font-medium transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              Kategori Ekle
            </button>
          </div>

          <div className="space-y-3">
            {priceList.categories.map((cat, catIdx) => {
              const isOpen = openCategories.includes(cat.id);
              return (
                <div key={cat.id} className="rounded-xl overflow-hidden border border-slate-600/50">

                  {/* ── Kategori Başlığı ── */}
                  <div
                    className={`flex items-center gap-2 px-3 py-3 cursor-pointer transition-all ${
                      isOpen ? 'bg-slate-700/80' : 'bg-slate-800/80 hover:bg-slate-700/60'
                    }`}
                    onClick={() => toggleCategory(cat.id)}
                  >
                    <span className="text-orange-400 flex-shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>

                    {/* Kategori Resmi */}
                    <div className="flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={(el) => { catInputRefs.current[cat.id] = el; }}
                        onChange={(e) => handleCatImageUpload(cat.id, e)}
                      />
                      {cat.imageUrl ? (
                        <div className="relative group">
                          <img src={cat.imageUrl} alt={cat.name} className="w-10 h-10 rounded-lg object-cover border border-white/20" />
                          {catUploading === cat.id && (
                            <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center">
                              <Loader2 className="w-3 h-3 text-white animate-spin" />
                            </div>
                          )}
                          <button
                            onClick={() => setPriceList((prev) => ({ ...prev, categories: prev.categories.map((c) => c.id === cat.id ? { ...c, imageUrl: '' } : c) }))}
                            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full hidden group-hover:flex items-center justify-center"
                          >
                            <XIcon className="w-2.5 h-2.5 text-white" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => catInputRefs.current[cat.id]?.click()}
                          className="w-10 h-10 rounded-lg border border-dashed border-slate-500 hover:border-orange-400/60 flex items-center justify-center text-slate-500 hover:text-orange-400 transition-all"
                          title="Kategori resmi ekle"
                        >
                          <ImagePlus className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <input
                      type="text"
                      value={cat.name}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => updateCategory(cat.id, e.target.value)}
                      placeholder="Kategori adı..."
                      className="flex-1 bg-transparent text-white font-semibold placeholder-slate-500 focus:outline-none text-sm cursor-text"
                    />

                    <span className="text-xs text-slate-400 bg-slate-600/50 px-2 py-0.5 rounded-full flex-shrink-0">
                      {cat.items.length} ürün
                    </span>

                    {priceList.categories.length > 1 && (
                      <button
                        onClick={(e) => { e.stopPropagation(); removeCategory(cat.id); }}
                        className="text-slate-600 hover:text-red-400 transition-all flex-shrink-0 ml-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* ── Ürün Listesi ── */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-slate-900/60 p-2.5 space-y-2">
                          {cat.items.map((item, itemIdx) => (
                            <div key={item.id} className="bg-slate-800 border border-slate-700 hover:border-slate-500 rounded-lg px-3 py-2.5 space-y-2 transition-all">

                              {/* Satır 1: numara + resim + ad + fiyat + sil */}
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-500 w-5 flex-shrink-0 text-center font-bold">{itemIdx + 1}</span>

                                {/* Ürün Resmi */}
                                <div className="flex-shrink-0">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    ref={(el) => { itemInputRefs.current[item.id] = el; }}
                                    onChange={(e) => handleItemImageUpload(cat.id, item.id, e)}
                                  />
                                  {item.imageUrl ? (
                                    <div className="relative group">
                                      <img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded-lg object-cover border border-slate-600" />
                                      {itemUploading === item.id && (
                                        <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center">
                                          <Loader2 className="w-3 h-3 text-white animate-spin" />
                                        </div>
                                      )}
                                      <button
                                        onClick={() => updateItem(cat.id, item.id, 'imageUrl', '')}
                                        className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full hidden group-hover:flex items-center justify-center"
                                      >
                                        <XIcon className="w-2.5 h-2.5 text-white" />
                                      </button>
                                    </div>
                                  ) : (
                                    <button
                                      onClick={() => itemInputRefs.current[item.id]?.click()}
                                      className="w-12 h-12 rounded-lg border border-dashed border-slate-600 hover:border-orange-400/60 flex items-center justify-center text-slate-600 hover:text-orange-400 transition-all"
                                      title="Resim ekle"
                                    >
                                      <ImagePlus className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>

                                {/* Ad */}
                                <input
                                  type="text"
                                  value={item.name}
                                  onChange={(e) => updateItem(cat.id, item.id, 'name', e.target.value)}
                                  placeholder="Ürün adı"
                                  className="flex-1 min-w-0 bg-slate-700/60 border border-slate-600 focus:border-orange-400 rounded-lg px-2.5 py-1.5 text-white text-sm font-medium placeholder-slate-500 focus:outline-none transition-all"
                                />

                                {/* Fiyat */}
                                <div className="flex items-center gap-0.5 flex-shrink-0 bg-slate-700/50 border border-slate-600 rounded-lg px-2 py-1">
                                  <span className="text-slate-400 text-xs font-medium">{priceList.currency}</span>
                                  <input
                                    type="number"
                                    inputMode="decimal"
                                    min="0"
                                    step="0.01"
                                    value={item.price}
                                    onChange={(e) => updateItem(cat.id, item.id, 'price', e.target.value)}
                                    placeholder="0"
                                    className="w-14 bg-transparent border-none text-amber-300 text-sm font-semibold placeholder-slate-600 focus:outline-none text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                  />
                                </div>

                                {cat.items.length > 1 && (
                                  <button
                                    onClick={() => removeItem(cat.id, item.id)}
                                    className="text-slate-600 hover:text-red-400 transition-all flex-shrink-0"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>

                              {/* Satır 2: açıklama */}
                              <input
                                type="text"
                                value={item.description}
                                onChange={(e) => updateItem(cat.id, item.id, 'description', e.target.value)}
                                placeholder="Açıklama..."
                                className="w-3/4 bg-slate-700/40 border border-slate-700 focus:border-slate-500 rounded-lg px-2.5 py-1 text-slate-300 text-xs placeholder-slate-600 focus:outline-none transition-all mx-auto block"
                              />
                            </div>
                          ))}

                          {/* Ürün Ekle Butonu */}
                          <button
                            onClick={() => addItem(cat.id)}
                            className="flex items-center gap-1.5 w-full justify-center py-2.5 text-orange-400 hover:text-white text-xs font-semibold transition-all border border-orange-500/40 hover:border-orange-500 bg-orange-500/10 hover:bg-orange-500/25 rounded-lg mt-1 shadow-[0_0_12px_rgba(249,115,22,0.15)] hover:shadow-[0_0_18px_rgba(249,115,22,0.3)]"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            Ürün Ekle
                          </button>
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
        <div className="card-premium p-4 md:p-8 space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <Clock className="w-4 h-4 text-orange-400" />
              Geçerlilik Süresi
            </label>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {expirationOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setExpiration(opt.value)}
                  className={`py-2.5 rounded-xl border text-xs md:text-sm font-medium transition-all ${
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
            <label className="block text-xs font-medium text-gray-400 mb-1.5">
              Not (İsteğe Bağlı)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              placeholder="QR kod için ek not..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all resize-none"
            />
          </div>
        </div>
      </motion.div>

      {/* Generate Button */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <button
          onClick={handleGenerate}
          disabled={!isValid || isGenerating || !!itemUploading || !!catUploading || logoUploading}
          className={`btn-primary w-full py-3.5 md:py-4 rounded-2xl font-bold text-white text-base md:text-lg flex items-center justify-center gap-3 transition-all duration-300 ${
            !isValid || isGenerating || !!itemUploading || !!catUploading || logoUploading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {(itemUploading || catUploading || logoUploading) ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Resim Yükleniyor...
            </>
          ) : isGenerating ? (
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

      {/* Example Product Showcase */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
        <div className="card-premium p-3 md:p-8">
          <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-5">
            <div className="p-1.5 md:p-2 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg">
              <ImagePlus className="w-3 h-3 md:w-4 md:h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm md:text-lg font-bold text-white">Örnek Ürün Görselleri</h3>
              <p className="text-gray-500 text-xs hidden md:block mt-0.5">Her sektöre uygun fiyat listesi oluşturabilirsiniz</p>
            </div>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-4 gap-1.5 md:gap-3">
            {[
              { url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80', label: 'Restoran', color: 'from-orange-500/80 to-amber-500/80' },
              { url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80', label: 'Giyim', color: 'from-blue-500/80 to-cyan-500/80' },
              { url: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&q=80', label: 'Elektronik', color: 'from-purple-500/80 to-pink-500/80' },
              { url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80', label: 'Güzellik', color: 'from-rose-500/80 to-pink-500/80' },
              { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', label: 'Hizmet', color: 'from-emerald-500/80 to-teal-500/80' },
              { url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80', label: 'Mobilya', color: 'from-yellow-500/80 to-orange-500/80' },
              { url: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=400&q=80', label: 'Spor', color: 'from-green-500/80 to-emerald-500/80' },
              { url: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=400&q=80', label: 'Teknoloji', color: 'from-indigo-500/80 to-blue-500/80' },
            ].map((item, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden group aspect-square">
                <img
                  src={item.url}
                  alt={item.label}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-0 group-hover:opacity-60 transition-opacity duration-300`} />
                <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-xs font-semibold text-center drop-shadow">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-xs text-center mt-4">Ürünlerinize kendi resimlerinizi ekleyerek daha profesyonel görünüm elde edin</p>
        </div>
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
