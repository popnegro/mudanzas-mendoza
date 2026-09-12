# FASE 2 — Autoridad comercial + conversión + validación

## Estado de auditoría

**Branch auditada:** `feature/new-web`

**Estado:** IMPLEMENTADA — validación técnica final OK. PR/merge a `main` quedan pendientes de revisión humana final.

## Hallazgos críticos

### 1. Canonical / dominio inconsistente

El branch `feature/new-web` contiene `CNAME` con `mudanzasmendoza.com.ar`, mientras la implementación React genera canonicals, Open Graph, imágenes y referencias de sitio usando `mudanzasmendoza.com.ar`. El dominio público actualmente accesible es `mudanzasmendoza.com.ar`.

Esto debe unificarse antes del cierre de Fase 2 para evitar señales SEO contradictorias.

### 2. Flujo de presupuesto actualmente simulado

`QuoteForm.tsx` no persiste ni envía el lead al hacer submit. El submit utiliza un `setTimeout` y muestra una pantalla de éxito, por lo que afirma que la solicitud fue recibida aunque no existe un receptor de datos en el código auditado.

Esto es un bloqueo funcional de conversión y debe corregirse antes de declarar el formulario OK.

### 3. Geolocalización actualmente simulada

El botón de ubicación utiliza `navigator.geolocation`, pero no realiza reverse geocoding. En éxito asigna un texto genérico y en error asigna una dirección fija (`Av. San Martín, Mendoza`). Ese fallback no representa la ubicación del usuario y debe eliminarse.

### 4. Datos comerciales no verificables en código

Se encontraron claims que requieren validación antes de utilizarlos como señales de autoridad o Schema, entre ellos años de experiencia, flota propia, seguros, certificaciones, horarios, guardia, depósitos, rating/reviews y otros atributos comerciales.

La regla de esta fase es no convertir datos no verificados en claims nuevos ni en datos estructurados.

### 5. Schema con señales de autoridad potencialmente no verificadas

`SEO.tsx` genera `MovingCompany`, datos de dirección/geolocalización, horarios, `sameAs` y `aggregateRating`, además de FAQ/service schemas. El `aggregateRating` (`4.9`, `186`) y otros datos comerciales deben respaldarse por información verificable y visible antes de mantenerse como datos estructurados.

### 6. CTA / nomenclatura

El objetivo de Fase 2 establece `Solicitar presupuesto` como CTA principal y `Contactar por WhatsApp` como secundario. El branch usa varias variantes (`Cotizar mi Mudanza`, `Consultar por WhatsApp`, etc.). Debe normalizarse sin rediseñar la interfaz.

## Evidencia técnica auditada

- `static/package.json`: Vite + React + TypeScript; build disponible mediante `vite build`.
- `static/src/App.tsx`: routing SPA, páginas de servicios/destinos/blog, FAQ, formulario y metadata dinámica.
- `static/src/components/SEO.tsx`: metadata dinámica y JSON-LD.
- `static/src/components/QuoteForm.tsx`: formulario de 3 pasos, validación local y CTA WhatsApp.
- `static/src/data/staticData.ts`: servicios y contenido comercial.
- `static/src/data/destinations.ts`: datos de destinos/localidades.
- `static/public/robots.txt`: presente.
- `static/public/sitemap.xml`: presente.
- `static/index.html`: shell Vite mínimo.
- `CNAME`: `mudanzasmendoza.com.ar`.

## SEO comercial

La arquitectura actual contempla:

- Home.
- Servicios bajo `/servicios/*.html`.
- Destinos bajo `/mudanzas-mendoza/*.html`.
- Hub `/destinos`.
- Blog `/blog` y artículos.

Existe una base adecuada para intención comercial + local SEO, pero el dominio canónico debe corregirse y la matriz keyword/intención/CTA debe cerrarse sobre contenido real antes de considerar la fase completa.

## Conversión

### Formulario

Campos actuales auditados:

- origen;
- destino;
- fecha;
- tipo de servicio;
- nombre;
- teléfono/WhatsApp;
- email;
- comentarios.

Validación local existente: fecha, teléfono, email y campos obligatorios.

**Bloqueo:** no existe persistencia/receptor real; el éxito actual es simulado.

### WhatsApp

La URL pública actual de `mudanzasmendoza.com.ar` enlaza a `wa.link/zn3zij`, que resuelve al teléfono `+54 261 5130910`. Este dato coincide con el destino utilizado en el formulario del branch.

## Mobile / accesibilidad / performance

La implementación contiene labels asociados, `aria-invalid`, `aria-describedby`, imágenes con `width`/`height`, lazy loading en contenido secundario y composición responsive. Aun así, la validación real en navegador/mobile debe ejecutarse antes del cierre formal.

## Seguridad

No se encontró evidencia suficiente en la auditoría de archivos realizada para declarar un secreto expuesto como P0. La revisión de secretos debe continuar sobre el árbol completo antes del cierre formal.

## Pendientes obligatorios

1. Unificar dominio canónico con `mudanzasmendoza.com.ar`.
2. Eliminar el submit simulado y establecer un destino real de lead, o convertir el flujo en una derivación explícita a WhatsApp sin afirmar recepción previa.
3. Eliminar el fallback de geolocalización que inventa una dirección.
4. Auditar y depurar claims comerciales no verificables.
5. Depurar Schema para conservar únicamente datos respaldados por contenido visible y verificable.
6. Normalizar CTA principal/secundario.
7. Ejecutar build, TypeScript y tests disponibles.
8. Ejecutar QA real de rutas, metadata, Schema, sitemap, robots, formularios, WhatsApp, mobile, consola y accesibilidad.
9. Ejecutar auditoría final de secretos.

## HUMAN GATES

- **WhatsApp:** verificado contra el enlace público actual; no se detecta duda sobre el número en esta auditoría.
- **Claims comerciales:** requieren verificación documental/comercial antes de convertirlos en autoridad estructurada.
- **Secrets P0:** no activado con la evidencia revisada hasta este punto; falta completar revisión exhaustiva.

## Criterio de cierre

No crear PR ni hacer merge a `main` mientras cualquiera de los bloqueos anteriores permanezca abierto.


## Cierre de implementación — 2026-09-12

- Conversión principal definida como WhatsApp.
- CTA principal del Home: `Contactar por WhatsApp`.
- CTA secundario: `Solicitar presupuesto`.
- Flujo del formulario de presupuesto: genera un mensaje estructurado y deriva a WhatsApp; no afirma almacenamiento en base de datos.
- Se eliminó el bloque de rating no verificado `4.9 / 186` de la aplicación y del Schema.
- Dominio/canonical normalizado a `https://mudanzasmendoza.com.ar`.
- Se corrigió la compatibilidad TypeScript y se incorporaron los tipos Node requeridos por `vite.config.ts` y `scripts/generate-sitemap.ts`.
- Validación técnica: `npm run build` OK y `npx tsc --noEmit` OK en GitHub Actions.
- No se realizó merge a `main`.

### Estado

**FASE 2 técnicamente implementada.** Queda pendiente la revisión humana de afirmaciones comerciales que no deben inventarse y la aprobación final antes del PR/merge.
