import { SitemapService } from '../src/services/sitemapService';

export default function handler(req: any, res: any) {
  res.setHeader('Content-Type', 'application/xml');
  const baseUrl = process.env.APP_URL || 'https://mudanzasmendoza.com.ar';

  let xml = `<?xml version="1.0" encoding="UTF-8" ?>\n`;
  xml += `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n`;
  xml += `  <channel>\n`;
  xml += `    <title>Mudanzas Mendoza 2026 - Blog de Consejos</title>\n`;
  xml += `    <link>${baseUrl}</link>\n`;
  xml += `    <description>Los mejores tips para mudarse fácil en la provincia de Mendoza</description>\n`;
  xml += `    <language>es-AR</language>\n`;
  xml += `    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />\n`;

  const BLOG_ARTICLES = require('../src/data').BLOG_ARTICLES;
  BLOG_ARTICLES.forEach((art: any) => {
    xml += `    <item>\n`;
    xml += `      <title>${art.title}</title>\n`;
    xml += `      <link>${baseUrl}/blog/${art.slug}</link>\n`;
    xml += `      <description>${art.summary}</description>\n`;
    xml += `      <guid>${baseUrl}/blog/${art.slug}</guid>\n`;
    xml += `      <pubDate>${new Date(art.date).toUTCString()}</pubDate>\n`;
    xml += `      <category>${art.category}</category>\n`;
    xml += `    </item>\n`;
  });

  xml += `  </channel>\n`;
  xml += `</rss>`;

  res.status(200).send(xml);
}
