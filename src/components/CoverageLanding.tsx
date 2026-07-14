import React, { useState, useMemo } from 'react';
import { DEPARTMENTS } from '../data';
import { DepartmentInfo } from '../types';
import CoverageMap from './CoverageMap';
import Breadcrumbs from './Breadcrumbs';
import { 
  MapPin, 
  Search, 
  Compass, 
  Warehouse, 
  Truck, 
  Clock, 
  ShieldCheck, 
  PhoneCall, 
  ArrowRight,
  ExternalLink,
  Map,
  Sparkles,
  Info,
  ChevronRight
} from 'lucide-react';

// Import official Mudanzas Miranda images for cards and banners
import mudanzaMirandaTruck from '../assets/images/mudanza_miranda_truck_1783676498398.jpg';
import mudanzasEquipoEmbalaje from '../assets/images/mudanzas_equipo_embalaje_1783676512881.jpg';

interface CoverageLandingProps {
  onBack: () => void;
  onNavigateDept: (slug: string) => void;
  onStartQuote: () => void;
}

interface CoverageRegion {
  name: string;
  base: string;
  time: string;
  fleet: string;
  description: string;
  slugs: string[];
}

const REGION_BREAKDOWN: CoverageRegion[] = [
  {
    name: 'Gran Mendoza Norte (Capital, Las Heras)',
    base: 'Base Central España (Av. España 1200, Mendoza Capital)',
    time: '20 - 30 minutos',
    fleet: '6 Camiones de Mudanza, 4 Furgones Express, 2 Grúas de Izamiento de altura',
    description: 'Servicio express prioritario con grúas certificadas de altura para balcones y calles céntricas de Mendoza Capital.',
    slugs: ['mendoza-capital', 'las-heras']
  },
  {
    name: 'Gran Mendoza Este (Guaymallén, Maipú)',
    base: 'Base Este Acceso (Lateral Sur Acceso Este, Guaymallén)',
    time: '30 - 40 minutos',
    fleet: '5 Camiones de Mudanza, 3 Furgones de Carga Rápida, Canastos Sanitizados',
    description: 'Nuestra base de distribución con canastos herméticos eco-premium de vajilla y furgones refrigerados para plantas de jardín.',
    slugs: ['guaymallen', 'maipu']
  },
  {
    name: 'Gran Mendoza Sur (Godoy Cruz, Luján, Chacras)',
    base: 'Base Sur Luján (Chacras de Coria / Luján de Cuyo)',
    time: '25 - 35 minutos',
    fleet: '4 Camiones de Carga Pesada, 2 Furgones Climatizados Pet-Friendly, 1 Grúa',
    description: 'Especialistas en mudanzas de gran porte en barrios cerrados, traslados con protocolo pet-friendly y cuidado de flora.',
    slugs: ['godoy-cruz', 'lujan-de-cuyo']
  },
  {
    name: 'Zona Este (San Martín, etc.)',
    base: 'Base Satélite Este (Ruta Nacional 7, San Martín)',
    time: '45 - 60 minutos',
    fleet: '4 Camiones de Larga Distancia, 2 Furgones de Enlace de Guardia',
    description: 'Servicio interdepartamental óptimo con tarifas planas unificadas para traslados desde o hacia el Gran Mendoza.',
    slugs: ['san-martin']
  }
];

