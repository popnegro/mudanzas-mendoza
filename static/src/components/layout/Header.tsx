import CanonicalHeader from "../../theme/components/Header";
import { themeConfig } from "../../theme/theme.config";

interface HeaderProps {
  activePage: string;
  onNavigate: (slug: string) => void;
}

export default function Header({ activePage, onNavigate }: HeaderProps) {
  const isHome = activePage === "";
  const isDestinos = activePage === "destinos";
  const isBlog = activePage.startsWith("blog");

  const navigate = (href: string) => {
    if (href === "/") {
      onNavigate("");
      return;
    }
    if (href === "/servicios") {
      onNavigate("servicios");
      return;
    }
    if (href === "/destinos") {
      onNavigate("destinos");
      return;
    }
    if (href === "/blog") {
      onNavigate("blog");
      return;
    }
    if (href.startsWith("/#")) {
      const sectionId = href.slice(2);
      onNavigate("");
      window.setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 350);
    }
  };

  const sectionHref = (sectionId: string) => isHome ? `#${sectionId}` : `/#${sectionId}`;

  return (
    <>
      <CanonicalHeader
        logoSrc="/img/mudanzas-mendoza-brandmark.webp"
        logoAlt={`Inicio — ${themeConfig.brand.name}`}
        homeHref="/"
        navItems={[
          { label: "Nosotros", href: sectionHref("nosotros") },
          { label: "Servicios", href: "/servicios", active: activePage === "servicios" },
          { label: "Destinos", href: "/destinos", active: isDestinos },
          { label: "Preguntas", href: sectionHref("faq") },
          { label: "Blog", href: "/blog", active: isBlog },
        ]}
        ctaLabel="Pedir presupuesto"
        ctaHref={themeConfig.contact.whatsappUrl}
        mobileCtaLabel="Chatear por WhatsApp"
        onNavigate={navigate}
      />
      <div aria-hidden="true" className="h-[70px] sm:h-[78px]" />
    </>
  );
}
