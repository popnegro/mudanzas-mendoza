import { Menu, X, ChevronDown, Phone, MessageSquare } from "lucide-react";
import { useState, useEffect, useMemo, useCallback } from "react";

import { Destination } from "@/types";

interface HeaderProps {
  destinations: Destination[];
  activePage: string;
  onNavigate: (slug: string) => void;
}

export default function Header({
  destinations,
  activePage,
  onNavigate,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll to style navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Group destinations by region for the mega-menu (departments only, districts will be shown on the index page) using useMemo for optimization
  const granMendoza = useMemo(
    () =>
      destinations.filter((d) => d.region === "Gran Mendoza" && !d.isDistrict),
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
    () =>
      destinations.filter(
        (d) => d.region === "Sur de Mendoza" && !d.isDistrict,
      ),
    [destinations],
  );

  const handleLinkClick = useCallback(
    (slug: string) => {
      onNavigate(slug);
      setIsMobileMenuOpen(false);
      setIsMegaMenuOpen(false);
    },
    [onNavigate],
  );

  // Accessibility improvement: Close menus on escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMegaMenuOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Refactor scroll-to-section logic to avoid repetition and improve clarity
  const handleScrollToSection = useCallback(
    (e: React.MouseEvent, sectionId: string) => {
      if (activePage !== "") {
        e.preventDefault();
        handleLinkClick(""); // Navigate to home first
      }
      setTimeout(
        () => {
          // Always attempt to scroll, even if already on home page
          document
            .getElementById(sectionId)
            .scrollIntoView({ behavior: "smooth" });
        },
        activePage !== "" ? 100 : 0,
      ); // Add a slight delay if navigating to home first
      setIsMobileMenuOpen(false); // Close mobile menu if open
    },
    [activePage, handleLinkClick],
  );

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
          {/* Logo */}
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => handleLinkClick("")}
            onKeyDown={(e) => e.key === "Enter" && handleLinkClick("")}
            role="button"
            tabIndex={0}
          >
            <div className="flex items-center gap-2">
              <img
                src="/img/brand-dark.webp"
                alt="Logo de Mudanzas Miranda"
                className="h-6 w-auto"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={(e) => handleScrollToSection(e, "nosotros")}
              className="nav-link-desktop"
            >
              Nosotros
            </button>
            <button
              onClick={(e) => handleScrollToSection(e, "servicios")}
              className="nav-link-desktop"
            >
              Servicios
            </button>

            {/* Mega Menu Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setIsMegaMenuOpen(true)}
                onClick={() => handleLinkClick("destinos")}
                className={`mega-menu-button ${
                  activePage === "destinos" ||
                  destinations.some((d) => d.slug === activePage)
                    ? "text-amber-500 bg-amber-500/10"
                    : ""
                }`}
                aria-expanded={isMegaMenuOpen}
                aria-haspopup="true"
              >
                Destinos
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${isMegaMenuOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Mega Menu Panel */}
              {isMegaMenuOpen && (
                <div
                  onMouseLeave={() => setIsMegaMenuOpen(false)}
                  className="mega-menu-panel"
                  role="menu"
                  tabIndex={0}
                >
                  {/* Gran Mendoza */}
                  <div>
                    <h4 className="mega-menu-heading">Gran Mendoza</h4>
                    <ul className="mega-menu-list" role="none">
                      {granMendoza.map((d) => (
                        <li key={d.slug}>
                          <button
                            onClick={() => handleLinkClick(d.slug)} // Use handleLinkClick for SPA navigation
                            className={`mega-menu-item-button ${
                              activePage === d.slug
                                ? "text-amber-500 font-semibold"
                                : "text-slate-600"
                            }`}
                            role="menuitem"
                          >
                            {d.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Zona Este y Valle de Uco */}
                  <div>
                    <h4 className="text-xs font-bold text-amber-500 uppercase tracking-widest border-b border-slate-200 pb-2 mb-3">
                      Valle de Uco y Este
                    </h4>
                    <ul className="mega-menu-list" role="none">
                      {esteValleUco.map((d) => (
                        <li key={d.slug}>
                          <button
                            onClick={() => handleLinkClick(d.slug)}
                            className={`text-sm block w-full text-left py-1 hover:text-amber-500 transition-colors cursor-pointer ${
                              activePage === d.slug
                                ? "text-amber-500 font-semibold"
                                : "text-slate-600"
                            }`}
                          >
                            {d.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Sur de Mendoza */}
                  <div>
                    <h4 className="text-xs font-bold text-amber-500 uppercase tracking-widest border-b border-slate-200 pb-2 mb-3">
                      Sur de Mendoza
                    </h4>
                    <ul className="mega-menu-list" role="none">
                      {surMendoza.map((d) => (
                        <li key={d.slug}>
                          <button
                            onClick={() => handleLinkClick(d.slug)}
                            className={`text-sm block w-full text-left py-1 hover:text-amber-500 transition-colors cursor-pointer ${
                              activePage === d.slug
                                ? "text-amber-500 font-semibold"
                                : "text-slate-600"
                            }`}
                          >
                            {d.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom link to all destinations */}
                  <div className="col-span-3 border-t border-slate-100 pt-3 mt-2 flex justify-between items-center text-xs">
                    <span className="text-slate-400">
                      ¿Buscás un distrito o localidad en específico?
                    </span>
                    <button
                      onClick={() => handleLinkClick("destinos")}
                      className="text-amber-600 hover:text-amber-700 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      Ver todos los departamentos y distritos ➔
                    </button>
                  </div>
                </div>
              )}
            </div>

            <a
              href="#faq"
              onClick={(e) => {
                if (activePage !== "") {
                  e.preventDefault();
                  handleLinkClick("");
                  setTimeout(() => {
                    document
                      .getElementById("faq")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }
              }}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 transition-all"
            >
              Preguntas
            </a>
            <button
              onClick={() => handleLinkClick("blog")}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activePage.startsWith("blog")
                  ? "text-amber-500 bg-amber-500/10"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
              }`}
            >
              Blog
            </button>
          </nav>

          {/* Right Action buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#form"
              onClick={(e) => {
                if (activePage !== "") {
                  e.preventDefault();
                  handleLinkClick("");
                  setTimeout(() => {
                    document
                      .getElementById("form")
                      .scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }
              }}
              className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              Cotizar Mudanza
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-3">
            <a
              href="https://wa.link/zn3zij"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-xl shadow-md cursor-pointer text-xs font-semibold flex items-center gap-1"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[65px] bg-white z-40 flex flex-col p-6 animate-in slide-in-from-right duration-200 overflow-y-auto border-t border-slate-200">
          <nav className="flex flex-col gap-3">
            <button
              onClick={() => handleLinkClick("")}
              className={`w-full text-left py-3 px-4 rounded-xl text-base font-semibold ${
                activePage === ""
                  ? "text-amber-500 bg-amber-500/10"
                  : "text-slate-600"
              }`}
            >
              Inicio
            </button>
            <button
              onClick={(e) => handleScrollToSection(e, "nosotros")}
              className="nav-link-mobile"
            >
              Nosotros
            </button>
            <button
              onClick={(e) => handleScrollToSection(e, "servicios")}
              className="nav-link-mobile"
            >
              Servicios
            </button>
            <button
              onClick={(e) => handleScrollToSection(e, "faq")}
              className="nav-link-mobile"
            >
              Preguntas Frecuentes
            </button>
            <button
              onClick={() => handleLinkClick("blog")}
              className={`w-full text-left py-3 px-4 rounded-xl text-base font-semibold transition-all cursor-pointer ${
                activePage.startsWith("blog")
                  ? "text-amber-500 bg-amber-500/10"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Blog
            </button>

            <div className="border-t border-slate-200 my-2 pt-2">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest px-4 block mb-2">
                Nuestros Destinos
              </span>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1 px-2">
                {destinations
                  .filter((d) => !d.isDistrict)
                  .map((d) => (
                    <button
                      key={d.slug}
                      onClick={() => handleLinkClick(d.slug)}
                      className={`mobile-destination-button ${
                        activePage === d.slug
                          ? "text-amber-500 bg-amber-500/10 font-semibold"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      {d.name}
                    </button>
                  ))}
              </div>
              <button
                onClick={() => handleLinkClick("destinos")}
                className="mt-3 w-full text-center text-xs font-bold text-amber-600 bg-amber-500/10 hover:bg-amber-500/20 py-2.5 rounded-xl cursor-pointer"
              >
                Ver todos los departamentos y distritos ➔
              </button>
            </div>
          </nav>

          <div className="mt-auto space-y-3 pt-6 border-t border-slate-200">
            <a
              href="tel:+5492615130910"
              className="w-full flex items-center justify-center gap-2 text-slate-600 font-semibold border border-slate-200 py-3 rounded-xl hover:bg-slate-50"
            >
              <Phone className="w-5 h-5 text-amber-500" />
              Llamar al +54 9 261 513-0910
            </a>
            <a
              href="https://wa.link/zn3zij"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba56] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-500/10 cursor-pointer"
            >
              <MessageSquare className="w-5 h-5 fill-white" />
              Chatear por WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
