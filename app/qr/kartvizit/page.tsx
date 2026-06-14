'use client';

import { motion } from 'framer-motion';
import { CreditCard, Clock, Shield, Zap, Search, ChevronDown, User, Phone, Mail, Building2, Globe, MapPin, FileText } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { showNotification } from '@/components/Notification';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kartvizit QR Kod Oluşturucu - LuxQr',
  description: 'Dijital kartvizit QR kodu oluşturun. İsim, telefon, e-posta ve şirket bilgilerinizi QR koda dönüştürün.',
  keywords: ['kartvizit qr kod', 'vcard qr', 'iş kartı qr', 'digital business card qr', 'contact qr code'],
  openGraph: {
    title: 'Kartvizit QR Kod Oluşturucu - LuxQr',
    description: 'Dijital kartvizit QR kodu oluşturun. İsim, telefon, e-posta ve şirket bilgilerinizi QR koda dönüştürün.',
    url: 'https://www.luxqrpro.site/qr/kartvizit',
  },
};

export default function KartvizitPage() {
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
  const [expiration, setExpiration] = useState<'1day' | '1week' | '1month' | '3months'>('1day');
  const [loading, setLoading] = useState(false);
  const [titleDropdownOpen, setTitleDropdownOpen] = useState(false);
  const [titleSearch, setTitleSearch] = useState('');
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
      showNotification('Lütfen zorunlu alanları doldurun (İsim, Soyisim, Telefon, E-posta)', 'error');
      return;
    }

    if (!validateEmail(formData.email)) {
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
ADR:;;${formData.address};;;;
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
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
            <div className="relative flex items-center justify-center gap-3 mb-4">
              <CreditCard className="w-10 h-10 md:w-12 md:h-14 text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">LuxQr</h1>
            </div>
          </div>
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-300 mb-4">
            Modern <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">QR Kod Oluşturma</span>
          </p>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            vCard formatında dijital kartvizit oluşturun ve paylaşın
          </p>
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-premium p-8 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-white font-semibold mb-2">
                <User className="w-5 h-5 text-blue-400" />
                İsim *
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full bg-slate-800/50 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none"
                placeholder="Adınız"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-white font-semibold mb-2">
                <User className="w-5 h-5 text-blue-400" />
                Soyisim *
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full bg-slate-800/50 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none"
                placeholder="Soyadınız"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-white font-semibold mb-2">
                <Phone className="w-5 h-5 text-blue-400" />
                Telefon *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={handlePhoneChange}
                className="w-full bg-slate-800/50 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none"
                placeholder="0516 XXX XX XX"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-white font-semibold mb-2">
                <Mail className="w-5 h-5 text-blue-400" />
                E-posta *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-800/50 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-white font-semibold mb-2">
                <Building2 className="w-5 h-5 text-blue-400" />
                Şirket
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full bg-slate-800/50 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none"
                placeholder="Şirket adı"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-white font-semibold mb-2">
                <CreditCard className="w-5 h-5 text-blue-400" />
                Ünvan
              </label>
              <div className="relative" ref={titleDropdownRef}>
                <button
                  type="button"
                  onClick={() => setTitleDropdownOpen(!titleDropdownOpen)}
                  className="w-full bg-slate-800/50 border border-white/10 rounded-xl p-4 text-white focus:border-blue-500/50 focus:outline-none flex items-center justify-between"
                >
                  <span className={formData.title ? '' : 'text-gray-500'}>
                    {formData.title || 'Seçiniz'}
                  </span>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>

                {titleDropdownOpen && (
                  <div className="absolute z-10 w-full mt-2 bg-slate-800 border border-white/10 rounded-xl shadow-xl max-h-48 overflow-y-auto">
                    <div className="p-3 border-b border-white/10">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={titleSearch}
                          onChange={(e) => setTitleSearch(e.target.value)}
                          placeholder="Ara..."
                          className="w-full bg-slate-700/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none text-sm"
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
                          className="w-full text-left px-4 py-2 rounded-lg text-white hover:bg-blue-500/20 transition-colors text-sm"
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
              <label className="flex items-center gap-2 text-white font-semibold mb-2">
                <Globe className="w-5 h-5 text-blue-400" />
                Web Sitesi
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full bg-slate-800/50 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-white font-semibold mb-2">
                <MapPin className="w-5 h-5 text-blue-400" />
                Adres
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-slate-800/50 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none"
                placeholder="Şehir, Ülke"
              />
            </div>

            {/* Note/Description Field */}
            <div>
              <label className="flex items-center gap-2 text-white font-semibold mb-2">
                <FileText className="w-5 h-5 text-blue-400" />
                Not / Açıklama
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="QR kartviziti hakkında açıklama veya not ekleyin... (opsiyonel)"
                className="w-full h-24 bg-slate-800/50 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none resize-none"
              />
            </div>
          </div>

          {/* Expiration Selection */}
          <div className="mt-6">
            <label className="flex items-center gap-2 text-white font-semibold mb-3">
              <Clock className="w-5 h-5 text-blue-400" />
              Geçerlilik Süresi
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { value: '1day', label: '1 Gün', icon: Clock },
                { value: '1week', label: '1 Hafta', icon: Clock },
                { value: '1month', label: '1 Ay', icon: Clock },
                { value: '3months', label: '3 Ay', icon: Clock },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setExpiration(option.value as any)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                    expiration === option.value
                      ? 'border-blue-500/50 bg-blue-500/10 text-blue-400'
                      : 'border-white/10 text-gray-400 hover:border-blue-500/50'
                  }`}
                >
                  <option.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-6">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="btn-primary w-full py-4 rounded-2xl text-white font-semibold disabled:opacity-50"
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
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="card-premium p-6">
            <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-4 shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Hızlı Paylaşım</h3>
            <p className="text-gray-400 text-sm">
              Tek tıkla iletişim bilgilerinizi paylaşın. Kağıt kartvizitlerinizi dijitalleştirin.
            </p>
          </div>

          <div className="card-premium p-6">
            <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-4 shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Güvenli</h3>
            <p className="text-gray-400 text-sm">
              vCard formatında standart ve güvenli iletişim bilgisi paylaşımı.
            </p>
          </div>

          <div className="card-premium p-6">
            <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 mb-4 shadow-lg">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Çevre Dostu</h3>
            <p className="text-gray-400 text-sm">
              Kağıt israfını önleyin. Dijital kartvizitler ile sürdürülebilir çözümler.
            </p>
          </div>
        </motion.div>

        {/* Additional Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          <div className="card-premium p-6">
            <h3 className="text-lg font-semibold text-white mb-3 text-gradient">vCard Formatı Nedir?</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              vCard (Virtual Card), elektronik kartvizit formatıdır. İletişim bilgilerinizi standart bir formatta saklar ve paylaşmanızı sağlar. 
              QR kod ile birleştirildiğinde, potansiyel müşterileriniz ve iş ortaklarınız tek tıkla tüm iletişim bilgilerinize ulaşabilir.
            </p>
          </div>

          <div className="card-premium p-6">
            <h3 className="text-lg font-semibold text-white mb-3 text-gradient">Uyumlu Platformlar</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
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
          className="card-premium p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4 text-gradient">Dijital vCard Nedir?</h2>
          <p className="text-gray-400 mb-6">
            vCard (Virtual Card), elektronik kartvizit formatıdır. İletişim bilgilerinizi standart bir formatta saklar ve paylaşmanızı sağlar.
            QR kod ile birleştirildiğinde, potansiyel müşterileriniz ve iş ortaklarınız tek tıkla tüm iletişim bilgilerinize ulaşabilir.
          </p>

          <h3 className="text-xl font-semibold text-white mb-3">Kağıt Kartvizitleri Bırakmanın Şirketlere Çevre ve Prestij Katkıları</h3>
          <p className="text-gray-400 mb-6">
            Geleneksel kağıt kartvizitlerin yılda milyonlarca ağaç kesilmesine neden oluyor. Dijital kartvizit QR kodları ile:
          </p>
          <ul className="text-gray-400 space-y-2 mb-6">
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

          <h3 className="text-xl font-semibold text-white mb-3">Avantajları</h3>
          <ul className="text-gray-400 space-y-2">
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
