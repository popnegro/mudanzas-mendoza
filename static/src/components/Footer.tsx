import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";
import { Destination } from "../types";

interface FooterProps {
  destinations: Destination[];
  onNavigate: (slug: string) => void;
}

const destinationHref = (slug: string) => `/mudanzas-mendoza/${slug}.html`;

export default function Footer({ destinations, onNavigate }: FooterProps) {
  const sortedDestinations = [...destinations].filter((d) => !d.isDistrict).sort((a, b) => a.name.localeCompare(b.name));
  const handleLinkClick = (slug: string) => {
    onNavigate(slug);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-50 text-slate-600 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <section aria-labelledby="footer-about" className="space-y-4">
          <h2 id="footer-about" className="sr-only">Mudanzas Miranda</h2>
          <a href="/" onClick={(event) => { event.preventDefault(); handleLinkClick(""); }} className="footer-brand-logo-container inline-flex" aria-label="Mudanzas Miranda — inicio">
            <img src="https://mudanzasmendoza.com.ar/img/logo-dark.svg" alt="Mudanzas Miranda" className="h-10 w-auto" width="160" height="40" loading="lazy" decoding="async" />
          </a>
          <p className="footer-text-sm-light">Más de 20 años de experiencia brindando tranquilidad y confianza en mudanzas residenciales, comerciales y fletes en toda Mendoza y el país.</p>
          <address className="space-y-3 pt-2 text-sm not-italic">
            <div className="footer-contact-item"><MapPin className="footer-icon-amber" aria-hidden="true" /><a href="https://maps.google.com/?q=Armada+Argentina+584,+Mendoza,+Argentina" target="_blank" rel="noopener noreferrer" className="footer-link-hover">Armada Argentina 584, Mendoza, AR</a></div>
            <div className="footer-contact-item"><Phone className="footer-icon-amber" aria-hidden="true" /><a href="tel:+5492615130910" className="footer-link-hover font-medium text-slate-700">+54 9 261 513-0910</a></div>
            <div className="footer-contact-item"><Mail className="footer-icon-amber" aria-hidden="true" /><a href="mailto:info@mudanzasmendoza.com.ar" className="footer-link-hover">info@mudanzasmendoza.com.ar</a></div>
          </address>
        </section>

        <section aria-labelledby="footer-hours" className="space-y-4">
          <h2 id="footer-hours" className="footer-section-title">Horarios de atención</h2>
          <p className="footer-text-sm-light font-medium">Consultanos para coordinar tu mudanza y confirmar disponibilidad.</p>
          <dl className="space-y-3 text-sm">
            <div className="footer-contact-item"><Clock className="footer-icon-amber" aria-hidden="true" /><div><dt className="font-semibold text-slate-700">Lunes a viernes</dt><dd className="footer-text-xs-light">08:00 - 20:00</dd></div></div>
            <div className="footer-contact-item"><Clock className="footer-icon-slate" aria-hidden="true" /><div><dt className="font-semibold text-slate-600">Sábados</dt><dd className="footer-text-xs-light">09:00 - 14:00</dd></div></div>
            <div className="footer-contact-item"><Clock className="footer-icon-slate" aria-hidden="true" /><div><dt className="font-semibold text-slate-500">Domingos</dt><dd className="footer-text-xs-light">Consultar disponibilidad</dd></div></div>
          </dl>
        </section>

        <section aria-labelledby="footer-services" className="space-y-4">
          <h2 id="footer-services" className="footer-section-title font-sans">Nuestros servicios</h2>
          <nav aria-label="Servicios destacados">
            <ul className="space-y-2 footer-nav-link-text">
              <li><a href="/servicios/mudanzas-urgentes.html" onClick={(event) => { event.preventDefault(); handleLinkClick("mudanzas-urgentes"); }} className="footer-nav-link footer-link-hover">Mudanzas urgentes</a></li>
              <li><a href="/servicios/mudanzas-24-horas.html" onClick={(event) => { event.preventDefault(); handleLinkClick("mudanzas-24-horas"); }} className="footer-nav-link footer-link-hover">Mudanzas 24 horas</a></li>
              <li><a href="/servicios/mudanzas-residenciales.html" onClick={(event) => { event.preventDefault(); handleLinkClick("mudanzas-residenciales"); }} className="footer-nav-link footer-link-hover">Mudanzas residenciales</a></li>
              <li><a href="/blog" onClick={(event) => { event.preventDefault(); handleLinkClick("blog"); }} className="footer-nav-link footer-link-hover">Blog de mudanzas</a></li>
            </ul>
          </nav>
        </section>

        <section aria-labelledby="footer-destinations" className="space-y-4">
          <h2 id="footer-destinations" className="footer-section-title font-sans">Destinos frecuentes</h2>
          <p className="footer-text-xs-light">Accedé a la información de mudanzas para cada departamento.</p>
          <nav aria-label="Destinos frecuentes">
            <ul className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs">
              {sortedDestinations.map((destination) => (
                <li key={destination.slug}>
                  <a href={destinationHref(destination.slug)} onClick={(event) => { event.preventDefault(); handleLinkClick(destination.slug); }} className="footer-destination-link footer-link-hover footer-destination-link-text">
                    Mudanzas {destination.name.replace(" de Mendoza", "").replace("Mendoza", "")}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </section>
      </div>

      <div className="footer-bottom-container">
        <div className="footer-bottom-inner">
          <div className="footer-copyright-text">
            <p>© 2026 Mudanzas Miranda. Armada Argentina 584, Mendoza, AR.</p>
            <p className="footer-dev-note">Servicio de mudanzas y fletes con cobertura en Mendoza.</p>
          </div>
          <nav aria-label="Redes sociales" className="footer-social-links-container">
            <a href="https://www.instagram.com/mudanzasmiranda/" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram de Mudanzas Miranda"><Instagram className="footer-social-icon" aria-hidden="true" /></a>
            <a href="https://www.facebook.com/mudanzasmiranda4" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Facebook de Mudanzas Miranda"><Facebook className="footer-social-icon" aria-hidden="true" /></a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
