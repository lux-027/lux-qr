'use client';



import Link from 'next/link';

import { usePathname } from 'next/navigation';

import { X, Globe2, QrCode, FileText, MessageSquare, Phone, Scale, Lock, Info, Type, CreditCard, Wifi, Share2, Mic, Landmark, Image as ImageIcon, ShoppingBag, ExternalLink, ChevronDown, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';
import ShareButton from './ShareButton';

import { useState, useEffect } from 'react';



interface SidebarProps {

  isOpen: boolean;

  setIsOpen: (isOpen: boolean) => void;

  isCollapsed?: boolean;

  setIsCollapsed?: (isCollapsed: boolean) => void;

}



export default function Sidebar({ isOpen, setIsOpen, isCollapsed = false, setIsCollapsed }: SidebarProps) {

  const pathname = usePathname();

  const basicHrefs = ['/qr/metin', '/qr/metin-belge', '/qr/ses-dosyasi', '/qr/wifi', '/qr/iban'];

  const advancedHrefs = ['/qr/kartvizit', '/qr/sosyal-medya', '/qr/fiyat-listesi', '/qr/bio-link'];



  const [qrOpen, setQrOpen] = useState(false);

  const [qrOpen2, setQrOpen2] = useState(false);

  const [expandReady, setExpandReady] = useState(false);



  const mainItems = [

    { href: '/', label: 'Ana Sayfa', icon: Globe2, color: 'text-amber-500' },

    { href: '/lux-studio', label: 'Lux Studio', icon: Star, color: 'text-purple-500' },

  ];



  // Auto-open the category that contains the current route

  useEffect(() => {

    if (basicHrefs.includes(pathname)) setQrOpen(true);

    else if (advancedHrefs.includes(pathname)) setQrOpen2(true);

  }, [pathname]);

  // Show expand button only after sidebar closing transition finishes

  useEffect(() => {

    if (!isCollapsed) {

      setExpandReady(false);

      return;

    }

    const timer = setTimeout(() => setExpandReady(true), 350);

    return () => clearTimeout(timer);

  }, [isCollapsed]);



  const qrItemsBasic = [

    { href: '/qr/metin', label: 'Metin', icon: Type, color: 'text-blue-600' },

    { href: '/qr/metin-belge', label: 'Resim/Video/Belge', icon: ImageIcon, color: 'text-violet-600' },

    { href: '/qr/ses-dosyasi', label: 'Ses Dosyası', icon: Mic, color: 'text-orange-500' },

    { href: '/qr/wifi', label: 'WiFi', icon: Wifi, color: 'text-emerald-600' },

    { href: '/qr/iban', label: 'IBAN', icon: Landmark, color: 'text-yellow-600' },

  ];



  const qrItemsAdvanced = [

    { href: '/qr/kartvizit', label: 'Kartvizit', icon: CreditCard, color: 'text-cyan-600' },

    { href: '/qr/sosyal-medya', label: 'Sosyal Medya', icon: Share2, color: 'text-pink-600' },

    { href: '/qr/fiyat-listesi', label: 'Fiyat Listesi', icon: ShoppingBag, color: 'text-rose-600' },

    { href: '/qr/bio-link', label: 'Bio Link', icon: ExternalLink, color: 'text-emerald-600' },

  ];



  const otherItems = [

    { href: '/blog', label: 'LuxQr Blog', icon: FileText, color: 'text-sky-600' },

    { href: '/faq', label: 'Sıkça Sorulan Sorular', icon: MessageSquare, color: 'text-indigo-600' },

    { href: '/contact', label: 'İletişim', icon: Phone, color: 'text-teal-600' },

  ];



  const legalItems = [

    { href: '/terms', label: 'Kullanım Şartları', icon: FileText, color: 'text-orange-500' },

    { href: '/privacy', label: 'Gizlilik Politikası', icon: Lock, color: 'text-purple-600' },

    { href: '/about', label: 'Hakkımızda', icon: Info, color: 'text-blue-600' },

  ];



  return (

    <>

      {/* Overlay - Only on mobile */}

      {isOpen && (

        <div

          onClick={() => setIsOpen(false)}

          className="md:hidden fixed inset-0 bg-black/30 z-40 transition-opacity duration-300"

        />

      )}



      {/* Sidebar - Fixed on desktop, overlay on mobile */}

      <div

        className={`fixed top-0 left-0 h-full w-64 bg-white/95 backdrop-blur-md z-50 border-r border-black/08 shadow-xl transition-transform duration-300 ease-in-out flex flex-col ${

          isOpen ? 'translate-x-0' : '-translate-x-full'

        } ${isCollapsed ? 'md:-translate-x-full' : 'md:translate-x-0'}`}

      >

        {/* Desktop collapse toggle */}
        <button
          type="button"
          onClick={() => setIsCollapsed?.(!isCollapsed)}
          className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 border-2 border-white text-white shadow-2xl items-center justify-center hover:scale-110 hover:shadow-blue-500/30 transition-all"
          aria-label="Sol barı daralt"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Logo */}

        <div className="px-6 pt-8 pb-6 border-b border-black/08">

          <div className="flex items-center gap-6">

            <Link href="/" className="flex items-center gap-3">

              <Image src="/luxqrlogo1.png" alt="LuxQr" width={40} height={40} className="rounded-lg shadow-lg" />

              <span className="text-2xl font-bold text-gradient">LuxQr</span>

            </Link>

            <ShareButton />

          </div>

        </div>



        {/* Menu Items */}

        <div className="flex-1 overflow-y-auto py-6 px-4 bg-transparent">

          <nav className="space-y-2">

            {/* Main Items */}

            {mainItems.map((item) => {

              const isActive = pathname === item.href;

              const isLux = item.href === '/lux-studio';

              return (

                <Link

                  key={item.href}

                  href={item.href}

                  onClick={() => setIsOpen(false)}

                  className={`relative flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 ${

                    isActive

                      ? (isLux
                        ? 'bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 text-purple-700 font-bold'
                        : 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-700 font-bold')

                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'

                  }`}

                  style={isActive ? {

                    boxShadow: isLux
                      ? '0 2px 12px rgba(139,92,246,0.18), inset 0 1px 0 rgba(255,255,255,0.8)'
                      : '0 2px 12px rgba(59,130,246,0.18), inset 0 1px 0 rgba(255,255,255,0.8)',

                  } : {}}

                >

                  {isActive && (

                    <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-gradient-to-b ${isLux ? 'from-purple-500 to-indigo-500' : 'from-blue-500 to-indigo-500'}`} />

                  )}

                  <item.icon className={`w-4 h-4 ${isActive ? (isLux ? 'text-purple-600 drop-shadow-sm' : 'text-blue-600 drop-shadow-sm') : item.color}`} />

                  <span className="font-semibold text-sm">{item.label}</span>

                </Link>

              );

            })}



            {/* Divider */}

            <div className="my-4 flex items-center gap-2">

              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">QR Türleri</span>

              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

            </div>



            {/* QR Categories Wrapper */}

            <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-2 mb-1 space-y-1">



            {/* QR Category 1: Temel */}

            <button

              onClick={() => { setQrOpen(o => !o); setQrOpen2(false); }}

              className="cursor-pointer w-full flex items-center justify-between gap-2 px-2 py-1.5 mb-1 rounded-lg hover:bg-white transition-all"

            >

              <div className="flex items-center gap-2">

                <QrCode className="w-4 h-4 text-blue-600" />

                <span className="text-xs text-gray-700 font-bold uppercase tracking-wider">Temel QR Türleri</span>

              </div>

              <ChevronDown className={`w-3.5 h-3.5 text-gray-600 transition-transform duration-200 ${qrOpen ? 'rotate-180' : ''}`} />

            </button>



            <div className={`space-y-1 pl-1 overflow-hidden transition-all duration-200 ${qrOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>

              {qrItemsBasic.map((item) => {

                const isActive = pathname === item.href;

                return (

                  <Link

                    key={item.href}

                    href={item.href}

                    onClick={() => setIsOpen(false)}

                    className={`flex items-center gap-2 px-3 py-2 transition-all duration-300 ${

                      isActive

                        ? 'bg-blue-50 border border-blue-200 text-blue-700'

                        : 'text-gray-800 hover:bg-gray-100 hover:text-gray-950'

                    }`}

                    style={isActive ? { boxShadow: '0 2px 8px rgba(59,130,246,0.15)' } : {}}

                  >

                    <item.icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : item.color}`} />

                    <span className="font-semibold text-sm">{item.label}</span>

                  </Link>

                );

              })}

            </div>



            {/* QR Category 2: Gelişmiş */}

            <button

              onClick={() => { setQrOpen2(o => !o); setQrOpen(false); }}

              className="cursor-pointer w-full flex items-center justify-between gap-2 px-2 py-1.5 mb-1 mt-1 rounded-lg hover:bg-white transition-all"

            >

              <div className="flex items-center gap-2">

                <QrCode className="w-4 h-4 text-purple-600" />

                <span className="text-xs text-gray-700 font-bold uppercase tracking-wider">Gelişmiş QR Türleri</span>

              </div>

              <ChevronDown className={`w-3.5 h-3.5 text-gray-600 transition-transform duration-200 ${qrOpen2 ? 'rotate-180' : ''}`} />

            </button>



            <div className={`space-y-1 pl-1 overflow-hidden transition-all duration-200 ${qrOpen2 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>

              {qrItemsAdvanced.map((item) => {

                const isActive = pathname === item.href;

                return (

                  <Link

                    key={item.href}

                    href={item.href}

                    onClick={() => setIsOpen(false)}

                    className={`flex items-center gap-2 px-3 py-2 transition-all duration-300 ${

                      isActive

                        ? 'bg-purple-50 border border-purple-200 text-purple-700'

                        : 'text-gray-800 hover:bg-gray-100 hover:text-gray-950'

                    }`}

                    style={isActive ? { boxShadow: '0 2px 8px rgba(139,92,246,0.15)' } : {}}

                  >

                    <item.icon className={`w-4 h-4 ${isActive ? 'text-purple-600' : item.color}`} />

                    <span className="font-semibold text-sm">{item.label}</span>

                  </Link>

                );

              })}

            </div>



            </div>{/* end QR wrapper */}



            {/* Divider */}

            <div className="my-4 flex items-center gap-2">

              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Sayfalar</span>

              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

            </div>



            {/* Other Items */}

            {otherItems.map((item) => {

              const isActive = pathname === item.href;

              return (

                <Link

                  key={item.href}

                  href={item.href}

                  onClick={() => setIsOpen(false)}

                  className={`relative flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 ${

                    isActive

                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-700 font-bold'

                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'

                  }`}

                  style={isActive ? {

                    boxShadow: '0 2px 12px rgba(59,130,246,0.18), inset 0 1px 0 rgba(255,255,255,0.8)',

                  } : {}}

                >

                  {isActive && (

                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-gradient-to-b from-blue-500 to-indigo-500" />

                  )}

                  <item.icon className={`w-4 h-4 ${isActive ? 'text-blue-600 drop-shadow-sm' : item.color}`} />

                  <span className="font-semibold text-sm">{item.label}</span>

                </Link>

              );

            })}

          </nav>

        </div>



        {/* Legal Section - Fixed at bottom */}

        <div className="border-t border-gray-200">

          <div className="px-4 pt-4 pb-2">

            <div className="flex items-center gap-1.5 mb-3 px-2">

              <Scale className="w-4 h-4 text-gray-600" />

              <p className="text-xs text-gray-600 font-bold uppercase tracking-wider">Yasal Sayfalar</p>

            </div>

            <nav className="space-y-1">

              {legalItems.map((item) => {

                const isActive = pathname === item.href;

                return (

                  <Link

                    key={item.href}

                    href={item.href}

                    onClick={() => setIsOpen(false)}

                    className={`flex items-center gap-3 px-2 py-2 transition-all duration-300 text-sm ${

                      isActive

                        ? 'bg-blue-50 border border-blue-200 text-blue-700'

                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-950'

                    }`}

                  >

                    <item.icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : item.color}`} />

                    <span>{item.label}</span>

                  </Link>

                );

              })}

            </nav>

          </div>



          {/* Footer */}

          <div className="p-4 border-t border-gray-200">

            <p className="text-xs text-gray-500 text-center">

              © 2026 LuxQr. Tüm hakları saklıdır.

            </p>

          </div>

        </div>

      </div>

      {/* Desktop expand tab when collapsed */}
      <button
        type="button"
        onClick={() => setIsCollapsed?.(false)}
        className={`hidden md:fixed md:left-0 md:top-1/2 md:-translate-y-1/2 md:z-50 md:w-10 md:h-10 md:rounded-full md:bg-gradient-to-br md:from-blue-500 md:to-indigo-600 md:text-white md:border-2 md:border-white md:shadow-2xl md:items-center md:justify-center md:hover:scale-110 md:transition-transform md:translate-x-1/2 ${expandReady ? 'md:flex' : 'md:hidden'}`}
        aria-label="Sol barı aç"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

    </>

  );

}

