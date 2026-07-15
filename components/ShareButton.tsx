'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Share2, X, Copy, Check, QrCode, Link2 } from 'lucide-react';
import { showNotification } from '@/components/Notification';

const SITE_URL = 'https://luxqrpro.site';
const SITE_TITLE = 'LuxQr - Modern QR Kod Platformu';
const SITE_DESC = 'Dijital içeriklerinizi saniyeler içinde yüksek kaliteli QR kodlara dönüştürün!';

export default function ShareButton() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(SITE_URL);
      setCopied(true);
      showNotification('Link panoya kopyalandı!', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  const shareOptions = [
    {
      label: 'WhatsApp',
      bg: '#25d366',
      href: `https://wa.me/?text=${encodeURIComponent(SITE_DESC + ' ' + SITE_URL)}`,
      logo: (
        <svg viewBox="0 0 32 32" className="w-7 h-7" fill="white">
          <path d="M16 2.9A13.1 13.1 0 0 0 4.1 20.1L2 30l10.2-2.1A13.1 13.1 0 1 0 16 2.9zm0 23.9a10.8 10.8 0 0 1-5.5-1.5l-.4-.2-6 1.6 1.6-5.8-.3-.4A10.8 10.8 0 1 1 16 26.8zm5.9-8c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.5 8.5 0 0 1-4.3-3.7c-.3-.5.3-.5.9-1.6a.6.6 0 0 0 0-.6l-.9-2.1c-.2-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.7 3.7 0 0 0-1.1 2.7 6.4 6.4 0 0 0 1.3 3.4c.2.2 2.4 3.7 5.9 5.2a6.7 6.7 0 0 0 3.9.7 3.4 3.4 0 0 0 2.2-1.6 2.7 2.7 0 0 0 .2-1.6c-.2-.2-.4-.3-.7-.4z"/>
        </svg>
      ),
    },
    {
      label: 'Telegram',
      bg: '#2aabee',
      href: `https://t.me/share/url?url=${encodeURIComponent(SITE_URL)}&text=${encodeURIComponent(SITE_DESC)}`,
      logo: (
        <svg viewBox="0 0 32 32" className="w-7 h-7" fill="white">
          <path d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2zm6.9 9.5-2.3 10.8c-.2.8-.7 1-1.3.6l-3.5-2.6-1.7 1.6a.9.9 0 0 1-.7.4l.2-3.6 5.8-5.2c.3-.2 0-.4-.3-.2L10.5 18.5 7 17.4c-.8-.2-.8-.8.2-1.2l13.6-5.2c.6-.3 1.3.1 1.1 1.5z"/>
        </svg>
      ),
    },
    {
      label: 'X',
      bg: '#000000',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(SITE_DESC)}&url=${encodeURIComponent(SITE_URL)}`,
      logo: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="white">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      label: 'Diğer',
      bg: '#4b5563',
      href: null as string | null,
      logo: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 transition-colors duration-200 flex-shrink-0"
        title="Siteyi Paylaş"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="share-btn-gradient" x1="0" y1="0" x2="24" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3b82f6" />
              <stop offset="1" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <circle cx="18" cy="5" r="3" stroke="url(#share-btn-gradient)" strokeWidth="1.5" />
          <circle cx="6" cy="12" r="3" stroke="url(#share-btn-gradient)" strokeWidth="1.5" />
          <circle cx="18" cy="19" r="3" stroke="url(#share-btn-gradient)" strokeWidth="1.5" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke="url(#share-btn-gradient)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke="url(#share-btn-gradient)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Modal backdrop — rendered in body via portal */}
      {mounted && open && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.40)', backdropFilter: 'blur(8px)' }}
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          {/* Modal card */}
          <div className="relative w-[92%] max-w-[320px] rounded-3xl overflow-hidden"
            style={{
              background: '#ffffff',
              boxShadow: '0 -8px 40px rgba(0,0,0,0.18), 0 24px 64px rgba(0,0,0,0.12)',
            }}>

            {/* ── App header ── */}
            <div className="flex items-center gap-3 px-4 pt-4 pb-3 sm:px-5 sm:pt-5 sm:pb-4"
              style={{ background: 'linear-gradient(135deg,#4f46e5 0%,#7c3aed 60%,#0891b2 100%)' }}>
              {/* close X */}
              <button onClick={() => setOpen(false)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.20)' }}>
                <X className="w-3.5 h-3.5 text-white" />
              </button>
              {/* logo */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"
                style={{ background: 'rgba(255,255,255,0.18)', border: '1.5px solid rgba(255,255,255,0.30)' }}>
                <QrCode className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow" />
              </div>
              <div className="min-w-0">
                <p className="text-white font-black text-sm sm:text-base leading-tight">LuxQr</p>
                <p className="text-white/70 text-[11px] sm:text-xs font-medium leading-tight">Ücretsiz QR Kod Platformu</p>
                <p className="text-white/50 text-[10px] font-mono mt-0.5 truncate">{SITE_URL}</p>
              </div>
            </div>

            {/* ── PAYLAŞ label ── */}
            <div className="pt-4 pb-2 px-4 sm:pt-5 sm:pb-3 sm:px-5">
              <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.16em] text-gray-400 text-center">Paylaş</p>
            </div>

            {/* ── Share icon grid ── */}
            <div className="grid grid-cols-4 gap-2 px-4 pb-4 sm:px-5 sm:pb-5">
              {shareOptions.map(({ label, bg, logo, href }) => (
                href ? (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 group">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shadow-md transition-transform duration-150 group-hover:scale-105"
                      style={{ background: bg }}>
                      {logo}
                    </div>
                    <span className="text-[10px] sm:text-[11px] text-gray-600 font-medium">{label}</span>
                  </a>
                ) : (
                  <button key={label}
                    onClick={async () => {
                      if (navigator.share) {
                        try { await navigator.share({ title: 'LuxQr', text: SITE_DESC, url: SITE_URL }); } catch {}
                      }
                    }}
                    className="flex flex-col items-center gap-2 group">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shadow-md transition-transform duration-150 group-hover:scale-105"
                      style={{ background: bg }}>
                      {logo}
                    </div>
                    <span className="text-[10px] sm:text-[11px] text-gray-600 font-medium">{label}</span>
                  </button>
                )
              ))}
            </div>

            {/* ── URL copy row ── */}
            <div className="mx-4 mb-3 sm:mx-5 sm:mb-4 flex items-center gap-2 px-3 py-2.5 rounded-xl"
              style={{ background: '#f3f4f6', border: '1px solid #e5e7eb' }}>
              <Link2 className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <span className="text-xs text-gray-500 font-mono flex-1 truncate">{SITE_URL}</span>
              <button onClick={copyLink}
                className="flex-shrink-0 p-1 rounded-lg transition-colors hover:bg-gray-200">
                {copied
                  ? <Check className="w-4 h-4 text-emerald-500" />
                  : <Copy className="w-4 h-4 text-indigo-400" />}
              </button>
            </div>

          </div>
        </div>,
        document.body
      )}
    </>
  );
}