export default function CoverageLanding({ onBack, onNavigateDept, onStartQuote }: CoverageLandingProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegionTab, setSelectedRegionTab] = useState<string>('todos');

  // Filter departments based on search query
  const filteredDepartments = useMemo(() => {
    return DEPARTMENTS.filter(dept => 
      dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const breadcrumbSteps = [
    { label: 'Inicio', onClick: onBack },
    { label: 'Nuestra Cobertura', isCurrent: true }
  ];

  return (
    <article className="py-12 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 animate-fade-in">
      
      {/* Breadcrumb Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Breadcrumbs steps={breadcrumbSteps} />
      </div>

      {/* Hero Header Section */}
      <div className="text-left max-w-3xl space-y-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-slate-950 dark:text-white leading-tight">
          Nuestra Cobertura Logística <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
            En Cada Rincón de Mendoza
          </span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Disponemos de múltiples bases operativas ubicadas estratégicamente en el Gran Mendoza, Valle de Uco y Zona Este. Esto nos permite garantizar tiempos de arribo menores a 40 minutos en emergencias y fletes planificados con rutas optimizadas por nuestra IA.
        </p>
      </div>

      {/* Map and Core Stats grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Col: Interactive Coverage Map Widget */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-850 rounded-3xl p-6 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Map className="w-5 h-5 text-amber-500" />
                <h2 className="text-lg font-bold text-slate-950 dark:text-white">Mapa Interactivo de Bases Logísticas</h2>
              </div>
              <span className="text-[10px] text-slate-400 font-bold bg-slate-200/50 dark:bg-slate-850 px-2.5 py-1 rounded-full">Hacé clic en los nodos</span>
            </div>
            
            <CoverageMap 
              departments={DEPARTMENTS} 
              onSelectDepartment={onNavigateDept} 
            />
          </div>

          {/* Quick tips about local parking or municipal rules */}
          <div className="bg-amber-500/5 dark:bg-amber-500/5 border border-amber-500/10 rounded-2xl p-5 text-left space-y-2.5">
            <h3 className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <Info className="w-4 h-4" /> Regulaciones Locales Importantes de Mendoza
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              En <strong>Mendoza Capital</strong> (Zona Arístides, microcentro) y <strong>Godoy Cruz</strong>, existen franjas horarias estrictas para estacionamiento de camiones de gran porte. Nosotros gestionamos los permisos municipales de carga y descarga sin cargo adicional para que no sufras multas.
            </p>
          </div>
        </div>

        {/* Right Col: Logistics Centers Specs */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-950 text-white rounded-3xl border border-slate-900 p-6 space-y-6">
            <h3 className="text-sm font-black uppercase text-amber-400 tracking-wider flex items-center gap-2">
              <Warehouse className="w-4 h-4" /> Especificaciones de Bases
            </h3>

            <div className="space-y-5">
              {REGION_BREAKDOWN.map((reg, i) => (
                <div key={i} className="border-b border-slate-900 pb-4.5 last:border-b-0 last:pb-0 space-y-2">
                  <h4 className="text-xs font-bold text-slate-200">{reg.name}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{reg.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-[10px] pt-1">
                    <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-850">
                      <span className="text-slate-500 block">Frecuencia de Guardia</span>
                      <strong className="text-emerald-400 font-bold">{reg.time}</strong>
                    </div>
                    <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-850">
                      <span className="text-slate-500 block">Flota Disponible</span>
                      <strong className="text-white truncate block">{reg.fleet.split(',')[0]}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={onStartQuote}
              className="w-full inline-flex items-center justify-center bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3.5 rounded-xl text-xs transition-all shadow-md cursor-pointer group"
            >
              Comenzar Cotización con Base Asignada
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Dynamic Department Search and Enlazado Interno Grid */}
      <div className="space-y-6 text-left pt-6 border-t border-slate-100 dark:border-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-500" />
              Explorador de Localidades Cubiertas
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Contamos con fletes específicos y tarifas personalizadas para cada departamento de la provincia.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative max-w-sm w-full">
            <input
              type="text"
              placeholder="Buscar departamento (ej: Luján, Maipú)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 dark:text-slate-100 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>
        </div>

        {/* Departments Grid */}
        {filteredDepartments.length === 0 ? (
          <div className="p-12 text-center bg-slate-50 dark:bg-slate-900 rounded-2xl border border-dashed border-slate-250 dark:border-slate-800 text-slate-400 text-xs">
            No encontramos fletes directos con el término de búsqueda, pero igualmente realizamos fletes interprovinciales. ¡Escribinos para cotizar!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredDepartments.map((dept) => {
              const isTruckImage = ['mendoza-capital', 'lujan-de-cuyo', 'godoy-cruz', 'maipu', 'san-martin', 'tunuyan'].includes(dept.id);
              const cardImage = isTruckImage ? mudanzaMirandaTruck : mudanzasEquipoEmbalaje;
              return (
                <div
                  key={dept.id}
                  className="bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-850 rounded-2xl p-4.5 hover:border-amber-500/30 dark:hover:border-amber-500/30 hover:shadow-md transition-all text-left flex flex-col justify-between space-y-4 relative overflow-hidden group"
                >
                  {/* Co-branded Department Image Card with SEO rich alt tags */}
                  <div className="w-full h-32 rounded-xl overflow-hidden relative border border-slate-200/60 dark:border-slate-800">
                    <img
                      src={cardImage}
                      alt={`Fletes rápidos y mudanzas en ${dept.name} Mendoza - Servicio oficial y flota de Mudanzas Miranda`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-slate-950/70 backdrop-blur-sm text-white px-2 py-0.5 rounded-md text-[9px] font-bold flex items-center gap-1">
                      <span>🍇</span>
                      <span>{dept.name}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-extrabold text-slate-950 dark:text-white text-sm">{dept.name}</h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {dept.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-[10px]">
                    <span className="text-emerald-500 font-bold">Fletes Asignados</span>
                    <button
                      onClick={() => onNavigateDept(dept.slug)}
                      className="inline-flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
                    >
                      Ver detalles de Zona
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Floating Conversion Booster */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent pointer-events-none" />
        
        <div className="text-left space-y-2 relative z-10 max-w-xl">
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Asistencia en Ruta Inmediata
          </span>
          <h3 className="text-lg sm:text-xl font-bold">¿Necesitás una mudanza urgente o programada de larga distancia?</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Nuestros choferes operan las 24 horas del día. Cotizá en línea y te derivamos de inmediato a la base operativa más cercana para abaratar costos de flete por kilómetro de regreso.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0 relative z-10 w-full md:w-auto">
          <button
            onClick={onStartQuote}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-3 rounded-xl text-xs shadow-md transition-all cursor-pointer text-center"
          >
            Cotizar Online
          </button>
          
          <a
            href="https://wa.me/5492612345678?text=Hola%2C%20necesito%20cobertura%20de%20mudanza%20urgente%20en%20Mendoza"
            target="_blank"
            rel="noreferrer"
            className="bg-slate-950 border border-slate-800 hover:bg-slate-900 text-white font-bold px-6 py-3 rounded-xl text-xs transition-all text-center inline-flex items-center justify-center gap-1.5"
          >
            <PhoneCall className="w-4 h-4 text-emerald-500" />
            Llamar a la Base
          </a>
        </div>
      </div>

    </article>
  );
}
