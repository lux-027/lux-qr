/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://luxqrpro.site',
  generateRobotsTxt: true,
  outDir: 'out',
  changefreq: 'daily',
  priority: 1.0,
  sitemapSize: 7000,
  exclude: ['/api/*', '/view/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/view/'],
      },
    ],
    additionalSitemaps: ['https://luxqrpro.site/sitemap.xml'],
  },
  transform: async (config, path) => {
    // Higher priority for QR creation pages
    let priority = config.priority;
    let changefreq = config.changefreq;
    
    if (path.startsWith('/qr/')) {
      priority = 0.9;
      changefreq = 'weekly';
    }
    
    return {
      loc: path,
      changefreq: changefreq,
      priority: priority,
      lastmod: new Date().toISOString(),
    }
  },
  additionalPaths: async (config) => {
    const socialPlatforms = [
      'instagram', 'tiktok', 'facebook', 'youtube',
      'twitter', 'linkedin', 'whatsapp', 'pinterest'
    ];

    const staticPages = [
      { loc: '/about', priority: 0.7, changefreq: 'monthly' },
      { loc: '/contact', priority: 0.7, changefreq: 'monthly' },
      { loc: '/faq', priority: 0.8, changefreq: 'monthly' },
      { loc: '/lux-studio', priority: 0.6, changefreq: 'monthly' },
      { loc: '/privacy', priority: 0.5, changefreq: 'monthly' },
      { loc: '/terms', priority: 0.5, changefreq: 'monthly' },
      { loc: '/blog', priority: 0.8, changefreq: 'weekly' },
      { loc: '/qr/metin', priority: 0.85, changefreq: 'weekly' },
      { loc: '/qr/kartvizit', priority: 0.85, changefreq: 'weekly' },
      { loc: '/qr/resim-video-belge', priority: 0.85, changefreq: 'weekly' },
      { loc: '/qr/ses-dosyasi', priority: 0.85, changefreq: 'weekly' },
      { loc: '/qr/wifi', priority: 0.85, changefreq: 'weekly' },
      { loc: '/qr/sosyal-medya', priority: 0.9, changefreq: 'weekly' },
      { loc: '/qr/bio-link', priority: 0.85, changefreq: 'weekly' },
      { loc: '/qr/fiyat-listesi', priority: 0.85, changefreq: 'weekly' },
      { loc: '/qr/iban', priority: 0.85, changefreq: 'weekly' },
      ...socialPlatforms.map((p) => ({
        loc: `/qr/sosyal-medya/${p}`,
        priority: 0.85,
        changefreq: 'weekly',
      })),
    ];
    
    return staticPages;
  },
}
