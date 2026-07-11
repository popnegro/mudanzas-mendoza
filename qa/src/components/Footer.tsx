import React, { useEffect } from 'react';
import { DEPARTMENTS, SERVICES } from '../data';
import { Phone, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigateDept: (slug: string) => void;
  onNavigateService: (slug: string) => void;
  onNavigateBlog: () => void;
  onNavigateHome: () => void;
  onNavigateCobertura: () => void;
  onNavigatePlanificador: () => void;
}

export default function Footer({ 
  onNavigateDept, 
  onNavigateService, 
  onNavigateBlog, 
  onNavigateHome,
  onNavigateCobertura,
  onNavigatePlanificador
}: FooterProps) {
  
  // Inject complete Schema.org JSON-LD onto the page header for absolute Google SEO compliance
  useEffect(() => {
    const existingScript = document.getElementById('seo-json-ld');
    if (existingScript) {
      existingScript.remove();
    }

    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "MovingCompany",
          "@id": "https://mudanzasmendoza.com.ar/#organization",
          "name": "Mudanzas Mendoza 2026",
          "url": "https://mudanzasmendoza.com.ar",
          "logo": "https://images.unsplash.com/photo-1512418490979-92798cfc32ec?auto=format&fit=crop&q=80&w=150",
          "image": "https://images.unsplash.com/photo-1512418490979-92798cfc32ec?auto=format&fit=crop&q=80&w=600",
          "description": "La mejor empresa de fletes y mudanzas en Mendoza. Ofrecemos cotización al instante por WhatsApp, traslados con peones propios y seguro civil.",
          "telephone": "+5492612345678",
          "email": "contacto@mudanzasmendoza.com.ar",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Avenida Arístides Villanueva 123",
            "addressLocality": "Mendoza Capital",
            "addressRegion": "Mendoza",
            "postalCode": "M5500",
            "addressCountry": "AR"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "-32.8901",
            "longitude": "-68.8440"
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday"
            ],
            "opens": "00:00",
            "closes": "23:59"
          },
          "priceRange": "$$",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "1240"
          }
        },
        {
          "@type": "WebSite",
          "@id": "https://mudanzasmendoza.com.ar/#website",
          "url": "https://mudanzasmendoza.com.ar",
          "name": "Mudanzas Mendoza 2026",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://mudanzasmendoza.com.ar/?search={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }
      ]
    };

    const script = document.createElement('script');
    script.id = 'seo-json-ld';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('seo-json-ld');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return (
    <footer id="footer-section" className="bg-slate-950 text-slate-300 font-sans border-t border-slate-900">
      
      {/* High Trust Value Props Footer Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-slate-900 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-center sm:text-left">
        <div className="flex items-center gap-3 justify-center sm:justify-start">
          <ShieldCheck className="w-7 h-7 text-amber-500 shrink-0" />
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Carga Asegurada</h4>
            <p className="text-slate-500 text-xs mt-0.5">Seguro de tránsito Sancor Seguros.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 justify-center sm:justify-start">
          <Phone className="w-7 h-7 text-amber-500 shrink-0" />
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Atención de Guardia</h4>
            <p className="text-slate-500 text-xs mt-0.5">Operamos sábados, domingos y feriados.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 justify-center sm:justify-start">
          <MapPin className="w-7 h-7 text-amber-500 shrink-0" />
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Flota Autorizada</h4>
            <p className="text-slate-500 text-xs mt-0.5">Habilitaciones CNRT en todo Mendoza.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 text-sm">
        
        {/* Col 1: Brand details */}
        <div className="lg:col-span-4 space-y-4 text-center sm:text-left">
          <button 
            onClick={onNavigateHome}
            className="text-lg font-extrabold text-white flex items-center justify-center sm:justify-start gap-2 hover:text-amber-400 transition-colors cursor-pointer"
          >
            🚚 Mendoza 2026
          </button>
          <p className="text-slate-500 text-xs leading-relaxed max-w-sm">
            La flota de confianza para mudanzas y fletes en todo Mendoza. Traslados seguros con el respaldo técnico que necesitás.
          </p>
          <div className="bg-slate-900/40 p-3.5 rounded-xl border border-slate-900 text-[11px] leading-relaxed text-slate-400">
            <span className="text-white font-bold block mb-1">🔗 Respaldo Miranda:</span>
            Un producto oficial de <a href="https://www.mudanzasmiranda.com.ar/" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">Mudanzas Miranda</a>, con más de 50 años de liderazgo logístico en Cuyo.
          </div>
          <div className="space-y-1.5 text-xs text-slate-400 pt-1">
            <p className="flex items-center justify-center sm:justify-start gap-2">
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>Guardia: 261 2345678</span>
            </p>
            <p className="flex items-center justify-center sm:justify-start gap-2">
              <Mail className="w-3.5 h-3.5 text-amber-500" />
              <span>contacto@mudanzasmendoza.com.ar</span>
            </p>
          </div>
        </div>

        {/* Col 2: Services List */}
        <div className="lg:col-span-3 text-center sm:text-left">
          <h4 className="font-extrabold text-white text-xs uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-2">Servicios</h4>
          <ul className="space-y-2 text-xs">
            {SERVICES.map(svc => (
              <li key={svc.id}>
                <button
                  onClick={() => onNavigateService(svc.slug)}
                  className="text-slate-400 hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  {svc.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Departments list */}
        <div className="lg:col-span-3 text-center sm:text-left">
          <h4 className="font-extrabold text-white text-xs uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-2">Zonas de Cobertura</h4>
          <ul className="grid grid-cols-2 gap-x-2 gap-y-2 text-xs">
            {DEPARTMENTS.map(dept => (
              <li key={dept.id}>
                <button
                  onClick={() => onNavigateDept(dept.slug)}
                  className="text-slate-400 hover:text-amber-400 transition-colors cursor-pointer text-left block"
                >
                  {dept.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Quick Links */}
        <div className="lg:col-span-2 text-center sm:text-left">
          <h4 className="font-extrabold text-white text-xs uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-2">Secciones</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={onNavigateCobertura}
                className="text-slate-400 hover:text-amber-400 transition-colors cursor-pointer text-left block"
              >
                Nuestra Cobertura
              </button>
            </li>
            <li>
              <button
                onClick={onNavigatePlanificador}
                className="text-slate-400 hover:text-amber-400 transition-colors cursor-pointer text-left block"
              >
                Planificador IA
              </button>
            </li>
            <li>
              <button
                onClick={onNavigateBlog}
                className="text-slate-400 hover:text-amber-400 transition-colors cursor-pointer text-left block"
              >
                Blog y Consejos
              </button>
            </li>
            <li className="pt-2 border-t border-slate-900">
              <a 
                href="/sitemap.xml" 
                target="_blank" 
                rel="noreferrer" 
                className="text-slate-500 hover:text-amber-450 transition-colors block text-[10px]"
              >
                Sitemap XML
              </a>
            </li>
            <li>
              <a 
                href="/robots.txt" 
                target="_blank" 
                rel="noreferrer" 
                className="text-slate-500 hover:text-amber-450 transition-colors block text-[10px]"
              >
                Robots.txt
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Under footer: Copyright & details */}
      <div className="bg-slate-950 border-t border-slate-900/60 py-6 text-center text-[10px] sm:text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Mendoza 2026. Todos los derechos reservados. Respaldado por Mudanzas Miranda.</p>
          <p className="flex items-center gap-1">
            Hecho con <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> en Mendoza
          </p>
        </div>
      </div>

    </footer>
  );
}
