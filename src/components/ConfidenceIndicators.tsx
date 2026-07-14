import React, { useState } from 'react';
import { 
  Star, 
  ShieldCheck, 
  Clock, 
  Award, 
  Map 
} from 'lucide-react';

export default function ConfidenceIndicators() {
  const [activeTab, setActiveTab] = useState<'testimonials' | 'trust'>('testimonials');

  const reviews = [
    {
      name: "Mariela S.",
      location: "Chacras de Coria",
      text: "Excelente servicio. Mudamos una casa completa el mes pasado con la seguridad de la flota de Mudanzas Miranda. Teníamos miedo por la vajilla fina y un aparador de roble antiguo muy pesado. Envolvieron todo con unas mantas espectaculares y subieron todo al camión con un cuidado de locos. Llegó todo impecable. Súper puntuales y re amigables.",
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
      text: "Mudamos todas nuestras oficinas administrativas en un fin de semana con camiones pesados Miranda de última generación. Cajas rotuladas, escritorios protegidos y computadoras embaladas con film antiestático. El lunes a primera mañana estábamos listos para facturar sin perder un solo día de trabajo. Súper recomendables para empresas.",
      rating: 5,
      date: "Hace 3 semanas"
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900" id="confianza-seccion">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Tabs for Trust and Social Proof */}
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
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest font-mono">Respaldo Miranda & Sancor Seguros</span>
              <h3 className="text-3xl sm:text-4xl font-display font-black text-slate-950 dark:text-white tracking-tight leading-tight">
                Construyendo confianza real sobre cimientos de verdad.
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Operamos de manera directa bajo la tutela logística y con la inmensa flota pesada de <strong className="text-slate-900 dark:text-white font-bold">Mudanzas Miranda</strong> (más de 50 años liderando Cuyo). Esto nos permite brindarte la máxima infraestructura tradicional combinada con nuestra innovadora plataforma digital de cotización.
              </p>
              <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl flex items-center gap-5 border border-slate-800 shadow-xl">
                <ShieldCheck className="w-12 h-12 text-amber-400 shrink-0" />
                <div className="space-y-1">
                  <h4 className="font-extrabold text-base text-amber-400">Póliza Sancor Seguros Activa</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Cada traslado cuenta con cobertura integral ante cualquier siniestro o rotura imprevista. Tu patrimonio está respaldado bajo contrato oficial.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: <Award className="w-6 h-6 text-amber-500" />,
                  title: "Tutela de Mudanzas Miranda",
                  desc: "Acceso ilimitado a grúas de altura, camiones semirremolques de gran porte y operarios calificados con legajo intachable."
                },
                {
                  icon: <Clock className="w-6 h-6 text-amber-500" />,
                  title: "Puntualidad de Guardia 24hs",
                  desc: "Coordinamos el horario exacto. Contamos con vehículos de relevo y atención de emergencia permanente."
                },
                {
                  icon: <Map className="w-6 h-6 text-amber-500" />,
                  title: "Habilitación CNRT Nacional",
                  desc: "Toda nuestra flota de camiones pesados y utilitarios medianos cumple con la normativa nacional de cargas y tránsito interprovincial."
                },
                {
                  icon: <ShieldCheck className="w-6 h-6 text-amber-500" />,
                  title: "Inventario Digital & Seguro",
                  desc: "Generamos un inventario precintado en el sistema para que realices un seguimiento claro y transparente de tus bienes."
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-150 dark:border-slate-850 space-y-4 hover:shadow-md transition-all card-hover-lift">
                  <div className="p-3 bg-amber-500/10 rounded-xl inline-block">{item.icon}</div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}



      </div>
    </section>
  );
}
