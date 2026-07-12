'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Link as LinkIcon,
  Plus,
  Trash2,
  ArrowRight,
  Loader2,
  Image as ImageIcon,
  Check,
  BadgeCheck,
  Copy,
  QrCode,
  ExternalLink,
  Palette,
  RefreshCcw,
  Sparkles,
  Briefcase,
  Calendar,
  CalendarDays,
  CalendarRange,
  Timer,
  AlarmClock,
  Store,
  Heart,
  Share2,
  Clock,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { showNotification } from '@/components/Notification';

interface BioLink {
  id: string;
  title: string;
  url: string;
}

interface BioLinkData {
  title: string;
  username: string;
  logoUrl: string;
  background: string;
  blurAmount: number;
  links: BioLink[];
}

const backgrounds = [
  { id: 'gradient-1', name: 'Mor Mavi', value: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)' },
  { id: 'gradient-2', name: 'Turuncu Amber', value: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #f97316 100%)' },
  { id: 'gradient-3', name: 'Yeşil Mavi', value: 'linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #3b82f6 100%)' },
  { id: 'gradient-4', name: 'Koyu Lüks', value: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)' },
  { id: 'gradient-5', name: 'Pembe Mercan', value: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 50%, #fb923c 100%)' },
  { id: 'gradient-6', name: 'Gece Gökyüzü', value: 'linear-gradient(135deg, #0f172a 0%, #312e81 50%, #4c1d95 100%)' },
  { id: 'gradient-7', name: 'Gün Batımı', value: 'linear-gradient(135deg, #f97316 0%, #db2777 50%, #7c3aed 100%)' },
  { id: 'gradient-8', name: 'Deniz', value: 'linear-gradient(135deg, #06b6d4 0%, #2563eb 50%, #1e40af 100%)' },
];

function generateId() {
  return Math.random().toString(36).substring(2, 11);
}

export default function BioLinkContent() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [logoUploading, setLogoUploading] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState<BioLinkData>({
    title: '',
    username: '',
    logoUrl: '',
    background: backgrounds[0].value,
    blurAmount: 12,
    links: [],
  });
  const [previewMode, setPreviewMode] = useState<'phone' | 'tablet'>('phone');
  const [expiration, setExpiration] = useState<'1day' | '1week' | '1month' | '3months' | '6months' | '12months'>('3months');

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const result = await res.json();
      if (result.success && result.url) {
        setData((p) => ({ ...p, logoUrl: result.url }));
        showNotification('Logo yüklendi', 'success');
      } else {
        showNotification('Logo yüklenemedi', 'error');
      }
    } catch (err) {
      showNotification('Bir hata oluştu', 'error');
    } finally {
      setLogoUploading(false);
    }
  };

  const addLink = () => {
    setData((p) => ({
      ...p,
      links: [...p.links, { id: generateId(), title: '', url: '' }],
    }));
  };

  const updateLink = (id: string, field: keyof BioLink, value: string) => {
    setData((p) => ({
      ...p,
      links: p.links.map((l) => (l.id === id ? { ...l, [field]: value } : l)),
    }));
  };

  const removeLink = (id: string) => {
    setData((p) => ({ ...p, links: p.links.filter((l) => l.id !== id) }));
  };

  const isValid =
    data.title.trim() !== '' &&
    data.username.trim() !== '' &&
    data.links.length > 0 &&
    data.links.every((l) => l.title.trim() !== '' && l.url.trim() !== '');

  const handleGenerate = async () => {
    if (!isValid) return;
    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: JSON.stringify(data),
          contentType: 'bio-link',
          expiration,
        }),
      });
      const result = await res.json();
      if (result.success && result.id) {
        router.push(`/qr/${result.id}`);
        showNotification('Bio link QR kodu oluşturuldu', 'success');
      } else {
        showNotification('QR kod oluşturulamadı', 'error');
      }
    } catch (err) {
      showNotification('Bir hata oluştu', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (generatedUrl) {
      navigator.clipboard.writeText(generatedUrl);
      showNotification('Link kopyalandı', 'success');
    }
  };

  const generateDemo = () => {
    const seed = Date.now();
    const names = ['Emre', 'Ayşe', 'Mehmet', 'Zeynep', 'Can', 'Elif', 'Burak', 'Selin', 'LuxQr Studio', 'Pixel Agency', 'Nova Design', 'Digital Art'];
    const surnames = ['Design', 'Links', 'Studio', 'Media', 'Creative', 'Official', 'Works', 'Hub', 'Collective'];
    const linkTitles = ['Instagram', 'Twitter / X', 'YouTube', 'TikTok', 'LinkedIn', 'Portfolio', 'Blog', 'Spotify', 'GitHub', 'Behance', 'Dribbble', 'WhatsApp'];
    const domains = ['instagram.com', 'x.com', 'youtube.com', 'tiktok.com', 'linkedin.com', 'behance.net', 'medium.com', 'spotify.com', 'github.com', 'dribbble.com'];

    const firstName = names[Math.floor(Math.random() * names.length)];
    const surname = surnames[Math.floor(Math.random() * surnames.length)];
    const title = `${firstName} ${surname}`;
    const username = `${firstName.toLowerCase()}${surname.toLowerCase()}${Math.floor(Math.random() * 999)}`;

    const linkCount = 3 + Math.floor(Math.random() * 3); // 3 to 5
    const shuffledTitles = [...linkTitles].sort(() => Math.random() - 0.5);
    const shuffledDomains = [...domains].sort(() => Math.random() - 0.5);
    const demoLinks: BioLink[] = Array.from({ length: linkCount }, (_, i) => ({
      id: generateId(),
      title: shuffledTitles[i],
      url: `https://${shuffledDomains[i]}/${username}`,
    }));

    const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)].value;

    setData({
      title,
      username,
      logoUrl: `https://picsum.photos/400/400?random=${seed}`,
      background: Math.random() > 0.3 ? randomBg : `url(https://picsum.photos/1200/800?random=${seed + 1})`,
      blurAmount: 8 + Math.floor(Math.random() * 14),
      links: demoLinks,
    });
    showNotification('Demo veriler yüklendi', 'success');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-3 md:p-8">
      <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 md:mb-12"
      >
        <div className="flex flex-col items-center justify-center gap-3 md:gap-5 mb-4">
          <div className="relative">
            <div className="w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/40 rotate-3 hover:-rotate-3 transition-transform duration-300">
              <ExternalLink className="w-7 h-7 md:w-10 md:h-10 text-white drop-shadow-lg" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 md:w-7 md:h-7 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg -rotate-12">
              <QrCode className="w-3 h-3 md:w-4 md:h-4 text-white" />
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">Bio Link</h1>
            <p className="text-sm md:text-2xl font-semibold bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">Link Ağacı</p>
          </div>
        </div>
        <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto mb-5">
          Tüm sosyal medya ve web linklerinizi tek bir sayfada toplayın. Tek link, tek QR kod.
        </p>
        <button
          onClick={generateDemo}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 hover:from-violet-500/30 hover:to-fuchsia-500/30 border border-violet-500/30 text-violet-300 text-sm font-medium transition-all"
        >
          <RefreshCcw className="w-4 h-4" />
          Demo ile Doldur
        </button>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 md:gap-8 w-full max-w-5xl mx-auto">
        {/* Editor */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-5"
        >
          {/* Profile Card */}
          <div className="card-premium p-4 md:p-5">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-400" />
              Profil Bilgileri
            </h2>

            <div className="flex items-center gap-4 mb-4">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={logoInputRef}
                onChange={handleLogoUpload}
              />
              <button
                onClick={() => logoInputRef.current?.click()}
                className="w-20 h-20 rounded-2xl border-2 border-dashed border-slate-500 hover:border-orange-400/60 flex flex-col items-center justify-center gap-1.5 text-slate-500 hover:text-orange-400 transition-all flex-shrink-0 overflow-hidden"
              >
                {data.logoUrl ? (
                  <img src={data.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <ImageIcon className="w-6 h-6" />
                    <span className="text-[10px]">Logo</span>
                  </>
                )}
              </button>
              <div className="flex-1 space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Sayfa Başlığı / İsim</label>
                  <input
                    type="text"
                    value={data.title}
                    onChange={(e) => setData((p) => ({ ...p, title: e.target.value }))}
                    placeholder="ör: LuxQr&apos;nin Linkleri"
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Link Adı</label>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 text-sm">luxqrpro.site/view/</span>
                    <input
                      type="text"
                      value={data.username}
                      onChange={(e) => setData((p) => ({ ...p, username: e.target.value.replace(/\s+/g, '') }))}
                      placeholder="luxqr"
                      className="flex-1 bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-all"
                    />
                  </div>
                  <p className="text-slate-500 text-[11px] mt-1.5">Bu alan sadece görsel amaçlıdır, otomatik ID atanır.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Background + Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <div className="card-premium p-4 md:p-5">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Palette className="w-5 h-5 text-pink-400" />
                Arka Plan
              </h2>

            {/* Presets */}
            <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 mb-4">
              {backgrounds.map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => setData((p) => ({ ...p, background: bg.value }))}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    data.background === bg.value ? 'border-orange-400 ring-2 ring-orange-400/30' : 'border-transparent hover:border-white/20'
                  }`}
                  style={{ background: bg.value, backgroundSize: 'cover', backgroundPosition: 'center' }}
                  title={bg.name}
                />
              ))}
            </div>

            {/* Blur Steps */}
            <div className="pt-4 border-t border-slate-700/60">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-bold text-white flex items-center gap-2">
                  <Palette className="w-4 h-4 text-emerald-400" />
                  Bulanıklık
                </label>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                  {data.blurAmount}px
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { value: 0, label: 'Kapalı' },
                  { value: 8, label: 'Az' },
                  { value: 15, label: 'Orta' },
                  { value: 22, label: 'Çok' },
                  { value: 30, label: 'Tam' },
                ].map((step) => (
                  <button
                    key={step.value}
                    onClick={() => setData((p) => ({ ...p, blurAmount: step.value }))}
                    className={`py-2 rounded-xl text-xs font-medium border transition-all ${
                      data.blurAmount === step.value
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'
                    }`}
                  >
                    {step.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

            {/* Preview */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card-premium p-4 md:p-5 flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Önizleme</h3>
                <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-800 border border-slate-700">
                  <button
                    onClick={() => setPreviewMode('phone')}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                      previewMode === 'phone' ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Telefon
                  </button>
                  <button
                    onClick={() => setPreviewMode('tablet')}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                      previewMode === 'tablet' ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Tablet
                  </button>
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center min-h-0">
                <div className={`transition-all ${
                  previewMode === 'phone' ? 'w-[220px]' : 'w-[320px]'
                }`}>
                  {previewMode === 'phone' ? (
                    <div className="relative rounded-[2rem] p-1.5 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border-[3px] border-slate-600 shadow-xl">
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-3 bg-black rounded-full z-30 border border-slate-800/50" />
                      <div className="relative rounded-[1.5rem] overflow-hidden bg-slate-950 border border-slate-800" style={{ aspectRatio: '9 / 16.2' }}>
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/[0.07] via-transparent to-transparent z-30 rounded-[1.5rem]" />
                        <div
                          className="absolute inset-0"
                          style={{
                            background: data.background,
                            backgroundSize: data.background.startsWith('linear-gradient') ? 'cover' : 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: '#0f172a',
                          }}
                        />
                        <div
                          className="absolute inset-0 bg-black/20"
                          style={{ backdropFilter: `blur(${data.blurAmount}px)`, WebkitBackdropFilter: `blur(${data.blurAmount}px)` }}
                        />
                        <div className="relative z-10 flex flex-col items-center justify-center h-full px-3 py-4 text-center">
                          {data.logoUrl ? (
                            <img src={data.logoUrl} alt={data.title} className="w-11 h-11 rounded-xl object-cover border-2 border-white/20 shadow-xl mb-1.5" />
                          ) : (
                            <div className="w-11 h-11 rounded-xl bg-white/10 border-2 border-white/20 flex items-center justify-center mb-1.5">
                              <User className="w-5 h-5 text-white/60" />
                            </div>
                          )}
                          <h2 className="text-xs font-bold text-white mb-0.5 leading-tight px-1">{data.title || 'İsminiz'}</h2>
                          {data.username && <p className="text-white/60 text-[10px] mb-2">@{data.username}</p>}
                          <div className="w-full max-w-[180px] space-y-1">
                            {data.links.map((link) => (
                              <a
                                key={link.id}
                                href={link.url || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full py-1 px-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md text-white font-medium transition-all text-[9px] truncate"
                              >
                                {link.title || 'Link Başlığı'}
                              </a>
                            ))}
                            {data.links.length === 0 && <div className="py-2 text-white/40 text-[10px]">Linkler burada görünecek</div>}
                          </div>
                          {data.username && (
                            <div className="mt-auto pt-2 px-0.5">
                              <p className="text-white/40 text-[8px] break-all">
                                {typeof window !== 'undefined'
                                  ? generatedUrl || `${window.location.origin}/view/${data.username}`
                                  : ''}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-slate-500/60 rounded-full z-30" />
                    </div>
                  ) : (
                    <div className="relative rounded-[1.2rem] p-1.5 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border-[3px] border-slate-600 shadow-xl">
                      <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-slate-900 rounded-full z-30 border border-slate-600">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-0.5 bg-blue-900/70 rounded-full" />
                      </div>
                      <div className="relative rounded-[0.8rem] overflow-hidden bg-slate-950 border border-slate-800" style={{ aspectRatio: '16 / 9' }}>
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/[0.07] via-transparent to-transparent z-30 rounded-[0.8rem]" />
                        <div
                          className="absolute inset-0"
                          style={{
                            background: data.background,
                            backgroundSize: data.background.startsWith('linear-gradient') ? 'cover' : 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: '#0f172a',
                          }}
                        />
                        <div
                          className="absolute inset-0 bg-black/20"
                          style={{ backdropFilter: `blur(${data.blurAmount}px)`, WebkitBackdropFilter: `blur(${data.blurAmount}px)` }}
                        />
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-2 h-full px-3 py-2 text-center md:text-left">
                          <div className="flex flex-col items-center md:items-start flex-shrink-0">
                            {data.logoUrl ? (
                              <img src={data.logoUrl} alt={data.title} className="w-9 h-9 rounded-lg object-cover border-2 border-white/20 shadow-xl mb-1" />
                            ) : (
                              <div className="w-9 h-9 rounded-lg bg-white/10 border-2 border-white/20 flex items-center justify-center mb-1">
                                <User className="w-4 h-4 text-white/60" />
                              </div>
                            )}
                            <h2 className="text-[10px] font-bold text-white leading-tight">{data.title || 'İsminiz'}</h2>
                            {data.username && <p className="text-white/60 text-[9px]">@{data.username}</p>}
                          </div>
                          <div className="w-full max-w-[160px] space-y-0.5">
                            {data.links.map((link) => (
                              <a
                                key={link.id}
                                href={link.url || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full py-1 px-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md text-white font-medium transition-all text-[9px] truncate"
                              >
                                {link.title || 'Link Başlığı'}
                              </a>
                            ))}
                            {data.links.length === 0 && <div className="py-2 text-white/40 text-[10px]">Linkler burada görünecek</div>}
                          </div>
                          {data.username && (
                            <div className="px-0.5 w-full text-center md:text-left">
                              <p className="text-white/40 text-[8px] break-all">
                                {typeof window !== 'undefined'
                                  ? generatedUrl || `${window.location.origin}/view/${data.username}`
                                  : ''}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Links */}
          <div className="card-premium p-4 md:p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-emerald-400" />
                Linkler
              </h2>
              <button
                onClick={addLink}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-blue-300 text-sm transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                Link Ekle
              </button>
            </div>

            <div className="space-y-3">
              <AnimatePresence>
                {data.links.map((link) => (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={link.title}
                        onChange={(e) => updateLink(link.id, 'title', e.target.value)}
                        placeholder="Başlık (ör: Instagram)"
                        className="bg-slate-900/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
                      />
                      <input
                        type="text"
                        value={link.url}
                        onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                        placeholder="https://..."
                        className="bg-slate-900/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
                      />
                    </div>
                    <button
                      onClick={() => removeLink(link.id)}
                      className="mt-2 flex items-center gap-1 text-slate-500 hover:text-red-400 text-xs transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                      Sil
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              {data.links.length === 0 && (
                <div className="text-center py-6 text-slate-500 text-sm">Henüz link eklenmedi. Yukarıdaki butona tıklayın.</div>
              )}
            </div>
          </div>

          {/* Expiration */}
          <div className="card-premium p-4 md:p-5">
            <label className="flex items-center gap-2 text-white font-semibold mb-3">
              <Clock className="w-4 h-4 md:w-5 md:h-5 text-orange-400" />
              QR Geçerlilik Süresi
            </label>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
              {[
                { value: '1day', label: '1 Gün', icon: Timer, color: 'text-cyan-400', activeColor: 'border-cyan-500/50 bg-cyan-500/10' },
                { value: '1week', label: '1 Hafta', icon: AlarmClock, color: 'text-blue-400', activeColor: 'border-blue-500/50 bg-blue-500/10' },
                { value: '1month', label: '1 Ay', icon: CalendarDays, color: 'text-purple-400', activeColor: 'border-purple-500/50 bg-purple-500/10' },
                { value: '3months', label: '3 Ay', icon: CalendarRange, color: 'text-orange-400', activeColor: 'border-orange-500/50 bg-orange-500/10' },
                { value: '6months', label: '6 Ay', icon: CalendarRange, color: 'text-rose-400', activeColor: 'border-rose-500/50 bg-rose-500/10' },
                { value: '12months', label: '12 Ay', icon: CalendarRange, color: 'text-amber-400', activeColor: 'border-amber-500/50 bg-amber-500/10' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setExpiration(option.value as typeof expiration)}
                  className={`flex flex-col items-center gap-1 md:gap-2 p-2 md:p-3 rounded-xl border transition-all ${
                    expiration === option.value ? option.activeColor : 'border-white/10 text-gray-400 hover:border-white/20'
                  }`}
                >
                  <option.icon className={`w-4 h-4 md:w-5 md:h-5 ${expiration === option.value ? option.color : 'text-gray-500'}`} />
                  <span className={`text-[11px] md:text-xs font-medium ${expiration === option.value ? option.color : ''}`}>{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Generate */}
          <button
            onClick={handleGenerate}
            disabled={!isValid || isGenerating || logoUploading}
            className={`btn-primary w-full py-3.5 rounded-2xl font-bold text-white flex items-center justify-center gap-2 transition-all ${
              !isValid || isGenerating || logoUploading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Oluşturuluyor...
              </>
            ) : (
              <>
                QR Kod Oluştur
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
          {!isValid && (
            <p className="text-center text-gray-500 text-sm">Başlık, link adı ve en az bir geçerli link giriniz.</p>
          )}

          {generatedUrl && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-premium p-4"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-500/20 rounded-xl">
                  <QrCode className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Bio Link Hazır!</h3>
                  <p className="text-slate-400 text-xs">QR kodunuzu indirin veya linki paylaşın.</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <input
                  type="text"
                  readOnly
                  value={generatedUrl}
                  className="flex-1 bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm"
                />
                <button
                  onClick={handleCopy}
                  className="p-2.5 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-300 transition-all"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>
              <a
                href={generatedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                Sayfayı Görüntüle
              </a>
            </motion.div>
          )}
        </motion.div>

        {/* Info sections */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8 md:space-y-10"
        >
          {/* How it works */}
          <div className="card-premium p-5 md:p-6">
            <h2 className="text-lg md:text-2xl font-bold text-white mb-5 md:mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
              Nasıl Çalışır?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
              {[
                { step: '1', title: 'Bilgileri Gir', desc: 'İsminizi, kullanıcı adınızı ve logonuzu yükleyin.', icon: User, from: 'from-blue-500', to: 'to-cyan-500' },
                { step: '2', title: 'Linkleri Ekle', desc: 'Sosyal medya ve web sayfalarınızın linklerini ekleyin.', icon: LinkIcon, from: 'from-emerald-500', to: 'to-teal-500' },
                { step: '3', title: 'QR Oluştur', desc: 'Tek tıkla Bio Link sayfanızı ve QR kodunuzu oluşturun.', icon: QrCode, from: 'from-orange-500', to: 'to-amber-500' },
              ].map((item) => (
                <div
                  key={item.step}
                  className="group relative p-5 rounded-2xl bg-slate-800/70 backdrop-blur-sm border border-white/10 flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-300"
                  style={{ perspective: '1000px' }}
                >
                  <div className={`absolute -top-3 w-9 h-9 rounded-full bg-gradient-to-br ${item.from} ${item.to} ring-2 ring-white/20 flex items-center justify-center shadow-lg shadow-black/40`}>
                    <span className="text-white font-black text-sm">{item.step}</span>
                  </div>
                  <div className={`w-11 h-11 mt-4 mb-3 rounded-xl bg-gradient-to-br ${item.from} ${item.to} shadow-lg shadow-black/30 flex items-center justify-center`}>
                    <item.icon className="w-5 h-5 text-white drop-shadow" />
                  </div>
                  <h3 className="text-white font-bold text-sm mb-1">{item.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {[
              { title: 'Özel Logo', desc: 'Markanızı veya fotoğrafınızı sayfa başına yerleştirin.', icon: User, color: 'from-blue-500 to-cyan-500' },
              { title: 'Arka Plan Seçimi', desc: 'Hazır renkler, fotoğraflar veya kendi resminizi kullanın.', icon: Palette, color: 'from-pink-500 to-rose-500' },
              { title: 'Sınırsız Link', desc: 'Tüm sosyal medya ve web linklerinizi tek ekranda toplayın.', icon: ExternalLink, color: 'from-emerald-500 to-teal-500' },
              { title: 'QR Kod', desc: 'Bio Link sayfanıza yönlendiren QR kodu saniyeler içinde oluşturun.', icon: QrCode, color: 'from-orange-500 to-amber-500' },
            ].map((f) => (
              <div key={f.title} className="group relative p-5 rounded-2xl bg-slate-800/70 backdrop-blur-sm border border-white/10 flex items-start gap-4 hover:-translate-y-2 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-300">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center flex-shrink-0 shadow-lg shadow-black/30 ring-1 ring-white/20`}>
                  <f.icon className="w-5 h-5 text-white drop-shadow" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm md:text-base mb-1">{f.title}</h3>
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Use cases */}
          <div className="relative p-6 md:p-8 rounded-3xl bg-slate-800/70 backdrop-blur-sm border border-white/10">
            <h2 className="text-lg md:text-2xl font-bold text-white mb-5 md:mb-6 flex items-center gap-2">
              <Heart className="w-5 h-5 md:w-6 md:h-6 text-rose-400" />
              Bio Link Kimler İçin?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: 'Etkinlikler', desc: 'Bilet, konum ve sosyal medya linklerini tek yerde paylaşın.', icon: Calendar, color: 'from-violet-500 to-purple-500' },
                { title: 'İşletmeler', desc: 'Menü, rezervasyon ve iletişim linklerini müşterilere sunun.', icon: Store, color: 'from-blue-500 to-cyan-500' },
                { title: 'Freelancer', desc: 'Portfolyo, blog ve sosyal medya hesaplarınızı sergileyin.', icon: Briefcase, color: 'from-emerald-500 to-teal-500' },
                { title: 'İçerik Üreticileri', desc: 'Tüm platformları takipçilerinize tek linkle ulaştırın.', icon: Share2, color: 'from-orange-500 to-amber-500' },
              ].map((u) => (
                <div key={u.title} className="group p-5 rounded-2xl bg-slate-900/40 border border-white/10 text-center hover:-translate-y-2 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-300">
                  <div className={`w-11 h-11 mx-auto mb-3 rounded-xl bg-gradient-to-br ${u.color} flex items-center justify-center shadow-lg shadow-black/30 ring-1 ring-white/20`}>
                    <u.icon className="w-5 h-5 text-white drop-shadow" />
                  </div>
                  <h3 className="text-white font-bold text-sm mb-1">{u.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{u.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  </div>
  );
}
