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
    const qrPages = [
      { loc: '/qr/metin-belge', priority: 0.9, changefreq: 'weekly' },
      { loc: '/qr/kartvizit', priority: 0.9, changefreq: 'weekly' },
      { loc: '/qr/wifi', priority: 0.9, changefreq: 'weekly' },
      { loc: '/qr/sosyal-medya', priority: 0.9, changefreq: 'weekly' },
      { loc: '/qr/ses-dosyasi', priority: 0.9, changefreq: 'weekly' },
      { loc: '/lux-studio', priority: 0.6, changefreq: 'monthly' },
    ];
    
    return qrPages;
  },
}
