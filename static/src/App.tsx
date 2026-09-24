import * as React from "react";
import {
  ArrowRight,
  Truck,
  MapPin,
  Package,
  Home,
  Briefcase,
  Warehouse,
  Shield,
  ArrowUpCircle,
  Clock,
  Calendar,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { destinations } from "./data/destinations";
import { services, blogArticles } from "./data/staticData";
import SEO from "./components/SEO";
import Header from "./components/layout/Header";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import FAQSection from "./components/FAQSection";
import FormSection from "./components/FormSection";
import MarkdownRenderer from "./components/MarkdownRenderer";
import DestinationsPage from "./pages/DestinationsPage";
import ServicesPage from "./pages/ServicesPage";
import { initializeGlobalErrorHandlers } from "./utils/errorLogger";

const IconMap: Record<string, React.ComponentType<{ className?: string }>> = {
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
  const [activePage, setActivePage] = React.useState<string>("");

  React.useEffect(() => {
    initializeGlobalErrorHandlers();
  }, []);

  React.useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname;

      if (path === "/blog" || path === "/blog/") {
        setActivePage("blog");
        return;
      }
      if (path === "/destinos" || path === "/destinos/") {
        setActivePage("destinos");
        return;
      }
      if (path === "/servicios" || path === "/servicios/") {
        setActivePage("servicios");
        return;
      }

      const blogPostMatch = path.match(/^\/blog\/([a-z0-9-]+)\/?$/);
      if (blogPostMatch) {
        setActivePage(`blog/${blogPostMatch[1]}`);
        return;
      }

      const serviceHtmlMatch = path.match(
        /\/servicios\/(fletes-[a-z-]+|mudanzas-[a-z0-9-]+|transporte-[a-z-]+|traslado-[a-z-]+|guardamuebles-[a-z-]+|embalaje-[a-z-]+|izamientos-[a-z-]+)\.html/,
      );
      const htmlMatch = path.match(/\/mudanzas-mendoza\/(mudanzas-[a-z-]+)\.html/);
      const simpleMatch = path.match(/^\/([a-z0-9-]+)$/);
      const slugCandidate = serviceHtmlMatch
        ? serviceHtmlMatch[1]
        : htmlMatch
          ? htmlMatch[1]
          : simpleMatch
            ? simpleMatch[1]
            : "";

      if (services.some((s) => s.id === slugCandidate)) {
        setActivePage(slugCandidate);
      } else if (destinations.some((d) => d.slug === slugCandidate)) {
        setActivePage(slugCandidate);
      } else if (slugCandidate === "destinos") {
        setActivePage("destinos");
      } else if (slugCandidate === "servicios") {
        setActivePage("servicios");
      } else {
        setActivePage("");
      }
    };

    handleUrlChange();
    window.addEventListener("popstate", handleUrlChange);
    return () => window.removeEventListener("popstate", handleUrlChange);
  }, []);

  const handleNavigation = (slug: string) => {
    setActivePage(slug);
    let newPath = "/";
    if (slug === "blog") newPath = "/blog";
    else if (slug === "destinos") newPath = "/destinos";
    else if (slug === "servicios") newPath = "/servicios";
    else if (slug.startsWith("blog/")) newPath = `/${slug}`;
    else if (services.some((s) => s.id === slug)) newPath = `/servicios/${slug}.html`;
    else if (slug) newPath = `/mudanzas-mendoza/${slug}.html`;
    window.history.pushState({}, "", newPath);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentDestination = destinations.find((d) => d.slug === activePage);
  const currentService = services.find((s) => s.id === activePage);
  const currentArticle = activePage.startsWith("blog/")
    ? blogArticles.find((a) => a.slug === activePage.replace("blog/", ""))
    : undefined;

  let pageTitle = "Mudanzas en Mendoza - Profesionales y Seguras";
  let pageDescription =
    "Servicio profesional de mudanzas en Mendoza. Traslados residenciales y de oficinas. Cotizá online.";
  let pageCanonical = "https://mudanzasmendoza.com.ar";

  if (currentDestination) {
    pageTitle = currentDestination.title;
    pageDescription = currentDestination.description;
    pageCanonical = `https://mudanzasmendoza.com.ar/mudanzas-mendoza/${currentDestination.slug}.html`;
  } else if (currentService) {
    pageTitle = `${currentService.title} en Mendoza | Mudanzas en Mendoza`;
    pageDescription = currentService.description;
    pageCanonical = `https://mudanzasmendoza.com.ar/servicios/${currentService.id}.html`;
  } else if (activePage === "destinos") {
    pageTitle = "Zonas de Cobertura - Destinos de Mudanzas en Mendoza";
    pageDescription =
      "Cobertura de fletes y mudanzas en todos los departamentos y distritos de Mendoza.";
    pageCanonical = "https://mudanzasmendoza.com.ar/destinos";
  } else if (activePage === "servicios") {
    pageTitle = "Servicios de Mudanzas y Fletes en Mendoza";
    pageDescription =
      "Mudanzas residenciales, oficinas, embalaje, guardamuebles e izamientos en Mendoza.";
    pageCanonical = "https://mudanzasmendoza.com.ar/servicios";
  } else if (activePage === "blog") {
    pageTitle = "Blog de Mudanzas Mendoza | Consejos y Guías";
    pageDescription = "Consejos para organizar tu mudanza, embalar y conocer tarifas en Mendoza.";
    pageCanonical = "https://mudanzasmendoza.com.ar/blog";
  } else if (currentArticle) {
    pageTitle = `${currentArticle.title} | Blog Mudanzas Mendoza`;
    pageDescription = currentArticle.summary;
    pageCanonical = `https://mudanzasmendoza.com.ar/blog/${currentArticle.slug}`;
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
        <Header activePage={activePage} onNavigate={handleNavigation} />

        <main className="flex-grow">
          <AnimatePresence mode="wait">
            {activePage === "servicios" ? (
              <ServicesPage handleNavigation={handleNavigation} />
            ) : activePage === "destinos" ? (
              <DestinationsPage handleNavigation={handleNavigation} />
            ) : activePage === "blog" ? (
              <motion.div
                key="bloglist"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white"
              >
                <div className="bg-slate-50 border-b border-slate-200 text-slate-600 py-3 text-xs sm:text-sm">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleNavigation("")}
                      className="hover:text-slate-900 font-semibold cursor-pointer"
                    >
                      Inicio
                    </button>
                    <span>/</span>
                    <span className="text-brand-green-600 font-semibold">Blog</span>
                  </div>
                </div>
                <section className="py-16">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="page-hero-title mb-10">Blog de mudanzas en Mendoza</h1>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {blogArticles.map((article) => (
                        <button
                          key={article.slug}
                          type="button"
                          onClick={() => handleNavigation(`blog/${article.slug}`)}
                          className="blog-article-card text-left group"
                        >
                          <div className="p-6 space-y-3">
                            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-green-600">
                              <BookOpen className="w-3.5 h-3.5" />
                              Artículo
                            </div>
                            <h2 className="blog-card-title">{article.title}</h2>
                            <p className="text-sm text-slate-600 line-clamp-3">{article.summary}</p>
                            <span className="blog-read-article-button">
                              Leer artículo
                              <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </section>
              </motion.div>
            ) : currentArticle ? (
              <motion.div
                key={currentArticle.slug}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white"
              >
                <div className="bg-slate-50 border-b border-slate-200 text-slate-600 py-3 text-xs sm:text-sm">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleNavigation("")}
                      className="hover:text-slate-900 font-semibold cursor-pointer"
                    >
                      Inicio
                    </button>
                    <span>/</span>
                    <button
                      type="button"
                      onClick={() => handleNavigation("blog")}
                      className="hover:text-slate-900 font-semibold cursor-pointer"
                    >
                      Blog
                    </button>
                    <span>/</span>
                    <span className="text-slate-800 truncate font-medium">{currentArticle.title}</span>
                  </div>
                </div>
                <article className="py-16">
                  <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    <h1 className="page-hero-title">{currentArticle.title}</h1>
                    <p className="text-lg text-slate-600">{currentArticle.summary}</p>
                    <div className="markdown-container">
                      <MarkdownRenderer content={currentArticle.content || currentArticle.summary} />
                    </div>
                    <FormSection title="¿Necesitás ayuda con tu mudanza?" />
                  </div>
                </article>
              </motion.div>
            ) : currentService ? (
              <motion.div
                key={currentService.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white"
              >
                <div className="bg-slate-50 border-b border-slate-200 text-slate-600 py-3 text-xs sm:text-sm">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleNavigation("")}
                      className="hover:text-slate-900 font-semibold cursor-pointer"
                    >
                      Inicio
                    </button>
                    <span>/</span>
                    <button
                      type="button"
                      onClick={() => handleNavigation("servicios")}
                      className="hover:text-slate-900 font-semibold cursor-pointer"
                    >
                      Servicios
                    </button>
                    <span>/</span>
                    <span className="text-slate-800 truncate font-medium">{currentService.title}</span>
                  </div>
                </div>
                <section className="py-16 border-b border-slate-200">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    <div className="max-w-3xl space-y-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-green-500/10 border border-brand-green-500/20 text-brand-green-600 text-xs font-bold uppercase tracking-wider">
                        {React.createElement(IconMap[currentService.icon] || Truck, {
                          className: "w-4 h-4",
                        })}
                        Servicio
                      </div>
                      <h1 className="page-hero-title">{currentService.title}</h1>
                      <p className="hero-description">{currentService.description}</p>
                    </div>
                    {currentService.longDescription && (
                      <p className="text-slate-700 leading-relaxed max-w-3xl">
                        {currentService.longDescription}
                      </p>
                    )}
                    {currentService.benefits && currentService.benefits.length > 0 && (
                      <ul className="grid gap-3 sm:grid-cols-2 max-w-3xl">
                        {currentService.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                            <CheckCircle2 className="w-5 h-5 text-brand-green-500 shrink-0 mt-0.5" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </section>
                <FormSection
                  title={`Cotizá ${currentService.title}`}
                  initialService={currentService.id}
                />
              </motion.div>
            ) : currentDestination ? (
              <motion.div
                key={currentDestination.slug}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white"
              >
                <div className="bg-slate-50 border-b border-slate-200 text-slate-600 py-3 text-xs sm:text-sm">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleNavigation("")}
                      className="hover:text-slate-900 font-semibold cursor-pointer"
                    >
                      Inicio
                    </button>
                    <span>/</span>
                    <button
                      type="button"
                      onClick={() => handleNavigation("destinos")}
                      className="hover:text-slate-900 font-semibold cursor-pointer"
                    >
                      Destinos
                    </button>
                    <span>/</span>
                    <span className="text-slate-800 truncate font-medium">
                      {currentDestination.name}
                    </span>
                  </div>
                </div>
                <section className="py-16 border-b border-slate-200">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-green-500/10 border border-brand-green-500/20 text-brand-green-600 text-xs font-bold uppercase tracking-wider">
                      <MapPin className="w-4 h-4" />
                      {currentDestination.region}
                    </div>
                    <h1 className="page-hero-title">
                      {currentDestination.heroHeadline || currentDestination.name}
                    </h1>
                    <p className="hero-description max-w-3xl">
                      {currentDestination.heroSubheadline}
                    </p>
                    {currentDestination.leadText && (
                      <p className="text-slate-700 leading-relaxed max-w-3xl">
                        {currentDestination.leadText}
                      </p>
                    )}
                    {currentDestination.detailText && (
                      <p className="text-slate-600 leading-relaxed max-w-3xl">
                        {currentDestination.detailText}
                      </p>
                    )}
                  </div>
                </section>
                <FormSection
                  title={`Cotizá tu mudanza para ${currentDestination.name}`}
                  destinationName={currentDestination.name}
                />
              </motion.div>
            ) : (
              <motion.div
                key="fallback"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white"
              >
                <section className="py-20">
                  <div className="max-w-3xl mx-auto px-4 text-center space-y-6">
                    <h1 className="page-hero-title">Mudanzas en Mendoza</h1>
                    <p className="section-description text-base">
                      Explorá nuestros servicios y cobertura provincial.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleNavigation("servicios")}
                        className="header-cta-button"
                      >
                        Ver servicios
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavigation("destinos")}
                        className="nav-link-desktop border border-slate-200"
                      >
                        Ver destinos
                      </button>
                    </div>
                  </div>
                </section>
                <FAQSection canonicalUrl={pageCanonical} />
                <FormSection />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <Footer destinations={destinations} onNavigate={handleNavigation} />
      </div>
    </ErrorBoundary>
  );
}
