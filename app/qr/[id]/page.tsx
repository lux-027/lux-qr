'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Check, Download, Share2, Copy, Printer, QrCode, ArrowRight, Home, Wifi, FileText, Image as ImageIcon, Video, File as FileIcon, Link as LinkIcon, Building2, Phone, Mail, Globe, MapPin, Lock, Key, EyeOff, Instagram, Facebook, Youtube, User, ChevronLeft, ChevronRight, Landmark, Mic, Info, Type, ShoppingBag, ExternalLink, Plus, MoreHorizontal, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import QRCode from 'qrcode';
import QRCodeStyling from 'qr-code-styling';

export default function QRResultPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [bankQrDataUrl, setBankQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [qrData, setQrData] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedQrType, setSelectedQrType] = useState<'normal' | 'bank'>('normal');
  const [showOtherActions, setShowOtherActions] = useState(false);
  const [qrColor, setQrColor] = useState<'black' | 'neon' | 'sunset' | 'arctic' | 'berry'>('black');

  const getLuxCenterLogo = (textColor: string) =>
    `data:image/svg+xml;base64,${typeof window !== 'undefined' ? btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="220" height="100"><rect width="220" height="100" rx="28" fill="#ffffff"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="48" font-weight="800" fill="${textColor}" letter-spacing="12">L U X</text></svg>`) : ''}`;

  const colorThemes: Record<typeof qrColor, { stops: { offset: number; color: string }[]; label: string }> = {
    black: { label: 'Siyah', stops: [{ offset: 0, color: '#000000' }, { offset: 0.5, color: '#374151' }, { offset: 1, color: '#000000' }] },
    neon: { label: 'Neon', stops: [{ offset: 0, color: '#a3e635' }, { offset: 0.5, color: '#22c55e' }, { offset: 1, color: '#10b981' }] },
    sunset: { label: 'Sunset', stops: [{ offset: 0, color: '#fbbf24' }, { offset: 0.5, color: '#f97316' }, { offset: 1, color: '#dc2626' }] },
    arctic: { label: 'Arctic', stops: [{ offset: 0, color: '#67e8f9' }, { offset: 0.5, color: '#0ea5e9' }, { offset: 1, color: '#2563eb' }] },
    berry: { label: 'Berry', stops: [{ offset: 0, color: '#c084fc' }, { offset: 0.5, color: '#ec4899' }, { offset: 1, color: '#f43f5e' }] },
  };

  const generateStyledQR = async (data: string): Promise<string> => {
    const gradientStops = colorThemes[qrColor].stops;
    const logoTextColor = gradientStops[1]?.color || '#000000';
    const luxCenterLogo = getLuxCenterLogo(logoTextColor);

    const qr = new QRCodeStyling({
      width: 256,
      height: 256,
      data,
      margin: 8,
      qrOptions: { errorCorrectionLevel: 'H' },
      dotsOptions: {
        type: 'dots',
        gradient: { type: 'linear', rotation: 45, colorStops: gradientStops },
      },
      cornersSquareOptions: {
        type: 'extra-rounded',
        gradient: { type: 'linear', rotation: 45, colorStops: gradientStops },
      },
      cornersDotOptions: {
        type: 'dot',
        gradient: { type: 'linear', rotation: 45, colorStops: gradientStops },
      },
      backgroundOptions: { color: '#ffffff' },
      image: luxCenterLogo,
      imageOptions: { crossOrigin: 'anonymous', margin: 6, hideBackgroundDots: true },
    });

    const blob = await qr.getRawData('png');
    if (blob instanceof Blob) return URL.createObjectURL(blob);
    return '';
  };

  useEffect(() => {
    const fetchQRData = async () => {
      try {
        console.log('Fetching QR data for ID:', params.id);
        const response = await fetch(`/api/qr/${params.id}`);
        console.log('Response status:', response.status);
        
        const data = await response.json();
        console.log('Response data:', data);
        
        if (data.success && data.data) {
          setQrData(data.data);
          setCurrentImageIndex(0);
          setQrCodeUrl(`${window.location.origin}/qr/${params.id}`);
          const styledQrData = await generateStyledQR(data.data.viewUrl || data.data.content);
          setQrDataUrl(styledQrData);
          
          // Generate bank QR code from EPC content
          if (data.data.contentType === 'iban') {
            const bankQrData = await QRCode.toDataURL(data.data.content);
            setBankQrDataUrl(bankQrData);
          }
        } else {
          console.error('QR code not found or invalid response:', data);
          setError(data.error || 'QR kod bulunamadı');
        }
      } catch (err) {
        console.error('QR kod yükleme hatası:', err);
        setError('QR kod yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchQRData();
  }, [params.id, qrColor]);

  const handleCopy = () => {
    // Always copy the full original URL for social media
    const urlToCopy = qrData?.content || qrData?.viewUrl || qrCodeUrl;
    navigator.clipboard.writeText(urlToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = 'qr-code.png';
    link.click();
  };

  const handleBankQrDownload = () => {
    const link = document.createElement('a');
    link.href = bankQrDataUrl;
    link.download = 'bank-qr-code.png';
    link.click();
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const description = qrData?.note || qrData?.content || 'QR Kod';
      printWindow.document.write(`
        <html>
          <head>
            <title>QR Kod Yazdır</title>
            <style>
              body { 
                margin: 0; 
                padding: 40px;
                display: flex; 
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                font-family: Arial, sans-serif;
                background: white;
              }
              .logo {
                font-size: 32px;
                font-weight: bold;
                color: #3b82f6;
                margin-bottom: 30px;
                display: flex;
                align-items: center;
                gap: 10px;
              }
              .logo svg {
                width: 40px;
                height: 40px;
              }
              .qr-container {
                margin: 20px 0;
              }
              .qr-container img {
                width: 300px;
                height: 300px;
              }
              .description {
                font-size: 16px;
                color: #666;
                text-align: center;
                max-width: 400px;
                margin-top: 20px;
                word-wrap: break-word;
              }
              .footer {
                margin-top: 40px;
                font-size: 14px;
                color: #999;
              }
            </style>
          </head>
          <body>
            <div class="logo">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="5" height="5" x="3" y="3" rx="1"></rect>
                <rect width="5" height="5" x="16" y="3" rx="1"></rect>
                <rect width="5" height="5" x="3" y="16" rx="1"></rect>
                <path d="M21 16h-3a2 2 0 0 0-2 2v3"></path>
                <path d="M21 21v.01"></path>
                <path d="M12 7v3a2 2 0 0 1-2 2H7"></path>
                <path d="M3 12h.01"></path>
                <path d="M12 3h.01"></path>
                <path d="M12 16v.01"></path>
                <path d="M16 12h1"></path>
                <path d="M21 12v.01"></path>
                <path d="M12 21v-1"></path>
              </svg>
              LuxQr
            </div>
            <div class="qr-container">
              <img src="${qrDataUrl}" alt="QR Code" />
            </div>
            <div class="description">${description}</div>
            <div class="footer">luxqrpro.site</div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleShareLink = () => {
    const shareUrl = qrData?.viewUrl || qrCodeUrl;
    if (navigator.share) {
      navigator.share({
        title: qrData?.contentType === 'price-list'
          ? `Fiyat Listesi - LuxQr`
          : qrData?.contentType === 'bio-link'
          ? `Bio Link - LuxQr`
          : 'QR Kod - LuxQr',
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareQR = async () => {
    try {
      // Convert data URL to blob
      const response = await fetch(qrDataUrl);
      const blob = await response.blob();
      // @ts-ignore - File constructor type issue
      const file = new File([blob], 'qr-code.png', { type: blob.type });
      
      const shareData = {
        title: 'LuxQr - QR Kod',
        text: 'QR kodunuz burada, hemen okut! 🎯\n\nDaha fazlası için: https://luxqrpro.site',
        files: [file],
      };
      
      // Try to share both text and file together
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else if (navigator.share && navigator.canShare({ files: [file] })) {
        // Fallback: share only file with title
        await navigator.share({
          title: 'QR kodunuz burada, hemen okut! 🎯\n\nDaha fazlası için: https://luxqrpro.site',
          files: [file],
        });
      } else if (navigator.share && navigator.canShare({ text: shareData.text, url: qrCodeUrl })) {
        // Fallback: share text with URL
        await navigator.share({
          title: 'LuxQr - QR Kod',
          text: shareData.text,
          url: qrCodeUrl,
        });
      } else {
        // Fallback: copy QR image to clipboard
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        alert('QR kod panoya kopyalandı!');
      }
    } catch (err: any) {
      console.error('Paylaşım hatası:', err);
      // Fallback: try to copy the URL
      try {
        navigator.clipboard.writeText(qrCodeUrl);
        alert('QR kod linki panoya kopyalandı!');
      } catch (clipboardErr) {
        console.error('Panoya kopyalama hatası:', clipboardErr);
        alert('Paylaşım başarısız oldu. Lütfen manuel olarak paylaşın.');
      }
    }
  };

  const parseVCard = (vcardContent: string) => {
    const lines = vcardContent.split('\n');
    const data: any = {};
    
    lines.forEach(line => {
      if (line.startsWith('FN:')) data.fullName = line.substring(3);
      if (line.startsWith('N:')) {
        const parts = line.substring(2).split(';');
        data.lastName = parts[0];
        data.firstName = parts[1];
      }
      if (line.startsWith('TEL:')) data.phone = line.substring(4);
      if (line.startsWith('EMAIL:')) data.email = line.substring(6);
      if (line.startsWith('ORG:')) data.company = line.substring(4);
      if (line.startsWith('TITLE:')) data.title = line.substring(6);
      if (line.startsWith('URL:')) data.website = line.substring(4);
      if (line.startsWith('ADR:')) {
        const parts = line.substring(4).split(';');
        const street = parts[2] || '';
        const city = parts[3] || '';
        const state = parts[4] || '';
        const postal = parts[5] || '';
        const country = parts[6] || '';
        const addressParts = [street, city, state, postal, country].filter(Boolean);
        data.address = addressParts.join(', ');
      }
      if (line.startsWith('LABEL:')) data.address = line.substring(6);
    });
    
    return data;
  };

  const parseWifi = (wifiContent: string) => {
    const data: any = {};
    const stripped = wifiContent.startsWith('WIFI:') ? wifiContent.substring(5) : wifiContent;
    const parts = stripped.split(';');
    
    parts.forEach(part => {
      if (part.startsWith('S:')) data.ssid = part.substring(2);
      if (part.startsWith('T:')) data.security = part.substring(2);
      if (part.startsWith('P:')) data.password = part.substring(2);
      if (part.startsWith('H:')) data.hidden = part.substring(2) === 'true';
    });
    
    return data;
  };

  const parseSocialMedia = (url: string) => {
    const data: any = { platform: '', username: '', profileUrl: url };
    const urlLower = url.toLowerCase();
    
    if (urlLower.includes('instagram.com')) {
      data.platform = 'Instagram';
      const match = url.match(/instagram\.com\/([^\/\?]+)/);
      if (match) {
        data.username = match[1].replace('@', '').split('?')[0];
      }
    } else if (urlLower.includes('tiktok.com')) {
      data.platform = 'TikTok';
      const match = url.match(/tiktok\.com\/@?([^\/\?]+)/);
      if (match) {
        data.username = match[1].replace('@', '').split('?')[0];
      }
    } else if (urlLower.includes('facebook.com')) {
      data.platform = 'Facebook';
      const match = url.match(/facebook\.com\/([^\/\?]+)/);
      if (match) {
        data.username = match[1].replace('@', '').split('?')[0];
      }
    } else if (urlLower.includes('youtube.com')) {
      data.platform = 'YouTube';
      const match = url.match(/youtube\.com\/@?([^\/\?]+)/);
      if (match) {
        data.username = match[1].replace('@', '').split('?')[0];
      }
    } else if (urlLower.includes('twitter.com') || urlLower.includes('x.com')) {
      data.platform = 'Twitter';
      const match = url.match(/(?:twitter\.com|x\.com)\/@?([^\/\?]+)/);
      if (match) {
        data.username = match[1].replace('@', '').split('?')[0];
      }
    } else if (urlLower.includes('linkedin.com')) {
      data.platform = 'LinkedIn';
      const match = url.match(/linkedin\.com\/in\/([^\/\?]+)/);
      if (match) {
        data.username = match[1].replace('@', '').split('?')[0];
      }
    } else if (urlLower.includes('threads.net')) {
      data.platform = 'Threads';
      const match = url.match(/threads\.net\/@?([^\/\?]+)/);
      if (match) {
        data.username = match[1].replace('@', '').split('?')[0];
      }
    }
    
    return data;
  };

  const renderContent = () => {
    if (!qrData) return null;

    // Check if content is a URL (old format)
    const isUrl = qrData.content.startsWith('http://') || qrData.content.startsWith('https://');
    const displayContent = isUrl ? 'Bu QR kod eski formatta oluşturulmuş. Lütfen yeni bir QR kod oluşturun.' : qrData.content;

    // Check if content is a vCard (business card)
    const isVCard = qrData.content.startsWith('BEGIN:VCARD');
    let companyName = '';
    let contentTitle = 'Metin İçeriği';
    let contentIcon = <FileText className="w-6 h-6 text-blue-400" />;

    // Check if content is WiFi
    const isWifi = qrData.content.startsWith('WIFI:');
    // Check if content is social media
    const isSocialMedia = isUrl && (qrData.content.includes('instagram.com') || qrData.content.includes('tiktok.com') || qrData.content.includes('facebook.com') || qrData.content.includes('youtube.com') || qrData.content.includes('twitter.com') || qrData.content.includes('x.com') || qrData.content.includes('linkedin.com') || qrData.content.includes('threads.net'));
    
    if (isSocialMedia) {
      const socialData = parseSocialMedia(qrData.content);
      contentTitle = socialData.platform;
      contentIcon = <Share2 className="w-6 h-6 text-pink-400" />;
    } else if (isWifi) {
      contentTitle = 'WiFi Ağı';
      contentIcon = <Wifi className="w-6 h-6 text-cyan-400" />;
    } else if (isVCard) {
      // Extract company name from vCard
      const orgMatch = qrData.content.match(/ORG:([^\r\n]+)/);
      if (orgMatch) {
        companyName = orgMatch[1];
        contentTitle = companyName;
        contentIcon = <Building2 className="w-6 h-6 text-blue-400" />;
      }
    }

    // Bio Link
    if (qrData.contentType === 'bio-link') {
      let bio: any = null;
      try { bio = JSON.parse(qrData.content); } catch {}
      if (bio?.title) {
        contentTitle = bio.title;
        contentIcon = <ExternalLink className="w-6 h-6 text-emerald-400" />;
      }
    }

    switch (qrData.contentType) {
      case 'text':
        if (isSocialMedia) {
          const socialData = parseSocialMedia(qrData.content);
          const getProfilePicture = (platform: string, username: string) => {
            if (platform === 'Facebook') {
              return `https://graph.facebook.com/${username}/picture?type=large`;
            }
            // For other platforms, use a generic avatar or try platform-specific URLs
            return null;
          };
          
          const profilePic = getProfilePicture(socialData.platform, socialData.username);
          const platformIcons: any = {
            Instagram: <Instagram className="w-8 h-8 text-pink-500" />,
            TikTok: <Video className="w-8 h-8 text-gray-900" />,
            Facebook: <Facebook className="w-8 h-8 text-blue-600" />,
            YouTube: <Youtube className="w-8 h-8 text-red-600" />,
            Twitter: <Share2 className="w-8 h-8 text-blue-400" />,
            LinkedIn: <Building2 className="w-8 h-8 text-blue-700" />,
            Threads: <Share2 className="w-8 h-8 text-gray-300" />,
          };
          
          return (
            <div className="bg-gray-50 backdrop-blur-sm border border-gray-200 rounded-xl p-4 md:p-6">
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                {contentIcon}
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900">{contentTitle}</h3>
                  <p className="text-xs md:text-sm text-gray-600">Sosyal Medya Hesabı</p>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg p-4 md:p-6">
                <div className="flex items-center gap-4 md:gap-6">
                  {profilePic ? (
                    <img 
                      src={profilePic} 
                      alt={`${socialData.username} profile`}
                      width={80}
                      height={80}
                      className="w-14 h-14 md:w-20 md:h-20 rounded-full object-cover border-2 border-white/20 flex-shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <User className="w-7 h-7 md:w-10 md:h-10 text-gray-900" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                      {platformIcons[socialData.platform as keyof typeof platformIcons] || <Share2 className="w-5 h-5 md:w-6 md:h-6 text-pink-400" />}
                      <h4 className="text-lg md:text-xl font-bold text-gray-900">{socialData.platform}</h4>
                    </div>
                    <p className="text-lg md:text-2xl font-semibold text-gray-900 mb-1">@{socialData.username}</p>
                    <a
                      href={socialData.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 md:gap-2 text-blue-600 hover:text-blue-700 transition-colors text-xs md:text-sm truncate"
                    >
                      <LinkIcon className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                      <span className="truncate">Profili Görüntüle</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        if (isWifi) {
          const wifiData = parseWifi(qrData.content);
          return (
            <div className="bg-gray-50 backdrop-blur-sm border border-gray-200 rounded-xl p-4 md:p-6">
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                {contentIcon}
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900">{wifiData.ssid || 'WiFi Ağı'}</h3>
                  <p className="text-xs md:text-sm text-gray-600">WiFi Ağ Bilgisi</p>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg p-4 md:p-6">
                <div className="flex flex-wrap gap-3 md:gap-6">
                  {wifiData.ssid && (
                    <div className="flex items-center gap-2 md:gap-3">
                      <Wifi className="w-4 h-4 md:w-5 md:h-5 text-cyan-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-gray-600 text-xs md:text-sm">Ağ Adı (SSID)</p>
                        <p className="text-gray-900 font-medium text-sm md:text-base truncate">{wifiData.ssid}</p>
                      </div>
                    </div>
                  )}
                  {wifiData.security && (
                    <div className="flex items-center gap-2 md:gap-3">
                      <Lock className="w-4 h-4 md:w-5 md:h-5 text-green-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-gray-600 text-xs md:text-sm">Güvenlik Türü</p>
                        <p className="text-gray-900 font-medium text-sm md:text-base truncate">{wifiData.security}</p>
                      </div>
                    </div>
                  )}
                  {wifiData.password && (
                    <div className="flex items-center gap-2 md:gap-3">
                      <Key className="w-4 h-4 md:w-5 md:h-5 text-purple-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-gray-600 text-xs md:text-sm">Şifre</p>
                        <p className="text-gray-900 font-medium text-sm md:text-base truncate">{wifiData.password}</p>
                      </div>
                    </div>
                  )}
                  {wifiData.hidden !== undefined && (
                    <div className="flex items-center gap-2 md:gap-3">
                      <EyeOff className="w-4 h-4 md:w-5 md:h-5 text-orange-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-gray-600 text-xs md:text-sm">Gizli Ağ</p>
                        <p className="text-gray-900 font-medium text-sm md:text-base">{wifiData.hidden ? 'Evet' : 'Hayır'}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        }
        if (isVCard) {
          const vcardData = parseVCard(qrData.content);
          return (
            <div className="bg-gray-50 backdrop-blur-sm border border-gray-200 rounded-xl p-4 md:p-6">
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                {contentIcon}
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900">{contentTitle}</h3>
                  <p className="text-xs md:text-sm text-gray-600">Kartvizit Bilgisi</p>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg p-4 md:p-6">
                <div className="flex flex-col md:flex-row gap-4 md:gap-12">
                  {/* Left side - Name and title */}
                  <div className="flex-1 text-center md:text-left">
                    <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-1">{vcardData.fullName || vcardData.firstName + ' ' + vcardData.lastName}</h4>
                    {vcardData.title && <p className="text-blue-400 font-medium text-sm md:text-base">{vcardData.title}</p>}
                    {vcardData.company && <p className="text-gray-600 text-xs md:text-sm mt-1">{vcardData.company}</p>}
                  </div>
                  
                  {/* Right side - Contact info */}
                  <div className="flex-1 space-y-2 md:space-y-3">
                    {vcardData.phone && (
                      <div className="flex items-center gap-2 md:gap-3 text-gray-700 text-sm">
                        <Phone className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        <span className="truncate">{vcardData.phone}</span>
                      </div>
                    )}
                    {vcardData.email && (
                      <div className="flex items-center gap-2 md:gap-3 text-gray-700 text-sm">
                        <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        <span className="truncate">{vcardData.email}</span>
                      </div>
                    )}
                    {vcardData.website && (
                      <div className="flex items-center gap-2 md:gap-3 text-gray-700 text-sm">
                        <Globe className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        <span className="truncate">{vcardData.website}</span>
                      </div>
                    )}
                    {vcardData.address && (
                      <div className="flex items-center gap-2 md:gap-3 text-gray-700 text-sm">
                        <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        <span className="truncate">{vcardData.address}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        }
        return (
          <div className="bg-gray-50 backdrop-blur-sm border border-gray-200 rounded-xl p-4 md:p-6">
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              {contentIcon}
              <div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900">{contentTitle}</h3>
                {isVCard && <p className="text-xs md:text-sm text-gray-400">Kartvizit Bilgisi</p>}
              </div>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap break-words text-sm md:text-base">{displayContent}</p>
          </div>
        );
      
      case 'image':
        // Check if filePath is a JSON string (multiple images)
        let imageUrls: string[] = [];
        try {
          if (qrData.filePath) {
            console.log('filePath:', qrData.filePath);
            const parsed = JSON.parse(qrData.filePath);
            console.log('parsed filePath:', parsed);
            if (Array.isArray(parsed)) {
              imageUrls = parsed.map((item: any) => item.url);
              console.log('imageUrls from array:', imageUrls);
            }
          }
        } catch (e) {
          console.log('JSON parse error, using single image:', e);
          // Not a JSON string, use single image
          imageUrls = [qrData.filePath || qrData.content];
        }
        
        if (imageUrls.length === 0) {
          console.log('imageUrls empty, using content:', qrData.content);
          imageUrls = [qrData.content];
        }
        
        console.log('Final imageUrls:', imageUrls);
        console.log('currentImageIndex:', currentImageIndex);
        
        const handlePreviousImage = () => {
          setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : imageUrls.length - 1));
        };
        
        const handleNextImage = () => {
          setCurrentImageIndex((prev) => (prev < imageUrls.length - 1 ? prev + 1 : 0));
        };
        
        return (
          <div className="bg-gray-50 backdrop-blur-sm border border-gray-200 rounded-xl p-4 md:p-6">
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <ImageIcon className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
              <h3 className="text-base md:text-lg font-semibold text-gray-900">Resim</h3>
            </div>
            <div className="bg-black rounded-lg p-3 md:p-4 flex items-center justify-center relative h-[150px] md:h-[200px] w-[300px] md:w-[400px]">
              {imageUrls.length > 1 && (
                <>
                  <button
                    onClick={handlePreviousImage}
                    aria-label="Önceki Resim"
                    className="absolute left-2 z-10 bg-white/20 hover:bg-white/30 text-gray-900 rounded-full p-2 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    aria-label="Sonraki Resim"
                    className="absolute right-2 z-10 bg-white/20 hover:bg-white/30 text-gray-900 rounded-full p-2 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
              <img
                src={imageUrls[currentImageIndex]}
                alt={`Image ${currentImageIndex + 1}`}
                width={400}
                height={200}
                className="max-w-full max-h-full object-contain rounded"
              />
              {imageUrls.length > 1 && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-gray-900 text-xs px-3 py-1 rounded-full">
                  {currentImageIndex + 1} / {imageUrls.length}
                </div>
              )}
            </div>
          </div>
        );
      
      case 'video':
        return (
          <div className="bg-gray-50 backdrop-blur-sm border border-gray-200 rounded-xl p-4 md:p-6">
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <Video className="w-5 h-5 md:w-6 md:h-6 text-pink-400" />
              <h3 className="text-base md:text-lg font-semibold text-gray-900">Video</h3>
            </div>
            <div className="bg-black/20 rounded-lg p-3 md:p-4">
              <video src={qrData.content} controls className="max-w-full h-auto rounded" />
            </div>
          </div>
        );
      
      case 'file':
        return (
          <div className="bg-gray-50 backdrop-blur-sm border border-gray-200 rounded-xl p-4 md:p-6">
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <FileIcon className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
              <h3 className="text-base md:text-lg font-semibold text-gray-900">Ses Dosyası</h3>
            </div>
            <div className="bg-black/20 rounded-lg p-3 md:p-4">
              <p className="text-gray-700 text-sm md:text-base truncate">Dosya Adı: {qrData.fileName || 'Bilinmiyor'}</p>
            </div>
          </div>
        );
      
      case 'iban':
        // Parse IBAN content
        let ibanNumber = '';
        let bankName = 'Bilinmiyor';
        let accountHolder = 'Bilinmiyor';
        let userNote = '';
        try {
          // Parse EPC format for IBAN and account holder
          const lines = qrData.content.split('\n');
          lines.forEach((line: string) => {
            if (line.startsWith('<IBAN>+')) {
              ibanNumber = line.replace('<IBAN>+', '');
            } else if (line.startsWith('<BENM>+')) {
              accountHolder = line.replace('<BENM>+', '');
            }
          });

          // Parse original data and user note from note field
          if (qrData.note && qrData.note.includes('|||')) {
            const [originalData, note] = qrData.note.split('|||');
            userNote = note;
            const parts = originalData.split('|');
            parts.forEach((part: string) => {
              if (part.startsWith('IBAN:')) {
                ibanNumber = part.replace('IBAN:', '');
              } else if (part.startsWith('BANKA:')) {
                bankName = part.replace('BANKA:', '');
              } else if (part.startsWith('HESAP:')) {
                accountHolder = part.replace('HESAP:', '');
              }
            });
          }
        } catch (e) {
          console.error('IBAN parse error:', e);
        }
        
        return (
          <div className="bg-gray-50 backdrop-blur-sm border border-gray-200 rounded-xl p-4 md:p-6">
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <Landmark className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
              <h3 className="text-base md:text-lg font-semibold text-gray-900">IBAN</h3>
            </div>
            <div className="bg-black/20 rounded-lg p-3 md:p-4 space-y-2">
              {bankName !== 'Bilinmiyor' && (
                <div>
                  <p className="text-gray-600 text-xs mb-1">Banka Adı</p>
                  <p className="text-gray-900 text-sm md:text-base">{bankName}</p>
                </div>
              )}
              <div>
                <p className="text-gray-600 text-xs mb-1">IBAN Numarası</p>
                <p className="text-gray-900 text-sm md:text-base font-mono tracking-wider">{ibanNumber}</p>
              </div>
              <div>
                <p className="text-gray-600 text-xs mb-1">Hesap Sahibi</p>
                <p className="text-gray-900 text-sm md:text-base">{accountHolder}</p>
              </div>
            </div>
          </div>
        );
      
      case 'price-list': {
        let pl: any = null;
        try { pl = JSON.parse(qrData.content); } catch {}
        if (!pl) return <div className="bg-gray-50 border border-gray-200 rounded-xl p-4"><p className="text-gray-400 text-sm">Fiyat listesi yüklenemedi.</p></div>;
        const totalItems = pl.categories?.reduce((acc: number, c: any) => acc + (c.items?.length || 0), 0) || 0;
        return (
          <div className="bg-gray-50 backdrop-blur-sm border border-gray-200 rounded-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500/15 to-amber-500/10 border-b border-gray-200 p-4 md:p-5">
              <div className="flex items-center gap-4">
                {pl.logoUrl ? (
                  <img
                    src={pl.logoUrl}
                    alt={pl.brandName}
                    className="w-14 h-14 rounded-xl object-cover border border-white/15 flex-shrink-0 shadow-lg"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500/30 to-amber-500/20 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <ShoppingBag className="w-7 h-7 text-orange-400" />
                  </div>
                )}
                <div className="min-w-0">
                  <h3 className="text-gray-900 font-bold text-lg leading-tight truncate">{pl.brandName}</h3>
                  {pl.brandDescription && (
                    <p className="text-gray-600 text-sm mt-0.5 leading-snug line-clamp-2">{pl.brandDescription}</p>
                  )}
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-orange-400/80 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-full">
                      {pl.categories?.length || 0} kategori
                    </span>
                    <span className="text-xs text-gray-600">{totalItems} ürün</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Category preview */}
            <div className="px-4 py-3 flex flex-wrap gap-2">
              {pl.categories?.map((c: any) => (
                <span key={c.id} className="text-xs text-gray-600 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-lg">
                  {c.name}
                </span>
              ))}
            </div>
          </div>
        );
      }
      case 'bio-link': {
        let bio: any = null;
        try { bio = JSON.parse(qrData.content); } catch {}
        if (!bio) return <div className="bg-gray-50 border border-gray-200 rounded-xl p-4"><p className="text-gray-400 text-sm">Bio link yüklenemedi.</p></div>;
        return (
          <div className="bg-gray-50 backdrop-blur-sm border border-gray-200 rounded-xl overflow-hidden w-full max-w-full">
            <div
              className="relative h-28 md:h-36 w-full"
              style={{
                background: bio.background,
                backgroundSize: bio.background?.startsWith('linear-gradient') ? 'cover' : 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: '#0f172a',
              }}
            >
            </div>
            <div className="px-3 md:px-4 pb-3 md:pb-4 -mt-8 md:-mt-10 relative z-10">
              <div className="flex items-end gap-2 md:gap-3 mb-2 md:mb-3 min-w-0">
                {bio.logoUrl ? (
                  <img
                    src={bio.logoUrl}
                    alt={bio.title}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover border-4 border-slate-900 shadow-xl flex-shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 border-4 border-slate-900 flex items-center justify-center flex-shrink-0 shadow-xl">
                    <User className="w-8 h-8 md:w-10 md:h-10 text-gray-900" />
                  </div>
                )}
                <div className="pb-1 min-w-0 flex-1 overflow-hidden">
                  <h3 className="text-gray-900 font-bold text-sm md:text-lg truncate">{bio.title}</h3>
                  {bio.username && <p className="text-emerald-400 text-xs truncate">@{bio.username}</p>}
                </div>
              </div>
              <div className="space-y-1.5 md:space-y-2">
                {(bio.links || []).map((link: any, idx: number) => (
                  <a
                    key={link.id || idx}
                    href={link.url && !link.url.match(/^https?:\/\//) ? `https://${link.url}` : link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2 md:py-2.5 px-2.5 md:px-3 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-900 text-xs md:text-sm font-medium transition-all min-w-0"
                  >
                    <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                    <span className="truncate">{link.title}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        );
      }
      default:
        return (
          <div className="bg-gray-50 backdrop-blur-sm border border-gray-200 rounded-xl p-4 md:p-6">
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <LinkIcon className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
              <h3 className="text-base md:text-lg font-semibold text-gray-900">İçerik</h3>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap break-words text-sm md:text-base">{displayContent}</p>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-gray-900 text-xl">QR kod yükleniyor...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-gray-900 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3">
            <QrCode className="w-12 h-12 text-blue-400" />
            <h1 className="text-4xl font-bold text-gray-900">LuxQr</h1>
          </div>
        </motion.div>

        {/* QR Code */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 md:gap-8 mb-8"
        >
          {/* QR Modes Card - Mobile First */}
          <div className="bg-gray-50 backdrop-blur-sm border border-gray-200 rounded-xl p-3 md:p-6 w-full md:w-80 order-1 md:order-2">
            <div className="flex items-center gap-2 mb-2 md:mb-4">
              <QrCode className="w-3 h-3 md:w-4 md:h-4 text-gray-500" />
              <p className="text-xs md:text-sm text-gray-600 font-medium">QR Modları</p>
            </div>
            {(() => {
                const basicLinks = [
                  { href: '/qr/metin', label: 'Metin', icon: Type, color: 'text-blue-400' },
                  { href: '/qr/metin-belge', label: 'Resim / Video / Belge', icon: FileText, color: 'text-violet-400' },
                  { href: '/qr/ses-dosyasi', label: 'Ses Dosyası', icon: Mic, color: 'text-orange-400' },
                  { href: '/qr/wifi', label: 'WiFi', icon: Wifi, color: 'text-emerald-400' },
                  { href: '/qr/iban', label: 'IBAN', icon: Landmark, color: 'text-yellow-400' },
                ];
                const advancedLinks = [
                  { href: '/qr/kartvizit', label: 'Kartvizit', icon: Building2, color: 'text-cyan-400' },
                  { href: '/qr/sosyal-medya', label: 'Sosyal Medya', icon: Share2, color: 'text-pink-400' },
                  { href: '/qr/fiyat-listesi', label: 'Fiyat Listesi', icon: ShoppingBag, color: 'text-rose-400' },
                  { href: '/qr/bio-link', label: 'Bio Link', icon: ExternalLink, color: 'text-emerald-400' },
                ];
                const renderLinks = (links: any[]) =>
                  links.map((item) => (
                    <Link key={item.href} href={item.href} className="flex items-center gap-2 md:gap-3 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-900 text-xs md:text-sm transition-colors">
                      <item.icon className={`w-3.5 h-3.5 md:w-4 md:h-4 ${item.color} flex-shrink-0`} />
                      <span>{item.label}</span>
                    </Link>
                  ));
                return (
                  <div className="space-y-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Temel QR</p>
                      <div className="grid grid-cols-2 md:grid-cols-1 gap-1.5">
                        {renderLinks(basicLinks)}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Gelişmiş QR</p>
                      <div className="grid grid-cols-2 md:grid-cols-1 gap-1.5">
                        {renderLinks(advancedLinks)}
                      </div>
                    </div>
                  </div>
                );
              })()}
            <div className="mt-3 md:mt-6 pt-2 md:pt-4 border-t border-gray-200 flex flex-col items-center hidden md:flex">
              <QrCode className="w-16 h-16 text-gray-900/10 mb-2" />
              <p className="text-xs text-gray-600 text-center">
                Farklı QR kod türleri oluşturun ve paylaşın
              </p>
            </div>
          </div>

          {/* QR Code Card - Mobile Second */}
          <div className="bg-gray-100 rounded-2xl p-4 md:p-8 shadow-2xl flex-1 order-2 md:order-1">
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">QR Kod</h3>
              
              {/* Toggle Buttons - Only for IBAN */}
              {qrData?.contentType === 'iban' && bankQrDataUrl && (
                <div className="flex gap-2 mb-6 w-full">
                  <button
                    onClick={() => setSelectedQrType('normal')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all ${
                      selectedQrType === 'normal' 
                        ? 'bg-blue-500 text-gray-900 shadow-lg shadow-blue-500/30' 
                        : 'bg-white text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <QrCode className="w-5 h-5" />
                    <span className="text-sm font-medium">Normal QR</span>
                    <div className="relative group">
                      <Info className="w-4 h-4 cursor-help" />
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-gray-900 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        <p className="font-semibold mb-1">Normal QR</p>
                        <p>Bu QR kodu normal tarayıcılarla okutunca view sayfasına açılır. Tüm bilgileri görüntüleyebilirsiniz.</p>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => setSelectedQrType('bank')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all ${
                      selectedQrType === 'bank' 
                        ? 'bg-green-500 text-gray-900 shadow-lg shadow-green-500/30' 
                        : 'bg-white text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Landmark className="w-5 h-5" />
                    <span className="text-sm font-medium">Banka QR</span>
                    <div className="relative group">
                      <Info className="w-4 h-4 cursor-help" />
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-gray-900 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        <p className="font-semibold mb-1">Banka QR</p>
                        <p>Bu QR kodu banka uygulamalarıyla okutunca otomatik olarak IBAN numarasını doldurur. Sadece banka uygulamaları tarafından tanınır.</p>
                      </div>
                    </div>
                  </button>
                </div>
              )}
              
              {/* Normal QR Code */}
              {selectedQrType === 'normal' && (
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-600 mb-2 text-center">Normal QR (Görüntüleme)</p>
                  <div className="bg-white p-4 rounded-2xl border-2 border-gray-200 shadow-xl">
                    <img
                      src={qrDataUrl}
                      alt="QR Code"
                      width={256}
                      height={256}
                      className="w-64 h-64 mx-auto"
                    />
                  </div>

                  {/* Color Palette */}
                  <div className="mt-4 px-1">
                    <p className="text-[10px] text-gray-600 uppercase tracking-widest text-center mb-2 font-semibold">Renk Teması</p>
                    <div className="flex justify-center gap-2">
                      {[
                        { key: 'black', label: 'Siyah', from: '#111827', to: '#374151' },
                        { key: 'neon', label: 'Neon', from: '#a3e635', to: '#10b981' },
                        { key: 'sunset', label: 'Sunset', from: '#fbbf24', to: '#dc2626' },
                        { key: 'arctic', label: 'Arctic', from: '#67e8f9', to: '#2563eb' },
                        { key: 'berry', label: 'Berry', from: '#c084fc', to: '#f43f5e' },
                      ].map((c) => (
                        <button
                          key={c.key}
                          onClick={() => setQrColor(c.key as typeof qrColor)}
                          title={c.label}
                          className={`relative w-9 h-9 rounded-xl transition-all duration-200 ${
                            qrColor === c.key
                              ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-100 scale-110 shadow-lg'
                              : 'hover:scale-105 opacity-70 hover:opacity-100'
                          }`}
                          style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})` }}
                        >
                          {qrColor === c.key && (
                            <span className="absolute inset-0 flex items-center justify-center">
                              <svg className="w-4 h-4 text-gray-900 drop-shadow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-gray-600 text-center mt-1.5">{
                      qrColor === 'black' ? 'Siyah' :
                      qrColor === 'neon' ? 'Neon' :
                      qrColor === 'sunset' ? 'Sunset' :
                      qrColor === 'arctic' ? 'Arctic' : 'Berry'
                    }</p>
                  </div>

                  <div className="mt-3 text-center">
                    <p className={`text-xl font-black tracking-[0.25em] bg-gradient-to-r bg-clip-text text-transparent ${
                      qrColor === 'black' ? 'from-gray-900 via-gray-700 to-gray-900' :
                      qrColor === 'neon' ? 'from-lime-300 via-green-500 to-emerald-600' :
                      qrColor === 'sunset' ? 'from-amber-300 via-orange-500 to-red-600' :
                      qrColor === 'arctic' ? 'from-cyan-300 via-sky-500 to-blue-600' :
                      'from-violet-400 via-pink-500 to-rose-500'
                    }`}>
                      LUX QR
                    </p>
                  </div>
                </div>
              )}

              {/* Bank QR Code - Only for IBAN */}
              {selectedQrType === 'bank' && qrData?.contentType === 'iban' && bankQrDataUrl && (
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-600 mb-2 text-center">Banka QR (Banka Uygulaması)</p>
                  <div className="bg-white p-4 rounded-xl border-2 border-green-200">
                    <img src={bankQrDataUrl} alt="Bank QR Code" width={256} height={256} className="w-64 h-64" />
                  </div>
                </div>
              )}

              {/* Primary Button Group */}
              <div className="flex flex-wrap gap-3 md:gap-4 justify-center w-full">
                <button
                  onClick={handleShareQR}
                  className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-gray-900 px-4 md:px-6 py-2 rounded-2xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-pink-500/30 text-sm md:text-base"
                >
                  <QrCode className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="font-medium">QR Paylaş</span>
                </button>

                <button
                  onClick={() => router.push('/qr/metin-belge')}
                  className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-gray-900 px-4 md:px-6 py-2 rounded-2xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 text-sm md:text-base"
                >
                  <Plus className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="font-medium">Yeni QR Kod</span>
                </button>

                <button
                  onClick={() => setShowOtherActions((p) => !p)}
                  className="flex items-center gap-2 bg-slate-700/80 hover:bg-slate-600 text-gray-900 px-4 md:px-6 py-2 rounded-2xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-slate-500/30 text-sm md:text-base"
                >
                  <MoreHorizontal className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="font-medium">Diğer İşlemler</span>
                </button>
              </div>

              {/* Other Actions Modal */}
              <AnimatePresence>
                {showOtherActions && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowOtherActions(false)}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 20 }}
                      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                      onClick={(e) => e.stopPropagation()}
                      className="w-full max-w-sm bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-2xl"
                    >
                      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
                        <h3 className="text-gray-900 font-bold text-base">Diğer İşlemler</h3>
                        <button
                          onClick={() => setShowOtherActions(false)}
                          className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-gray-900 hover:bg-gray-100 transition-all"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="p-4 grid gap-2">
                        {[
                          { onClick: selectedQrType === 'bank' ? handleBankQrDownload : handleDownload, icon: Download, label: 'İndir', bg: 'bg-blue-500 hover:bg-blue-600' },
                          { onClick: handlePrint, icon: Printer, label: 'Yazdır', bg: 'bg-purple-500 hover:bg-purple-600' },
                          { onClick: () => window.open(qrData?.viewUrl || qrCodeUrl, '_blank'), icon: ArrowRight, label: 'Linke Git', bg: 'bg-green-500 hover:bg-green-600' },
                          { onClick: handleShareLink, icon: Share2, label: 'Linki Paylaş', bg: 'bg-orange-500 hover:bg-orange-600' },
                        ].map((item) => (
                          <button
                            key={item.label}
                            onClick={() => { item.onClick(); setShowOtherActions(false); }}
                            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-900 transition-all hover:scale-[1.02] ${item.bg}`}
                          >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Content Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="card-premium p-4 md:p-8 mb-6 md:mb-8"
        >
          <div className="flex flex-col items-center">
            {/* Check Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-3 md:mb-6 shadow-lg"
            >
              <Check className="w-6 h-6 md:w-8 md:h-8 text-gray-900" />
            </motion.div>

            {/* Success Text */}
            <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-1 md:mb-2">QR Kod İçeriği</h2>
            <p className="text-gray-600 mb-4 md:mb-8 text-sm md:text-base">QR kodunuz başarıyla oluşturuldu</p>

            {/* Content */}
            {renderContent()}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
