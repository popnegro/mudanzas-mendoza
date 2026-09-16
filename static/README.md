# Mudanzas Miranda — SPA (`static/`)

Código de producto de la plataforma web. La documentación general del repositorio está en el [README raíz](../README.md).

Plataforma SPA para **Mudanzas Miranda** (mudanzas residenciales, oficinas y logística en Mendoza, Argentina).

Stack: **React 19**, **Vite 6**, **TypeScript 5** (strict), **Tailwind CSS v4**, **Framer Motion**.

---

## Características

* **Paridad de URL SEO**: el enrutador usa `window.location.pathname` y preserva las rutas `.html` históricas (ej. `/mudanzas-mendoza/mudanzas-ciudad-mendoza.html`).
* **Estimador multi-paso (CRO)**: formulario en 3 pasos → mensaje de WhatsApp estructurado.
* **SEO técnico**: JSON-LD dinámico (`MovingCompany`, `LocalBusiness`, `FAQPage`, `Service` por destino).
* **UX**: tipografía Inter + Merriweather, animaciones sutiles, responsive 320px–4K.
* **Accesibilidad**: orientación WCAG 2.2 AA (teclado, ARIA, contraste).

---

## Estructura

```text
static/
├── public/                 # Copiado a dist/ (img, robots, sitemap, manifest)
├── src/
│   ├── components/         # SEO, Header, Footer, QuoteForm, layout…
│   ├── data/               # destinations, staticData
│   ├── App.tsx             # Router + vistas (pendiente de split en pages/)
│   ├── main.tsx
│   ├── index.css           # Tailwind v4 @theme
│   └── types.ts
├── package.json
├── tsconfig.json           # strict: true
└── vite.config.ts
```

---

## Scripts

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck    # tsc --noEmit
npm run build        # → dist/
npm run preview
```

---

## Documentación SEO / fases

* `SEO.md` — estrategia local y Schema.org
* `SEO-MENDOZAMUDANZAS-COMMERCIAL-AUTHORITY-PHASE-2.md`
* `SEO-MENDOZAMUDANZAS-GEO-CONVERSION-MEASUREMENT-PHASE-3.md`

Deploy y redirects: ver `vercel.json` en la raíz del repo y el [README raíz](../README.md).
