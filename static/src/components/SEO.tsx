import { useEffect } from "react";
import { faqs } from "../data/staticData";
import { Destination, Service, BlogArticle } from "../types";

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl: string;
  isLocalPage?: boolean;
  destinationData?: Destination;
  serviceData?: Service;
  blogArticleData?: BlogArticle;
}

const SITE_URL = "https://mudanzasmendoza.com.ar";
const DEFAULT_IMAGE = `${SITE_URL}/img/camiones-mudanzas-miranda.jpg`;
const DEFAULT_KEYWORDS = "mudanzas mendoza, fletes mendoza, mudanzas miranda, fletes y mudanzas";

export default function SEO({ title, description, canonicalUrl, isLocalPage = false, destinationData, serviceData, blogArticleData }: SEOProps) {
  useEffect(() => {
    const setMeta = (name: string, content: string, property = false) => {
      const attribute = property ? "property" : "name";
      let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    const setLink = (rel: string, href: string) => {
      let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement("link");
        element.rel = rel;
        document.head.appendChild(element);
      }
      element.href = href;
    };

    document.title = title;
    setMeta("description", description);
    setMeta("robots", "index, follow");
    setMeta("keywords", blogArticleData?.keywords?.join(", ") || DEFAULT_KEYWORDS);
    setLink("canonical", canonicalUrl);

    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:url", canonicalUrl, true);
    setMeta("og:type", blogArticleData ? "article" : "website", true);
    setMeta("og:locale", "es_AR", true);
    setMeta("og:site_name", "Mudanzas Miranda", true);

    const rawImage = serviceData?.image || blogArticleData?.image || DEFAULT_IMAGE;
    const imageUrl = rawImage.startsWith("http") ? rawImage : `${SITE_URL}${rawImage}`;
    setMeta("og:image", imageUrl, true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", imageUrl);

    const schemas: Record<string, unknown>[] = [
      {
        "@context": "https://schema.org",
        "@type": "MovingCompany",
        "@id": `${SITE_URL}/#company`,
        name: "Mudanzas Miranda",
        url: SITE_URL,
        telephone: "+5492615130910",
        areaServed: { "@type": "AdministrativeArea", name: "Mendoza" },
        sameAs: [
          "https://www.facebook.com/mudanzasmiranda4",
          "https://www.instagram.com/mudanzasmiranda/",
        ],
      },
    ];

    if (isLocalPage && destinationData) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Service",
        name: `Mudanzas en ${destinationData.name}`,
        description: destinationData.description,
        provider: { "@id": `${SITE_URL}/#company` },
        areaServed: { "@type": "AdministrativeArea", name: destinationData.name },
      });
    }

    if (serviceData) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Service",
        name: serviceData.title,
        description: serviceData.description,
        provider: { "@id": `${SITE_URL}/#company` },
        areaServed: { "@type": "AdministrativeArea", name: "Mendoza" },
      });
    }

    if (blogArticleData) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: blogArticleData.title,
        description: blogArticleData.summary,
        image: imageUrl,
        datePublished: blogArticleData.date,
        dateModified: blogArticleData.date,
        author: { "@type": "Person", name: blogArticleData.author || "Mudanzas Miranda" },
        publisher: { "@id": `${SITE_URL}/#company` },
        mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
      });
    } else if (!isLocalPage && !serviceData && faqs.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      });
    }

    const schemaId = "seo-structured-data";
    document.getElementById(schemaId)?.remove();
    const script = document.createElement("script");
    script.id = schemaId;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schemas);
    document.head.appendChild(script);

    return () => script.remove();
  }, [title, description, canonicalUrl, isLocalPage, destinationData, serviceData, blogArticleData]);

  return null;
}
