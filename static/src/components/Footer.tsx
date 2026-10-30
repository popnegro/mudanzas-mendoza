import CanonicalFooter, { type FooterColumn } from "../theme/components/Footer";
import { destinations } from "../data/destinations";
import { themeConfig } from "../theme/theme.config";

interface FooterProps {
  destinations?: typeof import("../data/destinations").destinations;
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

const SERVICE_LINKS = [
  { label: "Todos los servicios", href: "/servicios" },
  { label: "Mudanzas urgentes", href: "/servicios/mudanzas-urgentes.html" },
  { label: "Mudanzas 24 horas", href: "/servicios/mudanzas-24-horas.html" },
  { label: "Mudanzas residenciales", href: "/servicios/mudanzas-residenciales.html" },
  { label: "Blog de mudanzas y consejos", href: "/blog" },
];

export default function Footer({ destinations: suppliedDestinations = destinations, onNavigate }: FooterProps) {
  const relationship = themeConfig.brandRelationship;
  const coverageLinks = SITEMAP_DESTINATION_SLUGS
    .map((slug) => suppliedDestinations.find((destination) => destination.slug === slug))
    .filter((destination): destination is (typeof suppliedDestinations)[number] => Boolean(destination))
    .map((destination) => ({
      label: `Mudanzas ${destination.name.replace(" de Mendoza", "").replace("Mendoza", "")}`,
      href: `/mudanzas-mendoza/${destination.slug}.html`,
    }));

  const columns: FooterColumn[] = [
    {
      title: "Ecosistema",
      links: [
        ...(themeConfig.ecosystem.planningUrl ? [{ label: "Planificá con MudanzaPro", href: themeConfig.ecosystem.planningUrl }] : []),
        ...(themeConfig.ecosystem.providerUrl ? [{ label: "Conocé Mudanzas Miranda", href: themeConfig.ecosystem.providerUrl }] : []),
      ],
    },
    { title: "Nuestros servicios", links: SERVICE_LINKS },
    { title: "Lugares principales", links: coverageLinks },
  ];

  const navigate = (href: string) => {
    if (href === "/servicios") return onNavigate("servicios");
    if (href === "/destinos") return onNavigate("destinos");
    if (href === "/blog") return onNavigate("blog");
    const service = href.match(/^\/servicios\/([^/]+)\.html$/);
    if (service) return onNavigate(service[1]);
    const destination = href.match(/^\/mudanzas-mendoza\/([^/]+)\.html$/);
    if (destination) return onNavigate(destination[1]);
  };

  return (
    <CanonicalFooter
      brandName={themeConfig.brand.name}
      description={
        <div className="space-y-3">
          <p>{themeConfig.brand.tagline}</p>
          {relationship && (
            <div className="rounded-xl border border-line bg-background-soft p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">{relationship.label}</p>
              <a href={relationship.parentUrl} rel="noopener noreferrer" className="font-bold text-ink transition-colors hover:text-brand">
                {relationship.parentName}
              </a>
              {relationship.googleRating && <p className="mt-1 text-xs font-semibold text-ink-secondary">{relationship.googleRating.label}</p>}
            </div>
          )}
          <p className="text-sm">
            <a href={themeConfig.contact.phoneHref} className="font-semibold text-ink hover:text-brand">{themeConfig.contact.phone}</a>
            <span className="block">{themeConfig.contact.address}, Mendoza</span>
          </p>
        </div>
      }
      columns={columns}
      legal={<>© {new Date().getFullYear()} Mudanzas en Mendoza · Powered by <a href="https://wa.me/5492616706710" className="font-semibold hover:text-ink">SmartWeb</a></>}
      socialLinks={[
        { label: "Instagram", href: "https://www.instagram.com/mudanzasmiranda/" },
        { label: "Facebook", href: "https://www.facebook.com/mudanzasmiranda4" },
      ]}
      onNavigate={navigate}
    />
  );
}
