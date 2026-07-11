import React, { useMemo } from 'react';
import { ServiceInfo } from '../types';
import { ArrowLeft, CheckCircle, PhoneCall, Truck, Briefcase, Package, Clock, Calendar, CheckSquare, Home, Warehouse, Shield, ArrowUpCircle } from 'lucide-react';
import { DEPARTMENTS } from '../data';
import { useBreadcrumbSchema } from '../hooks/useBreadcrumbSchema';
import { useSchema } from '../hooks/useSchema';
import Breadcrumbs from './Breadcrumbs';

// Import official Mudanzas Miranda packing team image for co-branding
import mudanzasEquipoEmbalaje from '../assets/images/mudanzas_equipo_embalaje_1783676512881.jpg';

interface ServiceLandingProps {
  service: ServiceInfo;
  onBack: () => void;
  onStartQuote: () => void;
}

// Icon mapper for Lucide components dynamically based on iconName
const iconMap: { [key: string]: any } = {
  Truck: Truck,
  Package: Package,
  Briefcase: Briefcase,
  Clock: Clock,
  Calendar: Calendar,
  Home: Home,
  Warehouse: Warehouse,
  Shield: Shield,
  ArrowUpCircle: ArrowUpCircle
};

export default function ServiceLanding({ service, onBack, onStartQuote }: ServiceLandingProps) {
  const IconComponent = iconMap[service.iconName] || Truck;

  // Dynamic Base Prices for 2026 Mendoza Moving Services
  const basePrices: { [key: string]: number } = {
    'mudanzas-residenciales': 45000,
    'fletes-economicos': 15000,
    'transporte-de-muebles': 30000,
    'traslado-de-offices': 60000,
    'guardamuebles-mendoza': 25000,
    'embalaje-y-desarme': 18000,
    'izamientos-y-altura': 35000,
    'mudanzas-urgentes': 32000,
    'mudanzas-24-horas': 38000
  };

  const basePrice = basePrices[service.id] || 20000;

  // Construir el schema de Service y usar el hook genérico
  const serviceSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.name, // This was already correct, but for context
    "name": service.seo.h1,
    "description": service.description,
    "provider": {
      "@type": "MovingCompany",
      "name": "Mudanzas Mendoza 2026",
      "telephone": "+542612345678",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Mendoza",
        "addressRegion": "Mendoza",
        "addressCountry": "AR"
      }
    },
    "areaServed": "Mendoza, Argentina"
  }), [service, basePrice]);

  useSchema(serviceSchema, `service-schema-${service.id}`);

  // Dynamically inject BreadcrumbList Schema.org JSON-LD
  useBreadcrumbSchema([
    { name: 'Inicio', item: 'https://mudanzasmendoza.com.ar' },
    { name: 'Servicios', item: 'https://mudanzasmendoza.com.ar/#servicios' },
    { name: service.name, item: `https://mudanzasmendoza.com.ar/servicios/${service.slug}` }
  ], `service-${service.id}`);

  const breadcrumbSteps = [
    { label: 'Inicio', onClick: onBack },
    { label: 'Servicios', onClick: onBack },
    { label: service.name, isCurrent: true }
  ];

  return (
    <article className="py-12 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12 animate-fade-in">
      
      {/* Visual Keyboard-Navigable Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Breadcrumbs steps={breadcrumbSteps} />
      </div>

      {/* Hero Header */}
      <header className="space-y-4 border-b border-slate-100 dark:border-slate-800 pb-8">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-800 dark:text-amber-400 font-bold px-3 py-1.5 rounded-full text-xs">
          <IconComponent className="w-4 h-4" /> Especialidad Certificada
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          {service.seo.h1}
        </h1>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-slate-500 dark:text-slate-400 pt-1">
          <span>💰 Tarifa Base: <strong className="text-amber-600 dark:text-amber-400">${basePrice.toLocaleString('es-AR')} ARS</strong></span>
          <span>📍 Cobertura: <strong className="text-slate-700 dark:text-slate-300">Todo el Gran Mendoza</strong></span>
        </div>
        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal pt-2">
          {service.description}
        </p>
      </header>

      {/* Official Mudanzas Miranda Service Banner (SEO Optimized) */}
      <div className="w-full h-60 sm:h-72 rounded-2xl overflow-hidden relative border border-slate-250 dark:border-slate-800 shadow-md">
        <img
          src={mudanzasEquipoEmbalaje}
          alt={`Servicio premium de ${service.name} en Mendoza - Garantía, envolturas seguras y seriedad de Mudanzas Miranda`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent flex items-end p-4">
          <p className="text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5">
            📦 Respaldado por el equipamiento de Mudanzas Miranda (50 años de experiencia)
          </p>
        </div>
      </div>

      {/* Main Copy Block */}
      <section className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">En qué consiste nuestro servicio de {service.name}</h2>
        <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line">
          {service.longDescription}
        </p>
      </section>

      {/* Benefits Card Grid */}
      <section className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Beneficios exclusivos que te brindamos:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {service.benefits.map((benefit, idx) => (
            <div key={idx} className="bg-slate-50 dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-850 flex gap-3.5 items-start">
              <div className="p-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-lg shrink-0">
                <CheckCircle className="w-5 h-5 stroke-[2.5]" />
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-semibold leading-relaxed">
                {benefit}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Dynamic Trust Alert */}
      <section className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/60 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4">
        <div className="text-3xl">🛡️</div>
        <div>
          <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">Garantía de Cuidado Extremo</h4>
          <p className="text-slate-600 dark:text-slate-300 text-xs mt-1">Este servicio cuenta con envolturas en plástico burbuja para muebles de alto valor y sujeción con eslingas de trinquete profesionales.</p>
        </div>
      </section>

      {/* Call to Action Module */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8 rounded-2xl border border-slate-800 text-center space-y-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="space-y-2 max-w-xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold text-white">¿Querés reservar un servicio de {service.name}?</h3>
          <p className="text-slate-300 text-xs sm:text-sm">Hacé clic abajo para cargar los datos en nuestro cotizador inteligente, o mandanos un mensaje directo para resolver de inmediato.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto pt-2">
          <button
            onClick={onStartQuote}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-all cursor-pointer shadow hover:scale-[1.01]"
          >
            Calcular Presupuesto Web
          </button>
          <a
            href={`https://wa.me/5492612345678?text=Hola!%20Quiero%20solicitar%20el%20servicio%20de%20${encodeURIComponent(service.name)}%20en%20Mendoza.`}
            target="_blank"
            rel="noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow hover:scale-[1.01]"
          >
            <PhoneCall className="w-4 h-4" /> Enviar WhatsApp
          </a>
        </div>
      </section>

    </article>
  );
}
