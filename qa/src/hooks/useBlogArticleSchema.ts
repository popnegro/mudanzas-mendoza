import { useEffect } from 'react';
import { BlogArticle } from '../types';

/**
 * Custom hook to dynamically generate and inject Schema.org 'Article' and 'BreadcrumbList'
 * JSON-LD schemas into the document head when viewing a blog article.
 */
export function useBlogArticleSchema(article: BlogArticle | null) {
  useEffect(() => {
    if (!article) return;

    // Standardized ISO date parsing or estimation
    const publishDate = article.date.includes('/') 
      ? article.date.split('/').reverse().join('-') 
      : '2026-01-15'; // Default mock/ISO date for 2026

    // 1. Article Schema JSON-LD
    const articleJsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://mudanzasmendoza2026.com.ar/blog/${article.slug}`
      },
      "headline": article.title,
      "description": article.summary,
      "image": "https://ais-dev-etzjgp4qe2v62cnwnmfoco-175390492626.us-east1.run.app/assets/blog-cover.jpg",
      "datePublished": publishDate,
      "dateModified": publishDate,
      "author": {
        "@type": "Person",
        "name": article.author,
        "jobTitle": "Especialista en Mudanzas y Logística"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Mudanzas Mudanzas Mendoza",
        "logo": {
          "@type": "ImageObject",
          "url": "https://ais-dev-etzjgp4qe2v62cnwnmfoco-175390492626.us-east1.run.app/assets/logo.png"
        }
      },
      "keywords": article.keywords?.join(', ') || 'mudanzas, fletes, mendoza, embalaje, logistica'
    };

    // 2. BreadcrumbList Schema JSON-LD
    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Inicio",
          "item": "https://mudanzasmendoza2026.com.ar"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://mudanzasmendoza2026.com.ar/#blog"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": article.title,
          "item": `https://mudanzasmendoza2026.com.ar/blog/${article.slug}`
        }
      ]
    };

    const articleScriptId = `blog-article-schema-${article.id}`;
    const breadcrumbScriptId = `blog-breadcrumb-schema-${article.id}`;

    // Inject Article Schema
    let articleScript = document.getElementById(articleScriptId) as HTMLScriptElement;
    if (!articleScript) {
      articleScript = document.createElement('script');
      articleScript.id = articleScriptId;
      articleScript.type = 'application/ld+json';
      document.head.appendChild(articleScript);
    }
    articleScript.textContent = JSON.stringify(articleJsonLd, null, 2);

    // Inject Breadcrumb Schema
    let breadcrumbScript = document.getElementById(breadcrumbScriptId) as HTMLScriptElement;
    if (!breadcrumbScript) {
      breadcrumbScript = document.createElement('script');
      breadcrumbScript.id = breadcrumbScriptId;
      breadcrumbScript.type = 'application/ld+json';
      document.head.appendChild(breadcrumbScript);
    }
    breadcrumbScript.textContent = JSON.stringify(breadcrumbJsonLd, null, 2);

    return () => {
      const existingArticle = document.getElementById(articleScriptId);
      if (existingArticle) existingArticle.remove();

      const existingBreadcrumb = document.getElementById(breadcrumbScriptId);
      if (existingBreadcrumb) existingBreadcrumb.remove();
    };
  }, [article]);
}
