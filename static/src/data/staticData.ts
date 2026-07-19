import { Service, FAQItem, Testimonial, BlogArticle } from "../types";

export const services: Service[] = [
  {
    id: "mudanzas-residenciales",
    title: "Mudanzas Residenciales",
    shortTitle: "Residenciales",
    description:
      "Servicios de mudanzas completas para casas, departamentos, dúplex y barrios privados. Equipos con peones expertos, estiba profesional y pólizas activas.",
    longDescription:
      "Una mudanza residencial es mucho más que mover cajas: es trasladar tu historia, tu esfuerzo y tus sueños. En Mudanzas Mendoza nos especializamos en hacer de esta transición un proceso cómodo, seguro y libre de estrés. Ofrecemos soluciones llave en mano adaptadas a la envergadura de tu hogar, ya sea una casa amplia, un departamento céntrico o una residencia en barrios privados. Nuestro personal experto se encarga del embalaje cuidadoso de vajilla y cristalería delicada, la envoltura de sillones en film protector, el desarme y armado de placares o camas, y la carga/descarga con estiba profesionalizada para que nada sufra rozaduras en tránsito. Operamos con camiones furgonados modernos y limpios, y cada servicio viaja respaldado por un seguro de carga integral suscrito con aseguradoras líderes del mercado.",
    benefits: [
      "Suministro gratuito de canastos plásticos rígidos sanitizados para proteger tu vajilla.",
      "Personal propio y uniformado con ART activa, capacitado para ingresos a barrios cerrados exigentes.",
      "Póliza de seguro civil de carga que cubre tus bienes desde la puerta de origen hasta el destino final.",
    ],
    icon: "Home",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
    alt: "Living luminoso con cajas de mudanza y muebles embalados con film alveolar.",
    ctaText: "Cotizar Mudanza Residencial",
  },
  {
    id: "transporte-de-muebles",
    title: "Transporte de Muebles",
    shortTitle: "Muebles",
    description:
      "Traslado especializado de mobiliario de todo tipo. Camas, sillones, mesas de algarrobo, placares pesados y vajilleros delicados.",
    longDescription:
      "Mover un mueble no es solo cargarlo al camión. Las maderas finas, los sillones de tela clara y los vidrios templados requieren técnicas de estiba adecuadas. En Mudanzas Mendoza protegemos cada mueble envolviéndolo en film stretch y utilizando mantas acolchadas de alta densidad dentro del furgón. Aseguramos el cargamento con fajas de sujeción profesionales para evitar cualquier roce durante el viaje.",
    benefits: [
      "Mantas de algodón de alta resistencia para amortiguar cualquier roce",
      "Servicio experto de desarme y posterior armado en el nuevo domicilio",
      "Personal entrenado para mover objetos pesados por escaleras complejas",
    ],
    icon: "Package",
    image:
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=800",
    alt: "Transporte de muebles y sillones protegidos con mantas especiales",
    ctaText: "Transportar Muebles",
  },
  {
    id: "traslado-de-offices",
    title: "Traslado de Oficinas",
    shortTitle: "Oficinas",
    description:
      "Mudanzas corporativas ágiles. Nos adaptamos a tus horarios para que tu empresa o local comercial no deje de operar ni un solo minuto.",
    longDescription:
      "Para una empresa, estar inactiva por mudanza es perder plata. Por eso, planificamos las mudanzas corporativas al detalle: rotulamos cajas, protegemos servidores, equipos informáticos sensibles, escritorios y archivos confidenciales. Coordinamos el traslado en horarios no laborables (como sábados por la tarde o domingos completos) para que tu oficina esté 100% operativa el lunes por la mañana.",
    benefits: [
      "Facturación formal Tipo A o B para rendición imprevista",
      "Embalaje especial antiestático para computadoras, impresoras y servidores",
      "Operativos rápidos de fin de semana para no detener la productividad",
    ],
    icon: "Briefcase",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
    alt: "Mobiliario de oficina y puestos de trabajo embalados para transporte comercial",
    ctaText: "Planificar Mudanza Comercial",
  },
  {
    id: "guardamuebles-mendoza",
    title: "Guardamuebles en Mendoza",
    shortTitle: "Guardamuebles",
    description:
      "Depósitos limpios, herméticos e independientes para resguardar tus muebles de forma temporal o prolongada. Monitoreo las 24 horas.",
    longDescription:
      "Ya sea que estés remodelando tu casa, esperando la entrega de tu nuevo departamento o de viaje por trabajo, nuestro servicio de guardamuebles en Mendoza te ofrece la solución perfecta. Disponemos de depósitos individuales, secos y completamente cerrados que previenen el ingreso de polvo, humedad o agentes nocivos. Todo el predio cuenta con monitoreo por cámaras de seguridad las 24 horas, alarmas perimetrales conectadas a central de policía, control periódico de plagas y seguro total de incendio y robo suscrito con Sancor Seguros. Vos guardás tus pertenencias y las retirás cuando quieras, con total flexibilidad de pago mensual o diario sin plazos forzosos.",
    benefits: [
      "Predio cerrado con vigilancia física, cerco eléctrico perimetral y cámaras 24/7.",
      "Estiba profesional sobre pallets de madera maciza para aislar de la humedad del suelo.",
      "Contratos de alquiler flexibles por días, semanas o meses, adaptados a tu presupuesto real.",
    ],
    icon: "Warehouse",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
    alt: "Depósito de guardamuebles limpio con unidades de almacenamiento seguras",
    ctaText: "Reservar Espacio Guardamuebles",
  },
  {
    id: "embalaje-y-desarme",
    title: "Embalaje y Desarme",
    shortTitle: "Embalaje",
    description:
      "Protección premium con film stretch, plástico de burbujas (pluribol) y mantas acolchadas. Desarmamos y rearmamos tus muebles al instante.",
    longDescription:
      "El secreto de una mudanza exitosa, libre de rayones o golpes fortuitos, reside enteramente en la calidad del embalaje previo. Nuestro equipo de operarios embaladores profesionales asiste a tu domicilio provisto de materiales premium: film stretch de alta resistencia, plástico de burbujas (pluribol) de gran densidad, esquineros de cartón prensado y cintas adhesivas de alto agarre. Envolvemos cada televisor, espejo, electrodoméstico y adorno delicado con capas protectoras. Además, desarmamos placares complejos, modulares de sala, camas de dos plazas o cunas de bebé, guardando la tornillería y los herrajes en bolsas etiquetadas independientes para que el armado en tu nuevo hogar sea rápido, limpio y perfecto.",
    benefits: [
      "Materiales de calidad profesional que no dejan marcas ni residuos de pegamento en tus muebles.",
      "Operarios calificados con conocimientos de carpintería para desarmar y rearmar todo sin daños.",
      "Cajas rotuladas de alta resistencia y clasificación por colores según el ambiente de destino.",
    ],
    icon: "Shield",
    image:
      "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&q=80&w=800",
    alt: "Embalaje profesional de muebles con film stretch y plástico de burbuja",
    ctaText: "Contratar Embalaje y Desarme",
  },
  {
    id: "izamientos-y-altura",
    title: "Izamientos y Altura",
    shortTitle: "Altura",
    description:
      "Subida y bajada de sillones, heladeras y muebles de gran porte por balcones y ventanas del exterior mediante poleas, arneses y sogas de alta resistencia.",
    longDescription:
      "En muchos edificios del centro de Mendoza Capital, Godoy Cruz y Guaymallén, los ascensores son pequeños o las escaleras son estrechas y sinuosas para subir sillones amplios, heladeras de doble puerta, mesas de madera maciza o pianos de cola. Para estos casos, ofrecemos nuestro servicio de izamiento profesional por el exterior. Disponemos de un equipo técnico entrenado en trabajos de altura, provisto de poleas de alta carga, sogas de alpinismo certificadas, fajas acolchadas anti-roce y arneses de seguridad homologados, garantizando un ascenso o descenso impecable y libre de riesgos tanto para el mueble como para la propiedad.",
    benefits: [
      "Técnicos certificados provistos de seguros de accidentes personales y ART activa.",
      "Envoltura súper reforzada y acolchada de los bultos para resistir cualquier contacto exterior.",
      "Póliza de seguro con cobertura especial de responsabilidad civil para operaciones de altura.",
    ],
    icon: "ArrowUpCircle",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800",
    alt: "Izamiento seguro de sommier y sofás por balcón del edificio",
    ctaText: "Consultar Izamientos",
  },
  {
    id: "mudanzas-urgentes",
    title: "Mudanzas Urgentes",
    shortTitle: "Urgentes",
    description:
      "¿Surgió un imprevisto y necesitás mudarte hoy mismo? Contamos con equipos de guardia listos para darte una solución inmediata.",
    longDescription:
      "Sabemos que a veces la vida te pone en situaciones inesperadas donde necesitás desocupar un lugar o trasladarte de inmediato. No te desesperes. Contamos con camiones y ayudantes de guardia para mudanzas exprés. Llámanos o escribinos, coordinamos el precio y en poco tiempo tenemos el camión en la puerta para resolver tu apuro con total profesionalismo.",
    benefits: [
      "Respuesta telefónica y por WhatsApp ultra veloz en minutos",
      "Ayudantes de carga listos para embalar de urgencia",
      "Soluciones logísticas inmediatas para inquilinos y comercios",
    ],
    icon: "Clock",
    image:
      "https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=800",
    alt: "Camión de mudanzas exprés listo para flete de urgencia",
    ctaText: "Solicitar Mudanza Urgente",
  },
  {
    id: "mudanzas-24-horas",
    title: "Mudanzas 24 Horas",
    shortTitle: "24 Horas",
    description:
      "Mudanzas sin límites de horario. Traslados nocturnos y de fin de semana para acomodarnos a tus tiempos libres.",
    longDescription:
      "¿Salís tarde de trabajar? ¿La administración de tu edificio solo permite mudanzas los domingos? ¿Querés evitar el calor agobiante del mediodía mendocino en verano? Ofrecemos servicio flexible las 24 horas del día. Mudate de noche o de madrugada de manera segura y súper discreta, coordinando el horario óptimo para vos.",
    benefits: [
      "Máxima flexibilidad horaria para clientes ocupados",
      "Ideal para evitar el congestionamiento del tránsito en horas pico",
      "Coordinación directa para fletes nocturnos residenciales o de carga",
    ],
    icon: "Calendar",
    image:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=800",
    alt: "Camión de mudanzas brindando servicios nocturnos las 24 horas",
    ctaText: "Coordinar Mudanza Nocturna",
  },
];

