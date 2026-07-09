import { DEPARTMENTS, SERVICES, BLOG_ARTICLES } from '../data';

/**
 * Escapes characters that have special meaning in XML.
 */
function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

/**
 * Service to handle SEO-related XML and text generation dynamically.
 */
export const SitemapService = {
  /**
   * Generates a fully compliant, dynamic sitemap.xml string based on existing
   * departments, services, and blog articles.
   * 
   * @param baseUrl The canonical base URL of the website.
   */
  generateSitemapXml(baseUrl: string = 'https://mudanzasmendoza2026.com.ar'): string {
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const todayStr = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
    xml += `        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n`;
    xml += `        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n`;

    // 1. Home / Landing Page
    xml += `  <url>\n`;
    xml += `    <loc>${cleanBaseUrl}/</loc>\n`;
    xml += `    <lastmod>${todayStr}</lastmod>\n`;
    xml += `    <changefreq>daily</changefreq>\n`;
    xml += `    <priority>1.0</priority>\n`;
    xml += `  </url>\n`;

    // 2. Local coverage / Department landings (e.g. /departamentos/mendoza-capital)
    DEPARTMENTS.forEach(dept => {
      const slug = escapeXml(dept.slug);
      xml += `  <url>\n`;
      xml += `    <loc>${cleanBaseUrl}/departamentos/${slug}</loc>\n`;
      xml += `    <lastmod>${todayStr}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.85</priority>\n`;
      xml += `  </url>\n`;
    });

    // 3. Service pages (e.g. /servicios/fletes-economicos)
    SERVICES.forEach(svc => {
      const slug = escapeXml(svc.slug);
      xml += `  <url>\n`;
      xml += `    <loc>${cleanBaseUrl}/servicios/${slug}</loc>\n`;
      xml += `    <lastmod>${todayStr}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.85</priority>\n`;
      xml += `  </url>\n`;
    });

    // 4. Blog Posts (e.g. /blog/como-organizar-una-mudanza)
    BLOG_ARTICLES.forEach(art => {
      const slug = escapeXml(art.slug);
      // Fallback or parse article date to valid YYYY-MM-DD
      let artDate = todayStr;
      if (art.date) {
        if (art.date.includes('/')) {
          const parts = art.date.split('/');
          if (parts.length === 3) {
            // e.g. DD/MM/YYYY -> YYYY-MM-DD
            artDate = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
          }
        } else if (/^\d{4}-\d{2}-\d{2}$/.test(art.date)) {
          artDate = art.date;
        }
      }

      xml += `  <url>\n`;
      xml += `    <loc>${cleanBaseUrl}/blog/${slug}</loc>\n`;
      xml += `    <lastmod>${artDate}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.65</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>`;
    return xml;
  },

  /**
   * Generates a fully compliant robots.txt file, pointing search engines
   * to our dynamic sitemap URL.
   * 
   * @param baseUrl The canonical base URL of the website.
   */
  generateRobotsTxt(baseUrl: string = 'https://mudanzasmendoza2026.com.ar'): string {
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    let text = `User-agent: *\n`;
    text += `Allow: /\n`;
    text += `Disallow: /api/\n`; // Prevent indexing internal API paths
    text += `\n`;
    text += `Sitemap: ${cleanBaseUrl}/sitemap.xml\n`;
    return text;
  }
};
