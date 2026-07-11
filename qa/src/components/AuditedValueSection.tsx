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

  const PILLARS: PillarData[] = [
    {
      id: 'altura',
      title: 'Mudanza en Altura (Izamiento por Balcón)',
      subtitle: 'Sogas náuticas y poleas para objetos de gran porte',
      icon: <ArrowUpCircle className="w-5 h-5" />,
      content: 'Para departamentos en Quinta/Sexta Sección o Barrio Bombal con escaleras estrechas, subir sommiers King Size o sillones requiere técnicas especializadas que los fletes comunes no brindan.',
      competitorsLacking: ['Fletes comunes de cuadra', 'Mudanzas estándar sin personal certificado'],
      whyWeAreBetter: 'Personal certificado en altura con arneses homologados y poleas mecánicas de tres vías de alta densidad (resistencia hasta 1800 kg). Garantía total de cuidado exterior.',
      items: [
        'Sistemas de poleas de tres vías',
        'Sogas náuticas anti-fricción',
        'Técnicos asegurados contra accidentes',
        'Apto para pianos, sommiers y sillones'
      ]
    },
    {
      id: 'guardamuebles',
      title: 'Guardamuebles Privado y Monitoreado',
      subtitle: 'Bauleras individuales secas para transiciones sin prisa',
      icon: <Warehouse className="w-5 h-5" />,
      content: 'Si se demora tu casa nueva en Maipú, Luján o Godoy Cruz, proveemos resguardo seguro. Evitá fletes informales que tercerizan o descuidan tus pertenencias.',
      competitorsLacking: ['Fletes express locales', 'Agencias informales sin depósito propio'],
      whyWeAreBetter: 'Bauleras herméticas individuales (6m³ a 40m³) con control de plagas para el clima de Mendoza. Monitoreo IP 24hs, alarma contra incendios y seguro activo.',
      items: [
        'Candado exclusivo del cliente',
        'Monitoreo por cámaras IP las 24hs',
        'Aislamiento térmico y control de polvo',
        'Seguro de tránsito total Sancor Seguros'
      ]
    },
    {
      id: 'embalaje',
      title: 'Embalaje Eco-Premium y Canastos',
      subtitle: 'Canastos plásticos desinfectados y percheros móviles',
      icon: <PackageOpen className="w-5 h-5" />,
      content: 'Proteger vajilla y cristales es clave. Olvidate de conseguir cajas rotas de cartón; nosotros resolvemos el embalaje con métodos rígidos y reutilizables.',
      competitorsLacking: ['Fletistas informales', 'Servicios express sin insumos'],
      whyWeAreBetter: 'Proveemos canastos plásticos herméticos sanitizados y percheros móviles tipo clóset para trasladar trajes y vestidos colgados de placard a placard sin arrugas.',
      items: [
        'Canastos rígidos sanitizados de cortesía',
        'Percheros móviles con barral incorporado',
        'Pluribol de alta densidad y cartón corrugado',
        'Mantas de algodón grueso industrial'
      ]
    },
    {
      id: 'seguro',
      title: 'Seguro de Tránsito Total Bonificado',
      subtitle: 'Pólizas de primera línea emitidas en el acto',
      icon: <ShieldCheck className="w-5 h-5" />,
      content: 'Muchos transportistas afirman tener "seguro", pero solo cubre daños del camión (RC), no tu heladera o TV si sufren un golpe durante el acarreo o tránsito.',
      competitorsLacking: ['Gran parte de los fletes no registrados', 'Servicios compartidos informales'],
      whyWeAreBetter: 'Cada viaje cuenta con póliza de transporte específica de Sancor Seguros o Federación Patronal, cubriendo todo riesgo desde la carga hasta la entrega final.',
      items: [
        'Cobertura civil puerta a puerta',
        'Alianza oficial con Sancor Seguros',
        'Certificado digital PDF directo a tu WhatsApp',
        'Habilitación nacional CNRT al día'
      ]
    },
    {
      id: 'petflora',
      title: 'Mudanza Pet-Friendly y Resguardo Floral',
      subtitle: 'Traslado seguro de tus mascotas y plantas de jardín',
      icon: <HeartHandshake className="w-5 h-5" />,
      content: 'Las mascotas y las plantas sufren con el estrés de mudarse o el viento Zonda. Diseñamos protocolos específicos de climatización y cuidado.',
      competitorsLacking: ['Servicios informales de fletes', 'Empresas tradicionales sin protocolos'],
      whyWeAreBetter: 'Ofrecemos caniles transportadores sanitizados de cortesía y furgones ventilados para resguardar tus plantas delicadas del calor extremo o viento.',
      items: [
        'Caniles rígidos medianos/grandes sin costo',
        'Zona de furgón ventilada exclusiva para plantas',
        'Guías interactivas de adaptación post-mudanza',
        'Ayudantes entrenados en trato amigable'
      ]
    }
  ];

  const activePillar = PILLARS.find(p => p.id === activeTab) || PILLARS[0];

  return (
    <section id="audited-value-section" className="bg-slate-50 dark:bg-slate-950 border-y border-slate-200/60 dark:border-slate-900 py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 text-amber-400 border border-slate-800 px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
        Diferencial Mendoza 2026
      </div>

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Intro */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 text-left">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-500 uppercase tracking-widest font-mono">
              Calidad Corporativa Comprobada
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-950 dark:text-white tracking-tight leading-none">
              ¿Qué nos diferencia de un flete común?
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              La solidez y flota propia de <strong className="font-bold text-slate-900 dark:text-slate-200">Mudanzas Miranda</strong> se fusionan con la plataforma digital de Mudanzas Mendoza para resolver lo que el mercado tradicional descuida.
            </p>
          </div>

          <button
            id="btn-ver-auditoria"
            onClick={() => setShowAuditModal(true)}
            className="inline-flex items-center gap-2 border border-slate-250 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900/60 text-slate-700 dark:text-slate-300 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm self-start"
          >
            <Search className="w-4 h-4 text-amber-500" />
            Ver Reporte de Auditoría
          </button>
        </div>

        {/* Interactive Layout of 5 High-Value Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Navigation Tabs - Left Side (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-2 text-left justify-center">
            {PILLARS.map((p) => {
              const isActive = p.id === activeTab;
              return (
                <button
                  key={p.id}
                  id={`tab-${p.id}`}
                  onClick={() => setActiveTab(p.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between group cursor-pointer ${
                    isActive 
                      ? 'bg-white dark:bg-slate-900 border-amber-500/50 dark:border-amber-500/50 shadow-md text-slate-950 dark:text-white' 
                      : 'bg-transparent border-slate-200/60 dark:border-slate-900 hover:bg-white/40 dark:hover:bg-slate-900/30 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg transition-colors ${
                      isActive ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 dark:bg-slate-900 text-slate-500 group-hover:text-amber-500'
                    }`}>
                      {p.icon}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold leading-tight">{p.title}</h4>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-0.5 line-clamp-1 font-medium">{p.subtitle}</span>
                    </div>
                  </div>
                  <ArrowRight className={`w-3.5 h-3.5 transition-transform shrink-0 ${
                    isActive ? 'text-amber-500 translate-x-1' : 'text-slate-300 dark:text-slate-700 group-hover:translate-x-0.5'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Content Pane - Right Side (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 rounded-2xl shadow-sm p-6 sm:p-8 flex flex-col justify-between text-left space-y-6">
            
            {/* Header of Content */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🛡️</span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-950 dark:text-white">{activePillar.title}</h3>
                </div>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">{activePillar.subtitle}</p>
              </div>
              <span className="text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full border border-amber-500/20 self-start sm:self-auto uppercase tracking-wide font-mono">
                Premium Incluido
              </span>
            </div>

            {/* Content Text & Lists */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Side: Problem & Alternative */}
              <div className="space-y-4">
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {activePillar.content}
                </p>
                <div className="bg-rose-500/5 border border-rose-500/10 rounded-xl p-4 space-y-2">
                  <h5 className="text-[10px] font-bold text-rose-500 uppercase tracking-wider flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5 shrink-0" /> Carencia de fletes comunes
                  </h5>
                  <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-500">
                    {activePillar.competitorsLacking.map((c, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 truncate">
                        <span className="text-rose-500 font-bold">✕</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Side: Our Edge & Included */}
              <div className="space-y-4">
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                  {activePillar.whyWeAreBetter}
                </p>
                <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4 space-y-2">
                  <h5 className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 shrink-0 text-emerald-500" /> ¿Qué incluye?
                  </h5>
                  <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300 font-medium">
                    {activePillar.items.map((it, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="text-emerald-500">✓</span> {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer note */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
              <span className="text-amber-500 text-sm">💡</span>
              <span>Podés solicitar estas opciones especiales directo desde el paso final del cotizador.</span>
            </div>

          </div>

        </div>
      </div>

      {/* Audit Detail Modal */}
      <AnimatePresence>
        {showAuditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAuditModal(false)}
              className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-slate-900 border border-slate-800 text-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 relative shadow-2xl text-left space-y-6 z-10"
            >
              <button
                id="close-audit-modal"
                onClick={() => setShowAuditModal(false)}
                className="absolute top-4.5 right-4.5 text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-slate-850 cursor-pointer"
                aria-label="Cerrar modal"
              >
                <span className="text-lg">✕</span>
              </button>

              <div className="space-y-1">
                <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 px-2.5 py-1 rounded-full inline-block font-mono">
                  Reporte de Campo
                </span>
                <h3 className="text-lg font-extrabold tracking-tight">Reporte de Auditoría: Mudanzas en Mendoza</h3>
                <p className="text-slate-400 text-xs">
                  Análisis comparativo de las empresas locales en el Gran Mendoza.
                </p>
              </div>

              <div className="space-y-3.5 text-xs leading-relaxed text-slate-300">
                <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-850 space-y-1.5 ring-1 ring-amber-500/30">
                  <h4 className="font-bold text-amber-400 text-xs flex items-center justify-between">
                    <span>1. Mudanzas Miranda (Empresa de Respaldo)</span>
                    <span className="text-[8px] bg-amber-500 text-slate-950 px-2 py-0.5 rounded font-black uppercase tracking-wider font-mono">Flota Propia</span>
                  </h4>
                  <p className="text-slate-300">
                    Aporta la sólida flota de gran porte pesada y las pólizas aprobadas de Sancor Seguros, logrando una trayectoria intachable de más de 50 años en la región cuyana.
                  </p>
                  <p className="text-emerald-400 font-semibold">
                    + Innovación digital, cotizador dinámico 2026, canastos plásticos rígidos sanitarios y pautas Pet-Friendly.
                  </p>
                </div>

                <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-850 space-y-1">
                  <h4 className="font-bold text-slate-300 text-xs">2. Competidores Tradicionales de Mendoza</h4>
                  <p className="text-slate-400">
                    Destacan en fletes simples de cortas distancias, pero carecen de cotizadores online transparentes en tiempo real, seguro de carga de tránsito civil integral homologado o izamientos profesionales seguros en altura para balcones céntricos.
                  </p>
                </div>
              </div>

              <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20 text-xs text-amber-400 flex items-center gap-2">
                <Sparkles className="w-4.5 h-4.5 shrink-0 text-amber-400" />
                <span>
                  <strong>La Unión Definitiva:</strong> Mudanzas Mendoza 2026 une la confiabilidad operativa tradicional de <strong>Mudanzas Miranda</strong> con la inteligencia y agilidad digital que merecés.
                </span>
              </div>

              <button
                id="btn-close-audit"
                onClick={() => setShowAuditModal(false)}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Cerrar Reporte
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
