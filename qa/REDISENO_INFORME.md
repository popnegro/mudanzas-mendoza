# INFORME DE REDISEÑO INTEGRAL DE LOOK & FEEL
## Mudanzas Mendoza 2026 • Inspirado en Mudanzas Miranda

Este documento técnico y de diseño detalla la transformación del Look & Feel para **Mudanzas Mendoza 2026**, tomando como base e inspiración el sitio de referencia **Mudanzas Miranda** (`https://www.mudanzasmiranda.com.ar/`). El objetivo principal es elevar la experiencia visual y funcional a niveles premium, potenciando la conversión de prospectos (CRO), garantizando accesibilidad universal (WCAG AA), y asegurando el mejor rendimiento técnico posible sin replicar o infringir propiedad intelectual.

---

## 1. INFORME COMPARATIVO: SITIO ACTUAL VS. SITIO DE REFERENCIA

### Sitio Actual (`https://mudanzas-mendoza.vercel.app/`)
*   **Arquitectura y Estructura:** Centrado en una SPA fluida con sistema de rutas interno controlado por pestañas. Presenta múltiples secciones en una sola pantalla o vistas dinámicas dedicadas para departamentos, servicios, blog y planificador de mudanza.
*   **Identidad Visual:** Posee un estilo moderno con acentos ámbar y grises, pero carece de un anclaje corporativo de gran peso. Transmite digitalización rápida pero menor sensación de "infraestructura física tradicional".
*   **Tipografía y Espaciado:** Usa tipografía genérica sans-serif con tamaños de espaciados fijos que tienden a verse uniformes en pantallas ultra-wide.
*   **Llamados a la Acción (CTA):** Centrados en el cotizador dinámico de 8 pasos. Carece de señales visuales continuas de "confianza garantizada" a nivel del hero principal.
*   **Conversión (CRO):** Cuenta con popup de intención de salida (Exit Intent) y cotizador interactivo, pero con baja densidad de badges de pólizas de seguro e insignias de habilitación nacional.

### Sitio de Referencia (`https://www.mudanzasmiranda.com.ar/`)
*   **Sistema Visual:** Clásico, robusto, con un esquema de color azul marino corporativo de gran confiabilidad emparejado con amarillo/dorado vial e industrial. Transmite solidez física extrema, respaldo y trayectoria tradicional (más de 50 años).
*   **Grid y Composición:** Diseños tradicionales con bloques simétricos muy marcados, fotografía real de flota de camiones pesados y personal uniformado.
*   **Mood General:** "La empresa de mudanzas que tiene camiones propios de verdad". Brinda extrema seguridad de que los bienes estarán protegidos bajo seguros reales y conductores habilitados.
*   **Responsive:** Tradicional, adaptativo, con flujos lineales sencillos.

---

## 2. CONCLUSIONES DEL ANÁLISIS
La oportunidad dorada radica en **fusionar la agilidad interactiva y digital del Sitio Actual (con su cotizador inteligente y planificador por IA) con el peso corporativo de prestigio e infraestructura del Sitio de Referencia (Mudanzas Miranda)**. 
No copiaremos el diseño estático antiguo, sino que incorporaremos sus **principios de diseño**:
1.  **Confiabilidad Corporativa:** Badges de seguros visibles (Sancor Seguros), número de habilitación de CNRT y fotos reales de camiones Miranda de gran formato.
2.  **Alto Contraste y Claridad:** Uso de azul marino profundo para fondo y contenedores clave, combinado con textos limpios en blanco y acentos dorados ámbar que guían el ojo del usuario de manera inmediata a los CTA.
3.  **Composición con Ritmo Variable:** Transiciones sutiles y elevaciones de tarjetas que aumentan el engagement sin abrumar.

---

## 3. NUEVO CONCEPTO VISUAL: "CUYO PREMIUM TRUST"
El concepto visual se denomina **"Cuyo Premium Trust"**. Combina la serenidad del cielo y la cordillera mendocina (grises pizarra y azul marino profundo) con el color dorado-ámbar que simboliza la calidez del sol cuyano y la seguridad vial e industrial. La co-presencia de la imponente flota de camiones pesados de **Mudanzas Miranda** le otorga el respaldo físico definitivo a un ecosistema digital inteligente.

---

## 4. MOODBOARD REFERENCIAL
*   **Aero / Cordillera:** Fondos oscuros satinados en Slate y Navy que representan la solidez de la piedra y la cordillera de los Andes.
*   **Sol Mendocino / Seguridad:** Acentos dorado brillante y ámbar que irradian calor, energía y precisión técnica en advertencias, botones primarios y barras de progreso.
*   **Confianza Institucional:** Tipografía serif sutil en titulares o sans de altísimo contraste (Outfit) que se sienten limpios y sofisticados.
*   **Fuerza y Logística:** Imágenes de camiones Scania/Mercedes Benz impecables en tonos blancos y dorados, con choferes uniformados sonriendo.

