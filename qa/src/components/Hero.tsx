import React from 'react';
import { Truck, CheckCircle2, Star, Shield, PhoneCall } from 'lucide-react';

// Import official Mudanzas Miranda truck image for co-branding and visual richness
import mudanzaMirandaTruck from '../assets/images/mudanza_miranda_truck_1783676498398.jpg';
import mudanzasMirandaHeroV2 from '../assets/images/mudanzas_miranda_hero_v2_1783677119158.jpg';

interface HeroProps {
  onStartQuote: () => void;
  onOpenChat: () => void;
}

export default function Hero({ onStartQuote, onOpenChat }: HeroProps) {

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-8 border-b border-slate-900">
      
      {/* Background Image of Mendoza with Andes and Mudanzas Miranda Truck */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img 
          src={mudanzasMirandaHeroV2}
          alt="Servicio de fletes y mudanzas en Mendoza operando bajo la firma oficial de Mudanzas Miranda con la cordillera de los Andes al fondo"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-25 md:opacity-30 lg:opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
      </div>

      {/* Decorative sophisticated ambient glows matching Malbec & Amber Sunset */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-[450px] h-[450px] bg-rose-900/15 rounded-full blur-[110px] pointer-events-none" />
      
      {/* Visual background grid pattern for depth */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left column: High-converting copy */}
        <div className="lg:col-span-7 space-y-8 lg:space-y-10 text-left">
          
          {/* Availability Status & Co-branding Badges */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/10 to-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
              <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full inline-block" />
              <span>Guardia Activa: Operando Hoy en Mendoza</span>
            </div>
            <a 
              href="https://www.mudanzasmiranda.com.ar/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 px-4 py-2 rounded-full text-xs font-bold shadow-sm transition-all"
            >
              <span>Un producto de</span>
              <strong className="text-amber-400">Mudanzas Miranda</strong>
              <span className="text-slate-500">|</span>
              <span className="text-[10px] text-amber-500 font-extrabold uppercase tracking-wide">50 años</span>
            </a>
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

        {/* Right column: Beautiful Branded Fleet Card - Mudanzas Miranda Showcase */}
        <div className="lg:col-span-5 relative w-full flex flex-col items-center justify-center">
          <div className="w-full max-w-md bg-slate-900/85 backdrop-blur-md rounded-3xl border border-slate-800/80 p-6 shadow-2xl text-left space-y-4">
            <div className="w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-slate-800 shadow-inner group relative">
              <img
                src={mudanzaMirandaTruck}
                alt="Flota oficial de camiones de Mudanzas Miranda operando en Mendoza con la cordillera al fondo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
              <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-sm border border-slate-800/60 px-2.5 py-1 rounded-md text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                Unidad n° 42 • Habilitada CNRT
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                <span className="text-amber-500 text-lg">🚚</span> Respaldo e Infraestructura Miranda
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Nuestra división digital premium opera bajo la tutela y con la inmensa flota pesada de <strong className="text-white">Mudanzas Miranda</strong>, líderes indiscutidos del sector en Cuyo con más de 50 años de trayectoria intachable.
              </p>
              <div className="pt-2 border-t border-slate-850 flex items-center justify-between text-[11px] text-slate-400">
                <span>📍 Base Central: Mendoza</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block animate-pulse" />
                  Póliza Sancor Seguros
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
