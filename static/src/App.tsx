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
  let pageCanonical = 'https://mudanzasmendoza.com.ar';

  if (currentDestination) {
    pageTitle = currentDestination.title;
    pageDescription = currentDestination.description;
    pageCanonical = `https://mudanzasmendoza.com.ar/mudanzas-mendoza/${currentDestination.slug}.html`;
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
    pageCanonical = `https://mudanzasmendoza.com.ar/servicios/${currentService.id}.html`;
  } else if (activePage === 'destinos') {
    pageTitle = 'Cobertura de Mudanzas en Mendoza | Departamentos y Distritos | Mudanzas Miranda';
    pageDescription = 'Conocé nuestra amplia cobertura de fletes y mudanzas en Mendoza. Brindamos servicios profesionales en todos los departamentos y distritos de la provincia.';
    pageCanonical = 'https://mudanzasmendoza.com.ar/destinos';
  } else if (activePage === 'blog') {
    pageTitle = 'Blog de Mudanzas Mendoza | Consejos, Guías y Tarifas 2026';
    pageDescription = 'Leé los mejores consejos para organizar tu mudanza sin estrés, aprender a embalar tus electrodomésticos y conocer los precios actualizados en Mendoza.';
    pageCanonical = 'https://mudanzasmendoza.com.ar/blog';
  } else if (activePage.startsWith('blog/')) {
    const postSlug = activePage.replace('blog/', '');
    const article = blogArticles.find((a) => a.slug === postSlug);
    if (article) {
      currentArticle = article;
      pageTitle = `${article.title} | Blog Mudanzas Mendoza`;
      pageDescription = article.summary;
      pageCanonical = `https://mudanzasmendoza.com.ar/blog/${article.slug}`;
    }
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-brand-green-500 selection:text-white">
        <SEO
          title={pageTitle}
          description={pageDescription}
          canonicalUrl={pageCanonical}
          isLocalPage={!!currentDestination}
          destinationData={currentDestination}
          serviceData={currentService}
          blogArticleData={currentArticle}
        />

        <Header destinations={destinations} activePage={activePage} onNavigate={handleNavigation} />

        <main className="flex-grow">
          <AnimatePresence mode="wait">
            {activePage === '' ? (
              <motion.div
                key="homepage"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <section className="relative bg-white text-slate-800 overflow-hidden py-16 lg:py-24 border-b border-slate-200">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#F8FAFC_0%,#FFFFFF_100%)] z-0" />
                  <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-3xl rounded-full z-0 pointer-events-none" />

                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
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
                            href="https://wa.link/zn3zij"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hero-cta-button"
                          >
                            Contactar por WhatsApp
                            <Phone className="w-5 h-5" />
                          </a>
                          <a
                            href="#form"
                            className="w-full sm:w-auto flex items-center justify-center gap-2 border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold px-8 py-4 rounded-2xl transition-all cursor-pointer text-base"
                          >
                            Solicitar presupuesto
                            <ArrowRight className="w-5 h-5" />
                          </a>
                        </div>
                      </div>
                      <div className="lg:col-span-6 relative flex justify-center">
                        <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-200 shadow-amber-500/10 hover:scale-[1.01] transition-transform duration-300">
                          <img
                              src="/img/camiones-mudanzas-miranda.webp"
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

                {/* RESTORE_MARKER_CONTINUE_FROM_ORIGINAL */}
                <p className="p-8 text-center text-red-600">App parcial — ejecutar restore completo desde backup local /tmp/App_restore.tsx</p>
              </motion.div>
            ) : (
              <motion.div key="other" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="max-w-3xl mx-auto px-4 py-16 text-center">
                  <p>Restaurando rutas…</p>
                  <button type="button" className="mt-4 underline" onClick={() => handleNavigation('')}>Volver al inicio</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <Footer onNavigate={handleNavigation} />
      </div>
    </ErrorBoundary>
  );
}
