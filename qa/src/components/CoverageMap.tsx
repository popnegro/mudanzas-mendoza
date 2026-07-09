import React, { useState } from 'react';
import { 
  MapPin, 
  Layers, 
  Warehouse, 
  Truck, 
  Clock, 
  Phone, 
  CheckCircle, 
  Compass, 
  ArrowRight,
  ShieldCheck,
  Zap,
  ChevronRight
} from 'lucide-react';
import { DepartmentInfo } from '../types';

interface CoverageMapProps {
  departments: DepartmentInfo[];
  onSelectDepartment: (slug: string) => void;
}

interface RegionGroup {
  id: string;
  name: string;
  color: string;
  hoverColor: string;
  baseName: string;
  responseTime: string;
  fleet: string;
  departments: string[]; // Slugs of departments in this region
  cx: number; // For SVG visualization
  cy: number;
  r: number;
  description: string;
}

const REGION_GROUPS: RegionGroup[] = [
  {
    id: 'gran-mendoza-norte',
    name: 'Gran Mendoza Norte (Capital, Las Heras)',
    color: 'bg-amber-500/10 border-amber-500 text-amber-500',
    hoverColor: 'hover:bg-amber-500/20 hover:border-amber-400',
    baseName: 'Base Central España (Av. España 1200, Mendoza Capital)',
    responseTime: '20 - 30 minutos',
    fleet: '6 Camiones de Mudanza, 4 Furgones Express, 2 Grúas de Izamiento',
    departments: ['mendoza-capital', 'las-heras'],
    cx: 140,
    cy: 110,
    r: 45,
    description: 'Servicio express prioritario con grúas certificadas de altura para balcones y calles céntricas de Capital.'
  },
  {
    id: 'gran-mendoza-este',
    name: 'Gran Mendoza Este (Guaymallén, Maipú)',
    color: 'bg-emerald-500/10 border-emerald-500 text-emerald-500',
    hoverColor: 'hover:bg-emerald-500/20 hover:border-emerald-400',
    baseName: 'Base Este Acceso (Lateral Sur Acceso Este, Guaymallén)',
    responseTime: '30 - 40 minutos',
    fleet: '5 Camiones de Mudanza, 3 Furgones de Carga Rápida, Canastos Sanitizados',
    departments: ['guaymallen', 'maipu'],
    cx: 240,
    cy: 120,
    r: 45,
    description: 'Nuestra base de distribución con canastos herméticos eco-premium de vajilla y furgones refrigerados para plantas de jardín.'
  },
  {
    id: 'gran-mendoza-sur',
    name: 'Gran Mendoza Sur (Godoy Cruz, Luján, Chacras)',
    color: 'bg-blue-500/10 border-blue-500 text-blue-500',
    hoverColor: 'hover:bg-blue-500/20 hover:border-blue-400',
    baseName: 'Base Sur Luján (Chacras de Coria / Luján de Cuyo)',
    responseTime: '25 - 35 minutos',
    fleet: '4 Camiones de Carga Pesada, 2 Furgones Climatizados Pet-Friendly, 1 Grúa',
    departments: ['godoy-cruz', 'lujan-de-cuyo'],
    cx: 160,
    cy: 190,
    r: 45,
    description: 'Especialistas en mudanzas de gran porte en barrios cerrados, traslados con protocolo pet-friendly y cuidado de flora.'
  },
  {
    id: 'zona-este-rural',
    name: 'Zona Este (San Martín, Junín, Rivadavia, etc.)',
    color: 'bg-purple-500/10 border-purple-500 text-purple-500',
    hoverColor: 'hover:bg-purple-500/20 hover:border-purple-400',
    baseName: 'Base Satélite Este (Ruta Nacional 7, San Martín)',
    responseTime: '45 - 60 minutos',
    fleet: '4 Camiones de Larga Distancia, 2 Furgones de Enlace de Guardia',
    departments: ['san-martin', 'junin', 'rivadavia', 'santa-rosa', 'la-paz'],
    cx: 350,
    cy: 160,
    r: 50,
    description: 'Servicio interdepartamental óptimo con tarifas planas unificadas para traslados desde o hacia el Gran Mendoza.'
  },
  {
    id: 'valle-de-uco',
    name: 'Valle de Uco (Tunuyán, Tupungato, San Carlos)',
    color: 'bg-teal-500/10 border-teal-500 text-teal-500',
    hoverColor: 'hover:bg-teal-500/20 hover:border-teal-400',
    baseName: 'Base Valle de Uco (Ruta 40 Km 82, Tunuyán)',
    responseTime: '50 - 70 minutos',
    fleet: '3 Camiones Semirremolque, 2 Fletadoras de Macetas y Mudanza Ligera',
    departments: ['tunuyan', 'tupungato', 'san-carlos'],
    cx: 120,
    cy: 290,
    r: 45,
    description: 'Operativos en zonas de bodegas, viñedos y residencias familiares. Vehículos con suspensión neumática.'
  },
  {
    id: 'zona-sur-provincial',
    name: 'Zona Sur (San Rafael, Gral. Alvear, Malargüe)',
    color: 'bg-indigo-500/10 border-indigo-500 text-indigo-500',
    hoverColor: 'hover:bg-indigo-500/20 hover:border-indigo-400',
    baseName: 'Base Regional Sur (Av. Mitre 800, San Rafael)',
    responseTime: '60 - 90 minutos',
    fleet: '3 Camiones Grandes de Mudanza con Acoplado, Cobertura Integral Sancor',
    departments: ['san-rafael', 'general-alvear', 'malargue'],
    cx: 200,
    cy: 390,
    r: 55,
    description: 'Nuestra base de operaciones de larga distancia para conectar el sur mendocino con el resto de la provincia.'
  },
  {
    id: 'lavalle-norte',
    name: 'Lavalle (Norte Mendocino)',
    color: 'bg-rose-500/10 border-rose-500 text-rose-500',
    hoverColor: 'hover:bg-rose-500/20 hover:border-rose-400',
    baseName: 'Enlace Lavalle (Villa Tulumaya / Ruta 40)',
    responseTime: '40 - 50 minutos',
    fleet: '2 Camiones de Mudanza, 1 Furgón de Repuesto Express',
    departments: ['lavalle'],
    cx: 260,
    cy: 50,
    r: 35,
    description: 'Mudanzas de fincas, casas de campo y traslados rápidos hacia centros comerciales del Gran Mendoza.'
  }
];

