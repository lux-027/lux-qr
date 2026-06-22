'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  AlertCircle, 
  Download, 
  FileText, 
  Image as ImageIcon, 
  Video, 
  Clock,
  Wifi,
  User,
  Mail,
  Phone,
  Globe,
  Building2,
  MapPin,
  QrCode,
  Lock,
  Key,
  EyeOff,
  Share2,
  Link as LinkIcon,
  Instagram,
  Facebook,
  Youtube,
  Music,
  Landmark
} from 'lucide-react';
import Link from 'next/link';
import { showNotification } from '@/components/Notification';

type QrCodeData = {
  id: string;
  content: string;
  contentType: string;
  fileName: string | null;
  filePath: string | null;
  note: string | null;
  expiresAt: string | null;
  createdAt: string;
  viewUrl: string | null;
};

export default function ViewPage({ params }: { params: { id: string } }) {
  const [data, setData] = useState<QrCodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [expired, setExpired] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchQrCode();
  }, [params.id]);

  const fetchQrCode = async () => {
    try {
      const response = await fetch(`/api/qr/${params.id}`);
      const result = await response.json();

      if (result.success) {
        setData(result.data);
        if (result.data.expiresAt && new Date() > new Date(result.data.expiresAt)) {
          setExpired(true);
          setData(null);
        }
      } else if (result.expired) {
        setExpired(true);
      } else {
        setError('QR kod bulunamadı');
      }
    } catch (err) {
      setError('Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = async () => {
    if (data?.filePath) {
      try {
        // Fetch the file as a blob to preserve original quality
        const response = await fetch(data.filePath);
        const blob = await response.blob();
        
        // Create object URL from blob
        const url = window.URL.createObjectURL(blob);
        
        // Create download link
        const link = document.createElement('a');
        link.href = url;
        link.download = data.fileName || 'download';
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        
        // Cleanup
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Download error:', error);
        showNotification('Dosya indirilemedi', 'error');
      }
    }
  };

  const parseVCard = (vcardContent: string) => {
    const lines = vcardContent.split('\n');
    const vcardData: any = {};
    
    lines.forEach(line => {
      if (line.startsWith('FN:')) vcardData.fullName = line.substring(3);
      if (line.startsWith('N:')) {
        const parts = line.substring(2).split(';');
        vcardData.lastName = parts[0];
        vcardData.firstName = parts[1];
      }
      if (line.startsWith('TEL:')) vcardData.phone = line.substring(4);
      if (line.startsWith('EMAIL:')) vcardData.email = line.substring(6);
      if (line.startsWith('ORG:')) vcardData.company = line.substring(4);
      if (line.startsWith('TITLE:')) vcardData.title = line.substring(6);
      if (line.startsWith('URL:')) vcardData.website = line.substring(4);
      if (line.startsWith('ADR:')) {
        const parts = line.substring(4).split(';');
        vcardData.address = parts[6] || parts[5] || parts[4] || '';
      }
    });
    
    return vcardData;
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

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white text-xl">Yükleniyor...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Hata</h2>
          <p className="text-gray-400">{error}</p>
        </div>
      </main>
    );
  }

  if (expired) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-10 max-w-md w-full text-center"
        >
          <Clock className="w-20 h-20 text-red-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-3">Süre Doldu</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Bu QR kodun geçerlilik süresi dolmuştur.
          </p>
        </motion.div>
      </main>
    );
  }

  const renderContent = () => {
    if (!data) return null;

    // Check if content is a URL (old format)
    const isUrl = data.content.startsWith('http://') || data.content.startsWith('https://');
    const displayContent = isUrl ? 'Bu QR kod eski formatta oluşturulmuş. Lütfen yeni bir QR kod oluşturun.' : data.content;

    // Check if content is a vCard (business card)
    const isVCard = data.content.startsWith('BEGIN:VCARD');
    let companyName = '';
    let contentTitle = 'Metin İçeriği';
    let contentIcon = <FileText className="w-6 h-6 text-blue-400" />;

    // Check if content is WiFi
    const isWifi = data.content.startsWith('WIFI:');
    // Check if content is social media
    const isSocialMedia = isUrl && (data.content.includes('instagram.com') || data.content.includes('tiktok.com') || data.content.includes('facebook.com') || data.content.includes('youtube.com'));
    
    if (isSocialMedia) {
      const socialData = parseSocialMedia(data.content);
      contentTitle = socialData.platform;
      contentIcon = <Share2 className="w-6 h-6 text-pink-400" />;
    } else if (isWifi) {
      contentTitle = 'WiFi Ağı';
      contentIcon = <Wifi className="w-6 h-6 text-cyan-400" />;
    } else if (isVCard) {
      // Extract company name from vCard
      const orgMatch = data.content.match(/ORG:([^\r\n]+)/);
      if (orgMatch) {
        companyName = orgMatch[1];
        contentTitle = companyName;
        contentIcon = <Building2 className="w-6 h-6 text-blue-400" />;
      }
    }

    switch (data.contentType) {
      case 'text':
        if (isSocialMedia) {
          const socialData = parseSocialMedia(data.content);
          const getProfilePicture = (platform: string, username: string) => {
            if (platform === 'Facebook') {
              return `https://graph.facebook.com/${username}/picture?type=large`;
            }
            return null;
          };
          
          const profilePic = getProfilePicture(socialData.platform, socialData.username);
          const platformIcons: any = {
            Instagram: <Instagram className="w-8 h-8 text-pink-500" />,
            TikTok: <Music className="w-8 h-8 text-blue-400" />,
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
          const wifiData = parseWifi(data.content);
          const handleWifiConnect = () => {
            try {
              // Try to connect using WiFi QR code format
              const wifiUrl = `WIFI:S:${wifiData.ssid};T:${wifiData.security};P:${wifiData.password};H:${wifiData.hidden};;`;
              
              // Try to open as a URL (works on some mobile devices)
              window.location.href = wifiUrl;
              
              // Fallback: Show manual connection instructions
              setTimeout(() => {
                showNotification('WiFi bağlantısı cihazınız tarafından desteklenmiyor. Lütfen manuel olarak bağlanın.', 'info');
              }, 1000);
            } catch (error) {
              showNotification('WiFi bağlantısı başlatılamadı. Lütfen manuel olarak bağlanın.', 'error');
            }
          };

          const handleCopyWifiInfo = () => {
            const wifiInfo = `Ağ Adı: ${wifiData.ssid}\nŞifre: ${wifiData.password}`;
            navigator.clipboard.writeText(wifiInfo).then(() => {
              showNotification('WiFi bilgileri kopyalandı', 'success');
            }).catch(() => {
              showNotification('Kopyalama başarısız', 'error');
            });
          };

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
                      <button
                        onClick={handleCopyWifiInfo}
                        className="ml-2 p-2 rounded-lg hover:bg-white/10 transition-colors"
                        title="WiFi bilgilerini kopyala"
                      >
                        <Download className="w-4 h-4 text-gray-400 hover:text-white" />
                      </button>
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
              
              {/* WiFi Connect Button */}
              <div className="mt-6">
                <button
                  onClick={handleWifiConnect}
                  className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-3 rounded-2xl transition-all hover:scale-105 hover:shadow-lg w-full justify-center"
                >
                  <Wifi className="w-5 h-5" />
                  <span className="font-medium">WiFi'ye Bağlan</span>
                </button>
              </div>
            </div>
          );
        }
        if (isVCard) {
          const vcardData = parseVCard(data.content);
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
                <div className="flex flex-col md:flex-row gap-12">
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
          <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            {data.fileName ? (
              <>
                <FileText className="w-20 h-20 text-blue-500 mx-auto mb-6" />
                <p className="text-white font-medium mb-2 text-xl text-center">{data.fileName}</p>
                <p className="text-gray-400 text-sm mb-6 text-center">Belge</p>
                <a 
                  href={data.content} 
                  download={data.fileName || 'belge'}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors mx-auto"
                >
                  <Download className="w-5 h-5" />
                  Dosyayı İndir
                </a>
              </>
            ) : (
              <p className="text-white whitespace-pre-wrap text-lg leading-relaxed">{displayContent}</p>
            )}
          </div>
        );
      case 'image':
        return (
          <div className="rounded-2xl overflow-hidden border-2 border-white/10 backdrop-blur-sm">
            <img
              src={data.filePath || data.content}
              alt={data.fileName || 'Image'}
              className="w-full h-auto max-h-[600px] object-contain bg-black"
              onError={(e) => {
                console.error('Image load error:', e);
                console.error('Image source:', data.filePath || data.content);
              }}
            />
          </div>
        );
      case 'video':
        return (
          <div className="rounded-2xl overflow-hidden border-2 border-white/10 backdrop-blur-sm">
            <video
              src={data.filePath || data.content}
              controls
              autoPlay
              className="w-full h-auto max-h-[600px] bg-black"
              onError={(e) => {
                console.error('Video load error:', e);
                console.error('Video source:', data.filePath || data.content);
              }}
            />
          </div>
        );
      case 'file':
        return (
          <div className="p-10 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
            <FileText className="w-20 h-20 text-blue-500 mx-auto mb-6" />
            <p className="text-white font-medium mb-2 text-xl">{data.fileName}</p>
            <p className="text-gray-400 text-sm mb-6">Belge Dosyası</p>
            <div className="bg-black/20 rounded-lg p-6 mb-6">
              <p className="text-gray-300 text-sm mb-4">
                Dosya boyutu: {data.fileName ? 'Bilinmiyor' : '-'}
              </p>
              {data.filePath && (
                <a 
                  href={data.filePath} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-500/80 hover:bg-blue-500 text-white px-6 py-2 rounded-2xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
                >
                  Dosyayı Görüntüle
                </a>
              )}
            </div>
          </div>
        );
      case 'iban':
        // Parse IBAN content
        let ibanNumber = '';
        let bankName = 'Bilinmiyor';
        let accountHolder = 'Bilinmiyor';
        try {
          // Check if note contains original format (for EPC QR codes)
          if (data.note && data.note.includes('IBAN:')) {
            const parts = data.note.split('|');
            parts.forEach((part: string) => {
              if (part.startsWith('IBAN:')) {
                ibanNumber = part.replace('IBAN:', '');
              } else if (part.startsWith('BANKA:')) {
                bankName = part.replace('BANKA:', '');
              } else if (part.startsWith('HESAP:')) {
                accountHolder = part.replace('HESAP:', '');
              }
            });
          } else {
            // Parse EPC format
            const lines = data.content.split('\n');
            lines.forEach((line: string) => {
              if (line.startsWith('<IBAN>+')) {
                ibanNumber = line.replace('<IBAN>+', '');
              } else if (line.startsWith('<BENM>+')) {
                accountHolder = line.replace('<BENM>+', '');
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
              {accountHolder !== 'Bilinmiyor' && (
                <div>
                  <p className="text-gray-400 text-xs mb-1">Hesap Sahibi</p>
                  <p className="text-white text-sm md:text-base">{accountHolder}</p>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return (
          <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <p className="text-white whitespace-pre-wrap text-lg leading-relaxed">{displayContent}</p>
          </div>
        );
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-4"
    >
      <div className="max-w-4xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
            <div className="relative flex items-center justify-center gap-3">
              <QrCode className="w-10 h-10 md:w-12 md:h-14 text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                LuxQr
              </h1>
            </div>
          </div>
        </motion.div>

        {renderContent()}

        {/* Note/Description Display */}
        {data?.note && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card-premium p-6 mt-6"
          >
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-white font-semibold mb-2">Not / Açıklama</h4>
                <p className="text-gray-300 leading-relaxed">{data.note}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Action Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="card-premium p-6 mt-8"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {data?.filePath && (
              <button
                onClick={downloadFile}
                className="flex items-center gap-2 bg-blue-500/80 hover:bg-blue-500 text-white px-6 py-2 rounded-2xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
              >
                <Download className="w-5 h-5" />
                <span className="font-medium">İndir</span>
              </button>
            )}
            <Link
              href="/"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-2xl transition-all hover:scale-105 hover:shadow-lg"
            >
              <QrCode className="w-5 h-5" />
              <span className="font-medium">Kendi QR Kodunu Oluştur</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
