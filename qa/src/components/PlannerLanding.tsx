import React, { useState } from 'react';
import { motion } from 'motion/react';
import Breadcrumbs from './Breadcrumbs';
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
  CalendarDays,
  CheckSquare,
  Square,
  BookmarkCheck,
  Download,
  Share2,
  Copy
} from 'lucide-react';

// Import official Mudanzas Miranda image for co-branding
import mudanzaMirandaTruck from '../assets/images/mudanza_miranda_truck_1783676498398.jpg';

interface PlannerLandingProps {
  onBack: () => void;
  onStartQuote: () => void;
}

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

interface ChecklistItem {
  id: string;
  task: string;
  category: '30_days' | '15_days' | 'moving_day' | 'done_moving';
  checked: boolean;
}

export default function PlannerLanding({ onBack, onStartQuote }: PlannerLandingProps) {
  // 1. Interactive AI Generator state
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

  // 2. Stateful Interactive Checklist
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: '1', task: 'Hacer inventario completo de muebles y etiquetar cajas por ambiente.', category: '30_days', checked: false },
    { id: '2', task: 'Donar o vender objetos que no se trasladarán a la nueva vivienda.', category: '30_days', checked: false },
    { id: '3', task: 'Solicitar presupuesto en Mendoza 2026 y reservar el flete oficial.', category: '30_days', checked: true },
    { id: '4', task: 'Dar de baja o cambiar domicilio de servicios (Luz, Gas, Internet).', category: '15_days', checked: false },
    { id: '5', task: 'Comprar cinta de embalaje reforzada y plástico burbuja para vajilla.', category: '15_days', checked: false },
    { id: '6', task: 'Guardar joyas, escrituras y documentos personales en un bolso de mano.', category: '15_days', checked: false },
    { id: '7', task: 'Descongelar y vaciar la heladera/freezer 24 horas antes del traslado.', category: 'moving_day', checked: false },
    { id: '8', task: 'Separar un kit de supervivencia (café, cargador, papel higiénico, mudas).', category: 'moving_day', checked: false },
    { id: '9', task: 'Asegurar plantas mendocinas de jardín para evitar derrames de tierra.', category: 'moving_day', checked: false },
    { id: '10', task: 'Revisar todas las alacenas y placares antes de que salga el camión.', category: 'moving_day', checked: false },
    { id: '11', task: 'Verificar el funcionamiento de luces, llaves y canillas de la nueva casa.', category: 'done_moving', checked: false },
    { id: '12', task: 'Desembalar primero los artículos esenciales del baño y cocina.', category: 'done_moving', checked: false }
  ]);

  const [activeTab, setActiveTab] = useState<'30_days' | '15_days' | 'moving_day' | 'done_moving'>('30_days');
  const [copiedNotification, setCopiedNotification] = useState(false);

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
      
      const fallback = `### 📋 ¡Plan de Contingencia IA para ${userName}!
      
De **${state.originDept}** a **${state.destDept}** • Perfil: **${profileLabel}**

#### ⏱️ Optimización del Tiempo (¡Ahorrás hasta 12 horas!):
1. **Asignación de Estiba Inteligente:** En Mendoza, el polvo y el calor o el viento Zonda son factores críticos. Para tu perfil de **${profileLabel}**, la IA recomienda embalar en canastos plásticos rígidos y herméticos (que nosotros te facilitamos) en lugar de cartón común. Ahorrás 4 horas de precintado.
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

  const toggleChecklistItem = (id: string) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const handleCopyChecklist = () => {
    const listText = checklist
      .filter(item => item.category === activeTab)
      .map(item => `${item.checked ? '[X]' : '[ ]'} ${item.task}`)
      .join('\n');
    
    navigator.clipboard.writeText(`Lista de mudanza - Mendoza 2026:\n\n${listText}`);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  const getStressText = (level: number) => {
    if (level < 35) return { text: "Leve (Esperanzado y organizado)", color: "text-emerald-500", icon: <Smile className="w-4 h-4" /> };
    if (level < 75) return { text: "Moderado (Siento que olvido cosas)", color: "text-amber-500", icon: <Compass className="w-4 h-4" /> };
    return { text: "Crítico (¡Auxilio, colapso de cajas!)", color: "text-rose-500", icon: <Flame className="w-4 h-4" /> };
  };

  const stressInfo = getStressText(state.stressLevel);

  const totalCompleted = checklist.filter(c => c.checked).length;
  const totalTasks = checklist.length;
  const overallPercentage = totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0;

  const currentTabCompleted = checklist.filter(c => c.category === activeTab && c.checked).length;
  const currentTabTasks = checklist.filter(c => c.category === activeTab).length;
  const currentTabPercentage = currentTabTasks > 0 ? Math.round((currentTabCompleted / currentTabTasks) * 100) : 0;

  const breadcrumbSteps = [
    { label: 'Inicio', onClick: onBack },
    { label: 'Planificador IA', isCurrent: true }
  ];

  return (
    <article className="py-12 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 animate-fade-in">
      
      {/* Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Breadcrumbs steps={breadcrumbSteps} />
      </div>

      {/* Hero Intro */}
      <div className="text-left max-w-3xl space-y-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-slate-950 dark:text-white leading-tight">
          Planificador de Mudanzas IA <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
            Optimizá Tu Tiempo al Máximo
          </span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Evitá el insomnio previo a mudarte. Nuestra herramienta inteligente analiza tu tipo de residencia, trayecto de origen/destino y nivel de estrés para generar un plan de estiba personalizado y un checklist paso a paso diseñado específicamente para las calles y clima de Mendoza.
        </p>
      </div>

      {/* Grid: Interactive Form & Main AI output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Form parameters */}
        <div className="lg:col-span-5 bg-slate-950 text-white rounded-3xl border border-slate-900 p-6 sm:p-8 space-y-6 text-left">
          <div className="space-y-1.5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
              Generador de Plan Logístico
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Completá las variables de tu mudanza para que nuestra red neuronal elabore tus pautas de cuidado.
            </p>
          </div>

          <form onSubmit={handleSimulate} className="space-y-5">
            {/* Name */}
            <div className="space-y-1.5">
              <label htmlFor="planner-name" className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                Tu Nombre
              </label>
              <input
                id="planner-name"
                type="text"
                placeholder="Ej: Marcelo Grasso"
                value={state.name}
                onChange={(e) => setState(prev => ({ ...prev, name: e.target.value }))}
                className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-slate-100 outline-none transition-all"
              />
            </div>

            {/* Origins and Dest */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="planner-origin" className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                  Origen en Mendoza
                </label>
                <select
                  id="planner-origin"
                  value={state.originDept}
                  onChange={(e) => setState(prev => ({ ...prev, originDept: e.target.value }))}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 outline-none transition-all"
                >
                  {DEPARTMENTS_LIST.map((dept, i) => (
                    <option key={i} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="planner-dest" className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                  Destino
                </label>
                <select
                  id="planner-dest"
                  value={state.destDept}
                  onChange={(e) => setState(prev => ({ ...prev, destDept: e.target.value }))}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 outline-none transition-all"
                >
                  {DEPARTMENTS_LIST.map((dept, i) => (
                    <option key={i} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Profiles */}
            <div className="space-y-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                Perfil de Mudanza
              </span>
              <div className="grid grid-cols-1 gap-2.5">
                {PROFILES.map((prof) => {
                  const isSel = state.profile === prof.id;
                  return (
                    <button
                      key={prof.id}
                      type="button"
                      onClick={() => setState(prev => ({ ...prev, profile: prof.id }))}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                        isSel 
                          ? 'bg-amber-500/10 border-amber-500 text-amber-400' 
                          : 'bg-slate-900/45 border-slate-850 text-slate-300 hover:border-slate-800'
                      }`}
                    >
                      <span className="text-xl shrink-0 mt-0.5">{prof.icon}</span>
                      <div>
                        <strong className="text-xs font-bold block">{prof.label}</strong>
                        <span className="text-[10px] text-slate-400 block mt-0.5">{prof.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stress level */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-wider">
                <span>Nivel de Estrés Estimado</span>
                <span className={`font-bold uppercase ${stressInfo.color}`}>{state.stressLevel}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={state.stressLevel}
                onChange={(e) => setState(prev => ({ ...prev, stressLevel: Number(e.target.value) }))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex items-center gap-1.5 text-[11px] text-slate-350 bg-slate-900/60 p-2.5 rounded-lg border border-slate-850">
                {stressInfo.icon}
                <span>Estado actual: <strong>{stressInfo.text}</strong></span>
              </div>
            </div>

            {/* Special items */}
            <div className="space-y-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                Objetos Especiales a Cuidar
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SPECIAL_ITEMS_OPTIONS.map((item, i) => {
                  const hasIt = state.specialItems.includes(item);
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => toggleSpecialItem(item)}
                      className={`px-3 py-1.5 rounded-full text-[10px] font-semibold border transition-all cursor-pointer ${
                        hasIt 
                          ? 'bg-amber-500 text-slate-950 border-amber-500' 
                          : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {hasIt ? '✓ ' : ''}{item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 text-slate-950 font-black py-4 rounded-xl text-xs transition-all shadow-lg hover:scale-[1.01] cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Analizando parámetros logísticos de Mendoza...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  Generar Plan Personalizado con IA
                </>
              )}
            </button>
          </form>

          {/* Branded Trust Card under the form */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3.5">
            <div className="w-full h-32 rounded-xl overflow-hidden relative border border-slate-800">
              <img
                src={mudanzaMirandaTruck}
                alt="Flota de fletes y camiones de Mudanzas Miranda en Mendoza"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[9px] font-black uppercase text-amber-400 tracking-wider block">Garantía Miranda</span>
              <p className="text-[10px] text-slate-300 leading-relaxed">
                Todo plan generado cuenta con el soporte operativo de la flota física de <strong>Mudanzas Miranda</strong>, garantizando que el transporte se adecue rigurosamente a las normativas de Cuyo.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: AI generated results */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-850 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between min-h-[500px] text-left">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <BookmarkCheck className="w-5 h-5 text-amber-500" />
                  <h3 className="text-base font-bold text-slate-950 dark:text-white">Plan de Contingencia y Estiba Inteligente</h3>
                </div>
                <span className="text-[9px] text-slate-400 font-mono bg-slate-200/55 dark:bg-slate-850 px-2.5 py-1 rounded-full">
                  Resultado Predictivo
                </span>
              </div>

              {generatedPlan ? (
                <div className="prose prose-slate dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 space-y-4 font-sans whitespace-pre-wrap">
                  {generatedPlan}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-20 space-y-3">
                  <div className="p-3 bg-amber-500/10 text-amber-500 rounded-full animate-bounce">
                    <Brain className="w-7 h-7" />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">¿Preparado/a para bajar el estrés?</h4>
                  <p className="text-slate-400 text-xs max-w-xs leading-relaxed">
                    Ajustá los filtros de la izquierda y presioná "Generar Plan" para recibir un cronograma automatizado adaptado a tus necesidades específicas.
                  </p>
                </div>
              )}
            </div>

            {/* Call to action on plan generation */}
            {generatedPlan && (
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                  📌 ¿Querés asegurar esta planificación? Enviásela a un asesor en Mendoza 2026.
                </span>
                <button
                  onClick={onStartQuote}
                  className="bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow shrink-0 w-full sm:w-auto"
                >
                  Asignar a mi Presupuesto
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Stateful Interactive Checklist - Dynamic Timeline */}
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-850 rounded-3xl p-6 sm:p-8 space-y-6 text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-950 dark:text-white flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-amber-500" />
              Checklist Interactivo Paso a Paso
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Marcá las tareas que vas completando. Podés copiar los pendientes del período actual para compartirlos por WhatsApp o guardarlos.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyChecklist}
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-amber-500 text-xs font-bold text-slate-700 dark:text-slate-300 inline-flex items-center gap-1.5 transition-all cursor-pointer"
              title="Copiar sección de checklist al portapapeles"
            >
              {copiedNotification ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ¡Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copiar Pendientes
                </>
              )}
            </button>
          </div>
        </div>

        {/* Animated Progress Section with Micro-copy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-slate-950 p-5 sm:p-6 rounded-2xl border border-slate-150 dark:border-slate-850 shadow-sm transition-all duration-300">
          
          {/* Global Progress */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 uppercase tracking-wide">
                🎯 Progreso General
              </span>
              <span className="text-xs font-black text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md">
                {overallPercentage}%
              </span>
            </div>
            
            <div className="w-full h-3.5 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden border border-slate-200/50 dark:border-slate-800/80 p-0.5">
              <motion.div 
                className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-full relative"
                initial={{ width: 0 }}
                animate={{ width: `${overallPercentage}%` }}
                transition={{ type: "spring", stiffness: 70, damping: 15 }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:16px_16px] animate-[pulse_2s_infinite]" />
              </motion.div>
            </div>
            
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
              {overallPercentage === 100 ? (
                <span className="text-emerald-500 font-bold flex items-center gap-1">
                  🎉 ¡Increíble! Planificación 100% lista. ¡Tu mudanza está garantizada!
                </span>
              ) : overallPercentage > 60 ? (
                <span>¡Excelente ritmo! El camión de <strong>Mudanzas Miranda</strong> ya se visualiza listo.</span>
              ) : overallPercentage > 30 ? (
                <span>Buen avance. Continuá tachando pendientes para un día clave libre de estrés.</span>
              ) : (
                <span>Comenzando el proceso. Un paso a la vez simplifica tu mudanza mendocina.</span>
              )}
            </p>
          </div>

          {/* Current Tab Progress */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 uppercase tracking-wide">
                ⚡ Fase Actual: {activeTab === '30_days' ? '30 Días antes' : activeTab === '15_days' ? '15 Días antes' : activeTab === 'moving_day' ? 'El Día Clave' : 'Al Llegar'}
              </span>
              <span className="text-xs font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                {currentTabPercentage}%
              </span>
            </div>
            
            <div className="w-full h-3.5 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden border border-slate-200/50 dark:border-slate-800/80 p-0.5">
              <motion.div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full relative"
                initial={{ width: 0 }}
                animate={{ width: `${currentTabPercentage}%` }}
                transition={{ type: "spring", stiffness: 70, damping: 15 }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:16px_16px]" />
              </motion.div>
            </div>
            
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
              {currentTabPercentage === 100 ? (
                <span className="text-emerald-500 font-bold flex items-center gap-1">
                  🏆 ¡Etapa completamente al día! Listo para dar el siguiente paso.
                </span>
              ) : (
                <span>Faltan <strong>{currentTabTasks - currentTabCompleted}</strong> de <strong>{currentTabTasks}</strong> tareas clave para completar este período.</span>
              )}
            </p>
          </div>

        </div>

        {/* Checklist timeline tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: '30_days', label: '📅 30 Días Antes', desc: 'Etapa inicial' },
            { id: '15_days', label: '📦 15 Días Antes', desc: 'Embalaje clave' },
            { id: 'moving_day', label: '🚚 El Día Clave', desc: 'Carga y viaje' },
            { id: 'done_moving', label: '🏡 Luego de Llegar', desc: 'Desembalaje' }
          ].map((tab) => {
            const isSel = activeTab === tab.id;
            const countCompleted = checklist.filter(c => c.category === tab.id && c.checked).length;
            const countTotal = checklist.filter(c => c.category === tab.id).length;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSel
                    ? 'bg-amber-500/10 border-amber-500 text-amber-500'
                    : 'bg-white dark:bg-slate-950 border-slate-150 dark:border-slate-850 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                <strong className="text-xs font-bold block">{tab.label}</strong>
                <span className="text-[9px] text-slate-400 block mt-0.5">{tab.desc}</span>
                <span className="inline-block mt-2 text-[10px] bg-slate-100 dark:bg-slate-850 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full font-bold">
                  {countCompleted}/{countTotal} Listos
                </span>
              </button>
            );
          })}
        </div>

        {/* Tasks list inside active timeline tab */}
        <div className="bg-white dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-2xl p-4 sm:p-6 space-y-3.5">
          {checklist
            .filter((item) => item.category === activeTab)
            .map((item) => (
              <div 
                key={item.id}
                onClick={() => toggleChecklistItem(item.id)}
                className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none ${
                  item.checked 
                    ? 'bg-emerald-500/5 border-emerald-500/20 text-slate-400 line-through' 
                    : 'bg-slate-50/50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-900 text-slate-800 dark:text-slate-200 hover:border-slate-200 dark:hover:border-slate-800'
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {item.checked ? (
                    <BookmarkCheck className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-350 dark:text-slate-700" />
                  )}
                </div>
                <p className="text-xs sm:text-sm leading-relaxed">{item.task}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Trust elements & Traditional comparison footer */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-900 text-left space-y-4">
        <h4 className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-500" />
          Seguridad Certificada Sancor Seguros
        </h4>
        <p className="text-xs text-slate-400 leading-relaxed">
          Tanto si usás nuestro Planificador IA como si lo coordinás manualmente, todas tus mudanzas y traslados contratados en Mendoza 2026 cuentan con la cobertura oficial civil total en tránsito. No arriesgues tus pertenencias en transportes no regulados.
        </p>
      </div>

    </article>
  );
}
