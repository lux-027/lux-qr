'use client';

import { motion } from 'framer-motion';
import { CreditCard, Clock, Shield, Zap, FileText, Building2 } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { showNotification } from '@/components/Notification';

export default function IbanContent() {
  const router = useRouter();
  const [iban, setIban] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [note, setNote] = useState('');
  const [expiration, setExpiration] = useState<'1day' | '1week' | '1month' | '3months'>('1day');
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
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12 md:mb-16"
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
            IBAN bilgilerinizi QR kod olarak oluşturun
          </p>
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
            <label className="flex items-center gap-2 text-white font-semibold mb-2 md:mb-3">
              <Building2 className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
              Banka Adı (Opsiyonel)
            </label>
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="Banka adı girin"
              className="w-full bg-slate-800/50 border border-white/10 rounded-2xl p-3 md:p-4 text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none text-sm md:text-base"
            />
          </div>

          {/* IBAN Input */}
          <div className="mb-4 md:mb-6">
            <label className="flex items-center gap-2 text-white font-semibold mb-2 md:mb-3">
              <CreditCard className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
              IBAN Numarası
            </label>
            <input
              type="text"
              value={iban}
              onChange={handleIbanChange}
              placeholder="TRXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX"
              className={`w-full bg-slate-800/50 border border-white/10 rounded-2xl p-3 md:p-4 text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none text-sm md:text-base font-mono tracking-wider ${
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
            <label className="flex items-center gap-2 text-white font-semibold mb-2 md:mb-3">
              <FileText className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
              Hesap Sahibi (Opsiyonel)
            </label>
            <input
              type="text"
              value={accountHolder}
              onChange={(e) => setAccountHolder(e.target.value)}
              placeholder="Hesap sahibi adı"
              className="w-full bg-slate-800/50 border border-white/10 rounded-2xl p-3 md:p-4 text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none text-sm md:text-base"
            />
          </div>

          {/* Note/Description Field */}
          <div className="mb-4 md:mb-6">
            <label className="flex items-center gap-2 text-white font-semibold mb-2 md:mb-3">
              <FileText className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
              Not / Açıklama
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="QR kod hakkında açıklama veya not ekleyin... (opsiyonel)"
              className="w-full h-20 md:h-24 bg-slate-800/50 border border-white/10 rounded-2xl p-3 md:p-4 text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none resize-none text-sm md:text-base"
            />
          </div>

          {/* Expiration Selection */}
          <div className="mb-4 md:mb-6">
            <label className="flex items-center gap-2 text-white font-semibold mb-2 md:mb-3">
              <Clock className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
              Geçerlilik Süresi
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
              {[
                { value: '1day', label: '1 Gün', icon: Clock },
                { value: '1week', label: '1 Hafta', icon: Clock },
                { value: '1month', label: '1 Ay', icon: Clock },
                { value: '3months', label: '3 Ay', icon: Clock },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setExpiration(option.value as any)}
                  className={`flex flex-col items-center gap-1 md:gap-2 p-2 md:p-4 rounded-xl border transition-all ${
                    expiration === option.value
                      ? 'border-blue-500/50 bg-blue-500/10 text-blue-400'
                      : 'border-white/10 text-gray-400 hover:border-blue-500/50'
                  }`}
                >
                  <option.icon className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-xs md:text-sm font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-4 md:mt-6">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="btn-primary w-full text-white font-semibold py-3 md:py-4 rounded-2xl disabled:opacity-50 text-sm md:text-base"
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
              <Zap className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <h3 className="text-sm md:text-xl font-semibold text-white mb-1 md:mb-2">Hızlı Paylaşım</h3>
            <p className="text-gray-400 text-xs md:text-sm hidden md:block">
              IBAN bilgilerinizi saniyeler içinde paylaşın.
            </p>
          </div>

          <div className="card-premium p-3 md:p-6">
            <div className="inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-2 md:mb-4 shadow-lg">
              <Shield className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <h3 className="text-sm md:text-xl font-semibold text-white mb-1 md:mb-2">Güvenli</h3>
            <p className="text-gray-400 text-xs md:text-sm hidden md:block">
              Banka bilgileriniz güvende. Şifreli ve güvenli paylaşım.
            </p>
          </div>

          <div className="card-premium p-3 md:p-6 col-span-2 md:col-span-1">
            <div className="inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 mb-2 md:mb-4 shadow-lg">
              <Clock className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <h3 className="text-sm md:text-xl font-semibold text-white mb-1 md:mb-2">Geçerlilik</h3>
            <p className="text-gray-400 text-xs md:text-sm hidden md:block">
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
            <h3 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3 text-gradient">IBAN QR Kodları</h3>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
              Banka hesap bilgilerinizi QR kod ile kolayca paylaşın. 
              Ödemeler, bağışlar ve para transferleri için hızlı erişim sağlar.
            </p>
          </div>
          <div className="card-premium p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3 text-gradient">Hızlı Transfer</h3>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
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
          <h2 className="text-lg md:text-2xl font-bold text-white mb-3 md:mb-4 text-gradient">IBAN Paylaşımında QR Kodun Sağladığı Kolaylık</h2>
          <p className="text-gray-400 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
            Geleneksel IBAN paylaşım yöntemleri artık yetersiz kalıyor. Uzun IBAN numaralarını manuel olarak kopyalama ve gönderme süreci yerine, QR kod teknolojisi ile saniyeler içinde paylaşım yapabilirsiniz. 
            Özellikle toplantılar, etkinlikler ve ticari işlemler için QR kod tabanlı IBAN paylaşımı, hata riskini en aza indirirken işlem hızını maksimuma çıkarır.
          </p>

          <h3 className="text-base md:text-xl font-semibold text-white mb-2 md:mb-3">Dijital Ödeme Rehberi</h3>
          <p className="text-gray-400 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">Dijital dönüşüm çağında ödeme süreçleri de evriliyor. QR kod teknolojisi ile:</p>

          <ul className="text-gray-400 space-y-2 md:space-y-3 mb-4 md:mb-6 text-sm md:text-base">
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

          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            LuxQR ile IBAN bilgilerinizi güvenli ve hızlı bir şekilde paylaşın. Modern ödeme çözümleri için ideal platform.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
