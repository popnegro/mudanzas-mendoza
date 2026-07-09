import { SitemapService } from '../src/services/sitemapService';

export default function handler(req: any, res: any) {
  const baseUrl = process.env.APP_URL || 'https://mudanzasmendoza2026.com.ar';
  const robots = SitemapService.generateRobotsTxt(baseUrl);
  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send(robots);
}
