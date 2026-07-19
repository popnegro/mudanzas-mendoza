import * as React from 'react';
import {
  Award,
  Truck,
  ShieldCheck,
  Star,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Home,
  Building,
  Users,
  Package,
  Warehouse,
  CheckCircle2,
  Calendar,
  MessageSquare,
  ArrowLeft,
  ChevronRight,
  Briefcase,
  Shield,
  ArrowUpCircle,
  BookOpen,
  User,
  Search,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion'; // Corrected import for framer-motion

// Data imports
import { destinations } from './data/destinations';
import { services, faqs, testimonials, blogArticles } from './data/staticData';

// Component imports
import SEO from './components/SEO';
import Header from './components/layout/Header';
import Footer from './components/Footer';
import QuoteForm from './components/QuoteForm';
import MarkdownRenderer from './components/MarkdownRenderer';
import ErrorBoundary from './components/ErrorBoundary'; // Import the new ErrorBoundary
import { initializeGlobalErrorHandlers } from './utils/errorLogger'; // Import the error logger initializer

// Helper to map Lucide icon names to React components
const IconMap: Record<string, React.ComponentType<any>> = {
  Home,
  Truck,
  Package,
  Briefcase,
  Warehouse,
  Shield,
  ArrowUpCircle,
  Clock,
  Calendar,
};

export default function App() {
  const [activePage, setActivePage] = React.useState<string>(''); // empty string means main page, otherwise slug
  const [activeServiceTab, setActiveServiceTab] = React.useState<string>('mudanzas-residenciales');
  const [openFaq, setOpenFaq] = React.useState<string | null>(null);
  const [activeTestimonial, setActiveTestimonial] = React.useState(0);
  
  React.useEffect(() => {
    initializeGlobalErrorHandlers(); // Initialize global error handlers on mount
  }, []);

  const [searchQuery, setSearchQuery] = React.useState<string>('');

  // Sync state with URL pathname on mount & popstate (supporting SEO paths)
  React.useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname;
      if (path === '/blog' || path === '/blog/') {
        setActivePage('blog');
        return;
      }
      if (path === '/destinos' || path === '/destinos/') {
        setActivePage('destinos');
        return;
      }
      const blogPostMatch = path.match(/^\/blog\/([a-z-]+)\/?$/);
      if (blogPostMatch) {
        setActivePage(`blog/${blogPostMatch[1]}`);
        return;
      }

      // Match path patterns like '/servicios/mudanzas-urgentes.html' or '/mudanzas-mendoza/mudanzas-ciudad-mendoza.html'
      const serviceHtmlMatch = path.match(/\/servicios\/(fletes-[a-z-]+|mudanzas-[a-z0-9-]+)\.html/);
      const htmlMatch = path.match(/\/mudanzas-mendoza\/(mudanzas-[a-z-]+)\.html/);
      const simpleMatch = path.match(/^\/([a-z-]+)$/);
      const slugCandidate = serviceHtmlMatch
        ? serviceHtmlMatch[1]
        : htmlMatch
        ? htmlMatch[1]
        : simpleMatch
        ? simpleMatch[1]
        : '';

      const matchedService = services.find((s) => s.id === slugCandidate);
      const matchedDestination = destinations.find((d) => d.slug === slugCandidate);

      if (matchedService) {
        setActivePage(matchedService.id);
      } else if (matchedDestination) {
        setActivePage(matchedDestination.slug);
      } else if (slugCandidate === 'destinos') {
        setActivePage('destinos');
      } else {
        setActivePage('');
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  // Handle SPA routing navigation
  const handleNavigation = (slug: string) => {
    setActivePage(slug);
    let newPath = '/';
    if (slug === 'blog') {
      newPath = '/blog';
    } else if (slug === 'destinos') {
      newPath = '/destinos';
    } else if (slug.startsWith('blog/')) {
      newPath = `/${slug}`;
    } else if (services.some((s) => s.id === slug)) {
      newPath = `/servicios/${slug}.html`;
    } else if (slug) {
      newPath = `/mudanzas-mendoza/${slug}.html`;
    }
    window.history.pushState({}, '', newPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Group main departments by region for initial display
  const mainRegions = {
    'Gran Mendoza': destinations.filter((d) => d.region === 'Gran Mendoza' && !d.isDistrict),
    'Zona Este y Valle de Uco': destinations.filter((d) => d.region === 'Zona Este y Valle de Uco' && !d.isDistrict),
    'Sur de Mendoza': destinations.filter((d) => d.region === 'Sur de Mendoza' && !d.isDistrict),
  };

  // Search filter matching all destinations (departments & districts)
  const filteredDestinations = searchQuery.trim()
    ? destinations.filter((d) =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (d.parentDepartment && d.parentDepartment.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  // SEO details for active view
  const currentDestination = destinations.find((d) => d.slug === activePage);
  const currentService = services.find((s) => s.id === activePage);
  let currentArticle: any = undefined;
  let pageTitle = 'Mudanzas en Mendoza - Profesionales y Seguras | Mudanzas Miranda';
  let pageDescription = 'Servicio profesional de mudanzas en Mendoza. Traslados residenciales y de oficinas. Rápido, seguro y sin estrés. ¡Cotizá tu mudanza online en minutos!';
  let pageCanonical = 'https://www.mudanzasmiranda.com.ar';

  if (currentDestination) {
    pageTitle = currentDestination.title;
    pageDescription = currentDestination.description;
    pageCanonical = `https://www.mudanzasmiranda.com.ar/mudanzas-mendoza/${currentDestination.slug}.html`;
  } else if (currentService) {
    if (currentService.id === 'mudanzas-urgentes') {
      pageTitle = 'Mudanzas Urgentes en Mendoza - Traslado Inmediato Exprés | Mudanzas Miranda';
      pageDescription = '¿Necesitás mudarte hoy? Servicio de mudanzas urgentes y fletes en el acto en Mendoza. Respuesta veloz y camiones de guardia listos.';
    } else if (currentService.id === 'mudanzas-24-horas') {
      pageTitle = 'Mudanzas 24 Horas Mendoza - Nocturnas y Feriados | Mudanzas Miranda';
      pageDescription = 'Servicios de mudanza sin límites de horario. Traslados nocturnos, fines de semana y feriados en Mendoza. ¡Reservá tu turno ya!';
    } else if (currentService.id === 'mudanzas-residenciales') {
      pageTitle = 'Mudanzas Residenciales en Mendoza - Casas y Departamentos | Mudanzas Miranda';
      pageDescription = 'Servicios de mudanzas familiares completas en Mendoza. Traslados para casas, departamentos, dúplex y barrios privados con peones expertos y seguro.';
    } else if (currentService.id === 'transporte-de-muebles') {
      pageTitle = 'Transporte de Muebles en Mendoza - Camas, Sillones, Armarios | Mudanzas Miranda';
      pageDescription = 'Servicio especializado de transporte de muebles pesados y delicados en Mendoza. Embalaje con mantas protectoras y desarme profesional.';
    } else if (currentService.id === 'traslado-de-offices') {
      pageTitle = 'Traslado de Oficinas en Mendoza - Mudanzas Corporativas | Mudanzas Miranda';
      pageDescription = 'Mudanzas comerciales y corporativas eficientes en Mendoza. Traslado de servidores, escritorios y archivos de fin de semana para no detener tu empresa.';
    } else if (currentService.id === 'guardamuebles-mendoza') {
      pageTitle = 'Guardamuebles en Mendoza - Depósitos Seguros y Vigilados | Mudanzas Miranda';
      pageDescription = 'Alquiler de guardamuebles y depósitos individuales en Mendoza. Espacios limpios, secos, cerrados y monitoreados las 24 horas.';
    } else if (currentService.id === 'embalaje-y-desarme') {
      pageTitle = 'Embalaje Profesional y Desarme de Muebles en Mendoza | Mudanzas Miranda';
      pageDescription = 'Servicio de embalaje premium con film stretch, plástico burbuja y mantas acolchadas. Desarme y armado experto de camas, roperos y placares.';
    } else if (currentService.id === 'izamientos-y-altura') {
      pageTitle = 'Izamientos y Trabajos en Altura en Mendoza - Balcones | Mudanzas Miranda';
      pageDescription = 'Subida y bajada de sillones, heladeras y muebles por balcones o ventanas del exterior en Mendoza. Equipos de seguridad, arneses y poleas homologadas.';
    } else {
      pageTitle = `${currentService.title} en Mendoza - Profesional | Mudanzas Miranda`;
      pageDescription = currentService.description;
    }
    pageCanonical = `https://www.mudanzasmiranda.com.ar/servicios/${currentService.id}.html`;
  } else if (activePage === 'destinos') {
    pageTitle = 'Cobertura de Mudanzas en Mendoza | Departamentos y Distritos | Mudanzas Miranda';
    pageDescription = 'Conocé nuestra amplia cobertura de fletes y mudanzas en Mendoza. Brindamos servicios profesionales en todos los departamentos y distritos de la provincia.';
    pageCanonical = 'https://www.mudanzasmiranda.com.ar/destinos';
  } else if (activePage === 'blog') {
    pageTitle = 'Blog de Mudanzas Mendoza | Consejos, Guías y Tarifas 2026';
    pageDescription = 'Leé los mejores consejos para organizar tu mudanza sin estrés, aprender a embalar tus electrodomésticos y conocer los precios actualizados en Mendoza.';
    pageCanonical = 'https://www.mudanzasmiranda.com.ar/blog';
  } else if (activePage.startsWith('blog/')) {
    const postSlug = activePage.replace('blog/', '');
    const article = blogArticles.find((a) => a.slug === postSlug);
    if (article) {
      currentArticle = article;
      pageTitle = `${article.title} | Blog Mudanzas Mendoza`;
      pageDescription = article.summary;
      pageCanonical = `https://www.mudanzasmiranda.com.ar/blog/${article.slug}`;
    }
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-brand-green-500 selection:text-white">
        {/* 1. Dynamic SEO & Meta Injector */}
        <SEO
          title={pageTitle}
          description={pageDescription}
          canonicalUrl={pageCanonical}
          isLocalPage={!!currentDestination}
          destinationData={currentDestination}
          serviceData={currentService}
          blogArticleData={currentArticle}
        />

        {/* 2. Premium Navigation Header */}
        <Header destinations={destinations} activePage={activePage} onNavigate={handleNavigation} />

        {/* Main Content Area with Route Switching */}
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            {activePage === '' ? (
              /* ==================== HOMEPAGE VIEW ==================== */
              <motion.div
                key="homepage"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Hero Section */}
                <section className="relative bg-white text-slate-800 overflow-hidden py-16 lg:py-24 border-b border-slate-200">
                  {/* Subtle background overlay patterns */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#F8FAFC_0%,#FFFFFF_100%)] z-0" />
                  <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-3xl rounded-full z-0 pointer-events-none" />

                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                      {/* Left Column: Heading, Subtext, Badges, CTAs */}
                      <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-xs font-bold uppercase tracking-wider">
                          <Truck className="w-4 h-4 animate-bounce text-brand-green-600" />
                          Somos Mudanzas Miranda
                        </div>
                        <h1 className="hero-title">Mudanzas en Mendoza</h1>
                        <p className="hero-subtitle max-w-2xl mx-auto lg:mx-0">
                          Con <strong>Mudanzas Miranda</strong> las mudanzas son simples, seguras y al mejor precio.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                          <a
                            href="#form"
                            className="hero-cta-button"
                          >
                            Cotizar mi Mudanza
                            <ArrowRight className="w-5 h-5" />
                          </a>
                          <a
                            href="https://wa.link/zn3zij"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto flex items-center justify-center gap-2 border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold px-8 py-4 rounded-2xl transition-all cursor-pointer text-base"
                          > {/* No change needed, already text-brand-green-500 */}
                            <Phone className="w-5 h-5 text-brand-green-500" />
                            Consultar por WhatsApp
                          </a>
                        </div>

                        {/* Google Rating Badge */}
                        <div className="flex items-center justify-center lg:justify-start gap-3 pt-4">
                          <div className="flex items-center gap-0.5 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl"> {/* No change needed */}
                            <div className="flex text-brand-green-500">
                              {[...Array(5)].map((_, i) => ( // No change needed, already brand-green
                                <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                              ))}
                            </div>
                            <span className="text-xs text-slate-600 ml-2">
                              <strong>4.9/5</strong> de 186 opiniones en Google
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Preloaded hero visual with aspect ratio */}
                      <div className="lg:col-span-6 relative flex justify-center">
                        <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-200 shadow-amber-500/10 hover:scale-[1.01] transition-transform duration-300">
                          <img
                              src="https://mudanzasmendoza.com.ar/img/camiones-mudanzas-miranda.jpg"
                              alt="Camiones de mudanzas de Mudanzas Miranda estacionados y listos para un servicio."
                              className="w-full h-full object-cover"
                              width="1200"
                              height="900"
                              fetchPriority="high"
                              loading="eager"
                              decoding="sync"
                            />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Trust & Key Features Section */}
                <section id="nosotros" className="py-20 bg-slate-50 border-b border-slate-200">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                      <h2 className="section-title">Tu mudanza en manos de expertos mendocinos</h2>
                      <p className="section-description text-base">
                        La tranquilidad de nuestros clientes es nuestra absoluta prioridad. Por eso, combinamos más de 20 años de experiencia, camiones equipados propios y un equipo profesional sumamente cuidadoso.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {/* Benefit 1 */}
                      <div className="benefit-card"> {/* No change needed */}
                        <div className="benefit-icon-wrapper">
                          <Award className="w-6 h-6 stroke-[2]" />
                        </div>
                        <h3 className="benefit-card-title">Más de 20 Años de Trayectoria</h3> {/* Using new benefit-card-title */}
                        <p className="section-description"> {/* Using section-description */}
                          Décadas de servicio ininterrumpido en Mendoza nos convierten en el referente indiscutido de fletes y mudanzas de máxima confianza y calidad.
                        </p>
                      </div>

                      {/* Benefit 2 */}
                      <div className="benefit-card"> {/* No change needed */}
                        <div className="benefit-icon-wrapper">
                          <Truck className="w-6 h-6 stroke-[2]" />
                        </div>
                        <h3 className="benefit-card-title">Flota de Camiones Propia</h3> {/* Using new benefit-card-title */}
                        <p className="section-description"> {/* Using section-description */}
                          Contamos con furgones habilitados y acondicionados con mantas especiales, sogas tensoras de cricket, y rampas para resguardar tus muebles en viaje.
                        </p>
                      </div>

                      {/* Benefit 3 */}
                      <div className="benefit-card"> {/* No change needed */}
                        <div className="benefit-icon-wrapper">
                          <ShieldCheck className="w-6 h-6 stroke-[2]" />
                        </div>
                        <h3 className="benefit-card-title">Seguro de Tránsito Completo</h3> {/* Using new benefit-card-title */}
                        <p className="section-description"> {/* Using section-description */}
                          Todas nuestras operaciones cuentan con póliza de seguro de carga vial, protegiendo tu patrimonio familiar desde que se carga hasta su colocación final.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Interactive Services Section - Tabs */}
                <section id="servicios" className="py-20 bg-white text-slate-800 border-y border-slate-200">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                      <h2 className="section-title">Soluciones a la medida de tu necesidad</h2>
                      <p className="section-description">
                        Seleccioná uno de nuestros servicios especializados para conocer en detalle cómo trabajamos cada modalidad.
                      </p>
                    </div>

                    {/* Service Tabs */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      {/* Tab Buttons List */}
                      <div className="lg:col-span-4 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-none">
                        {services.map((svc) => {
                          const IconComponent = IconMap[svc.icon] || Truck;
                          return ( // No change needed
                            <button
                              key={svc.id}
                              onClick={() => setActiveServiceTab(svc.id)} // No change needed
                              className={`service-tab-button ${ // Class already updated in index.css
                                activeServiceTab === svc.id
                                  ? 'bg-brand-green-500 text-white shadow-md shadow-brand-green-500/10'
                                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200'
                              }`}
                            >
                              <IconComponent className="w-5 h-5 flex-shrink-0" />
                              <span>{svc.shortTitle}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Active Tab Panel Content */}
                      <div className="lg:col-span-8 bg-slate-50/50 border border-slate-200 rounded-3xl p-6 sm:p-8">
                        <AnimatePresence mode="wait">
                          {services
                            .filter((svc) => svc.id === activeServiceTab)
                            .map((svc) => (
                              <motion.div
                                key={svc.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
                              >
                                <div className="space-y-4">
                                  <h3 className="text-2xl font-serif font-bold text-slate-900 leading-snug">
                                    {svc.title}
                                  </h3>
                                  <p className="section-description">
                                    {svc.longDescription || svc.description}
                                  </p>
                                  {svc.benefits && svc.benefits.length > 0 && ( // Added null check for svc.benefits
                                    <div className="space-y-2 pt-2"> {/* No change needed */}
                                      <h4 className="text-xs font-bold text-brand-green-500 uppercase tracking-wider">Beneficios clave:</h4> {/* Updated to brand-green */}
                                      <ul className="grid grid-cols-1 gap-2"> {/* Layout classes remain */}
                                        {svc.benefits.map((benefit, bidx) => ( // No change needed
                                          <li key={bidx} className="flex items-start gap-2 text-xs text-slate-600">
                                            <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                            <span>{benefit}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                  <div className="pt-4">
                                    <a
                                      href="#form" // No change needed
                                      className="service-tab-cta-button bg-brand-green-500 hover:bg-brand-green-600"
                                    >
                                      {svc.ctaText}
                                      <ArrowRight className="w-4 h-4" />
                                    </a>
                                  </div>
                                </div>
                                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xl">
                                  <picture>
                                    <source srcSet={svc.image} type="image/webp" />
                                    <img
                                      src={svc.image}
                                      alt={svc.alt}
                                      className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
                                      loading="lazy"
                                      width="800"
                                      height="600"
                                      decoding="async"
                                    />
                                  </picture>
                                </div>
                              </motion.div>
                            ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Destinations Section - Local SEO hub */}
                <section id="rutas" className="py-20 bg-slate-50 border-b border-slate-200">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
                      <h2 className="section-title">Cubrimos todo Mendoza con servicios locales</h2>
                      <p className="section-description">
                        Brindamos fletes y traslados puerta a puerta dentro de tu barrio, departamento o mudanzas nacionales de larga distancia.
                      </p>
                    </div>

                    {/* Search Bar for 100+ Mendoza Districts */}
                    <div className="max-w-xl mx-auto mb-12">
                      <div className="search-input-wrapper"> {/* Using new search-input-wrapper */}
                        <input type="text" // No change needed
                          placeholder="🔍 Buscá tu barrio o localidad (ej: Chacras de Coria, Dorrego, Uspallata...)" // No change needed
                          value={searchQuery} // No change needed
                          onChange={(e) => setSearchQuery(e.target.value)} // No change needed
                          className="search-input-field"
                        />
                        {searchQuery && (
                          <button // Using new search-clear-button
                            onClick={() => setSearchQuery('')}
                            className="search-clear-button"
                          >
                            Limpiar
                          </button>
                        )}
                      </div>
                    </div>

                    {searchQuery.trim() ? (
                      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 max-w-4xl mx-auto space-y-4 shadow-sm">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3"> {/* Layout classes remain */}
                          <h3 className="text-sm font-bold text-amber-500 uppercase tracking-wider">
                            Localidades encontradas ({filteredDestinations.length})
                          </h3>
                        </div>
                        {filteredDestinations.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-[350px] overflow-y-auto pr-2 scrollbar-thin">
                            {filteredDestinations.map((dest) => (
                              <button
                                key={dest.slug}
                                onClick={() => {
                                  handleNavigation(dest.slug); // Using new destination-search-result-card
                                  setSearchQuery(''); // Clear search after navigation
                                }}
                                className="destination-search-result-card group"
                              >
                                <div className="flex flex-col">
                                  <span className="font-semibold text-slate-800 group-hover:text-amber-600">{dest.name}</span>
                                  <span className="text-[10px] text-slate-500 mt-0.5">{dest.region}</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-green-500 transition-all flex-shrink-0" />
                              </button>
                            ))}
                          </div>
                        ) : (
                          <p className="section-description text-center py-6">
                            No encontramos resultados para "{searchQuery}". Intentá buscando el nombre de tu departamento o distrito más cercano. {/* No change needed */}
                          </p>
                        )}
                      </div>
                    ) : (
                      /* Regions Grid with Main Departments */
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {Object.entries(mainRegions).map(([regionName, list]) => (
                          <div
                            key={regionName}
                            className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:shadow-slate-200/50 transition-all" // No change needed
                          > {/* No color change here */}
                            <h3 className="text-lg font-bold text-amber-500 uppercase tracking-wider border-b border-slate-100 pb-3 mb-4">
                              {regionName}
                            </h3>
                            <div className="flex flex-col gap-1.5 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
                              {list.map((dest) => (
                                <button
                                  key={dest.slug}
                                  onClick={() => handleNavigation(dest.slug)}
                                  className="text-left text-sm py-2 px-3 rounded-lg text-slate-700 hover:text-brand-green-600 hover:bg-slate-50 font-medium transition-all flex items-center justify-between group cursor-pointer" // Updated to brand-green and text-slate-700
                                >
                                  <span>{dest.name}</span>
                                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </section>

                {/* Testimonials Review Section */}
                <section className="py-20 bg-white border-b border-slate-200">
                  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
                      <h2 className="section-title">Lo que dicen nuestros clientes</h2>
                      <p className="section-description">
                        La satisfacción de quienes ya confiaron en Mudanzas Miranda.
                      </p>
                    </div>

                    {/* Interactive Testimonial Slider */}
                    <div className="testimonial-card">
                      <div className="absolute top-6 right-8 text-brand-green-500/20 text-7xl font-serif select-none pointer-events-none">
                        “
                      </div>

                      <div className="min-h-[180px] flex flex-col justify-between">
                        <div className="space-y-4">
                          <div className="flex text-amber-500">
                            {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                            ))}
                          </div>
                          <p className="text-base sm:text-lg text-slate-700 italic leading-relaxed">
                            "{testimonials[activeTestimonial].content}"
                          </p>
                        </div>

                        <div className="flex items-center justify-between border-t border-slate-200 pt-6 mt-6">
                          <div>
                            <p className="font-bold text-slate-800">{testimonials[activeTestimonial].author}</p>
                            <p className="text-xs text-slate-500">{testimonials[activeTestimonial].role}</p>
                          </div>
                          <p className="text-xs text-slate-500">{testimonials[activeTestimonial].date}</p>
                        </div>
                      </div>

                      {/* Navigation buttons */}
                      <div className="flex justify-end gap-2 mt-4">
                        <button // Using new testimonial-nav-button
                          onClick={() =>
                            setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
                          } // No change needed
                          className="testimonial-nav-button"
                          aria-label="Previous Testimonial"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
                          } // No change needed
                          className="testimonial-nav-button"
                          aria-label="Next Testimonial"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Blog Highlights Section */}
                <section id="blog-highlights" className="py-20 bg-slate-50 border-b border-slate-200">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                      <div className="space-y-3">
                        <h2 className="section-title">Guías y consejos útiles para tu mudanza</h2>
                        <p className="section-description max-w-2xl">
                          Aprendé de nuestros expertos fletistas mendocinos cómo organizar tus cajas, proteger tus muebles y ahorrar dinero en tus traslados.
                        </p>
                      </div>
                      <div>
                        <button
                          onClick={() => handleNavigation('blog')}
                          className="blog-view-all-button"
                        >
                          Ver todo el blog
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {blogArticles.map((article) => (
                        <article
                          key={article.id}
                          className="blog-article-card group"
                        >
                          <div className="aspect-[16/10] overflow-hidden bg-slate-100 relative">
                            <img
                              src={article.image}
                              alt={article.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                              width="400"
                              height="250"
                              decoding="async"
                            />
                            <span className="absolute top-4 left-4 bg-brand-green-600 text-white font-bold text-[10px] uppercase tracking-wider py-1 px-2.5 rounded-md shadow-md">
                              {article.category}
                            </span>
                          </div>
                          <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-3 text-slate-500 text-xs">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3.5 h-3.5" />
                                  {article.date}
                                </span> {/* No change needed */}
                            </div>
                              <h3 className="blog-card-title">
                                {article.title}
                              </h3>
                              <p className="text-xs text-slate-600 line-clamp-2">
                                {article.summary}
                              </p>
                            </div>
                            <div>
                              <button
                                onClick={() => handleNavigation(`blog/${article.slug}`)}
                                className="blog-read-article-button"
                              >
                                Leer artículo completo
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </section>

                {/* FAQs Section */}
                <section id="faq" className="py-20 bg-white border-b border-slate-200">
                  {/* FAQ Structured Data for Google Rich Snippets */}
                  <script
                    id="faq-structured-data"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "@id": `${pageCanonical}#faq`,
                        "mainEntity": faqs.map((faq) => ({
                          "@type": "Question",
                          "name": faq.question,
                          "acceptedAnswer": {
                            "@type": "Answer",
                            "text": faq.answer,
                          },
                        })),
                      }),
                    }}
                  />
                  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                      <h2 className="section-title">Preguntas Frecuentes</h2>
                      <p className="section-description"> {/* No change needed, already text-slate-700 */}
                        Resolvemos tus dudas más comunes para que planifiques tu mudanza con total tranquilidad.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {faqs.map((faq) => (
                        <div // No change needed
                          key={faq.id}
                          className="faq-item-container"
                        >
                          <button
                            onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                            className="faq-question-button"
                            aria-expanded={openFaq === faq.id}
                          >
                            <span className="text-base sm:text-lg">{faq.question}</span>
                            <ChevronDown
                              className={`w-5 h-5 text-slate-400 transition-transform duration-200 flex-shrink-0 ml-4 ${
                                openFaq === faq.id ? 'rotate-180 text-brand-green-500' : ''
                              }`}
                            />
                          </button>

                          <AnimatePresence initial={false}>
                            {openFaq === faq.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden bg-white border-t border-slate-100" /* Layout classes remain */
                              >
                                <div className="p-6 text-sm sm:text-base text-slate-600 leading-relaxed">
                                  {faq.answer}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Quote Form Section */}
                <section id="form" className="py-20 bg-slate-50 border-t border-slate-200">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
                      <h2 className="section-title">Cotizá tu mudanza en 3 simples pasos</h2>
                      <p className="section-description">
                        Completá el formulario inteligente para recibir tu presupuesto adaptado sin compromisos.
                      </p>
                    </div>

                    <QuoteForm />
                  </div>
                </section>
              </motion.div>
            ) : activePage === 'blog' ? (
              /* ==================== BLOG LIST VIEW ==================== */
              <motion.div
                key="bloglist"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white py-12 animate-fade-in"
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {/* Blog Header */}
                  <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-500/10 py-1.5 px-4 rounded-full border border-amber-500/20">
                      Blog de Mudanzas Miranda {/* No change needed */}
                    </span>
                    <h1 className="page-hero-title">Consejos y Guías para Mudarte con Éxito</h1>
                    <p className="section-description sm:text-base">
                      Escribimos sobre planificación, trucos de embalaje, cuidado de objetos frágiles y todo lo que necesitás saber para mudarte en Mendoza de forma rápida y segura.
                    </p>
                  </div>

                  {/* Blog Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogArticles.map((article) => ( // No change needed
                      <article
                        key={article.id}
                        className="blog-article-card bg-slate-50 group"
                      >
                        <div className="aspect-[16/10] overflow-hidden bg-slate-100 relative">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                            width="400"
                            height="250"
                            decoding="async"
                          />
                          <span className="absolute top-4 left-4 bg-brand-green-600 text-white font-bold text-[10px] uppercase tracking-wider py-1 px-2.5 rounded-md shadow-md">
                            {article.category}
                          </span>
                        </div>
                        <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-3 text-slate-500 text-xs">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                {article.date}
                              </span> {/* No change needed */}
                            </div>
                            <h2 className="blog-card-title">
                              {article.title}
                            </h2>
                            <p className="text-xs text-slate-600 line-clamp-3">
                              {article.summary}
                            </p>
                          </div>
                          <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 text-xs font-bold">
                                  {article.author.charAt(0)}
                              </div>
                              <span className="text-xs text-slate-700 font-medium">{article.author}</span>
                            </div>
                            <button
                              onClick={() => handleNavigation(`blog/${article.slug}`)}
                              className="blog-read-article-button"
                            >
                              Leer más
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : activePage.startsWith('blog/') ? (
              /* ==================== SINGLE BLOG POST VIEW ==================== */
              (() => {
                const postSlug = activePage.replace('blog/', '');
                const article = blogArticles.find((a) => a.slug === postSlug);

                if (!article) {
                  return (
                    <motion.div
                      key="blog-not-found" // No change needed
                      className="text-center py-24 text-slate-600 max-w-md mx-auto"
                    >
                      <BookOpen className="w-16 h-16 mx-auto text-amber-500 mb-4" />
                      <h2 className="text-2xl font-serif font-bold text-slate-800 mb-2">Artículo no encontrado</h2>
                      <p className="text-sm mb-6 text-slate-500">El artículo que estás buscando no existe o ha sido movido.</p>
                      <button
                        onClick={() => handleNavigation('blog')}
                        className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-2 rounded-xl text-sm transition-colors cursor-pointer"
                      >
                        Volver al Blog
                      </button>
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    key={`blogpost-${article.slug}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white py-8 sm:py-12"
                  >
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                      {/* Breadcrumbs */}
                      <div className="text-slate-500 text-xs flex items-center gap-2 border-b border-slate-100 pb-4">
                        <button onClick={() => handleNavigation('')} className="hover:text-slate-900 transition-colors font-semibold">
                          Inicio
                        </button>
                        <span>/</span>
                        <button onClick={() => handleNavigation('blog')} className="hover:text-slate-900 transition-colors font-semibold">
                          Blog
                        </button>
                        <span>/</span>
                        <span className="text-amber-600 font-medium truncate max-w-[200px] sm:max-w-xs">{article.title}</span>
                      </div>

                      {/* Article Header */}
                      <div className="space-y-4">
                        <span className="bg-amber-600/10 border border-amber-500/20 text-amber-600 font-bold text-xs uppercase tracking-wider py-1 px-3 rounded-full">
                          {article.category} {/* No change needed */}
                        </span>
                        <h1 className="page-hero-title">{article.title}</h1>
                        <div className="flex flex-wrap items-center gap-4 text-slate-500 text-xs sm:text-sm pt-2">
                          <div className="flex items-center gap-1.5">
                            <User className="w-4 h-4 text-amber-500" />
                            <span className="font-medium text-slate-700">{article.author}</span>
                            <span className="text-slate-700">(Asesor de Mudanzas)</span>
                          </div>
                          <span className="text-slate-300 hidden sm:inline">|</span>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-amber-500" />
                            <span>{article.date}</span> {/* No change needed */}
                          </div> {/* Updated to brand-green */}
                          <span className="text-slate-300 hidden sm:inline">|</span>
                          <div className="flex items-center gap-1.5"> {/* No change needed */}
                            <Clock className="w-4 h-4 text-amber-500" />
                            <span>Lectura: {article.readTime}</span>
                          </div>
                        </div>
                      </div>

                      {/* Featured Image */}
                      <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xl">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover"
                          width="800"
                          height="450"
                          decoding="async"
                          loading="eager"
                        />
                      </div>

                      {/* Article Body */}
                      <article className="bg-slate-50/50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
                        <MarkdownRenderer content={article.content} />
                      </article>

                      {/* Share / CTA / Author Box */}
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="space-y-1 text-center sm:text-left">
                          <p className="font-bold text-slate-800">¿Necesitás mudarte en Mendoza?</p>
                          <p className="text-xs text-slate-500">Ofrecemos asesoramiento personalizado y presupuestos a medida sin cargo.</p>
                        </div>
                        <a
                          href="#form"
                          className="blog-cta-button w-full sm:w-auto text-center"
                        >
                          Cotizar mi Mudanza
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })()
            ) : currentService ? (
              /* ==================== DYNAMIC SERVICE LANDING PAGE VIEW ==================== */
              <motion.div
                key={`servicepage-${currentService.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white"
              >
                {/* Breadcrumbs Navigation */}
                <div className="bg-slate-50 border-b border-slate-200 text-slate-600 py-3 text-xs sm:text-sm">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2">
                    <button
                      onClick={() => handleNavigation('')}
                      className="hover:text-slate-900 transition-colors flex items-center gap-1 cursor-pointer font-semibold"
                    >
                      Inicio
                    </button>
                    <span>/</span>
                    <span className="text-slate-400">Servicios</span>
                    <span>/</span>
                    <span className="text-amber-600 font-semibold truncate">{currentService.title}</span>
                  </div>
                </div>

                {/* Service Hero Section */}
                <section className="relative bg-white text-slate-800 overflow-hidden py-16 lg:py-20 border-b border-slate-200">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#F8FAFC_0%,#FFFFFF_100%)] z-0" />
                  <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-3xl rounded-full z-0 pointer-events-none" />

                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                      {/* Left Side: Copy */}
                      <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-xs font-bold uppercase tracking-wider">
                          {React.createElement(IconMap[currentService.icon] || Truck, { className: 'w-4 h-4 text-brand-green-600' })}
                          Servicio Especializado Mendoza {/* No color change here */}
                        </div>

                        <h1 className="page-hero-title">
                          {currentService.id === 'mudanzas-urgentes' ?
                            <>Mudanzas <span className="text-brand-green-600">Urgentes</span> en Mendoza: Traslados Exprés Hoy</>
                          : currentService.id === 'mudanzas-24-horas' ?
                            <>Mudanzas <span className="text-brand-green-600">24 Horas</span>: Servicio Nocturno y Feriados</>
                          :
                            currentService.title
                          }
                        </h1>
 
                        <p className="hero-description max-w-2xl mx-auto lg:mx-0">
                          {currentService.description}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                          <a
                            href="#form"
                            className="hero-cta-button py-3.5"
                          >
                            Cotizar {currentService.shortTitle}
                          </a>
                          <a
                            href={`https://wa.me/5492615130910?text=Hola%20Mudanzas%20Miranda,%20necesito%20consultar%20por%20un%20servicio%20de%20${encodeURIComponent(
                              currentService.title
                            )}%20en%20Mendoza.`}
                            target="_blank" // No change needed
                            rel="noopener noreferrer"
                            className="service-page-secondary-cta-button"
                          >
                            <Phone className="w-5 h-5 text-brand-green-500" />
                            Consultar al Instante
                          </a>
                        </div>
                      </div>

                      {/* Right Side: Visual Image */}
                      <div className="lg:col-span-5 relative flex justify-center">
                        <div className="relative w-full max-w-md aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-slate-200 hover:scale-[1.01] transition-transform duration-300">
                          <img
                            src={currentService.image}
                            alt={currentService.alt}
                            className="w-full h-full object-cover"
                            loading="eager"
                            width="800"
                            height="600"
                            decoding="async"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Service Description & Value Proposition */}
                <section className="py-16 bg-slate-50 border-b border-slate-200">
                  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-6 shadow-sm">
                      <h2 className="text-2xl font-serif font-bold text-slate-900 leading-snug">
                        ¿Cómo funciona nuestro servicio de {currentService.title}? {/* This title is unique, so no @apply */}
                      </h2>
                      <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                        {currentService.longDescription}
                      </p>
                    </div>

                    {/* Highlights Grid */}
                    <div className="space-y-6">
                      <h3 className="section-title text-center lg:text-left">
                        Beneficios clave de contratar {currentService.title} con nosotros
                      </h3> // No change needed, already text-slate-700
                      {currentService.benefits && currentService.benefits.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {currentService.benefits.map((benefit, index) => (
                          <div
                            key={index}
                            className="service-benefit-card"
                          >
                            <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-500">
                              <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed font-medium">
                              {benefit}
                            </p>
                          </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Special CRO Banner Based on selected service */}
                    {currentService.id === 'mudanzas-urgentes' && (
                      <div className="service-cro-banner bg-red-50 border-red-200">
                        <Clock className="w-8 h-8 text-red-600 flex-shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <h4 className="font-bold text-red-950 text-sm">Respuesta Exprés de Emergencia</h4>
                          <p className="text-xs text-red-800 leading-relaxed">
                            ¿Te quedaste a pie o tenés un imprevisto de alquiler hoy? Priorizamos las mudanzas urgentes despachando a la brevedad nuestro camión de guardia en el área metropolitana de Mendoza (Capital, Godoy Cruz, Guaymallén, Las Heras, Maipú y Luján de Cuyo).
                          </p>
                        </div>
                      </div>
                    )}

                    {currentService.id === 'mudanzas-24-horas' && (
                      <div className="service-cro-banner bg-blue-50 border-blue-200">
                        <Calendar className="w-8 h-8 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <h4 className="font-bold text-blue-950 text-sm">Disponibilidad Absoluta las 24 Horas</h4>
                          <p className="text-xs text-blue-800 leading-relaxed">
                            ¿Tenés horarios complicados en tu comercio, oficina o trabajo? Operamos de noche, de madrugada, domingos o feriados nacionales. Trasladamos tus pertenencias con total confidencialidad, discreción y sin interrumpir tu jornada productiva.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </section>

                {/* Service Form Quote Section */}
                <section id="form" className="py-16 bg-white border-t border-slate-200">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                      <h2 className="section-title">Cotizá tu servicio de {currentService.title}</h2>
                      <p className="section-description">
                        Completá los campos para que un asesor te envíe una propuesta formal al instante.
                      </p>
                    </div>

                    {/* <QuoteForm
                      initialService={
                        currentService.id === 'mudanzas-urgentes' || currentService.id === 'mudanzas-24-horas'
                          ? 'residencial'
                          : currentService.id
                      }
                    /> */}
                  </div>
                </section>
              </motion.div>
            ) : activePage === 'destinos' ? (
              /* ==================== DESTINOS INDEX VIEW ==================== */
              <motion.div
                key="destinos-index"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white"
              >
                {/* Breadcrumbs Navigation */}
                <div className="bg-slate-50 border-b border-slate-200 text-slate-600 py-3 text-xs sm:text-sm">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2">
                    <button
                      onClick={() => handleNavigation('')}
                      className="hover:text-slate-900 transition-colors flex items-center gap-1 cursor-pointer font-semibold"
                    >
                      Inicio
                    </button>
                    <span>/</span>
                    <span className="text-amber-600 font-semibold">Destinos y Cobertura</span>
                  </div>
                </div>

                {/* Destinos Hero */}
                <section className="relative bg-white text-slate-800 overflow-hidden py-16 lg:py-20 border-b border-slate-200">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#F8FAFC_0%,#FFFFFF_100%)] z-0" />
                  <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-3xl rounded-full z-0 pointer-events-none" />

                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-xs font-bold uppercase tracking-wider">
                      <MapPin className="w-4 h-4" />
                      Cobertura en Toda la Provincia
                    </div> {/* No change needed */}

                    <h1 className="page-hero-title max-w-4xl mx-auto">
                      Mudanzas y Fletes en <span className="text-amber-600">Mendoza</span>: Departamentos y Distritos
                    </h1>

                    <p className="hero-description max-w-3xl mx-auto font-medium">
                      Llegamos a cada rincón de la provincia. Buscá tu localidad, barrio o departamento para conocer las tarifas, camiones disponibles y beneficios locales exclusivos de Mudanzas Miranda.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto relative pt-4">
                      <div className="search-input-wrapper"> {/* Using search-input-wrapper */}
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input type="text"
                          placeholder="Buscar departamento o distrito (ej: Chacras de Coria, San Rafael)..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)} // No change needed
                          className="search-input-field pl-12 pr-4"
                        />
                      </div>
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 bg-slate-200/50 py-1 px-2.5 rounded-md"
                        >
                          Limpiar
                        </button>
                      )}
                    </div>
                  </div>
                </section>

                {/* Dynamic Search Results vs Normal Categorized List */}
                <section className="py-16 bg-slate-50/50">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {searchQuery ? (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <h2 className="text-xl font-bold text-slate-900 font-serif">
                            Resultados de búsqueda para "{searchQuery}"
                          </h2>
                          <span className="text-xs font-semibold text-slate-500">
                            {filteredDestinations.length} {filteredDestinations.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
                          </span>
                        </div>

                        {filteredDestinations.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredDestinations.map((d) => (
                              <div
                                key={d.slug}
                                className="bg-white border border-slate-200 hover:border-amber-500/40 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                              > {/* No change needed */}
                                <div className="space-y-3">
                                  <span className="bg-amber-500/10 text-amber-600 border border-amber-500/10 font-bold text-[10px] uppercase tracking-wider py-1 px-2.5 rounded-full inline-block">
                                    {d.region} {d.isDistrict ? '• Distrito' : '• Departamento'}
                                  </span> {/* No change needed */}
                                  <h3 className="text-lg font-bold text-slate-900 font-serif leading-tight">
                                    {d.name}
                                  </h3>
                                  <p className="text-xs text-slate-500 line-clamp-3">
                                    {d.description}
                                  </p>
                                </div>
                                <button
                                  onClick={() => {
                                    handleNavigation(d.slug);
                                    setSearchQuery('');
                                  }}
                                  className="mt-4 w-full bg-slate-50 hover:bg-brand-green-500 text-slate-700 hover:text-white font-bold text-xs py-2.5 px-4 rounded-xl border border-slate-200 hover:border-brand-green-500 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                                >
                                  Ver Cobertura y Tarifas
                                  <ArrowRight className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl space-y-4 max-w-md mx-auto">
                            <MapPin className="w-12 h-12 mx-auto text-slate-300" />
                            <p className="text-slate-600 font-medium">No encontramos resultados para tu búsqueda.</p>
                            <p className="text-xs text-slate-700">Te recomendamos revisar la ortografía o buscar el departamento principal.</p> {/* Changed from text-slate-400 for WCAG AA contrast */}
                            <button
                              onClick={() => setSearchQuery('')}
                              className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs py-2 px-4 rounded-xl cursor-pointer"
                            >
                              Mostrar todos los destinos
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      /* Categorized Directory View */
                      <div className="space-y-12">
                        <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
                          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-snug">
                            Nuestra Red de Cobertura por Región
                          </h2>
                          <p className="text-slate-500 text-sm">
                            Hacé clic sobre tu departamento o distrito para acceder a información específica de fletes, grúas e izamientos.
                          </p>
                        </div>

                        {/* Region Rows */}
                        {Object.entries(mainRegions).map(([regionName, regionDepts]) => (
                          <div key={regionName} className="space-y-6">
                            <h3 className="text-xs font-bold text-amber-600 uppercase tracking-widest border-b border-slate-200 pb-2 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-green-500" />
                              {regionName}
                            </h3>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                              {regionDepts.map((dept) => {
                                // Get all districts for this department
                                const deptDistricts = destinations.filter(
                                  (d) => d.isDistrict && d.parentDepartment === dept.name
                                );

                                return ( // Using new department-card
                                  <div
                                    key={dept.slug}
                                    className="department-card"
                                  >
                                    <div className="space-y-4">
                                      <div className="flex items-start justify-between gap-4">
                                        <div className="space-y-1">
                                          <h4 className="text-xl font-serif font-bold text-slate-900">
                                            {dept.name}
                                          </h4>
                                          <p className="footer-text-xs-light font-medium font-serif"> {/* Using footer-text-xs-light */}
                                            Departamento principal • {regionName}
                                          </p>
                                        </div>
                                        <button // Class already updated in index.css
                                          onClick={() => handleNavigation(dept.slug)}
                                          className="department-view-button"
                                        >
                                          Ver Departamento
                                          <ChevronRight className="w-4 h-4" />
                                        </button>
                                      </div>

                                      <p className="section-description text-xs sm:text-sm font-medium"> {/* Using section-description */}
                                        {dept.description.split('. ')[0]}.
                                      </p>
                                      {/* No change needed */}
                                      {/* Districts for this department */}
                                      {deptDistricts.length > 0 && (
                                        <div className="space-y-2.5 pt-4 border-t border-slate-100">
                                          <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                            Distritos y localizaciones con fletes activos:
                                          </h5>
                                          <div className="flex flex-wrap gap-2">
                                            {deptDistricts.map((dist) => (
                                              <button
                                                key={dist.slug}
                                                onClick={() => handleNavigation(dist.slug)}
                                                className="district-button"
                                              >
                                                {dist.name.split(' (')[0]}
                                              </button>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </section>

                {/* General Quote Form Section on Destinos */}
                <section className="py-16 bg-white border-t border-slate-200">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                      <h2 className="section-title">¿Listo para planificar tu mudanza en Mendoza?</h2>
                      <p className="section-description">
                        Completá el cotizador interactivo. Brindamos soporte personalizado en el 100% de los destinos enumerados anteriormente.
                      </p>
                    </div>
                    <QuoteForm />
                  </div>
                </section>
              </motion.div>
            ) : (
              /* ==================== LOCAL SEO DESTINATION VIEW ==================== */
              <motion.div
                key="localseopage"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white"
              >
                {/* Breadcrumbs Navigation */}
                <div className="bg-slate-50 border-b border-slate-200 text-slate-600 py-3 text-xs sm:text-sm">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2">
                    <button
                      onClick={() => handleNavigation('')}
                      className="hover:text-slate-900 transition-colors flex items-center gap-1 cursor-pointer font-semibold"
                    >
                      Inicio
                    </button>
                    <span>/</span>
                    <span className="text-amber-600 font-semibold">Destinos</span>
                    <span>/</span>
                    <span className="text-slate-800 truncate font-medium">{currentDestination?.name}</span>
                  </div>
                </div>

                {/* Local Hero Section */}
                <section className="relative bg-white text-slate-800 overflow-hidden py-16 lg:py-20 border-b border-slate-200">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#F8FAFC_0%,#FFFFFF_100%)] z-0" />
                  <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-3xl rounded-full z-0 pointer-events-none" />

                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-xs font-bold uppercase tracking-wider">
                      <MapPin className="w-4 h-4" />
                      Cobertura en {currentDestination?.region}
                    </div>

                    <h1 className="page-hero-title">
                      {currentDestination?.heroHeadline}
                    </h1>

                    <p className="hero-description max-w-3xl mx-auto">
                      {currentDestination?.heroSubheadline}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <a
                        href="#form"
                        className="hero-cta-button py-3.5"
                      >
                        Solicitar Presupuesto Especializado
                      </a>
                      <a
                        href={`https://wa.me/5492615130910?text=Hola%20Mudanzas%20Miranda,%20quiero%20cotizar%20una%20mudanza%20para%20${encodeURIComponent(
                          currentDestination?.name || ''
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="homepage-secondary-cta-button py-3.5" // No change needed
                      >
                        <Phone className="w-5 h-5 text-brand-green-500" /> {/* Updated to brand-green */}
                        Llamar Directo
                      </a>
                    </div>
                  </div>
                </section>

                {/* Local Editorial Content & Cross links */}
                <section className="py-16 bg-slate-50 border-b border-slate-200">
                  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    {/* Local Info block */}
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-6">
                      <h2 className="section-title">
                        Servicio de Mudanzas y Fletes de Confianza en {currentDestination?.name}
                      </h2>
                      <p className="hero-description font-medium">
                        {currentDestination?.leadText} {/* No change needed */}
                      </p>
                      <p className="section-description sm:text-base"> {/* Using section-description */}
                        {currentDestination?.detailText}
                      </p>
                    </div>

                    {/* Localized Advantages list */}
                    <div className="space-y-4">
                      <h3 className="section-title">
                        Por qué elegirnos para tu traslado en {currentDestination?.name} {/* No change needed, already text-slate-700 */}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="local-advantage-item"> {/* Using new local-advantage-item */}
                          <CheckCircle2 className="w-5 h-5 text-brand-green-500 flex-shrink-0 mt-0.5" />
                          <div> {/* No change needed */}
                            <p className="font-bold text-sm text-slate-800">Operarios Locales</p>
                            <p className="text-xs text-slate-600">Choferes que conocen a la perfección cada calle, avenida y acceso rápido.</p>
                          </div>
                        </div>
                        <div className="local-advantage-item"> {/* Using new local-advantage-item */}
                          <CheckCircle2 className="w-5 h-5 text-brand-green-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold text-sm text-slate-800">Trámites y Permisos</p>
                            <p className="text-xs text-slate-600">Gestionamos autorizaciones de estacionamiento y mudanza en altura si aplica.</p>
                          </div>
                        </div>
                        <div className="local-advantage-item"> {/* Using new local-advantage-item */}
                          <CheckCircle2 className="w-5 h-5 text-brand-green-500 flex-shrink-0 mt-0.5" />
                          <div> {/* No change needed */}
                            <p className="font-bold text-sm text-slate-800">Embalaje Adaptado</p>
                            <p className="text-xs text-slate-600">Protección con cartón y plástico burbuja reforzado en calles de tierra o ruta.</p>
                          </div>
                        </div>
                        <div className="local-advantage-item"> {/* Using new local-advantage-item */}
                          <CheckCircle2 className="w-5 h-5 text-brand-green-500 flex-shrink-0 mt-0.5" /> {/* Updated to brand-green */}
                          <div>
                            <p className="font-bold text-sm text-slate-800">Seguro Vehicular Total</p> {/* No change needed */}
                            <p className="text-xs text-slate-600">Garantía vial total con cobertura activa de siniestros de tránsito.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Regional Cross-linking - Important for SEO crawl index! */}
                    <div className="border-t border-slate-200 pt-8 space-y-4">
                      {currentDestination?.isDistrict ? (
                        <>
                          <h4 className="text-xs font-bold text-amber-500 uppercase tracking-wider">
                            Otros distritos en {currentDestination.parentDepartment} {/* No change needed */}
                          </h4> {/* No change needed */}
                          <p className="footer-text-xs-light">También realizamos fletes y mudanzas locales en:</p> {/* Using footer-text-xs-light */}
                          <div className="flex flex-wrap gap-2">
                            {destinations
                              .filter((d) => d.parentDepartment === currentDestination.parentDepartment && d.slug !== activePage)
                              .map((d) => (
                                <button
                                  key={d.slug}
                                  onClick={() => handleNavigation(d.slug)}
                                  className="district-button bg-white"
                                >
                                  Mudanzas {d.name.split(' (')[0]}
                                </button>
                              ))}
                          </div>
                        </>
                      ) : ( // No color change here
                        <>
                          <h4 className="text-xs font-bold text-amber-500 uppercase tracking-wider">
                            Distritos y Localidades de {currentDestination?.name}
                          </h4>
                          <p className="footer-text-xs-light">Ofrecemos cobertura completa y especializada en todas las zonas de este departamento:</p> {/* Using footer-text-xs-light */}
                          <div className="flex flex-wrap gap-2">
                            {destinations
                              .filter((d) => d.parentDepartment === currentDestination?.name)
                              .map((d) => (
                                  <button
                                  key={d.slug}
                                  onClick={() => handleNavigation(d.slug)}
                                  className="district-button bg-white"
                                >
                                  Mudanzas {d.name.split(' (')[0]}
                                </button>
                              ))}
                          </div>

                          {/* Also link to other main departments in the same region */}
                          <div className="pt-4 border-t border-slate-100">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                              Otras zonas en {currentDestination?.region}
                            </h4>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {destinations
                                .filter((d) => d.region === currentDestination?.region && !d.isDistrict && d.slug !== activePage)
                                .map((d) => (
                                  <button
                                    key={d.slug}
                                    onClick={() => handleNavigation(d.slug)}
                                    className="district-button bg-white"
                                  >
                                    {d.name}
                                  </button>
                                ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </section>

                {/* Local Form Quote Section */}
                <section id="form" className="py-16 bg-slate-50 border-t border-slate-200">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                      <h2 className="section-title">Cotizá tu mudanza para {currentDestination?.name}</h2>
                      <p className="section-description">
                        Completá el formulario interactivo. El destino se encuentra pre-configurado para tu comodidad.
                      </p>
                    </div>

                    <QuoteForm destinationName={currentDestination?.name} />
                  </div>
                </section>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* 3. Premium Footer */}
        <Footer destinations={destinations} onNavigate={handleNavigation} />

        {/* 4. Sticky Floating WhatsApp Widget - High CRO Booster */}
        <a
          href={`https://wa.me/5492615130910?text=Hola%20Mudanzas%20Miranda!%20Quisiera%20consultar%20por%20un%20servicio%20de%20mudanza%20para%20Mendoza.`}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-whatsapp-button group"
          aria-label="Contactar a Mudanzas Miranda por WhatsApp"
        >
          <MessageSquare className="w-7 h-7 fill-white stroke-[2]" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 text-sm font-bold whitespace-nowrap">
            ¿En qué te ayudamos?
          </span>
        </a>
      </div>
    </ErrorBoundary>
  );
}
