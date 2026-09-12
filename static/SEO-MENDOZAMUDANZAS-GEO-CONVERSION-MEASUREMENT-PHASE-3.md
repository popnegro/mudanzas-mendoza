# FASE 3 — GEO + CONVERSIÓN + MEDICIÓN

## Estado

IMPLEMENTACIÓN INICIAL — hub GEO, arquitectura de derivación y especificación de medición preparados. No se activan Analytics ni identificadores inexistentes.

## Rol estratégico

Mudanzas en Mendoza mantiene su identidad de autoridad informacional/topical y no se transforma en marketplace ni en una empresa ficticia.

| Sitio | Rol |
|---|---|
| Mudanzas Miranda | QUIÉN — empresa/marca |
| Mudanzas en Mendoza | QUÉ SABER — autoridad temática |
| Mudanza Pro | QUÉ HACER / CONTRATAR — conversión |

## GEO

Se incorporó `/mudanzas-en-mendoza.html` como hub editorial indexable.

El hub responde de forma directa y extraíble preguntas sobre:

- cuánto cuesta una mudanza en Mendoza;
- cómo calcular el precio;
- cuánto demora;
- qué incluye una mudanza;
- cómo organizarla;
- qué servicios existen;
- qué información preparar para solicitar presupuesto.

Incluye contexto geográfico explícito, enlaces a contenidos existentes y JSON-LD de `WebPage`, `BreadcrumbList` y `FAQPage`, todos coherentes con contenido visible.

No se agregaron métricas, reseñas, certificaciones, premios ni identificadores no verificados.

## Conversión

El hub mantiene el recorrido:

**información → confianza → intención → presupuesto/contacto**

La derivación comercial apunta a Mudanzas Miranda mediante el WhatsApp ya validado y conserva `Solicitar presupuesto` como vía secundaria.

No se presenta a Mudanzas en Mendoza como prestador comercial independiente.

## Arquitectura interna

El hub enlaza hacia:

- `/blog/cuanto-cuesta-una-mudanza`
- `/blog/como-organizar-una-mudanza`
- `/blog/como-embalar-una-heladera`
- servicios existentes;
- `/destinos`.

También se incorpora un enlace persistente al hub desde el footer.

No se crean nuevas páginas locales únicamente para aumentar URLs.

## Medición

### Search Console

Una vez disponible acceso real, medir:

- URLs indexadas;
- consultas;
- impresiones;
- clics;
- posición media;
- rendimiento del hub y contenidos estratégicos.

### Analytics

No se activa GA4 sin un ID real proporcionado por el propietario.

### Eventos recomendados

- `whatsapp_click`
- `quote_start`
- `quote_submit`
- `hub_to_service_click`
- `hub_to_destination_click`

Los nombres anteriores son una especificación de medición, no métricas existentes.

## SEO técnico final de Fase 3

- canonical absoluto en el hub;
- `index,follow` explícito;
- Open Graph y Twitter Card;
- `sitemap-phase3.xml` dedicado al hub para evitar reescribir innecesariamente el sitemap histórico;
- robots actualizado para declarar ambos sitemaps;
- BreadcrumbList con URLs absolutas;
- FAQPage únicamente para preguntas visibles;
- responsive mediante CSS fluido y grid adaptativo;
- sin dependencias nuevas.

## Validación final antes de PR

- build Vite;
- TypeScript;
- rutas/enlaces;
- JSON-LD;
- sitemap/robots;
- mobile/accessibility;
- claims comerciales;
- ausencia de secretos.
