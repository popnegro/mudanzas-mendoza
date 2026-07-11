import { useEffect } from 'react';
import { ServiceInfo } from '../types';

/**
 * Custom hook to dynamically generate and inject a Schema.org 'Service' schema
 * into the document head for SEO optimization.
 * 
 * Includes fields required for rich snippets:
 * - name: Service name
 * - provider: Organization with name, URL, logo, contact, and priceRange
 * - areaServed: Place with GeoShape representing the Mendoza service region
 * - priceRange: Price estimated based on Mendoza base rates
 */
export function useServiceSchema(service: ServiceInfo, basePrice: number) {
  useEffect(() => {
    const minPrice = basePrice;
    const maxPrice = basePrice * 3.5; // Estimated upper range based on difficulty/distance

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Service",
      "id": `https://mudanzasmendoza.com.ar/servicios/${service.slug}`,
      "name": service.name,
      "serviceType": "Moving & Freight Transport",
      "description": service.description,
      "provider": {
        "@type": "Organization",
        "name": "Mudanzas Mendoza 2026",
        "url": "https://mudanzasmendoza.com.ar",
        "logo": "https://ais-dev-etzjgp4qe2v62cnwnmfoco-175390492626.us-east1.run.app/assets/logo.png",
        "telephone": "+542612345678",
        "priceRange": `$${minPrice.toLocaleString('es-AR')} - $${maxPrice.toLocaleString('es-AR')} ARS`
      },
      "areaServed": {
        "@type": "Place",
        "name": "Gran Mendoza",
        "geo": {
          "@type": "GeoShape",
          "box": "-33.15,-69.05 -32.70,-68.65",
          "description": "Área metropolitana de Mendoza, cubriendo Ciudad de Mendoza, Godoy Cruz, Guaymallén, Las Heras, Luján de Cuyo, Maipú y alrededores."
        }
      },
      "offers": {
        "@type": "Offer",
        "price": basePrice,
        "priceCurrency": "ARS",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": basePrice,
          "priceCurrency": "ARS",
          "referenceQuantity": {
            "@type": "QuantitativeValue",
            "value": 1,
            "unitCode": "Service"
          }
        },
        "description": `Tarifa base estimada mínima para el servicio de flete o mudanza de ${service.name} dentro del Gran Mendoza.`
      }
    };

    const scriptId = `dynamic-service-schema-${service.id}`;
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(jsonLd, null, 2);

    return () => {
      const existing = document.getElementById(scriptId);
      if (existing) {
        existing.remove();
      }
    };
  }, [service, basePrice]);
}
