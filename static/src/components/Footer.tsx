import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";

import { Destination } from "../types";

interface FooterProps {
  destinations: Destination[];
  onNavigate: (slug: string) => void;
}

export default function Footer({ destinations, onNavigate }: FooterProps) {
  // Sort main departments alphabetically for a balanced layout
  const sortedDestinations = [...destinations]
    .filter((d) => !d.isDistrict)
    .sort((a, b) => a.name.localeCompare(b.name));

  const handleLinkClick = (slug: string) => {
    onNavigate(slug);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-50 text-slate-600 border-t border-slate-200">
      {/* Upper Footer - Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {" "}
        {/* Layout classes remain */}
        {/* About / Contact */}
        <div className="space-y-4">
          <div
            className="footer-brand-logo-container"
            onClick={() => handleLinkClick("")}
            onKeyDown={(e) => e.key === "Enter" && handleLinkClick("")}
            role="button"
            tabIndex={0}
          >
            <img
              src="https://mudanzasmendoza.com.ar/img/logo-dark.svg"
              alt="Logo de Mudanzas Miranda"
              className="h-10 w-auto"
              width="160"
              height="40"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />
            <span className="font-serif font-bold text-xl text-slate-800 tracking-tight flex items-center gap-1">
              Mudanzas <span className="text-amber-500">Miranda</span>
            </span>
          </div>{" "}
          {/* End footer-brand-logo-container */}
          <p className="footer-text-sm-light">
            Más de 20 años de experiencia brindando tranquilidad y confianza en
            mudanzas residenciales, comerciales y fletes en toda Mendoza y el
            país.
          </p>
          <div className="space-y-3 pt-2 text-sm">
            <div className="footer-contact-item">
              <MapPin className="footer-icon-amber" />
              <a
                href="https://maps.google.com/?q=Armada+Argentina+584,+Mendoza,+Argentina"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link-hover"
              >
                Armada Argentina 584, Mendoza, AR
              </a>
            </div>
            <div className="footer-contact-item">
              <Phone className="footer-icon-amber" />
              <a
                href="tel:+5492615130910"
                className="footer-link-hover font-medium text-slate-700"
              >
                +54 9 261 513-0910
              </a>
            </div>
            <div className="footer-contact-item">
              <Mail className="footer-icon-amber" />
              <a
                href="mailto:info@mudanzasmiranda.com.ar"
                className="footer-link-hover"
              >
                info@mudanzasmiranda.com.ar
              </a>
            </div>
          </div>
        </div>
        {/* Operating Hours */}
        <div className="space-y-4">
          <h4 className="footer-section-title">Horarios de Atención</h4>
          <p className="footer-text-sm-light font-medium">
            ¿Listo para tu próxima mudanza? Consultanos dentro de nuestros
            horarios:
          </p>
          <div className="space-y-3 text-sm">
            <div className="footer-contact-item">
              <Clock className="footer-icon-amber" />
              <div>
                <p className="font-semibold text-slate-700">Lunes a Viernes</p>
                <p className="footer-text-xs-light">
                  08:00 - 20:00 (Continuado)
                </p>
              </div>
            </div>
            <div className="footer-contact-item">
              <Clock className="footer-icon-slate" />
              <div>
                <p className="font-semibold text-slate-600">Sábados</p>
                <p className="footer-text-xs-light">09:00 - 14:00</p>
              </div>
            </div>
            <div className="footer-contact-item">
              <Clock className="footer-icon-red" />
              <div>
                <p className="font-semibold text-slate-500">Domingos</p>
                <p className="footer-text-xs-light">
                  Cerrado (Atención de Emergencias)
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Services Quick links */}
        <div className="space-y-4">
          <h4 className="footer-section-title font-sans">Nuestros Servicios</h4>
          <ul className="space-y-2 footer-nav-link-text">
            <li>
              <button
                onClick={() => handleLinkClick("mudanzas-urgentes")}
                className="footer-nav-link footer-link-hover"
              >
                Mudanzas Urgentes ⚡
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLinkClick("mudanzas-24-horas")}
                className="footer-nav-link footer-link-hover"
              >
                Mudanzas 24 Horas 🕒
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLinkClick("mudanzas-residenciales")}
                className="footer-nav-link footer-link-hover"
              >
                Mudanzas Residenciales
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLinkClick("blog")}
                className="footer-nav-link footer-link-hover"
              >
                Blog de Mudanzas & Consejos
              </button>
            </li>
          </ul>
        </div>
        {/* Local SEO Directories */}
        <div className="space-y-4">
          <h4 className="footer-section-title font-sans">
            Destinos Frecuentes
          </h4>
          <p className="footer-text-xs-light">
            Hacé clic en tu localidad para ver servicios de mudanza
            especializados en tu zona:
          </p>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs">
            {sortedDestinations.map((d) => (
              <button
                key={d.slug}
                onClick={() => handleLinkClick(d.slug)}
                className="footer-destination-link footer-link-hover footer-destination-link-text"
              >
                • Mudanzas{" "}
                {d.name.replace(" de Mendoza", "").replace("Mendoza", "")}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lower Footer - Copyright & Social */}
      <div className="footer-bottom-container">
        <div className="footer-bottom-inner">
          <div className="footer-copyright-text">
            <p>© 2026 Mudanzas Miranda. Armada Argentina 584, Mendoza, AR.</p>
            <p className="footer-dev-note">
              Desarrollado en React & Tailwind con optimización extrema para
              Lighthouse y SEO local.
            </p>
          </div>

          <div className="footer-social-links-container">
            <a
              href="https://www.instagram.com/mudanzasmiranda/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="Instagram de Mudanzas Miranda"
            >
              <Instagram className="footer-social-icon" />
            </a>
            <a
              href="https://www.facebook.com/mudanzasmiranda4"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="Facebook de Mudanzas Miranda"
            >
              <Facebook className="footer-social-icon" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
