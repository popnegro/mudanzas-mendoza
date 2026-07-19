import { useEffect } from "react";

import { faqs } from "../data/staticData";
import { Destination, Service } from "../types";

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl: string;
  isLocalPage?: boolean;
  destinationData?: Destination;
  serviceData?: Service;
}

const serviceSpecificFAQs = new Map<string, { q: string; a: string }[]>([
  [
    "mudanzas-urgentes",
    [
      {
        q: "¿Ofrecen mudanzas de urgencia hoy mismo en Mendoza?",
        a: "Sí, disponemos de vehículos de guardia y peones de carga de respuesta veloz listos para programar traslados urgentes y fletes en el acto en toda la provincia.",
      },
      {
        q: "¿Cuánto tardan en llegar para un flete exprés?",
        a: "Por lo general, nuestras unidades de guardia pueden presentarse en tu domicilio en menos de 2 horas en zonas del Gran Mendoza, sujeto a disponibilidad inmediata.",
      },
    ],
  ],
  [
    "fletes-economicos",
    [
      {
        q: "¿Cuentan con fletes baratos para departamentos pequeños?",
        a: "Totalmente. Ofrecemos fletes económicos ideales para monoambientes, habitaciones y cargas reducidas, brindando una tarifa accesible, fija y sin cargos ocultos.",
      },
      {
        q: "¿Se puede contratar el camión solo con chofer para ahorrar?",
        a: "Sí, podés abaratar costos contratando únicamente el vehículo con chofer (flete simple) si contás con amigos o familiares que te ayuden con la carga y descarga.",
      },
    ],
  ],
  [
    "mudanzas-24-horas",
    [
      {
        q: "¿Es posible programar una mudanza de noche o durante un feriado?",
        a: "Efectivamente. Ofrecemos servicios de mudanza las 24 horas, incluyendo horarios nocturnos, fines de semana y feriados, ideal para no interrumpir tu jornada de trabajo comercial.",
      },
      {
        q: "¿El servicio nocturno tiene algún costo adicional?",
        a: "Los traslados nocturnos o en días feriados cuentan con tarifas diferenciales transparentes que se especifican y acuerdan por adelantado en tu cotización.",
      },
    ],
  ],
  [
    "mudanzas-residenciales",
    [
      {
        q: "¿Qué incluye el servicio de mudanza residencial en Mendoza?",
        a: "Incluye el traslado seguro en camión furgón cerrado, personal de carga y descarga calificado, seguro de carga de tránsito, y protección de muebles grandes con mantas de embalaje y fajas.",
      },
      {
        q: "¿Realizan mudanzas en dúplex, departamentos y barrios privados?",
        a: "Sí, nos especializamos en mudanzas familiares completas para todo tipo de residencias, incluyendo departamentos con accesos complejos y barrios cerrados con normativas de ingreso estrictas.",
      },
    ],
  ],
  [
    "transporte-de-muebles",
    [
      {
        q: "¿Hacen fletes para trasladar un solo mueble pesado?",
        a: "Sí, realizamos transporte de muebles individuales pesados o delicados como heladeras, sillones, mesas de pool, pianos o armarios, utilizando técnicas de sujeción seguras.",
      },
      {
        q: "¿Incluyen el desarme y armado de muebles de dormitorio?",
        a: "Sí, nuestro equipo cuenta con herramientas para desarmar y armar camas, roperos, placares o escritorios de forma rápida y profesional durante el traslado.",
      },
    ],
  ],
  [
    "traslado-de-offices",
    [
      {
        q: "¿Hacen mudanzas comerciales fuera del horario de oficina?",
        a: "Sí, planificamos traslados de oficinas y comercios de noche o durante los fines de semana para evitar frenar la productividad comercial o atención de tu empresa.",
      },
      {
        q: "¿Cómo protegen los equipos de computación y servidores?",
        a: "Utilizamos embalajes amortiguadores de alta resistencia y plástico de burbujas de alta densidad para resguardar racks, computadoras, monitores y documentación sensible.",
      },
    ],
  ],
  [
    "guardamuebles-mendoza",
    [
      {
        q: "¿Cuentan con depósitos de guardamuebles vigilados en Mendoza?",
        a: "Sí, disponemos de depósitos y guardamuebles secos, individuales, cerrados y monitoreados las 24 horas mediante sistemas de cámaras de seguridad y control de acceso.",
      },
      {
        q: "¿Cuál es el tiempo mínimo de alquiler de un guardamuebles?",
        a: "Ofrecemos alquiler flexible sin contratos a largo plazo. Podés almacenar tus pertenencias por días, semanas, meses o el tiempo exacto que dure tu mudanza o reforma.",
      },
    ],
  ],
  [
    "embalaje-y-desarme",
    [
      {
        q: "¿Qué materiales de embalaje profesional utilizan?",
        a: "Empleamos cajas de cartón corrugado de alta resistencia, plástico burbuja de alta densidad, film stretch industrial autoadherente, cinta de embalar ancha y mantas protectoras.",
      },
      {
        q: "¿El personal realiza el empaque total de vajilla y cristalería?",
        a: "Sí, ofrecemos un servicio premium donde nos encargamos de embalar detalladamente platos, copas, adornos y pertenencias delicadas en cajas rotuladas para máxima tranquilidad.",
      },
    ],
  ],
  [
    "izamientos-y-altura",
    [
      {
        q: "¿Cómo suben sillones o heladeras que no pasan por escaleras?",
        a: "Realizamos trabajos especializados de izamiento por el exterior de edificios, subiendo o bajando muebles grandes por balcones y ventanas con sistemas de poleas y arneses.",
      },
      {
        q: "¿Cuentan con seguros específicos para trabajos de izamiento?",
        a: "Sí, todo nuestro personal de altura está certificado e incluye seguro de responsabilidad civil y de accidentes personales homologados para operaciones de alto riesgo.",
      },
    ],
  ],
]);