export default function CoverageMap({ departments, onSelectDepartment }: CoverageMapProps) {
  const [activeLayer, setActiveLayer] = useState<'cobertura' | 'bases'>('cobertura');
  const [selectedRegionId, setSelectedRegionId] = useState<string>('gran-mendoza-norte');

  const activeRegion = REGION_GROUPS.find(r => r.id === selectedRegionId) || REGION_GROUPS[0];

  // Get department objects associated with the selected region
  const selectedRegionDepts = departments.filter(d => 
    activeRegion.departments.includes(d.slug)
  );

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl shadow-sm p-6 sm:p-8 space-y-8 text-left">
      
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xl">🗺️</span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Mapa Interactivo de Operaciones Mendoza
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Explorá nuestras áreas de cobertura real y la ubicación de nuestras bases logísticas de guardia.
          </p>
        </div>

        {/* Toggle Layer Switches */}
        <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 self-start md:self-auto shrink-0">
          <button
            onClick={() => setActiveLayer('cobertura')}
            className={`px-4 py-2 rounded-lg text-xs font-black tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
              activeLayer === 'cobertura' 
                ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm' 
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Zonas de Cobertura
          </button>
          <button
            onClick={() => setActiveLayer('bases')}
            className={`px-4 py-2 rounded-lg text-xs font-black tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
              activeLayer === 'bases' 
                ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm' 
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Warehouse className="w-3.5 h-3.5" />
            Bases Logísticas
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Map + Info Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Dynamic SVG Map (7 cols) */}
        <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-950/40 border border-slate-150 dark:border-slate-850 rounded-2xl p-4 flex flex-col items-center justify-center relative min-h-[380px] sm:min-h-[440px]">
          
          {/* Compass Rose Decoration */}
          <div className="absolute top-4 left-4 text-slate-300 dark:text-slate-800 flex items-center gap-1.5 pointer-events-none">
            <Compass className="w-5 h-5 animate-spin-slow" />
            <span className="text-[9px] font-bold tracking-widest uppercase">Gran Mendoza</span>
          </div>

          <div className="absolute top-4 right-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-[10px] space-y-1 text-slate-500 shadow-sm pointer-events-none">
            <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
              <span>💡 Modo de Uso:</span>
            </div>
            <div>Hacé clic en cualquier zona o base logística para cargar datos en tiempo real.</div>
          </div>

          {/* SVG Canvas Map */}
          <svg 
            viewBox="0 0 500 500" 
            className="w-full max-w-[420px] aspect-square transition-all filter drop-shadow-md relative z-10"
            aria-label="Mapa interactivo de Mendoza"
          >
            {/* Ambient grid lines in background */}
            <defs>
              <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-200/50 dark:text-slate-800/40" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" className="rounded-xl" />

            {/* Render Region Polygons / Circles */}
            {REGION_GROUPS.map((region) => {
              const isSelected = region.id === selectedRegionId;
              
              // Define specific colors for each layer
              let fillVal = isSelected ? 'rgba(245, 158, 11, 0.25)' : 'rgba(226, 232, 240, 0.3)';
              let strokeVal = isSelected ? '#f59e0b' : 'rgba(148, 163, 184, 0.5)';
              
              if (activeLayer === 'bases') {
                fillVal = isSelected ? 'rgba(245, 158, 11, 0.15)' : 'rgba(15, 23, 42, 0.05)';
                strokeVal = isSelected ? '#f59e0b' : 'rgba(148, 163, 184, 0.3)';
              }

              return (
                <g 
                  key={region.id}
                  onClick={() => setSelectedRegionId(region.id)}
                  className="cursor-pointer group select-none"
                >
                  {/* Outer glow ring for selected region */}
                  {isSelected && (
                    <circle 
                      cx={region.cx} 
                      cy={region.cy} 
                      r={region.r + 8} 
                      fill="none" 
                      stroke="#f59e0b" 
                      strokeWidth="1.5" 
                      strokeDasharray="4 4" 
                      className="animate-spin-slow opacity-80"
                    />
                  )}

                  {/* Active Area Circular/Oval Representative Zone */}
                  <circle 
                    cx={region.cx} 
                    cy={region.cy} 
                    r={region.r} 
                    fill={fillVal} 
                    stroke={strokeVal} 
                    strokeWidth={isSelected ? "2.5" : "1.5"} 
                    className="transition-all duration-300 group-hover:fill-amber-500/10 group-hover:stroke-amber-500"
                  />

                  {/* Representative Local Names on Map */}
                  <text 
                    x={region.cx} 
                    y={region.cy - 5} 
                    textAnchor="middle" 
                    className="text-[10px] font-black fill-slate-800 dark:fill-slate-100 uppercase tracking-wider transition-all"
                  >
                    {region.name.split(' (')[0]}
                  </text>

                  {/* Average response time badge inside map */}
                  <text 
                    x={region.cx} 
                    y={region.cy + 12} 
                    textAnchor="middle" 
                    className="text-[8px] font-bold fill-slate-500 dark:fill-amber-400/80 uppercase tracking-widest"
                  >
                    ⏱️ {region.responseTime.split(' ')[0]} min
                  </text>

                  {/* Physical Glowing Radar Point (Logistics Base Layer) */}
                  {activeLayer === 'bases' && (
                    <g>
                      {/* Pulse circle */}
                      <circle 
                        cx={region.cx} 
                        cy={region.cy - 20} 
                        r="14" 
                        fill="rgba(245, 158, 11, 0.4)" 
                        className="animate-ping"
                      />
                      {/* Anchor pin */}
                      <circle 
                        cx={region.cx} 
                        cy={region.cy - 20} 
                        r="6" 
                        fill="#f59e0b" 
                        stroke="#ffffff" 
                        strokeWidth="1.5"
                      />
                      {/* Base Tag */}
                      <rect
                        x={region.cx - 24}
                        y={region.cy - 38}
                        width="48"
                        height="12"
                        rx="3"
                        fill="#0f172a"
                        stroke="#f59e0b"
                        strokeWidth="0.5"
                      />
                      <text
                        x={region.cx}
                        y={region.cy - 30}
                        textAnchor="middle"
                        className="text-[6px] font-black fill-white uppercase tracking-widest"
                      >
                        BASE ACTIVA
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Map Legend */}
          <div className="w-full border-t border-slate-100 dark:border-slate-800 pt-4 mt-2 flex flex-wrap justify-center gap-4 text-[10px]">
            <div className="flex items-center gap-1.5 text-slate-500">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              <span>Zona Seleccionada</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block" />
              <span>Zonas Disponibles</span>
            </div>
            {activeLayer === 'bases' && (
              <div className="flex items-center gap-1.5 text-slate-500">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse inline-block" />
                <span>Base Logística de Guardia</span>
              </div>
            )}
          </div>

        </div>

        {/* Right Side: Information Panel (5 cols) */}
        <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-950/20 border border-slate-150 dark:border-slate-850 rounded-2xl p-6 flex flex-col justify-between space-y-6">
          
          {/* Header of Active Selection */}
          <div className="space-y-4">
            <span className={`inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${
              activeLayer === 'cobertura' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400'
            }`}>
              <Zap className="w-3 h-3 text-amber-500 shrink-0" />
              Monitoreo Logístico Activo 2026
            </span>

            <div className="space-y-1.5">
              <h4 className="text-xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {activeRegion.name}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {activeRegion.description}
              </p>
            </div>
          </div>

          {/* Logistics Statistics Box */}
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-xl p-4.5 space-y-4.5 shadow-sm">
            
            {/* Logistics Base */}
            <div className="flex items-start gap-3">
              <div className="p-2 bg-slate-100 dark:bg-slate-850 rounded-lg text-slate-500 shrink-0">
                <Warehouse className="w-4 h-4 text-amber-500" />
              </div>
              <div className="space-y-0.5 text-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Base Operativa Vinculada</span>
                <strong className="text-slate-800 dark:text-slate-100">{activeRegion.baseName}</strong>
              </div>
            </div>

            {/* Response Time */}
            <div className="flex items-start gap-3">
              <div className="p-2 bg-slate-100 dark:bg-slate-850 rounded-lg text-slate-500 shrink-0">
                <Clock className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="space-y-0.5 text-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Tiempo de Respuesta de Guardia</span>
                <strong className="text-slate-800 dark:text-slate-100">{activeRegion.responseTime}</strong>
              </div>
            </div>

            {/* Fleet Size */}
            <div className="flex items-start gap-3">
              <div className="p-2 bg-slate-100 dark:bg-slate-850 rounded-lg text-slate-500 shrink-0">
                <Truck className="w-4 h-4 text-blue-500" />
              </div>
              <div className="space-y-0.5 text-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Flota y Personal Asignado</span>
                <strong className="text-slate-800 dark:text-slate-100">{activeRegion.fleet}</strong>
              </div>
            </div>

          </div>

          {/* Quick Select Buttons list for the departments in this region */}
          <div className="space-y-3">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block pl-1">
              Departamentos de esta zona:
            </span>
            
            <div className="grid grid-cols-1 gap-2">
              {selectedRegionDepts.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => onSelectDepartment(dept.slug)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 px-4 py-3 rounded-xl flex items-center justify-between text-xs transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">🍇</span>
                    <strong className="text-slate-800 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {dept.name}
                    </strong>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <span className="text-[10px]">Ver Fletes</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-amber-500" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Security Coverage Guarantee */}
          <div className="bg-amber-500/5 rounded-xl p-3.5 border border-amber-500/15 text-[10px] sm:text-xs text-slate-600 dark:text-slate-300 flex items-center gap-2 leading-relaxed">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Garantizamos habilitación municipal al día y póliza activa de Sancor Seguros en todas las zonas ilustradas.</span>
          </div>

        </div>

      </div>

    </div>
  );
}
