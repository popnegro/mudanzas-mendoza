import React, { useEffect } from 'react';
import { DepartmentInfo } from '../types';
import { MapPin, PhoneCall, CheckCircle, ArrowLeft, HelpCircle, CheckSquare } from 'lucide-react';
import { useBreadcrumbSchema } from '../hooks/useBreadcrumbSchema';
import Breadcrumbs from './Breadcrumbs';

// Import official Mudanzas Miranda images for co-branding and SEO
import mudanzaMirandaTruck from '../assets/images/mudanza_miranda_truck_1783676498398.jpg';
import mudanzasEquipoEmbalaje from '../assets/images/mudanzas_equipo_embalaje_1783676512881.jpg';

interface DepartmentLandingProps {
  dept: DepartmentInfo;
  onBack: () => void;
  onStartQuote: () => void;
}

export default function DepartmentLanding({ dept, onBack, onStartQuote }: DepartmentLandingProps) {
  
  // Dynamically inject BreadcrumbList Schema.org JSON-LD for departments
  useBreadcrumbSchema([
    { name: 'Inicio', item: 'https://mudanzasmendoza2026.com.ar' },
    { name: 'Cobertura', item: 'https://mudanzasmendoza2026.com.ar/#cobertura' },
    { name: dept.name, item: `https://mudanzasmendoza2026.com.ar/departamentos/${dept.slug}` }
  ], `dept-${dept.id}`);
  
  useEffect(() => {
    // Generate valid Schema.org MovingCompany JSON-LD specialized for this department
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "MovingCompany",
      "id": `https://mudanzasmendoza2026.com.ar/departamentos/${dept.slug}`,
      "name": `Mudanzas Mendoza 2026 - Cobertura Especial en ${dept.name}`,
      "description": dept.description,
      "telephone": "+542612345678",
      "priceRange": "$$",
      "image": "https://ais-dev-etzjgp4qe2v62cnwnmfoco-175390492626.us-east1.run.app/assets/logo.png",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": dept.name,
        "addressRegion": "Mendoza",
        "addressCountry": "AR"
      },
      "areaServed": {
        "@type": "AdministrativeArea",
        "name": dept.name,
        "sameAs": `https://es.wikipedia.org/wiki/Departamento_${encodeURIComponent(dept.name.replace(' ', '_'))}`
      },
      "provider": {
        "@type": "LocalBusiness",
        "name": "Mudanzas Mendoza 2026",
        "telephone": "+542612345678"
      }
    };

    const scriptId = `dept-schema-${dept.id}`;
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(jsonLd, null, 2);

    return () => {
      const existing = document.getElementById(scriptId);
      if (existing) {
        existing.remove();
      }
    };
  }, [dept]);

  const breadcrumbSteps = [
    { label: 'Inicio', onClick: onBack },
    { label: 'Zonas', onClick: onBack },
    { label: dept.name, isCurrent: true }
  ];

  return (
    <article className="py-12 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12 animate-fade-in">
      
      {/* Visual Keyboard-Navigable Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Breadcrumbs steps={breadcrumbSteps} />
      </div>

      {/* Header section with specific SEO elements */}
      <header className="space-y-4 border-b border-slate-100 dark:border-slate-800 pb-8">
        <div className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-800 dark:text-amber-400 font-bold px-3 py-1 rounded-full text-xs">
          <MapPin className="w-3.5 h-3.5" /> Cobertura Local: {dept.name}
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          {dept.seo.h1}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          {dept.description}
        </p>
      </header>

      {/* Official Mudanzas Miranda Truck Banner (SEO Optimized) */}
      <div className="w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden relative border border-slate-200 dark:border-slate-800 shadow-md">
        <img
          src={mudanzaMirandaTruck}
          alt={`Servicio profesional de fletes y mudanzas en ${dept.name} Mendoza - Camiones habilitados de Mudanzas Miranda`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent p-4 text-white">
          <p className="text-xs sm:text-sm font-semibold flex items-center gap-2">
            🚚 Flota oficial de Mudanzas Miranda operando en todo {dept.name}
          </p>
        </div>
      </div>

      {/* Structured SEO Copy block and Packing image side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-b border-slate-100 dark:border-slate-800 pb-10">
        <section className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Traslados residenciales y fletes de confianza en {dept.name}</h2>
          <p className="text-sm sm:text-base leading-relaxed">
            {dept.content}
          </p>
          <div className="p-4.5 bg-amber-500/5 border border-amber-500/10 rounded-xl text-xs text-slate-600 dark:text-slate-300">
            <strong>Respaldo Premium:</strong> Como división oficial de <strong>Mudanzas Miranda</strong> (con más de 50 años de experiencia), contamos con un estándar de servicio inigualable y cobertura homologada contra todo riesgo.
          </div>
        </section>
        <div className="w-full h-72 sm:h-80 rounded-2xl overflow-hidden border border-slate-150 dark:border-slate-850 shadow-sm relative group">
          <img
            src={mudanzasEquipoEmbalaje}
            alt={`Equipo oficial de Mudanzas Miranda realizando embalaje premium y estiba de objetos frágiles para fletes y mudanzas en ${dept.name}`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 bg-slate-950/70 backdrop-blur-sm text-amber-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
            Embalaje Especializado
          </div>
        </div>
      </div>

      {/* Local Highlights Card list */}
      <section className="bg-slate-50 dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-100 dark:border-slate-850 space-y-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Destacados de nuestro servicio en {dept.name}:</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-700 dark:text-slate-300">
          {dept.highlightItems.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Local places served for SEO relevance */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Zonas frecuentes y de alta cobertura:</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Operamos diariamente fletes y mudanzas de cercanía recorriendo los puntos icónicos del departamento:</p>
        <div className="flex flex-wrap gap-2.5">
          {dept.localFrecuentes.map((place, idx) => (
            <span key={idx} className="bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium px-3.5 py-1.5 rounded-full text-xs transition-colors">
              📍 {place}
            </span>
          ))}
        </div>
      </section>

      {/* Regional FAQs for SEO Schema */}
      {dept.faqs && dept.faqs.length > 0 && (
        <section className="space-y-6 border-t border-slate-100 dark:border-slate-800 pt-8">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-amber-500" />
            Preguntas Frecuentes en {dept.name}
          </h3>
          <div className="space-y-4">
            {dept.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-150 dark:border-slate-800 shadow-sm space-y-2">
                <h4 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base">¿{faq.question}</h4>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Dedicated department CTA block (CRO Optimized) */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8 rounded-2xl border border-slate-800 text-center space-y-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="space-y-2 max-w-xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold text-white">¿Te mudás o necesitás un flete en {dept.name}?</h3>
          <p className="text-slate-300 text-xs sm:text-sm">Pedinos tu cotización sin compromiso. Reservamos la fecha de tu traslado al instante por WhatsApp o a través de nuestra web.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto pt-2">
          <button
            onClick={onStartQuote}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-all cursor-pointer shadow hover:scale-[1.01]"
          >
            Cotizar por la Web
          </button>
          <a
            href={`https://wa.me/5492612345678?text=Hola!%20Quiero%20presupuesto%20para%20una%20mudanza%20en%20${encodeURIComponent(dept.name)}.`}
            target="_blank"
            rel="noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow hover:scale-[1.01]"
          >
            <PhoneCall className="w-4 h-4" /> WhatsApp de Guardia
          </a>
        </div>
      </section>

    </article>
  );
}
