# Mudanzas Mendoza — theme-mudanzas

Base oficial de la plataforma web de **Mudanzas Miranda** (mudanzas residenciales, oficinas y fletes en Mendoza, Argentina).

Sitio en producción: [https://mudanzasmendoza.com.ar](https://mudanzasmendoza.com.ar)

---

## Arquitectura

| Capa | Tecnología |
|------|------------|
| UI | React 19 (SPA) |
| Build | Vite 6 |
| Estilos | Tailwind CSS v4 |
| Animación | Framer Motion |
| Tipado | TypeScript 5 (strict) |
| Deploy | Vercel |

La **única fuente de verdad** es el directorio `static/`.
El root del repositorio solo contiene configuración de deploy, SEO estático (robots/sitemaps), verificación de buscadores y assets residuales en migración.

```text
/
├── static/                 # SPA (código de producto)
│   ├── public/             # Assets que salen en dist/ (img, robots, sitemap)
│   ├── src/                # React + TypeScript
│   ├── package.json
│   └── vite.config.ts
├── vercel.json             # Build + redirects 301 legacy + SPA rewrite
├── img/                    # Assets legacy (en migración → static/public/img)
├── docs/                   # Documentación operativa
└── README.md               # Este archivo
```

---

## Desarrollo local

```bash
cd static
npm install
npm run dev          # http://localhost:3000
npm run typecheck    # tsc --noEmit
npm run build        # salida en static/dist
npm run preview
```

### Scripts disponibles (`static/`)

| Script | Descripción |
|--------|-------------|
| `dev` | Servidor de desarrollo Vite |
| `build` | Build de producción |
| `preview` | Preview del build |
| `typecheck` | Chequeo TypeScript estricto |

---

## Deploy (Vercel)

`vercel.json` (raíz) es la configuración autoritativa:

- **install**: `cd static && npm install`
- **build**: `cd static && npm run build`
- **output**: `static/dist`
- **rewrites**: SPA fallback `/(.*) → /index.html`
- **redirects**: 301 de URLs legacy (`.html` antiguas → rutas canónicas)

Cualquier cambio de routing o redirects debe hacerse en este archivo, no en configs duplicados.

---

## SEO y paridad de URL

La SPA mantiene paridad con las URLs históricas (incluyendo rutas `.html`) mediante un enrutador basado en `window.location.pathname`.

- Schemas JSON-LD dinámicos (`MovingCompany`, `LocalBusiness`, `FAQPage`, `Service`)
- Metatags por destino/localidad
- Sitemaps en `static/public/` y raíz (legacy)

Documentación SEO detallada: `static/SEO.md` y archivos de fase en `static/`.

---

## Seguridad

En la limpieza de legacy se eliminó `include/sendemail.php`, que contenía **credenciales SMTP en texto plano**. Ese endpoint ya no existe.

La conversión de leads se hace por WhatsApp (formulario multi-paso → mensaje estructurado). No hay backend de correo en este repo.

Si esas credenciales estuvieron expuestas en el historial de git, conviene rotarlas en el proveedor SMTP.

---

## Estado de limpieza (theme-mudanzas)

### Eliminado
- HTML de entrada legacy (`index.html`, `index-qa.html` en root)
- `css/`, `js/`, `theme.min.css`
- `include/` (phpmailer, twitter, sendemail)
- Assets de test, preloaders, PNG sin optimizar con versión WebP

### Pendiente
1. Migrar assets críticos de root `img/` → `static/public/img/`
2. Vaciar residuales (`img/portfolio/`, etc.)
3. Refactor de `App.tsx` (extraer páginas/componentes)
4. ESLint + Prettier formales
5. CI (typecheck + build en PR)

---

## Ramas

| Rama | Rol |
|------|-----|
| `main` | Producción / base integrada |
| `theme-mudanzas` | Base de trabajo post-auditoría (origen de la limpieza) |
| `staging` | Entorno de prueba (cuando esté alineado) |

Nuevas features: branch desde `main` (o `theme-mudanzas` mientras se consolida), PR hacia `main`.

---

## Contacto / negocio

- Dominio: mudanzasmendoza.com.ar
- Marca operativa: Mudanzas Miranda
- Conversión principal: WhatsApp (estimador en la SPA)