export const blogArticles: BlogArticle[] = [
  {
    id: "como-organizar-una-mudanza",
    title: "Cómo organizar una mudanza en Mendoza sin volverte loco",
    slug: "como-organizar-una-mudanza",
    summary:
      "La guía definitiva escrita por mendocinos. Checklist paso a paso para ordenar tus cajas, dar de baja servicios y mudarte con total tranquilidad.",
    content: `## Planificar es la clave: Mudar de casa con una sonrisa

Mudar de casa suele encabezar las listas de situaciones más estresantes. Sin embargo, con un poco de método y un par de termos de mate, podés convertirlo en un proceso súper ordenado. Acá tenés la guía definitiva que aplicamos en Mendoza para que tu mudanza sea un éxito rotundo.

### 1. Empezá con 30 días de anticipación (La limpieza previa)
El mayor error es embalar cosas que ya no usás. Un mes antes de la mudanza, hacé una limpieza profunda de tus ambientes:
* **Doná o regalá** ropa que lleve más de un año guardada en el placard.
* **Vendé** esos muebles que no encajan en tu nuevo departamento de la Quinta Sección o Godoy Cruz.
* **Tirá** lo roto o inservible. Recordá: *menos peso equivale a un presupuesto de flete más barato*.

### 2. Conseguir cajas de buena calidad
No escatimes en cajas. Podés comprarlas o pedirlas en comercios amigos de tu barrio. Buscá cajas de cartón corrugado grueso:
* **Cajas chicas:** para libros, platos, vajilla pesada (así no quedan imposibles de levantar).
* **Cajas medianas y grandes:** para ropa de cama, ollas, juguetes y objetos livianos.
* **Cinta de embalar ancha:** comprate al menos tres rollos. La cinta común de librería se despega con facilidad.

### 3. El arte de rotular las cajas
Escribí con un fibrón grueso negro en los costados de cada caja (no arriba, porque al apilarlas no vas a poder leerlo):
* El **ambiente** al que va (ej: "Cocina", "Pieza Principal", "Baño").
* Un resumen de lo que contiene (ej: "Platos cotidianos y vasos").
* Si contiene copas, platos o vidrios, escribí en grande: **¡FRÁGIL!**

### 4. La "Caja de Supervivencia" para el primer día
Este es el tip de oro que nos agradecen siempre todos los clientes. Armá una caja o mochila especial que lleves con vos en tu auto o encima del camión, con lo indispensable para las primeras 24 horas:
* Cepillos de dientes, toallas chicas y rollo de papel higiénico.
* Un juego de sábanas para cada cama que se vaya a usar la primera noche.
* El cargador de los teléfonos celulares.
* Un termo para el mate, yerba, azúcar y un par de tazas.
* Un destornillador, una pinza y curitas por las dudas.

### 5. Contratá una empresa habilitada y de confianza
No dejes tus pertenencias de toda la vida en manos de cualquiera con una camioneta destartalada. Exigí que el servicio cuente con seguro de carga civil y ayudantes experimentados que conozcan el oficio. En **Mudanzas Mudanzas Mendoza** nos caracterizamos por la puntualidad mendocina: llegamos a horario, cuidamos tus esquinas al pasar muebles y te saludamos con una sonrisa.`,
    date: "2026-06-25",
    author: "Luis Grasso",
    category: "Consejos de Mudanza",
    readTime: "5 min de lectura",
    keywords: [
      "como organizar una mudanza",
      "checklist mudanza mendoza",
      "consejos fletes mendoza",
    ],
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "como-embalar-una-heladera",
    title: "Cómo embalar una heladera de forma correcta y evitar roturas",
    slug: "como-embalar-una-heladera",
    summary:
      "La heladera es el electrodoméstico más delicado de la mudanza. Aprendé paso a paso cómo descongelarla, protegerla y cuándo volver a enchufarla.",
    content: `## El manual definitivo para mudar tu heladera sin romperla

La heladera es el corazón de la cocina y, lamentablemente, uno de los electrodomésticos que más sufre las mudanzas si no se toman los recaudos necesarios. Su motor (motocompresor), las tuberías de gas y los estantes de vidrio templado corren peligro si se mueven a lo bruto. 

Seguí este instructivo paso a paso elaborado por nuestros fletistas expertos para que tu heladera llegue enfriando al 100% a tu nuevo hogar en Maipú, Guaymallén o donde sea:

### Paso 1: Desocupar y descongelar (24 horas antes)
Nunca intentes mudar una heladera encendida o que acabe de apagarse:
* **Vaciá todo el contenido:** consumí o regalá los alimentos perecederos los días previos.
* **Desenchufala 24 horas antes:** de esta forma, el hielo del freezer se derretirá por completo.
* **Secala bien:** usá un trapo seco para eliminar toda la humedad interior y evitar malos olores o moho.

### Paso 2: Retirar y guardar los accesorios internos
Los estantes de vidrio, cajones de plástico y hueveras sueltas van a golpearse y romperse con el movimiento del camión:
* **Retirá todo el interior:** estantes, rejillas, cajones de verduras y estantes de la puerta.
* **Embalalos por separado:** envolvé los estantes de vidrio templado en papel de diario o film de burbujas y ponelos en una caja rotulada como "Accesorios Heladera - Frágil".

### Paso 3: Asegurar las puertas
Durante el acarreo por pasillos o escaleras, las puertas pueden abrirse repentinamente, descuajaringando las bisagras o golpeando las paredes:
* **Cerrá las puertas firmemente.**
* **Sujetalas** dando tres o cuatro vueltas de film stretch industrial alrededor de toda la heladera. Evitá usar cintas de embalar adhesivas directamente sobre la chapa de la heladera, ya que el pegamento puede arruinar la pintura o dejar marcas pegajosas horribles de sacar.

### Paso 4: La envoltura protectora exterior
Una vez cerradas las puertas, dale una capa extra de protección:
* Cubrí la heladera con mantas acolchadas o cartón corrugado en las esquinas.
* Volvé a dar vueltas de film stretch para fijar las mantas. Esto evitará rayones en la pintura si roza alguna pared en pasillos angostos.

### Paso 5: El traslado (¡Siempre vertical!)
* **Nunca traslades la heladera acostada.** Al acostar una heladera, el aceite del compresor puede fluir por las tuberías del sistema de enfriamiento. Si al levantarla se enciende, el motor puede clavarse o dejar de enfriar de por vida.
* En nuestros camiones de Mudanzas Mudanzas Mendoza, las heladeras viajan **siempre de pie**, sujetas contra el lateral del furgón con fajas de amarre tipo crique profesionales.

### Paso 6: El reencendido (La regla de oro de las 4 horas)
Cuando la heladera llegue a tu nueva casa:
* **NO LA ENCHUFES DE INMEDIATO.** Dejala reposar en su posición definitiva durante al menos **4 horas** (si el viaje fue largo o por calles movidas, mejor dejala 12 horas). Esto permite que el aceite vuelva a bajar por gravedad al compresor y el gas se estabilice.
* Pasado ese tiempo, enchufala y dejala funcionar vacía por un par de horas antes de meter comida nueva.`,
    date: "2026-07-02",
    author: "Equipo Técnico Mendoza",
    category: "Embalaje de Electrodomésticos",
    readTime: "4 min de lectura",
    keywords: [
      "como embalar una heladera",
      "mudar heladera mendoza",
      "fletes electrodomesticos mendoza",
    ],
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "cuanto-cuesta-una-mudanza",
    title: "¿Cuánto cuesta una mudanza en Mendoza en 2026?",
    slug: "cuanto-cuesta-una-mudanza",
    summary:
      "Analizamos cómo se calculan las tarifas de fletes y mudanzas en Mendoza. Distancia, ayudantes, volumen y cómo ahorrar hasta un 30% en tu presupuesto.",
    content: `## Guía de precios transparente: Sin sorpresas al final del viaje

Una de las preguntas más frecuentes al cambiar de casa es: **"¿Y cuánto me va a salir?"**. La falta de claridad en los precios de algunos fleteros informales genera desconfianza y sorpresas desagradables al momento de pagar. 

En esta nota te contamos de forma súper sincera cómo se compone el precio de una mudanza en Mendoza en este año 2026 y cómo podés hacer para economizar al máximo.

### Los 4 factores que definen el precio de tu mudanza

1. **El volumen de la carga (Tamaño del vehículo):**
   No es lo mismo mover una cama y un ropero en una camioneta chica que mudar una casa de 4 ambientes con electrodomésticos, sillones y mesa de pool en un camión con furgón grande. El tamaño del vehículo determina la tarifa base.

2. **La distancia recorrida (Origen y Destino):**
   Las mudanzas locales dentro de un mismo departamento (ej. flete de Godoy Cruz a Godoy Cruz) suelen ser las más baratas. Si cruzamos varios departamentos (ej. desde Las Heras hasta Luján de Cuyo) o hacemos viajes de media distancia (ej. Mendoza a San Rafael o Valle de Uco), el valor se calcula sumando el costo de combustible y peajes por kilómetro.

3. **La cantidad de peones/ayudantes necesarios:**
   Si tenés amigos o familiares jóvenes que te den una mano para cargar y descargar, podés contratar solo el camión con chofer (la opción más económica). Si preferís no romperte la espalda levantando muebles, incluimos 1, 2 o hasta 3 ayudantes de carga profesionales.

4. **Complejidad de los accesos (Escaleras y pisos altos):**
   Subir o bajar cosas por ascensor o escalera tiene costos asociados. Si hay que subir un sommier de dos plazas por 5 pisos de escalera caracol de un edificio céntrico, requiere mayor esfuerzo físico, sogas especiales y tiempo extra.

---

### Estimaciones orientativas de tarifas en Mudanzas Mendoza

* **Flete Simple (Camioneta chica, chofer solo, distancia corta):** Ideal para mover una heladera, una cama desarmada o compras. Tarifa súper económica.
* **Mudanza Estándar Monoambiente/1 Ambiente (Furgón mediano + 1 ayudante):** Perfecto para mudanzas de jóvenes que alquilan.
* **Mudanza Familiar (Camión grande + 2 ayudantes, casa de 2-3 dormitorios):** El servicio completo, ideal para familias. Incluye mantas protectoras y carga/descarga completa.

*Nota: Te sugerimos usar nuestro **Cotizador Inteligente** interactivo en la Home para obtener un presupuesto exacto adaptado a tus necesidades específicas.*

---

### Tips de oro para ahorrar hasta un 30% en tu mudanza

* **Desarmá todo lo que puedas por tu cuenta:** Camas, mesas, escritorios. Si lo hacés vos antes de que llegue el camión, los ayudantes cargan más rápido y ahorrás tiempo de servicio.
* **Embalá en cajas chicas y pesadas, grandes y livianas:** Evitá armar cajas enormes repletas de libros porque se van a romper del fondo o van a requerir dos personas para levantarlas.
* **Elegí días de menor demanda:** Los fines de semana (sábados y domingos) y los primeros o últimos días de cada mes (coincidiendo con los contratos de alquiler) son los días de mayor movimiento. Si tenés flexibilidad para mudarte a mitad de mes un día martes o miércoles, podés conseguir mejores tarifas.`,
    date: "2026-07-05",
    author: "Asesor Comercial Mudanzas Mendoza",
    category: "Presupuestos y Tarifas",
    readTime: "6 min de lectura",
    keywords: [
      "cuanto cuesta una mudanza mendoza",
      "precios fletes mendoza",
      "tarifas fletes Mudanzas Mendoza",
    ],
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
  },
];

