import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Cotizador from './components/Cotizador';
import ConfidenceIndicators from './components/ConfidenceIndicators';
import DepartmentLanding from './components/DepartmentLanding';
import ServiceLanding from './components/ServiceLanding';
import BlogSection from './components/BlogSection';
import ChatBot from './components/ChatBot';
import Footer from './components/Footer';
import AuditedValueSection from './components/AuditedValueSection';
import AIMovingPlannerSection from './components/AIMovingPlannerSection';
import CoverageMap from './components/CoverageMap';
import CoverageLanding from './components/CoverageLanding';
import PlannerLanding from './components/PlannerLanding';

import { DEPARTMENTS, SERVICES, GENERAL_FAQS } from './data';
import { CotizacionState, BlogArticle } from './types';
import { 
  PhoneCall, 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  HelpCircle, 
  X, 
  Sparkles, 
  Percent, 
  VolumeX, 
  Menu,
  Sun,
  Moon,
  Brain
} from 'lucide-react';

export default function App() {
  // Theme Toggle state (localStorage persisted)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return 'light'; // Default to light mode
  });

  // Apply theme class to document element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Navigation Routing States
  const [view, setView] = useState<'home' | 'departamento' | 'servicio' | 'blog' | 'cobertura' | 'planificador'>('home');
  const [activeSlug, setActiveSlug] = useState<string>('');

  // AI Planner States
  const [aiPlanText, setAiPlanText] = useState<string>('');
  const [aiLoading, setAiLoading] = useState<boolean>(false);

  // Floating Chatbot States
  const [chatOpen, setChatOpen] = useState<boolean>(false);

  // CRO Exit Intent Modal States
  const [exitIntentTriggered, setExitIntentTriggered] = useState<boolean>(false);
  const [showExitModal, setShowExitModal] = useState<boolean>(false);

  // Mobile navigation drawer toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Sticky Bottom CTA display on scroll
  const [showStickyCta, setShowStickyCta] = useState<boolean>(false);

  // FAQ Accordion State (index of open general FAQ)
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Dynamic SEO Meta Tags & Canonical URL Management State
  const [activeBlogArticle, setActiveBlogArticle] = useState<BlogArticle | null>(null);

  // Dynamic SEO Meta Tags & Canonical URL Management Effect
  useEffect(() => {
    let title = "Mudanzas Mendoza 2026 | Fletes y Traslados Profesionales";
    let description = "Servicio premium de fletes y mudanzas en Mendoza. Cotización inmediata, embalaje premium, póliza de Sancor Seguros y planificador de mudanza con Inteligencia Artificial.";
    let canonicalPath = "";

    if (view === 'departamento' && activeSlug) {
      const dept = DEPARTMENTS.find(d => d.slug === activeSlug);
      if (dept) {
        title = dept.seo?.title || `Mudanzas en ${dept.name} | Fletes Mendoza 2026`;
        description = dept.seo?.description || dept.description || `Servicios de mudanzas y fletes rápidos en ${dept.name}, Mendoza.`;
        canonicalPath = `/departamento/${dept.slug}`;
      }
    } else if (view === 'servicio' && activeSlug) {
      const svc = SERVICES.find(s => s.slug === activeSlug);
      if (svc) {
        title = svc.seo?.title || `${svc.name} en Mendoza | Mudanzas Mendoza 2026`;
        description = svc.seo?.description || svc.description || `Servicio profesional de ${svc.name} en Mendoza.`;
        canonicalPath = `/servicio/${svc.slug}`;
      }
    } else if (view === 'blog') {
      if (activeBlogArticle) {
        title = `${activeBlogArticle.title} | Blog Mendoza 2026`;
        description = activeBlogArticle.summary || `Leé nuestro artículo sobre ${activeBlogArticle.title} en Mendoza.`;
        canonicalPath = `/blog/${activeBlogArticle.slug}`;
      } else {
        title = "Blog de Mudanzas y Fletes en Mendoza | Consejos de Expertos";
        description = "Leé los mejores consejos para organizar tu mudanza en Mendoza, embalar electrodomésticos y ahorrar dinero en tus fletes. Escrito por fletistas experimentados.";
        canonicalPath = "/blog";
      }
    } else if (view === 'cobertura') {
      title = "Cobertura Completa de Fletes y Mudanzas en Mendoza | Zonas y Bases";
      description = "Explorá nuestro mapa interactivo de cobertura en Mendoza. Brindamos fletes y mudanzas en Capital, Godoy Cruz, Guaymallén, Luján, Maipú y más.";
      canonicalPath = "/cobertura";
    } else if (view === 'planificador') {
      title = "Planificador de Mudanza Inteligente con IA | Mendoza 2026";
      description = "Generá tu checklist personalizado y plan de contingencia con nuestra Inteligencia Artificial para una mudanza en Mendoza totalmente libre de estrés.";
      canonicalPath = "/planificador";
    } else {
      // Home or default
      title = "Mudanzas Mendoza 2026 | Fletes y Traslados Profesionales";
      description = "Servicio premium de fletes y mudanzas en Mendoza. Cotización inmediata, embalaje premium, póliza de Sancor Seguros y planificador de mudanza con Inteligencia Artificial.";
      canonicalPath = "/";
    }

    // 1. Update Document Title
    document.title = title;

    // 2. Update/Create Description Meta Tag
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // 3. Update/Create Canonical Link Tag
    const baseOrigin = window.location.origin || "https://mendozamudanzas2026.com";
    const canonicalUrl = `${baseOrigin}${canonicalPath}`;
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

  }, [view, activeSlug, activeBlogArticle]);

  // Reset selected blog article when leaving the blog view
  useEffect(() => {
    if (view !== 'blog') {
      setActiveBlogArticle(null);
    }
  }, [view]);

  // 1. SCROLL DETECTOR FOR STICKY CTA
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowStickyCta(true);
      } else {
        setShowStickyCta(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. EXIT INTENT POPUP DETECTION (Triggers once when mouse leaves window)
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 50 && !exitIntentTriggered) {
        setExitIntentTriggered(true);
        setShowExitModal(true);
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [exitIntentTriggered]);

  // Keyboard accessibility helper for modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowExitModal(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 3. HANDLERS
  const handleStartQuote = () => {
    setView('home');
    setActiveSlug('');
    setMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById('cotizador-seccion');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const handleNavigateDept = (slug: string) => {
    const selected = DEPARTMENTS.find(d => d.slug === slug);
    if (selected) {
      setView('departamento');
      setActiveSlug(slug);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleNavigateService = (slug: string) => {
    const selected = SERVICES.find(s => s.slug === slug);
    if (selected) {
      setView('servicio');
      setActiveSlug(slug);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleNavigateBlog = () => {
    setView('blog');
    setActiveSlug('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleNavigateCobertura = () => {
    setView('cobertura');
    setActiveSlug('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleNavigatePlanificador = () => {
    setView('planificador');
    setActiveSlug('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleNavigateHome = () => {
    setView('home');
    setActiveSlug('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleGeneratePlan = async (details: CotizacionState) => {
    setAiLoading(true);
    setAiPlanText('');
    try {
      const response = await fetch('/api/gemini/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin: details.origen,
          destination: details.destino,
          housingType: details.tipoVivienda,
          rooms: details.ambientes,
          floor: details.piso,
          elevator: details.ascensor,
          services: details.servicios,
          specialItems: details.objetosEspeciales,
          date: details.fecha,
          name: details.nombre
        })
      });
      const data = await response.json();
      if (data.success) {
        setAiPlanText(data.plan);
      } else {
        throw new Error('Plan generation failed.');
      }
    } catch (err) {
      console.error(err);
      setAiPlanText('Ocurrió un error al generar tu plan automático con IA. ¡Escribinos un WhatsApp de guardia y te asesoramos personalmente!');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950 transition-colors duration-300">
      
      {/* HEADER NAVIGATION */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo / Title */}
          <button 
            onClick={handleNavigateHome}
            className="flex items-center gap-2.5 text-xl sm:text-2xl font-extrabold tracking-tight hover:scale-102 transition-transform cursor-pointer"
          >
            <span className="text-3xl">🚚</span>
            <span className="font-extrabold uppercase bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-amber-400">
              Mendoza 2026
            </span>
          </button>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-300">
            <button onClick={handleNavigateHome} className="hover:text-amber-400 transition-colors cursor-pointer">Inicio</button>
            
            {/* Services Dropdown link */}
            <div className="relative group">
              <span className="hover:text-amber-400 transition-colors cursor-default py-4">Servicios</span>
              <div className="absolute top-full -left-4 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 hidden group-hover:block animate-fade-in mt-1">
                {SERVICES.map(svc => (
                  <button
                    key={svc.id}
                    onClick={() => handleNavigateService(svc.slug)}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-slate-800 hover:text-amber-400 transition-all cursor-pointer font-medium"
                  >
                    {svc.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Departments Dropdown link */}
            <div className="relative group">
              <span className="hover:text-amber-400 transition-colors cursor-default py-4">Zonas</span>
              <div className="absolute top-full -left-4 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 hidden group-hover:block animate-fade-in mt-1">
                {DEPARTMENTS.map(dept => (
                  <button
                    key={dept.id}
                    onClick={() => handleNavigateDept(dept.slug)}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-slate-800 hover:text-amber-400 transition-all cursor-pointer font-medium"
                  >
                    {dept.name}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={handleNavigateBlog} className="hover:text-amber-400 transition-colors cursor-pointer font-medium">Blog</button>
            <button onClick={handleNavigateCobertura} className="hover:text-amber-400 transition-colors cursor-pointer font-medium">Nuestra Cobertura</button>
            <button onClick={handleNavigatePlanificador} className="hover:text-amber-400 transition-colors cursor-pointer font-semibold flex items-center gap-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1.5 rounded-xl text-xs hover:bg-amber-500/20 transition-all">
              <Brain className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              Planificador IA
            </button>
          </nav>

          {/* Desktop CTA actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-slate-300 hover:text-amber-400 hover:bg-slate-900 transition-all cursor-pointer flex items-center justify-center border border-slate-900"
              title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              aria-label="Cambiar tema de color"
            >
              {theme === 'dark' ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>
            <a 
              href="tel:+5492612345678"
              className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-amber-400 font-bold transition-colors"
            >
              📞 261 2345678
            </a>
            <button
              onClick={handleStartQuote}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs shadow transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Calcular Presupuesto
            </button>
          </div>

          {/* Mobile hamburger & theme toggle */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-slate-300 hover:text-amber-400 hover:bg-slate-900 transition-all cursor-pointer flex items-center justify-center"
              title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              aria-label="Cambiar tema de color"
            >
              {theme === 'dark' ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir menú"
              className="p-2 rounded-lg hover:bg-slate-800 text-white transition-all cursor-pointer"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-t border-slate-800 p-4 space-y-4 animate-fade-in">
            <div className="flex flex-col gap-3 text-sm font-semibold">
              <button onClick={handleNavigateHome} className="text-left text-slate-200 py-1.5 border-b border-slate-850">Inicio</button>
              <button onClick={handleNavigateCobertura} className="text-left text-slate-200 py-1.5 border-b border-slate-850">Nuestra Cobertura</button>
              <button onClick={handleNavigatePlanificador} className="text-left text-amber-400 py-1.5 flex items-center gap-1.5 border-b border-slate-850">
                <Brain className="w-4 h-4 text-amber-500" />
                Planificador IA
              </button>
              <button onClick={handleNavigateBlog} className="text-left text-slate-200 py-1.5 border-b border-slate-850">Blog y Consejos</button>
              
              <div className="border-t border-slate-800 pt-3">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-wider block mb-2">Servicios</span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {SERVICES.map(svc => (
                    <button key={svc.id} onClick={() => handleNavigateService(svc.slug)} className="text-left text-slate-300 py-1">{svc.name}</button>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-800 pt-3">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-wider block mb-2">Departamentos</span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {DEPARTMENTS.map(dept => (
                    <button key={dept.id} onClick={() => handleNavigateDept(dept.slug)} className="text-left text-slate-300 py-1">{dept.name}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-4 flex flex-col gap-3">
              <a href="tel:+5492612345678" className="text-slate-300 text-xs font-semibold text-center">📞 WhatsApp de Guardia: 261 2345678</a>
              <button
                onClick={handleStartQuote}
                className="w-full bg-amber-500 text-slate-950 font-bold py-3 rounded-xl text-sm"
              >
                Cotizar Mudanza
              </button>
            </div>
          </div>
        )}
      </header>

      {/* CORE ROUTING RENDERER */}
      <main className="flex-1">
        
        {view === 'home' && (
          <div className="space-y-16 sm:space-y-24">
            
            {/* HERO MODULE */}
            <Hero onStartQuote={handleStartQuote} onOpenChat={() => setChatOpen(true)} />

            {/* INTERACTIVE SERVICES SHUFFLE MODULE */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
                <span className="text-xs font-extrabold text-amber-500 uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full inline-block">Nuestros Servicios</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Soluciones de Mudanza a tu Medida</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Contamos con distintas modalidades adaptadas a cada volumen y presupuesto en Mendoza.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {SERVICES.map((svc) => (
                  <div 
                    key={svc.id} 
                    className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-150 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all text-left"
                  >
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-xl font-bold">
                        {svc.id === 'fletes-economicos' && '🚚'}
                        {svc.id === 'transporte-de-muebles' && '📦'}
                        {svc.id === 'traslado-de-offices' && '💼'}
                        {svc.id === 'mudanzas-urgentes' && '⚡'}
                        {svc.id === 'mudanzas-24-horas' && '🕒'}
                      </div>
                      <h3 className="text-lg font-bold text-slate-950 dark:text-white">{svc.name}</h3>
                      <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">{svc.description}</p>
                    </div>

                    <button
                      onClick={() => handleNavigateService(svc.slug)}
                      className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
                    >
                      Ver más detalles <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* DYNAMIC INTEGRATED COTIZADOR */}
            <section className="bg-slate-900 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 text-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="max-w-7xl mx-auto space-y-12 relative z-10">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Paso a Paso</span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">Calculá tu Presupuesto al Toque</h2>
                  <p className="text-slate-400 text-sm">Completá el cotizador de 8 pasos. Abrirá un canal de WhatsApp con tus datos listos y te generará un checklist de IA inmediato.</p>
                </div>

                <Cotizador 
                  onGeneratePlan={handleGeneratePlan} 
                  aiPlanText={aiPlanText} 
                  aiLoading={aiLoading} 
                />
              </div>
            </section>

            {/* AUDITED COMPETITIVE VALUE INSIGHTS SECTION */}
            <AuditedValueSection />

            {/* AI MOVING PLANNER EXPERT SECTION */}
            <AIMovingPlannerSection onNavigatePlanificador={handleNavigatePlanificador} />

            {/* LOCAL DEPARTMENTS ENLAZADO INTERNO MAP BLOCK */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <span className="text-xs font-bold text-amber-500 uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full inline-block">Nuestra Cobertura</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Presencia en Todos los Departamentos</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Elegí tu localidad para conocer los detalles, regulaciones céntricas y fletes asignados de tu zona o explorá el mapa interactivo de bases.</p>
                <div className="pt-2">
                  <button
                    onClick={handleNavigateCobertura}
                    className="inline-flex items-center gap-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold px-4.5 py-2 rounded-xl text-xs transition-all cursor-pointer border border-amber-500/20"
                  >
                    🌐 Ver Pantalla Completa con Mapa de Cobertura <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* INTERACTIVE LOGISTICS & COVERAGE MAP */}
              <CoverageMap 
                departments={DEPARTMENTS} 
                onSelectDepartment={handleNavigateDept} 
              />

              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider text-center">Acceso Directo por Departamento</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {DEPARTMENTS.map((dept) => (
                    <button
                      key={dept.id}
                      onClick={() => handleNavigateDept(dept.slug)}
                      className="p-5 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-xl hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm transition-all text-left flex flex-col justify-between h-32 group cursor-pointer"
                    >
                      <span className="text-lg">🍇</span>
                      <div>
                        <h4 className="font-extrabold text-slate-950 dark:text-white text-sm group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">{dept.name}</h4>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block">Fletes asignados</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* ACADEMIA BLOG BLOCK SHUFFLE */}
            <BlogSection onBackToHome={handleStartQuote} onArticleSelect={setActiveBlogArticle} />

            {/* ACCORDION GENERAL FAQs */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
                <HelpCircle className="w-8 h-8 text-amber-500 mx-auto" />
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Preguntas Frecuentes de Mudanzas</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Todo lo que necesitás saber antes del día de tu traslado.</p>
              </div>

              <div className="space-y-3.5 text-left">
                {GENERAL_FAQS.map((faq, i) => {
                  const isOpen = openFaqIdx === i;
                  return (
                    <div key={i} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-250 dark:border-slate-800 shadow-sm overflow-hidden transition-all">
                      <button
                        onClick={() => setOpenFaqIdx(isOpen ? null : i)}
                        className="w-full px-5 py-4 flex items-center justify-between text-left font-bold text-slate-900 dark:text-white text-sm sm:text-base cursor-pointer hover:bg-slate-50/55 dark:hover:bg-slate-800/55 transition-colors"
                      >
                        <span>{faq.question}</span>
                        <span className="text-amber-500 font-extrabold text-lg">{isOpen ? '−' : '+'}</span>
                      </button>
                      
                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-50 dark:border-slate-800">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* CONFIDENCE & SEO INDICATORS */}
            <ConfidenceIndicators />

          </div>
        )}

        {/* DYNAMIC LANDING VIEWS */}
        {view === 'departamento' && (
          <DepartmentLanding
            dept={DEPARTMENTS.find(d => d.slug === activeSlug)!}
            onBack={handleNavigateHome}
            onStartQuote={handleStartQuote}
          />
        )}

        {view === 'servicio' && (
          <ServiceLanding
            service={SERVICES.find(s => s.slug === activeSlug)!}
            onBack={handleNavigateHome}
            onStartQuote={handleStartQuote}
          />
        )}

        {view === 'blog' && (
          <BlogSection onBackToHome={handleStartQuote} onArticleSelect={setActiveBlogArticle} />
        )}

        {view === 'cobertura' && (
          <CoverageLanding
            onBack={handleNavigateHome}
            onNavigateDept={handleNavigateDept}
            onStartQuote={handleStartQuote}
          />
        )}

        {view === 'planificador' && (
          <PlannerLanding
            onBack={handleNavigateHome}
            onStartQuote={handleStartQuote}
          />
        )}

      </main>

      {/* DYNAMIC FLOATING CHATBOT AI */}
      <ChatBot 
        isOpen={chatOpen} 
        onClose={() => setChatOpen(false)} 
        onOpen={() => setChatOpen(true)} 
      />

      {/* FOOTER */}
      <Footer
        onNavigateDept={handleNavigateDept}
        onNavigateService={handleNavigateService}
        onNavigateBlog={handleNavigateBlog}
        onNavigateHome={handleNavigateHome}
        onNavigateCobertura={handleNavigateCobertura}
        onNavigatePlanificador={handleNavigatePlanificador}
      />

      {/* MOBILE STICKY BOTTOM CTA */}
      {showStickyCta && (
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-slate-950 text-white border-t border-slate-900 px-4 py-3 shadow-2xl flex items-center justify-between lg:hidden animate-fade-in">
          <div className="text-left">
            <span className="text-[9px] text-emerald-400 font-extrabold uppercase tracking-wide flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" /> Guardia Activa
            </span>
            <p className="text-xs font-bold text-white mt-0.5">261 2345678</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleStartQuote}
              className="bg-amber-500 text-slate-950 font-extrabold px-4 py-2 rounded-lg text-xs"
            >
              Cotizar
            </button>
            <a
              href="https://wa.me/5492612345678?text=Hola%20Mendoza%202026.%20Quiero%20solicitar%20presupuesto."
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 p-2 rounded-lg"
              aria-label="Contactar por WhatsApp"
            >
              <PhoneCall className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>
      )}

      {/* CRO EXIT INTENT POPUP MODAL */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl max-w-md w-full p-6 relative shadow-2xl animate-fade-in text-center space-y-6">
            <button
              onClick={() => setShowExitModal(false)}
              className="absolute top-4.5 right-4.5 text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
              aria-label="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 text-xl font-bold border border-amber-500/30">
              🍷
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold tracking-tight">¡Pará un poquito, che!</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                No te vayas con dudas. Cotizá tu mudanza **hoy mismo** y te bonificamos el **Seguro de Tránsito Civil Total** en todo Mendoza.
              </p>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-850 text-xs text-slate-400 flex items-center justify-center gap-2">
              <Percent className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Promo de cortesía válida para reservas hechas esta semana.</span>
            </div>

            <div className="flex flex-col gap-2.5 pt-2">
              <button
                onClick={() => {
                  setShowExitModal(false);
                  handleStartQuote();
                }}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3.5 rounded-xl text-sm transition-all shadow"
              >
                Aprovechar Bonificación
              </button>
              <button
                onClick={() => setShowExitModal(false)}
                className="w-full text-slate-500 hover:text-slate-300 transition-colors text-xs font-semibold py-1"
              >
                No, prefiero pagar precio de lista
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
