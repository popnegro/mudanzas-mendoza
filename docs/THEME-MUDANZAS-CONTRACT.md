# theme-mudanzas — contrato de reutilización

## Objetivo

`theme-mudanzas` es la base visual y técnica reutilizable para los sitios del ecosistema:

- `mudanzas-mendoza`: capa informativa / autoridad temática.
- `mudanzas-miranda`: capa de proveedor / marca.
- `mudanzapro`: capa de planificación y resolución.

La reutilización debe preservar la identidad funcional de cada producto. No se copia contenido ni se fuerza el mismo rol SEO/comercial.

## Qué pertenece al theme

- Shell de aplicación y layout.
- Header, navegación, footer y patrones responsive.
- Tokens visuales y componentes UI reutilizables.
- Accesibilidad, estados, interacción y patrones de formularios.
- Routing SPA y manejo de rutas legacy cuando sea aplicable.
- Infraestructura Vite/React/TypeScript y quality gates.

## Qué pertenece al sitio

- Marca, dominio y canonical.
- Logo y assets de marca.
- Teléfono/WhatsApp/email.
- Servicios, destinos, FAQs, testimonios y artículos.
- Claims comerciales y datos verificables.
- Rol dentro del ecosistema y estrategia SEO/GEO.

## Regla de implementación

Los componentes compartidos no deben contener valores hard-codeados de Mudanzas Miranda. Los datos de marca, dominio, contacto y ecosistema deben provenir de `static/src/theme/theme.config.ts` o de la capa de datos del sitio.

## Regla de migración

1. Consolidar `theme-mudanzas` sin importar la truncación conocida de `main`.
2. Extraer valores de marca/contacto/SEO a configuración.
3. Validar build + typecheck + QA visual del theme.
4. Aplicar el theme a `mudanzas-miranda` conservando su contenido y rol de proveedor.
5. Aplicar el theme a `mudanzapro` conservando su calculador, leads y rol de planificación.
6. Cada aplicación se realiza mediante PR independiente y queda bloqueada para merge hasta QA.

## No hacer

- No reemplazar contenido de Miranda por contenido genérico del theme.
- No convertir MudanzaPro en un sitio proveedor.
- No copiar ratings, claims, precios o datos de contacto entre sitios.
- No declarar paridad visual sin Preview real.
