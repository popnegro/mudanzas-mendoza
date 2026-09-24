import QuoteForm from "./QuoteForm";

interface FormSectionProps {
  title?: string;
  description?: string;
  initialService?: string;
  destinationName?: string;
  className?: string;
}

/** Shared quote/CTA block used on home, destinos, servicios and detail pages. */
export default function FormSection({
  title = "Cotizá tu mudanza en Mendoza",
  description = "Completá el cotizador interactivo. Te respondemos con una propuesta clara y sin compromiso.",
  initialService = "",
  destinationName = "",
  className = "py-16 bg-slate-50 border-t border-slate-200",
}: FormSectionProps) {
  return (
    <section id="form" className={className}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="section-title">{title}</h2>
          <p className="section-description">{description}</p>
        </div>
        <QuoteForm initialService={initialService} destinationName={destinationName} />
      </div>
    </section>
  );
}
