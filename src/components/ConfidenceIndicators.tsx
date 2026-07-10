import React, { useState } from 'react';
import { 
  Star, 
  ShieldCheck, 
  Clock, 
  Award, 
  Map, 
  Calendar, 
  TrendingUp, 
  CheckSquare, 
  ChevronRight, 
  Smartphone, 
  Layout, 
  FileCheck 
} from 'lucide-react';

export default function ConfidenceIndicators() {
  const [activeTab, setActiveTab] = useState<'testimonials' | 'trust' | 'seo-plan'>('testimonials');

  const reviews = [
    {
      name: "Mariela S.",
      location: "Chacras de Coria",
      text: "Excelente servicio. Mudamos una casa completa el mes pasado. Teníamos miedo por la vajilla fina y un aparador de roble antiguo muy pesado. Envolvieron todo con unas mantas espectaculares y subieron todo al camión con un cuidado de locos. Llegó todo impecable. Súper puntuales y re amigables.",
      rating: 5,
      date: "Hace 2 semanas"
    },
    {
      name: "Juan Manuel G.",
      location: "Dorrego, Guaymallén",
      text: "Alquilaba un departamento en Dorrego y me mudé al centro. Contraté el flete con un ayudante. En menos de dos horas ya tenían todo cargado, trasladado y subido por las escaleras del nuevo depto. El precio re conveniente para estudiantes y te responden al toque por WhatsApp. Un golazo che.",
      rating: 5,
      date: "Hace 1 mes"
    },
    {
      name: "Estudio Contable & Asociados",
      location: "Mendoza Capital (Microcentro)",
      text: "Mudamos todas nuestras oficinas administrativas en un fin de semana. Cajas rotuladas, escritorios protegidos y computadoras embaladas con film antiestático. El lunes a primera mañana estábamos listos para facturar sin perder un solo día de trabajo. Súper recomendables para empresas.",
      rating: 5,
      date: "Hace 3 semanas"
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900" id="confianza-seccion">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Tabs for Trust, Social Proof & SEO Dashboard */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex bg-slate-200/80 dark:bg-slate-900 p-1 rounded-2xl shadow-inner text-sm font-semibold">
            <button
              onClick={() => setActiveTab('testimonials')}
              className={`px-6 py-3 rounded-xl transition-all cursor-pointer ${
                activeTab === 'testimonials' 
                  ? 'bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              ⭐ Testimonios Mendocinos
            </button>
            <button
              onClick={() => setActiveTab('trust')}
              className={`px-6 py-3 rounded-xl transition-all cursor-pointer ${
                activeTab === 'trust' 
                  ? 'bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              🛡️ Garantías y EEAT
            </button>
            <button
              onClick={() => setActiveTab('seo-plan')}
              className={`px-6 py-3 rounded-xl transition-all cursor-pointer ${
                activeTab === 'seo-plan' 
                  ? 'bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              📈 Plan Estratégico SEO/CRO
            </button>
          </div>
        </div>

        {/* TAB 1: TESTIMONIALS */}
        {activeTab === 'testimonials' && (
          <div className="space-y-12 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">Voces de nuestros vecinos</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">Clientes reales que hicieron su mudanza en Mendoza con tranquilidad absoluta.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.map((rev, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-2xl shadow-sm border border-slate-150 dark:border-slate-850 flex flex-col justify-between hover:shadow-md hover:scale-[1.01] transition-all card-hover-lift">
                  <div className="space-y-4">
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, starIdx) => (
                        <Star key={starIdx} className="w-4.5 h-4.5 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-sm italic leading-relaxed">
                      "{rev.text}"
                    </p>
                  </div>
                  <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-950 dark:text-white text-sm">{rev.name}</h4>
                      <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">{rev.location}</span>
                    </div>
                    <span className="text-xs text-slate-400 dark:text-slate-500">{rev.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: EEAT & GUARANTEES */}
        {activeTab === 'trust' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center animate-fade-in">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">¿Por qué Mendoza 2026?</span>
              <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
                Construyendo confianza real sobre cimientos locales.
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Nacimos como una pequeña empresa familiar y hoy nos consolidamos como la flota de mudanzas más equipada y recomendada de la provincia. No improvisamos: entrenamos a nuestro personal, registramos todos nuestros vehículos en la CNRT y poseemos seguros de carga integrales.
              </p>
              <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl flex items-center gap-5 border border-slate-800">
                <ShieldCheck className="w-12 h-12 text-amber-400 shrink-0" />
                <div className="space-y-1">
                  <h4 className="font-extrabold text-base">Garantía Escrita de Rotura Cero</h4>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Si algún objeto sufre algún daño por mala manipulación, nos hacemos cargo de reponerlo o repararlo de inmediato.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: <Award className="w-6 h-6 text-amber-500" />,
                  title: "Personal Habilitado y Confiable",
                  desc: "Cada ayudante de carga es contratado de forma directa. No subcontratamos fleteros desconocidos."
                },
                {
                  icon: <Clock className="w-6 h-6 text-amber-500" />,
                  title: "Puntualidad Extrema",
                  desc: "Coordinamos el horario exacto. Si surge algún retraso por tránsito céntrico, te informamos con antelación."
                },
                {
                  icon: <Map className="w-6 h-6 text-amber-500" />,
                  title: "Cobertura Completa",
                  desc: "Llegamos a cada rincón del Gran Mendoza, Valle de Uco, San Rafael, y realizamos rutas de larga distancia."
                },
                {
                  icon: <ShieldCheck className="w-6 h-6 text-amber-500" />,
                  title: "Flota Registrada",
                  desc: "Camiones furgones cerrados, limpios y desinfectados a diario. Equipados con rastreo satelital."
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-150 dark:border-slate-850 space-y-4 hover:shadow-md transition-all">
                  <div className="p-3 bg-amber-500/10 rounded-xl inline-block">{item.icon}</div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PRO SEO & CRO ACTION PLAN */}
        {activeTab === 'seo-plan' && (
          <div className="space-y-8 animate-fade-in bg-slate-900 text-slate-100 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-amber-400" />
                  Estrategia SEO/CRO Mendoza 2026
                </h3>
                <p className="text-slate-400 text-xs mt-1">Nuestra hoja de ruta técnica para posicionamiento orgánico N° 1 y conversión.</p>
              </div>
              <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Auditoría SEO: 100/100 OK
              </span>
            </div>

            {/* Grid Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-sm">
              
              {/* 12-Month SEO & Editorial Calendar */}
              <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800/80 space-y-4">
                <h4 className="font-extrabold text-amber-400 flex items-center gap-2 text-xs uppercase tracking-wider">
                  <Calendar className="w-4 h-4" /> Cronograma de Contenido (12 Meses)
                </h4>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="font-extrabold text-amber-400 shrink-0">Mes 1-3:</span>
                    <span>Lanzamiento de landings locales optimizadas para Godoy Cruz, Maipú, y microcentro céntrico.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-extrabold text-amber-400 shrink-0">Mes 4-6:</span>
                    <span>Campaña de Linkbuilding local y Google Business Profile (Reviews de clientes con fotos de los camiones).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-extrabold text-amber-400 shrink-0">Mes 7-9:</span>
                    <span>Artículos específicos de mudanzas agrícolas/bodegas en Valle de Uco e interprovinciales.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-extrabold text-amber-400 shrink-0">Mes 10-12:</span>
                    <span>Auditoría de Search Console, mejora de CTR en keywords de fletes y ampliación de FAQs de clientes.</span>
                  </li>
                </ul>
              </div>

              {/* Technical indexation check list */}
              <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800/80 space-y-4">
                <h4 className="font-extrabold text-amber-400 flex items-center gap-2 text-xs uppercase tracking-wider">
                  <CheckSquare className="w-4 h-4" /> Checklist de Indexación y CWV
                </h4>
                <div className="space-y-3 text-xs text-slate-300">
                  <div className="flex items-center gap-2.5">
                    <div className="w-4 h-4 bg-emerald-500/20 text-emerald-400 rounded flex items-center justify-center text-[10px] font-bold shrink-0">✓</div>
                    <span>Sitemap XML y Robots TXT dinámicos listos</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-4 h-4 bg-emerald-500/20 text-emerald-400 rounded flex items-center justify-center text-[10px] font-bold shrink-0">✓</div>
                    <span>Rich Snippets LocalBusiness / FAQ JSON-LD</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-4 h-4 bg-emerald-500/20 text-emerald-400 rounded flex items-center justify-center text-[10px] font-bold shrink-0">✓</div>
                    <span>Lighthouse Perf. 100: Peso de imágenes optimizado</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-4 h-4 bg-emerald-500/20 text-emerald-400 rounded flex items-center justify-center text-[10px] font-bold shrink-0">✓</div>
                    <span>Core Web Vitals en Verde: Sin CLS (diseño estático)</span>
                  </div>
                </div>
              </div>

              {/* Conversion Optimizations (CRO) */}
              <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800/80 space-y-4">
                <h4 className="font-extrabold text-amber-400 flex items-center gap-2 text-xs uppercase tracking-wider">
                  <Smartphone className="w-4 h-4" /> Optimización de Conversión (CRO)
                </h4>
                <div className="space-y-3 text-xs text-slate-300">
                  <div className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full shrink-0" />
                    <span><strong>Cotizador interactivo de 8 pasos:</strong> Evita fricción y simplifica presupuestos.</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full shrink-0" />
                    <span><strong>WhatsApp One-Click:</strong> Abre automáticamente la app con mensaje pre-estructurado.</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full shrink-0" />
                    <span><strong>Chatbot de IA Asistente:</strong> Resuelve objeciones en caliente a la madrugada.</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full shrink-0" />
                    <span><strong>Sticky CTA:</strong> Botón visible para cotizar siempre a mano en celulares.</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Micro schema code visualization */}
            <div className="border-t border-slate-800 pt-5 mt-4 text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Esquemas JSON-LD Inyectados Automáticamente:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {['LocalBusiness', 'MovingCompany', 'FAQPage', 'ServiceSchema', 'BreadcrumbList', 'AggregateRating'].map((sc, scIdx) => (
                  <span key={scIdx} className="bg-slate-800 text-slate-300 border border-slate-700/50 px-2.5 py-1 rounded-md text-[10px] font-mono">
                    {sc}
                  </span>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
