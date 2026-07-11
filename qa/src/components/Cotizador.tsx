import React, { useState, useEffect, useRef } from 'react';
import { CotizacionState } from '../types';
import { DEPARTMENTS } from '../data';
import { 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Truck, 
  HelpCircle, 
  Calendar, 
  Layers, 
  AlertTriangle, 
  PhoneCall, 
  RefreshCw, 
  FileText 
} from 'lucide-react';

interface CotizadorProps {
  onGeneratePlan: (details: CotizacionState) => void;
  aiPlanText: string;
  aiLoading: boolean;
}

const INITIAL_STATE: CotizacionState = {
  origen: 'Mendoza Capital',
  destino: 'Godoy Cruz',
  tipoVivienda: 'casa',
  ambientes: '3',
  piso: '0',
  ascensor: 'no-aplica',
  servicios: [],
  objetosEspeciales: [],
  fecha: '',
  horario: 'manana',
  nombre: '',
  telefono: '',
  email: '',
  observaciones: ''
};

export default function Cotizador({ onGeneratePlan, aiPlanText, aiLoading }: CotizadorProps) {
  const [step, setStep] = useState<number>(1);
  const [state, setState] = useState<CotizacionState>(INITIAL_STATE);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const [touched, setTouched] = useState({
    nombre: false,
    telefono: false,
    email: false,
    fecha: false
  });

  const stepContainerRef = useRef<HTMLDivElement>(null);
  const submittedRef = useRef<HTMLDivElement>(null);

  // Focus management: announce and shift focus to the active step on change for keyboard users (WCAG AA)
  useEffect(() => {
    if (stepContainerRef.current) {
      stepContainerRef.current.focus();
    }
  }, [step]);

  useEffect(() => {
    if (submitted && submittedRef.current) {
      submittedRef.current.focus();
    }
  }, [submitted]);

  const validatePhone = (phone: string) => {
    if (!phone.trim()) return 'El teléfono es obligatorio';
    const digits = phone.replace(/[\s()+-]/g, '');
    if (digits.length < 7) return 'El número es muy corto (mínimo 7 dígitos)';
    if (digits.length > 15) return 'El número es muy largo';
    if (/[a-zA-Z]/.test(phone)) return 'El teléfono solo debe contener números y caracteres de formato';
    return '';
  };

  const validateEmail = (email: string) => {
    if (!email.trim()) return 'El correo electrónico es obligatorio';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'El correo electrónico no tiene un formato válido';
    return '';
  };

  const validateName = (name: string) => {
    if (!name.trim()) return 'El nombre completo es obligatorio';
    if (name.trim().length < 3) return 'El nombre debe tener al menos 3 caracteres';
    return '';
  };

  const validateFecha = (fecha: string) => {
    if (!fecha) return 'La fecha de mudanza es obligatoria';
    const selectedDate = new Date(fecha);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      return 'La fecha no puede ser en el pasado';
    }
    return '';
  };

  const handleBlur = (field: 'nombre' | 'telefono' | 'email') => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const nextStep = () => {
    if (step === 1 && (!state.origen || !state.destino)) {
      setErrorMsg('Por favor especificá el origen y el destino de tu mudanza.');
      return;
    }
    if (step === 3) {
      setTouched(prev => ({ ...prev, fecha: true }));
      const fechaErr = validateFecha(state.fecha);
      if (fechaErr) {
        setErrorMsg('Por favor elegí una fecha válida para tu mudanza.');
        return;
      }
    }
    if (step === 4) {
      setTouched({ nombre: true, telefono: true, email: true, fecha: touched.fecha });
      const nameErr = validateName(state.nombre);
      const phoneErr = validatePhone(state.telefono);
      const emailErr = validateEmail(state.email);

      if (nameErr || phoneErr || emailErr) {
        setErrorMsg('Por favor corregí los errores en el formulario para continuar.');
        return;
      }
    }
    setErrorMsg('');
    if (step < 4) {
      setStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    setErrorMsg('');
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const handleServiceToggle = (service: string) => {
    setState(prev => {
      const servicios = prev.servicios.includes(service)
        ? prev.servicios.filter(s => s !== service)
        : [...prev.servicios, service];
      return { ...prev, servicios };
    });
  };

  const handleSpecialItemToggle = (item: string) => {
    setState(prev => {
      const objetosEspeciales = prev.objetosEspeciales.includes(item)
        ? prev.objetosEspeciales.filter(o => o !== item)
        : [...prev.objetosEspeciales, item];
      return { ...prev, objetosEspeciales };
    });
  };

  const generateWhatsAppMessage = () => {
    const serviciosLabel = state.servicios.length > 0 
      ? state.servicios.map(s => s.toUpperCase()).join(', ') 
      : 'Flete básico';
    
    const especialesLabel = state.objetosEspeciales.length > 0 
      ? state.objetosEspeciales.map(o => o.toUpperCase()).join(', ') 
      : 'Ninguno';

    const text = `Hola Mudanzas Mendoza 2026 (Mudanzas Miranda)! 🚚
Quiero solicitar un presupuesto personalizado.

📌 DATOS DE LA MUDANZA:
• Nombre: ${state.nombre}
• Teléfono: ${state.telefono}
• Correo: ${state.email}
• Origen: ${state.origen}
• Destino: ${state.destino}
• Tipo de vivienda: ${state.tipoVivienda.toUpperCase()} (${state.ambientes} ambientes)
• Piso/Acceso: Piso ${state.piso} (${state.ascensor === 'si' ? 'Con Ascensor' : state.ascensor === 'no' ? 'Por Escalera' : 'PB o Planta Baja'})
• Servicios adicionales: ${serviciosLabel}
• Objetos especiales: ${especialesLabel}
• Fecha prevista: ${state.fecha} (Turno: ${state.horario.toUpperCase()})

💬 OBSERVACIONES:
"${state.observaciones || 'Ninguna'}"

Agradezco su cotización. ¡Muchas gracias!`;

    return encodeURIComponent(text);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    onGeneratePlan(state);
    
    const encoded = generateWhatsAppMessage();
    const url = `https://wa.me/5492612345678?text=${encoded}`;
    setTimeout(() => {
      window.open(url, '_blank');
    }, 1000);
  };

  const resetForm = () => {
    setState(INITIAL_STATE);
    setStep(1);
    setSubmitted(false);
    setErrorMsg('');
    setTouched({ nombre: false, telefono: false, email: false, fecha: false });
  };

  const progressPercent = Math.round((step / 4) * 100);

  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-150 dark:border-slate-800/80 overflow-hidden text-slate-800 dark:text-slate-100 animate-fade-in" id="cotizador-seccion">
      {/* Banner / Header */}
      <header className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between border-b border-slate-800">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <span className="p-1.5 bg-amber-500 text-slate-950 rounded-lg" aria-hidden="true">📊</span>
            Cotizador Inteligente 2026
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-slate-400 text-xs sm:text-sm">Calculá tu mudanza al instante y obtené tu plan de IA</p>
            <span className="hidden sm:inline text-slate-600 text-xs">•</span>
            <a href="https://www.mudanzasmiranda.com.ar/" target="_blank" rel="noopener noreferrer" className="text-amber-400/90 hover:text-amber-300 text-xs font-semibold flex items-center gap-1 hover:underline">
              <span>Respaldado por</span>
              <strong>Mudanzas Miranda</strong>
            </a>
          </div>
        </div>
        {!submitted && (
          <div className="text-right" aria-live="polite" aria-atomic="true">
            <span className="text-xs text-slate-400 uppercase tracking-wider">Paso</span>
            <div className="text-lg font-extrabold text-amber-400">{step} de 4</div>
          </div>
        )}
      </header>

      {/* Progress Line */}
      {!submitted && (
        <div 
          className="w-full bg-slate-100 dark:bg-slate-850 h-1.5"
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progreso del formulario de cotización: Paso ${step} de 4`}
        >
          <div 
            className="bg-amber-500 h-1.5 transition-all duration-300" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}

      {/* Step Container Focused Programmatically */}
      <div 
        ref={stepContainerRef}
        id="step-container"
        tabIndex={-1}
        className="p-6 sm:p-8 min-h-[360px] flex flex-col justify-between outline-none"
        aria-label={`Contenido del Paso ${step}`}
      >
        {!submitted ? (
          <div>
            {/* Live alert for screen readers to announce validation or process errors */}
            {errorMsg && (
              <div 
                role="alert" 
                className="mb-6 p-4 bg-rose-50 border-l-4 border-rose-500 text-rose-700 text-sm rounded flex items-center gap-2 animate-fade-in"
              >
                <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* STEP 1: Ruta y Propiedad */}
            {step === 1 && (
              <section className="space-y-8 animate-fade-in text-left">
                {/* Ruta de origen y destino */}
                <div className="space-y-4">
                  <h3 className="text-md font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="text-amber-500" aria-hidden="true">📍</span> 1. ¿De dónde a dónde viaja tu carga?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="select-origen" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Departamento Origen</label>
                      <select
                        id="select-origen"
                        value={state.origen}
                        onChange={(e) => setState({ ...state, origen: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-all outline-none"
                      >
                        {DEPARTMENTS.map(d => <option key={d.id} value={d.name} className="dark:bg-slate-900">{d.name}</option>)}
                        <option value="Otra localidad de Mendoza" className="dark:bg-slate-900">Otra localidad (especificar)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="select-destino" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Departamento Destino</label>
                      <select
                        id="select-destino"
                        value={state.destino}
                        onChange={(e) => setState({ ...state, destino: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-all outline-none"
                      >
                        {DEPARTMENTS.map(d => <option key={d.id} value={d.name} className="dark:bg-slate-900">{d.name}</option>)}
                        <option value="Otra localidad de Mendoza" className="dark:bg-slate-900">Otra localidad (especificar)</option>
                        <option value="Fuera de Mendoza (Larga distancia)" className="dark:bg-slate-900">Fuera de Mendoza (Interprovincial)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Tipo de Vivienda */}
                <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                  <h3 className="text-md font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="text-amber-500" aria-hidden="true">🏠</span> 2. ¿Qué tipo de inmueble estás mudando?
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3" role="radiogroup" aria-label="Tipo de inmueble">
                    {(['casa', 'departamento', 'oficina', 'local'] as const).map(type => (
                      <button
                        key={type}
                        type="button"
                        role="radio"
                        aria-checked={state.tipoVivienda === type}
                        onClick={() => setState({ ...state, tipoVivienda: type })}
                        className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center gap-2 cursor-pointer ${
                          state.tipoVivienda === type 
                            ? 'border-amber-500 bg-amber-500/10 dark:bg-amber-500/20 text-amber-800 dark:text-amber-400 ring-2 ring-amber-500/20' 
                            : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-950/60 bg-white dark:bg-slate-900'
                        }`}
                      >
                        <span className="text-2xl" aria-hidden="true">
                          {type === 'casa' && '🏡'}
                          {type === 'departamento' && '🏢'}
                          {type === 'oficina' && '💼'}
                          {type === 'local' && '🏪'}
                        </span>
                        <span className="font-bold text-xs uppercase tracking-wide">{type}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cantidad de ambientes */}
                <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                  <h3 className="text-md font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="text-amber-500" aria-hidden="true">🛋️</span> 3. ¿Cuántos ambientes o piezas tiene?
                  </h3>
                  <div className="grid grid-cols-5 gap-2" role="radiogroup" aria-label="Cantidad de ambientes">
                    {['1', '2', '3', '4', '5+'].map(num => (
                      <button
                        key={num}
                        type="button"
                        role="radio"
                        aria-checked={state.ambientes === num}
                        onClick={() => setState({ ...state, ambientes: num })}
                        className={`py-3 rounded-xl border text-center font-bold text-sm transition-all cursor-pointer ${
                          state.ambientes === num 
                            ? 'bg-amber-500 border-amber-500 text-slate-950 shadow-sm' 
                            : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-950'
                        }`}
                      >
                        {num} {num === '5+' ? '' : 'Amb.'}
                      </button>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* STEP 2: Accesibilidad y Objetos Especiales */}
            {step === 2 && (
              <section className="space-y-8 animate-fade-in text-left">
                {/* Accesibilidad */}
                <div className="space-y-4">
                  <h3 className="text-md font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="text-amber-500" aria-hidden="true">📶</span> 1. Pisos y Accesibilidad
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="select-piso" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">¿En qué piso está?</label>
                      <select
                        id="select-piso"
                        value={state.piso}
                        onChange={(e) => {
                          const val = e.target.value;
                          setState({ 
                            ...state, 
                            piso: val,
                            ascensor: val === '0' ? 'no-aplica' : state.ascensor === 'no-aplica' ? 'si' : state.ascensor
                          });
                        }}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:border-amber-500 outline-none transition-all"
                      >
                        <option value="0" className="dark:bg-slate-900">Planta Baja (Casa / PB)</option>
                        <option value="1" className="dark:bg-slate-900">1° Piso</option>
                        <option value="2" className="dark:bg-slate-900">2° Piso</option>
                        <option value="3" className="dark:bg-slate-900">3° Piso</option>
                        <option value="4" className="dark:bg-slate-900">4° Piso</option>
                        <option value="5" className="dark:bg-slate-900">5° o más arriba</option>
                      </select>
                    </div>

                    {state.piso !== '0' && (
                      <div className="space-y-1.5">
                        <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">¿Hay ascensor disponible?</span>
                        <div className="flex gap-2" role="radiogroup" aria-label="Disponibilidad de ascensor">
                          <button
                            type="button"
                            role="radio"
                            aria-checked={state.ascensor === 'si'}
                            onClick={() => setState({ ...state, ascensor: 'si' })}
                            className={`flex-1 py-2.5 rounded-xl border font-bold text-xs transition-all cursor-pointer ${
                              state.ascensor === 'si' 
                                ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm' 
                                : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                            }`}
                          >
                            Sí, hay ascensor
                          </button>
                          <button
                            type="button"
                            role="radio"
                            aria-checked={state.ascensor === 'no'}
                            onClick={() => setState({ ...state, ascensor: 'no' })}
                            className={`flex-1 py-2.5 rounded-xl border font-bold text-xs transition-all cursor-pointer ${
                              state.ascensor === 'no' 
                                ? 'bg-rose-500 border-rose-500 text-white shadow-sm' 
                                : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                            }`}
                          >
                            No (Por Escalera)
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Objetos Especiales */}
                <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                  <h3 className="text-md font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="text-amber-500" aria-hidden="true">🎹</span> 2. ¿Hay objetos delicados o súper pesados?
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: 'piano', label: 'Piano', emoji: '🎹' },
                      { id: 'caja_fuerte', label: 'Caja Fuerte', emoji: '🪙' },
                      { id: 'heladera', label: 'Heladera Grande', emoji: '❄️' },
                      { id: 'mesa_pool', label: 'Mesa de Pool', emoji: '🎱' },
                      { id: 'vidrios', label: 'Vidrios/Espejos', emoji: '🖼️' }
                    ].map(item => (
                      <button
                        key={item.id}
                        type="button"
                        aria-pressed={state.objetosEspeciales.includes(item.id)}
                        onClick={() => handleSpecialItemToggle(item.id)}
                        className={`p-3 rounded-xl border text-center transition-all font-semibold text-xs cursor-pointer ${
                          state.objetosEspeciales.includes(item.id) 
                            ? 'border-amber-500 bg-amber-50 dark:bg-amber-500/15 text-amber-900 dark:text-amber-400' 
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span aria-hidden="true">{item.emoji} </span>
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* STEP 3: Servicios Adicionales y Cronograma */}
            {step === 3 && (
              <section className="space-y-8 animate-fade-in text-left">
                {/* Servicios requeridos */}
                <div className="space-y-4">
                  <h3 className="text-md font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="text-amber-500" aria-hidden="true">📦</span> 1. ¿Qué servicios necesitás sumar?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: 'embalaje', title: 'Embalaje Completo', emoji: '📦', desc: 'Llevamos cajas y envolvemos vajilla, platos y ropa.' },
                      { id: 'desarme', title: 'Desarme de Muebles', emoji: '🔧', desc: 'Desarmamos placares pesados, camas y mesas grandes.' },
                      { id: 'armado', title: 'Armado en Destino', emoji: '🔨', desc: 'Dejamos tus muebles armados y acomodados en su lugar.' },
                      { id: 'guardamuebles', title: 'Guardamuebles', emoji: '🏢', desc: '¿Tenés que esperar unos días? Te guardamos todo.' }
                    ].map(svc => (
                      <button
                        key={svc.id}
                        type="button"
                        role="checkbox"
                        aria-checked={state.servicios.includes(svc.id)}
                        onClick={() => handleServiceToggle(svc.id)}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                          state.servicios.includes(svc.id) 
                            ? 'border-amber-500 bg-amber-50/60 dark:bg-amber-500/10 ring-1 ring-amber-500/20' 
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-750'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded border mt-0.5 flex items-center justify-center shrink-0 ${
                          state.servicios.includes(svc.id) ? 'bg-amber-500 border-amber-500 text-slate-950' : 'border-slate-300 dark:border-slate-700'
                        }`}>
                          {state.servicios.includes(svc.id) && <Check className="w-3.5 h-3.5 stroke-[3]" aria-hidden="true" />}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                            <span aria-hidden="true">{svc.emoji} </span>
                            {svc.title}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{svc.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fecha y Horario */}
                <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                  <h3 className="text-md font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="text-amber-500" aria-hidden="true">📅</span> 2. ¿Qué día tenés planeado mudarte?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="input-fecha" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Fecha Tentativa</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" aria-hidden="true" />
                        <input
                          id="input-fecha"
                          type="date"
                          value={state.fecha}
                          onChange={(e) => setState({ ...state, fecha: e.target.value })}
                          onBlur={() => setTouched(prev => ({ ...prev, fecha: true }))}
                          min={new Date().toISOString().split('T')[0]}
                          className={`w-full pl-9 pr-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-950 outline-none text-slate-800 dark:text-slate-100 text-xs sm:text-sm transition-all ${
                            touched.fecha && validateFecha(state.fecha)
                              ? 'border-rose-500 dark:border-rose-500/80 focus:ring-2 focus:ring-rose-500/20'
                              : 'border-slate-200 dark:border-slate-800 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
                          }`}
                        />
                      </div>
                      {touched.fecha && validateFecha(state.fecha) && (
                        <p id="fecha-error" className="text-[11px] text-rose-500 font-semibold flex items-center gap-1 mt-1 animate-fade-in">
                          <span aria-hidden="true">⚠️</span> {validateFecha(state.fecha)}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Preferencia Horaria</span>
                      <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Preferencia Horaria">
                        {[
                          { id: 'manana', label: 'Mañana', emoji: '🌅' },
                          { id: 'tarde', label: 'Tarde', emoji: '🌇' },
                          { id: 'todo-dia', label: 'Todo el día', emoji: '☀️' }
                        ].map(t => (
                          <button
                            key={t.id}
                            type="button"
                            role="radio"
                            aria-checked={state.horario === t.id}
                            onClick={() => setState({ ...state, horario: t.id as any })}
                            className={`py-2 rounded-xl border text-center font-bold text-[10px] sm:text-xs transition-all cursor-pointer ${
                              state.horario === t.id 
                                ? 'bg-amber-500 border-amber-500 text-slate-950 shadow-sm' 
                                : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                            }`}
                          >
                            <span aria-hidden="true">{t.emoji} </span>
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* STEP 4: Datos de contacto */}
            {step === 4 && (
              <section className="space-y-6 animate-fade-in text-left">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="text-amber-500" aria-hidden="true">📞</span> Datos de contacto y detalles finales
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Ingresá tus datos para que un asesor valide las distancias y prepare tu cotización.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="input-nombre" className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Nombre Completo</label>
                    <input
                      id="input-nombre"
                      type="text"
                      placeholder="Ej: Marcos Pérez"
                      value={state.nombre}
                      onChange={(e) => setState({ ...state, nombre: e.target.value })}
                      onBlur={() => handleBlur('nombre')}
                      aria-invalid={touched.nombre && !!validateName(state.nombre)}
                      aria-describedby={touched.nombre && validateName(state.nombre) ? "nombre-error" : undefined}
                      className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 outline-none transition-all ${
                        touched.nombre && validateName(state.nombre)
                          ? 'border-rose-500 dark:border-rose-500/80 focus:ring-2 focus:ring-rose-500/20'
                          : 'border-slate-200 dark:border-slate-800 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
                      }`}
                    />
                    {touched.nombre && validateName(state.nombre) && (
                      <p id="nombre-error" className="text-[11px] text-rose-500 font-semibold flex items-center gap-1 mt-1 animate-fade-in">
                        <span aria-hidden="true">⚠️</span> {validateName(state.nombre)}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="input-telefono" className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400">WhatsApp / Teléfono</label>
                    <input
                      id="input-telefono"
                      type="tel"
                      placeholder="Ej: 261 1234567"
                      value={state.telefono}
                      onChange={(e) => setState({ ...state, telefono: e.target.value })}
                      onBlur={() => handleBlur('telefono')}
                      aria-invalid={touched.telefono && !!validatePhone(state.telefono)}
                      aria-describedby={touched.telefono && validatePhone(state.telefono) ? "telefono-error" : undefined}
                      className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 outline-none transition-all ${
                        touched.telefono && validatePhone(state.telefono)
                          ? 'border-rose-500 dark:border-rose-500/80 focus:ring-2 focus:ring-rose-500/20'
                          : 'border-slate-200 dark:border-slate-800 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
                      }`}
                    />
                    {touched.telefono && validatePhone(state.telefono) && (
                      <p id="telefono-error" className="text-[11px] text-rose-500 font-semibold flex items-center gap-1 mt-1 animate-fade-in">
                        <span aria-hidden="true">⚠️</span> {validatePhone(state.telefono)}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label htmlFor="input-email" className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Correo Electrónico</label>
                    <input
                      id="input-email"
                      type="email"
                      placeholder="Ej: marcos@correo.com"
                      value={state.email}
                      onChange={(e) => setState({ ...state, email: e.target.value })}
                      onBlur={() => handleBlur('email')}
                      aria-invalid={touched.email && !!validateEmail(state.email)}
                      aria-describedby={touched.email && validateEmail(state.email) ? "email-error" : undefined}
                      className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 outline-none transition-all ${
                        touched.email && validateEmail(state.email)
                          ? 'border-rose-500 dark:border-rose-500/80 focus:ring-2 focus:ring-rose-500/20'
                          : 'border-slate-200 dark:border-slate-800 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
                      }`}
                    />
                    {touched.email && validateEmail(state.email) && (
                      <p id="email-error" className="text-[11px] text-rose-500 font-semibold flex items-center gap-1 mt-1 animate-fade-in">
                        <span aria-hidden="true">⚠️</span> {validateEmail(state.email)}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label htmlFor="input-observaciones" className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Observaciones o detalles extra (Opcional)</label>
                    <textarea
                      id="input-observaciones"
                      rows={2}
                      placeholder="Ej: Tengo una mesa de vidrio delicada que hay que bajar de un primer piso."
                      value={state.observaciones}
                      onChange={(e) => setState({ ...state, observaciones: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 focus:border-amber-500 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 outline-none text-sm resize-none"
                    />
                  </div>
                </div>
              </section>
            )}
          </div>
        ) : (
          /* SUBMITTED / RESULTS SCREEN */
          <div 
            ref={submittedRef}
            tabIndex={-1}
            className="space-y-8 text-center animate-fade-in py-6 outline-none"
            aria-label="Resultados de la cotización enviada"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mb-2">
              <Check className="w-8 h-8 stroke-[3]" aria-hidden="true" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">¡Presupuesto Enviado con Éxito!</h3>
              <p className="text-slate-600 dark:text-slate-350 max-w-lg mx-auto">
                Tu solicitud ya se envió por WhatsApp. Si no se abrió la ventana, podés hacer clic abajo para enviarlo manualmente.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2 max-w-md mx-auto">
              <a
                href={`https://wa.me/5492612345678?text=${generateWhatsAppMessage()}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3.5 rounded-xl text-md shadow transition-all"
              >
                <PhoneCall className="w-5 h-5 mr-2" aria-hidden="true" />
                Reenviar por WhatsApp
              </a>

              <button
                onClick={resetForm}
                className="inline-flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold px-6 py-3.5 rounded-xl text-md transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4 mr-2" aria-hidden="true" />
                Cotizar de nuevo
              </button>
            </div>

            {/* INTEGRATED IA MOVING PLANNER SECTION */}
            <div className="mt-12 text-left border-t border-slate-100 dark:border-slate-800 pt-8 space-y-4">
              <div className="flex items-center gap-2.5 bg-amber-500/10 text-amber-800 dark:text-amber-400 border border-amber-500/20 px-4 py-3 rounded-xl">
                <span className="text-2xl" aria-hidden="true">🤖</span>
                <div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">Plan de Mudanza IA en Generación</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">Nuestro Asistente de IA está cruzando tus datos para armar un checklist de mudanza único.</p>
                </div>
              </div>

              {aiLoading ? (
                <div 
                  className="flex flex-col items-center justify-center py-12 space-y-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800"
                  role="status"
                  aria-label="Cargando plan de mudanza personalizado"
                >
                  <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                  <p className="text-xs text-slate-500 dark:text-slate-450 font-medium">Analizando distancias y armando el checklist...</p>
                </div>
              ) : (
                aiPlanText && (
                  <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl border border-slate-800 shadow-inner max-h-[400px] overflow-y-auto space-y-4 text-sm scrollbar-thin">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-2">
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wide flex items-center gap-1">
                        <FileText className="w-4 h-4" aria-hidden="true" /> Checklist Personalizado para {state.nombre}
                      </span>
                      <span className="text-[10px] bg-slate-800 text-slate-400 px-2.5 py-1 rounded-full font-semibold">Generado por Gemini 3.5</span>
                    </div>
                    <div className="prose prose-invert prose-amber max-w-none text-slate-300 leading-relaxed space-y-3 font-sans">
                      {aiPlanText.split('\n').map((line, idx) => {
                        if (line.startsWith('###')) {
                          return <h4 key={idx} className="text-sm font-bold text-amber-300 pt-2">{line.replace('###', '')}</h4>;
                        } else if (line.startsWith('##')) {
                          return <h3 key={idx} className="text-md font-extrabold text-amber-400 pt-3">{line.replace('##', '')}</h3>;
                        } else if (line.startsWith('* **') || line.startsWith('- **')) {
                          return <p key={idx} className="pl-4 border-l-2 border-amber-500/40 py-0.5 text-xs">{line}</p>;
                        }
                        return <p key={idx} className="text-xs">{line}</p>;
                      })}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons for the wizard */}
        {!submitted && (
          <nav className="flex justify-between items-center pt-8 border-t border-slate-100 dark:border-slate-800 mt-8" aria-label="Navegación del formulario">
            <button
              type="button"
              onClick={prevStep}
              className={`inline-flex items-center justify-center px-5 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                step === 1 
                  ? 'text-slate-300 dark:text-slate-750 pointer-events-none' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
              aria-disabled={step === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-1.5" aria-hidden="true" />
              Atrás
            </button>

            <button
              type="button"
              onClick={nextStep}
              className="inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3.5 rounded-xl text-sm shadow hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer focus:ring-4 focus:ring-amber-500/40"
            >
              {step === 4 ? 'Confirmar y WhatsApp' : 'Siguiente'}
              {step !== 4 && <ChevronRight className="w-4 h-4 ml-1.5" aria-hidden="true" />}
            </button>
          </nav>
        )}
      </div>
    </div>
  );
}
