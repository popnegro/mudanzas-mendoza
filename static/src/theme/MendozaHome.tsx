import type { ReactNode } from 'react';
import { ArrowRight, BookOpen, MapPin, Sparkles } from 'lucide-react';
import { ServiceCard, ServiceGrid, ServiceCTA } from './services';
import type { ServiceItem } from './services.types';

export interface MendozaHomeProps {
  services: ServiceItem[];
  destinationsHref?: string;
  planningHref?: string;
  planningLabel?: string;
  heroImage?: string;
  heroImageAlt?: string;
  guidesHref?: string;
  children?: ReactNode;
}

/**
 * Informational home composition for Mudanzas Mendoza.
 *
 * This is intentionally not a commercial quote page: the primary journey is
 * discovery -> service understanding -> destinations/guides -> planning.
 */
export function MendozaHome({
  services,
  destinationsHref = '/destinos',
  planningHref = 'https://mudanzapro.vercel.app/',
  planningLabel = 'Planificar mi mudanza',
  heroImage,
  heroImageAlt = 'Servicio de mudanzas en Mendoza',
  guidesHref = '/blog',
  children,
}: MendozaHomeProps) {
  return (
    <div className="bg-white text-[#302D28]">
      <section className="relative overflow-hidden border-b border-slate-200 bg-[#FAF9F5] py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-7">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#07BE8A]/25 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#06434A]">
              <Sparkles className="h-4 w-4 text-[#07BE8A]" aria-hidden="true" />
              Informate antes de mudarte
            </p>
            <h1 className="max-w-3xl text-4xl font-black tracking-tight text-[#06434A] sm:text-5xl lg:text-6xl">
              Mudanzas en Mendoza: servicios, destinos y todo lo que necesitás saber
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Conocé los servicios disponibles, qué implica cada tipo de mudanza y qué tener en cuenta antes de pedir un presupuesto.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#servicios"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#06434A] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#06434A]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07BE8A] focus-visible:ring-offset-2"
              >
                Explorar servicios <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={planningHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-[#06434A] transition hover:border-[#07BE8A]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07BE8A] focus-visible:ring-offset-2"
              >
                {planningLabel}
              </a>
            </div>
          </div>
          {heroImage ? (
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                <img src={heroImage} alt={heroImageAlt} className="aspect-[4/3] w-full object-cover" width="1200" height="900" fetchPriority="high" />
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section id="servicios" className="scroll-mt-24 border-b border-slate-200 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#07BE8A]">Qué necesitás resolver</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-[#06434A] sm:text-4xl">Servicios de mudanza en Mendoza</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">Explorá cada servicio antes de decidir qué necesitás incluir en tu mudanza.</p>
          </div>
          <ServiceGrid>
            {services.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </ServiceGrid>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <ServiceCard
            title="Elegí tu destino"
            description="Consultá la cobertura por departamentos y localidades de Mendoza para entender dónde se presta cada servicio."
            href={destinationsHref}
            eyebrow="Destinos"
            variant="featured"
          />
          <ServiceCard
            title="Aprendé a organizar tu mudanza"
            description="Guías prácticas para embalar, organizar tiempos y llegar mejor preparado al día del traslado."
            href={guidesHref}
            eyebrow="Guías"
          />
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ServiceCTA
            title="¿Ya sabés qué necesitás?"
            description="Usá MudanzaPro para planificar tu mudanza y preparar mejor tu solicitud de presupuesto."
            href={planningHref}
            label="Planificar mi mudanza"
          />
        </div>
      </section>

      {children}
    </div>
  );
}
