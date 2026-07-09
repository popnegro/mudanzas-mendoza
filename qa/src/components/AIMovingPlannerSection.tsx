import React, { useState } from 'react';
import { 
  Brain, 
  Timer, 
  Sparkles, 
  ArrowRight, 
  Check, 
  X, 
  AlertTriangle, 
  RefreshCw, 
  FileText, 
  Smile, 
  Flame, 
  MapPin, 
  Compass, 
  ClipboardList,
  ShieldAlert,
  CalendarDays
} from 'lucide-react';

interface SimulatorState {
  name: string;
  originDept: string;
  destDept: string;
  profile: string;
  stressLevel: number;
  specialItems: string[];
}

const DEPARTMENTS_LIST = [
  "Mendoza Capital", "Godoy Cruz", "Guaymallén", "Las Heras", 
  "Luján de Cuyo", "Maipú", "San Martín", "Chacras de Coria"
];

const PROFILES = [
  { id: 'estudiante', label: 'Estudiante / Mudanza Chica', icon: '🎓', desc: 'Monoambiente, apuntes, pc y muebles esenciales.' },
  { id: 'familia', label: 'Familia con Niños y Mascotas', icon: '🏡', desc: 'Casa completa, electrodomésticos, juguetes y jardín.' },
  { id: 'corporativo', label: 'Oficina / Profesional', icon: '💼', desc: 'Escritorios, computadoras, archivos sensibles y servidores.' },
  { id: 'senior', label: 'Adultos Mayores / Tradicional', icon: '☕', desc: 'Mobiliario clásico pesado, vajilla delicada y recuerdos.' }
];

const SPECIAL_ITEMS_OPTIONS = [
  "Mascotas (perro/gato)", "Plantas de jardín mendocino", "Heladera con freezer", "Sillón de 3 cuerpos", "Piano / Teclado pesado", "Vajilla de cristal antigua"
];

interface AIMovingPlannerSectionProps {
  onNavigatePlanificador?: () => void;
}