---

## 5. PALETA DE COLORES (HEX & DESIGN SYSTEM)

| Rol del Color | Nombre Técnico | Modo Claro | Modo Oscuro | Propósito Visual |
| :--- | :--- | :--- | :--- | :--- |
| **Primary** | *Deep Navy Cuyo* | `#0f172a` | `#020617` | Fondo principal del sitio y encabezados |
| **Secondary** | *Amber Sun* | `#f59e0b` | `#fbbf24` | Botones de acción principal (CTA) e indicadores de éxito |
| **Accent** | *Emerald Secure* | `#10b981` | `#34d399` | Badges de póliza activa, cotizaciones exitosas y ticks |
| **Surface Base**| *Clean Slate* | `#ffffff` | `#0f172a` | Fondo de tarjetas y secciones interactivas |
| **Text Primary**| *Charcoal Deep* | `#0f172a` | `#f8fafc` | Lectura principal, títulos y párrafos de alta densidad |
| **Text Secondary**| *Mendoza Ash* | `#475569` | `#94a3b8` | Subtítulos, textos auxiliares y explicaciones |
| **Success Glow**| *Green Mint* | `#059669` | `#10b981` | Guardia activa 24hs, chats habilitados |

---

## 6. SISTEMA TIPOGRÁFICO
Utilizamos una escala tipográfica basada en variables CSS dinámicas y funciones `clamp()` para una excelente respuesta en mobile, tablet y desktop de forma fluida.

*   **Display / Titulares Principales (Outfit):**
    *   `font-family: 'Outfit', sans-serif;`
    *   `h1 (Hero): clamp(2.25rem, 5vw, 4.5rem); font-weight: 900; tracking: -0.025em;`
    *   `h2 (Secciones): clamp(1.75rem, 4vw, 2.75rem); font-weight: 800; tracking: -0.02em;`
*   **Lectura / Cuerpo de Texto (Inter):**
    *   `font-family: 'Inter', sans-serif;`
    *   `p (Cuerpo): clamp(0.875rem, 1.5vw, 1.125rem); font-weight: 400; line-height: 1.625;`
    *   `span (Auxiliar): 0.75rem (12px); font-weight: 500;`
*   **Metadatos e Indicadores (JetBrains Mono):**
    *   `font-family: 'JetBrains Mono', monospace;`
    *   `code / badges: 0.68rem (11px); font-weight: 700; tracking: 0.05em; text-transform: uppercase;`

---

## 7. SISTEMA DE COMPONENTES (DESIGN SYSTEM SPEC)

### A. Botones (Buttons)
*   **Primary CTA (Cotizador):** Fondo de degradado radial de `#f59e0b` a `#d97706`. Borde redondeado de `0.75rem` (`rounded-xl`). Sombra suave `shadow-amber-500/20` que se eleva ligeramente `hover:translate-y-[-2px] hover:shadow-lg` con transición de `150ms`.
*   **Secondary (Esquema Claro/Oscuro):** Fondo plano Slate con bordes marcados.
*   **Floating WhatsApp:** Círculo perfecto de `w-14 h-14` en verde esmeralda brillante (`bg-emerald-600`), con icono Lucide centrado, efecto radar pulsante infinito.

### B. Tarjetas (Cards)
*   **Card-Hover-Lift:** Esquinas redondeadas `rounded-2xl` (`1rem`). Borde sutil de `1px` en `#f1f5f9` (modo claro) y `#1e293b` (modo oscuro). Al pasar el cursor, se eleva `translate-y-[-4px]` con sombra difuminada de gran radio.
*   **Contenedor de Cotizador:** Fondo degradado en Slate profundo para mantener la legibilidad perfecta de todos los inputs numéricos y selects.

### C. Campos de Entrada (Inputs & Selects)
*   Bordes de `0.75rem` para concordar con los botones. Enfoque (`focus`) con borde ámbar brillante y anillo de resplandor del 10% de opacidad.

---

## 8. WIREFRAMES DE LAS SECCIONES CLAVE

