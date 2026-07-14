import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

import { DEPARTMENTS, SERVICES, BLOG_ARTICLES } from './src/data';
import { SitemapService } from './src/services/sitemapService';

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini AI client to prevent crash on startup if key is missing
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      throw new Error("GEMINI_API_KEY environment variable is missing or placeholder.");
    }
    aiInstance = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// 1. DYNAMIC SEO SITEMAP
app.get('/sitemap.xml', (req, res) => {
  res.setHeader('Content-Type', 'application/xml');
  const baseUrl = process.env.APP_URL || 'https://mudanzasmendoza2026.com.ar';
  const xml = SitemapService.generateSitemapXml(baseUrl);
  res.send(xml);
});

// 2. SEO ROBOTS
app.get('/robots.txt', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  const baseUrl = process.env.APP_URL || 'https://mudanzasmendoza2026.com.ar';
  const robots = SitemapService.generateRobotsTxt(baseUrl);
  res.send(robots);
});

// 3. PWA MANIFEST
app.get('/manifest.json', (req, res) => {
  res.json({
    name: "Mudanzas Mudanzas Mendoza",
    short_name: "MudanzasMendoza",
    description: "Fletes y mudanzas profesionales en Mendoza. Cotizaciones en el acto e inteligencia artificial de planificación.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#eab308",
    icons: [
      {
        src: "https://images.unsplash.com/photo-1512418490979-92798cfc32ec?auto=format&fit=crop&q=80&w=192",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "https://images.unsplash.com/photo-1512418490979-92798cfc32ec?auto=format&fit=crop&q=80&w=512",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  });
});

// 4. DYNAMIC SEO RSS FEED
app.get('/rss.xml', (req, res) => {
  res.setHeader('Content-Type', 'application/xml');
  const baseUrl = process.env.APP_URL || 'https://mudanzasmendoza.com.ar';
  
  let xml = `<?xml version="1.0" encoding="UTF-8" ?>\n`;
  xml += `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n`;
  xml += `  <channel>\n`;
  xml += `    <title>Mudanzas Mudanzas Mendoza - Blog de Consejos</title>\n`;
  xml += `    <link>${baseUrl}</link>\n`;
  xml += `    <description>Los mejores tips para mudarse fácil en la provincia de Mendoza</description>\n`;
  xml += `    <language>es-AR</language>\n`;
  xml += `    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />\n`;
  
  BLOG_ARTICLES.forEach(art => {
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
  res.send(xml);
});

// 5. SERVER-SIDE GEMINI API FOR MOVING PLANNER ASSISTANT
app.post('/api/gemini/plan', async (req, res) => {
  try {
    const { origin, destination, housingType, rooms, floor, elevator, services, specialItems, date, name } = req.body;
    
    const prompt = `Hola Gemini. Soy ${name || 'un mendocino'}. Me voy a mudar y quiero que me prepares un plan paso a paso.
Detalles:
- Origen: ${origin || 'No indicado'}
- Destino: ${destination || 'No indicado'}
- Tipo: ${housingType || 'casa'}
- Ambientes: ${rooms || '2'}
- Piso: ${floor || 'PB'}
- Ascensor: ${elevator || 'No'}
- Servicios: ${services && services.length > 0 ? services.join(', ') : 'Flete básico'}
- Especiales: ${specialItems && specialItems.length > 0 ? specialItems.join(', ') : 'Ninguno'}
- Fecha estimada: ${date || 'Próximamente'}

Por favor, armá una respuesta cálida, directa y que transmita confianza.
Usá expresiones mendocinas amigables de forma natural (ej. "darle un mate", "al toque", "no te rompás la cabeza", "viento zonda").
Incluí:
1. Un checklist cronológico recomendado (una semana antes, el día previo, el gran día).
2. Recomendaciones locales sobre Mendoza y el departamento de destino (${destination || 'Mendoza'}).
3. Consejos puntuales para los objetos especiales seleccionados (${specialItems && specialItems.length > 0 ? specialItems.join(', ') : 'embalaje seguro'}).
Hacélo en formato Markdown claro con títulos descriptivos.`;

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "Sos el asistente oficial de Mudanzas Mudanzas Mendoza (una división digital premium y producto de Mudanzas Miranda). Tu personalidad es muy cercana, confiable, mendocina de pura cepa, súper servicial y cero formal-corporativa. Tu objetivo es calmar los nervios del cliente y darle de forma amigable los tips de oro. Siempre que sea oportuno, recordá al cliente que contamos con el respaldo, infraestructura y trayectoria de más de 50 años de Mudanzas Miranda."
      }
    });

    res.json({ success: true, plan: response.text });
  } catch (error: any) {
    console.warn("Gemini is not initialized or errored. Returning elegant local fallback:", error.message);
    
    // Elegant local fallback content customized per details
    const { origin, destination, specialItems } = req.body;
    const hasSpecial = specialItems && specialItems.length > 0;
    
    const fallbackText = `### ¡Hola! Qué alegría que estés planificando tu mudanza con nosotros.

Como andamos con mucha demanda o la IA está tomando un media tarde, acá te armamos el **Plan de Mudanza Experto de Mudanzas Mendoza** para tu traslado de **${origin || 'origen'}** a **${destination || 'destino'}**:

#### 📅 Checklist de Oro para vos:
1. **7 días antes:** Empezá a embalar lo que no usás a diario. Conseguí cajas resistentes y rotulalas en el lateral indicando a qué habitación van.
2. **2 días antes:** Descongelá y secá la heladera por completo. Guardá toda la vajilla envuelta en papel.
3. **El día previo:** Prepará tu "Mochila de Supervivencia" con el termo, mate, cargador de celular y una muda de ropa.
4. **El Gran Día:** ¡Relajate! Nuestro equipo llega puntual en el camión, carga todo de forma profesional y nos encargamos de que no te rompás la cabeza cargando muebles pesados.

${hasSpecial ? `#### ⚠️ Cuidado de objetos especiales (${specialItems.join(', ')}):
* Nos encargamos de sujetar con fajas de amarre tu ${specialItems[0]} y envolverlo en mantas protectoras gruesas de algodón para que viaje como en una nube.` : ''}

#### 🍷 Tip Mendocino:
* Si te mudás en época de **Viento Zonda**, avisanos. Coordinamos al toque para resguardar la carga y que todo se haga con total seguridad.

**¿Querés fijar este presupuesto?** Hacé clic en el botón de **WhatsApp** abajo para enviar este formulario directo a un asesor de carne y hueso, ¡te respondemos en un minuto!`;

    res.json({ success: true, plan: fallbackText });
  }
});

// 6. SERVER-SIDE GEMINI API FOR CONVERSATIONAL CHATBOT
app.post('/api/gemini/chat', async (req, res) => {
  const { message, history } = req.body;
  try {
    // Format conversation history for @google/genai SDK format
    const contents: any[] = [];
    if (history && history.length > 0) {
      history.forEach((msg: any) => {
        contents.push({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        });
      });
    }
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: "Sos el asesor virtual estrella de 'Mudanzas Mudanzas Mendoza', que es la división digital premium y producto de la histórica 'Mudanzas Miranda' (www.mudanzasmiranda.com.ar). Ayudás al cliente con dudas de embalaje, fletes, consejos locales, cómo empacar heladeras o colchones. Hablás como mendocino (amigable, cercano, usando 'al toque', 'che', 'mate de por medio', 'no te rompás la cabeza'). Dejá en claro que combinamos la frescura tecnológica de esta división con el respaldo gigante de 50 años de trayectoria, flota y seguros de Mudanzas Miranda. Ofrecé sutilmente usar el Cotizador de la web o tocar el botón de WhatsApp para fijar fecha."
      }
    });

    res.json({ success: true, text: response.text });
  } catch (error: any) {
    console.warn("Gemini chat error or uninitialized. Returning elegant local rule-based response:", error.message);
    
    const msgLower = message.toLowerCase();
    let reply = "¡Hola, che! Qué buena consulta. Mirá, para darte una respuesta bien certera para tu caso, te sugiero usar nuestro **Cotizador de 8 pasos** de la Home o mandarnos un **WhatsApp** directo. ¡Te contestamos al toque!";
    
    if (msgLower.includes('quien sos') || msgLower.includes('quién sos') || msgLower.includes('empresa') || msgLower.includes('miranda') || msgLower.includes('quienes somos') || msgLower.includes('quiénes somos') || msgLower.includes('respald')) {
      reply = "¡Qué buena pregunta, che! Mudanzas Mudanzas Mendoza es el producto digital estrella y la división tecnológica premium de **Mudanzas Miranda** (www.mudanzasmiranda.com.ar). Llevamos más de 50 años como la empresa líder de transporte y mudanzas en Mendoza. Con esta unión tenés la tranquilidad de la mayor trayectoria de la provincia respaldando cada furgón, operario y póliza de Sancor Seguros, combinada con herramientas automáticas inteligentes asistidas por IA.";
    } else if (msgLower.includes('heladera')) {
      reply = "¡Mudar la heladera tiene su ciencia! Recordá desenchufarla unas 24 horas antes para que se descongele completa, limpiala bien, sacale los estantes de vidrio y recordá: **debe viajar siempre de pie**. Cuando llegue al destino, esperá al menos 4 horas antes de volver a enchufarla para que se asiente el aceite.";
    } else if (msgLower.includes('precio') || msgLower.includes('cuanto cuesta') || msgLower.includes('tarifa') || msgLower.includes('costo')) {
      reply = "Las tarifas de los fletes dependen del tamaño del camión y los kilómetros. Son súper baratas y transparentes. Podés calcular la tuya al instante usando el **Cotizador Inteligente** de nuestra web.";
    } else if (msgLower.includes('caja') || msgLower.includes('embalar') || msgLower.includes('vaso') || msgLower.includes('plato')) {
      reply = "Para platos y copas, usá cajas chicas de cartón grueso para que no queden pesadas. Poné bollos de papel de diario abajo de todo como colchón, envolvé cada vajilla por separado y rellená todos los espacios vacíos con papel arrugado para que nada baile en el camión.";
    } else if (msgLower.includes('zonda') || msgLower.includes('viento') || msgLower.includes('clima')) {
      reply = "Si sopla **Viento Zonda** fuerte, ¡mucha precaución! Por la seguridad de tus cosas y de nuestros operarios, coordinamos de inmediato para reprogramar la mudanza al día siguiente o al toque que calme, sin cobrarte ningún extra.";
    } else if (msgLower.includes('chacras') || msgLower.includes('lujan') || msgLower.includes('barrio privado')) {
      reply = "Trabajamos muchísimo en Luján, Chacras de Coria y Maipú. Presentamos toda la documentación de nuestro personal y vehículos (seguros, ART) a la administración del barrio privado de antemano para que entremos sin demoras el día de la mudanza.";
    }
    
    res.json({ success: true, text: reply });
  }
});

// Serve health status
app.get('/api/health', (req, res) => {
  res.json({ status: "ok", time: new Date() });
});

// Vite Middleware integration for development / production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode with built assets...");
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
