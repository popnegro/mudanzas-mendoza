# theme-mudanzas

## Purpose

Shared visual contract for the three-domain Mudanzas ecosystem:

- Mudanzas en Mendoza — INFORMAR
- MudanzaPro — PLANIFICAR
- Mudanzas Miranda — EJECUTAR

Content, routing, SEO metadata, forms, data and conversion logic remain owned by each site.

## Canonical visual primitives

| Token | Value | Role |
| --- | --- | --- |
| Primary | #06434A | Brand / primary actions |
| Primary dark | #05373D | Hover / active primary |
| Accent | #07BE8A | Positive interaction / highlights |
| Surface | #FFFFFF | Cards / panels |
| Background | #FAF9F5 | Editorial canvas |
| Text | #12383A | Main text |
| Secondary text | #5F6B73 | Supporting text |
| Border | #E2E8F0 | Structural separation |

## Shared interaction language

- Rounded controls and cards.
- One dominant primary CTA per section.
- Accent reserved for positive states, progress and secondary emphasis.
- Clear hierarchy: eyebrow → heading → supporting text → action.
- Mobile-first layouts with touch targets of at least 44px.
- Visible focus states and reduced-motion support.
- No decorative redesigns when adapting the theme.

## Product roles

### Mudanzas en Mendoza
Editorial/local discovery layer: what exists and where.

### MudanzaPro
Planning/tool layer: what to do and how to prepare.

### Mudanzas Miranda
Commercial/provider layer: who will execute the move.

## Adoption rule

An adopting site MUST preserve its content model, route contract, SEO/canonical URL contract, product-specific primary CTA, analytics/lead persistence behavior, and existing technical QA gates.

Only the visual system and reusable presentation primitives are candidates for consolidation.

## QA contract

Automated gate: install/typecheck/build, runtime/no white screen, critical routes, navigation/mobile interaction, console errors, broken assets, technical accessibility and preview health.

Human gate: visual hierarchy, typography, spacing/density, imagery, brand expression, responsive visual behavior, cross-site consistency and commercial intent.

Pixel-perfect diff is evidence, not an automatic blocker.