export default function AIMovingPlannerSection({ onNavigatePlanificador }: AIMovingPlannerSectionProps = {}) {
  const [state, setState] = useState<SimulatorState>({
    name: '',
    originDept: 'Mendoza Capital',
    destDept: 'Luján de Cuyo',
    profile: 'familia',
    stressLevel: 70,
    specialItems: []
  });

  const [isLoading, setIsLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const toggleSpecialItem = (item: string) => {
    setState(prev => ({
      ...prev,
      specialItems: prev.specialItems.includes(item)
        ? prev.specialItems.filter(i => i !== item)
        : [...prev.specialItems, item]
    }));
  };

  const handleSimulate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setGeneratedPlan(null);

    const userName = state.name.trim() || 'Mendocino/a';
    const profileLabel = PROFILES.find(p => p.id === state.profile)?.label || 'Familiar';

    try {
      const response = await fetch('/api/gemini/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin: state.originDept,
          destination: state.destDept,
          housingType: state.profile === 'corporativo' ? 'oficina' : 'casa',
          rooms: state.profile === 'estudiante' ? '1' : state.profile === 'familia' ? '4' : '3',
          floor: 'PB',
          elevator: 'No',
          services: ['Planificación Inteligente con IA', 'Embalaje Optimizado', 'Gestión de Estrés Cero'],
          specialItems: [...state.specialItems, `Perfil: ${profileLabel}`, `Nivel de Estrés: ${state.stressLevel}%`],
          date: 'Próximamente',
          name: userName
        })
      });

      const data = await response.json();
      if (data.success) {
        setGeneratedPlan(data.plan);
      } else {
        throw new Error('No se pudo generar el plan.');
      }
    } catch (err: any) {
      console.error(err);
      setError('Tuvimos un pequeño contratiempo al conectar con la IA. Te dejamos un Plan de Contingencia instantáneo de alto valor:');
      
      // Standalone high-quality fallback specifically customized for the simulator parameters
      const fallback = `### 📋 ¡Plan de Contingencia IA para ${userName}!
      
De **${state.originDept}** a **${state.destDept}** • Perfil: **${profileLabel}**
 
#### ⏱️ Optimización del Tiempo (¡Ahorrás hasta 12 horas!):
1. **Asignación de Estiba Inteligente:** En Mendoza, el polvo y el calor del verano o el viento Zonda son factores críticos. Para tu perfil de **${profileLabel}**, la IA recomienda embalar en canastos plásticos rígidos y herméticos (que nosotros te facilitamos) en lugar de cartón común. Ahorrás 4 horas de precintado.
2. **Planificación de Ruta:** Programamos el viaje evitando los cuellos de botella céntricos en Mendoza Capital (zona de Arístides y microcentro) entre las 11 y las 13 hs.
3. **Tu Nivel de Estrés Inicial:** ${state.stressLevel}%. Te garantizamos bajarlo a menos del 15% delegando la carga y descarga.

${state.specialItems.length > 0 ? `#### 📦 Protocolo para Especiales:
${state.specialItems.map(item => `* **${item}:** Activamos el protocolo específico. Por ejemplo, traslado con amortiguación gruesa o canil de cortesía ventilado para no estresar el trayecto.`).join('\n')}` : ''}

#### 🍷 Consejo de Guardia:
* Mudarse no tiene que ser un dolor de cabeza. Hacé clic en el botón de **WhatsApp** abajo y pasanos estos datos; fijamos tu tarifa plana de flete en un minuto.`;
      
      setGeneratedPlan(fallback);
    } finally {
      setIsLoading(false);
    }
  };

  const getStressText = (level: number) => {
    if (level < 35) return { text: "Leve (Esperanzado y organizado)", color: "text-emerald-400", icon: <Smile className="w-4 h-4" /> };
    if (level < 75) return { text: "Moderado (Siento que olvido cosas)", color: "text-amber-400", icon: <Compass className="w-4 h-4" /> };
    return { text: "Crítico (¡Auxilio, colapso de cajas!)", color: "text-rose-400", icon: <Flame className="w-4 h-4" /> };
  };

  const stressInfo = getStressText(state.stressLevel);

  return (
    <section className="bg-slate-900 text-white py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-y border-slate-800 relative overflow-hidden text-left">
      {/* Visual glowing effects */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-slate-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20 relative z-10">
        
        {/* Intro Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-amber-400 bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/20">
            <Brain className="w-4 h-4 text-amber-400" />
            Exclusivo Mendoza 2026
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-white leading-tight">
            Planificación de Mudanzas con IA
          </h2>
          <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            ¿Por qué contratar un flete manual a ciegas? Optimizamos tus tiempos, reducimos tu estrés a cero y planificamos cada detalle logístico mediante algoritmos predictivos adaptados al ritmo mendocino.
          </p>
          {onNavigatePlanificador && (
            <div className="pt-2 animate-fade-in">
              <button
                onClick={onNavigatePlanificador}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black px-6 py-3 rounded-xl text-xs shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer animate-pulse-subtle"
              >
                📊 Abrir Planificador de Mudanzas Completo (Checklist + IA) <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Competitive Matrix Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          {/* Traditional Flete Card */}
          <div className="bg-slate-950/40 border border-slate-850 rounded-2xl p-8 sm:p-10 space-y-6 flex flex-col justify-between hover:shadow-md transition-all">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-rose-500/10 text-rose-400 rounded-lg border border-rose-500/20">
                  <ShieldAlert className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-xl text-slate-100">Flete Tradicional Común</h3>
                  <p className="text-xs text-slate-500">Carga manual sin método</p>
                </div>
              </div>

              <p className="text-sm text-slate-400 leading-relaxed">
                Los servicios convencionales se limitan a cargar cajas en la caja del camión. No analizan el tipo de hogar, no prevén contingencias climáticas (como el Zonda) ni ofrecen pautas claras de organización previa, dejando toda la carga mental sobre tus hombros.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-400">
                  <span className="text-rose-500 text-sm shrink-0">✕</span>
                  <span><strong>Caos en Destino:</strong> Descargan todo mezclado; pasás días abriendo cajas buscando la cafetera o cargadores.</span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-400">
                  <span className="text-rose-500 text-sm shrink-0">✕</span>
                  <span><strong>Rutas Ineficientes:</strong> Se guían sobre la marcha; demoras costosas en avenidas colapsadas de la ciudad.</span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-400">
                  <span className="text-rose-500 text-sm shrink-0">✕</span>
                  <span><strong>Estrés Extremo:</strong> Sin checklists ni guías. El 83% de las personas reporta insomnio previo a mudarse.</span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-400">
                  <span className="text-rose-500 text-sm shrink-0">✕</span>
                  <span><strong>Sorpresas de Carga:</strong> Stowing aleatorio que incrementa el riesgo de golpes en vajilla o heladeras.</span>
                </div>
              </div>
            </div>

            <div className="bg-rose-500/5 rounded-xl p-4.5 border border-rose-500/10 text-center text-xs sm:text-sm text-rose-400 font-medium mt-6">
              ⚠️ Consumo promedio de tiempo en embalaje manual: <strong>24 a 32 horas</strong>
            </div>
          </div>

          {/* Mendoza 2026 AI Card */}
          <div className="bg-slate-950/80 border border-amber-500/30 rounded-2xl p-8 sm:p-10 space-y-6 flex flex-col justify-between shadow-lg relative hover:border-amber-500/50 transition-all">
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-amber-500 text-slate-950 px-3.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow">
              Estándar Exclusivo
            </div>
            
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/20">
                  <Brain className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-xl text-white">Mendoza 2026 + Planificador IA</h3>
                  <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider">Mudanza Inteligente Optimizada</p>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Utilizamos inteligencia artificial para analizar tu mudanza. Cruzamos la cantidad de ambientes, tus objetos especiales, tu perfil familiar y las zonas de origen/destino de Mendoza para devolverte una hoja de ruta con hora de salida exacta, packing-list clasificado y mitigación de fatiga.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                  <span className="text-emerald-400 text-sm shrink-0">✓</span>
                  <span><strong>Checklist en PDF:</strong> Plan paso a paso desde 7 días antes de la mudanza, directo a tu teléfono.</span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                  <span className="text-emerald-400 text-sm shrink-0">✓</span>
                  <span><strong>Ruteo Predictivo:</strong> Cálculo de trayecto óptimo evitando horas pico bancarias, colegios y obras viales.</span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                  <span className="text-emerald-400 text-sm shrink-0">✓</span>
                  <span><strong>Protocolos Especiales:</strong> Trato preferencial de mascotas, plantas vulnerables al clima seco o instrumentos.</span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                  <span className="text-emerald-400 text-sm shrink-0">✓</span>
                  <span><strong>Estiba Organizada:</strong> El camión se carga según la secuencia lógica de desempaque inteligente.</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 rounded-xl p-4.5 border border-amber-500/20 text-center text-xs sm:text-sm text-amber-400 font-bold flex items-center justify-center gap-2 mt-6">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Ahorro promedio verificado: <strong>15 horas de esfuerzo</strong></span>
            </div>
          </div>

        </div>

        {/* Live Simulator Form & Result */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-10 lg:p-12 space-y-10">
          
          {/* Simulator Title */}
          <div className="border-b border-slate-850 pb-6 text-center sm:text-left space-y-2">
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold flex items-center justify-center sm:justify-start gap-2.5 text-white">
              <Sparkles className="w-6 h-6 text-amber-400" />
              Simulador de Planificación Cero Estrés
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-3xl">
              Ingresá tus variables abajo y mirá cómo nuestra IA diseña el esquema óptimo para tu mudanza mendocina.
            </p>
          </div>

          <form onSubmit={handleSimulate} className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Input fields panel (8 cols or 6 cols) */}
            <div className="md:col-span-6 lg:col-span-5 space-y-6">
              
              {/* Name */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider">Tu Nombre</label>
                <input
                  type="text"
                  placeholder="Ej: Sofía"
                  value={state.name}
                  onChange={(e) => setState({ ...state, name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 transition-all"
                />
              </div>

              {/* Department Selector Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider">Origen</label>
                  <select
                    value={state.originDept}
                    onChange={(e) => setState({ ...state, originDept: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-3 text-xs sm:text-sm text-slate-200 outline-none focus:border-amber-500 transition-all cursor-pointer"
                  >
                    {DEPARTMENTS_LIST.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider">Destino</label>
                  <select
                    value={state.destDept}
                    onChange={(e) => setState({ ...state, destDept: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-3 text-xs sm:text-sm text-slate-200 outline-none focus:border-amber-500 transition-all cursor-pointer"
                  >
                    {DEPARTMENTS_LIST.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              {/* Profile Select */}
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider">Perfil de Mudanza</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {PROFILES.map((p) => {
                    const isSelected = state.profile === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setState(prev => ({ ...prev, profile: p.id }))}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected 
                            ? 'bg-slate-900 border-amber-500 shadow text-white' 
                            : 'bg-slate-950/40 border-slate-850 hover:bg-slate-900/60 text-slate-400'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">{p.icon}</span>
                          <span className="text-xs font-extrabold leading-snug">{p.label}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">{p.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Stress Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                  <span>Nivel de Estrés Estimado</span>
                  <span className={`font-black flex items-center gap-1 ${stressInfo.color}`}>
                    {stressInfo.icon} {state.stressLevel}% ({stressInfo.text})
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={state.stressLevel}
                  onChange={(e) => setState(prev => ({ ...prev, stressLevel: parseInt(e.target.value) }))}
                  className="w-full accent-amber-500 cursor-pointer bg-slate-900 h-1.5 rounded-full outline-none"
                />
              </div>

              {/* Special items selection checkboxes */}
              <div className="space-y-2.5">
                <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider">Objetos Especiales a Cuidar</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {SPECIAL_ITEMS_OPTIONS.map((item) => {
                    const isChecked = state.specialItems.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleSpecialItem(item)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-left transition-colors cursor-pointer ${
                          isChecked 
                            ? 'bg-amber-500/10 border-amber-500/40 text-amber-400 font-bold' 
                            : 'bg-slate-950/40 border-slate-850 text-slate-400 hover:bg-slate-900/40'
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center text-[9px] ${
                          isChecked ? 'bg-amber-500 border-amber-500 text-slate-950' : 'border-slate-700'
                        }`}>
                          {isChecked && '✓'}
                        </span>
                        <span className="truncate">{item}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 text-slate-950 font-extrabold py-3.5 rounded-xl text-xs sm:text-sm tracking-wide shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                    Procesando con Inteligencia Artificial...
                  </>
                ) : (
                  <>
                    <Brain className="w-4.5 h-4.5 text-slate-950" />
                    Simular Plan de Estrés Cero con IA
                  </>
                )}
              </button>

            </div>

            {/* AI Output Screen (7 cols or 6 cols) */}
            <div className="md:col-span-6 lg:col-span-7 bg-slate-950 border border-slate-850 rounded-2xl p-5 sm:p-6 flex flex-col justify-between min-h-[440px] text-left">
              {isLoading ? (
                <div className="flex-1 flex flex-col items-center justify-center space-y-4 py-16 text-center animate-pulse">
                  <div className="w-12 h-12 rounded-full border-4 border-amber-500 border-t-transparent animate-spin" />
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-amber-400 uppercase tracking-widest">Algoritmo de Planificación Activo</p>
                    <p className="text-slate-400 text-xs max-w-xs leading-relaxed">
                      Evaluando trayecto de flete mendocino, perfil de estiba y resguardos ambientales...
                    </p>
                  </div>
                </div>
              ) : generatedPlan ? (
                <div className="flex-1 flex flex-col justify-between h-full space-y-6">
                  
                  {/* Markdown Display */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5" /> Plan Personalizado listo
                      </span>
                      <span className="text-[9px] bg-slate-900 text-slate-500 px-2 py-0.5 rounded border border-slate-850">
                        Gemini 3.5 Active
                      </span>
                    </div>

                    {error && (
                      <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3.5 py-2.5 rounded-xl text-xs flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    <div className="prose prose-invert max-w-none text-xs leading-relaxed text-slate-300 font-sans space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
                      {generatedPlan.split('\n').map((line, idx) => {
                        const trimmed = line.trim();
                        if (trimmed.startsWith('###')) {
                          return <h4 key={idx} className="text-xs sm:text-sm font-bold text-amber-300 pt-2 flex items-center gap-1.5">✨ {trimmed.replace('###', '')}</h4>;
                        } else if (trimmed.startsWith('##')) {
                          return <h3 key={idx} className="text-sm sm:text-md font-extrabold text-amber-400 pt-3 border-b border-slate-900 pb-1">{trimmed.replace('##', '')}</h3>;
                        } else if (trimmed.startsWith('* **') || trimmed.startsWith('- **') || trimmed.startsWith('**')) {
                          return <div key={idx} className="pl-3.5 border-l-2 border-amber-500/30 py-0.5 text-slate-300 font-medium">{trimmed}</div>;
                        } else if (trimmed.startsWith('*') || trimmed.startsWith('-')) {
                          return <p key={idx} className="pl-3 flex items-center gap-1.5 text-slate-400"><span className="text-amber-500">▪</span> {trimmed.substring(1).trim()}</p>;
                        }
                        return <p key={idx} className="text-slate-400 text-[11px] sm:text-xs">{trimmed}</p>;
                      })}
                    </div>
                  </div>

                  {/* WhatsApp Conversion Panel inside Output */}
                  <div className="pt-4 border-t border-slate-850 flex flex-col sm:flex-row gap-3 items-center justify-between text-xs">
                    <span className="text-slate-500 text-center sm:text-left">
                      ¿Querés fijar esta planificación y congelar tarifa?
                    </span>
                    <a
                      href={`https://wa.me/5492612345678?text=Hola Mendoza 2026! Hice la simulación del Planificador IA. Mi nombre es ${state.name || 'Mendocino'} y necesito un traslado de ${state.originDept} a ${state.destDept}.`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 text-white font-black px-4.5 py-2.5 rounded-xl shadow tracking-wide transition-all cursor-pointer whitespace-nowrap"
                    >
                      Reservar con este Plan
                    </a>
                  </div>

                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-16">
                  <ClipboardList className="w-12 h-12 text-slate-700" />
                  <div className="space-y-1.5">
                    <h4 className="font-extrabold text-sm text-slate-300">Esperando simulación</h4>
                    <p className="text-[11px] text-slate-500 max-w-xs leading-relaxed mx-auto">
                      Ingresá tu nombre y seleccioná tus preferencias en el panel izquierdo. Luego hacé clic en el botón de simulación para encender la IA.
                    </p>
                  </div>
                </div>
              )}
            </div>

          </form>

        </div>

        {/* Informative timing icons / benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center pt-8">
          <div className="p-8 bg-slate-950/30 border border-slate-850 rounded-2xl space-y-3.5 hover:shadow-md transition-all card-hover-lift">
            <Timer className="w-8 h-8 text-amber-500 mx-auto" />
            <h4 className="font-display font-extrabold text-base text-slate-100">Eficiencia en Tiempos</h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Menos tiempo desarmando cajas, más tiempo disfrutando tu nuevo living mendocino.
            </p>
          </div>
          <div className="p-8 bg-slate-950/30 border border-slate-850 rounded-2xl space-y-3.5 hover:shadow-md transition-all card-hover-lift">
            <CalendarDays className="w-8 h-8 text-amber-500 mx-auto" />
            <h4 className="font-display font-extrabold text-base text-slate-100">Reprogramación Bonificada</h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Si la IA detecta alerta de Zonda extremo o tormentas fuertes, reprogramamos sin cargos adicionales.
            </p>
          </div>
          <div className="p-8 bg-slate-950/30 border border-slate-850 rounded-2xl space-y-3.5 hover:shadow-md transition-all card-hover-lift">
            <Compass className="w-8 h-8 text-amber-500 mx-auto" />
            <h4 className="font-display font-extrabold text-base text-slate-100">Orientación Integral</h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Indicaciones precisas de estacionamiento y descarga según las normativas vigentes en cada municipio.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
