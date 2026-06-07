import React from 'react';

interface BlogContentProps {
  content: string;
}

// LuxQr Yayıncılık Standartları - Blog İçerik Şablonu
// Bu component, tüm blog yazılarında otomatik olarak uygulanacak tasarım standartlarını içerir
export default function BlogContent({ content }: BlogContentProps) {
  // Convert markdown-style content to HTML
  const formatContent = (text: string) => {
    let html = text;

    // Convert ### headings to h3
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');

    // Convert ## headings to h2
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');

    // Convert **bold** to strong
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // Convert **Word:** style to highlighted sections
    html = html.replace(/\*\*([A-ZÇĞİÖŞÜ][a-zçğıöşüA-ZÇĞİÖŞÜ]+):\*\*/g, '<strong class="text-blue-400">$1:</strong>');

    // Convert numbered lists
    html = html.replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ol>$&</ol>');

    // Convert bullet points (starting with - or *)
    html = html.replace(/^[\-\*]\s+(.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => {
      // Check if it's already wrapped in ol
      if (match.includes('<ol>')) return match;
      return `<ul>${match}</ul>`;
    });

    // Convert line breaks to paragraphs (but not inside lists or headings)
    const paragraphs = html?.split('\n\n') || [];
    html = paragraphs.map(para => {
      if (para.trim() === '') return '';
      if (para.startsWith('<h2>') || para.startsWith('<h3>') || para.startsWith('<ul>') || para.startsWith('<ol>')) {
        return para;
      }
      return `<p>${para}</p>`;
    }).join('\n');

    return html;
  };

  return (
    <div
      dangerouslySetInnerHTML={{ __html: formatContent(content) }}
      className="prose prose-invert prose-lg max-w-none prose-slate prose-headings:text-white prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6 prose-h2:bg-gradient-to-r prose-h2:from-blue-400 prose-h2:to-purple-400 prose-h2:bg-clip-text prose-h2:text-transparent prose-h3:text-2xl prose-h3:font-bold prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-blue-300 prose-p:text-gray-300 prose-p:leading-relaxed prose-p:text-lg prose-p:mb-6 prose-strong:text-white prose-strong:font-bold prose-strong:bg-gradient-to-r prose-strong:from-blue-400 prose-strong:to-purple-400 prose-strong:bg-clip-text prose-strong:text-transparent prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-ul:text-gray-300 prose-ol:text-gray-300 prose-li:mb-3 prose-li:text-lg prose-li:leading-relaxed prose-code:text-blue-300 prose-code:bg-blue-500/10 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-700 prose-blockquote:bg-slate-900 prose-blockquote:border-l-4 prose-blockquote:border-green-500 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-gray-300"
    />
  );
}
