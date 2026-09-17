# Actions reutilizables del ecosistema

`theme-mudanzas` es la fuente de workflows reutilizables para los repositorios que adopten el theme.

## Lighthouse CI

Desde un repositorio consumidor se puede invocar el workflow sin copiar la implementación:

```yaml
name: Lighthouse Preview

on:
  workflow_dispatch:
    inputs:
      preview_url:
        description: 'URL pública del Preview'
        required: true
        type: string

jobs:
  lighthouse:
    uses: popnegro/mudanzas-mendoza/.github/workflows/reusable-lighthouse.yml@theme-mudanzas
    with:
      preview_url: ${{ inputs.preview_url }}
```

### Contrato

- `preview_url`: obligatorio; debe ser una URL pública y estable durante el job.
- Node.js: 22.
- Lighthouse: `treosh/lighthouse-ci-action@v12`.
- 3 ejecuciones por defecto.
- Thresholds iniciales en modo `warn`, para no bloquear el primer baseline.

## Regla de adopción

Los repos consumidores deben **referenciar** estos workflows en lugar de duplicar su implementación. Si una mejora afecta a todo el ecosistema, se corrige primero aquí y luego los consumidores pueden actualizar la referencia.

## Versionado

Durante la consolidación se referencia `@theme-mudanzas`. Antes de propagar a producción se recomienda crear una referencia estable (tag o branch de release) para evitar que un cambio experimental del theme modifique CI de los sitios consumidores sin revisión.
