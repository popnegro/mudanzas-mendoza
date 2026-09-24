import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { faqs } from "../data/staticData";

interface FAQSectionProps {
  /** Optional canonical URL for FAQ JSON-LD @id */
  canonicalUrl?: string;
  title?: string;
  description?: string;
}

export default function FAQSection({
  canonicalUrl = "https://mudanzasmendoza.com.ar/#faq",
  title = "Preguntas Frecuentes",
  description = "Resolvemos tus dudas más comunes para que planifiques tu mudanza con total tranquilidad.",
}: FAQSectionProps) {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  return (
    <section id="faq" className="py-20 bg-white border-b border-slate-200">
      <script
        id="faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "@id": `${canonicalUrl}#faq`,
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="section-title">{title}</h2>
          <p className="section-description">{description}</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="faq-item-container">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                className="faq-question-button"
                aria-expanded={openFaq === faq.id}
              >
                <span className="text-base sm:text-lg">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform duration-200 flex-shrink-0 ml-4 ${
                    openFaq === faq.id ? "rotate-180 text-brand-green-500" : ""
                  }`}
                />
              </button>
              {openFaq === faq.id && (
                <div className="faq-answer-content">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
