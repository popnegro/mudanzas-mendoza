#!/bin/bash

# ==========================
# CONFIGURACIÓN
# ==========================
TEMPLATE="template-departamento-avanzado.html"
OUTPUT_DIR="departamentos"
WHATSAPP_LINK="https://wa.me/549XXXXXXXXXX"

mkdir -p "$OUTPUT_DIR"

# ==========================
# FUNCIÓN GENERADORA
# ==========================
generate_page () {

  SLUG="$1"
  DEP="$2"

  FILE="$OUTPUT_DIR/$SLUG.html"

  sed \
    -e "s|{{TITLE}}|Mudanzas en $DEP Mendoza | Mudanzas Miranda|g" \
    -e "s|{{DESCRIPTION}}|Mudanzas profesionales en $DEP Mendoza. Presupuesto gratis y servicio confiable.|g" \
    -e "s|{{KEYWORDS}}|Mudanzas Miranda $DEP, mudanzas en $DEP Mendoza, empresa de mudanzas $DEP|g" \
    -e "s|{{H1}}|Mudanzas en $DEP Mendoza|g" \
    -e "s|{{HERO_TEXT}}|Servicio profesional de mudanzas en $DEP. Traslados seguros y organizados.|g" \
    -e "s|{{CTA_HERO}}|Solicitar presupuesto gratis|g" \
    -e "s|{{BENEFITS_TITLE}}|¿Por qué elegir Mudanzas Miranda en $DEP?|g" \
    -e "s|{{BENEFIT_1}}|Presupuesto sin cargo|g" \
    -e "s|{{BENEFIT_2}}|Personal capacitado y flota propia|g" \
    -e "s|{{BENEFIT_3}}|Embalaje profesional|g" \
    -e "s|{{BENEFIT_4}}|Experiencia en mudanzas locales|g" \
    -e "s|{{SERVICE_TITLE}}|Servicio de mudanzas en $DEP|g" \
    -e "s|{{SERVICE_TEXT}}|Realizamos mudanzas particulares y comerciales en $DEP con planificación, cuidado y cumplimiento.|g" \
    -e "s|{{FAQ_TITLE}}|Preguntas frecuentes sobre mudanzas en $DEP|g" \
    -e "s|{{FAQ_Q1}}|¿Realizan mudanzas en $DEP?|g" \
    -e "s|{{FAQ_A1}}|Sí, realizamos mudanzas locales en $DEP y traslados a otros puntos de Mendoza.|g" \
    -e "s|{{FAQ_Q2}}|¿El presupuesto de mudanza es gratuito?|g" \
    -e "s|{{FAQ_A2}}|Sí, el presupuesto de mudanza es totalmente gratuito.|g" \
    -e "s|{{FAQ_Q3}}|¿Incluyen embalaje y protección?|g" \
    -e "s|{{FAQ_A3}}|Sí, protegemos muebles, electrodomésticos y objetos frágiles.|g" \
    -e "s|{{CTA_TITLE}}|Solicite su presupuesto de mudanza en $DEP|g" \
    -e "s|{{CTA_TEXT}}|Atención rápida, precios competitivos y servicio profesional.|g" \
    -e "s|{{CTA_BUTTON}}|Hablar por WhatsApp|g" \
    -e "s|{{CTA_LINK}}|$WHATSAPP_LINK|g" \
    -e "s|{{FOOTER_TEXT}}|Mudanzas en $DEP, Mendoza|g" \
    "$TEMPLATE" > "$FILE"

  echo "✔ Generado: $FILE"
}

# ==========================
# LISTA DE DEPARTAMENTOS
# ==========================
DEPARTAMENTOS=(
  "capital-mendoza|Capital Mendoza"
  "godoy-cruz|Godoy Cruz"
  "guaymallen|Guaymallén"
  "las-heras|Las Heras"
  "lujan-de-cuyo|Luján de Cuyo"
  "maipu|Maipú"
  "lavalle|Lavalle"
  "san-martin|San Martín"
  "rivadavia|Rivadavia"
  "junin|Junín"
  "santa-rosa|Santa Rosa"
  "la-paz|La Paz"
  "tupungato|Tupungato"
  "tunuyan|Tunuyán"
  "san-carlos|San Carlos"
  "san-rafael|San Rafael"
  "general-alvear|General Alvear"
  "malargue|Malargüe"
)

# ==========================
# EJECUCIÓN
# ==========================
for DEP in "${DEPARTAMENTOS[@]}"; do
  SLUG="${DEP%%|*}"
  NAME="${DEP##*|}"
  generate_page "$SLUG" "$NAME"
done

echo "🚀 Landings generadas correctamente."
