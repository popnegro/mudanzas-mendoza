import React, { useState } from 'react';
import { Truck, CheckCircle2, Star, Shield, PhoneCall, Compass, ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onStartQuote: () => void;
  onOpenChat: () => void;
}

interface LocalRoute {
  from: string;
  to: string;
  distance: number;
  time: string;
  difficulty: 'Fácil' | 'Media' | 'Compleja';
  tip: string;
}

const SAMPLE_ROUTES: LocalRoute[] = [
  { from: 'Mendoza Capital', to: 'Chacras de Coria', distance: 14, time: '20 min', difficulty: 'Fácil', tip: 'Callejón de adoquines, camiones medianos sugeridos.' },
  { from: 'Mendoza Capital', to: 'Guaymallén', distance: 5, time: '12 min', difficulty: 'Fácil', tip: 'Acceso Este despejado. Apto grúas grandes.' },
  { from: 'Mendoza Capital', to: 'Godoy Cruz', distance: 6, time: '15 min', difficulty: 'Fácil', tip: 'Cerca del Corredor del Oeste. Tránsito ágil.' },
  { from: 'Mendoza Capital', to: 'Maipú', distance: 16, time: '25 min', difficulty: 'Fácil', tip: 'Zona de bodegas. Camiones climatizados de flora recomendados.' },
  { from: 'Mendoza Capital', to: 'Luján de Cuyo', distance: 20, time: '25 min', difficulty: 'Fácil', tip: 'Ruta 40 fluida. Ideal mudanzas de fincas.' },
  { from: 'Mendoza Capital', to: 'San Rafael', distance: 232, time: '3 hs', difficulty: 'Media', tip: 'Larga distancia. Requiere inventario precintado.' },
  { from: 'Mendoza Capital', to: 'Tunuyán', distance: 83, time: '1h 10 min', difficulty: 'Fácil', tip: 'Valle de Uco. Ruta nacional en buen estado.' },
];

