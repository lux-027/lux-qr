/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.luxqrpro.site',
  generateRobotsTxt: true,
  outDir: 'out',
  changefreq: 'daily',
  priority: 1.0,
  sitemapSize: 7000,
  exclude: ['/api/*', '/view/*'],
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    }
  },
}
