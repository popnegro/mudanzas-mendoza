import React, { useState } from 'react';
import { 
  Brain, 
  Timer, 
  Sparkles, 
  ArrowRight, 
  RefreshCw, 
  FileText, 
  Smile, 
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
  { id: 'estudiante', label: 'Estudiante', icon: '🎓', desc: 'Monoambiente y muebles esenciales.' },
  { id: 'familia', label: 'Familia y Mascotas', icon: '🏡', desc: 'Casa completa y jardín.' },
  { id: 'corporativo', label: 'Oficina', icon: '💼', desc: 'Escritorios y equipos.' },
  { id: 'senior', label: 'Adultos Mayores', icon: '☕', desc: 'Mobiliario clásico pesado.' }
];

const SPECIAL_ITEMS_OPTIONS = [
  "Mascotas (perro/gato)", "Plantas de jardín", "Heladera con freezer", "Sillón de 3 cuerpos", "Piano / Teclado pesado", "Vajilla antigua"
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
      setError('Te dejamos un Plan de Contingencia instantáneo diseñado para vos:');
      
      const fallback = `### 📋 Plan de Contingencia para ${userName}
De **${state.originDept}** a **${state.destDept}** • Perfil: **${profileLabel}**
 
#### ⏱️ Logística de Tiempo Recomendada:
1. **Asignación de Estiba:** Te recomendamos embalar en canastos plásticos herméticos rígidos (los proveemos) para evitar la filtración de polvo típica de Mendoza.
2. **Evitar Congestión:** Programá el trayecto fuera de los horarios pico de Mendoza Capital (11 a 13hs).
3. **Nivel de Estrés (${state.stressLevel}%):** Bajalo delegando la carga pesada en nuestro personal con seguro de accidentes.

${state.specialItems.length > 0 ? `#### 📦 Protocolo Especial:
${state.specialItems.map(item => `* **${item}:** Embalaje específico con mantas acolchadas gruesas.`).join('\n')}` : ''}

#### 🍷 Consejo:
* Escribinos por WhatsApp y coordinamos tu mudanza hoy mismo. ¡Congelamos tu tarifa de flete al instante!`;
      
      setGeneratedPlan(fallback);
    } finally {
      setIsLoading(false);
    }
  };

  const stressInfo = state.stressLevel < 35 
    ? { text: "Leve", color: "text-emerald-400" }
    : state.stressLevel < 75 
      ? { text: "Moderado", color: "text-amber-400" }
      : { text: "Crítico", color: "text-rose-400" };

  return (
    <section id="ai-planner-section" className="bg-slate-900 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-y border-slate-800 relative overflow-hidden text-left">
      {/* Visual glowing effects */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-slate-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Intro Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1 bg-amber-400/10 text-amber-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider font-mono">
            <Brain className="w-3.5 h-3.5" />
            Exclusivo Mendoza 2026
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight leading-tight">
            Planificación de Mudanzas con IA
          </h2>
          <p className="text-slate-300 text-sm">
            Optimizamos tiempos y reducimos tu estrés analizando variables climáticas y de tránsito locales.
          </p>
          {onNavigatePlanificador && (
            <div className="pt-2">
              <button
                onClick={onNavigatePlanificador}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold px-5 py-2.5 rounded-xl text-xs shadow-lg transition-all cursor-pointer"
              >
                📊 Ver Planificador de Mudanzas Completo <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Live Simulator Form & Result */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8 lg:p-10 space-y-8">
          
          <div className="border-b border-slate-850 pb-4 text-center sm:text-left">
            <h3 className="text-lg font-bold flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-4.5 h-4.5 text-amber-400" />
              Simulador de Planificación Cero Estrés
            </h3>
            <p className="text-slate-450 text-xs">
              Ingresá tus variables y mirá cómo nuestra IA diseña la secuencia logística ideal.
            </p>
          </div>

          <form onSubmit={handleSimulate} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Input fields panel */}
            <div className="md:col-span-5 space-y-5">
              
              {/* Name */}
              <div className="space-y-1">
                <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider">Tu Nombre</label>
                <input
                  type="text"
                  placeholder="Ej: Sofía"
                  value={state.name}
                  onChange={(e) => setState({ ...state, name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder:text-slate-600 outline-none focus:border-amber-500 transition-all"
                />
              </div>

              {/* Department Selector */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider">Origen</label>
                  <select
                    value={state.originDept}
                    onChange={(e) => setState({ ...state, originDept: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2 py-2.5 text-xs text-slate-200 cursor-pointer focus:border-amber-500 transition-all"
                  >
                    {DEPARTMENTS_LIST.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider">Destino</label>
                  <select
                    value={state.destDept}
                    onChange={(e) => setState({ ...state, destDept: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2 py-2.5 text-xs text-slate-200 cursor-pointer focus:border-amber-500 transition-all"
                  >
                    {DEPARTMENTS_LIST.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              {/* Profile Select */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider">Perfil de Mudanza</label>
                <div className="grid grid-cols-2 gap-2">
                  {PROFILES.map((p) => {
                    const isSelected = state.profile === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setState(prev => ({ ...prev, profile: p.id }))}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected 
                            ? 'bg-slate-900 border-amber-500 text-white' 
                            : 'bg-slate-950/40 border-slate-850 text-slate-400 hover:bg-slate-900/60'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm">{p.icon}</span>
                          <span className="text-[11px] font-bold truncate">{p.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Stress Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                  <span>Estrés Estimado</span>
                  <span className={`font-black ${stressInfo.color}`}>
                    {state.stressLevel}% ({stressInfo.text})
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="10"
                  value={state.stressLevel}
                  onChange={(e) => setState(prev => ({ ...prev, stressLevel: parseInt(e.target.value) }))}
                  className="w-full accent-amber-500 cursor-pointer bg-slate-900 h-1.5 rounded-full outline-none"
                />
              </div>

              {/* Special items */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider">Objetos Especiales</label>
                <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                  {SPECIAL_ITEMS_OPTIONS.map((item) => {
                    const isChecked = state.specialItems.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleSpecialItem(item)}
                        className={`px-2.5 py-1.5 rounded-lg border text-left transition-colors cursor-pointer truncate ${
                          isChecked 
                            ? 'bg-amber-500/10 border-amber-500/40 text-amber-400 font-bold' 
                            : 'bg-slate-950/40 border-slate-850 text-slate-400 hover:bg-slate-900/45'
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-slate-850 text-slate-950 font-black py-3 rounded-xl text-xs tracking-wide shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-slate-950" />
                    Generando plan...
                  </>
                ) : (
                  <>
                    <Brain className="w-3.5 h-3.5" />
                    Simular Plan con IA
                  </>
                )}
              </button>

            </div>

            {/* AI Output Screen */}
            <div className="md:col-span-7 bg-slate-950 border border-slate-850 rounded-xl p-4 sm:p-5 flex flex-col justify-between min-h-[380px]">
              {isLoading ? (
                <div className="flex-1 flex flex-col items-center justify-center space-y-3 py-12 text-center animate-pulse">
                  <div className="w-10 h-10 rounded-full border-4 border-amber-500 border-t-transparent animate-spin" />
                  <p className="text-[11px] font-bold text-amber-400 uppercase tracking-widest">Algoritmo de Planificación Activo</p>
                </div>
              ) : generatedPlan ? (
                <div className="flex-1 flex flex-col justify-between h-full space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-850 pb-2 text-[10px]">
                      <span className="font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                        <FileText className="w-3 h-3" /> Plan Personalizado
                      </span>
                      <span className="text-slate-500 font-mono">Gemini 3.5 Active</span>
                    </div>

                    <div className="prose prose-invert max-w-none text-[11px] leading-relaxed text-slate-300 font-sans space-y-2.5 max-h-[290px] overflow-y-auto pr-1">
                      {generatedPlan.split('\n').map((line, idx) => {
                        const trimmed = line.trim();
                        if (trimmed.startsWith('###')) {
                          return <h4 key={idx} className="text-xs font-bold text-amber-300 pt-1 flex items-center gap-1.5">✨ {trimmed.replace('###', '')}</h4>;
                        } else if (trimmed.startsWith('##')) {
                          return <h3 key={idx} className="text-xs font-extrabold text-amber-400 pt-2 border-b border-slate-900 pb-0.5">{trimmed.replace('##', '')}</h3>;
                        } else if (trimmed.startsWith('* **') || trimmed.startsWith('- **') || trimmed.startsWith('**')) {
                          return <div key={idx} className="pl-2.5 border-l-2 border-amber-500/20 py-0.5 text-slate-300 font-medium">{trimmed}</div>;
                        } else if (trimmed.startsWith('*') || trimmed.startsWith('-')) {
                          return <p key={idx} className="pl-2 text-slate-400"><span className="text-amber-500">▪</span> {trimmed.substring(1).trim()}</p>;
                        }
                        return <p key={idx} className="text-slate-400 text-[11px]">{trimmed}</p>;
                      })}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-850 flex flex-col sm:flex-row gap-2 items-center justify-between text-[11px]">
                    <span className="text-slate-500">
                      ¿Querés fijar esta planificación y reservar?
                    </span>
                    <a
                      href={`https://wa.me/5492612345678?text=Hola Mendoza 2026! Hice la simulación del Planificador IA. Mi nombre es ${state.name || 'Mendocino'} y necesito un traslado de ${state.originDept} a ${state.destDept}.`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg shadow transition-all whitespace-nowrap"
                    >
                      Reservar con este Plan
                    </a>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 py-16">
                  <ClipboardList className="w-10 h-10 text-slate-800" />
                  <div className="space-y-1">
                    <h4 className="font-bold text-xs text-slate-400">Esperando simulación</h4>
                    <p className="text-[10px] text-slate-500 max-w-xs mx-auto">
                      Ingresá tu nombre y hacé clic en "Simular Plan con IA" para encender el algoritmo logístico.
                    </p>
                  </div>
                </div>
              )}
            </div>

          </form>

        </div>

        {/* Timing benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center pt-4">
          <div className="p-5 bg-slate-950/20 border border-slate-850 rounded-xl space-y-2">
            <Timer className="w-6 h-6 text-amber-500 mx-auto" />
            <h4 className="font-bold text-xs text-slate-100">Optimización de Tiempos</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Planificamos la estiba y ruta ideal para que te mudes en un abrir y cerrar de ojos.
            </p>
          </div>
          <div className="p-5 bg-slate-950/20 border border-slate-850 rounded-xl space-y-2">
            <CalendarDays className="w-6 h-6 text-amber-500 mx-auto" />
            <h4 className="font-bold text-xs text-slate-100">Zonda Reprogramado</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              En caso de alerta por viento Zonda extremo, reprogramamos tu servicio sin costos extras.
            </p>
          </div>
          <div className="p-5 bg-slate-950/20 border border-slate-850 rounded-xl space-y-2">
            <Compass className="w-6 h-6 text-amber-500 mx-auto" />
            <h4 className="font-bold text-xs text-slate-100">Guiado Municipal</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Evitamos multas y demoras contemplando las normativas de estacionamiento locales.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
