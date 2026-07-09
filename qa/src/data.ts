import { DepartmentInfo, ServiceInfo, BlogArticle } from './types';

export const DEPARTMENTS: DepartmentInfo[] = [
  {
    id: 'mendoza-capital',
    name: 'Ciudad de Mendoza (Capital)',
    slug: 'mendoza-capital',
    seo: {
      title: 'Mudanzas en Mendoza Capital | Fletes y Traslados al Instante',
      description: 'Hacé tu mudanza en Mendoza Capital sin estrés. Servicio de fletes rápidos en el centro y secciones. ¡Cotizá al toque con nuestro asistente!',
      keywords: ['mudanzas mendoza capital', 'fletes mendoza capital', 'fletes economicos mendoza', 'empresas de mudanzas mendoza'],
      h1: 'Mudanzas y Fletes en Mendoza Capital'
    },
    description: 'Servicio premium de traslados en el microcentro y secciones de la Ciudad de Mendoza. Nos conocemos cada calle, acequia y edificio con o sin ascensor.',
    content: 'Mudarle la casa a una familia en el centro de Mendoza requiere experiencia: esquivar las zonas de estacionamiento medido, conocer el horario de carga y descarga, y saber cómo subir un mueble pesado por escaleras estrechas de departamentos antiguos. En Mudanzas Mendoza 2026 cuidamos tus cosas como si fueran nuestras. Contamos con habilitaciones municipales completas y seguro de carga para que te quedes totalmente tranquilo.',
    highlightItems: [
      'Atención rápida en las 1ra, 2da, 3ra, 4ta, 5ta y 6ta Sección',
      'Desarme y armado de placares y camas incluido en el servicio premium',
      'Fletes al instante para traslados chicos o compras de muebles'
    ],
    faqs: [
      {
        question: '¿Tienen restricciones de horario en la Ciudad de Mendoza?',
        answer: 'Coordinamos las mudanzas respetando las normas de tránsito municipales del microcentro. Habitualmente operamos temprano por la mañana o los fines de semana para evitar el tránsito pesado.'
      },
      {
        question: '¿Qué pasa si vivo en un depto de la Quinta Sección sin ascensor?',
        answer: '¡No hay drama! Nuestro equipo cuenta con sogas y arneses profesionales para subir o bajar muebles por el exterior de forma segura.'
      }
    ],
    localFrecuentes: ['Plaza Independencia', 'Parque General San Martín', 'Paseo Sarmiento', 'Arístides Villanueva']
  },
  {
    id: 'godoy-cruz',
    name: 'Godoy Cruz',
    slug: 'godoy-cruz',
    seo: {
      title: 'Mudanzas en Godoy Cruz | Fletes Rápidos y Económicos',
      description: '¿Buscás fletes o mudanzas en Godoy Cruz? Traslados de casas, oficinas y departamentos. Presupuesto personalizado en el acto.',
      keywords: ['mudanzas godoy cruz', 'fletes godoy cruz', 'flete economico godoy cruz', 'traslado de muebles godoy cruz'],
      h1: 'Servicios de Mudanzas en Godoy Cruz'
    },
    description: 'Mudate fácil en Godoy Cruz. Cubrimos desde la zona centro hasta el Barrio Bombal, Palmares, Villa Hipódromo y La Estanzuela.',
    content: 'Godoy Cruz es uno de los departamentos con mayor movimiento residencial de Mendoza. Ya sea que te mudes cerca del Parque San Vicente, a un departamento moderno frente a Palmares, o a una casa familiar en el Barrio Bombal, nuestro equipo se encarga de todo. Embalamos vajilla delicada, protegemos tus electrodomésticos con mantas protectoras y film stretch, y acomodamos todo con paciencia.',
    highlightItems: [
      'Especialistas en mudanzas de departamentos en torres residenciales',
      'Traslado seguro por Corredor del Oeste y Costanera',
      'Flota equipada con rastreo satelital continuo'
    ],
    faqs: [
      {
        question: '¿Hacen fletes chicos de pocas cuadras en Godoy Cruz?',
        answer: 'Sí, claro. Ofrecemos fletes rápidos y económicos para trasladar solo un colchón, una heladera o compras que hagas en locales comerciales de la zona.'
      },
      {
        question: '¿El servicio en Godoy Cruz incluye embalaje?',
        answer: 'Ofrecemos tres niveles: flete simple, mudanza con carga/descarga, y el servicio premium donde embalamos y desembalamos absolutamente todo.'
      }
    ],
    localFrecuentes: ['Plaza Godoy Cruz', 'Palmares Open Mall', 'Parque San Vicente', 'Corredor del Oeste']
  },
  {
    id: 'guaymallen',
    name: 'Guaymallén',
    slug: 'guaymallen',
    seo: {
      title: 'Mudanzas en Guaymallén | Fletes al Mejor Precio de Mendoza',
      description: 'Mudanzas y fletes económicos en Guaymallén. Villa Nueva, Dorrego, Las Cañas, San José. Solicitá tu cotización por WhatsApp en un minuto.',
      keywords: ['mudanzas guaymallen', 'fletes guaymallen', 'fletes dorrego', 'mudanzas baratas guaymallen'],
      h1: 'Mudanzas y Fletes en Guaymallén'
    },
    description: 'El departamento más poblado merece el servicio más eficiente. Cobertura total en Dorrego, Villa Nueva, Las Cañas, Rodeo de la Cruz y San José.',
    content: 'Guaymallén combina populosas zonas residenciales con áreas comerciales y de logística. Conocemos cada rincón, desde las transitadas calles de Dorrego y Las Cañas hasta las tranquilas cuadras de Villa Nueva. Entendemos que tu tiempo vale, por eso somos ultra puntuales: si decimos a las 8:00 AM, a las 8:00 AM estamos golpeando tu puerta listos para cargar el camión.',
    highlightItems: [
      'Atención inmediata en Dorrego, Las Cañas, Villa Nueva y San José',
      'Precios imbatibles en fletes de cercanía',
      'Personal propio, capacitado y con referencias comprobables'
    ],
    faqs: [
      {
        question: '¿Tienen cobertura de fletes en zonas rurales de Guaymallén?',
        answer: 'Llegamos a todos los distritos de Guaymallén, incluyendo Los Corralitos, Puente de Hierro y Rodeo de la Cruz.'
      }
    ],
    localFrecuentes: ['Mendoza Plaza Shopping', 'Acceso Este', 'Dorrego Mall', 'Plaza de Villa Nueva']
  },
  {
    id: 'las-heras',
    name: 'Las Heras',
    slug: 'las-heras',
    seo: {
      title: 'Mudanzas en Las Heras Mendoza | Fletes Seguros y Rápidos',
      description: 'Mudanzas económicas y fletes en Las Heras, Mendoza. El Challao, Panquehua, El Plumerillo. Cuidado absoluto de tus muebles. WhatsApp activo.',
      keywords: ['mudanzas las heras', 'fletes las heras', 'mudanzas baratas mendoza', 'fletes el challao'],
      h1: 'Fletes y Mudanzas en Las Heras'
    },
    description: 'Atendemos todo el departamento de Las Heras, desde el centro urbano hasta las zonas residenciales de El Challao.',
    content: 'Sabemos que mudarse es un cambio de vida importante. En Las Heras, brindamos un servicio confiable que cuida tu bolsillo. Ya sea un traslado familiar cerca de la Plaza Marcos Burgos, o mudarte a las zonas más elevadas de El Challao, cuidamos tus pertenencias como cristalería, televisores LED y electrodomésticos con mantas de alta densidad para evitar cualquier rayón o golpe en el trayecto.',
    highlightItems: [
      'Precios súper lógicos y transparentes, sin sorpresas de última hora',
      'Asistencia completa para subir muebles a plantas altas',
      'Fletes rápidos para comercios minoristas y talleres de la zona'
    ],
    faqs: [
      {
        question: '¿Trabajan los domingos o feriados en Las Heras?',
        answer: 'Sí, entendemos que muchos mendocinos solo disponen del fin de semana. Trabajamos sábados, domingos y feriados previo acuerdo.'
      }
    ],
    localFrecuentes: ['Plaza Marcos Burgos', 'El Challao', 'Cerro de la Gloria', 'Acceso Norte']
  },
  {
    id: 'lujan-de-cuyo',
    name: 'Luján de Cuyo',
    slug: 'lujan-de-cuyo',
    seo: {
      title: 'Mudanzas en Luján de Cuyo | Servicio Confiable y Seguro',
      description: 'Mudanzas en Luján de Cuyo, Chacras de Coria, Vistalba y Carrodilla. Camiones aptos para todo tipo de carga. ¡Consultá tu presupuesto ya!',
      keywords: ['mudanzas lujan de cuyo', 'fletes chacras de coria', 'mudanzas vistalba', 'fletes lujan'],
      h1: 'Mudanzas Exclusivas en Luján de Cuyo'
    },
    description: 'Mudanzas de alta categoría en Chacras de Coria, Vistalba, Carrodilla, Mayor Drummond y zona de bodegas.',
    content: 'Vivir en Chacras de Coria o Vistalba tiene una mística especial, con sus arboledas añejas y calles de tierra consolidadas. Pero las entradas angostas y portones rústicos de algunas propiedades exigen choferes expertos. Nuestra flota cuenta con camiones de distintos tamaños que se adaptan perfectamente a los desafíos geográficos de Luján de Cuyo, evitando daños a las copas de los árboles o portones residenciales.',
    highlightItems: [
      'Choferes expertos en accesos complejos de Chacras de Coria y Vistalba',
      'Embalaje ultra seguro para obras de arte, vajilla fina y botellas de colección',
      'Personal uniformado, de máxima confianza y con amplia trayectoria'
    ],
    faqs: [
      {
        question: '¿Hacen mudanzas desde Luján de Cuyo hacia el centro de Mendoza?',
        answer: 'Sí, realizamos mudanzas locales dentro de Luján de Cuyo y también traslados interdepartamentales de de ida y vuelta a diario.'
      }
    ],
    localFrecuentes: ['Chacras de Coria', 'Vistalba', 'Carrodilla', 'Plaza Departamental Luján']
  },
  {
    id: 'maipu',
    name: 'Maipú',
    slug: 'maipu',
    seo: {
      title: 'Mudanzas en Maipú Mendoza | Traslados de Confianza',
      description: 'Hacé tu mudanza en Maipú de forma segura y veloz. Mudanzas residenciales, fletes para bodegas y traslados comerciales. ¡Cotizá hoy!',
      keywords: ['mudanzas maipu mendoza', 'fletes maipu', 'traslados maipu', 'fletes de confianza maipu'],
      h1: 'Mudanzas de Confianza en Maipú'
    },
    description: 'Mudanzas residenciales en Maipú Centro, Luzuriaga, Coquimbito y barrios privados de la zona vitivinícola.',
    content: 'Luzuriaga, Gutiérrez y el centro de Maipú están creciendo a pasos agigantados con nuevos barrios privados y complejos de dúplex. En Mudanzas Mendoza 2026 adaptamos nuestros camiones para el ingreso a barrios cerrados (cumpliendo con todas las normas de seguridad del personal y vehículos requeridas por las administraciones). Hacemos que mudarte a la tierra del vino sea una experiencia alegre y libre de dolores de cabeza.',
    highlightItems: [
      'Ingreso habilitado a todos los barrios cerrados y countries de Maipú',
      'Seguro de carga civil y de transportistas incluido en cada cotización',
      'Atención especial a bodegas y comercios de la zona gastronómica'
    ],
    faqs: [
      {
        question: '¿Qué papeles piden para entrar a un barrio privado en Maipú?',
        answer: 'Nosotros nos encargamos de presentar la documentación de nuestro personal (ART/seguro de accidentes personales) y de la flota habilitada a la administración del barrio antes del día acordado.'
      }
    ],
    localFrecuentes: ['Parque Metropolitano Maipú', 'Ruta del Vino Maipú', 'Luzuriaga', 'Coquimbito']
  },
  {
    id: 'junin',
    name: 'Junín',
    slug: 'junin',
    seo: {
      title: 'Mudanzas en Junín Mendoza | Fletes y Acarreos en el Este',
      description: 'Servicio de mudanzas y fletes en Junín, Mendoza. Cubrimos Los Barriales, Medrano, Philipps y centro. Tarifas claras y puntualidad.',
      keywords: ['mudanzas junin mendoza', 'fletes junin', 'flete barriales mendoza', 'empresa mudanzas junin'],
      h1: 'Mudanzas y Fletes en Junín, Mendoza'
    },
    description: 'Mudanzas y fletes rápidos en el departamento ecológico del este mendocino. Atención a familias, viñedos y comercios locales.',
    content: 'Junín se destaca por sus calles arboladas, su compromiso ecológico y su ritmo tranquilo. Realizar una mudanza en Junín requiere personal local que respete la tranquilidad del vecino y ofrezca tarifas sensatas. Nos encargamos de trasladar tu hogar o comercio a Los Barriales, Medrano, Algarrobo Grande o Junín Centro con furgones equipados y limpios, ideales para proteger tus muebles de la tierra y el sol.',
    highlightItems: [
      'Descuentos especiales para familias que se mudan dentro de Junín',
      'Carga segura de herramientas agrícolas y mobiliario rústico',
      'Puntualidad garantizada para aprovechar el fresco del día'
    ],
    faqs: [
      {
        question: '¿Hacen traslados desde Junín hacia Mendoza Capital?',
        answer: 'Sí, realizamos fletes interdepartamentales frecuentes uniendo la zona este con todo el Gran Mendoza y el Valle de Uco.'
      }
    ],
    localFrecuentes: ['Parque Recreativo Dueño del Sol', 'Los Barriales', 'Medrano', 'Monumento del Agua']
  },
  {
    id: 'la-paz',
    name: 'La Paz',
    slug: 'la-paz',
    seo: {
      title: 'Fletes y Mudanzas en La Paz Mendoza | Logística de Ruta',
      description: '¿Buscás fletes confiables en La Paz? Unimos el portal del este mendocino con toda la provincia y el país. Cotización instantánea.',
      keywords: ['fletes la paz mendoza', 'mudanzas la paz', 'fletes desaguadero', 'flete ruta 7 mendoza'],
      h1: 'Servicios de Mudanzas en La Paz, Mendoza'
    },
    description: 'La puerta del este mendocino. Fletes locales en La Paz y logística sobre la Ruta Nacional 7 para traslados de larga distancia.',
    content: 'La Paz es un punto crucial de entrada y salida a nuestra provincia por la Ruta Nacional 7. Si te mudás a este tranquilo departamento o necesitás despachar carga desde el arco de Desaguadero hacia Mendoza Capital, nuestro servicio te brinda absoluta tranquilidad. Aseguramos el cargamento con eslingas y cintas criquet de alta resistencia para que el viaje por autopista sea impecable.',
    highlightItems: [
      'Especialistas en mudanzas de larga distancia transitando Ruta 7',
      'Vehículos equipados con mantas especiales para viajes largos de ruta',
      'Precios competitivos para traslados de fincas y viviendas rurales'
    ],
    faqs: [
      {
        question: '¿Llegan al puesto de control Desaguadero?',
        answer: 'Sí, operamos fletes de traslado y mudanza en toda la zona limítrofe y asistimos en la documentación requerida para el tránsito interprovincial.'
      }
    ],
    localFrecuentes: ['Arco del Desaguadero', 'Plaza 9 de Julio La Paz', 'Ruta Nacional 7', 'Villa Antigua']
  },
  {
    id: 'rivadavia',
    name: 'Rivadavia',
    slug: 'rivadavia',
    seo: {
      title: 'Mudanzas en Rivadavia Mendoza | Fletes y Envolturas Seguras',
      description: 'Traslados profesionales de casas en Rivadavia. Cuidado de vajilla, peones calificados y fletes económicos. ¡Presupuesto por WhatsApp ya!',
      keywords: ['mudanzas rivadavia mendoza', 'fletes rivadavia', 'flete medrano mendoza', 'mudar casa rivadavia'],
      h1: 'Mudanzas y Fletes en Rivadavia'
    },
    description: 'Mudanzas de confianza en Rivadavia Centro, Andrade, Los Campamentos, Santa María de Oro y zonas de quintas.',
    content: 'Rivadavia tiene una vibrante vida comercial y barrios residenciales muy arraigados. Mudarse en Rivadavia exige planificación, sobre todo cuando se trata de casas amplias con muebles grandes de algarrobo u objetos pesados de jardín. Nuestro personal cuenta con fajas de fuerza para trasladar camas, armarios y vajilleros sin rayar el piso y colocándolos en el ambiente exacto de tu nueva casa.',
    highlightItems: [
      'Peones locales de total confianza con antecedentes verificados',
      'Servicio especial para mudar quintas y casas de fin de semana',
      'Soportes acolchados especiales para electrodomésticos grandes'
    ],
    faqs: [
      {
        question: '¿Tienen fletes disponibles los fines de semana en Rivadavia?',
        answer: 'Sí. Operamos de corrido sábados y domingos para adaptarnos a los horarios libres de las familias rivadavienses.'
      }
    ],
    localFrecuentes: ['Anfiteatro César Plástina', 'Complejo Polideportivo Rivadavia', 'Andrade', 'Los Campamentos']
  },
  {
    id: 'san-martin',
    name: 'San Martín',
    slug: 'san-martin',
    seo: {
      title: 'Mudanzas en San Martín Mendoza | Fletes y Acarreos en el Acto',
      description: 'Mudanzas residenciales y comerciales en San Martín. Cobertura en Palmira, Chapanay, Tres Porteñas. Soluciones económicas y de confianza.',
      keywords: ['mudanzas san martin mendoza', 'fletes palmira mendoza', 'fletes san martin', 'empresas mudanzas este mendoza'],
      h1: 'Fletes y Mudanzas en San Martín, Mendoza'
    },
    description: 'El corazón del este de Mendoza. Traslados ágiles de casas, departamentos, oficinas y locales comerciales en San Martín y Palmira.',
    content: 'San Martín es el polo comercial, logístico y residencial más importante de la zona este. Unir tu mudanza entre Palmira, Chapanay o el centro de San Martín con el Gran Mendoza es pan comido para nosotros. Disponemos de camiones furgonados de amplia capacidad, ideales para familias con gran cantidad de bienes y cajas de embalar.',
    highlightItems: [
      'Flota de camiones medianos y grandes autorizados por la CNRT',
      'Facturación formal y seguros para mudanzas comerciales y de oficinas',
      'Descuentos por reservas anticipadas de lunes a jueves'
    ],
    faqs: [
      {
        question: '¿Llegan a zonas alejadas como Tres Porteñas o El Central?',
        answer: 'Sin dudas. Cubrimos el 100% del departamento de San Martín, transitando caminos rurales de asfalto o tierra con total cuidado.'
      }
    ],
    localFrecuentes: ['Plaza San Martín', 'Paseo de la Patria', 'Palmira', 'Chapanay']
  },
  {
    id: 'santa-rosa',
    name: 'Santa Rosa',
    slug: 'santa-rosa',
    seo: {
      title: 'Fletes y Mudanzas en Santa Rosa Mendoza | Precios Lógicos',
      description: '¿Te mudás a Santa Rosa? Ofrecemos el servicio de fletes más seguro del este mendocino. Las Catitas, Villa Cabecera. Cotizá en un minuto.',
      keywords: ['fletes santa rosa mendoza', 'mudanzas santa rosa', 'flete las catitas', 'traslado de muebles santa rosa'],
      h1: 'Mudanzas y Fletes en Santa Rosa, Mendoza'
    },
    description: 'Servicio atento y familiar para mudanzas locales y hacia todo Mendoza en Villa Cabecera de Santa Rosa, Las Catitas y la Dormida.',
    content: 'Santa Rosa combina tradición ganadera, viñedos históricos y comunidades muy unidas. Sabemos lo importante que es para vos que tus pertenencias viajen seguras sin desgastarse en el camino. Por eso, embalamos cada mesa, televisor y colchón de forma independiente, asegurando un viaje suave por las rutas del este hasta tu nuevo hogar.',
    highlightItems: [
      'Trato ameno y personalizado de fletistas mendocinos',
      'Embalaje con film burbuja para proteger del polvo del camino',
      'Tarifas justas calculadas de manera transparente'
    ],
    faqs: [
      {
        question: '¿Cómo garantizan que mis muebles no se llenen de polvo en Santa Rosa?',
        answer: 'Utilizamos camiones furgón totalmente cerrados y herméticos, y envolvemos los colchones y sillones en film stretch protector de punta a punta.'
      }
    ],
    localFrecuentes: ['Villa Cabecera de Santa Rosa', 'Las Catitas', 'La Dormida', 'Reserva Ñacuñán']
  },
  {
    id: 'san-carlos',
    name: 'San Carlos',
    slug: 'san-carlos',
    seo: {
      title: 'Mudanzas en San Carlos Mendoza | Traslados Valle de Uco',
      description: 'Mudanzas y fletes de confianza en San Carlos, La Consulta, Pareditas. Camiones aptos para ripio y zonas de fincas. Cotizá al toque.',
      keywords: ['mudanzas san carlos mendoza', 'fletes la consulta', 'fletes san carlos', 'mudanzas pareditas'],
      h1: 'Mudanzas y Fletes en San Carlos, Mendoza'
    },
    description: 'Servicio especializado en el sur del Valle de Uco. Traslados residenciales en La Consulta, Pareditas, Chilecito y Eugenio Bustos.',
    content: 'San Carlos es tierra de tradiciones, cultivos andinos y hermosos paisajes cordilleranos. Mudar una vivienda en La Consulta, Eugenio Bustos o Pareditas requiere un camión confiable con choferes experimentados en rutas locales y caminos de finca. Llevamos tu heladera, camas, vajilla y herramientas agrícolas con la dedicación de una empresa familiar que valora tu esfuerzo.',
    highlightItems: [
      'Vehículos preparados para caminos rurales y ripio cordillerano',
      'Cuidado absoluto en la estiba de muebles rústicos de gran tamaño',
      'Atención puntual y respetuosa con los horarios acordados'
    ],
    faqs: [
      {
        question: '¿Hacen mudanzas desde San Carlos hacia San Rafael o General Alvear?',
        answer: 'Sí. Ofrecemos conexiones directas uniendo el Valle de Uco con el sur mendocino a través de la mítica Ruta 40.'
      }
    ],
    localFrecuentes: ['La Consulta', 'Eugenio Bustos', 'Pareditas', 'Chilecito']
  },
  {
    id: 'tunuyan',
    name: 'Tunuyán',
    slug: 'tunuyan',
    seo: {
      title: 'Mudanzas en Tunuyán Valle de Uco | Fletes Profesionales',
      description: 'Mudanzas seguras en Tunuyán, Vista Flores y Manzano Histórico. Contamos con peones, mantas de embalaje y camiones herméticos. Cotizá ya.',
      keywords: ['mudanzas tunuyan', 'fletes tunuyan', 'flete vista flores mendoza', 'empresa mudanzas tunuyan'],
      h1: 'Fletes y Mudanzas en Tunuyán'
    },
    description: 'La capital del Valle de Uco merece el mejor servicio. Mudanzas de casas familiares, cabañas de turismo y oficinas comerciales en Tunuyán.',
    content: 'Tunuyán se ha convertido en un centro urbano muy dinámico con nuevos loteos, barrios privados y un fuerte desarrollo turístico. En Mudanzas Mendoza 2026 brindamos cobertura total en Tunuyán Centro, Vista Flores, Colonia Las Rosas y el Manzano Histórico. Subimos tus pertenencias a cabañas, dúplex o fincas rurales asegurando que cada copa de cristal y mueble llegue intacto.',
    highlightItems: [
      'Ingreso ágil y coordinado a los barrios privados y loteos de Vista Flores',
      'Asistencia técnica para desarmar y rearmar muebles pesados de algarrobo',
      'Atención especial para mudar oficinas administrativas y hoteles'
    ],
    faqs: [
      {
        question: '¿Tienen cobertura de seguro de traslado en Tunuyán?',
        answer: 'Absolutamente. Todas las mudanzas en Tunuyán viajan con seguro civil y de carga cubiertos para resguardo de tu patrimonio.'
      }
    ],
    localFrecuentes: ['Manzano Histórico', 'Vista Flores', 'Plaza Departamental de Tunuyán', 'Colonia Las Rosas']
  },
  {
    id: 'tupungato',
    name: 'Tupungato',
    slug: 'tupungato',
    seo: {
      title: 'Mudanzas en Tupungato Mendoza | Fletes y Embalajes de Altura',
      description: '¿Buscás fletes en Tupungato? Traslados de confianza en Gualtallary, San José y Cordón del Plata. Cuidado absoluto de vajilla y muebles.',
      keywords: ['mudanzas tupungato mendoza', 'fletes tupungato', 'mudanzas gualtallary', 'fletes cordon del plata'],
      h1: 'Mudanzas y Fletes en Tupungato, Mendoza'
    },
    description: 'Mudanzas de alta categoría en el norte del Valle de Uco. Traslados familiares y comerciales en Tupungato Centro, San José y Gualtallary.',
    content: 'Mudar un hogar frente a las imponentes vistas del Cordón del Plata requiere choferes que conozcan la geografía local, las pendientes y los accesos a bodegas y fincas en altura. Cuidamos tus pertenencias como el tesoro que son: envolvemos televisores, espejos y vajilleros delicados de forma que las vibraciones de los caminos de montaña no afecten nada.',
    highlightItems: [
      'Choferes expertos en geografía y pendientes de Tupungato',
      'Embalaje súper acolchado ideal para vajilla y copas de cristal',
      'Operativos programados los fines de semana para evitar faltar al trabajo'
    ],
    faqs: [
      {
        question: '¿Qué pasa si sopla viento Zonda fuerte en Tupungato el día de mi mudanza?',
        answer: 'Por seguridad, si hay ráfagas fuertes que pongan en peligro tus cosas o al personal, reprogramamos de inmediato al toque que calme, sin cobrarte ningún recargo.'
      }
    ],
    localFrecuentes: ['Gualtallary', 'San José de Tupungato', 'Cordón del Plata', 'Plaza San Martín Tupungato']
  },
  {
    id: 'general-alvear',
    name: 'General Alvear',
    slug: 'general-alvear',
    seo: {
      title: 'Mudanzas en General Alvear Mendoza | Fletes de Larga Distancia',
      description: 'Mudanzas y fletes de confianza en General Alvear. Unimos el sur de Mendoza con todo el país. Tarifas honestas y seguro de carga.',
      keywords: ['mudanzas general alvear mendoza', 'fletes general alvear', 'fletes Bowen mendoza', 'mudanzas larga distancia alvear'],
      h1: 'Servicios de Mudanzas en General Alvear'
    },
    description: 'Servicio confiable en General Alvear, Bowen, Alvear Oeste y fletes interprovinciales conectando por Ruta Nacional 188.',
    content: 'General Alvear es el núcleo productivo del sur mendocino sobre la Ruta 188. Si te mudás de Alvear a Mendoza Capital, o viceversa, planificamos la ruta al detalle. Brindamos tanto fletes locales rápidos para traslados de pocos ambientes, como grandes mudanzas familiares de larga distancia con estiba profesional para asegurar que tus cosas viajen cómodas y seguras.',
    highlightItems: [
      'Especialistas en la ruta Mendoza-General Alvear y viajes interprovinciales',
      'Camiones cerrados e higienizados ideales para resguardar camas y ropa',
      'Presupuesto cerrado sin sorpresas desagradables al descargar'
    ],
    faqs: [
      {
        question: '¿Ofrecen mudanzas compartidas desde General Alvear?',
        answer: 'Sí. Para cargas chicas que van a Mendoza Capital o Buenos Aires, podés optar por nuestro servicio consolidado para dividir el costo de ruta.'
      }
    ],
    localFrecuentes: ['Plaza Carlos María de Alvear', 'Bowen', 'Alvear Oeste', 'Ruta Nacional 188']
  },
  {
    id: 'malargue',
    name: 'Malargüe',
    slug: 'malargue',
    seo: {
      title: 'Mudanzas en Malargüe Mendoza | Fletes en el Clima Andino',
      description: 'Mudanzas y traslados de equipamiento en Malargüe y Las Leñas. Vehículos preparados para el clima andino y caminos de montaña.',
      keywords: ['mudanzas malargue mendoza', 'fletes malargue', 'fletes las leñas mendoza', 'mudanza de montaña mendoza'],
      h1: 'Mudanzas y Fletes en Malargüe, Mendoza'
    },
    description: 'Logística y mudanzas en el departamento más austral de Mendoza. Preparados para traslados residenciales, petroleros y turísticos en Las Leñas.',
    content: 'Malargüe tiene un clima riguroso de montaña con vientos fuertes y nevadas en invierno. Mudar una vivienda o trasladar equipos comerciales en esta zona requiere vehículos en perfecto estado mecánico, cadenas para nieve y choferes con mucha experiencia en montaña. Aseguramos que tus camas, electrodomésticos y cajas lleguen calentitos y secos a destino.',
    highlightItems: [
      'Choferes con carnet profesional habilitados para manejo en nieve y hielo',
      'Furgones de carga herméticos que previenen la entrada de agua o polvo',
      'Asistencia para el traslado de personal petrolero y turístico de Las Leñas'
    ],
    faqs: [
      {
        question: '¿Qué precauciones toman por el clima frío de Malargüe?',
        answer: 'Nuestra flota cuenta con mantenimiento preventivo riguroso de calefacción y aislamiento de furgones. Los muebles viajan doblemente envueltos en film stretch impermeable.'
      }
    ],
    localFrecuentes: ['Planetario Malargüe', 'Las Leñas', 'Laguna de la Niña Encantada', 'Manqui Malal']
  },
  {
    id: 'san-rafael',
    name: 'San Rafael',
    slug: 'san-rafael',
    seo: {
      title: 'Mudanzas en San Rafael | Fletes e Interprovinciales',
      description: 'Mudanzas locales en San Rafael y traslados de larga distancia hacia Mendoza Capital u otras provincias. Tarifas claras y puntualidad.',
      keywords: ['mudanzas san rafael mendoza', 'fletes san rafael', 'mudanzas de larga distancia argentina', 'fletes mendoza san rafael'],
      h1: 'Mudanzas Locales y de Larga Distancia en San Rafael'
    },
    description: 'Servicio de fletes en San Rafael urbano, y mudanzas de larga distancia conectando el sur mendocino con todo el país.',
    content: 'San Rafael es el corazón del sur mendocino. Brindamos servicios locales rápidos dentro de la ciudad de San Rafael, pero nuestro fuerte es la conexión de San Rafael con la Ciudad de Mendoza, el Gran Mendoza y destinos interprovinciales (Buenos Aires, Córdoba, San Luis, San Juan). Planificamos la logística al detalle para que tus pertenencias viajen seguras por la ruta.',
    highlightItems: [
      'Viajes directos Mendoza-San Rafael y San Rafael-Mendoza de forma semanal',
      'Opción de carga consolidada (compartida) para abaratar costos en viajes largos',
      'Precintos de seguridad y monitoreo de ruta GPS en tiempo real'
    ],
    faqs: [
      {
        question: '¿Qué es una mudanza compartida o consolidada?',
        answer: 'Es un servicio ideal para traslados de pocas cosas de Mendoza a San Rafael (o viceversa), donde compartís el camión con otra persona y dividís el costo de la ruta, ahorrando hasta un 40%.'
      }
    ],
    localFrecuentes: ['Plaza San Martín San Rafael', 'Avenida Hipólito Yrigoyen', 'Valle Grande', 'El Nihuil']
  },
  {
    id: 'lavalle',
    name: 'Lavalle',
    slug: 'lavalle',
    seo: {
      title: 'Mudanzas en Lavalle Mendoza | Fletes Rurales y de Cercanía',
      description: 'Traslados económicos de casas y fletes comerciales en Lavalle, Mendoza. Cobertura en Costa de Araujo, Tres de Mayo y Villa Tulumaya.',
      keywords: ['mudanzas lavalle mendoza', 'fletes lavalle', 'fletes costa de araujo', 'traslados de fincas lavalle'],
      h1: 'Mudanzas y Fletes en Lavalle, Mendoza'
    },
    description: 'Fletes y acarreos seguros en Lavalle, Costa de Araujo, Villa Tulumaya y zonas hortícolas de Mendoza.',
    content: 'Lavalle combina tradición, campos fértiles y hermosas fincas. Si te mudás a Villa Tulumaya, Costa de Araujo, El Vergel o Tres de Mayo, nuestro equipo de fletistas te acompaña con un trato de primera. Sabemos cómo estibar camas, sillones, mesas familiares y heladeras de manera que no sufran con el movimiento, ofreciendo la mejor relación precio-calidad del norte mendocino.',
    highlightItems: [
      'Camiones amplios ideales para viviendas rurales y de fincas',
      'Envoltura antipolvo hermética bonificada para tus sillones',
      'Tarifas planas ultra transparentes sin recargos sorpresa'
    ],
    faqs: [
      {
        question: '¿Tienen fletes disponibles para el traslado de herramientas en Lavalle?',
        answer: 'Sí. Además de mudar muebles de hogar, trasladamos insumos comerciales, mercaderías y herramientas livianas para el sector hortícola.'
      }
    ],
    localFrecuentes: ['Villa Tulumaya', 'Costa de Araujo', 'Altos de Limpia', 'Tres de Mayo']
  }
];

