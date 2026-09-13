import { Menu, X, ChevronDown, Phone, MessageSquare } from "lucide-react";
import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Destination } from "@/types";

interface HeaderProps {
  destinations: Destination[];
  activePage: string;
  onNavigate: (slug: string) => void;
}

const destinationHref = (slug: string) => `/mudanzas-mendoza/${slug}.html`;

export default function Header({ destinations, activePage, onNavigate }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const granMendoza = useMemo(() => destinations.filter((d) => d.region === "Gran Mendoza" && !d.isDistrict), [destinations]);
  const esteValleUco = useMemo(() => destinations.filter((d) => d.region === "Zona Este y Valle de Uco" && !d.isDistrict), [destinations]);
  const surMendoza = useMemo(() => destinations.filter((d) => d.region === "Sur de Mendoza" && !d.isDistrict), [destinations]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMegaMenuOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navigate = useCallback((slug: string) => {
    onNavigate(slug);
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
  }, [onNavigate]);

  const handleSectionClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault();
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
    const scroll = () => document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    if (activePage !== "") {
      onNavigate("");
      window.setTimeout(scroll, 300);
    } else {
      scroll();
    }
  }, [activePage, onNavigate]);

  const renderDestinationGroup = (title: string, items: Destination[]) => (
    <section aria-labelledby={`destinos-${title.toLowerCase().replace(/\s+/g, "-")}`}>
      <h2 id={`destinos-${title.toLowerCase().replace(/\s+/g, "-")}`} className="mega-menu-heading">{title}</h2>
      <ul className="mega-menu-list">
        {items.map((destination) => (
          <li key={destination.slug}>
            <a
              href={destinationHref(destination.slug)}
              onClick={(event) => { event.preventDefault(); navigate(destination.slug); }}
              aria-current={activePage === destination.slug ? "page" : undefined}
              className={`mega-menu-item-button ${activePage === destination.slug ? "text-amber-500 font-semibold" : "text-slate-600"}`}
            >{destination.name}</a>
          </li>
        ))}
      </ul>
    </section>
  );

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80 py-3" : "bg-white py-4 border-b border-slate-200"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a href="/" onClick={(event) => { event.preventDefault(); navigate(""); }} className="flex-shrink-0" aria-label="Mudanzas Miranda — inicio">
            <img src="https://mudanzasmendoza.com.ar/img/logo-dark.svg" alt="Mudanzas Miranda" className="h-10 w-auto" width="160" height="40" decoding="async" />
          </a>

          <nav aria-label="Navegación principal" className="hidden lg:flex items-center gap-1">
            <a href="/#nosotros" onClick={(event) => handleSectionClick(event, "nosotros")} className="nav-link-desktop">Nosotros</a>
            <a href="/#servicios" onClick={(event) => handleSectionClick(event, "servicios")} className="nav-link-desktop">Servicios</a>
            <div className="relative">
              <button type="button" onMouseEnter={() => setIsMegaMenuOpen(true)} onFocus={() => setIsMegaMenuOpen(true)} onClick={() => navigate("destinos")} className={`mega-menu-button ${activePage === "destinos" || destinations.some((d) => d.slug === activePage) ? "text-amber-500 bg-amber-500/10" : ""}`} aria-expanded={isMegaMenuOpen} aria-haspopup="true">
                Destinos <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMegaMenuOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
              {isMegaMenuOpen && (
                <div onMouseLeave={() => setIsMegaMenuOpen(false)} className="mega-menu-panel" aria-label="Destinos por región">
                  {renderDestinationGroup("Gran Mendoza", granMendoza)}
                  {renderDestinationGroup("Valle de Uco y Este", esteValleUco)}
                  {renderDestinationGroup("Sur de Mendoza", surMendoza)}
                  <div className="col-span-3 border-t border-slate-100 pt-3 mt-2 flex justify-between items-center text-xs">
                    <span className="text-slate-400">¿Buscás un distrito o localidad en específico?</span>
                    <a href="/destinos" onClick={(event) => { event.preventDefault(); navigate("destinos"); }} className="text-amber-600 hover:text-amber-700 font-bold flex items-center gap-1">Ver todos los departamentos y distritos →</a>
                  </div>
                </div>
              )}
            </div>
            <a href="/#faq" onClick={(event) => handleSectionClick(event, "faq")} className="nav-link-desktop">Preguntas</a>
            <a href="/blog" onClick={(event) => { event.preventDefault(); navigate("blog"); }} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activePage.startsWith("blog") ? "text-amber-500 bg-amber-500/10" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"}`}>Blog</a>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a href="/#form" onClick={(event) => handleSectionClick(event, "form")} className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-md transition-all">
              <MessageSquare className="w-4 h-4" aria-hidden="true" /> Cotizar Mudanza
            </a>
          </div>

          <div className="flex lg:hidden items-center gap-3">
            <a href="https://wa.link/zn3zij" target="_blank" rel="noopener noreferrer" className="bg-amber-500 hover:bg-amber-600 text-white p-3 rounded-xl shadow-md flex items-center justify-center" aria-label="Contactar por WhatsApp">
              <MessageSquare className="w-5 h-5" aria-hidden="true" />
            </a>
            <button type="button" onClick={() => setIsMobileMenuOpen((open) => !open)} className="p-3 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center justify-center" aria-expanded={isMobileMenuOpen} aria-controls="mobile-navigation" aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}>
              {isMobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div id="mobile-navigation" initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }} transition={{ type: "spring", bounce: 0, duration: 0.3 }} className={`lg:hidden fixed inset-0 ${isScrolled ? "top-[65px]" : "top-[73px]"} bg-white z-40 flex flex-col p-6 overflow-y-auto border-t border-slate-200`}>
            <nav aria-label="Navegación móvil" className="flex flex-col gap-3">
              <a href="/" onClick={(event) => { event.preventDefault(); navigate(""); }} className={`w-full py-3 px-4 rounded-xl text-base font-semibold ${activePage === "" ? "text-amber-500 bg-amber-500/10" : "text-slate-600"}`} aria-current={activePage === "" ? "page" : undefined}>Inicio</a>
              <a href="/#nosotros" onClick={(event) => handleSectionClick(event, "nosotros")} className="nav-link-mobile">Nosotros</a>
              <a href="/#servicios" onClick={(event) => handleSectionClick(event, "servicios")} className="nav-link-mobile">Servicios</a>
              <a href="/#faq" onClick={(event) => handleSectionClick(event, "faq")} className="nav-link-mobile">Preguntas frecuentes</a>
              <a href="/blog" onClick={(event) => { event.preventDefault(); navigate("blog"); }} className="nav-link-mobile">Blog</a>
              <section aria-labelledby="mobile-destinos" className="border-t border-slate-200 my-2 pt-2">
                <h2 id="mobile-destinos" className="text-xs font-bold text-amber-500 uppercase tracking-widest px-4 block mb-2">Nuestros destinos</h2>
                <ul className="grid grid-cols-2 gap-x-2 gap-y-1 px-2">
                  {destinations.filter((d) => !d.isDistrict).map((destination) => (
                    <li key={destination.slug}>
                      <a href={destinationHref(destination.slug)} onClick={(event) => { event.preventDefault(); navigate(destination.slug); }} className={`mobile-destination-button block ${activePage === destination.slug ? "text-amber-500 bg-amber-500/10 font-semibold" : "text-slate-500 hover:text-slate-900"}`} aria-current={activePage === destination.slug ? "page" : undefined}>{destination.name}</a>
                    </li>
                  ))}
                </ul>
                <a href="/destinos" onClick={(event) => { event.preventDefault(); navigate("destinos"); }} className="mt-3 w-full text-center text-xs font-bold text-amber-600 bg-amber-500/10 hover:bg-amber-500/20 py-2.5 rounded-xl block">Ver todos los departamentos y distritos →</a>
              </section>
            </nav>
            <address className="mt-auto not-italic space-y-3 pt-6 border-t border-slate-200">
              <a href="tel:+5492615130910" className="w-full flex items-center justify-center gap-2 text-slate-600 font-semibold border border-slate-200 py-3 rounded-xl hover:bg-slate-50"><Phone className="w-5 h-5 text-amber-500" aria-hidden="true" />+54 9 261 513-0910</a>
              <a href="https://wa.link/zn3zij" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3.5 rounded-xl shadow-lg"><MessageSquare className="w-5 h-5 fill-white" aria-hidden="true" />Chatear por WhatsApp</a>
            </address>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
