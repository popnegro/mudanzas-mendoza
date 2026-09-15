import { Menu, X, ChevronDown, Phone, MessageSquare } from "lucide-react";
import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Destination } from "@/types";

interface HeaderProps {
  destinations: Destination[];
  activePage: string;
  onNavigate: (slug: string) => void;
}

export default function Header({ destinations, activePage, onNavigate }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const granMendoza = useMemo(
    () => destinations.filter((d) => d.region === "Gran Mendoza" && !d.isDistrict),
    [destinations],
  );
  const esteValleUco = useMemo(
    () =>
      destinations.filter(
        (d) => d.region === "Zona Este y Valle de Uco" && !d.isDistrict,
      ),
    [destinations],
  );
  const surMendoza = useMemo(
    () => destinations.filter((d) => d.region === "Sur de Mendoza" && !d.isDistrict),
    [destinations],
  );

  const closeMenus = useCallback(() => {
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
  }, []);

  const handleLinkClick = useCallback(
    (slug: string) => {
      onNavigate(slug);
      closeMenus();
    },
    [closeMenus, onNavigate],
  );

  const handleScrollToSection = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
      event.preventDefault();
      closeMenus();

      const scrollToSection = () => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      };

      if (activePage !== "") {
        onNavigate("");
        window.setTimeout(scrollToSection, 350);
      } else {
        scrollToSection();
      }
    },
    [activePage, closeMenus, onNavigate],
  );

  const destinationHref = (slug: string) => `/mudanzas-mendoza/${slug}.html`;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenus();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeMenus]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80 py-3"
          : "bg-white py-4 border-b border-slate-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a
            href="/"
            onClick={(event) => {
              if (activePage !== "") {
                event.preventDefault();
                handleLinkClick("");
              }
            }}
            className="flex-shrink-0 cursor-pointer"
            aria-label="Mudanzas Miranda - Inicio"
          >
            <img
              src="https://mudanzasmendoza.com.ar/img/logo-dark.svg"
              alt="Logo de Mudanzas Miranda"
              className="h-10 w-auto"
              width="160"
              height="40"
              decoding="async"
            />
          </a>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Navegación principal">
            <a
              href="#nosotros"
              onClick={(event) => handleScrollToSection(event, "nosotros")}
              className="nav-link-desktop"
            >
              Nosotros
            </a>
            <a
              href="#servicios"
              onClick={(event) => handleScrollToSection(event, "servicios")}
              className="nav-link-desktop"
            >
              Servicios
            </a>

            <div
              className="relative"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsMegaMenuOpen((open) => !open)}
                className={`mega-menu-button ${
                  activePage === "destinos" || destinations.some((d) => d.slug === activePage)
                    ? "text-amber-500 bg-amber-500/10"
                    : ""
                }`}
                aria-expanded={isMegaMenuOpen}
                aria-controls="desktop-destinations-menu"
                aria-haspopup="menu"
              >
                Destinos
                <ChevronDown
                  aria-hidden="true"
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isMegaMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isMegaMenuOpen && (
                <div
                  id="desktop-destinations-menu"
                  className="mega-menu-panel"
                  role="menu"
                  aria-label="Destinos de Mendoza"
                >
                  <div>
                    <h4 className="mega-menu-heading">Gran Mendoza</h4>
                    <ul className="mega-menu-list" role="none">
                      {granMendoza.map((destination) => (
                        <li key={destination.slug}>
                          <a
                            href={destinationHref(destination.slug)}
                            onClick={() => handleLinkClick(destination.slug)}
                            className={`mega-menu-item-button block ${
                              activePage === destination.slug
                                ? "text-amber-500 font-semibold"
                                : "text-slate-600"
                            }`}
                            role="menuitem"
                          >
                            {destination.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-amber-500 uppercase tracking-widest border-b border-slate-200 pb-2 mb-3">
                      Valle de Uco y Este
                    </h4>
                    <ul className="mega-menu-list" role="none">
                      {esteValleUco.map((destination) => (
                        <li key={destination.slug}>
                          <a
                            href={destinationHref(destination.slug)}
                            onClick={() => handleLinkClick(destination.slug)}
                            className={`text-sm block w-full text-left py-1 hover:text-amber-500 transition-colors ${
                              activePage === destination.slug
                                ? "text-amber-500 font-semibold"
                                : "text-slate-600"
                            }`}
                            role="menuitem"
                          >
                            {destination.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-amber-500 uppercase tracking-widest border-b border-slate-200 pb-2 mb-3">
                      Sur de Mendoza
                    </h4>
                    <ul className="mega-menu-list" role="none">
                      {surMendoza.map((destination) => (
                        <li key={destination.slug}>
                          <a
                            href={destinationHref(destination.slug)}
                            onClick={() => handleLinkClick(destination.slug)}
                            className={`text-sm block w-full text-left py-1 hover:text-amber-500 transition-colors ${
                              activePage === destination.slug
                                ? "text-amber-500 font-semibold"
                                : "text-slate-600"
                            }`}
                            role="menuitem"
                          >
                            {destination.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="col-span-3 border-t border-slate-100 pt-3 mt-2 flex justify-between items-center text-xs">
                    <span className="text-slate-400">
                      ¿Buscás un distrito o localidad en específico?
                    </span>
                    <a
                      href="/destinos"
                      onClick={() => handleLinkClick("destinos")}
                      className="text-amber-600 hover:text-amber-700 font-bold flex items-center gap-1"
                      role="menuitem"
                    >
                      Ver todos los departamentos y distritos →
                    </a>
                  </div>
                </div>
              )}
            </div>

            <a
              href="#faq"
              onClick={(event) => handleScrollToSection(event, "faq")}
              className="nav-link-desktop"
            >
              Preguntas
            </a>
            <a
              href="/blog"
              onClick={() => handleLinkClick("blog")}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activePage.startsWith("blog")
                  ? "text-amber-500 bg-amber-500/10"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
              }`}
            >
              Blog
            </a>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#form"
              onClick={(event) => handleScrollToSection(event, "form")}
              className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <MessageSquare className="w-4 h-4" aria-hidden="true" />
              Cotizar Mudanza
            </a>
          </div>

          <div className="flex lg:hidden items-center gap-3">
            <a
              href="https://wa.link/zn3zij"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-500 hover:bg-amber-600 text-white p-3 rounded-xl shadow-md text-xs font-semibold flex items-center justify-center"
              aria-label="Chat en WhatsApp"
            >
              <MessageSquare className="w-5 h-5" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="p-3 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none flex items-center justify-center"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMobileMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className={`lg:hidden fixed inset-x-0 bottom-0 ${
              isScrolled ? "top-[65px]" : "top-[73px]"
            } bg-white z-40 flex flex-col p-6 overflow-y-auto border-t border-slate-200`}
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación móvil"
          >
            <nav className="flex flex-col gap-3" aria-label="Navegación móvil">
              <a
                href="/"
                onClick={(event) => {
                  if (activePage !== "") {
                    event.preventDefault();
                    handleLinkClick("");
                  } else {
                    closeMenus();
                  }
                }}
                className={`w-full text-left py-3 px-4 rounded-xl text-base font-semibold ${
                  activePage === "" ? "text-amber-500 bg-amber-500/10" : "text-slate-600"
                }`}
              >
                Inicio
              </a>
              <a
                href="#nosotros"
                onClick={(event) => handleScrollToSection(event, "nosotros")}
                className="nav-link-mobile"
              >
                Nosotros
              </a>
              <a
                href="#servicios"
                onClick={(event) => handleScrollToSection(event, "servicios")}
                className="nav-link-mobile"
              >
                Servicios
              </a>
              <a
                href="#faq"
                onClick={(event) => handleScrollToSection(event, "faq")}
                className="nav-link-mobile"
              >
                Preguntas Frecuentes
              </a>
              <a
                href="/blog"
                onClick={() => handleLinkClick("blog")}
                className={`w-full text-left py-3 px-4 rounded-xl text-base font-semibold transition-all ${
                  activePage.startsWith("blog")
                    ? "text-amber-500 bg-amber-500/10"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                Blog
              </a>

              <div className="border-t border-slate-200 my-2 pt-2">
                <span className="text-xs font-bold text-amber-500 uppercase tracking-widest px-4 block mb-2">
                  Nuestros Destinos
                </span>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1 px-2">
                  {destinations
                    .filter((destination) => !destination.isDistrict)
                    .map((destination) => (
                      <a
                        key={destination.slug}
                        href={destinationHref(destination.slug)}
                        onClick={() => handleLinkClick(destination.slug)}
                        className={`mobile-destination-button ${
                          activePage === destination.slug
                            ? "text-amber-500 bg-amber-500/10 font-semibold"
                            : "text-slate-500 hover:text-slate-900"
                        }`}
                      >
                        {destination.name}
                      </a>
                    ))}
                </div>
                <a
                  href="/destinos"
                  onClick={() => handleLinkClick("destinos")}
                  className="mt-3 block w-full text-center text-xs font-bold text-amber-600 bg-amber-500/10 hover:bg-amber-500/20 py-2.5 rounded-xl"
                >
                  Ver todos los departamentos y distritos →
                </a>
              </div>
            </nav>

            <div className="mt-auto space-y-3 pt-6 border-t border-slate-200">
              <a
                href="#form"
                onClick={(event) => handleScrollToSection(event, "form")}
                className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 rounded-xl shadow-md"
              >
                <MessageSquare className="w-5 h-5" aria-hidden="true" />
                Cotizar Mudanza
              </a>
              <a
                href="tel:+5492615130910"
                className="w-full flex items-center justify-center gap-2 text-slate-600 font-semibold border border-slate-200 py-3 rounded-xl hover:bg-slate-50"
              >
                <Phone className="w-5 h-5 text-amber-500" aria-hidden="true" />
                Llamar al +54 9 261 513-0910
              </a>
              <a
                href="https://wa.link/zn3zij"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba56] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-500/10"
              >
                <MessageSquare className="w-5 h-5 fill-white" aria-hidden="true" />
                Chatear por WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
