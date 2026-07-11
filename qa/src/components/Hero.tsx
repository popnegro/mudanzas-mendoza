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
    <section id="hero-section" className="relative overflow-hidden bg-slate-950 text-white py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 border-b border-slate-900">
      
      {/* Background Image of Mendoza with Andes and Mudanzas Miranda Truck */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img 
          src={mudanzasMirandaHeroV2}
          alt="Servicio de fletes y mudanzas en Mendoza operando bajo la firma oficial de Mudanzas Miranda con la cordillera de los Andes al fondo"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-20 md:opacity-25 lg:opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
      </div>

      {/* Decorative sophisticated ambient glows matching Malbec & Amber Sunset */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-[450px] h-[450px] bg-rose-900/10 rounded-full blur-[110px] pointer-events-none" />
      
      {/* Visual background grid pattern for depth */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left column: High-converting copy */}
        <div className="lg:col-span-7 space-y-8 text-left">
          
          {/* Availability Status & Co-branding Badges */}
          <div className="flex flex-wrap gap-2.5 items-center">
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block animate-pulse" />
              <span>Guardia Activa: Mendoza Hoy</span>
            </div>
            <a 
              href="https://www.mudanzasmiranda.com.ar/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 px-3.5 py-1.5 rounded-full text-[10px] font-bold shadow-sm transition-all"
            >
              <span>División de</span>
              <strong className="text-amber-400">Mudanzas Miranda</strong>
            </a>
          </div>

          {/* Heading with sophisticated custom typography */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight leading-tight text-white">
              ¿Te mudás en Mendoza? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500">
                Nos ocupamos de todo.
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-2xl">
              Fletes rápidos, mudanzas residenciales de gran porte y embalaje premium. Operamos con personal propio y póliza civil certificada de <strong className="text-white">Sancor Seguros</strong>.
            </p>
          </div>

          {/* Core Value Props Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-slate-200 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="font-medium">Puntualidad con tracking en tiempo real</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="font-medium">Choferes propios verificados</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="font-medium">Póliza Civil Sancor Seguros</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="font-medium">Tarifas transparentes sin sorpresas</span>
            </div>
          </div>

          {/* Core Conversion CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              id="btn-cotizar-hero"
              onClick={onStartQuote}
              className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl text-sm shadow-lg shadow-amber-500/10 hover:scale-[1.01] transition-all cursor-pointer group"
            >
              <Truck className="w-4 h-4 mr-2 transition-transform group-hover:translate-x-0.5" />
              Cotizar mi Mudanza
            </button>

            <a
              href="https://wa.me/5492612345678?text=Hola%2C%20quiero%20solicitar%20un%20presupuesto%20para%20una%20mudanza%20en%20Mendoza"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 font-bold px-6 py-3.5 rounded-xl text-sm shadow transition-all"
            >
              <PhoneCall className="w-4 h-4 mr-2 text-emerald-500" />
              WhatsApp de Guardia
            </a>
          </div>

          {/* Social Proof Bar */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-900 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400 stroke-none" />
                ))}
              </div>
              <span className="font-bold text-white">4.9/5</span>
              <span>(1,200+ familias en Mendoza)</span>
            </div>
            <span className="hidden sm:inline text-slate-800">|</span>
            <div className="flex items-center gap-1 text-slate-400">
              <Shield className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Garantía de Cuidado Integral</span>
            </div>
          </div>
        </div>

        {/* Right column: Beautiful Branded Fleet Card - Mudanzas Miranda Showcase */}
        <div className="lg:col-span-5 relative w-full flex flex-col items-center justify-center">
          <div className="w-full max-w-sm bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800/80 p-5 shadow-2xl text-left space-y-4">
            <div className="w-full h-48 sm:h-56 rounded-xl overflow-hidden border border-slate-800 shadow-inner group relative">
              <img
                src={mudanzaMirandaTruck}
                alt="Flota oficial de camiones de Mudanzas Miranda operando en Mendoza con la cordillera al fondo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
              <div className="absolute bottom-2.5 left-2.5 bg-slate-900/90 backdrop-blur-sm border border-slate-800/60 px-2 py-0.5 rounded text-[9px] font-bold text-amber-400 uppercase tracking-wider">
                Unidad n° 42 • Habilitada CNRT
              </div>
            </div>
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>🚚</span> Respaldo e Infraestructura Miranda
              </h4>
              <p className="text-[11px] text-slate-350 leading-relaxed">
                Nuestra división digital premium cuenta con el equipamiento pesado de <strong className="text-white">Mudanzas Miranda</strong>, líderes en Cuyo con más de 50 años de trayectoria.
              </p>
              <div className="pt-2 border-t border-slate-850/60 flex items-center justify-between text-[10px] text-slate-400">
                <span>📍 Mendoza y Cuyo</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block animate-pulse" />
                  Sancor Seguros Activo
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