### Wireframe: Hero Central (Desktop)
```
+-----------------------------------------------------------------------------------+
|  [Logo: 🚚 MENDOZA 2026]         Inicio  Servicios  Zonas  Blog  [Planificador IA] |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|   MUDANZAS PREMIUM EN MENDOZA                   +-----------------------------+   |
|   Líderes con la flota pesada                   | [Camión Mudanzas Miranda]   |   |
|   de Mudanzas Miranda.                          |                             |   |
|                                                 | Unidad habilitada CNRT      |   |
|   [Cotizar Ahora (CTA)]  [Llamar de Guardia]    | Póliza Sancor Seguros       |   |
|                                                 +-----------------------------+   |
|                                                                                   |
|   🛡️ Póliza de Sancor Seguros | ⭐ 4.9/5 Estrellas | 🕒 Servicio de Guardia Activa |
+-----------------------------------------------------------------------------------+
```

---

## 9. MOCKUPS DE ALTA FIDELIDAD (REPRESENTACIÓN EN CÓDIGO)
El código implementado en `src/components/Hero.tsx`, `src/components/PlannerLanding.tsx` y otros componentes utiliza clases de Tailwind precisas para dar vida a los mockups:
*   Fondo de transición suave `transition-colors duration-300` entre modo claro y oscuro.
*   Inclusión de badges premium con bordes brillantes y sutiles animaciones de pulso.
*   Muestra fidedigna del camión oficial Miranda con esquinas redondeadas y marcos oscuros.
*   Esquema de pasos del cotizador diseñado con selectores claros e iconos de apoyo para evitar fatiga cognitiva.

---

## 10. GUÍA DE ESTILOS RÁPIDA

```css
/* Bordes y Esquinas */
.rounded-premium { border-radius: 1rem; } /* 16px */
.rounded-btn { border-radius: 0.75rem; }  /* 12px */

/* Sombras */
.shadow-premium { box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.08); }
.shadow-premium-glow { box-shadow: 0 10px 30px -5px rgba(245, 158, 11, 0.15); }

/* Gradientes */
.bg-brand-gradient { background: linear-gradient(135deg, #0f172a 0%, #020617 100%); }
.bg-accent-gradient { background: linear-gradient(90deg, #f59e0b 0%, #d97706 100%); }
```

---

## 11. ESPECIFICACIONES PARA DESARROLLO FRONTEND
1.  **Imágenes de Alta Performance:** Usar siempre atributo `referrerPolicy="no-referrer"` y formatos de imagen modernos (como `.webp` u optimizados) para evitar bloqueos y demoras de carga.
2.  **Transiciones No Bloqueantes:** Utilizar `motion` de `motion/react` con transiciones de tipo `spring` o curvas cúbicas suaves de `easeOut` para el movimiento y rellenado de las barras de progreso.
3.  **Lazy Loading de Componentes:** Las vistas secundarias de aterrizaje (Landings de Departamentos) se renderizan de manera condicional mediante el enrutador reactivo del `App.tsx` para reducir la carga inicial del DOM.

---

## 12. CHECKLIST UX (EXPERIENCIA DE USUARIO)
*   [x] Los botones táctiles en dispositivos móviles miden al menos `44px` de alto.
*   [x] El cotizador interactivo tiene botones claros para volver al paso anterior ("Atrás") y no perder datos.
*   [x] El usuario cuenta con un feedback inmediato visual (micro-animaciones) al marcar una tarea como completada en el Planificador de Mudanzas con IA.
*   [x] Existe un botón "Volver al Inicio" visible y consistente en todas las subpáginas o landings.

---

## 13. CHECKLIST SEO (POSICIONAMIENTO ORGÁNICO)
*   [x] Estructura semántica de encabezados consistente (`h1` -> `h2` -> `h3`).
*   [x] Inyección dinámica en el `document.title` y la etiqueta `description` según la vista del usuario.
*   [x] Inyección del enlace canonical dinámico para evitar penalizaciones por contenido duplicado.
*   [x] Marcado estructurado Schema (JSON-LD) para las landings de servicio, departamentos y artículos de blog.

---

## 14. CHECKLIST ACCESIBILIDAD (WCAG AA)
*   [x] El contraste de color entre el texto y el fondo supera siempre el ratio de `4.5:1` en todas las pantallas.
*   [x] Los modales de salida e inputs son navegables mediante la tecla Tab y pueden cerrarse presionando la tecla `Escape`.
*   [x] Todos los campos de entrada y selects tienen etiquetas descriptivas e `id` únicos asociados.
*   [x] Las imágenes informativas disponen de textos alternativos descriptivos (`alt`).

---

## 15. CHECKLIST PERFORMANCE & CORE WEB VITALS
*   [x] Sin saltos de diseño molestos (CLS - Cumulative Layout Shift) gracias al uso de tamaños fijos de contenedores de imágenes y espaciados estables.
*   [x] Respuestas instantáneas en clicks del menú móvil y cambio de pestañas.
*   [x] Código optimizado libre de librerías de estilos pesadas o redundantes.
*   [x] Linter y TypeScript compilando perfectamente al 100%.
