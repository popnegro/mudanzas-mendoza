import SEO from '../components/SEO';
import Header from '../components/layout/Header';
import Footer from '../components/Footer';
import { services } from '../data/staticData';
import { destinations } from '../data/destinations';
import { MendozaHome } from './MendozaHome';
import { themeConfig } from './theme.config';

export default function MendozaHomeShell() {
  const onNavigate = (slug: string) => {
    let next = '/';
    if (slug === 'blog') next = '/blog';
    else if (slug === 'destinos') next = '/destinos';
    else if (slug.startsWith('blog/')) next = `/${slug}`;
    else next = `/servicios/${slug}.html`;
    window.history.pushState({}, '', next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans">
      <SEO
        title="Mudanzas en Mendoza | Servicios, destinos y guías"
        description="Información sobre servicios de mudanza en Mendoza, destinos, tipos de servicio y guías para planificar tu traslado."
        canonicalUrl="https://mudanzasmendoza.com.ar/"
      />
      <Header activePage="" onNavigate={onNavigate} />
      <main className="flex-grow">
        <MendozaHome
          services={services}
          heroImage="https://mudanzasmendoza.com.ar/img/camiones-mudanzas-miranda.jpg"
          heroImageAlt="Camiones preparados para servicios de mudanza en Mendoza"
        />
      </main>
      <Footer destinations={destinations} onNavigate={onNavigate} />
    </div>
  );
}
