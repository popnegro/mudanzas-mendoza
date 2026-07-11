import React, { useState } from 'react';
import { 
  ArrowUpCircle, 
  Warehouse, 
  PackageOpen, 
  ShieldCheck, 
  HeartHandshake, 
  Search, 
  CheckCircle, 
  Sparkles, 
  Info,
  TrendingUp,
  XCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PillarData {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  content: string;
  competitorsLacking: string[];
  whyWeAreBetter: string;
  items: string[];
}

export default function AuditedValueSection() {
  const [activeTab, setActiveTab] = useState<string>('altura');
  const [showAuditModal, setShowAuditModal] = useState<boolean>(false);

  // 5 Pillars identified through search grounding that are missing or poorly represented in typical Mendoza moving sites
  const PILLARS: PillarData[] = [
    {
      id: 'altura',
      title: 'Mudanza en Altura (Izamiento por Balcón)',
      subtitle: 'Sogas náuticas y poleas para objetos de gran porte',
      icon: <ArrowUpCircle className="w-5.5 h-5.5" />,
      content: 'En la Ciudad de Mendoza (Capital), especialmente en zonas de departamentos como la Quinta, Sexta Sección o Barrio Bombal, los accesos son un gran reto. Sommiers King Size, sillones de tres cuerpos o pianos de cola no pasan por el ascensor o las escaleras caracol de edificios antiguos. La mayoría de los fletes estándar no ofrecen esta solución.',
      competitorsLacking: ['Fletes comunes de cuadra', 'Servicios informales de mudanza', 'Mudanzas estándar sin personal certificado'],
      whyWeAreBetter: 'Contamos con técnicos certificados en trabajos de altura, equipados con arneses de seguridad homologados, poleas de tres vías y sogas náuticas trenzadas de alta densidad con resistencia de hasta 1800 kg. Subimos tus pertenencias por el exterior de forma rápida y sin un solo rasguño en tu fachada o balcón.',
      items: [
        'Sistemas de aparejos y poleas mecánicas de tres vías',
        'Sogas náuticas de alta densidad que evitan fricción dañina',
        'Técnicos certificados con seguro de accidentes personales activo',
        'Apto para pianos, sommiers, cajas fuertes y sillones grandes'
      ]
    },
    {
      id: 'guardamuebles',
      title: 'Guardamuebles Privado y Monitoreado',
      subtitle: 'Bauleras individuales secas para transiciones sin prisa',
      icon: <Warehouse className="w-5.5 h-5.5" />,
      content: 'Cuando se vence un contrato de alquiler o se retrasa la entrega de una nueva casa en Luján de Cuyo, Maipú o Godoy Cruz, surge la pregunta de dónde dejar los muebles. La mayoría de los competidores locales tercerizan este servicio o no ofrecen control de plagas adecuado para el clima seco de Mendoza.',
      competitorsLacking: ['Fletes express locales', 'Agencias informales de acarreo de fin de semana'],
      whyWeAreBetter: 'Ofrecemos bauleras individuales y cerradas desde 6m³ hasta 40m³, completamente herméticas para evitar el ingreso del polvo mendocino. Nuestras instalaciones cuentan con control continuo de temperatura y humedad, fumigación periódica, alarmas contra incendios, monitoreo por cámaras IP 24hs y seguro contra robo.',
      items: [
        'Bauleras individuales con candado propio del cliente',
        'Monitoreo por cámaras de seguridad IP las 24 horas',
        'Aislamiento térmico y control estricto de humedad y plagas',
        'Seguro integral contra incendio y robo ya incluido'
      ]
    },
    {
      id: 'embalaje',
      title: 'Embalaje Eco-Premium y Canastos',
      subtitle: 'Canastos plásticos desinfectados y percheros móviles',
      icon: <PackageOpen className="w-5.5 h-5.5" />,
      content: 'Mudar vajilla, copas de cristal o trajes delicados sin la protección adecuada es una receta para el desastre. Los sitios tradicionales te exigen que consigas tus propias cajas de cartón o te cobran precios altísimos por un rollo de burbuja pluribol común.',
      competitorsLacking: ['Fletistas informales', 'Servicios express de acarreo'],
      whyWeAreBetter: 'Proveemos canastos plásticos herméticos reutilizables y desinfectados en régimen de alquiler bonificado para embalar platos y vasos de forma rígida. Además, disponemos de percheros móviles tipo clóset para que tu ropa delicada (trajes, vestidos de fiesta, camisas) viaje colgada directamente del placard al camión sin doblarse ni arrugarse.',
      items: [
        'Canastos plásticos de alto impacto sanitizados después de cada uso',
        'Percheros móviles con barral de colgado incorporado',
        'Pluribol de alta densidad (burbuja grande) y cartón corrugado reforzado',
        'Mantas de algodón grueso industrial para amortiguar muebles pesados'
      ]
    },
    {
      id: 'seguro',
      title: 'Seguro de Tránsito Total Bonificado',
      subtitle: 'Pólizas de primera línea emitidas en el acto',
      icon: <ShieldCheck className="w-5.5 h-5.5" />,
      content: 'Muchos transportistas en Mendoza afirman tener "seguro", pero en realidad solo cuentan con el seguro obligatorio de automotor (RC vehicular), el cual no cubre el robo o daño de tu heladera, tu juego de comedor o tu televisor si ocurre un percance en la ruta o durante el acarreo.',
      competitorsLacking: ['Gran parte de los fletes informales de Mendoza', 'Servicios compartidos no registrados'],
      whyWeAreBetter: 'Cada mudanza realizada por nosotros cuenta con una póliza de transporte específica de primera línea (con Sancor Seguros y Federación Patronal) que cubre robo, incendio, colisión y daños por manipulación durante la carga y descarga. Te enviamos el certificado de cobertura digital a tu WhatsApp antes de arrancar.',
      items: [
        'Cobertura civil total: desde que tomamos el mueble hasta que lo apoyamos',
        'Alianza con Sancor Seguros y Federación Patronal de Mendoza',
        'Póliza digital en PDF directo a tu WhatsApp para máxima transparencia',
        'Habilitaciones completas CNRT y tasas de vialidad al día'
      ]
    },
    {
      id: 'petflora',
      title: 'Mudanza Pet-Friendly y Resguardo Floral',
      subtitle: 'Traslado seguro de tus mascotas y plantas de jardín',
      icon: <HeartHandshake className="w-5.5 h-5.5" />,
      content: 'Las mascotas sufren niveles de estrés altísimos durante el desarme y traslado de un hogar, mientras que las queridas plantas del jardín mendocino sufren deshidratación extrema si viajan expuestas al calor, viento Zonda o en camiones abiertos.',
      competitorsLacking: ['Servicios informales de fletes', 'Mudanzas Stocco (servicios tradicionales sin protocolo ecológico/mascotas)'],
      whyWeAreBetter: 'Diseñamos un protocolo especial para mudanzas familiares de Mendoza. Te brindamos caniles portátiles sanitizados sin cargo adicional, recomendaciones de veterinarios locales para reducir la ansiedad de tus perros y gatos, y furgones climatizados especiales para trasladar macetas y plantas delicadas de manera que no sientan el shock del viaje.',
      items: [
        'Caniles transportadores rígidos medianos y grandes de cortesía',
        'Zona del furgón ventilada y sombreada exclusiva para plantas de maceta',
        'Tips interactivos con pautas de adaptación pre y post mudanza',
        'Asistencia paciente de ayudantes entrenados en el trato amigable de animales'
      ]
    }
  ];

  const activePillar = PILLARS.find(p => p.id === activeTab) || PILLARS[0];

  return (
    <section className="bg-slate-100 dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-850 py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative">
      {/* Decorative dynamic badge */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow flex items-center gap-1.5 animate-pulse">
        <Sparkles className="w-3.5 h-3.5 shrink-0" />
        Valor Auditado Mendoza 2026
      </div>

      <div className="max-w-7xl mx-auto space-y-16 text-left">
        {/* Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-extrabold text-amber-600 dark:text-amber-500 uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full inline-block">
              Análisis Competitivo de Calidad
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              ¿Qué Ofrecemos que Otros No Tienen?
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed">
              Auditamos los servicios de las 5 principales empresas de mudanzas y fletes de Mendoza Capital y alrededores. Identificamos las mayores carencias informativas y operativas de la plaza, y las convertimos en <strong>nuestras especialidades estandarizadas</strong>.
            </p>
          </div>

          <button
            onClick={() => setShowAuditModal(true)}
            className="inline-flex items-center gap-2 border border-slate-300 dark:border-slate-700 hover:bg-slate-200/50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 px-6 py-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm self-start md:self-auto shrink-0"
          >
            <Search className="w-4 h-4 text-amber-500" />
            Ver Reporte de Auditoría
          </button>
        </div>

        {/* Competitor analysis summarized banner */}
        <div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-5 sm:items-center justify-between text-slate-700 dark:text-slate-300">
          <div className="flex gap-4">
            <span className="text-4xl shrink-0">📊</span>
            <div className="space-y-1.5">
              <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">Conclusión del Análisis en Mendoza (2026):</h4>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-400 max-w-3xl">
                La mayoría de las empresas tradicionales en Mendoza destacan en trayectos largos y camiones grandes, pero descuidan aspectos críticos como la cotización digital, el cuidado de mascotas, el embalaje especializado o el izamiento en altura. Por eso, nuestra empresa madre <strong>Mudanzas Miranda</strong> (con 50 años de experiencia de primer nivel) creó <strong>Mudanzas Mendoza 2026</strong>: una división digital premium para unificar la máxima infraestructura y solidez de trayectoria con la mejor tecnología de vanguardia y servicios certificados.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Layout of 5 High-Value Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Navigation Tabs - Left Side (4 cols) */}
          <div className="lg:col-span-4 space-y-3.5">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block pl-2">
              Nuestras 5 Especialidades Destacadas:
            </span>
            <div className="flex flex-col gap-3">
              {PILLARS.map((p) => {
                const isActive = p.id === activeTab;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActiveTab(p.id)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all flex items-center justify-between group cursor-pointer ${
                      isActive 
                        ? 'bg-white dark:bg-slate-900 border-amber-500 dark:border-amber-500 shadow-md text-slate-950 dark:text-white' 
                        : 'bg-transparent border-slate-200 dark:border-slate-800 hover:bg-white/40 dark:hover:bg-slate-900/30 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`p-3 rounded-xl transition-colors ${
                        isActive ? 'bg-amber-500 text-slate-950' : 'bg-slate-200 dark:bg-slate-800 text-slate-500 group-hover:text-amber-500'
                      }`}>
                        {p.icon}
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm md:text-base font-extrabold leading-snug">{p.title}</h4>
                        <span className="text-[10px] text-slate-400 block mt-1 line-clamp-1">{p.subtitle}</span>
                      </div>
                    </div>
                    <ArrowRight className={`w-4 h-4 transition-transform shrink-0 ${
                      isActive ? 'text-amber-500 translate-x-1' : 'text-slate-300 dark:text-slate-700 group-hover:translate-x-0.5'
                    }`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Pane - Right Side (8 cols) */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl shadow-sm p-8 sm:p-10 lg:p-12 space-y-8">
            
            {/* Header of Content */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <span className="text-3xl">🏆</span>
                  <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 dark:text-white">{activePillar.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 font-medium">{activePillar.subtitle}</p>
              </div>
              <span className="text-[10px] font-extrabold bg-amber-500/10 text-amber-600 dark:text-amber-400 px-3.5 py-1.5 rounded-full border border-amber-500/20 self-start sm:self-auto">
                Servicio Premium Incluido
              </span>
            </div>

            {/* Content Text & Competitors list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              
              {/* Left Column: Context & Weakness */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-amber-500" /> El problema en el mercado actual:
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {activePillar.content}
                  </p>
                </div>

                <div className="bg-rose-500/5 border border-rose-500/10 rounded-2xl p-5 space-y-3">
                  <h5 className="text-[11px] font-extrabold text-rose-500 uppercase tracking-wider flex items-center gap-1">
                    <XCircle className="w-4 h-4 shrink-0" /> Carencia en otros fletes:
                  </h5>
                  <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
                    {activePillar.competitorsLacking.map((c, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-rose-500">✕</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Our super power */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-500" /> Nuestra propuesta superadora:
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {activePillar.whyWeAreBetter}
                  </p>
                </div>

                <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-5 space-y-3">
                  <h5 className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 shrink-0 text-emerald-500" /> ¿Qué incluye nuestro servicio?
                  </h5>
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 font-medium">
                    {activePillar.items.map((it, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-emerald-500">✓</span> {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

            {/* Bottom Conversion Tip */}
            <div className="pt-5 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400 flex items-center gap-2">
              <span className="text-amber-500 text-base">💡</span>
              <span>Podés solicitar e incluir cualquiera de estas modalidades especiales en el paso final de nuestro cotizador interactivo.</span>
            </div>

          </div>

        </div>
      </div>

      {/* Audit Detail Modal */}
      <AnimatePresence>
        {showAuditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAuditModal(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-slate-900 border border-slate-800 text-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 relative shadow-2xl text-left space-y-6 z-10"
            >
              <button
                onClick={() => setShowAuditModal(false)}
                className="absolute top-4.5 right-4.5 text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-slate-850 cursor-pointer"
                aria-label="Cerrar modal"
              >
                <span className="text-lg">✕</span>
              </button>

              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 px-2.5 py-1 rounded-full inline-block">
                  Reporte de Campo 2026
                </span>
                <h3 className="text-2xl font-extrabold tracking-tight">Reporte de Auditoría: Mercado de Mudanzas en Mendoza</h3>
                <p className="text-slate-400 text-xs">
                  Análisis de las 5 primeras posiciones en búsquedas locales (Google / Directorios de Mendoza).
                </p>
              </div>

              <div className="space-y-4 text-xs leading-relaxed text-slate-300">
                <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-850 space-y-2 ring-1 ring-amber-500/30">
                  <h4 className="font-bold text-amber-400 text-sm flex items-center justify-between">
                    <span>1. Mudanzas Miranda — Empresa Madre</span>
                    <span className="text-[9px] bg-amber-500 text-slate-950 px-2 py-0.5 rounded font-black uppercase">Respaldo Oficial</span>
                  </h4>
                  <p>
                    <strong>Nuestra Trayectoria:</strong> Con más de 50 años liderando el transporte en la región de Cuyo, Mudanzas Miranda provee los camiones furgonados de gran porte, la base operativa central y las pólizas integrales de Sancor Seguros.
                  </p>
                  <p className="text-emerald-400">
                    <strong>Nuestra Innovación 2026:</strong> Para solucionar las debilidades del sector, creamos esta división 100% digital que incorpora cotización automatizada, checklists interactivos con IA, embalaje Eco-Premium con canastos plásticos rígidos y protocolo Pet-Friendly de resguardo.
                  </p>
                </div>

                <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-850 space-y-2">
                  <h4 className="font-bold text-amber-400 text-sm">2. Mudanzas Stocco (Juan Carlos Stocco e Hijos)</h4>
                  <p>
                    <strong>Fuerte:</strong> Una de las firmas con más tradición familiar. Poseen instalaciones de guardamuebles propias y grúas para levantar objetos ultra pesados (como pianos y cajas fuertes de bancos).
                  </p>
                  <p className="text-rose-400">
                    <strong>Contenido Faltante / Debilidad:</strong> Su sitio web es extremadamente antiguo y estático. No disponen de cotizador digital instantáneo, ni planificación inteligente con IA, ni pautas pet-friendly detalladas para mudanzas libres de estrés.
                  </p>
                </div>

                <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-850 space-y-2">
                  <h4 className="font-bold text-amber-400 text-sm">3. Mudanzas El Mendocino</h4>
                  <p>
                    <strong>Fuerte:</strong> Excelente disposición para desarme y armado básico de mobiliario y embalaje de vajilla con plástico burbuja.
                  </p>
                  <p className="text-rose-400">
                    <strong>Contenido Faltante / Debilidad:</strong> No brindan servicio de izamiento por soga/balcón para edificios altos del centro, y carecen de una política transparente de seguro de carga integral que resguarde los bienes durante la carga y descarga física de los peones.
                  </p>
                </div>

                <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-850 space-y-2">
                  <h4 className="font-bold text-amber-400 text-sm">4. Mudanzas Morillas</h4>
                  <p>
                    <strong>Fuerte:</strong> Son altamente eficientes en el izamiento de grandes bultos por el balcón exterior de edificios.
                  </p>
                  <p className="text-rose-400">
                    <strong>Contenido Faltante / Debilidad:</strong> Están muy enfocados en el microcentro de Mendoza y no asisten adecuadamente a barrios cerrados de Maipú/Luján con reglamentaciones de ingreso complejas. Tampoco disponen de canastos plásticos herméticos para vajilla.
                  </p>
                </div>

                <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-850 space-y-2">
                  <h4 className="font-bold text-amber-400 text-sm">5. Mudanzas García</h4>
                  <p>
                    <strong>Fuerte:</strong> Utilizan de manera adecuada canastos plásticos rígidos y percheros de tela para la ropa.
                  </p>
                  <p className="text-rose-400">
                    <strong>Contenido Faltante / Debilidad:</strong> Su cobertura geográfica es limitada y no cuentan con protocolos de resguardo ecológico de plantas de jardín (clave para el clima árido y caluroso mendocino) ni de cuidado animal.
                  </p>
                </div>
              </div>

              <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20 text-xs text-amber-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>
                  <strong>Unión de Fuerzas Perfecta:</strong> Mudanzas Mendoza 2026 representa la evolución digital de Mudanzas Miranda. Tenés la tranquilidad de 50 años de experiencia de una marca líder combinada con las herramientas interactivas más veloces y sustentables de Mendoza.
                </span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setShowAuditModal(false)}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Cerrar Reporte de Auditoría
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
