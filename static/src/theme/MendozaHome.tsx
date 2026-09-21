import { ArrowRight, Award, ShieldCheck, Truck } from 'lucide-react';
import QuoteForm from '../components/QuoteForm';
import { ServiceCard, ServiceGrid, ServiceCTA } from './services';
import type { ServiceItem } from './services.types';
import { themeConfig } from './theme.config';

export interface MendozaHomeProps {
  services: ServiceItem[];
  destinationsHref?: string;
  planningHref?: string;
  planningLabel?: string;
  heroImage?: string;
  heroImageAlt?: string;
  guidesHref?: string;
}

export function MendozaHome({
  services,
  destinationsHref = '/destinos',
  planningHref = themeConfig.ecosystem.planningUrl ?? 'https://mudanzapro.com.ar/',
  planningLabel = 'Planificar mi mudanza',
  heroImage,
  heroImageAlt = 'Servicio de mudanzas en Mendoza',
  guidesHref = '/blog',
}: MendozaHomeProps) {
  const serviceCards = services.map((service) => ({
    id: service.id,
    title: service.title,
    description: service.description,
    href: service.href ?? `/servicios/${service.id}.html`,
    eyebrow: service.eyebrow ?? 'Servicio',
    icon: service.icon,
  }));

  return (
    <div className="bg-white text-slate-800">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white py-16 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(245,158,11,0.08),transparent_38%)]" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-green-500/20 bg-brand-green-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-green-600">
              <Truck className="h-4 w-4 text-brand-green-600" aria-hidden="true" />
              Informate antes de mudarte
            </span>
            <h1 className="hero-title mt-5">Mudanzas en Mendoza: servicios, destinos y todo lo que necesitás saber</h1>
            <p className="hero-subtitle mt-5 max-w-2xl">
              Conocé los servicios disponibles, los destinos y qué tener en cuenta antes de pedir un presupuesto.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a id="cta-hero-quote" href={themeConfig.contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hero-cta-button">
                Pedir presupuesto <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
              <a id="cta-hero-planning" href={planningHref} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 text-base font-semibold text-slate-700 transition hover:bg-slate-100">
                {planningLabel}
              </a>
            </div>
          </div>
          {heroImage && (
            <div className="lg:col-span-6">
              <div className="mx-auto max-w-lg overflow-hidden rounded-3xl border-4 border-slate-200 shadow-2xl shadow-brand-green-500/10">
                <img src={heroImage} alt={heroImageAlt} className="aspect-[4/3] w-full object-cover" width="1200" height="900" fetchPriority="high" />
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="nosotros" className="border-b border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="section-title">Todo lo que necesitás conocer antes de mudarte</h2>
            <p className="section-description mt-3">Información clara para entender servicios, cobertura y próximos pasos.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Award, title: 'Experiencia local', text: 'Conocé cómo funcionan los servicios de mudanza en Mendoza.' },
              { icon: Truck, title: 'Servicios especializados', text: 'Compará alternativas según el tipo de traslado que necesitás.' },
              { icon: ShieldCheck, title: 'Planificación', text: 'Llegá mejor preparado antes de solicitar un presupuesto.' },
            ].map(({ icon: Icon, title, text }) => (
              <article key={title} className="benefit-card">
                <div className="benefit-icon-wrapper"><Icon className="h-6 w-6" /></div>
                <h3 className="benefit-card-title">{title}</h3>
                <p className="section-description">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="servicios" className="scroll-mt-24 border-b border-slate-200 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-green-600">Qué necesitás resolver</p>
            <h2 className="section-title mt-2">Servicios de mudanza en Mendoza</h2>
            <p className="section-description mt-3">Explorá cada servicio antes de decidir qué necesitás incluir en tu mudanza.</p>
          </div>
          <ServiceGrid services={serviceCards} />
        </div>
      </section>

      <section id="rutas" className="border-b border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <ServiceCard
              title="Elegí tu destino"
              description="Consultá la cobertura por departamentos y localidades de Mendoza."
              href={destinationsHref}
              eyebrow="Destinos"
              variant="featured"
              id="destinos"
            />
            <ServiceCard
              title="Aprendé a organizar tu mudanza"
              description="Guías prácticas para embalar, organizar tiempos y llegar mejor preparado."
              href={guidesHref}
              eyebrow="Guías"
              id="guias"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ServiceCTA
            title="¿Querés planificar antes de pedir presupuesto?"
            description="MudanzaPro te ayuda a ordenar la información de tu traslado y llegar mejor preparado a la etapa de cotización."
            primaryHref={planningHref}
            primaryLabel={planningLabel}
          />
        </div>
      </section>

      <section id="faq" className="border-b border-slate-200 bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center">Preguntas frecuentes sobre mudanzas</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              ['¿Qué servicio necesito?', 'Depende del tipo de traslado, volumen, acceso y necesidades de embalaje.'],
              ['¿Trabajan en toda Mendoza?', 'La cobertura se organiza por departamentos y localidades. Consultá destinos para ver el detalle.'],
              ['¿Puedo planificar antes de pedir presupuesto?', 'Sí. MudanzaPro permite ordenar la información del traslado antes de contactar a la empresa.'],
              ['¿Cómo solicito un presupuesto?', 'Podés completar el formulario para preparar una solicitud estructurada.'],
            ].map(([question, answer]) => (
              <article key={question} className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="font-bold text-slate-900">{question}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="form" className="scroll-mt-24 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="section-title">Prepará tu solicitud de presupuesto</h2>
            <p className="section-description mt-3">Completá los datos básicos del traslado para continuar por WhatsApp.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-8">
            <QuoteForm />
          </div>
        </div>
      </section>
    </div>
  );
}
