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
  PenLine,
  Eye,
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
  { id: 'gradient-9', name: 'Orman', value: 'linear-gradient(135deg, #064e3b 0%, #059669 50%, #10b981 100%)' },
  { id: 'gradient-10', name: 'Şeker', value: 'linear-gradient(135deg, #f472b6 0%, #fb7185 50%, #fda4af 100%)' },
  { id: 'gradient-11', name: 'Lav', value: 'linear-gradient(135deg, #450a0a 0%, #991b1b 50%, #ef4444 100%)' },
  { id: 'gradient-12', name: 'Elektrik', value: 'linear-gradient(135deg, #020617 0%, #1d4ed8 50%, #06b6d4 100%)' },
  { id: 'gradient-13', name: 'Şeftali', value: 'linear-gradient(135deg, #fed7aa 0%, #fb923c 50%, #f43f5e 100%)' },
  { id: 'gradient-14', name: 'Galaksi', value: 'linear-gradient(135deg, #020617 0%, #4c1d95 50%, #7e22ce 100%)' },
  { id: 'gradient-15', name: 'Gümüş', value: 'linear-gradient(135deg, #475569 0%, #94a3b8 50%, #e2e8f0 100%)' },
  { id: 'gradient-16', name: 'Altın', value: 'linear-gradient(135deg, #a16207 0%, #eab308 50%, #facc15 100%)' },
  { id: 'gradient-17', name: 'Mercan', value: 'linear-gradient(135deg, #f43f5e 0%, #fb923c 50%, #ef4444 100%)' },
  { id: 'gradient-18', name: 'Buzul', value: 'linear-gradient(135deg, #cffafe 0%, #22d3ee 50%, #0891b2 100%)' },
  { id: 'gradient-19', name: 'Çimen', value: 'linear-gradient(135deg, #3f6212 0%, #65a30d 50%, #a3e635 100%)' },
  { id: 'gradient-20', name: 'Mystic', value: 'linear-gradient(135deg, #2e1065 0%, #7c3aed 50%, #c026d3 100%)' },
  { id: 'gradient-21', name: 'Tropikal', value: 'linear-gradient(135deg, #fcd34d 0%, #f97316 50%, #ec4899 100%)' },
  { id: 'gradient-22', name: 'Neon', value: 'linear-gradient(135deg, #022c22 0%, #10b981 50%, #a3e635 100%)' },
  { id: 'gradient-23', name: 'Gül Kurusu', value: 'linear-gradient(135deg, #be123c 0%, #fb7185 50%, #fda4af 100%)' },
  { id: 'gradient-24', name: 'Yarı Gece', value: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)' },
  { id: 'gradient-25', name: 'Kahve', value: 'linear-gradient(135deg, #451a03 0%, #92400e 50%, #d97706 100%)' },
  { id: 'gradient-26', name: 'Lacivert', value: 'linear-gradient(135deg, #020617 0%, #172554 50%, #1e40af 100%)' },
  { id: 'gradient-27', name: 'Koyu Orman', value: 'linear-gradient(135deg, #022c22 0%, #14532d 50%, #166534 100%)' },
  { id: 'gradient-28', name: 'Pembe Mor', value: 'linear-gradient(135deg, #f472b6 0%, #a855f7 50%, #6366f1 100%)' },
  { id: 'gradient-29', name: 'Gökyüzü', value: 'linear-gradient(135deg, #e0f2fe 0%, #38bdf8 50%, #0284c7 100%)' },
  { id: 'gradient-30', name: 'Kırmızı Siyah', value: 'linear-gradient(135deg, #000000 0%, #7f1d1d 50%, #dc2626 100%)' },
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
      background: randomBg,
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
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Kullanıcı Adı</label>
                  <input
                    type="text"
                    value={data.username}
                    onChange={(e) => setData((p) => ({ ...p, username: e.target.value.replace(/\s+/g, '') }))}
                    placeholder="luxqr"
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Background + Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <div className="card-premium p-2.5 md:p-5 order-2 lg:order-1">
              <h2 className="text-sm md:text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Palette className="w-3.5 h-3.5 md:w-5 md:h-5 text-pink-400" />
                Arka Plan
              </h2>

            {/* Presets */}
            <div className="grid grid-cols-10 sm:grid-cols-6 md:grid-cols-7 gap-1 md:gap-2 mb-2 md:mb-4">
              {backgrounds.map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => setData((p) => ({ ...p, background: bg.value }))}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    data.background === bg.value
                      ? 'border-white/70 ring-2 ring-white/50 scale-[1.05] shadow-lg shadow-white/10'
                      : 'border-transparent hover:border-white/30 hover:scale-[1.02]'
                  }`}
                  style={{ background: bg.value, backgroundSize: 'cover', backgroundPosition: 'center' }}
                  title={bg.name}
                />
              ))}
            </div>
            <p className="text-slate-400 text-[10px] md:text-xs leading-relaxed flex items-start gap-2">
              <Palette className="w-3.5 h-3.5 md:w-4 md:h-4 text-pink-400 flex-shrink-0 mt-0.5" />
              Seçtiğiniz renk, Bio Link sayfanızın arka planı ve QR sonuç ekranında otomatik olarak kullanılır. 30 farklı hazır gradyan temasından istediğinizi deneyebilirsiniz.
            </p>
          </div>

            {/* Preview */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card-premium p-4 md:p-5 flex flex-col order-1 lg:order-2"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Eye className="w-4 h-4 text-purple-400" />
                  Önizleme
                </h3>
                <div className="flex items-center gap-1 p-1 rounded-full bg-slate-800/80 border border-white/10 backdrop-blur-sm">
                  <button
                    onClick={() => setPreviewMode('phone')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      previewMode === 'phone'
                        ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Telefon
                  </button>
                  <button
                    onClick={() => setPreviewMode('tablet')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      previewMode === 'tablet'
                        ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                        : 'text-slate-400 hover:text-white'
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
              {data.links.length > 0 && (
                <button
                  onClick={addLink}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-blue-300 text-sm transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Link Ekle
                </button>
              )}
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
                <div className="py-4 perspective-[1000px]">
                  <div className="flex justify-center mb-5">
                    <button
                      onClick={addLink}
                      className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:scale-105 text-sm font-medium"
                    >
                      <Plus className="w-4 h-4" />
                      Link Ekle
                    </button>
                  </div>
                  <div className="flex justify-center" style={{ perspective: '1000px' }}>
                    <motion.div
                      initial={{ opacity: 0, y: 20, rotateY: -8 }}
                      animate={{ opacity: 1, y: 0, rotateY: -8 }}
                      transition={{ duration: 0.6 }}
                      className="w-full max-w-[280px] sm:max-w-[320px] rounded-2xl bg-slate-800/70 backdrop-blur-sm border border-white/10 shadow-2xl shadow-black/50 overflow-hidden"
                      style={{ transform: 'rotateY(-8deg) translateZ(10px)', transformStyle: 'preserve-3d' }}
                    >
                      {/* Browser top bar */}
                      <div className="bg-slate-900/80 px-3 py-2 flex items-center gap-2 border-b border-white/10">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                        </div>
                        <div className="flex-1 mx-2 h-5 bg-slate-800 rounded-md flex items-center px-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-400/60 mr-2" />
                          <span className="text-[10px] text-slate-500 truncate">luxqrpro.site/view/@kullanici</span>
                        </div>
                      </div>

                      {/* Page preview */}
                      <div className="p-4 bg-gradient-to-br from-slate-900 to-slate-950">
                        <div className="flex flex-col items-center mb-4">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-2 shadow-lg" />
                          <div className="h-3 bg-white/20 rounded w-32 mb-1.5" />
                          <div className="h-2.5 bg-white/10 rounded w-20" />
                        </div>
                        <div className="space-y-2">
                          <div className="h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-pink-500/40" />
                            <div className="h-2 bg-white/20 rounded w-20" />
                          </div>
                          <div className="h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-sky-500/40" />
                            <div className="h-2 bg-white/20 rounded w-24" />
                          </div>
                          <div className="h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-red-500/40" />
                            <div className="h-2 bg-white/20 rounded w-16" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  <p className="text-slate-400 text-xs md:text-sm text-center mt-5">Link ekleyerek tüm sosyal medya ve web sayfalarınızı tek bir Bio Link sayfasında toplayın.</p>
                </div>
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
          <div className="card-premium p-4 md:p-6">
            <h2 className="text-base md:text-2xl font-bold text-white mb-4 md:mb-6 flex items-center gap-2">
              <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-yellow-400" />
              Nasıl Çalışır?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6">
              {[
                { step: '1', title: 'Bilgileri Gir', desc: 'İsminizi, kullanıcı adınızı ve logonuzu yükleyin.', icon: User, from: 'from-blue-500', to: 'to-cyan-500' },
                { step: '2', title: 'Linkleri Ekle', desc: 'Sosyal medya ve web sayfalarınızın linklerini ekleyin.', icon: LinkIcon, from: 'from-emerald-500', to: 'to-teal-500' },
                { step: '3', title: 'QR Oluştur', desc: 'Tek tıkla Bio Link sayfanızı ve QR kodunuzu oluşturun.', icon: QrCode, from: 'from-orange-500', to: 'to-amber-500' },
              ].map((item) => (
                <div
                  key={item.step}
                  className="group relative p-4 md:p-5 rounded-2xl bg-slate-800/70 backdrop-blur-sm border border-white/10 flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-300"
                  style={{ perspective: '1000px' }}
                >
                  <div className={`absolute -top-2.5 md:-top-3 w-7 h-7 md:w-9 md:h-9 rounded-full bg-gradient-to-br ${item.from} ${item.to} ring-2 ring-white/20 flex items-center justify-center shadow-lg shadow-black/40`}>
                    <span className="text-white font-black text-xs md:text-sm">{item.step}</span>
                  </div>
                  <div className={`w-9 h-9 md:w-11 md:h-11 mt-3 md:mt-4 mb-2 md:mb-3 rounded-xl bg-gradient-to-br ${item.from} ${item.to} shadow-lg shadow-black/30 flex items-center justify-center`}>
                    <item.icon className="w-4 h-4 md:w-5 md:h-5 text-white drop-shadow" />
                  </div>
                  <h3 className="text-white font-bold text-xs md:text-sm mb-1">{item.title}</h3>
                  <p className="text-slate-400 text-[11px] md:text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6">
            {[
              { title: 'Özel Logo', desc: 'Markanızı veya fotoğrafınızı sayfa başına yerleştirin.', icon: User, color: 'from-blue-500 to-cyan-500' },
              { title: 'Arka Plan Seçimi', desc: '30 farklı hazır renk temasından istediğinizi seçin.', icon: Palette, color: 'from-pink-500 to-rose-500' },
              { title: 'Sınırsız Link', desc: 'Tüm sosyal medya ve web linklerinizi tek ekranda toplayın.', icon: ExternalLink, color: 'from-emerald-500 to-teal-500' },
              { title: 'QR Kod', desc: 'Bio Link sayfanıza yönlendiren QR kodu saniyeler içinde oluşturun.', icon: QrCode, color: 'from-orange-500 to-amber-500' },
            ].map((f) => (
              <div key={f.title} className="group relative p-4 md:p-5 rounded-2xl bg-slate-800/70 backdrop-blur-sm border border-white/10 flex items-start gap-3 md:gap-4 hover:-translate-y-2 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-300">
                <div className={`w-9 h-9 md:w-11 md:h-11 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center flex-shrink-0 shadow-lg shadow-black/30 ring-1 ring-white/20`}>
                  <f.icon className="w-4 h-4 md:w-5 md:h-5 text-white drop-shadow" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xs md:text-base mb-1">{f.title}</h3>
                  <p className="text-slate-400 text-[11px] md:text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Use cases */}
          <div className="relative p-4 md:p-8 rounded-3xl bg-slate-800/70 backdrop-blur-sm border border-white/10">
            <h2 className="text-base md:text-2xl font-bold text-white mb-4 md:mb-6 flex items-center gap-2">
              <Heart className="w-4 h-4 md:w-6 md:h-6 text-rose-400" />
              Bio Link Kimler İçin?
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {[
                { title: 'Etkinlikler', desc: 'Bilet, konum ve sosyal medya linklerini tek yerde paylaşın.', icon: Calendar, color: 'from-violet-500 to-purple-500' },
                { title: 'İşletmeler', desc: 'Menü, rezervasyon ve iletişim linklerini müşterilere sunun.', icon: Store, color: 'from-blue-500 to-cyan-500' },
                { title: 'Freelancer', desc: 'Portfolyo, blog ve sosyal medya hesaplarınızı sergileyin.', icon: Briefcase, color: 'from-emerald-500 to-teal-500' },
                { title: 'İçerik Üreticileri', desc: 'Tüm platformları takipçilerinize tek linkle ulaştırın.', icon: Share2, color: 'from-orange-500 to-amber-500' },
              ].map((u) => (
                <div key={u.title} className="group p-3 md:p-5 rounded-2xl bg-slate-900/40 border border-white/10 text-center hover:-translate-y-2 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-300">
                  <div className={`w-9 h-9 md:w-11 md:h-11 mx-auto mb-2 md:mb-3 rounded-xl bg-gradient-to-br ${u.color} flex items-center justify-center shadow-lg shadow-black/30 ring-1 ring-white/20`}>
                    <u.icon className="w-4 h-4 md:w-5 md:h-5 text-white drop-shadow" />
                  </div>
                  <h3 className="text-white font-bold text-xs md:text-sm mb-1">{u.title}</h3>
                  <p className="text-slate-400 text-[10px] md:text-xs leading-relaxed">{u.desc}</p>
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
