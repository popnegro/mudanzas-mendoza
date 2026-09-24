import { MapPin, ArrowRight, Building, Mountain, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { destinations } from "../data/destinations";
import FormSection from "../components/FormSection";

interface DestinationsPageProps {
  handleNavigation: (slug: string) => void;
}

const REGION_META: Record<string, { icon: typeof MapPin; description: string }> = {
  "Gran Mendoza": {
    icon: Building,
    description:
      "Cobertura en los departamentos del oasis metropolitano, con tiempos de respuesta ágiles.",
  },
  "Zona Este y Valle de Uco": {
    icon: Mountain,
    description:
      "Traslados coordinados hacia el Este y el Valle de Uco, con logística pensada para rutas de altura y distancia.",
  },
  "Sur de Mendoza": {
    icon: Truck,
    description:
      "Conectamos San Rafael, General Alvear y Malargüe con el resto de la provincia y el país.",
  },
};

export default function DestinationsPage({ handleNavigation }: DestinationsPageProps) {
  const regions = Array.from(new Set(destinations.map((d) => d.region)));
  const departments = destinations.filter((d) => !d.isDistrict);

  return (
    <motion.div
      key="destinos-index"
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
          <span className="text-brand-green-600 font-semibold">Destinos y Cobertura</span>
        </div>
      </div>

      <section className="relative bg-white text-slate-800 overflow-hidden py-16 lg:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-green-500/10 border border-brand-green-500/20 text-brand-green-600 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-4 h-4" aria-hidden="true" />
            Cobertura en Toda la Provincia
          </div>
          <h1 className="page-hero-title max-w-4xl mx-auto">
            Mudanzas y fletes en <span className="text-brand-green-600">Mendoza</span>: departamentos y distritos
          </h1>
          <p className="hero-description max-w-3xl mx-auto font-medium">
            Buscá tu localidad o departamento para conocer cobertura, logística local y cómo planificar tu mudanza con información clara.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {regions.map((region) => {
            const meta = REGION_META[region] ?? {
              icon: MapPin,
              description: "Cobertura local con apoyo operativo en toda la zona.",
            };
            const Icon = meta.icon;
            const regionDeps = departments.filter((d) => d.region === region);

            return (
              <div key={region} className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-green-500/10 border border-brand-green-500/20 flex items-center justify-center text-brand-green-500 shrink-0">
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">{region}</h2>
                    <p className="section-description mt-1 max-w-2xl">{meta.description}</p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {regionDeps.map((dest) => (
                    <button
                      key={dest.slug}
                      type="button"
                      onClick={() => handleNavigation(dest.slug)}
                      className="destination-card-wrapper text-left group"
                    >
                      <div>
                        <h3 className="font-bold text-slate-800 group-hover:text-brand-green-600 transition-colors">
                          {dest.name}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{dest.heroSubheadline}</p>
                      </div>
                      <span className="destination-card-cta-button mt-4">
                        Ver cobertura
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <FormSection
        title="¿Listo para planificar tu mudanza en Mendoza?"
        description="Completá el cotizador interactivo. Brindamos soporte en los destinos listados arriba."
        className="py-16 bg-white border-t border-slate-200"
      />
    </motion.div>
  );
}
