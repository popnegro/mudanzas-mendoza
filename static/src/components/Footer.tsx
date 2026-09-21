import { Instagram, Facebook } from "lucide-react";
import { Destination } from "../types";
import { themeConfig } from "../theme/theme.config";

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

  const relationship = themeConfig.brandRelationship;

  return (
    <footer
      id="site-footer"
      className="bg-[var(--miranda-surface)] text-[var(--miranda-text-tertiary)] border-t border-[var(--miranda-border)]"
      aria-label="Información de Mudanzas en Mendoza"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 items-start">
        <section aria-labelledby="footer-brand-title" className="space-y-5">
          <h2 id="footer-brand-title" className="text-sm font-bold text-[var(--miranda-text)] uppercase tracking-wider">
            Mudanzas en Mendoza
          </h2>
          {relationship && (
            <div className="rounded-2xl border border-[var(--miranda-border)] bg-[var(--miranda-background)] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--miranda-text-subtle)]">
                {relationship.label}
              </p>
              <a
                href={relationship.parentUrl}
                className="mt-1 inline-flex text-base font-extrabold text-[var(--miranda-text)] hover:text-amber-500 transition-colors"
                rel="noopener"
              >
                {relationship.parentName}
              </a>
              {relationship.googleRating && (
                <p className="mt-2 text-sm font-semibold text-[var(--miranda-text-secondary)]">
                  {relationship.googleRating.label}
                </p>
              )}
              <a
                href={relationship.parentUrl}
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-amber-500 hover:text-amber-400"
                rel="noopener"
              >
                Conocé Mudanzas Miranda <span aria-hidden="true">→</span>
              </a>
            </div>
          )}
        </section>

        <section aria-labelledby="footer-ecosystem-title" className="space-y-4">
          <h2 id="footer-ecosystem-title" className="text-sm font-bold text-[var(--miranda-text)] uppercase tracking-wider">
            Ecosistema
          </h2>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={themeConfig.ecosystem.planningUrl} className="text-[var(--miranda-text-tertiary)] hover:text-amber-500 transition-colors font-medium">
                Planificá con MudanzaPro
              </a>
            </li>
            <li>
              <a href={themeConfig.ecosystem.providerUrl} className="text-[var(--miranda-text-tertiary)] hover:text-amber-500 transition-colors font-medium">
                Conocé Mudanzas Miranda
              </a>
            </li>
          </ul>
        </section>

        <nav aria-labelledby="footer-services-title" className="space-y-4">
          <h2 id="footer-services-title" className="text-sm font-bold text-[var(--miranda-text)] uppercase tracking-wider">
            Nuestros Servicios
          </h2>
          <ul className="space-y-3">
            {serviceLinks().map((service) => (
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
            <a href="https://www.instagram.com/mudanzasmiranda/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:text-[var(--miranda-text)] hover:bg-[var(--miranda-background-soft)] transition-all" aria-label="Instagram de Mudanzas en Mendoza">
              <Instagram className="w-5 h-5 text-amber-500" aria-hidden="true" />
            </a>
            <a href="https://www.facebook.com/mudanzasmiranda4" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:text-[var(--miranda-text)] hover:bg-[var(--miranda-background-soft)] transition-all" aria-label="Facebook de Mudanzas en Mendoza">
              <Facebook className="w-5 h-5 text-amber-500" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function serviceLinks() {
  return [
    { slug: "mudanzas-urgentes", label: "Mudanzas Urgentes" },
    { slug: "mudanzas-24-horas", label: "Mudanzas 24 Horas" },
    { slug: "mudanzas-residenciales", label: "Mudanzas Residenciales" },
    { slug: "blog", label: "Blog de Mudanzas & Consejos" },
  ];
}
