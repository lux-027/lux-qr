'use client';

import { motion } from 'framer-motion';
import { Check, Download, Share2, Copy, Printer, QrCode, ArrowRight, Home, Wifi, FileText, Image as ImageIcon, Video, File as FileIcon, Link as LinkIcon, Building2, Phone, Mail, Globe, MapPin, Lock, Key, EyeOff, Instagram, Facebook, Youtube, User, ChevronLeft, ChevronRight, Landmark, Mic, Info } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import QRCode from 'qrcode';

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
          const qrData = await QRCode.toDataURL(data.data.viewUrl || data.data.content);
          setQrDataUrl(qrData);
          
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
  }, [params.id]);

  const handleCopy = () => {
    const urlToCopy = qrData?.viewUrl || qrCodeUrl;
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
    if (navigator.share) {
      navigator.share({
        title: 'QR Kod',
        url: qrCodeUrl,
      });
    } else {
      navigator.clipboard.writeText(qrCodeUrl);
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
    const parts = wifiContent.split(';');
    
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
            TikTok: <Video className="w-8 h-8 text-white" />,
            Facebook: <Facebook className="w-8 h-8 text-blue-600" />,
            YouTube: <Youtube className="w-8 h-8 text-red-600" />,
            Twitter: <Share2 className="w-8 h-8 text-blue-400" />,
            LinkedIn: <Building2 className="w-8 h-8 text-blue-700" />,
            Threads: <Share2 className="w-8 h-8 text-gray-300" />,
          };
          
          return (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6">
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                {contentIcon}
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-white">{contentTitle}</h3>
                  <p className="text-xs md:text-sm text-gray-400">Sosyal Medya Hesabı</p>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 md:p-6">
                <div className="flex items-center gap-4 md:gap-6">
                  {profilePic ? (
                    <img 
                      src={profilePic} 
                      alt={`${socialData.username} profile`}
                      className="w-14 h-14 md:w-20 md:h-20 rounded-full object-cover border-2 border-white/20 flex-shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <User className="w-7 h-7 md:w-10 md:h-10 text-white" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                      {platformIcons[socialData.platform as keyof typeof platformIcons] || <Share2 className="w-5 h-5 md:w-6 md:h-6 text-pink-400" />}
                      <h4 className="text-lg md:text-xl font-bold text-white">{socialData.platform}</h4>
                    </div>
                    <p className="text-lg md:text-2xl font-semibold text-white mb-1 truncate">@{socialData.username}</p>
                    <a 
                      href={socialData.profileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 md:gap-2 text-blue-400 hover:text-blue-300 transition-colors text-xs md:text-sm truncate"
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
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6">
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                {contentIcon}
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-white">{wifiData.ssid || 'WiFi Ağı'}</h3>
                  <p className="text-xs md:text-sm text-gray-400">WiFi Ağ Bilgisi</p>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 md:p-6">
                <div className="flex flex-wrap gap-3 md:gap-6">
                  {wifiData.ssid && (
                    <div className="flex items-center gap-2 md:gap-3">
                      <Wifi className="w-4 h-4 md:w-5 md:h-5 text-cyan-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-gray-400 text-xs md:text-sm">Ağ Adı (SSID)</p>
                        <p className="text-white font-medium text-sm md:text-base truncate">{wifiData.ssid}</p>
                      </div>
                    </div>
                  )}
                  {wifiData.security && (
                    <div className="flex items-center gap-2 md:gap-3">
                      <Lock className="w-4 h-4 md:w-5 md:h-5 text-green-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-gray-400 text-xs md:text-sm">Güvenlik Türü</p>
                        <p className="text-white font-medium text-sm md:text-base truncate">{wifiData.security}</p>
                      </div>
                    </div>
                  )}
                  {wifiData.password && (
                    <div className="flex items-center gap-2 md:gap-3">
                      <Key className="w-4 h-4 md:w-5 md:h-5 text-purple-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-gray-400 text-xs md:text-sm">Şifre</p>
                        <p className="text-white font-medium text-sm md:text-base truncate">{wifiData.password}</p>
                      </div>
                    </div>
                  )}
                  {wifiData.hidden !== undefined && (
                    <div className="flex items-center gap-2 md:gap-3">
                      <EyeOff className="w-4 h-4 md:w-5 md:h-5 text-orange-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-gray-400 text-xs md:text-sm">Gizli Ağ</p>
                        <p className="text-white font-medium text-sm md:text-base">{wifiData.hidden ? 'Evet' : 'Hayır'}</p>
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
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6">
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                {contentIcon}
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-white">{contentTitle}</h3>
                  <p className="text-xs md:text-sm text-gray-400">Kartvizit Bilgisi</p>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 md:p-6">
                <div className="flex flex-col md:flex-row gap-4 md:gap-12">
                  {/* Left side - Name and title */}
                  <div className="flex-1 text-center md:text-left">
                    <h4 className="text-lg md:text-xl font-bold text-white mb-1">{vcardData.fullName || vcardData.firstName + ' ' + vcardData.lastName}</h4>
                    {vcardData.title && <p className="text-blue-400 font-medium text-sm md:text-base">{vcardData.title}</p>}
                    {vcardData.company && <p className="text-gray-400 text-xs md:text-sm mt-1">{vcardData.company}</p>}
                  </div>
                  
                  {/* Right side - Contact info */}
                  <div className="flex-1 space-y-2 md:space-y-3">
                    {vcardData.phone && (
                      <div className="flex items-center gap-2 md:gap-3 text-gray-300 text-sm">
                        <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                        <span className="truncate">{vcardData.phone}</span>
                      </div>
                    )}
                    {vcardData.email && (
                      <div className="flex items-center gap-2 md:gap-3 text-gray-300 text-sm">
                        <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                        <span className="truncate">{vcardData.email}</span>
                      </div>
                    )}
                    {vcardData.website && (
                      <div className="flex items-center gap-2 md:gap-3 text-gray-300 text-sm">
                        <Globe className="w-4 h-4 text-blue-400 flex-shrink-0" />
                        <span className="truncate">{vcardData.website}</span>
                      </div>
                    )}
                    {vcardData.address && (
                      <div className="flex items-center gap-2 md:gap-3 text-gray-300 text-sm">
                        <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
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
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6">
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              {contentIcon}
              <div>
                <h3 className="text-base md:text-lg font-semibold text-white">{contentTitle}</h3>
                {isVCard && <p className="text-xs md:text-sm text-gray-400">Kartvizit Bilgisi</p>}
              </div>
            </div>
            <p className="text-gray-300 whitespace-pre-wrap break-words text-sm md:text-base">{displayContent}</p>
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
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6">
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <ImageIcon className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
              <h3 className="text-base md:text-lg font-semibold text-white">Resim</h3>
            </div>
            <div className="bg-black rounded-lg p-3 md:p-4 flex items-center justify-center relative h-[150px] md:h-[200px] w-[300px] md:w-[400px]">
              {imageUrls.length > 1 && (
                <>
                  <button
                    onClick={handlePreviousImage}
                    className="absolute left-2 z-10 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 z-10 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
              <img
                src={imageUrls[currentImageIndex]}
                alt={`Image ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded"
              />
              {imageUrls.length > 1 && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
                  {currentImageIndex + 1} / {imageUrls.length}
                </div>
              )}
            </div>
          </div>
        );
      
      case 'video':
        return (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6">
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <Video className="w-5 h-5 md:w-6 md:h-6 text-pink-400" />
              <h3 className="text-base md:text-lg font-semibold text-white">Video</h3>
            </div>
            <div className="bg-black/20 rounded-lg p-3 md:p-4">
              <video src={qrData.content} controls className="max-w-full h-auto rounded" />
            </div>
          </div>
        );
      
      case 'file':
        return (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6">
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <FileIcon className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
              <h3 className="text-base md:text-lg font-semibold text-white">Ses Dosyası</h3>
            </div>
            <div className="bg-black/20 rounded-lg p-3 md:p-4">
              <p className="text-gray-300 text-sm md:text-base truncate">Dosya Adı: {qrData.fileName || 'Bilinmiyor'}</p>
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
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6">
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <Landmark className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
              <h3 className="text-base md:text-lg font-semibold text-white">IBAN</h3>
            </div>
            <div className="bg-black/20 rounded-lg p-3 md:p-4 space-y-2">
              {bankName !== 'Bilinmiyor' && (
                <div>
                  <p className="text-gray-400 text-xs mb-1">Banka Adı</p>
                  <p className="text-white text-sm md:text-base">{bankName}</p>
                </div>
              )}
              <div>
                <p className="text-gray-400 text-xs mb-1">IBAN Numarası</p>
                <p className="text-white text-sm md:text-base font-mono tracking-wider">{ibanNumber}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1">Hesap Sahibi</p>
                <p className="text-white text-sm md:text-base">{accountHolder}</p>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6">
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <LinkIcon className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
              <h3 className="text-base md:text-lg font-semibold text-white">İçerik</h3>
            </div>
            <p className="text-gray-300 whitespace-pre-wrap break-words text-sm md:text-base">{displayContent}</p>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">QR kod yükleniyor...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
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
            <h1 className="text-4xl font-bold text-white">LuxQr</h1>
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
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 md:p-6 w-full md:w-80 order-1 md:order-2">
            <div className="flex items-center gap-2 mb-2 md:mb-4">
              <QrCode className="w-3 h-3 md:w-4 md:h-4 text-gray-400/50" />
              <p className="text-xs md:text-sm text-gray-400 font-medium">QR Modları</p>
            </div>
            <div className="grid grid-cols-2 md:flex flex-col gap-2 md:gap-3">
              <Link href="/qr/wifi" className="flex items-center justify-center gap-2 md:gap-3 px-2 md:px-4 py-2 md:py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs md:text-sm transition-colors">
                <Wifi className="w-3 h-3 md:w-5 md:h-5 text-cyan-400" />
                <span>WiFi</span>
              </Link>
              <Link href="/qr/metin-belge" className="flex items-center justify-center gap-2 md:gap-3 px-2 md:px-4 py-2 md:py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs md:text-sm transition-colors">
                <FileText className="w-3 h-3 md:w-5 md:h-5 text-blue-400" />
                <span>Metin/Resim/Video</span>
              </Link>
              <Link href="/qr/kartvizit" className="flex items-center justify-center gap-2 md:gap-3 px-2 md:px-4 py-2 md:py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs md:text-sm transition-colors">
                <Building2 className="w-3 h-3 md:w-5 md:h-5 text-purple-400" />
                <span>Kartvizit</span>
              </Link>
              <Link href="/qr/sosyal-medya" className="flex items-center justify-center gap-2 md:gap-3 px-2 md:px-4 py-2 md:py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs md:text-sm transition-colors">
                <Share2 className="w-3 h-3 md:w-5 md:h-5 text-pink-400" />
                <span>Sosyal</span>
              </Link>
              <Link href="/qr/ses-dosyasi" className="flex items-center justify-center gap-2 md:gap-3 px-2 md:px-4 py-2 md:py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs md:text-sm transition-colors col-span-2 md:col-span-1">
                <Mic className="w-3 h-3 md:w-5 md:h-5 text-orange-400" />
                <span>Ses Dosyası</span>
              </Link>
              <Link href="/qr/iban" className="flex items-center justify-center gap-2 md:gap-3 px-2 md:px-4 py-2 md:py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs md:text-sm transition-colors col-span-2 md:col-span-1">
                <Landmark className="w-3 h-3 md:w-5 md:h-5 text-green-400" />
                <span>IBAN</span>
              </Link>
            </div>
            <div className="mt-3 md:mt-6 pt-2 md:pt-4 border-t border-white/10 flex flex-col items-center hidden md:flex">
              <QrCode className="w-16 h-16 text-white/10 mb-2" />
              <p className="text-xs text-gray-400 text-center">
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
                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' 
                        : 'bg-white text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <QrCode className="w-5 h-5" />
                    <span className="text-sm font-medium">Normal QR</span>
                    <div className="relative group">
                      <Info className="w-4 h-4 cursor-help" />
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        <p className="font-semibold mb-1">Normal QR</p>
                        <p>Bu QR kodu normal tarayıcılarla okutunca view sayfasına açılır. Tüm bilgileri görüntüleyebilirsiniz.</p>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => setSelectedQrType('bank')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all ${
                      selectedQrType === 'bank' 
                        ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' 
                        : 'bg-white text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Landmark className="w-5 h-5" />
                    <span className="text-sm font-medium">Banka QR</span>
                    <div className="relative group">
                      <Info className="w-4 h-4 cursor-help" />
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
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
                  <div className="bg-white p-4 rounded-xl border-2 border-gray-200">
                    <img src={qrDataUrl} alt="QR Code" className="w-64 h-64" />
                  </div>
                </div>
              )}

              {/* Bank QR Code - Only for IBAN */}
              {selectedQrType === 'bank' && qrData?.contentType === 'iban' && bankQrDataUrl && (
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-600 mb-2 text-center">Banka QR (Banka Uygulaması)</p>
                  <div className="bg-white p-4 rounded-xl border-2 border-green-200">
                    <img src={bankQrDataUrl} alt="Bank QR Code" className="w-64 h-64" />
                  </div>
                </div>
              )}

              {/* Button Group */}
              <div className="flex flex-wrap gap-3 md:gap-4 justify-center w-full">
                <button
                  onClick={selectedQrType === 'bank' ? handleBankQrDownload : handleDownload}
                  className="flex items-center gap-2 bg-blue-500/80 hover:bg-blue-500 text-white px-4 md:px-6 py-2 rounded-2xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 text-sm md:text-base"
                >
                  <Download className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="font-medium">İndir</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 bg-purple-500/80 hover:bg-purple-500 text-white px-4 md:px-6 py-2 rounded-2xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 text-sm md:text-base"
                >
                  <Printer className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="font-medium">Yazdır</span>
                </button>

                <button
                  onClick={() => window.open(qrData?.viewUrl || qrCodeUrl, '_blank')}
                  className="flex items-center gap-2 bg-green-500/80 hover:bg-green-500 text-white px-4 md:px-6 py-2 rounded-2xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-green-500/30 text-sm md:text-base"
                >
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="font-medium">Linke Git</span>
                </button>

                <button
                  onClick={handleShareLink}
                  className="flex items-center gap-2 bg-orange-500/80 hover:bg-orange-500 text-white px-4 md:px-6 py-2 rounded-2xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30 text-sm md:text-base"
                >
                  <Share2 className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="font-medium">Linki Paylaş</span>
                </button>

                <button
                  onClick={handleShareQR}
                  className="flex items-center gap-2 bg-pink-500/80 hover:bg-pink-500 text-white px-4 md:px-6 py-2 rounded-2xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-pink-500/30 text-sm md:text-base"
                >
                  <QrCode className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="font-medium">QR Paylaş</span>
                </button>

                <button
                  onClick={() => router.push('/qr/metin-belge')}
                  className="flex items-center gap-2 bg-gray-700/80 hover:bg-gray-600 text-white px-4 md:px-6 py-2 rounded-2xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-gray-500/30 text-sm md:text-base"
                >
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="font-medium">Yeni QR Kod</span>
                </button>
              </div>
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
              <Check className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </motion.div>

            {/* Success Text */}
            <h2 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-2">QR Kod İçeriği</h2>
            <p className="text-gray-400 mb-4 md:mb-8 text-sm md:text-base">QR kodunuz başarıyla oluşturuldu</p>

            {/* Content */}
            {renderContent()}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
