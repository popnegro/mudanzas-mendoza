import React, { useState, useEffect } from 'react';
import { BlogArticle } from '../types';
import { BLOG_ARTICLES } from '../data';
import { Calendar, User, Clock, ArrowLeft, ArrowRight, BookOpen, Share2, CheckSquare } from 'lucide-react';
import { useBlogArticleSchema } from '../hooks/useBlogArticleSchema';

// Import official Mudanzas Miranda images for co-branding across blog pages
import mudanzaMirandaTruck from '../assets/images/mudanza_miranda_truck_1783676498398.jpg';
import mudanzasEquipoEmbalaje from '../assets/images/mudanzas_equipo_embalaje_1783676512881.jpg';

interface BlogSectionProps {
  onBackToHome: () => void;
  onArticleSelect?: (article: BlogArticle | null) => void;
}

export default function BlogSection({ onBackToHome, onArticleSelect }: BlogSectionProps) {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  // Propagate article selection to parent state for dynamic meta tags update
  useEffect(() => {
    if (onArticleSelect) {
      onArticleSelect(selectedArticle);
    }
  }, [selectedArticle, onArticleSelect]);

  // Inyectar dinámicamente JSON-LD de artículo y breadcrumbs para SEO
  useBlogArticleSchema(selectedArticle);

  const handleShare = (article: BlogArticle) => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.href
      }).catch(err => console.log('Share error:', err));
    } else {
      // Fallback: Copy URL
      navigator.clipboard.writeText(window.location.href);
      alert('¡Enlace copiado al portapapeles para compartir!');
    }
  };

  if (selectedArticle) {
    return (
      <article className="py-12 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto space-y-8 animate-fade-in">
        {/* Back navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            onClick={() => setSelectedArticle(null)}
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-semibold text-sm transition-all cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver al Blog
          </button>
        </div>

        {/* Cover Image */}
        {selectedArticle.image && (
          <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 relative">
            <img 
              src={selectedArticle.image} 
              alt={selectedArticle.title}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Metadata Header */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span className="bg-amber-100 dark:bg-amber-500/10 text-amber-800 dark:text-amber-400 px-3 py-1 rounded-full uppercase tracking-wider">
              {selectedArticle.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {selectedArticle.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {selectedArticle.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
            {selectedArticle.title}
          </h1>

          <div className="flex items-center justify-between border-y border-slate-100 dark:border-slate-800 py-3 mt-4">
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <User className="w-4 h-4 text-slate-400" />
              <span>Por <strong>{selectedArticle.author}</strong></span>
            </div>
            <button
              onClick={() => handleShare(selectedArticle)}
              className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white text-xs font-bold transition-all cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" /> Compartir
            </button>
          </div>
        </header>

        {/* Full Rich Article Content */}
        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed space-y-6 text-sm sm:text-base">
          {selectedArticle.content.split('\n').map((line, idx) => {
            const trimmed = line.trim();
            if (!trimmed) return <div key={idx} className="h-2" />;

            // Render Headings
            if (trimmed.startsWith('###')) {
              return <h3 key={idx} className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white pt-3">{trimmed.replace('###', '')}</h3>;
            }
            if (trimmed.startsWith('##')) {
              return <h2 key={idx} className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white pt-4 border-b border-slate-100 dark:border-slate-850 pb-2">{trimmed.replace('##', '')}</h2>;
            }

            // Render list items
            if (trimmed.startsWith('*')) {
              return (
                <li key={idx} className="pl-4 list-disc marker:text-amber-500 py-1 text-slate-600 dark:text-slate-350">
                  {trimmed.replace('*', '').trim()}
                </li>
              );
            }

            // Normal paragraphs
            return <p key={idx} className="text-slate-600 dark:text-slate-350 leading-relaxed">{trimmed}</p>;
          })}
        </div>

        {/* Footer info box with co-branding image */}
        <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 mt-12 flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 border border-slate-200 dark:border-slate-800">
            <img
              src={mudanzasEquipoEmbalaje}
              alt="Equipo de empaque premium de Mudanzas Miranda"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 space-y-1 text-left">
            <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">¿Te sirvieron estos consejos mendocinos?</h4>
            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
              Mudar tu hogar no tiene que ser una tortura. Poné tus muebles bajo el cuidado experto del personal oficial de <strong>Mudanzas Miranda</strong> y disfrutá de un servicio premium.
            </p>
          </div>
          <button
            onClick={onBackToHome}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-3 rounded-xl text-xs transition-all cursor-pointer shadow whitespace-nowrap"
          >
            Reservar Mudanza Ahora
          </button>
        </div>

      </article>
    );
  }

  return (
    <section className="py-16 bg-white dark:bg-slate-950" id="blog-seccion">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest flex items-center justify-center gap-1.5">
            <BookOpen className="w-4 h-4" /> Academia de Mudanzas
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Consejos de Oro para Mudar sin Estrés
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">
            Escribimos artículos honestos y prácticos de fletistas reales para que organices tus cajas y protejas tus muebles como un profesional.
          </p>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_ARTICLES.map((art) => (
            <article 
              key={art.id} 
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-150 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all group"
            >
              <div>
                {/* Visual Cover Image */}
                {art.image && (
                  <div className="h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-950 relative">
                    <img 
                      src={art.image} 
                      alt={art.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent pointer-events-none" />
                  </div>
                )}
                {!art.image && (
                  <div className="h-2.5 bg-slate-900 dark:bg-slate-800 group-hover:bg-amber-500 transition-colors" />
                )}
                
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <span className="text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-2.5 py-1 rounded-md">{art.category}</span>
                    <span>{art.readTime}</span>
                  </div>

                  <h3 className="font-extrabold text-slate-950 dark:text-white text-base sm:text-lg leading-snug group-hover:text-amber-600 transition-colors">
                    {art.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {art.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-50 dark:border-slate-800/40 flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-400">{art.date}</span>
                <button
                  onClick={() => setSelectedArticle(art)}
                  className="inline-flex items-center gap-1.5 text-slate-900 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Leer Artículo <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Mudanzas Miranda co-branding banner at the bottom of the blog */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row items-center gap-6 text-white relative overflow-hidden mt-12">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent pointer-events-none" />
          <div className="w-full md:w-1/3 h-40 rounded-2xl overflow-hidden border border-slate-800 shrink-0">
            <img
              src={mudanzaMirandaTruck}
              alt="Camión de Mudanzas Miranda listo para transportar en las rutas de Mendoza"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-2 text-left flex-1 relative z-10">
            <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">Un producto oficial de Mudanzas Miranda</span>
            <h3 className="text-lg sm:text-xl font-bold">50 años de experiencia respaldan cada traslado</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Mendoza 2026 es el canal digital premium de <strong>Mudanzas Miranda</strong>. Combinamos la innovación de nuestra plataforma de estimación y planificación por IA con la inmensa capacidad de camiones pesados, grúas y la confianza de los fletistas más tradicionales de Cuyo.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
