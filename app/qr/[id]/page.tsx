'use client';

import { motion } from 'framer-motion';
import { Check, Download, Share2, Copy, Printer, QrCode, ArrowRight, Home, Wifi, FileText, Image as ImageIcon, Video, File, Link as LinkIcon, Building2, Phone, Mail, Globe, MapPin, Lock, Key, EyeOff, Instagram, Facebook, Youtube, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import QRCode from 'qrcode';

export default function QRResultPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [qrData, setQrData] = useState<any>(null);

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
          setQrCodeUrl(`${window.location.origin}/qr/${params.id}`);
          const qrData = await QRCode.toDataURL(data.data.viewUrl || data.data.content);
          setQrDataUrl(qrData);
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

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>QR Kod Yazdır</title>
            <style>
              body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; }
              img { max-width: 100%; }
            </style>
          </head>
          <body>
            <img src="${qrDataUrl}" alt="QR Code" />
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
      if (navigator.share) {
        await navigator.share({
          title: 'QR Kod',
          url: qrCodeUrl,
        });
      }
    } catch (err) {
      console.error('Paylaşım hatası:', err);
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
      const match = url.match(/instagram\.com\/([^\/]+)/);
      if (match) data.username = match[1].replace('@', '');
    } else if (urlLower.includes('tiktok.com')) {
      data.platform = 'TikTok';
      const match = url.match(/tiktok\.com\/@?([^\/]+)/);
      if (match) data.username = match[1];
    } else if (urlLower.includes('facebook.com')) {
      data.platform = 'Facebook';
      const match = url.match(/facebook\.com\/([^\/]+)/);
      if (match) data.username = match[1];
    } else if (urlLower.includes('youtube.com')) {
      data.platform = 'YouTube';
      const match = url.match(/youtube\.com\/@?([^\/]+)/);
      if (match) data.username = match[1];
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
    const isSocialMedia = isUrl && (qrData.content.includes('instagram.com') || qrData.content.includes('tiktok.com') || qrData.content.includes('facebook.com') || qrData.content.includes('youtube.com'));
    
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
          };
          
          return (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                {contentIcon}
                <div>
                  <h3 className="text-lg font-semibold text-white">{contentTitle}</h3>
                  <p className="text-sm text-gray-400">Sosyal Medya Hesabı</p>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <div className="flex items-center gap-6">
                  {profilePic ? (
                    <img 
                      src={profilePic} 
                      alt={`${socialData.username} profile`}
                      className="w-20 h-20 rounded-full object-cover border-2 border-white/20"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <User className="w-10 h-10 text-white" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {platformIcons[socialData.platform as keyof typeof platformIcons] || <Share2 className="w-6 h-6 text-pink-400" />}
                      <h4 className="text-xl font-bold text-white">{socialData.platform}</h4>
                    </div>
                    <p className="text-2xl font-semibold text-white mb-1">@{socialData.username}</p>
                    <a 
                      href={socialData.profileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm"
                    >
                      <LinkIcon className="w-4 h-4" />
                      Profili Görüntüle
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
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                {contentIcon}
                <div>
                  <h3 className="text-lg font-semibold text-white">{wifiData.ssid || 'WiFi Ağı'}</h3>
                  <p className="text-sm text-gray-400">WiFi Ağ Bilgisi</p>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <div className="flex flex-wrap gap-6">
                  {wifiData.ssid && (
                    <div className="flex items-center gap-3">
                      <Wifi className="w-5 h-5 text-cyan-400" />
                      <div>
                        <p className="text-gray-400 text-sm">Ağ Adı (SSID)</p>
                        <p className="text-white font-medium">{wifiData.ssid}</p>
                      </div>
                    </div>
                  )}
                  {wifiData.security && (
                    <div className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-green-400" />
                      <div>
                        <p className="text-gray-400 text-sm">Güvenlik Türü</p>
                        <p className="text-white font-medium">{wifiData.security}</p>
                      </div>
                    </div>
                  )}
                  {wifiData.password && (
                    <div className="flex items-center gap-3">
                      <Key className="w-5 h-5 text-purple-400" />
                      <div>
                        <p className="text-gray-400 text-sm">Şifre</p>
                        <p className="text-white font-medium">{wifiData.password}</p>
                      </div>
                    </div>
                  )}
                  {wifiData.hidden !== undefined && (
                    <div className="flex items-center gap-3">
                      <EyeOff className="w-5 h-5 text-orange-400" />
                      <div>
                        <p className="text-gray-400 text-sm">Gizli Ağ</p>
                        <p className="text-white font-medium">{wifiData.hidden ? 'Evet' : 'Hayır'}</p>
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
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                {contentIcon}
                <div>
                  <h3 className="text-lg font-semibold text-white">{contentTitle}</h3>
                  <p className="text-sm text-gray-400">Kartvizit Bilgisi</p>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <div className="flex flex-row gap-6 md:gap-12">
                  {/* Left side - Name and title */}
                  <div className="flex-1 text-center md:text-left">
                    <h4 className="text-xl font-bold text-white mb-1">{vcardData.fullName || vcardData.firstName + ' ' + vcardData.lastName}</h4>
                    {vcardData.title && <p className="text-blue-400 font-medium">{vcardData.title}</p>}
                    {vcardData.company && <p className="text-gray-400 text-sm mt-1">{vcardData.company}</p>}
                  </div>
                  
                  {/* Right side - Contact info */}
                  <div className="flex-1 space-y-3">
                    {vcardData.phone && (
                      <div className="flex items-center gap-3 text-gray-300">
                        <Phone className="w-4 h-4 text-blue-400" />
                        <span>{vcardData.phone}</span>
                      </div>
                    )}
                    {vcardData.email && (
                      <div className="flex items-center gap-3 text-gray-300">
                        <Mail className="w-4 h-4 text-blue-400" />
                        <span>{vcardData.email}</span>
                      </div>
                    )}
                    {vcardData.website && (
                      <div className="flex items-center gap-3 text-gray-300">
                        <Globe className="w-4 h-4 text-blue-400" />
                        <span>{vcardData.website}</span>
                      </div>
                    )}
                    {vcardData.address && (
                      <div className="flex items-center gap-3 text-gray-300">
                        <MapPin className="w-4 h-4 text-blue-400" />
                        <span>{vcardData.address}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        }
        return (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              {contentIcon}
              <div>
                <h3 className="text-lg font-semibold text-white">{contentTitle}</h3>
                {isVCard && <p className="text-sm text-gray-400">Kartvizit Bilgisi</p>}
              </div>
            </div>
            <p className="text-gray-300 whitespace-pre-wrap break-words">{displayContent}</p>
          </div>
        );
      
      case 'image':
        return (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <ImageIcon className="w-6 h-6 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Resim</h3>
            </div>
            <div className="bg-black rounded-lg p-4 flex items-center justify-center">
              <img src={qrData.filePath || qrData.content} alt="QR content" className="w-64 h-64 object-contain rounded" />
            </div>
          </div>
        );
      
      case 'video':
        return (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Video className="w-6 h-6 text-pink-400" />
              <h3 className="text-lg font-semibold text-white">Video</h3>
            </div>
            <div className="bg-black/20 rounded-lg p-4">
              <video src={qrData.content} controls className="max-w-full h-auto rounded" />
            </div>
          </div>
        );
      
      case 'file':
        return (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <File className="w-6 h-6 text-green-400" />
              <h3 className="text-lg font-semibold text-white">Ses Dosyası</h3>
            </div>
            <div className="bg-black/20 rounded-lg p-4">
              <p className="text-gray-300">Dosya Adı: {qrData.fileName || 'Bilinmiyor'}</p>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <LinkIcon className="w-6 h-6 text-cyan-400" />
              <h3 className="text-lg font-semibold text-white">İçerik</h3>
            </div>
            <p className="text-gray-300 whitespace-pre-wrap break-words">{displayContent}</p>
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
                <Video className="w-3 h-3 md:w-5 md:h-5 text-orange-400" />
                <span>Ses Dosyası</span>
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
              <div className="bg-white p-4 rounded-xl border-2 border-gray-200 mb-6">
                <img src={qrDataUrl} alt="QR Code" className="w-64 h-64" />
              </div>

              {/* Button Group */}
              <div className="flex flex-wrap gap-3 md:gap-4 justify-center w-full">
                <button
                  onClick={handleDownload}
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
