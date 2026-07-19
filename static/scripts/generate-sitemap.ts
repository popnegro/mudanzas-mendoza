import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

// Import our dynamic data
import { destinations } from "../src/data/destinations";
import { services, blogArticles } from "../src/data/staticData";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "https://www.mudanzasmiranda.com.ar";

function generateSitemap() {
  console.log("Starting dynamic sitemap generation...");

  const urls: { loc: string; lastmod: string; changefreq: string; priority: string }[] = [];
  const today = new Date().toISOString().split("T")[0];

  // 1. Home Page
  urls.push({
    loc: `${BASE_URL}/`,
    lastmod: today,
    changefreq: "daily",
    priority: "1.0",
  });

  // 2. Main Sections
  urls.push({
    loc: `${BASE_URL}/blog`,
    lastmod: today,
    changefreq: "weekly",
    priority: "0.8",
  });

  urls.push({
    loc: `${BASE_URL}/destinos`,
    lastmod: today,
    changefreq: "weekly",
    priority: "0.8",
  });

  // 3. Services Pages
  services.forEach((service) => {
    urls.push({
      loc: `${BASE_URL}/servicios/${service.id}.html`,
      lastmod: today,
      changefreq: "monthly",
      priority: "0.8",
    });
  });

  // 4. Blog Articles
  blogArticles.forEach((article) => {
    urls.push({
      loc: `${BASE_URL}/blog/${article.slug}`,
      lastmod: article.date || today,
      changefreq: "monthly",
      priority: "0.7",
    });
  });

  // 5. Destinations (Departments and Districts)
  destinations.forEach((dest) => {
    urls.push({
      loc: `${BASE_URL}/mudanzas-mendoza/${dest.slug}.html`,
      lastmod: today,
      changefreq: "weekly",
      priority: dest.isDistrict ? "0.6" : "0.8",
    });
  });

  // Generate XML content
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  urls.forEach((url) => {
    xml += `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>
`;
  });

  xml += `</urlset>\n`;

  // Write sitemap to /static/public/sitemap.xml (this gets copied to /dist/sitemap.xml on build)
  const publicSitemapPath = path.resolve(__dirname, "../public/sitemap.xml");
  fs.writeFileSync(publicSitemapPath, xml, "utf8");
  console.log(`Successfully generated dynamic sitemap inside static/public: ${publicSitemapPath} (${urls.length} pages index)`);

  // Also write to the root sitemap.xml for legacy compatibility or Vercel setups reading from root
  const rootSitemapPath = path.resolve(__dirname, "../../sitemap.xml");
  fs.writeFileSync(rootSitemapPath, xml, "utf8");
  console.log(`Successfully updated root sitemap: ${rootSitemapPath}`);

  // Update root sitemap-0.xml as well to match just in case
  const rootSitemap0Path = path.resolve(__dirname, "../../sitemap-0.xml");
  fs.writeFileSync(rootSitemap0Path, xml, "utf8");
  console.log(`Successfully updated root sitemap-0.xml: ${rootSitemap0Path}`);
}

generateSitemap();
