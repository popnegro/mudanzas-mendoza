import { Menu, X, Phone, MessageSquare } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { themeConfig } from "@/theme/theme.config";

interface HeaderProps {
  activePage: string;
  onNavigate: (slug: string) => void;
}

export default function Header({ activePage, onNavigate }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = useCallback(
    (slug: string) => {
      onNavigate(slug);
      setIsMobileMenuOpen(false);
    },
    [onNavigate],
  );

  const handleScrollToSection = useCallback(
    (event: React.MouseEvent, sectionId: string) => {
      event.preventDefault();
      setIsMobileMenuOpen(false);

      if (activePage !== "") {
        handleLinkClick("");
        window.setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
        }, 300);
        return;
      }

      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    },
    [activePage, handleLinkClick],
  );

  return (
    <header
      className={isScrolled
        ? "sticky top-0 z-50 w-full transition-all duration-300 bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80 py-3"
        : "sticky top-0 z-50 w-full transition-all duration-300 bg-white py-4 border-b border-slate-200"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => handleLinkClick("")}
            className="flex-shrink-0 cursor-pointer"
            aria-label="Ir al inicio"
          >
            <img
              src="/img/mudanzas-mendoza-brandmark.webp"
              alt={themeConfig.brand.name}
              className="h-10 w-auto object-contain"
              width="640"
              height="160"
              decoding="async"
            />
          </button>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Navegación principal">
            <button onClick={(e) => handleScrollToSection(e, "nosotros")} className="nav-link-desktop">
              Nosotros
            </button>
            <button onClick={(e) => handleScrollToSection(e, "servicios")} className="nav-link-desktop">
              Servicios
            </button>
            <button
              onClick={() => handleLinkClick("destinos")}
              className={"nav-link-desktop " + (activePage === "destinos" ? "text-brand-green-500 bg-brand-green-500/10" : "")}
            >
              Destinos
            </button>
            <button onClick={(e) => handleScrollToSection(e, "faq")} className="nav-link-desktop">
              Preguntas
            </button>
            <button
              onClick={() => handleLinkClick("blog")}
              className={"nav-link-desktop " + (activePage.startsWith("blog") ? "text-brand-green-500 bg-brand-green-500/10" : "")}
            >
              Blog
            </button>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={themeConfig.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="header-cta-button"
            >
              <MessageSquare className="w-4 h-4" />
              Pedir presupuesto
            </a>
          </div>

          <div className="flex lg:hidden items-center gap-3">
            <a
              href={themeConfig.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-whatsapp-button p-3"
              aria-label="Chat por WhatsApp"
            >
              <MessageSquare className="w-5 h-5" />
            </a>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-3 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer flex items-center justify-center"
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className={isScrolled
              ? "lg:hidden fixed inset-0 top-[65px] bg-white z-40 flex flex-col p-6 overflow-y-auto border-t border-slate-200"
              : "lg:hidden fixed inset-0 top-[73px] bg-white z-40 flex flex-col p-6 overflow-y-auto border-t border-slate-200"}
          >
            <nav className="flex flex-col gap-3" aria-label="Navegación móvil">
              <button
                onClick={() => handleLinkClick("")}
                className={"w-full text-left py-3 px-4 rounded-xl text-base font-semibold " + (activePage === "" ? "text-brand-green-500 bg-brand-green-500/10" : "text-slate-600")}
              >
                Inicio
              </button>
              <button onClick={(e) => handleScrollToSection(e, "nosotros")} className="nav-link-mobile">
                Nosotros
              </button>
              <button onClick={(e) => handleScrollToSection(e, "servicios")} className="nav-link-mobile">
                Servicios
              </button>
              <button
                onClick={() => handleLinkClick("destinos")}
                className={"nav-link-mobile " + (activePage === "destinos" ? "text-brand-green-500 bg-brand-green-500/10" : "")}
              >
                Destinos
              </button>
              <button onClick={(e) => handleScrollToSection(e, "faq")} className="nav-link-mobile">
                Preguntas frecuentes
              </button>
              <button
                onClick={() => handleLinkClick("blog")}
                className={"nav-link-mobile " + (activePage.startsWith("blog") ? "text-brand-green-500 bg-brand-green-500/10" : "")}
              >
                Blog
              </button>
            </nav>

            <div className="mt-auto space-y-3 pt-6 border-t border-slate-200">
              <a
                href={themeConfig.contact.phoneHref}
                className="w-full flex items-center justify-center gap-2 text-slate-600 font-semibold border border-slate-200 py-3 rounded-xl hover:bg-slate-50"
              >
                <Phone className="w-5 h-5 text-brand-green-500" />
                Llamar al {themeConfig.contact.phone}
              </a>
              <a
                href={themeConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba56] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-500/10 cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 fill-white" />
                Chatear por WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