export default function Hero({ onStartQuote, onOpenChat }: HeroProps) {
  const [selectedRouteIdx, setSelectedRouteIdx] = useState<number>(0);
  const activeRoute = SAMPLE_ROUTES[selectedRouteIdx];

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-8 border-b border-slate-900">
      
      {/* Decorative sophisticated ambient glows matching Malbec & Amber Sunset */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-[450px] h-[450px] bg-rose-900/15 rounded-full blur-[110px] pointer-events-none" />
      
      {/* Visual background grid pattern for depth */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left column: High-converting copy */}
        <div className="lg:col-span-7 space-y-8 lg:space-y-10 text-left">
          
          {/* Availability Status Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/10 to-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider shadow-sm animate-pulse-subtle">
            <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full inline-block" />
            <span>Guardia Activa: Operando Hoy en Mendoza</span>
          </div>

          {/* Heading with sophisticated custom typography */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight leading-[1.15] lg:leading-[1.1] text-white">
              ¿Te mudás este fin de semana? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500">
                Nos ocupamos de todo.
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 font-sans font-normal leading-relaxed max-w-2xl">
              Olvidate de cargar muebles pesados en las calles angostas o preocuparte por las acequias de Mendoza. Brindamos fletes rápidos, mudanzas de gran porte y embalaje premium bajo póliza certificada de Sancor Seguros.
            </p>
          </div>

          {/* Core Value Props Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4.5 text-slate-200 text-xs sm:text-sm">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-amber-500/10 rounded-lg text-amber-500">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
              </div>
              <span className="font-medium">Puntualidad garantizada con tracking en vivo</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-amber-500/10 rounded-lg text-amber-500">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
              </div>
              <span className="font-medium">Choferes propios homologados (Verificados)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-amber-500/10 rounded-lg text-amber-500">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
              </div>
              <span className="font-medium">Póliza Civil Total ante accidentes/roturas</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-amber-500/10 rounded-lg text-amber-500">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
              </div>
              <span className="font-medium">Tarifas transparentes por kilómetro real</span>
            </div>
          </div>

          {/* Core Conversion CTAs with improved micro-interactions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={onStartQuote}
              className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-8 py-4 rounded-xl text-md shadow-lg shadow-amber-500/15 hover:shadow-amber-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer group"
            >
              <Truck className="w-5 h-5 mr-2.5 transition-transform group-hover:translate-x-1" />
              Cotizar mi Mudanza
            </button>

            <a
              href="https://wa.me/5492612345678?text=Hola%2C%20quiero%20solicitar%20un%20presupuesto%20para%20una%20mudanza%20en%20Mendoza"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 font-bold px-8 py-4 rounded-xl text-md shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              <PhoneCall className="w-5 h-5 mr-2.5 text-emerald-500" />
              WhatsApp de Guardia
            </a>
          </div>

          {/* Social Proof Bar with high-contrast elements */}
          <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-slate-900 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-none" />
                ))}
              </div>
              <span className="font-bold text-white">4.9/5 Calificaciones</span>
              <span>(1,240+ mendocinos felices)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Shield className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Garantía de Cuidado Integral Homologada</span>
            </div>
          </div>
        </div>

        {/* Right column: Interactive Distance Estimator Card */}
        <div className="lg:col-span-5 relative w-full flex justify-center">
          <div className="relative w-full max-w-md bg-slate-900/90 backdrop-blur-md rounded-3xl border border-slate-800/80 p-6.5 shadow-2xl text-left space-y-5">
            
            <div className="absolute -top-3.5 -right-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md">
              Estimador en Tiempo Real
            </div>
            
            <div className="space-y-1.5">
              <h3 className="text-lg font-display font-black text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-500" />
                Simulador de Ruta Mendoza
              </h3>
              <p className="text-slate-400 text-xs">
                Seleccioná una ruta frecuente para ver un estimador de distancias, tiempos y consejos logísticos locales al instante.
              </p>
            </div>

            {/* Route Selector Dropdown */}
            <div className="space-y-1.5">
              <label htmlFor="hero-route-selector" className="text-[10px] font-black text-slate-400 uppercase tracking-wider block pl-1">
                Recorrido Habitual
              </label>
              <select
                id="hero-route-selector"
                value={selectedRouteIdx}
                onChange={(e) => setSelectedRouteIdx(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-850 hover:border-slate-700 px-3.5 py-2.5 rounded-xl text-xs text-slate-200 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 transition-all"
              >
                {SAMPLE_ROUTES.map((route, idx) => (
                  <option key={idx} value={idx}>
                    De {route.from} a {route.to}
                  </option>
                ))}
              </select>
            </div>

            {/* Instant Metrics Panels */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-slate-950 border border-slate-900 rounded-xl p-3 text-center space-y-0.5">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Distancia</span>
                <strong className="text-sm font-display text-white">{activeRoute.distance} km</strong>
              </div>
              <div className="bg-slate-950 border border-slate-900 rounded-xl p-3 text-center space-y-0.5">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Tránsito</span>
                <strong className="text-sm font-display text-emerald-400">{activeRoute.time}</strong>
              </div>
              <div className="bg-slate-950 border border-slate-900 rounded-xl p-3 text-center space-y-0.5">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Complejidad</span>
                <strong className="text-sm font-display text-amber-400">{activeRoute.difficulty}</strong>
              </div>
            </div>

            {/* Local street advice warning */}
            <div className="bg-amber-500/5 rounded-xl p-3.5 border border-amber-500/10 text-[11px] leading-relaxed text-slate-300">
              <span className="text-amber-400 font-bold block mb-0.5">📝 Consejo Profesional Mendoza:</span>
              {activeRoute.tip}
            </div>

            {/* Continue button to quote */}
            <div className="space-y-2 pt-1">
              <button
                onClick={onStartQuote}
                className="w-full inline-flex items-center justify-center bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black px-5 py-3 rounded-xl text-xs transition-all cursor-pointer group shadow"
              >
                Pre-Cargar Ruta en el Cotizador
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-0.5" />
              </button>
              
              <button
                onClick={onOpenChat}
                className="w-full text-center text-[10px] font-bold text-slate-400 hover:text-amber-400 transition-colors py-1 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3 h-3 text-amber-500" /> Consultar normativas con el Planificador de IA
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
