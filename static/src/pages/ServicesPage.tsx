import {
  ArrowRight,
  Home,
  Truck,
  Package,
  Briefcase,
  Warehouse,
  Shield,
  ArrowUpCircle,
  Clock,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";
import { services } from "../data/staticData";
import FormSection from "../components/FormSection";
import FAQSection from "../components/FAQSection";

interface ServicesPageProps {
  handleNavigation: (slug: string) => void;
}

const IconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home,
  Truck,
  Package,
  Briefcase,
  Warehouse,
  Shield,
  ArrowUpCircle,
  Clock,
  Calendar,
};

export default function ServicesPage({ handleNavigation }: ServicesPageProps) {
  return (
    <motion.div
      key="servicios-index"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white"
    >
      <div className="bg-slate-50 border-b border-slate-200 text-slate-600 py-3 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleNavigation("")}
            className="hover:text-slate-900 transition-colors font-semibold cursor-pointer"
          >
            Inicio
          </button>
          <span>/</span>
          <span className="text-brand-green-600 font-semibold">Servicios</span>
        </div>
      </div>

      <section className="relative bg-white text-slate-800 overflow-hidden py-16 lg:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-green-500/10 border border-brand-green-500/20 text-brand-green-600 text-xs font-bold uppercase tracking-wider">
            <Truck className="w-4 h-4" aria-hidden="true" />
            Soluciones de mudanza y logística
          </div>
          <h1 className="page-hero-title max-w-4xl mx-auto">
            Servicios de mudanzas y fletes en <span className="text-brand-green-600">Mendoza</span>
          </h1>
          <p className="hero-description max-w-3xl mx-auto font-medium">
            Residenciales, oficinas, embalaje, guardamuebles e izamientos. Elegí la modalidad y conocé cómo se ejecuta cada servicio.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((svc) => {
              const Icon = IconMap[svc.icon] || Truck;
              return (
                <button
                  key={svc.id}
                  type="button"
                  onClick={() => handleNavigation(svc.id)}
                  className="text-left bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-brand-green-500/40 transition-all flex flex-col gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-green-500/10 border border-brand-green-500/20 flex items-center justify-center text-brand-green-500">
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <h2 className="text-lg font-bold text-slate-800 group-hover:text-brand-green-600 transition-colors">
                      {svc.title}
                    </h2>
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{svc.description}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-green-600">
                    Ver detalle
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <FAQSection
        canonicalUrl="https://mudanzasmendoza.com.ar/servicios"
        title="Preguntas frecuentes sobre servicios"
        description="Dudas habituales antes de contratar o planificar una mudanza en Mendoza."
      />

      <FormSection
        title="Cotizá el servicio que necesitás"
        description="Indicá el tipo de mudanza o traslado y te orientamos con una propuesta clara."
      />
    </motion.div>
  );
}
