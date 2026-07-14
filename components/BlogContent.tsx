import {
  QrCode, Wifi, User, Share2, Shield, Building2, GraduationCap, Landmark,
  Palette, TrendingUp, UtensilsCrossed, CreditCard, FileText, CheckCircle,
  Zap, Lock, Eye, Globe, Smartphone, BarChart3, MessageCircle, Megaphone,
} from 'lucide-react';

interface BlogContentProps {
  content: string;
  category?: string;
}

const CATEGORY_ICONS: Record<string, any> = {
  Rehber: QrCode,
  WiFi: Wifi,
  Kariyer: User,
  Pazarlama: TrendingUp,
  İşletme: Building2,
  Eğitim: GraduationCap,
  Finans: Landmark,
  'Sosyal Medya': Share2,
  Tasarım: Palette,
  Güvenlik: Shield,
};

const CATEGORY_GRADIENTS: Record<string, string> = {
  Rehber: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
  WiFi: 'linear-gradient(135deg, #10b981, #06b6d4)',
  Kariyer: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
  Pazarlama: 'linear-gradient(135deg, #ec4899, #f97316)',
  İşletme: 'linear-gradient(135deg, #f59e0b, #f97316)',
  Eğitim: 'linear-gradient(135deg, #10b981, #3b82f6)',
  Finans: 'linear-gradient(135deg, #eab308, #f59e0b)',
  'Sosyal Medya': 'linear-gradient(135deg, #ec4899, #8b5cf6)',
  Tasarım: 'linear-gradient(135deg, #f97316, #ec4899)',
  Güvenlik: 'linear-gradient(135deg, #ef4444, #f97316)',
};

function pickIcon(title: string, category: string) {
  const lower = (title + ' ' + category).toLowerCase();
  if (lower.includes('wifi') || lower.includes('ağ')) return Wifi;
  if (lower.includes('kartvizit') || lower.includes('vcard') || lower.includes('kariyer')) return User;
  if (lower.includes('sosyal') || lower.includes('instagram') || lower.includes('tiktok')) return Share2;
  if (lower.includes('güvenlik') || lower.includes('sahte') || lower.includes('korun')) return Shield;
  if (lower.includes('tasarım') || lower.includes('renk') || lower.includes('logo')) return Palette;
  if (lower.includes('iban') || lower.includes('finans') || lower.includes('ödeme')) return Landmark;
  if (lower.includes('eğitim') || lower.includes('öğretmen') || lower.includes('öğrenci')) return GraduationCap;
  if (lower.includes('işletme') || lower.includes('kullanım') || lower.includes('menü')) return Building2;
  if (lower.includes('bio') || lower.includes('link')) return Globe;
  if (lower.includes('qr') || lower.includes('kod')) return QrCode;
  return CATEGORY_ICONS[category] || FileText;
}

function formatBody(text: string) {
  let html = text.trim();

  // Convert ### headings to h3
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-base md:text-lg font-semibold text-gray-900 mt-4 mb-2 md:mt-6 md:mb-3 leading-tight">$1</h3>');

  // Convert **bold** to strong
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="text-gray-900 font-semibold">$1</strong>');

  // Convert **Word:** style to highlighted labels
  html = html.replace(/\*\*([A-ZÇĞİÖŞÜa-zçğıöşüA-ZÇĞİÖŞÜ\s]+):\*\*/g, '<strong class="text-blue-600 font-semibold">$1:</strong>');

  // Numbered lists
  html = html.replace(/^\d+\.\s+(.+)$/gm, '<li class="text-sm md:text-base text-gray-600 leading-relaxed">$1</li>');
  html = html.replace(/(<li[\s\S]*?<\/li>\n?)+/g, (match) => {
    if (match.includes('<ol>')) return match;
    return `<ol class="list-decimal pl-4 md:pl-5 space-y-1.5 md:space-y-2 my-3 md:my-4">${match}</ol>`;
  });

  // Bullet lists
  html = html.replace(/^[\-\*]\s+(.+)$/gm, '<li class="text-sm md:text-base text-gray-600 leading-relaxed">$1</li>');
  html = html.replace(/(<li[\s\S]*?<\/li>\n?)+/g, (match) => {
    if (match.includes('<ol>') || match.includes('<ul')) return match;
    return `<ul class="list-disc pl-4 md:pl-5 space-y-1.5 md:space-y-2 my-3 md:my-4">${match}</ul>`;
  });

  // Wrap remaining paragraphs
  const paragraphs = html.split('\n\n');
  html = paragraphs.map((para) => {
    const trimmed = para.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('<h3') || trimmed.startsWith('<ul') || trimmed.startsWith('<ol')) return trimmed;
    return `<p class="text-sm md:text-base text-gray-600 leading-relaxed mb-2 md:mb-3">${trimmed}</p>`;
  }).join('\n');

  return html;
}

