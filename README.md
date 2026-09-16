# Mudanzas Mendoza — theme-mudanzas

Base oficial de la plataforma web de **Mudanzas Miranda** (mudanzas residenciales, oficinas y fletes en Mendoza, Argentina).

**Producción:** [mudanzasmendoza.com.ar](https://mudanzasmendoza.com.ar) · [mudanzasmiranda.com.ar](https://mudanzasmiranda.com.ar) · [mudanzaspro.com.ar](https://mudanzaspro.com.ar)  
**QA:** `*.vercel.app` (mudanzas-mendoza / mudanzas-miranda / mudanzapro)

Deploy de producción: **Cloudflare Pages** (DNS en Cloudflare). Vercel solo para previews de QA.

---

## Arquitectura

| Capa | Tecnología |
|------|------------|
| UI | React 19 (SPA) |
| Build | Vite 6 |
| Estilos | Tailwind CSS v4 |
| Animación | Framer Motion |
| Tipado | TypeScript 5 (strict) |
| Producción | Cloudflare Pages |
| QA | Vercel (`*.vercel.app`) |

La **única fuente de verdad** es el directorio `static/`.

```text
/
├── static/                 # SPA (código de producto)
│   ├── public/             # → dist/ (img, robots, sitemap, _redirects)
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
├── vercel.json             # QA (Vercel): build + redirects + SPA rewrite
├── img/                    # Legacy (migración → static/public/img)
├── docs/
└── README.md
```

---

## Desarrollo local

```bash
cd static
npm install
npm run dev          # http://localhost:3000
npm run typecheck
npm run build        # → static/dist
npm run preview
```

| Script | Descripción |
|--------|-------------|
| `dev` | Vite dev server |
| `build` | Build producción |
| `preview` | Preview local del build |
| `typecheck` | `tsc --noEmit` |

---

## Deploy

### Producción — Cloudflare Pages

| Setting | Valor |
|---------|--------|
| Root / build | `cd static && npm run build` |
| Output | `static/dist` |
| SPA | `static/public/_redirects` → se copia a `dist/` (`/* /index.html 200`) |
| Dominios | mudanzasmendoza.com.ar, mudanzasmiranda.com.ar, mudanzaspro.com.ar (DNS Cloudflare) |

### QA — Vercel

`vercel.json` en la raíz:

- install / build / output: `static/`
- rewrites SPA + redirects 301 legacy
- Solo para links `*.vercel.app`

---

## SEO y paridad de URL

Enrutador por `window.location.pathname` (incluye rutas `.html` históricas).

- JSON-LD: `MovingCompany`, `LocalBusiness`, `FAQPage`, `Service`
- Canonical / OG: dominio de producción `mudanzasmendoza.com.ar`
- Detalle: `static/SEO.md`

---

## Seguridad

Se eliminó `include/sendemail.php` (credenciales SMTP en texto plano).  
Conversión de leads: WhatsApp. Rotar SMTP si esas credenciales siguen activas en el proveedor.

---

## Estado de limpieza

### Hecho
- `.gitignore` limpio, HTML/CSS/JS/include legacy fuera
- `logo-light.svg` en `static/public/img/`
- `_redirects` para Cloudflare Pages
- Tooling: `typecheck` + TS strict

### Pendiente / atención
1. **Urgente:** restaurar `static/src/App.tsx` si quedó truncado (ver abajo)
2. Migrar residuales root `img/` → `static/public/img/`
3. Vaciar `img/portfolio/`
4. Refactor `App.tsx` → `pages/`
5. ESLint + Prettier + CI

### Restaurar App.tsx (si hace falta)

```bash
git fetch origin
git checkout 0d8f3df8fa73bf771ce6f937387d912d95522a90 -- static/src/App.tsx
# opcional: hero con asset en public
sed -i 's|https://mudanzasmendoza.com.ar/img/camiones-mudanzas-miranda.jpg|/img/camiones-mudanzas-miranda.webp|' static/src/App.tsx
git add static/src/App.tsx && git commit -m "fix: restore App.tsx" && git push
```

---

## Ramas

| Rama | Rol |
|------|-----|
| `main` | Base integrada |
| `theme-mudanzas` | Trabajo post-auditoría |
| `staging` | QA alineado |

---

## Marca / conversión

- Dominios prod: mudanzasmendoza.com.ar, mudanzasmiranda.com.ar, mudanzaspro.com.ar
- Marca: Mudanzas Miranda
- Lead: estimador → WhatsApp