function getDefaultServiceFAQs(
  serviceTitle: string,
): { q: string; a: string }[] {
  return [
    {
      q: `¿Ofrecen servicio de ${serviceTitle} en Mendoza?`,
      a: `Sí, en Mudanzas Miranda ofrecemos un servicio profesional de ${serviceTitle} adaptado a tus necesidades con fletes equipados y operarios expertos.`,
    },
    {
      q: `¿Cómo cotizar el servicio de ${serviceTitle}?`,
      a: "Podés cotizar de manera gratuita y en segundos mediante nuestro cotizador interactivo o enviándonos un mensaje directo de WhatsApp.",
    },
  ];
}

function getServiceFAQs(
  serviceId: string,
  serviceTitle: string,
): { q: string; a: string }[] {
  return (
    serviceSpecificFAQs.get(serviceId) || getDefaultServiceFAQs(serviceTitle)
  );
}

export default function SEO({
  title,
  description,
  canonicalUrl,
  isLocalPage = false,
  destinationData,
  serviceData,
}: SEOProps) {
  useEffect(() => {
    const updateMetaTag = (
      name: string,
      content: string,
      isProperty: boolean = false,
    ) => {
      const attribute = isProperty ? "property" : "name";
      let tag = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attribute, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    const updateLinkTag = (rel: string, href: string) => {
      let tag = document.querySelector(`link[rel="${rel}"]`);
      if (!tag) {
        tag = document.createElement("link");
        tag.setAttribute("rel", rel);
        document.head.appendChild(tag);
      }
      tag.setAttribute("href", href);
    };

    // 1. Update Document Title
    document.title = title;

    // 2. Update Meta Description
    updateMetaTag("description", description);

    // 3. Update Canonical URL Link
    updateLinkTag("canonical", canonicalUrl);

    // 4. Update OpenGraph Tags
    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:url", canonicalUrl, true);

    // 5. Update JSON-LD Schemas
    const movingCompanySchema = {
      "@context": "https://schema.org",
      "@type": "MovingCompany",
      "@id": "https://www.mudanzasmiranda.com.ar/#company",
      name: "Mudanzas Miranda",
      url: "https://www.mudanzasmiranda.com.ar",
      logo: "https://www.mudanzasmiranda.com.ar/img/brand-light.png",
      image: "https://www.mudanzasmiranda.com.ar/img/mudanzas-miranda-1200.jpg",
      description:
        "Servicio profesional de mudanzas en Mendoza. Traslados residenciales y de oficinas con más de 20 años de experiencia.",
      telephone: "+5492615130910",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Armada Argentina 584",
        addressLocality: "Mendoza",
        addressRegion: "Mendoza",
        postalCode: "5500",
        addressCountry: "AR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -32.890183,
        longitude: -68.84405,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "20:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday"],
          opens: "09:00",
          closes: "14:00",
        },
      ],
      sameAs: [
        "https://www.facebook.com/mudanzasmiranda4",
        "https://www.instagram.com/mudanzasmiranda/",
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "186",
        bestRating: "5",
        worstRating: "1",
      },
    };

    const schemaId = "seo-structured-data";
    let schemaScript = document.getElementById(
      schemaId,
    ) as HTMLScriptElement | null;
    if (schemaScript) {
      schemaScript.remove();
    }
    schemaScript = document.createElement("script");
    schemaScript.id = schemaId;
    schemaScript.type = "application/ld+json";
    const schemaData: any[] = [movingCompanySchema];

    if (isLocalPage && destinationData) {
      // Localized Service Schema
      const localServiceSchema = {
        "@context": "https://schema.org",
        "@type": "Service", // Use non-null assertion as destinationData is checked
        serviceType: "Servicio de Mudanza Residencial y Comercial",
        provider: {
          "@type": "MovingCompany",
          name: "Mudanzas Miranda",
          telephone: "+5492615130910",
          priceRange: "$$",
          image:
            "https://www.mudanzasmiranda.com.ar/img/mudanzas-miranda-1200.jpg",
        },
        areaServed: {
          "@type": "AdministrativeArea", // Use non-null assertion as destinationData is checked
          name: destinationData.name,
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: "Mendoza", // Use non-null assertion as destinationData is checked
          },
        },
        name: `Mudanzas en ${destinationData.name}`,
        description: destinationData.description,
      };
      schemaData.push(localServiceSchema);

      // Local FAQ Page Schema for Destination Page
      const destFaqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question", // Use non-null assertion as destinationData is checked
            name: `¿Hacen mudanzas y fletes en ${destinationData.name}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Sí, en Mudanzas Miranda brindamos cobertura total de fletes, mudanzas residenciales, corporativas y traslados especiales en ${destinationData.name}, con unidades habilitadas y personal calificado.`,
            },
          },
          {
            "@type": "Question", // Use non-null assertion as destinationData is checked
            name: `¿Cuánto cuesta un flete o mudanza en la zona de ${destinationData.name}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Las tarifas para traslados en ${destinationData.name} se calculan en base al volumen de tu carga, cantidad de ayudantes necesarios y el trayecto. Podés solicitar tu presupuesto en segundos usando nuestro cotizador online gratuito.`,
            },
          },
          {
            "@type": "Question", // Use non-null assertion as destinationData is checked
            name: `¿Las mudanzas en ${destinationData.name} cuentan con seguro?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Sí, todos nuestros fletes y mudanzas en ${destinationData.name} y en todo el territorio mendocino cuentan con póliza de seguro de carga para total tranquilidad sobre tus bienes.`,
            },
          },
        ],
      };
      schemaData.push(destFaqSchema);
    } else if (serviceData) {
      // FAQ Page Schema for Service Landing Page
      const serviceFaqs = getServiceFAQs(serviceData.id, serviceData.title); // Use non-null assertion as serviceData is checked
      const serviceFaqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          ...serviceFaqs.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a,
            },
          })),
          {
            "@type": "Question",
            name: "¿Todas las mudanzas cuentan con póliza de seguro?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Exacto. Ofrecemos respaldo de seguro de carga integral para proteger el valor de tus bienes ante imprevistos, respaldado por compañías líderes de Argentina.",
            },
          },
        ],
      };
      schemaData.push(serviceFaqSchema);
    } else {
      // FAQ Page Schema for Main Page - generated dynamically from actual faqs data
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      };
      schemaData.push(faqSchema);
    }

    schemaScript.textContent = JSON.stringify(schemaData);
    document.head.appendChild(schemaScript);

    return () => {
      schemaScript.remove();
    };
  }, [
    title,
    description,
    canonicalUrl,
    isLocalPage,
    destinationData,
    serviceData,
  ]);

  return null;
}
