'use client';

import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setEmail('');
      } else {
        setError(data.error || 'Bir hata oluştu');
      }
    } catch (err) {
      setError('Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-8">
        <div className="max-w-2xl mx-auto text-center">
          <CheckCircle className="w-8 h-8 md:w-12 md:h-12 text-green-400 mx-auto mb-2 md:mb-4" />
          <h2 className="text-lg md:text-2xl font-bold text-white mb-2 md:mb-3">
            Başarıyla Abone Oldunuz!
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            En son QR kod ipuçları ve rehberleri artık e-posta kutunuza gelsin.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-8">
      <div className="max-w-2xl mx-auto text-center">
        <Mail className="w-8 h-8 md:w-12 md:h-12 text-blue-400 mx-auto mb-2 md:mb-4" />
        <h2 className="text-lg md:text-2xl font-bold text-white mb-2 md:mb-3">
          Bültenimize Abone Olun
        </h2>
        <p className="text-gray-400 text-sm md:text-base mb-4 md:mb-6">
          En son QR kod ipuçları ve rehberleri doğrudan e-posta kutunuza gelsin.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2 md:gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-posta adresiniz"
            className="flex-1 px-3 md:px-4 py-2 md:py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none text-sm md:text-base"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 md:px-6 py-2 md:py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
          >
            {loading ? 'Abone Olunuyor...' : 'Abone Ol'}
          </button>
        </form>
        {error && (
          <p className="text-red-400 text-xs md:text-sm mt-2 md:mt-3">{error}</p>
        )}
      </div>
    </div>
  );
}
