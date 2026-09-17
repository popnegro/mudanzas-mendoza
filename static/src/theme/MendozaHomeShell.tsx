import * as React from 'react';
import SEO from '../components/SEO';
import Header from '../components/layout/Header';
import Footer from '../components/Footer';
import { services } from '../data/staticData';
import { destinations } from '../data/destinations';
import { MendozaHome } from './MendozaHome';

export default function MendozaHomeShell() {
  const [path, setPath] = React.useState(() => window.location.pathname);

  React.useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    const originalPushState = window.history.pushState.bind(window.history);
    const originalReplaceState = window.history.replaceState.bind(window.history);
    window.history.pushState = (...args) => {
      originalPushState(...args);
      window.dispatchEvent(new PopStateEvent('popstate'));
    };
    window.history.replaceState = (...args) => {
      originalReplaceState(...args);
      window.dispatchEvent(new PopStateEvent('popstate'));
    };
    window.addEventListener('popstate', onPopState);
    return () => {
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  if (path !== '/') return null;

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
      <Header destinations={destinations} activePage="" onNavigate={onNavigate} />
      <main className="flex-grow">
        <MendozaHome
          services={services}
          heroImage="https://mudanzasmendoza.com.ar/img/camiones-mudanzas-miranda.jpg"
          heroImageAlt="Camiones preparados para servicios de mudanza en Mendoza"
        />
      </main>
      <Footer />
    </div>
  );
}