export const SERVICES: ServiceInfo[] = [
  {
    id: 'fletes-economicos',
    name: 'Fletes Económicos',
    slug: 'fletes-economicos',
    seo: {
      title: 'Fletes Económicos en Mendoza | Traslados Baratos al Toque',
      description: 'El servicio de fletes más barato y rápido de Mendoza. Traslados de pocos muebles, compras comerciales y electrodomésticos. ¡Escribinos por WhatsApp!',
      keywords: ['fletes economicos mendoza', 'fletes baratos mendoza', 'flete mendoza precio', 'transporte barato muebles'],
      h1: 'Fletes Económicos y Rápidos en Mendoza'
    },
    description: 'Fletes directos para traslados chicos, mudanzas de pocos ambientes o fletes exprés para tus compras. La opción más ágil.',
    longDescription: '¿Compraste una heladera o un sillón y no sabés cómo llevarlo? ¿Te mudás de un monoambiente o una habitación estudiantil y tenés pocas pertenencias? Nuestro servicio de fletes económicos en Mendoza es justo lo que necesitás. Es una opción ágil, donde pagás una tarifa súper conveniente por el transporte directo con un chofer que acomoda todo a la perfección. Es ideal para jóvenes que alquilan y buscan cuidar el mango.',
    benefits: [
      'Tarifas locales súper accesibles calculadas por kilometraje real',
      'Atención súper veloz, muchas veces en el mismo día',
      'Ideal para trasladar electrodomésticos, camas, armarios desarmados o cajas'
    ],
    iconName: 'Truck'
  },
  {
    id: 'transporte-de-muebles',
    name: 'Transporte de Muebles',
    slug: 'transporte-de-muebles',
    seo: {
      title: 'Transporte de Muebles en Mendoza | Cuidado Absoluto de Carga',
      description: 'Especialistas en el transporte de muebles pesados y delicados en Mendoza. Embalaje profesional con mantas, desarme y colocación.',
      keywords: ['transporte de muebles mendoza', 'traslado de muebles mendoza', 'flete para muebles', 'mudanza de sillones camas'],
      h1: 'Transporte Seguro de Muebles en Mendoza'
    },
    description: 'Traslado especializado de mobiliario de todo tipo. Camas, sillones, mesas de algarrobo, placares pesados y vajilleros delicados.',
    longDescription: 'Mover un mueble no es solo cargarlo al camión. Las maderas finas, los sillones de tela clara y los vidrios templados requieren técnicas de estiba adecuadas. En Mudanzas Mendoza 2026 protegemos cada mueble envolviéndolo en film stretch y utilizando mantas acolchadas de alta densidad dentro del furgón. Aseguramos el cargamento con fajas de sujeción profesionales para evitar cualquier roce durante el viaje.',
    benefits: [
      'Mantas de algodón de alta resistencia para amortiguar cualquier roce',
      'Servicio experto de desarme y posterior armado en el nuevo domicilio',
      'Personal entrenado para mover objetos pesados por escaleras complejas'
    ],
    iconName: 'Package'
  },
  {
    id: 'traslado-de-offices',
    name: 'Traslado de Oficinas',
    slug: 'traslado-de-oficinas',
    seo: {
      title: 'Mudanza de Oficinas en Mendoza | Traslado Comercial Eficiente',
      description: 'Mudanzas corporativas y traslados de oficinas en Mendoza. Planificación logística rápida, traslado de computadoras y carpetas sin perder horas de trabajo.',
      keywords: ['traslado de oficinas mendoza', 'mudanzas corporativas mendoza', 'fletes oficinas mendoza', 'logistica de oficinas'],
      h1: 'Mudanzas de Oficinas y Empresas en Mendoza'
    },
    description: 'Mudanzas corporativas ágiles. Nos adaptamos a tus horarios para que tu empresa o local comercial no deje de operar ni un solo minuto.',
    longDescription: 'Para una empresa, estar inactiva por mudanza es perder plata. Por eso, planificamos las mudanzas corporativas al detalle: rotulamos cajas, protegemos servidores, equipos informáticos sensibles, escritorios y archivos confidenciales. Coordinamos el traslado en horarios no laborables (como sábados por la tarde o domingos completos) para que tu oficina esté 100% operativa el lunes por la mañana.',
    benefits: [
      'Facturación formal Tipo A o B para rendición imprevista',
      'Embalaje especial antiestático para computadoras, impresoras y servidores',
      'Operativos rápidos de fin de semana para no detener la productividad'
    ],
    iconName: 'Briefcase'
  },
  {
    id: 'mudanzas-urgentes',
    name: 'Mudanzas Urgentes',
    slug: 'mudanzas-urgentes',
    seo: {
      title: 'Mudanzas Urgentes en Mendoza | Fletes de Emergencia Hoy',
      description: '¿Necesitás mudarte ya mismo? Ofrecemos servicio de mudanzas urgentes en Mendoza las 24 horas. Rapidez, seguridad y respuesta inmediata.',
      keywords: ['mudanzas urgentes mendoza', 'fletes de urgencia mendoza', 'fletes hoy mendoza', 'mudanza hoy mismo'],
      h1: 'Servicios de Mudanzas Urgentes'
    },
    description: '¿Surgió un imprevisto y necesitás mudarte hoy mismo? Contamos con equipos de guardia listos para darte una solución inmediata.',
    longDescription: 'Sabemos que a veces la vida te pone en situaciones inesperadas donde necesitás desocupar un lugar o trasladarte de inmediato. No te desesperes. Contamos con camiones y ayudantes de guardia para mudanzas exprés. Llámanos o escribinos, coordinamos el precio y en poco tiempo tenemos el camión en la puerta para resolver tu apuro con total profesionalismo.',
    benefits: [
      'Respuesta telefónica y por WhatsApp ultra veloz en minutos',
      'Ayudantes de carga listos para embalar de urgencia',
      'Soluciones logísticas inmediatas para inquilinos y comercios'
    ],
    iconName: 'Clock'
  },
  {
    id: 'mudanzas-24-horas',
    name: 'Mudanzas 24 Horas',
    slug: 'mudanzas-24-horas',
    seo: {
      title: 'Mudanzas 24 Horas Mendoza | Fletes Nocturnos y Sábados',
      description: 'Fletes y mudanzas las 24 horas en Mendoza. Trabajamos fines de semana, feriados y en horario nocturno para tu mayor comodidad.',
      keywords: ['mudanzas 24 horas mendoza', 'fletes 24 horas mendoza', 'mudanzas nocturnas mendoza', 'flete nocturno mendoza'],
      h1: 'Fletes y Mudanzas 24 Horas'
    },
    description: 'Mudanzas sin límites de horario. Traslados nocturnos y de fin de semana para acomodarnos a tus tiempos libres.',
    longDescription: '¿Salís tarde de trabajar? ¿La administración de tu edificio solo permite mudanzas los domingos? ¿Querés evitar el calor agobiante del mediodía mendocino en verano? Ofrecemos servicio flexible las 24 horas del día. Mudate de noche o de madrugada de manera segura y súper discreta, coordinando el horario óptimo para vos.',
    benefits: [
      'Máxima flexibilidad horaria para clientes ocupados',
      'Ideal para evitar el congestionamiento del tránsito en horas pico',
      'Coordinación directa para fletes nocturnos residenciales o de carga'
    ],
    iconName: 'Calendar'
  }
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'como-organizar-una-mudanza',
    title: 'Cómo organizar una mudanza en Mendoza sin volverte loco',
    slug: 'como-organizar-una-mudanza',
    summary: 'La guía definitiva escrita por mendocinos. Checklist paso a paso para ordenar tus cajas, dar de baja servicios y mudarte con total tranquilidad.',
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
No dejes tus pertenencias de toda la vida en manos de cualquiera con una camioneta destartalada. Exigí que el servicio cuente con seguro de carga civil y ayudantes experimentados que conozcan el oficio. En **Mudanzas Mendoza 2026** nos caracterizamos por la puntualidad mendocina: llegamos a horario, cuidamos tus esquinas al pasar muebles y te saludamos con una sonrisa.`,
    date: '2026-06-25',
    author: 'Luis Grasso',
    category: 'Consejos de Mudanza',
    readTime: '5 min de lectura',
    keywords: ['como organizar una mudanza', 'checklist mudanza mendoza', 'consejos fletes mendoza'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'como-embalar-una-heladera',
    title: 'Cómo embalar una heladera de forma correcta y evitar roturas',
    slug: 'como-embalar-una-heladera',
    summary: 'La heladera es el electrodoméstico más delicado de la mudanza. Aprendé paso a paso cómo descongelarla, protegerla y cuándo volver a enchufarla.',
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
* En nuestros camiones de Mudanzas Mendoza 2026, las heladeras viajan **siempre de pie**, sujetas contra el lateral del furgón con fajas de amarre tipo crique profesionales.

### Paso 6: El reencendido (La regla de oro de las 4 horas)
Cuando la heladera llegue a tu nueva casa:
* **NO LA ENCHUFES DE INMEDIATO.** Dejala reposar en su posición definitiva durante al menos **4 horas** (si el viaje fue largo o por calles movidas, mejor dejala 12 horas). Esto permite que el aceite vuelva a bajar por gravedad al compresor y el gas se estabilice.
* Pasado ese tiempo, enchufala y dejala funcionar vacía por un par de horas antes de meter comida nueva.`,
    date: '2026-07-02',
    author: 'Equipo Técnico Mendoza',
    category: 'Embalaje de Electrodomésticos',
    readTime: '4 min de lectura',
    keywords: ['como embalar una heladera', 'mudar heladera mendoza', 'fletes electrodomesticos mendoza'],
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'cuanto-cuesta-una-mudanza',
    title: '¿Cuánto cuesta una mudanza en Mendoza en 2026?',
    slug: 'cuanto-cuesta-una-mudanza',
    summary: 'Analizamos cómo se calculan las tarifas de fletes y mudanzas en Mendoza. Distancia, ayudantes, volumen y cómo ahorrar hasta un 30% en tu presupuesto.',
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

### Estimaciones orientativas de tarifas en Mendoza 2026

* **Flete Simple (Camioneta chica, chofer solo, distancia corta):** Ideal para mover una heladera, una cama desarmada o compras. Tarifa súper económica.
* **Mudanza Estándar Monoambiente/1 Ambiente (Furgón mediano + 1 ayudante):** Perfecto para mudanzas de jóvenes que alquilan.
* **Mudanza Familiar (Camión grande + 2 ayudantes, casa de 2-3 dormitorios):** El servicio completo, ideal para familias. Incluye mantas protectoras y carga/descarga completa.

*Nota: Te sugerimos usar nuestro **Cotizador Inteligente** interactivo en la Home para obtener un presupuesto exacto adaptado a tus necesidades específicas.*

---

### Tips de oro para ahorrar hasta un 30% en tu mudanza

* **Desarmá todo lo que puedas por tu cuenta:** Camas, mesas, escritorios. Si lo hacés vos antes de que llegue el camión, los ayudantes cargan más rápido y ahorrás tiempo de servicio.
* **Embalá en cajas chicas y pesadas, grandes y livianas:** Evitá armar cajas enormes repletas de libros porque se van a romper del fondo o van a requerir dos personas para levantarlas.
* **Elegí días de menor demanda:** Los fines de semana (sábados y domingos) y los primeros o últimos días de cada mes (coincidiendo con los contratos de alquiler) son los días de mayor movimiento. Si tenés flexibilidad para mudarte a mitad de mes un día martes o miércoles, podés conseguir mejores tarifas.`,
    date: '2026-07-05',
    author: 'Asesor Comercial Mudanzas Mendoza',
    category: 'Presupuestos y Tarifas',
    readTime: '6 min de lectura',
    keywords: ['cuanto cuesta una mudanza mendoza', 'precios fletes mendoza', 'tarifas fletes mendoza 2026'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800'
  }
];

export const GENERAL_FAQS = [
  {
    question: '¿Con cuánta anticipación debo reservar la mudanza?',
    answer: 'Te recomendamos reservar con al menos 5 a 7 días de anticipación, sobre todo si pensás mudarte un fin de semana o a fin de mes. Si te surgió una urgencia, igual escribinos porque contamos con camiones de guardia.'
  },
  {
    question: '¿Qué incluye el servicio de mudanza estándar?',
    answer: 'Incluye el camión furgón desinfectado, chofer profesional, seguro básico de traslado y las fajas/mantas protectoras para los muebles. Podés adicionarle el servicio de embalaje completo y ayudantes de carga/descarga.'
  },
  {
    question: '¿Cómo protegen mis pertenencias más valiosas?',
    answer: 'Envolvemos muebles delicados, vajilla y electrodomésticos en plástico de burbujas, mantas de embalaje especiales y film stretch industrial. Todo viaja atado de forma independiente en el camión.'
  },
  {
    question: '¿Tienen factura y seguro de carga?',
    answer: 'Sí, somos una empresa formal. Emitimos facturas para empresas y particulares (ideal para mudanzas corporativas o subsidios de mudanza). Todos nuestros viajes viajan cubiertos por un seguro de carga ante cualquier eventualidad.'
  },
  {
    question: '¿Hacen mudanzas interprovinciales desde Mendoza?',
    answer: 'Sí. Llevamos tus cosas desde Mendoza a cualquier rincón de la Argentina (Buenos Aires, Córdoba, Santa Fe, San Luis, San Juan, Neuquén, etc.) en modalidad directa (camión exclusivo) o compartida para abaratar costos.'
  }
];
