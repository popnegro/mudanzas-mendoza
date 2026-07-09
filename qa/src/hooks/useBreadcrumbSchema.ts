import { useEffect } from 'react';

export interface BreadcrumbItem {
  name: string;
  item: string;
}

/**
 * Custom hook to dynamically generate and inject a Schema.org 'BreadcrumbList'
 * schema into the document head for optimal SEO internal hierarchy mapping.
 */
export function useBreadcrumbSchema(items: BreadcrumbItem[], id: string) {
  useEffect(() => {
    const itemListElement = items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item
    }));

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": itemListElement
    };

    const scriptId = `breadcrumb-schema-${id}`;
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
  }, [items, id]);
}
