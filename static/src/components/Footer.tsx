import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";
import { Destination } from "../types";

interface FooterProps {
  destinations: Destination[];
  onNavigate: (slug: string) => void;
}

const SITEMAP_DESTINATION_SLUGS = [
  "mudanzas-ciudad-mendoza",
  "mudanzas-godoy-cruz",
  "mudanzas-guaymallen",
  "mudanzas-las-heras",
  "mudanzas-maipu",
  "mudanzas-lujan-de-cuyo",
  "mudanzas-valle-de-uco",
  "mudanzas-zona-este",
];

export default function Footer({ destinations, onNavigate }: FooterProps) {
  const sitemapDestinations = SITEMAP_DESTINATION_SLUGS
    .map((slug) => destinations.find((d) => d.slug === slug))
    .filter((d): d is Destination => Boolean(d));

  const handleLinkClick = (slug: string) => {
    onNavigate(slug);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const serviceLinks = [
    { slug: "mudanzas-urgentes", label: "Mudanzas Urgentes" },
    { slug: "mudanzas-24-horas", label: "Mudanzas 24 Horas" },
    { slug: "mudanzas-residenciales", label: "Mudanzas Residenciales" },
    { slug: "blog", label: "Blog de Mudanzas & Consejos" },
  ];

  return (
    <footer
      className="bg-[var(--miranda-surface)] text-[var(--miranda-text-tertiary)] border-t border-[var(--miranda-border)]"
      aria-label="Información de Mudanzas en Mendoza"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 items-start">
        <section aria-labelledby="footer-brand-title" className="space-y-6">
          <h2 id="footer-brand-title" className="text-sm font-bold text-[var(--miranda-text)] uppercase tracking-wider">
            Mudanzas en Mendoza
          </h2>
          <p className="text-sm text-[var(--miranda-text-secondary)] leading-relaxed">
            Más de 20 años de experiencia brindando tranquilidad y confianza en mudanzas residenciales, comerciales y fletes en toda Mendoza y el país.
          </p>
          <a
            href="/nosotros.html"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("nosotros");
            }}
            className="text-amber-500 hover:text-amber-400 text-sm font-semibold inline-flex items-center gap-1 cursor-pointer transition-colors pt-1"
          >
            Conocé más sobre nosotros <span aria-hidden="true">→</span>
          </a>
        </section>

        <section aria-labelledby="footer-contact-title" className="space-y-4">
          <h2 id="footer-contact-title" className="text-sm font-bold text-[var(--miranda-text)] uppercase tracking-wider">
            Contacto
          </h2>
          <address className="not-italic space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-1" aria-hidden="true" />
              <a
                href="https://maps.google.com/?q=Armada+Argentina+584,+Mendoza,+Argentina"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--miranda-text-tertiary)] hover:text-amber-500 transition-colors leading-relaxed"
              >
                Armada Argentina 584, Mendoza, Argentina
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" aria-hidden="true" />
              <a href="tel:+5492615130910" className="text-[var(--miranda-text-tertiary)] hover:text-amber-500 transition-colors font-medium">
                +54 9 261 513-0910
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" aria-hidden="true" />
              <a href="mailto:info@mudanzasmendoza.com.ar" className="text-[var(--miranda-text-tertiary)] hover:text-amber-500 transition-colors">
                info@mudanzasmendoza.com.ar
              </a>
            </div>
          </address>
        </section>

        <nav aria-labelledby="footer-services-title" className="space-y-4">
          <h2 id="footer-services-title" className="text-sm font-bold text-[var(--miranda-text)] uppercase tracking-wider">
            Nuestros Servicios
          </h2>
          <ul className="space-y-3">
            {serviceLinks.map((service) => (
              <li key={service.slug}>
                <button
                  type="button"
                  onClick={() => handleLinkClick(service.slug)}
                  className="group flex items-center gap-2 text-left text-[var(--miranda-text-tertiary)] hover:text-amber-500 transition-all duration-200 hover:translate-x-1 cursor-pointer text-sm font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 group-hover:w-2.5 transition-all duration-200" aria-hidden="true" />
                  {service.label}
                </button>
              </li>
            ))}
            <li>
              <a
                href="/mudanzas-en-mendoza.html"
                className="group flex items-center gap-2 text-left text-[var(--miranda-text-tertiary)] hover:text-amber-500 transition-all duration-200 hover:translate-x-1 text-sm font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 group-hover:w-2.5 transition-all duration-200" aria-hidden="true" />
                Guía: Mudanzas en Mendoza
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-labelledby="footer-coverage-title" className="space-y-4">
          <h2 id="footer-coverage-title" className="text-sm font-bold text-[var(--miranda-text)] uppercase tracking-wider">
            Lugares principales
          </h2>
          <ul className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm">
            {sitemapDestinations.map((d) => (
              <li key={d.slug}>
                <button
                  type="button"
                  onClick={() => handleLinkClick(d.slug)}
                  className="group flex items-center gap-2 text-left text-[var(--miranda-text-tertiary)] hover:text-amber-500 transition-all duration-200 hover:translate-x-0.5 cursor-pointer font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 group-hover:w-2.5 transition-all duration-200" aria-hidden="true" />
                  <span>Mudanzas {d.name.replace(" de Mendoza", "").replace("Mendoza", "")}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="bg-[var(--miranda-background)]/80 border-t border-[var(--miranda-border)] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--miranda-text-subtle)]">
          <p className="text-center sm:text-left">
            © 2026 Mudanzas en Mendoza · Powered by <a href="https://wa.me/5492616706710">SmartWeb</a>
          </p>
          <nav aria-label="Redes sociales" className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/mudanzasmiranda/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:text-[var(--miranda-text)] hover:bg-[var(--miranda-background-soft)] transition-all"
              aria-label="Instagram de Mudanzas en Mendoza"
            >
              <Instagram className="w-5 h-5 text-amber-500" aria-hidden="true" />
            </a>
            <a
              href="https://www.facebook.com/mudanzasmiranda4"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:text-[var(--miranda-text)] hover:bg-[var(--miranda-background-soft)] transition-all"
              aria-label="Facebook de Mudanzas en Mendoza"
            >
              <Facebook className="w-5 h-5 text-amber-500" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
