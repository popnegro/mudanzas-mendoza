#!/bin/bash

# Archivo base
TEMPLATE="template-departamento.html"

# Carpeta destino
OUTPUT_DIR="departamentos"

# Crear carpeta si no existe
mkdir -p $OUTPUT_DIR

# Lista de departamentos (slug|Nombre real)
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

# Generación automática
for DEP in "${DEPARTAMENTOS[@]}"; do
  SLUG="${DEP%%|*}"
  NAME="${DEP##*|}"

  OUTPUT_FILE="$OUTPUT_DIR/$SLUG.html"

  sed "s/DEPARTAMENTO/$NAME/g" "$TEMPLATE" > "$OUTPUT_FILE"

  echo "Generado: $OUTPUT_FILE"
done

echo "Proceso finalizado. Landings creadas correctamente."
