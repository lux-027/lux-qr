'use client';

import { motion } from 'framer-motion';
import { CreditCard, Clock, Shield, Zap, FileText, Building2, QrCode, Landmark, Timer, AlarmClock, CalendarDays, CalendarRange } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { showNotification } from '@/components/Notification';

export default function IbanContent() {
  const router = useRouter();
  const [iban, setIban] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [note, setNote] = useState('');
  const [expiration, setExpiration] = useState<'1day' | '1week' | '1month' | '3months' | '6months' | '12months'>('1day');
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleGenerate = async () => {
    if (!iban.trim()) {
      setShowError(true);
      showNotification('Lütfen IBAN girin', 'error');
      return;
    }

    // Basic IBAN validation (format: TR followed by 24 digits)
    const ibanClean = iban.replace(/\s/g, '').toUpperCase();
    if (!/^TR\d{24}$/.test(ibanClean)) {
      setShowError(true);
      showNotification('Geçersiz IBAN formatı. TR ile başlamalı ve 26 karakter olmalıdır', 'error');
      return;
    }

    setLoading(true);
    try {
      // EPC QR Code format for SEPA Credit Transfer (for bank scanners)
      // Format: SCT\n<BENM>+<NAME>\n<ADDD>+\n<IBAN>\n<BIC>+\n<CCY>+<AMT>\n<PURP>+<CODE>\n<REMI>+<REF>
      const epcContent = [
        'SCT',
        `<BENM>+${accountHolder || 'Bilinmiyor'}`,
        '<ADDD>+',
        `<IBAN>+${ibanClean}`,
        '<BIC>+',
        '<CCY>+',
        '<PURP>+',
        `<REMI>+${note || 'IBAN Transferi'}`
      ].join('\n');

      // Store both EPC format and original data for display
      const originalData = `IBAN:${ibanClean}|BANKA:${bankName || 'Bilinmiyor'}|HESAP:${accountHolder || 'Bilinmiyor'}`;

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: epcContent,
          contentType: 'iban',
          expiration,
          note: `${originalData}|||${note || ''}`, // Store original data and user note separated by |||
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

  const formatIban = (value: string) => {
    // Remove all non-numeric characters
    const cleaned = value.replace(/[^0-9]/g, '');
    // Limit to 24 digits (TR + 24 = 26 total characters - Turkish IBAN standard)
    const limited = cleaned.substring(0, 24);
    // Add TR prefix and spaces every 4 characters
    const withPrefix = 'TR' + limited;
    return withPrefix.replace(/(.{4})/g, '$1 ').trim();
  };

  const handleIbanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatIban(e.target.value);
    setIban(formatted);
    setShowError(false);
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
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(254,249,195,0.8) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(234,179,8,0.25)',
              boxShadow: '0 8px 32px rgba(234,179,8,0.15), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
            }}
            className="relative rounded-3xl overflow-hidden p-6 md:p-8 max-w-2xl mx-auto"
          >
            <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-3xl pointer-events-none"
              style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, transparent 100%)' }} />
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(234,179,8,0.2) 0%, transparent 70%)' }} />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-5 md:gap-8">
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center rotate-3 hover:-rotate-3 transition-transform duration-300"
                    style={{ background: 'linear-gradient(135deg, #eab308, #d97706)', boxShadow: '0 8px 24px rgba(234,179,8,0.45)' }}>
                    <Landmark className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-xl flex items-center justify-center shadow-lg -rotate-12"
                    style={{ background: 'linear-gradient(135deg, #f97316, #eab308)', boxShadow: '0 4px 12px rgba(249,115,22,0.4)' }}>
                    <QrCode className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1">
                  IBAN <span className="bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">QR Kodu</span>
                </h1>
                <p className="text-gray-600 text-sm md:text-base">IBAN bilgilerinizi QR kod olarak oluşturun ve paylaşın</p>
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
          {/* Bank Name Input */}
          <div className="mb-4 md:mb-6">
            <label className="flex items-center gap-2 text-gray-900 font-semibold mb-2 md:mb-3">
              <Building2 className="w-4 h-4 md:w-5 md:h-5 text-amber-400" />
              Banka Adı (Opsiyonel)
            </label>
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="Banka adı girin"
              className="w-full bg-white/80 border border-gray-200 rounded-2xl p-3 md:p-4 text-gray-900 placeholder-gray-400 focus:border-blue-500/50 focus:outline-none text-sm md:text-base"
            />
          </div>

          {/* IBAN Input */}
          <div className="mb-4 md:mb-6">
            <label className="flex items-center gap-2 text-gray-900 font-semibold mb-2 md:mb-3">
              <CreditCard className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
              IBAN Numarası
            </label>
            <input
              type="text"
              value={iban}
              onChange={handleIbanChange}
              placeholder="TRXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX"
              className={`w-full bg-white/80 border border-gray-200 rounded-2xl p-3 md:p-4 text-gray-900 placeholder-gray-400 focus:border-blue-500/50 focus:outline-none text-sm md:text-base font-mono tracking-wider ${
                showError ? 'border-red-500' : ''
              }`}
              maxLength={33}
            />
            {showError && (
              <p className="text-red-400 text-xs mt-1">Lütfen geçerli bir IBAN girin</p>
            )}
          </div>

          {/* Account Holder Input */}
          <div className="mb-4 md:mb-6">
            <label className="flex items-center gap-2 text-gray-900 font-semibold mb-2 md:mb-3">
              <FileText className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
              Hesap Sahibi (Opsiyonel)
            </label>
            <input
              type="text"
              value={accountHolder}
              onChange={(e) => setAccountHolder(e.target.value)}
              placeholder="Hesap sahibi adı"
              className="w-full bg-white/80 border border-gray-200 rounded-2xl p-3 md:p-4 text-gray-900 placeholder-gray-400 focus:border-blue-500/50 focus:outline-none text-sm md:text-base"
            />
          </div>

          {/* Note/Description Field */}
          <div className="mb-4 md:mb-6">
            <label className="flex items-center gap-2 text-gray-900 font-semibold mb-2 md:mb-3">
              <FileText className="w-4 h-4 md:w-5 md:h-5 text-violet-400" />
              Not / Açıklama
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="QR kod hakkında açıklama veya not ekleyin... (opsiyonel)"
              className="w-full h-20 md:h-24 bg-white/80 border border-gray-200 rounded-2xl p-3 md:p-4 text-gray-900 placeholder-gray-400 focus:border-blue-500/50 focus:outline-none resize-none text-sm md:text-base"
            />
          </div>

          {/* Expiration Selection */}
          <div className="mb-4 md:mb-6">
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
              disabled={loading}
              className="btn-primary w-full py-3 md:py-4 rounded-2xl text-white font-semibold py-3 md:py-4 rounded-2xl disabled:opacity-50 text-sm md:text-base"
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
              IBAN bilgilerinizi saniyeler içinde paylaşın.
            </p>
          </div>

          <div className="card-premium p-3 md:p-6">
            <div className="inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-2 md:mb-4 shadow-lg">
              <Shield className="w-5 h-5 md:w-6 md:h-6 text-gray-900" />
            </div>
            <h3 className="text-sm md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">Güvenli</h3>
            <p className="text-gray-600 text-xs md:text-sm hidden md:block">
              Banka bilgileriniz güvende. Şifreli ve güvenli paylaşım.
            </p>
          </div>

          <div className="card-premium p-3 md:p-6 col-span-2 md:col-span-1">
            <div className="inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 mb-2 md:mb-4 shadow-lg">
              <Clock className="w-5 h-5 md:w-6 md:h-6 text-gray-900" />
            </div>
            <h3 className="text-sm md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">Geçerlilik</h3>
            <p className="text-gray-600 text-xs md:text-sm hidden md:block">
              Belirli süre geçerli QR kod oluşturun.
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
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 md:mb-3 text-gradient">IBAN QR Kodları</h3>
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
              Banka hesap bilgilerinizi QR kod ile kolayca paylaşın. 
              Ödemeler, bağışlar ve para transferleri için hızlı erişim sağlar.
            </p>
          </div>
          <div className="card-premium p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 md:mb-3 text-gradient">Hızlı Transfer</h3>
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
              IBAN bilgilerinizi saniyeler içinde QR koda dönüştürün. 
              Mobil bankacılık uygulamaları ile entegre çalışır.
            </p>
          </div>
        </motion.div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card-premium p-4 md:p-8 md:p-12"
        >
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 text-gradient">IBAN Paylaşımında QR Kodun Sağladığı Kolaylık</h2>
          <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
            Geleneksel IBAN paylaşım yöntemleri artık yetersiz kalıyor. Uzun IBAN numaralarını manuel olarak kopyalama ve gönderme süreci yerine, QR kod teknolojisi ile saniyeler içinde paylaşım yapabilirsiniz. 
            Özellikle toplantılar, etkinlikler ve ticari işlemler için QR kod tabanlı IBAN paylaşımı, hata riskini en aza indirirken işlem hızını maksimuma çıkarır.
          </p>

          <h3 className="text-base md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">Dijital Ödeme Rehberi</h3>
          <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">Dijital dönüşüm çağında ödeme süreçleri de evriliyor. QR kod teknolojisi ile:</p>

          <ul className="text-gray-600 space-y-2 md:space-y-3 mb-4 md:mb-6 text-sm md:text-base">
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                <span className="text-green-400 text-xs">✓</span>
              </div>
              <span>Yazım hatalarını önleyin</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center mt-0.5">
                <span className="text-emerald-400 text-xs">✓</span>
              </div>
              <span>Hızlı ve güvenli transfer yapın</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5">
                <span className="text-blue-400 text-xs">✓</span>
              </div>
              <span>Mobil uyumlu ödeme çözümleri</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5">
                <span className="text-purple-400 text-xs">✓</span>
              </div>
              <span>Gerçek zamanlı hesap bilgisi paylaşımı</span>
            </li>
          </ul>

          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            LuxQR ile IBAN bilgilerinizi güvenli ve hızlı bir şekilde paylaşın. Modern ödeme çözümleri için ideal platform.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