export default function BlogContent({ content, category = 'Rehber' }: BlogContentProps) {
  const parts = content.split(/\n## /).map((p) => p.trim()).filter(Boolean);
  const intro = parts[0] && !parts[0].startsWith('##') && !parts[0].match(/^\w+.*\n\n/) ? parts[0] : '';
  const sections = intro ? parts.slice(1) : parts;

  const CategoryIcon = CATEGORY_ICONS[category] || QrCode;
  const categoryGradient = CATEGORY_GRADIENTS[category] || CATEGORY_GRADIENTS.Rehber;

  return (
    <div className="space-y-2.5 md:space-y-4">
      {/* Intro Hero Card */}
      {intro && (
        <div className="relative overflow-hidden rounded-xl md:rounded-2xl p-2.5 md:p-4 card-premium"
          style={{ borderColor: 'rgba(59,130,246,0.25)' }}>
          <div className="absolute top-0 right-0 w-28 h-28 md:w-36 md:h-36 rounded-full pointer-events-none opacity-40"
            style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
          <div className="relative z-10 flex flex-col md:flex-row items-start gap-2.5 md:gap-3">
            <div className="flex-shrink-0"
              style={{ perspective: '600px' }}>
              <div className="w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center text-white shadow-sm"
                style={{ background: categoryGradient, transform: 'rotateY(-3deg) rotateX(2deg)', boxShadow: '0 4px 14px rgba(59,130,246,0.18)' }}>
                <CategoryIcon className="w-[18px] h-[18px] md:w-6 md:h-6 drop-shadow" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[8px] md:text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-500/10 rounded-full border border-blue-500/20 mb-1 md:mb-1.5">
                {category}
              </p>
              <div className="max-w-none text-gray-600"
                dangerouslySetInnerHTML={{ __html: formatBody(intro) }} />
            </div>
          </div>
        </div>
      )}

      {/* Section Cards */}
      {sections.map((section, index) => {
        const [rawTitle, ...bodyLines] = section.split('\n\n');
        const title = rawTitle.replace(/^##\s*/, '').trim();
        const body = bodyLines.join('\n\n');
        const Icon = pickIcon(title, category);
        const isEven = index % 2 === 0;

        return (
          <div key={index} className="relative overflow-hidden rounded-xl md:rounded-2xl p-2.5 md:p-4 card-premium group"
            style={{ borderColor: 'rgba(59,130,246,0.15)', transition: 'all 0.3s ease' }}>
            <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl md:rounded-t-2xl pointer-events-none"
              style={{ background: categoryGradient }} />
            <div className="relative z-10 flex flex-col md:flex-row gap-2.5 md:gap-3 items-start">
              {/* 3D Icon Visual */}
              <div className={`flex-shrink-0 ${isEven ? 'md:order-1' : 'md:order-2'}`}
                style={{ perspective: '700px' }}>
                <div className="w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center text-white relative"
                  style={{
                    background: categoryGradient,
                    transform: 'rotateY(-3deg) rotateX(2deg)',
                    boxShadow: '0 6px 16px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.25) inset',
                    transition: 'transform 0.4s ease',
                  }}>
                  <Icon className="w-[18px] h-[18px] md:w-6 md:h-6 drop-shadow" />
                </div>
                <div className="mt-1 md:mt-1.5 text-center md:text-left">
                  <span className="inline-flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full text-[8px] md:text-[10px] font-bold text-white"
                    style={{ background: categoryGradient }}>
                    {index + 1}
                  </span>
                </div>
              </div>

              {/* Text Content */}
              <div className={`flex-1 min-w-0 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                <h2 className="text-sm md:text-base font-bold text-gray-900 mb-1 md:mb-1.5 leading-tight">
                  {title}
                </h2>
                <div className="max-w-none"
                  dangerouslySetInnerHTML={{ __html: formatBody(body) }} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
