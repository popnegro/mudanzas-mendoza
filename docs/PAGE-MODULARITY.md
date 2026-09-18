# Modularidad por página

`theme-mudanzas` comparte el **shell** y permite que cada página componga módulos propios.

## Regla

```text
SharedLayout
├── Header                 ← compartido
├── Navigation             ← compartido
├── PageRenderer           ← compartido
│   ├── Hero               ← específico de página
│   ├── Services           ← específico de página
│   ├── FAQ                ← específico de página
│   └── CTA                ← específico de página
└── Footer                 ← compartido
```

La página no debe duplicar Header, navegación o Footer para conseguir una composición diferente.

## Contratos

- `static/src/theme/page.types.ts`: define `PageDefinition`, `PageModule` y `PageRegistry`.
- `static/src/theme/SharedLayout.tsx`: shell compartido.
- `static/src/theme/PageRenderer.tsx`: resolución ordenada de módulos por página.

## Aplicación en sitios consumidores

Cada sitio puede registrar sus propias páginas y resolver módulos propios:

```ts
const pages = {
  home: {
    id: 'home',
    path: '/',
    title: 'Inicio',
    modules: [
      { id: 'hero', component: 'Hero', order: 10 },
      { id: 'services', component: 'Services', order: 20 },
    ],
  },
  contacto: {
    id: 'contacto',
    path: '/contacto',
    title: 'Contacto',
    modules: [
      { id: 'contact-form', component: 'ContactForm', order: 10 },
    ],
  },
};
```

El registro y los componentes de contenido pertenecen al sitio. El layout permanece compartido.

## Migración segura

No se reemplaza el `App.tsx` existente de golpe. La adopción debe ser incremental: una página, un Preview, typecheck/build, Lighthouse y QA visual antes de continuar con la siguiente.
