# Services UI contract

## Purpose

`theme-mudanzas` provides reusable UI primitives for the three-site service ecosystem. The primitives standardize interaction and accessibility without forcing identical page composition or copy.

## Shared primitives

- `ServiceCard`: one service entity, optionally linked to its detail page.
- `ServiceGrid`: responsive card grid; accepts a site-owned service list.
- `ServiceCTA`: conversion bridge with site-owned destination and copy.
- `Breadcrumbs`: accessible breadcrumb navigation for service/detail pages.
- `services.types.ts`: shared content contract.

## Composition by site

- **Mudanzas Mendoza — INFORMAR:** editorial/service-discovery composition. Primary ecosystem bridge points to MudanzaPro.
- **MudanzaPro — PLANIFICAR:** decision-oriented service composition. Primary action starts planning/calculation; final quote belongs to the execution provider.
- **Mudanzas Miranda — EJECUTAR:** commercial service composition. Primary action is quote/contact.

## Rules

1. Share semantic service entities, not duplicated copy.
2. Keep brand, domain, contact data, SEO metadata and commercial claims in the consuming site.
3. Use cards instead of the legacy aside/tab pattern for service discovery.
4. Preserve site-specific hierarchy and CTA intent.
5. Do not replace a complete `App.tsx` or Home page wholesale; migrate incrementally and validate visually after each page.
