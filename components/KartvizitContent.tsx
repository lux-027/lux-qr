'use client';

import { motion } from 'framer-motion';
import { CreditCard, Clock, Shield, Zap, Search, ChevronDown, User, Phone, Mail, Building2, Globe, MapPin, FileText, Wand2, ImagePlus, X as XIcon, Loader2, QrCode, Timer, AlarmClock, CalendarDays, CalendarRange } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { showNotification } from '@/components/Notification';

export default function KartvizitContent() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    company: '',
    title: '',
    website: '',
    address: '',
  });
  const [note, setNote] = useState('');
  const [expiration, setExpiration] = useState<'1day' | '1week' | '1month' | '3months' | '6months' | '12months'>('1day');
  const [loading, setLoading] = useState(false);
  const [titleDropdownOpen, setTitleDropdownOpen] = useState(false);
  const [titleSearch, setTitleSearch] = useState('');
  const [showError, setShowError] = useState(false);
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoUploading, setPhotoUploading] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const titleDropdownRef = useRef<HTMLDivElement>(null);

  const titleOptions = [
    'CEO', 'CTO', 'CFO', 'CMO', 'COO', 'Yönetici', 'Müdür', 'Direktör',
    'Uzman', 'Danışman', 'Geliştirici', 'Tasarımcı', 'Pazarlama Müdürü',
    'İnsan Kaynakları Müdürü', 'Satış Müdürü', 'Diğer'
  ];

  const filteredTitleOptions = titleOptions.filter(option =>
    option.toLowerCase().includes(titleSearch.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (titleDropdownRef.current && !titleDropdownRef.current.contains(event.target as Node)) {
        setTitleDropdownOpen(false);
        setTitleSearch('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    let cleaned = value.replace(/\D/g, '');
    
    // Ensure it starts with 0
    if (cleaned.length > 0 && cleaned[0] !== '0') {
      cleaned = '0' + cleaned;
    }
    
    // Format as 0XXX XXX XX XX (Turkish format)
    if (cleaned.length === 0) return '';
    if (cleaned.length <= 4) return cleaned;
    if (cleaned.length <= 7) return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
    if (cleaned.length <= 9) return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7, 9)} ${cleaned.slice(9, 11)}`;
  };

  const fillDemo = () => {
    setFormData({
      firstName: 'Emre',
      lastName: 'Lux',
      phone: '0500 000 00 00',
      email: 'lux.studio.tr@gmail.com',
      company: 'LuxQr Teknoloji A.Ş.',
      title: 'CEO',
      website: 'https://luxqrpro.site',
      address: 'Bağcılar, İstanbul',
    });
    setPhotoUrl('/lux-inc-logo.png');
    setNote('Dijital kartvizitim. İletişime geçmekten memnuniyet duyarım.');
    setShowError(false);
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.url) setPhotoUrl(data.url);
    } catch {
      showNotification('Resim yüklenemedi', 'error');
    } finally {
      setPhotoUploading(false);
      e.target.value = '';
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData({ ...formData, phone: formatted });
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleGenerate = async () => {
    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.email) {
      setShowError(true);
      showNotification('Lütfen zorunlu alanları doldurun (İsim, Soyisim, Telefon, E-posta)', 'error');
      return;
    }

    if (!validateEmail(formData.email)) {
      setShowError(true);
      showNotification('Lütfen geçerli bir e-posta adresi girin', 'error');
      return;
    }

    setLoading(true);
    try {
      // vCard formatında içerik oluştur
      const vCardContent = `BEGIN:VCARD
VERSION:3.0
FN:${formData.firstName} ${formData.lastName}
N:${formData.lastName};${formData.firstName};;;
TEL:${formData.phone}
EMAIL:${formData.email}
ORG:${formData.company}
TITLE:${formData.title}
URL:${formData.website}
ADR:;;${formData.address};;;;${photoUrl ? `\nPHOTO;VALUE=URI:${photoUrl}` : ''}
END:VCARD`;

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: vCardContent,
          contentType: 'text',
          expiration,
          note,
        }),
      });

      const data = await response.json();
      if (data.success) {
        router.push(`/qr/${data.id}`);
      }
    } catch (error) {
      console.error('QR oluşturma hatası:', error);
      showNotification('QR kod oluşturulurken bir hata oluştu', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-4 md:p-8"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 md:mb-12"
        >
          <motion.div
            whileHover={{ y: -4, rotateX: 3, rotateY: -3 }}
            style={{
              transformStyle: 'preserve-3d',
              perspective: '800px',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(207,250,254,0.8) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(6,182,212,0.25)',
              boxShadow: '0 8px 32px rgba(6,182,212,0.15), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
            }}
            className="relative rounded-3xl overflow-hidden p-6 md:p-8 max-w-2xl mx-auto"
          >
            <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-3xl pointer-events-none"
              style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, transparent 100%)' }} />
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)' }} />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-5 md:gap-8">
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center -rotate-3 hover:rotate-3 transition-transform duration-300"
                    style={{ background: 'linear-gradient(135deg, #06b6d4, #2563eb)', boxShadow: '0 8px 24px rgba(6,182,212,0.45)' }}>
                    <CreditCard className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-xl flex items-center justify-center shadow-lg -rotate-12"
                    style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', boxShadow: '0 4px 12px rgba(59,130,246,0.4)' }}>
                    <QrCode className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1">
                  Kartvizit <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">QR Kodu</span>
                </h1>
                <p className="text-gray-600 text-sm md:text-base">vCard formatında dijital kartvizit oluşturun ve paylaşın</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-premium p-4 md:p-8 md:p-12 mb-6 md:mb-8"
        >
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg">
                <CreditCard className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-base md:text-xl font-bold text-gray-900">Kartvizit Bilgileri</h2>
            </div>
            <button
              onClick={fillDemo}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-gray-400 hover:text-gray-200 text-xs transition-all"
            >
              <Wand2 className="w-3 h-3" />
              Demo
            </button>
          </div>
          {/* Profil Fotoğrafı */}
          <div className="flex items-center gap-4 mb-5 pb-5 border-b border-gray-200">
            <input ref={photoInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
            {photoUrl ? (
              <div className="relative group flex-shrink-0">
                <img src={photoUrl} alt="Profil" className="w-16 h-16 rounded-full object-cover border-2 border-blue-500/50" />
                {photoUploading && (
                  <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center">
                    <Loader2 className="w-4 h-4 text-gray-900 animate-spin" />
                  </div>
                )}
                <button
                  onClick={() => setPhotoUrl('')}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full hidden group-hover:flex items-center justify-center"
                >
                  <XIcon className="w-3 h-3 text-white" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => photoInputRef.current?.click()}
                disabled={photoUploading}
                className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 hover:border-blue-400 flex flex-col items-center justify-center text-gray-500 hover:text-blue-400 transition-all flex-shrink-0"
              >
                {photoUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ImagePlus className="w-5 h-5" />}
              </button>
            )}
            <div>
              <p className="text-gray-900 text-sm font-medium">Profil Fotoğrafı</p>
              <p className="text-gray-600 text-xs mt-0.5">Kartvizit görüntüsünde gösterilir</p>
              {!photoUrl && (
                <button onClick={() => photoInputRef.current?.click()} className="text-blue-400 text-xs mt-1 hover:underline">
                  Fotoğraf Yükle
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="flex items-center gap-2 text-gray-900 font-semibold mb-2">
                <User className="w-5 h-5 text-cyan-400" />
                İsim *
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => {
                  setFormData({ ...formData, firstName: e.target.value });
                  setShowError(false);
                }}
                className={`w-full bg-white/80 border rounded-xl p-3 md:p-4 text-gray-900 placeholder-gray-400 focus:outline-none text-sm md:text-base ${
                  showError && !formData.firstName ? 'border-red-500' : 'border-gray-200 focus:border-blue-500/50'
                }`}
                placeholder="Adınız"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-900 font-semibold mb-2">
                <User className="w-5 h-5 text-cyan-400" />
                Soyisim *
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => {
                  setFormData({ ...formData, lastName: e.target.value });
                  setShowError(false);
                }}
                className={`w-full bg-white/80 border rounded-xl p-3 md:p-4 text-gray-900 placeholder-gray-400 focus:outline-none text-sm md:text-base ${
                  showError && !formData.lastName ? 'border-red-500' : 'border-gray-200 focus:border-blue-500/50'
                }`}
                placeholder="Soyadınız"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-900 font-semibold mb-2">
                <Phone className="w-5 h-5 text-emerald-400" />
                Telefon *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => {
                  handlePhoneChange(e);
                  setShowError(false);
                }}
                className={`w-full bg-white/80 border rounded-xl p-3 md:p-4 text-gray-900 placeholder-gray-400 focus:outline-none text-sm md:text-base ${
                  showError && !formData.phone ? 'border-red-500' : 'border-gray-200 focus:border-blue-500/50'
                }`}
                placeholder="0516 XXX XX XX"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-900 font-semibold mb-2">
                <Mail className="w-5 h-5 text-purple-400" />
                E-posta *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  setShowError(false);
                }}
                className={`w-full bg-white/80 border rounded-xl p-3 md:p-4 text-gray-900 placeholder-gray-400 focus:outline-none text-sm md:text-base ${
                  showError && !formData.email ? 'border-red-500' : 'border-gray-200 focus:border-blue-500/50'
                }`}
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-900 font-semibold mb-2">
                <Building2 className="w-5 h-5 text-amber-400" />
                Şirket
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full bg-white/80 border border-gray-200 rounded-xl p-3 md:p-4 text-gray-900 placeholder-gray-400 focus:border-blue-500/50 focus:outline-none text-sm md:text-base"
                placeholder="Şirket adı"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-900 font-semibold mb-2">
                <CreditCard className="w-5 h-5 text-pink-400" />
                Ünvan
              </label>
              <div className="relative" ref={titleDropdownRef}>
                <button
                  type="button"
                  onClick={() => setTitleDropdownOpen(!titleDropdownOpen)}
                  className="w-full bg-white/80 border border-gray-200 rounded-xl p-4 text-gray-900 focus:border-blue-500/50 focus:outline-none flex items-center justify-between"
                >
                  <span className={formData.title ? '' : 'text-gray-500'}>
                    {formData.title || 'Seçiniz'}
                  </span>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>

                {titleDropdownOpen && (
                  <div className="absolute z-10 w-full mt-2 bg-gray-100 border border-gray-200 rounded-xl shadow-xl max-h-48 overflow-y-auto">
                    <div className="p-3 border-b border-gray-200">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={titleSearch}
                          onChange={(e) => setTitleSearch(e.target.value)}
                          placeholder="Ara..."
                          className="w-full bg-gray-200/50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500/50 focus:outline-none text-sm"
                        />
                      </div>
                    </div>
                    <div className="p-2">
                      {filteredTitleOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, title: option });
                            setTitleDropdownOpen(false);
                            setTitleSearch('');
                          }}
                          className="w-full text-left px-4 py-2 rounded-lg text-gray-900 hover:bg-blue-500/20 transition-colors text-sm"
                        >
                          {option}
                        </button>
                      ))}
                      {filteredTitleOptions.length === 0 && (
                        <div className="px-4 py-2 text-gray-500 text-sm">
                          Sonuç bulunamadı
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-900 font-semibold mb-2">
                <Globe className="w-5 h-5 text-sky-400" />
                Web Sitesi
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full bg-white/80 border border-gray-200 rounded-xl p-3 md:p-4 text-gray-900 placeholder-gray-400 focus:border-blue-500/50 focus:outline-none text-sm md:text-base"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-900 font-semibold mb-2">
                <MapPin className="w-5 h-5 text-rose-400" />
                Adres
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-white/80 border border-gray-200 rounded-xl p-3 md:p-4 text-gray-900 placeholder-gray-400 focus:border-blue-500/50 focus:outline-none text-sm md:text-base"
                placeholder="Şehir, Ülke"
              />
            </div>

            {/* Note/Description Field */}
            <div>
              <label className="flex items-center gap-2 text-gray-900 font-semibold mb-2">
                <FileText className="w-5 h-5 text-violet-400" />
                Not / Açıklama
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="QR kartviziti hakkında açıklama veya not ekleyin... (opsiyonel)"
                className="w-full h-24 bg-white/80 border border-gray-200 rounded-xl p-4 text-gray-900 placeholder-gray-400 focus:border-blue-500/50 focus:outline-none resize-none"
              />
            </div>
          </div>

          {/* Expiration Selection */}
          <div className="mt-4 md:mt-6">
            <label className="flex items-center gap-2 text-gray-900 font-semibold mb-2 md:mb-3">
              <Clock className="w-4 h-4 md:w-5 md:h-5 text-orange-400" />
              Geçerlilik Süresi
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
                  onClick={() => setExpiration(option.value as any)}
                  className={`flex flex-col items-center gap-1 md:gap-2 p-2 md:p-4 rounded-xl border transition-all ${
                    expiration === option.value ? option.activeColor : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <option.icon className={`w-4 h-4 md:w-5 md:h-5 ${expiration === option.value ? option.color : 'text-gray-500'}`} />
                  <span className={`text-xs md:text-sm font-medium ${expiration === option.value ? option.color : ''}`}>{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-4 md:mt-6">
            <button
              onClick={handleGenerate}
              disabled={loading || !formData.firstName || !formData.lastName || !formData.phone || !formData.email}
              className="btn-primary w-full py-3 md:py-4 rounded-2xl text-white font-semibold disabled:opacity-50 text-sm md:text-base"
            >
              {loading ? 'Oluşturuluyor...' : 'QR Kod Oluştur'}
            </button>
          </div>
        </motion.div>

        {/* Informative Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8"
        >
          <div className="card-premium p-3 md:p-6">
            <div className="inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-2 md:mb-4 shadow-lg">
              <Zap className="w-5 h-5 md:w-6 md:h-6 text-gray-900" />
            </div>
            <h3 className="text-sm md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">Hızlı Paylaşım</h3>
            <p className="text-gray-600 text-xs md:text-sm hidden md:block">
              Tek tıkla iletişim bilgilerinizi paylaşın. Kağıt kartvizitlerinizi dijitalleştirin.
            </p>
          </div>

          <div className="card-premium p-3 md:p-6">
            <div className="inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-2 md:mb-4 shadow-lg">
              <Shield className="w-5 h-5 md:w-6 md:h-6 text-gray-900" />
            </div>
            <h3 className="text-sm md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">Güvenli</h3>
            <p className="text-gray-600 text-xs md:text-sm hidden md:block">
              vCard formatında standart ve güvenli iletişim bilgisi paylaşımı.
            </p>
          </div>

          <div className="card-premium p-3 md:p-6 col-span-2 md:col-span-1">
            <div className="inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 mb-2 md:mb-4 shadow-lg">
              <CreditCard className="w-5 h-5 md:w-6 md:h-6 text-gray-900" />
            </div>
            <h3 className="text-sm md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">Çevre Dostu</h3>
            <p className="text-gray-600 text-xs md:text-sm hidden md:block">
              Kağıt israfını önleyin. Dijital kartvizitler ile sürdürülebilir çözümler.
            </p>
          </div>
        </motion.div>

        {/* Additional Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8"
        >
          <div className="card-premium p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 md:mb-3 text-gradient">vCard Formatı Nedir?</h3>
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
              vCard (Virtual Card), elektronik kartvizit formatıdır. İletişim bilgilerinizi standart bir formatta saklar ve paylaşmanızı sağlar. 
              QR kod ile birleştirildiğinde, potansiyel müşterileriniz ve iş ortaklarınız tek tıkla tüm iletişim bilgilerinize ulaşabilir.
            </p>
          </div>

          <div className="card-premium p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 md:mb-3 text-gradient">Uyumlu Platformlar</h3>
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
              Dijital kartvizitler iOS, Android ve Windows cihazlarla tam uyumludur. 
              iPhone, Samsung, Huawei ve diğer tüm akıllı telefonlarda sorunsuz çalışır.
            </p>
          </div>
        </motion.div>

        {/* SEO Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card-premium p-4 md:p-8 md:p-12"
        >
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 text-gradient">Dijital vCard Nedir?</h2>
          <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
            vCard (Virtual Card), elektronik kartvizit formatıdır. İletişim bilgilerinizi standart bir formatta saklar ve paylaşmanızı sağlar.
            QR kod ile birleştirildiğinde, potansiyel müşterileriniz ve iş ortaklarınız tek tıkla tüm iletişim bilgilerinize ulaşabilir.
          </p>

          <h3 className="text-base md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">Kağıt Kartvizitleri Bırakmanın Şirketlere Çevre ve Prestij Katkıları</h3>
          <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
            Geleneksel kağıt kartvizitlerin yılda milyonlarca ağaç kesilmesine neden oluyor. Dijital kartvizit QR kodları ile:
          </p>
          <ul className="text-gray-600 space-y-2 md:space-y-2 mb-4 md:mb-6 text-sm md:text-base">
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Yılda ortalama 1000 kağıt kartvizit tasarrufu sağlayın</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Şirketinizin çevre dostu imajını güçlendirin</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Maliyetleri düşürün ve bütçeyi optimize edin</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Modern ve teknolojik profesyonel görünüm kazanın</span>
            </li>
          </ul>

          <h3 className="text-base md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">Avantajları</h3>
          <ul className="text-gray-600 space-y-2 md:space-y-2 text-sm md:text-base">
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Anında iletişim bilgisi aktarımı</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Her zaman güncel bilgiler</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Çoklu platform uyumluluğu</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Mobil cihazlarda kolay okuma</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}
