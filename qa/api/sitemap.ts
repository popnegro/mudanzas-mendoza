import { SitemapService } from '../src/services/sitemapService';

export default function handler(req: any, res: any) {
  const baseUrl = process.env.APP_URL || 'https://mudanzasmendoza2026.com.ar';
  const xml = SitemapService.generateSitemapXml(baseUrl);
  res.setHeader('Content-Type', 'application/xml');
  res.status(200).send(xml);
}