export const faqs: FAQItem[] = [
  {
    id: "1",
    question: "¿Con cuánta anticipación debo reservar la mudanza?",
    answer:
      "Te recomendamos reservar con al menos 5 a 7 días de anticipación, sobre todo si pensás mudarte un fin de semana o a fin de mes. Si te surgió una urgencia, igual escribinos porque contamos con camiones de guardia.",
  },
  {
    id: "2",
    question: "¿Qué incluye el servicio de mudanza estándar?",
    answer:
      "Incluye el camión furgón desinfectado, chofer profesional, seguro básico de traslado y las fajas/mantas protectoras para los muebles. Podés adicionarle el servicio de embalaje completo y ayudantes de carga/descarga.",
  },
  {
    id: "3",
    question: "¿Cómo protegen mis pertenencias más valiosas?",
    answer:
      "Envolvemos muebles delicados, vajilla y electrodomésticos en plástico de burbujas, mantas de embalaje especiales y film stretch industrial. Todo viaja atado de forma independiente en el camión.",
  },
  {
    id: "4",
    question: "¿Tienen factura y seguro de carga?",
    answer:
      "Sí, somos una empresa formal. Emitimos facturas para empresas y particulares (ideal para mudanzas corporativas o subsidios de mudanza). Todos nuestros viajes viajan cubiertos por un seguro de carga ante cualquier eventualidad.",
  },
  {
    id: "5",
    question: "¿Hacen mudanzas interprovinciales desde Mendoza?",
    answer:
      "Sí. Llevamos tus cosas desde Mendoza a cualquier rincón de la Argentina (Buenos Aires, Córdoba, Santa Fe, San Luis, San Juan, Neuquén, etc.) en modalidad directa (camión exclusivo) o compartida para abaratar costos.",
  },
  {
    id: "6",
    question:
      "¿Cuál es la relación de Mudanzas Mudanzas Mendoza con Mudanzas Miranda?",
    answer:
      "Mudanzas Mudanzas Mendoza es la división digital premium y producto oficial de Mudanzas Miranda (www.mudanzasmiranda.com.ar). Esta alianza estratégica te garantiza el respaldo de más de 50 años de impecable trayectoria en la región de Cuyo, una flota masiva de camiones de gran porte habilitados, pólizas certificadas de Sancor Seguros, y la innovación de un cotizador automatizado y planificador de mudanzas inteligente asistido por IA.",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    author: "Mariana Galdame",
    role: "Mudanza Residencial (Ciudad de Mendoza)",
    rating: 5,
    content:
      "Excelente servicio de principio a fin. Los chicos llegaron súper puntuales, embalaron todo el living con un cuidado increíble y subieron todo por escalera sin un solo raspón. Muy educados y eficientes. ¡Súper recomendados!",
    date: "Hace 2 semanas",
  },
  {
    id: "test-2",
    author: "Esteban Corvalán",
    role: "Mudanza de Oficina (Godoy Cruz a Chacras)",
    rating: 5,
    content:
      "Teníamos que mudar una oficina de desarrollo con monitores y servidores delicados. Hicieron un embalaje impecable con plástico burbuja doble y rotulado estricto. Cumplieron los tiempos a rajatabla y al día lunes ya estábamos operando sin problemas.",
    date: "Hace 1 mes",
  },
  {
    id: "test-3",
    author: "Florencia Benítez",
    role: "Mudanza de Larga Distancia (San Rafael a Córdoba)",
    rating: 5,
    content:
      "Elegí el servicio de mudanza combinada a Córdoba y el precio fue excelente. Me mantuvieron informada de todo el viaje por WhatsApp. Todo llegó impecable, en la fecha acordada y con un trato súper cálido por parte de los cargadores.",
    date: "Hace 3 meses",
  },
  {
    id: "test-4",
    author: "Andrés Manzano",
    role: "Mudanza de Casa (Maipú)",
    rating: 5,
    content:
      "Un equipo sumamente profesional. Armaron y desarmaron las camas matrimoniales y un placard gigante con total rapidez. Tienen herramientas adecuadas y un trato excelente. Una tranquilidad enorme haberlos contratado.",
    date: "Hace 2 meses",
  },
];
