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
  X,
  Copy,
  Check,
  Link as LinkIcon,
  ExternalLink,
  Instagram,
  Facebook,
  Youtube,
  Music,
  Landmark,
  ShoppingBag,
  Tag,
  Package,
  Menu,
  ChevronLeft,
  Info
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { showNotification } from '@/components/Notification';
import PriceListPage from './PriceListPage';

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
  const router = useRouter();
  const [data, setData] = useState<QrCodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [expired, setExpired] = useState(false);
  const [error, setError] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

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
        vcardData.address = parts[2] || '';
      }
      if (line.startsWith('PHOTO;VALUE=URI:')) vcardData.photo = line.substring(16).trim();
    });
    
    return vcardData;
  };

  const parseWifi = (wifiContent: string) => {
    const data: any = {};
    // Strip leading WIFI: prefix before splitting
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
    }

    return data;
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-900 text-xl">Yükleniyor...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="bg-gray-50 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Hata</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </main>
    );
  }

  if (expired) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-50 backdrop-blur-sm border border-gray-200 rounded-3xl p-10 max-w-md w-full text-center"
        >
          <Clock className="w-20 h-20 text-red-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Süre Doldu</h2>
          <p className="text-gray-600 mb-8 text-lg">
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
    let contentIcon = <FileText className="w-6 h-6 text-blue-600" />;

    // Check if content is WiFi
    const isWifi = data.content.startsWith('WIFI:');
    // Check if content is social media
    const isSocialMedia = isUrl && (data.content.includes('instagram.com') || data.content.includes('tiktok.com') || data.content.includes('facebook.com') || data.content.includes('youtube.com'));
    
    if (isSocialMedia) {
      const socialData = parseSocialMedia(data.content);
      contentTitle = socialData.platform;
      contentIcon = <Share2 className="w-6 h-6 text-pink-500" />;
    } else if (isWifi) {
      contentTitle = 'WiFi Ağı';
      contentIcon = <Wifi className="w-6 h-6 text-cyan-600" />;
    } else if (isVCard) {
      // Extract company name from vCard
      const orgMatch = data.content.match(/ORG:([^\r\n]+)/);
      if (orgMatch) {
        companyName = orgMatch[1];
        contentTitle = companyName;
        contentIcon = <Building2 className="w-6 h-6 text-blue-600" />;
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
            TikTok: <Music className="w-8 h-8 text-blue-600" />,
            Facebook: <Facebook className="w-8 h-8 text-blue-600" />,
            YouTube: <Youtube className="w-8 h-8 text-red-600" />,
          };
          
          return (
            <div className="bg-gray-50 backdrop-blur-sm border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                {contentIcon}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{contentTitle}</h3>
                  <p className="text-sm text-gray-600">Sosyal Medya Hesabı</p>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg p-6">
                <div className="flex items-center gap-6">
                  {profilePic ? (
                    <img 
                      src={profilePic} 
                      alt={`${socialData.username} profile`}
                      className="w-20 h-20 rounded-full object-cover border-2 border-gray-100"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <User className="w-10 h-10 text-gray-900" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {platformIcons[socialData.platform as keyof typeof platformIcons] || <Share2 className="w-6 h-6 text-pink-500" />}
                      <h4 className="text-xl font-bold text-gray-900">{socialData.platform}</h4>
                    </div>
                    <p className="text-2xl font-semibold text-gray-900 mb-1">@{socialData.username}</p>
                    <a 
                      href={socialData.profileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-500 transition-colors text-sm"
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
            <div className="bg-gray-50 backdrop-blur-sm border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                {contentIcon}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{wifiData.ssid || 'WiFi Ağı'}</h3>
                  <p className="text-sm text-gray-600">WiFi Ağ Bilgisi</p>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg p-6">
                <div className="flex flex-wrap gap-6">
                  {wifiData.ssid && (
                    <div className="flex items-center gap-3">
                      <Wifi className="w-5 h-5 text-cyan-600" />
                      <div>
                        <p className="text-gray-600 text-sm">Ağ Adı (SSID)</p>
                        <p className="text-gray-900 font-medium">{wifiData.ssid}</p>
                      </div>
                    </div>
                  )}
                  {wifiData.security && (
                    <div className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-gray-600 text-sm">Güvenlik Türü</p>
                        <p className="text-gray-900 font-medium">{wifiData.security}</p>
                      </div>
                    </div>
                  )}
                  {wifiData.password && (
                    <div className="flex items-center gap-3">
                      <Key className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="text-gray-600 text-sm">Şifre</p>
                        <p className="text-gray-900 font-medium">{wifiData.password}</p>
                      </div>
                      <button
                        onClick={handleCopyWifiInfo}
                        className="ml-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        title="WiFi bilgilerini kopyala"
                      >
                        <Download className="w-4 h-4 text-gray-600 hover:text-gray-900" />
                      </button>
                    </div>
                  )}
                  {wifiData.hidden !== undefined && (
                    <div className="flex items-center gap-3">
                      <EyeOff className="w-5 h-5 text-orange-500" />
                      <div>
                        <p className="text-gray-600 text-sm">Gizli Ağ</p>
                        <p className="text-gray-900 font-medium">{wifiData.hidden ? 'Evet' : 'Hayır'}</p>
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
          const fullName = vcardData.fullName || `${vcardData.firstName || ''} ${vcardData.lastName || ''}`.trim();
          const initials = `${vcardData.firstName?.[0] || ''}${vcardData.lastName?.[0] || ''}`.toUpperCase();
          return (
            <div className="max-w-sm mx-auto">
              {/* ── Kart Gövdesi ── */}
              <div className="rounded-3xl overflow-hidden shadow-2xl shadow-gray-200/50 border border-gray-200">

                {/* HEADER — gradient banner */}
                <div className="relative bg-gradient-to-br from-blue-50 via-white to-white px-6 pt-8 pb-16">
                  {/* Dekoratif arka plan daireler */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl" />

                  {/* Logo + Şirket adı — sağ üst */}
                  <div className="flex justify-between items-start relative z-10">
                    <div>
                      <p className="text-blue-600/70 text-[10px] font-semibold uppercase tracking-widest mb-1">Dijital Kartvizit</p>
                      {vcardData.company && (
                        <p className="text-gray-900/80 text-sm font-medium">{vcardData.company}</p>
                      )}
                    </div>
                    {vcardData.photo && (
                      <img
                        src={vcardData.photo}
                        alt={vcardData.company || 'logo'}
                        className="w-12 h-12 rounded-xl object-contain bg-white p-1.5 shadow-lg"
                      />
                    )}
                  </div>
                </div>

                {/* AVATAR — banner üstüne taşan */}
                <div className="relative bg-white px-6 pt-0 pb-5">
                  <div className="flex items-end gap-4 -mt-10 mb-4">
                    {vcardData.photo ? (
                      <div className="w-20 h-20 rounded-2xl border-4 border-white shadow-xl overflow-hidden flex-shrink-0 bg-white">
                        <img src={vcardData.photo} alt={fullName} className="w-full h-full object-contain p-1" />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-2xl border-4 border-white shadow-xl flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">{initials || <User className="w-8 h-8 text-white" />}</span>
                      </div>
                    )}
                    <div className="pb-1">
                      <h2 className="text-xl font-bold text-gray-900 leading-tight">{fullName}</h2>
                      {vcardData.title && (
                        <span className="inline-block mt-1 text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
                          {vcardData.title}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Ayraç */}
                  <div className="h-px bg-gray-100 mb-4" />

                  {/* İletişim satırları */}
                  <div className="space-y-2.5">
                    {vcardData.phone && (
                      <a href={`tel:${vcardData.phone}`} className="flex items-center gap-3 group">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/30 transition-all">
                          <Phone className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 uppercase tracking-wider">Telefon</p>
                          <p className="text-gray-900 text-sm font-medium group-hover:text-blue-600 transition-colors">{vcardData.phone}</p>
                        </div>
                      </a>
                    )}
                    {vcardData.email && (
                      <a href={`mailto:${vcardData.email}`} className="flex items-center gap-3 group">
                        <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/30 transition-all">
                          <Mail className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 uppercase tracking-wider">E-posta</p>
                          <p className="text-gray-900 text-sm font-medium group-hover:text-purple-600 transition-colors">{vcardData.email}</p>
                        </div>
                      </a>
                    )}
                    {vcardData.website && (
                      <a href={vcardData.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                        <div className="w-9 h-9 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500/30 transition-all">
                          <Globe className="w-4 h-4 text-cyan-600" />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 uppercase tracking-wider">Web Sitesi</p>
                          <p className="text-gray-900 text-sm font-medium group-hover:text-cyan-600 transition-colors">{vcardData.website.replace(/^https?:\/\//, '')}</p>
                        </div>
                      </a>
                    )}
                    {vcardData.address && (
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 uppercase tracking-wider">Adres</p>
                          <p className="text-gray-900 text-sm font-medium">{vcardData.address}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Rehbere Ekle butonu */}
                  <a
                    href={`data:text/vcard;charset=utf-8,${encodeURIComponent(data.content)}`}
                    download={`${fullName.replace(/\s+/g, '_')}.vcf`}
                    className="mt-5 flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.02]"
                  >
                    <User className="w-4 h-4" />
                    Rehbere Ekle
                  </a>
                </div>
              </div>
            </div>
          );
        }
        return (
          <div className="p-8 rounded-2xl bg-gray-50 backdrop-blur-sm border border-gray-200">
            {data.fileName ? (
              <>
                <FileText className="w-20 h-20 text-blue-500 mx-auto mb-6" />
                <p className="text-gray-900 font-medium mb-2 text-xl text-center">{data.fileName}</p>
                <p className="text-gray-600 text-sm mb-6 text-center">Belge</p>
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
              <p className="text-gray-900 whitespace-pre-wrap text-lg leading-relaxed">{displayContent}</p>
            )}
          </div>
        );
      case 'image':
        return (
          <div className="rounded-2xl overflow-hidden border-2 border-gray-200 backdrop-blur-sm">
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
          <div className="rounded-2xl overflow-hidden border-2 border-gray-200 backdrop-blur-sm">
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
          <div className="p-10 rounded-2xl bg-gray-50 backdrop-blur-sm border border-gray-200 text-center">
            <FileText className="w-20 h-20 text-blue-500 mx-auto mb-6" />
            <p className="text-gray-900 font-medium mb-2 text-xl">{data.fileName}</p>
            <p className="text-gray-600 text-sm mb-6">Belge Dosyası</p>
            <div className="bg-gray-100 rounded-lg p-6 mb-6">
              <p className="text-gray-600 text-sm mb-4">
                Dosya boyutu: {data.fileName ? 'Bilinmiyor' : '-'}
              </p>
              {data.filePath && (
                <a 
                  href={data.filePath} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-2xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
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
        let userNote = '';
        try {
          // Parse EPC format for IBAN and account holder
          const lines = data.content.split('\n');
          lines.forEach((line: string) => {
            if (line.startsWith('<IBAN>+')) {
              ibanNumber = line.replace('<IBAN>+', '');
            } else if (line.startsWith('<BENM>+')) {
              accountHolder = line.replace('<BENM>+', '');
            }
          });

          // Parse original data and user note from note field
          if (data.note && data.note.includes('|||')) {
            const [originalData, note] = data.note.split('|||');
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
              <Landmark className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
              <h3 className="text-base md:text-lg font-semibold text-gray-900">IBAN</h3>
            </div>
            <div className="bg-gray-100 rounded-lg p-3 md:p-4 space-y-2">
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
              {accountHolder !== 'Bilinmiyor' && (
                <div>
                  <p className="text-gray-600 text-xs mb-1">Hesap Sahibi</p>
                  <p className="text-gray-900 text-sm md:text-base">{accountHolder}</p>
                </div>
              )}
            </div>
          </div>
        );
      case 'price-list': {
        return <PriceListPage content={data.content} />;
      }
      case 'bio-link': {
        let bio: any = null;
        try { bio = JSON.parse(data.content); } catch {}
        if (!bio) return <div className="p-8 rounded-2xl bg-gray-50 border border-gray-200 text-center"><p className="text-gray-600">Bio link yüklenemedi.</p></div>;
        return (
          <div className="max-w-md mx-auto">
            <div
              className="relative rounded-3xl overflow-hidden shadow-2xl shadow-gray-200/50 border border-gray-200"
              style={{ minHeight: '560px' }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: bio.background,
                  backgroundSize: bio.background?.startsWith('linear-gradient') ? 'cover' : 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: '#ffffff',
                }}
              />
              <div className="relative z-10 flex flex-col items-center justify-center min-h-[560px] px-6 py-10 text-center">
                {bio.logoUrl ? (
                  <img
                    src={bio.logoUrl}
                    alt={bio.title}
                    className="w-24 h-24 rounded-3xl object-cover border-4 border-gray-100 shadow-2xl mb-5"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-3xl bg-gray-100 border-4 border-gray-100 flex items-center justify-center mb-5">
                    <User className="w-12 h-12 text-gray-600" />
                  </div>
                )}
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{bio.title}</h2>
                {bio.username && <p className="text-gray-600 text-sm mb-8">@{bio.username}</p>}
                <div className="w-full max-w-xs space-y-3">
                  {(bio.links || []).map((link: any, idx: number) => (
                    <motion.a
                      key={link.id || idx}
                      href={link.url && !link.url.match(/^https?:\/\//) ? `https://${link.url}` : link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-center justify-center gap-2 w-full py-3.5 px-5 rounded-2xl bg-gray-100 hover:bg-gray-100 border border-gray-200 backdrop-blur-md text-gray-900 font-medium transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {link.title}
                    </motion.a>
                  ))}
                </div>
                {bio.username && (
                  <div className="mt-auto pt-8">
                    <p className="text-gray-500 text-xs flex items-center gap-1">
                      <LinkIcon className="w-3 h-3" />
                      luxqrpro.site/view/{bio.username}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      }
      default:
        return (
          <div className="p-8 rounded-2xl bg-gray-50 backdrop-blur-sm border border-gray-200">
            <p className="text-gray-900 whitespace-pre-wrap text-lg leading-relaxed">{displayContent}</p>
          </div>
        );
    }
  };

  if (data?.contentType === 'price-list') {
    let pl: any = null;
    try { pl = JSON.parse(data.content); } catch {}
    const currSymbols: any = { TL: '₺', USD: '$', EUR: '€', GBP: '£' };
    const sym = currSymbols[pl?.currency] || '₺';
    const totalItems = pl?.categories?.reduce((a: number, c: any) => a + c.items.length, 0) || 0;
    const allItems = (pl?.categories || []).flatMap((c: any) =>
      (c.items || []).map((item: any) => ({ ...item, categoryName: c.name }))
    );
    const discounted = allItems.filter((item: any) => (item.discountedPrice && Number(item.discountedPrice) > 0) || (item.discount && Number(item.discount) > 0));
    const nonDiscounted = allItems.filter((item: any) => !discounted.includes(item));
    const minCount = 4;
    const discountedSlice = discounted.slice(0, 6);
    const needed = Math.max(0, minCount - discountedSlice.length);
    const featured = [...discountedSlice, ...nonDiscounted.slice(0, needed)];

    const shareMenuUrl = `${window.location.origin}/menu/${data.id}`;
    const shareTitle = `${pl?.brandName || 'LuxQr'} Menü`;
    const shareText = `${pl?.brandName || 'Menü'}'nü görüntülemek için tıklayın.`;

    const copyShareUrl = async () => {
      try {
        await navigator.clipboard.writeText(shareMenuUrl);
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 2000);
      } catch {}
    };

    const shareNative = async () => {
      const sd: any = { title: shareTitle, text: shareText, url: shareMenuUrl };
      if (pl?.logoUrl) {
        try {
          const res = await fetch(pl.logoUrl);
          const blob = await res.blob();
          const ext = blob.type?.split('/')[1] || 'jpg';
          const file = new File([blob], `logo.${ext}`, { type: blob.type });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            sd.files = [file];
          }
        } catch {}
      }
      if (navigator.share) {
        try { await navigator.share(sd); } catch {}
      } else {
        copyShareUrl();
      }
    };

    return (
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="min-h-screen bg-white"
      >
        {/* Site Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg">
          <div className="flex items-center justify-between px-5 py-4 max-w-lg mx-auto">
            <Link href="/" className="flex items-center gap-2 text-white">
              <img
                src="/lux-inc-logo.png"
                alt="LuxQr"
                className="w-9 h-9 object-contain"
                style={{ imageRendering: '-webkit-optimize-contrast' }}
                decoding="async"
              />
              <span className="text-xl font-black tracking-tight">LuxQr</span>
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShareModalOpen(true)}
                className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-all"
                title="Menüyü Paylaş"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <Link
                href="/"
                className="text-sm font-semibold text-white px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/30 transition-all"
              >
                QR Oluştur
              </Link>
            </div>
          </div>
        </header>

        <div className="max-w-lg mx-auto px-4 pt-24 pb-8 space-y-5">

          {/* Brand Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-gray-50 backdrop-blur-sm border border-gray-200 rounded-3xl p-6 text-center"
          >
            <div className="flex justify-center mb-4">
              {pl?.logoUrl ? (
                <div className="relative">
                  <div className="absolute inset-0 bg-orange-50 blur-2xl rounded-full scale-150" />
                  <img src={pl.logoUrl} alt={pl.brandName} className="relative w-28 h-28 rounded-2xl object-cover border-2 border-gray-100 shadow-xl" />
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute inset-0 bg-orange-50 blur-2xl rounded-full scale-150" />
                  <img
                    src="/lux-inc-logo.png"
                    alt={pl.brandName}
                    className="relative w-24 h-24 rounded-2xl object-contain bg-white border-2 border-gray-100 shadow-xl p-2"
                  />
                </div>
              )}
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{pl?.brandName || 'Marka'}</h1>
            {pl?.brandDescription && (
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{pl.brandDescription}</p>
            )}
            {/* Stats */}
            <div className="flex items-center justify-center gap-6 py-4 border-y border-gray-200 mb-5">
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900">{pl?.categories?.length || 0}</p>
                <p className="text-gray-500 text-xs mt-0.5">Kategori</p>
              </div>
              <div className="w-px h-8 bg-gray-100" />
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900">{totalItems}</p>
                <p className="text-gray-500 text-xs mt-0.5">Ürün</p>
              </div>
              <div className="w-px h-8 bg-gray-100" />
              <div className="text-center">
                <p className="text-xl font-bold text-orange-500">{sym}</p>
                <p className="text-gray-500 text-xs mt-0.5">{pl?.currency || 'TL'}</p>
              </div>
            </div>
            <Link
              href={`/menu/${data.id}`}
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-3.5 rounded-2xl transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-500/30"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>{pl?.brandName || 'Marka'} Fiyat Listesini Görüntüle</span>
            </Link>
          </motion.div>

          {/* Featured Items - Horizontal Scroll Carousel */}
          {featured.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
            >
              <div className="flex items-center gap-2 mb-3 px-1">
                <Tag className="w-4 h-4 text-orange-500" />
                <h2 className="text-sm font-semibold text-gray-900">Öne Çıkan Ürünler</h2>
                {discounted.length > 0 && (
                  <span className="ml-auto text-[10px] text-red-500 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full">
                    {discounted.length} indirimli
                  </span>
                )}
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
                {featured.map((item: any, i: number) => {
                  const hasDiscount = item.discount && Number(item.discount) > 0;
                  const finalPrice = hasDiscount
                    ? (Number(item.price) * (1 - Number(item.discount) / 100)).toFixed(2)
                    : null;
                  return (
                    <div
                      key={i}
                      className="flex-shrink-0 w-[calc(50%-6px)] snap-start bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden"
                    >
                      {item.imageUrl ? (
                        <div className="relative">
                          <img src={item.imageUrl} alt={item.name} className="w-full h-28 object-cover" />
                          {hasDiscount && (
                            <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-lg leading-none shadow">
                              %{item.discount}
                            </div>
                          )}
                        </div>
                      ) : hasDiscount ? (
                        <div className="h-10 flex items-center px-3 bg-red-50 border-b border-red-100">
                          <span className="text-red-500 text-xs font-bold">%{item.discount} İndirim</span>
                        </div>
                      ) : null}
                      <div className="p-3">
                        <p className="text-gray-900 text-xs font-semibold leading-tight line-clamp-2 mb-1">{item.name}</p>
                        <p className="text-gray-600 text-[10px] mb-2">{item.categoryName}</p>
                        {hasDiscount ? (
                          <div>
                            <p className="text-gray-500 text-[10px] line-through tabular-nums">{sym}{item.price}</p>
                            <p className="text-orange-500 font-bold text-sm tabular-nums">{sym}{finalPrice}</p>
                          </div>
                        ) : (
                          <p className="text-orange-500 font-bold text-sm tabular-nums">{sym}{item.price}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Category List */}
          {pl?.categories?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-3xl p-5 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 shadow-md shadow-blue-500/20">
                  <Package className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-sm font-bold text-gray-900">Kategoriler</h2>
                <span className="ml-auto text-[10px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                  {pl.categories.length} kategori
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {pl.categories.map((cat: any, i: number) => (
                  <div
                    key={i}
                    className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-gray-200 shadow-sm cursor-default"
                  >
                    {cat.imageUrl ? (
                      <img
                        src={cat.imageUrl}
                        alt={cat.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white font-bold text-sm leading-tight drop-shadow-md line-clamp-1">
                        {cat.name}
                      </p>
                      <p className="text-white/85 text-xs mt-0.5">
                        {cat.items?.length || 0} ürün
                      </p>
                    </div>
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white text-[10px] font-bold">{i + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Location & Contact */}
          {(pl.address || pl.phone || pl.instagram || pl.website) && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 }}
              className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md shadow-emerald-500/20">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Konum</h2>
              </div>

              {pl.address && (
                <>
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-gray-200 shadow-inner bg-gray-100 mb-4">
                    <iframe
                      title="Konum Haritası"
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(
                        pl.address + (pl.city ? ', ' + pl.city : '')
                      )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                      className="absolute inset-0 w-full h-full border-0"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {pl.address}{pl.city ? `, ${pl.city}` : ''}
                  </p>
                  <a
                    href={
                      pl.mapsUrl ||
                      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pl.address + (pl.city ? ', ' + pl.city : ''))}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3 rounded-2xl transition-all"
                  >
                    <MapPin className="w-4 h-4" /> Haritada Aç
                  </a>
                </>
              )}
            </motion.div>
          )}

          {/* About */}
          {(pl?.brandDescription || pl?.phone || pl?.instagram || pl?.website) && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 }}
              className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl p-5 text-white shadow-sm"
            >
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-4 h-4" />
                <h2 className="text-sm font-bold uppercase tracking-wider">Hakkımızda</h2>
              </div>
              {pl?.brandDescription && (
                <p className="text-sm text-white/90 leading-relaxed mb-4">{pl.brandDescription}</p>
              )}
              <div className="space-y-2">
                {pl?.phone && (
                  <a href={`tel:${pl.phone}`} className="flex items-center gap-2 text-sm text-white/90 hover:text-white transition-colors">
                    <Phone className="w-4 h-4" /> {pl.phone}
                  </a>
                )}
                {pl?.instagram && (
                  <a
                    href={pl.instagram.startsWith('http') ? pl.instagram : `https://instagram.com/${pl.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-white/90 hover:text-white transition-colors"
                  >
                    <Instagram className="w-4 h-4" /> {pl.instagram}
                  </a>
                )}
                {pl?.website && (
                  <a
                    href={pl.website.startsWith('http') ? pl.website : `https://${pl.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-white/90 hover:text-white transition-colors"
                  >
                    <Globe className="w-4 h-4" /> {pl.website}
                  </a>
                )}
              </div>
            </motion.div>
          )}

          {/* LuxQr Promo */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26 }}
            className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-100 rounded-3xl p-5 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <QrCode className="w-3.5 h-3.5 text-gray-900" />
              </div>
              <span className="text-gray-900 font-semibold text-sm">LuxQr ile Oluşturuldu</span>
            </div>
            <p className="text-gray-500 text-xs mb-3">Siz de işletmeniz için dijital fiyat listesi, WiFi QR ve daha fazlasını ücretsiz oluşturun.</p>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-500 text-xs font-medium transition-colors"
            >
              Ücretsiz QR Oluştur →
            </Link>
          </motion.div>

        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-100 py-6">
          <div className="max-w-lg mx-auto px-4 text-center">
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <QrCode className="w-4 h-4 text-blue-500" />
              <span>LuxQr tarafından oluşturulmuştur</span>
            </p>
          </div>
        </footer>

        {/* Share Modal */}
        {shareModalOpen && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShareModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white">
                <button
                  onClick={() => setShareModalOpen(false)}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex flex-col items-center">
                  {pl?.logoUrl ? (
                    <img
                      src={pl.logoUrl}
                      alt={pl.brandName}
                      className="w-16 h-16 rounded-2xl object-cover border-4 border-white/30 shadow-lg mb-3"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center border-4 border-white/30 shadow-lg mb-3">
                      <ShoppingBag className="w-7 h-7 text-gray-900" />
                    </div>
                  )}
                  <h3 className="text-lg font-bold">{pl?.brandName || 'Menü'}</h3>
                  <p className="text-white/80 text-xs mt-1">Menüyü Paylaş</p>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-xl px-3 py-2">
                  <input
                    readOnly
                    value={shareMenuUrl}
                    className="flex-1 bg-transparent text-xs text-gray-600 focus:outline-none truncate"
                  />
                  <button
                    onClick={copyShareUrl}
                    className="p-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md hover:shadow-lg transition-all"
                  >
                    {shareCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareMenuUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-green-50 hover:bg-green-100 text-green-600 transition-all"
                  >
                    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.422 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892a11.782 11.782 0 001.58 5.975L0 24l6.305-1.654a11.88 11.88 0 005.697 1.457h.006c6.552 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span className="text-[10px] font-semibold">WhatsApp</span>
                  </a>

                  <a
                    href={`https://t.me/share/url?url=${encodeURIComponent(shareMenuUrl)}&text=${encodeURIComponent(shareText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-sky-50 hover:bg-sky-100 text-sky-600 transition-all"
                  >
                    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
                      <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.29l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.9-.74 1.12-1.5.7l-4.15-3.06-2.05 1.9c-.23.22-.43.31-.6.31-.1 0-.21-.03-.31-.1z"/>
                    </svg>
                    <span className="text-[10px] font-semibold">Telegram</span>
                  </a>

                  <button
                    onClick={shareNative}
                    className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-orange-50 hover:bg-orange-100 text-orange-600 transition-all"
                  >
                    <Share2 className="w-7 h-7" />
                    <span className="text-[10px] font-semibold">Diğer</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </motion.main>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white flex flex-col"
    >
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <QrCode className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight">LuxQr</span>
          </Link>
          <Link
            href="/"
            className="text-sm font-semibold text-white/90 hover:text-white bg-white/15 hover:bg-white/25 px-4 py-2 rounded-xl transition-all"
          >
            QR Oluştur
          </Link>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center p-4 pt-24 pb-8">
        <div className="max-w-4xl w-full">
          {renderContent()}
        </div>

      </div>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <QrCode className="w-4 h-4 text-blue-500" />
            <span>LuxQr tarafından oluşturulmuştur</span>
          </p>
        </div>
      </footer>
    </motion.main>
  );
}
