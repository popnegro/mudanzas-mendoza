var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);

// src/data.ts
var DEPARTMENTS = [
  {
    id: "mendoza-capital",
    name: "Ciudad de Mendoza (Capital)",
    slug: "mendoza-capital",
    seo: {
      title: "Mudanzas en Mendoza Capital | Fletes y Traslados al Instante",
      description: "Hac\xE9 tu mudanza en Mendoza Capital sin estr\xE9s. Servicio de fletes r\xE1pidos en el centro y secciones. \xA1Cotiz\xE1 al toque con nuestro asistente!",
      keywords: ["mudanzas mendoza capital", "fletes mendoza capital", "fletes economicos mendoza", "empresas de mudanzas mendoza"],
      h1: "Mudanzas y Fletes en Mendoza Capital"
    },
    description: "Servicio premium de traslados en el microcentro y secciones de la Ciudad de Mendoza. Nos conocemos cada calle, acequia y edificio con o sin ascensor.",
    content: "Mudarle la casa a una familia en el centro de Mendoza requiere experiencia: esquivar las zonas de estacionamiento medido, conocer el horario de carga y descarga, y saber c\xF3mo subir un mueble pesado por escaleras estrechas de departamentos antiguos. En Mudanzas Mudanzas Mendoza cuidamos tus cosas como si fueran nuestras. Contamos con habilitaciones municipales completas y seguro de carga para que te quedes totalmente tranquilo.",
    highlightItems: [
      "Atenci\xF3n r\xE1pida en las 1ra, 2da, 3ra, 4ta, 5ta y 6ta Secci\xF3n",
      "Desarme y armado de placares y camas incluido en el servicio premium",
      "Fletes al instante para traslados chicos o compras de muebles"
    ],
    faqs: [
      {
        question: "\xBFTienen restricciones de horario en la Ciudad de Mendoza?",
        answer: "Coordinamos las mudanzas respetando las normas de tr\xE1nsito municipales del microcentro. Habitualmente operamos temprano por la ma\xF1ana o los fines de semana para evitar el tr\xE1nsito pesado."
      },
      {
        question: "\xBFQu\xE9 pasa si vivo en un depto de la Quinta Secci\xF3n sin ascensor?",
        answer: "\xA1No hay drama! Nuestro equipo cuenta con sogas y arneses profesionales para subir o bajar muebles por el exterior de forma segura."
      }
    ],
    localFrecuentes: ["Plaza Independencia", "Parque General San Mart\xEDn", "Paseo Sarmiento", "Ar\xEDstides Villanueva"]
  },
  {
    id: "godoy-cruz",
    name: "Godoy Cruz",
    slug: "godoy-cruz",
    seo: {
      title: "Mudanzas en Godoy Cruz | Fletes R\xE1pidos y Econ\xF3micos",
      description: "\xBFBusc\xE1s fletes o mudanzas en Godoy Cruz? Traslados de casas, oficinas y departamentos. Presupuesto personalizado en el acto.",
      keywords: ["mudanzas godoy cruz", "fletes godoy cruz", "flete economico godoy cruz", "traslado de muebles godoy cruz"],
      h1: "Servicios de Mudanzas en Godoy Cruz"
    },
    description: "Mudate f\xE1cil en Godoy Cruz. Cubrimos desde la zona centro hasta el Barrio Bombal, Palmares, Villa Hip\xF3dromo y La Estanzuela.",
    content: "Godoy Cruz es uno de los departamentos con mayor movimiento residencial de Mendoza. Ya sea que te mudes cerca del Parque San Vicente, a un departamento moderno frente a Palmares, o a una casa familiar en el Barrio Bombal, nuestro equipo se encarga de todo. Embalamos vajilla delicada, protegemos tus electrodom\xE9sticos con mantas protectoras y film stretch, y acomodamos todo con paciencia.",
    highlightItems: [
      "Especialistas en mudanzas de departamentos en torres residenciales",
      "Traslado seguro por Corredor del Oeste y Costanera",
      "Flota equipada con rastreo satelital continuo"
    ],
    faqs: [
      {
        question: "\xBFHacen fletes chicos de pocas cuadras en Godoy Cruz?",
        answer: "S\xED, claro. Ofrecemos fletes r\xE1pidos y econ\xF3micos para trasladar solo un colch\xF3n, una heladera o compras que hagas en locales comerciales de la zona."
      },
      {
        question: "\xBFEl servicio en Godoy Cruz incluye embalaje?",
        answer: "Ofrecemos tres niveles: flete simple, mudanza con carga/descarga, y el servicio premium donde embalamos y desembalamos absolutamente todo."
      }
    ],
    localFrecuentes: ["Plaza Godoy Cruz", "Palmares Open Mall", "Parque San Vicente", "Corredor del Oeste"]
  },
  {
    id: "guaymallen",
    name: "Guaymall\xE9n",
    slug: "guaymallen",
    seo: {
      title: "Mudanzas en Guaymall\xE9n | Fletes al Mejor Precio de Mendoza",
      description: "Mudanzas y fletes econ\xF3micos en Guaymall\xE9n. Villa Nueva, Dorrego, Las Ca\xF1as, San Jos\xE9. Solicit\xE1 tu cotizaci\xF3n por WhatsApp en un minuto.",
      keywords: ["mudanzas guaymallen", "fletes guaymallen", "fletes dorrego", "mudanzas baratas guaymallen"],
      h1: "Mudanzas y Fletes en Guaymall\xE9n"
    },
    description: "El departamento m\xE1s poblado merece el servicio m\xE1s eficiente. Cobertura total en Dorrego, Villa Nueva, Las Ca\xF1as, Rodeo de la Cruz y San Jos\xE9.",
    content: "Guaymall\xE9n combina populosas zonas residenciales con \xE1reas comerciales y de log\xEDstica. Conocemos cada rinc\xF3n, desde las transitadas calles de Dorrego y Las Ca\xF1as hasta las tranquilas cuadras de Villa Nueva. Entendemos que tu tiempo vale, por eso somos ultra puntuales: si decimos a las 8:00 AM, a las 8:00 AM estamos golpeando tu puerta listos para cargar el cami\xF3n.",
    highlightItems: [
      "Atenci\xF3n inmediata en Dorrego, Las Ca\xF1as, Villa Nueva y San Jos\xE9",
      "Precios imbatibles en fletes de cercan\xEDa",
      "Personal propio, capacitado y con referencias comprobables"
    ],
    faqs: [
      {
        question: "\xBFTienen cobertura de fletes en zonas rurales de Guaymall\xE9n?",
        answer: "Llegamos a todos los distritos de Guaymall\xE9n, incluyendo Los Corralitos, Puente de Hierro y Rodeo de la Cruz."
      }
    ],
    localFrecuentes: ["Mendoza Plaza Shopping", "Acceso Este", "Dorrego Mall", "Plaza de Villa Nueva"]
  },
  {
    id: "las-heras",
    name: "Las Heras",
    slug: "las-heras",
    seo: {
      title: "Mudanzas en Las Heras Mendoza | Fletes Seguros y R\xE1pidos",
      description: "Mudanzas econ\xF3micas y fletes en Las Heras, Mendoza. El Challao, Panquehua, El Plumerillo. Cuidado absoluto de tus muebles. WhatsApp activo.",
      keywords: ["mudanzas las heras", "fletes las heras", "mudanzas baratas mendoza", "fletes el challao"],
      h1: "Fletes y Mudanzas en Las Heras"
    },
    description: "Atendemos todo el departamento de Las Heras, desde el centro urbano hasta las zonas residenciales de El Challao.",
    content: "Sabemos que mudarse es un cambio de vida importante. En Las Heras, brindamos un servicio confiable que cuida tu bolsillo. Ya sea un traslado familiar cerca de la Plaza Marcos Burgos, o mudarte a las zonas m\xE1s elevadas de El Challao, cuidamos tus pertenencias como cristaler\xEDa, televisores LED y electrodom\xE9sticos con mantas de alta densidad para evitar cualquier ray\xF3n o golpe en el trayecto.",
    highlightItems: [
      "Precios s\xFAper l\xF3gicos y transparentes, sin sorpresas de \xFAltima hora",
      "Asistencia completa para subir muebles a plantas altas",
      "Fletes r\xE1pidos para comercios minoristas y talleres de la zona"
    ],
    faqs: [
      {
        question: "\xBFTrabajan los domingos o feriados en Las Heras?",
        answer: "S\xED, entendemos que muchos mendocinos solo disponen del fin de semana. Trabajamos s\xE1bados, domingos y feriados previo acuerdo."
      }
    ],
    localFrecuentes: ["Plaza Marcos Burgos", "El Challao", "Cerro de la Gloria", "Acceso Norte"]
  },
  {
    id: "lujan-de-cuyo",
    name: "Luj\xE1n de Cuyo",
    slug: "lujan-de-cuyo",
    seo: {
      title: "Mudanzas en Luj\xE1n de Cuyo | Servicio Confiable y Seguro",
      description: "Mudanzas en Luj\xE1n de Cuyo, Chacras de Coria, Vistalba y Carrodilla. Camiones aptos para todo tipo de carga. \xA1Consult\xE1 tu presupuesto ya!",
      keywords: ["mudanzas lujan de cuyo", "fletes chacras de coria", "mudanzas vistalba", "fletes lujan"],
      h1: "Mudanzas Exclusivas en Luj\xE1n de Cuyo"
    },
    description: "Mudanzas de alta categor\xEDa en Chacras de Coria, Vistalba, Carrodilla, Mayor Drummond y zona de bodegas.",
    content: "Vivir en Chacras de Coria o Vistalba tiene una m\xEDstica especial, con sus arboledas a\xF1ejas y calles de tierra consolidadas. Pero las entradas angostas y portones r\xFAsticos de algunas propiedades exigen choferes expertos. Nuestra flota cuenta con camiones de distintos tama\xF1os que se adaptan perfectamente a los desaf\xEDos geogr\xE1ficos de Luj\xE1n de Cuyo, evitando da\xF1os a las copas de los \xE1rboles o portones residenciales.",
    highlightItems: [
      "Choferes expertos en accesos complejos de Chacras de Coria y Vistalba",
      "Embalaje ultra seguro para obras de arte, vajilla fina y botellas de colecci\xF3n",
      "Personal uniformado, de m\xE1xima confianza y con amplia trayectoria"
    ],
    faqs: [
      {
        question: "\xBFHacen mudanzas desde Luj\xE1n de Cuyo hacia el centro de Mendoza?",
        answer: "S\xED, realizamos mudanzas locales dentro de Luj\xE1n de Cuyo y tambi\xE9n traslados interdepartamentales de de ida y vuelta a diario."
      }
    ],
    localFrecuentes: ["Chacras de Coria", "Vistalba", "Carrodilla", "Plaza Departamental Luj\xE1n"]
  },
  {
    id: "maipu",
    name: "Maip\xFA",
    slug: "maipu",
    seo: {
      title: "Mudanzas en Maip\xFA Mendoza | Traslados de Confianza",
      description: "Hac\xE9 tu mudanza en Maip\xFA de forma segura y veloz. Mudanzas residenciales, fletes para bodegas y traslados comerciales. \xA1Cotiz\xE1 hoy!",
      keywords: ["mudanzas maipu mendoza", "fletes maipu", "traslados maipu", "fletes de confianza maipu"],
      h1: "Mudanzas de Confianza en Maip\xFA"
    },
    description: "Mudanzas residenciales en Maip\xFA Centro, Luzuriaga, Coquimbito y barrios privados de la zona vitivin\xEDcola.",
    content: "Luzuriaga, Guti\xE9rrez y el centro de Maip\xFA est\xE1n creciendo a pasos agigantados con nuevos barrios privados y complejos de d\xFAplex. En Mudanzas Mudanzas Mendoza adaptamos nuestros camiones para el ingreso a barrios cerrados (cumpliendo con todas las normas de seguridad del personal y veh\xEDculos requeridas por las administraciones). Hacemos que mudarte a la tierra del vino sea una experiencia alegre y libre de dolores de cabeza.",
    highlightItems: [
      "Ingreso habilitado a todos los barrios cerrados y countries de Maip\xFA",
      "Seguro de carga civil y de transportistas incluido en cada cotizaci\xF3n",
      "Atenci\xF3n especial a bodegas y comercios de la zona gastron\xF3mica"
    ],
    faqs: [
      {
        question: "\xBFQu\xE9 papeles piden para entrar a un barrio privado en Maip\xFA?",
        answer: "Nosotros nos encargamos de presentar la documentaci\xF3n de nuestro personal (ART/seguro de accidentes personales) y de la flota habilitada a la administraci\xF3n del barrio antes del d\xEDa acordado."
      }
    ],
    localFrecuentes: ["Parque Metropolitano Maip\xFA", "Ruta del Vino Maip\xFA", "Luzuriaga", "Coquimbito"]
  },
  {
    id: "junin",
    name: "Jun\xEDn",
    slug: "junin",
    seo: {
      title: "Mudanzas en Jun\xEDn Mendoza | Fletes y Acarreos en el Este",
      description: "Servicio de mudanzas y fletes en Jun\xEDn, Mendoza. Cubrimos Los Barriales, Medrano, Philipps y centro. Tarifas claras y puntualidad.",
      keywords: ["mudanzas junin mendoza", "fletes junin", "flete barriales mendoza", "empresa mudanzas junin"],
      h1: "Mudanzas y Fletes en Jun\xEDn, Mendoza"
    },
    description: "Mudanzas y fletes r\xE1pidos en el departamento ecol\xF3gico del este mendocino. Atenci\xF3n a familias, vi\xF1edos y comercios locales.",
    content: "Jun\xEDn se destaca por sus calles arboladas, su compromiso ecol\xF3gico y su ritmo tranquilo. Realizar una mudanza en Jun\xEDn requiere personal local que respete la tranquilidad del vecino y ofrezca tarifas sensatas. Nos encargamos de trasladar tu hogar o comercio a Los Barriales, Medrano, Algarrobo Grande o Jun\xEDn Centro con furgones equipados y limpios, ideales para proteger tus muebles de la tierra y el sol.",
    highlightItems: [
      "Descuentos especiales para familias que se mudan dentro de Jun\xEDn",
      "Carga segura de herramientas agr\xEDcolas y mobiliario r\xFAstico",
      "Puntualidad garantizada para aprovechar el fresco del d\xEDa"
    ],
    faqs: [
      {
        question: "\xBFHacen traslados desde Jun\xEDn hacia Mendoza Capital?",
        answer: "S\xED, realizamos fletes interdepartamentales frecuentes uniendo la zona este con todo el Gran Mendoza y el Valle de Uco."
      }
    ],
    localFrecuentes: ["Parque Recreativo Due\xF1o del Sol", "Los Barriales", "Medrano", "Monumento del Agua"]
  },
  {
    id: "la-paz",
    name: "La Paz",
    slug: "la-paz",
    seo: {
      title: "Fletes y Mudanzas en La Paz Mendoza | Log\xEDstica de Ruta",
      description: "\xBFBusc\xE1s fletes confiables en La Paz? Unimos el portal del este mendocino con toda la provincia y el pa\xEDs. Cotizaci\xF3n instant\xE1nea.",
      keywords: ["fletes la paz mendoza", "mudanzas la paz", "fletes desaguadero", "flete ruta 7 mendoza"],
      h1: "Servicios de Mudanzas en La Paz, Mendoza"
    },
    description: "La puerta del este mendocino. Fletes locales en La Paz y log\xEDstica sobre la Ruta Nacional 7 para traslados de larga distancia.",
    content: "La Paz es un punto crucial de entrada y salida a nuestra provincia por la Ruta Nacional 7. Si te mud\xE1s a este tranquilo departamento o necesit\xE1s despachar carga desde el arco de Desaguadero hacia Mendoza Capital, nuestro servicio te brinda absoluta tranquilidad. Aseguramos el cargamento con eslingas y cintas criquet de alta resistencia para que el viaje por autopista sea impecable.",
    highlightItems: [
      "Especialistas en mudanzas de larga distancia transitando Ruta 7",
      "Veh\xEDculos equipados con mantas especiales para viajes largos de ruta",
      "Precios competitivos para traslados de fincas y viviendas rurales"
    ],
    faqs: [
      {
        question: "\xBFLlegan al puesto de control Desaguadero?",
        answer: "S\xED, operamos fletes de traslado y mudanza en toda la zona lim\xEDtrofe y asistimos en la documentaci\xF3n requerida para el tr\xE1nsito interprovincial."
      }
    ],
    localFrecuentes: ["Arco del Desaguadero", "Plaza 9 de Julio La Paz", "Ruta Nacional 7", "Villa Antigua"]
  },
  {
    id: "rivadavia",
    name: "Rivadavia",
    slug: "rivadavia",
    seo: {
      title: "Mudanzas en Rivadavia Mendoza | Fletes y Envolturas Seguras",
      description: "Traslados profesionales de casas en Rivadavia. Cuidado de vajilla, peones calificados y fletes econ\xF3micos. \xA1Presupuesto por WhatsApp ya!",
      keywords: ["mudanzas rivadavia mendoza", "fletes rivadavia", "flete medrano mendoza", "mudar casa rivadavia"],
      h1: "Mudanzas y Fletes en Rivadavia"
    },
    description: "Mudanzas de confianza en Rivadavia Centro, Andrade, Los Campamentos, Santa Mar\xEDa de Oro y zonas de quintas.",
    content: "Rivadavia tiene una vibrante vida comercial y barrios residenciales muy arraigados. Mudarse en Rivadavia exige planificaci\xF3n, sobre todo cuando se trata de casas amplias con muebles grandes de algarrobo u objetos pesados de jard\xEDn. Nuestro personal cuenta con fajas de fuerza para trasladar camas, armarios y vajilleros sin rayar el piso y coloc\xE1ndolos en el ambiente exacto de tu nueva casa.",
    highlightItems: [
      "Peones locales de total confianza con antecedentes verificados",
      "Servicio especial para mudar quintas y casas de fin de semana",
      "Soportes acolchados especiales para electrodom\xE9sticos grandes"
    ],
    faqs: [
      {
        question: "\xBFTienen fletes disponibles los fines de semana en Rivadavia?",
        answer: "S\xED. Operamos de corrido s\xE1bados y domingos para adaptarnos a los horarios libres de las familias rivadavienses."
      }
    ],
    localFrecuentes: ["Anfiteatro C\xE9sar Pl\xE1stina", "Complejo Polideportivo Rivadavia", "Andrade", "Los Campamentos"]
  },
  {
    id: "san-martin",
    name: "San Mart\xEDn",
    slug: "san-martin",
    seo: {
      title: "Mudanzas en San Mart\xEDn Mendoza | Fletes y Acarreos en el Acto",
      description: "Mudanzas residenciales y comerciales en San Mart\xEDn. Cobertura en Palmira, Chapanay, Tres Porte\xF1as. Soluciones econ\xF3micas y de confianza.",
      keywords: ["mudanzas san martin mendoza", "fletes palmira mendoza", "fletes san martin", "empresas mudanzas este mendoza"],
      h1: "Fletes y Mudanzas en San Mart\xEDn, Mendoza"
    },
    description: "El coraz\xF3n del este de Mendoza. Traslados \xE1giles de casas, departamentos, oficinas y locales comerciales en San Mart\xEDn y Palmira.",
    content: "San Mart\xEDn es el polo comercial, log\xEDstico y residencial m\xE1s importante de la zona este. Unir tu mudanza entre Palmira, Chapanay o el centro de San Mart\xEDn con el Gran Mendoza es pan comido para nosotros. Disponemos de camiones furgonados de amplia capacidad, ideales para familias con gran cantidad de bienes y cajas de embalar.",
    highlightItems: [
      "Flota de camiones medianos y grandes autorizados por la CNRT",
      "Facturaci\xF3n formal y seguros para mudanzas comerciales y de oficinas",
      "Descuentos por reservas anticipadas de lunes a jueves"
    ],
    faqs: [
      {
        question: "\xBFLlegan a zonas alejadas como Tres Porte\xF1as o El Central?",
        answer: "Sin dudas. Cubrimos el 100% del departamento de San Mart\xEDn, transitando caminos rurales de asfalto o tierra con total cuidado."
      }
    ],
    localFrecuentes: ["Plaza San Mart\xEDn", "Paseo de la Patria", "Palmira", "Chapanay"]
  },
  {
    id: "santa-rosa",
    name: "Santa Rosa",
    slug: "santa-rosa",
    seo: {
      title: "Fletes y Mudanzas en Santa Rosa Mendoza | Precios L\xF3gicos",
      description: "\xBFTe mud\xE1s a Santa Rosa? Ofrecemos el servicio de fletes m\xE1s seguro del este mendocino. Las Catitas, Villa Cabecera. Cotiz\xE1 en un minuto.",
      keywords: ["fletes santa rosa mendoza", "mudanzas santa rosa", "flete las catitas", "traslado de muebles santa rosa"],
      h1: "Mudanzas y Fletes en Santa Rosa, Mendoza"
    },
    description: "Servicio atento y familiar para mudanzas locales y hacia todo Mendoza en Villa Cabecera de Santa Rosa, Las Catitas y la Dormida.",
    content: "Santa Rosa combina tradici\xF3n ganadera, vi\xF1edos hist\xF3ricos y comunidades muy unidas. Sabemos lo importante que es para vos que tus pertenencias viajen seguras sin desgastarse en el camino. Por eso, embalamos cada mesa, televisor y colch\xF3n de forma independiente, asegurando un viaje suave por las rutas del este hasta tu nuevo hogar.",
    highlightItems: [
      "Trato ameno y personalizado de fletistas mendocinos",
      "Embalaje con film burbuja para proteger del polvo del camino",
      "Tarifas justas calculadas de manera transparente"
    ],
    faqs: [
      {
        question: "\xBFC\xF3mo garantizan que mis muebles no se llenen de polvo en Santa Rosa?",
        answer: "Utilizamos camiones furg\xF3n totalmente cerrados y herm\xE9ticos, y envolvemos los colchones y sillones en film stretch protector de punta a punta."
      }
    ],
    localFrecuentes: ["Villa Cabecera de Santa Rosa", "Las Catitas", "La Dormida", "Reserva \xD1acu\xF1\xE1n"]
  },
  {
    id: "san-carlos",
    name: "San Carlos",
    slug: "san-carlos",
    seo: {
      title: "Mudanzas en San Carlos Mendoza | Traslados Valle de Uco",
      description: "Mudanzas y fletes de confianza en San Carlos, La Consulta, Pareditas. Camiones aptos para ripio y zonas de fincas. Cotiz\xE1 al toque.",
      keywords: ["mudanzas san carlos mendoza", "fletes la consulta", "fletes san carlos", "mudanzas pareditas"],
      h1: "Mudanzas y Fletes en San Carlos, Mendoza"
    },
    description: "Servicio especializado en el sur del Valle de Uco. Traslados residenciales en La Consulta, Pareditas, Chilecito y Eugenio Bustos.",
    content: "San Carlos es tierra de tradiciones, cultivos andinos y hermosos paisajes cordilleranos. Mudar una vivienda en La Consulta, Eugenio Bustos o Pareditas requiere un cami\xF3n confiable con choferes experimentados en rutas locales y caminos de finca. Llevamos tu heladera, camas, vajilla y herramientas agr\xEDcolas con la dedicaci\xF3n de una empresa familiar que valora tu esfuerzo.",
    highlightItems: [
      "Veh\xEDculos preparados para caminos rurales y ripio cordillerano",
      "Cuidado absoluto en la estiba de muebles r\xFAsticos de gran tama\xF1o",
      "Atenci\xF3n puntual y respetuosa con los horarios acordados"
    ],
    faqs: [
      {
        question: "\xBFHacen mudanzas desde San Carlos hacia San Rafael o General Alvear?",
        answer: "S\xED. Ofrecemos conexiones directas uniendo el Valle de Uco con el sur mendocino a trav\xE9s de la m\xEDtica Ruta 40."
      }
    ],
    localFrecuentes: ["La Consulta", "Eugenio Bustos", "Pareditas", "Chilecito"]
  },
  {
    id: "tunuyan",
    name: "Tunuy\xE1n",
    slug: "tunuyan",
    seo: {
      title: "Mudanzas en Tunuy\xE1n Valle de Uco | Fletes Profesionales",
      description: "Mudanzas seguras en Tunuy\xE1n, Vista Flores y Manzano Hist\xF3rico. Contamos con peones, mantas de embalaje y camiones herm\xE9ticos. Cotiz\xE1 ya.",
      keywords: ["mudanzas tunuyan", "fletes tunuyan", "flete vista flores mendoza", "empresa mudanzas tunuyan"],
      h1: "Fletes y Mudanzas en Tunuy\xE1n"
    },
    description: "La capital del Valle de Uco merece el mejor servicio. Mudanzas de casas familiares, caba\xF1as de turismo y oficinas comerciales en Tunuy\xE1n.",
    content: "Tunuy\xE1n se ha convertido en un centro urbano muy din\xE1mico con nuevos loteos, barrios privados y un fuerte desarrollo tur\xEDstico. En Mudanzas Mudanzas Mendoza brindamos cobertura total en Tunuy\xE1n Centro, Vista Flores, Colonia Las Rosas y el Manzano Hist\xF3rico. Subimos tus pertenencias a caba\xF1as, d\xFAplex o fincas rurales asegurando que cada copa de cristal y mueble llegue intacto.",
    highlightItems: [
      "Ingreso \xE1gil y coordinado a los barrios privados y loteos de Vista Flores",
      "Asistencia t\xE9cnica para desarmar y rearmar muebles pesados de algarrobo",
      "Atenci\xF3n especial para mudar oficinas administrativas y hoteles"
    ],
    faqs: [
      {
        question: "\xBFTienen cobertura de seguro de traslado en Tunuy\xE1n?",
        answer: "Absolutamente. Todas las mudanzas en Tunuy\xE1n viajan con seguro civil y de carga cubiertos para resguardo de tu patrimonio."
      }
    ],
    localFrecuentes: ["Manzano Hist\xF3rico", "Vista Flores", "Plaza Departamental de Tunuy\xE1n", "Colonia Las Rosas"]
  },
  {
    id: "tupungato",
    name: "Tupungato",
    slug: "tupungato",
    seo: {
      title: "Mudanzas en Tupungato Mendoza | Fletes y Embalajes de Altura",
      description: "\xBFBusc\xE1s fletes en Tupungato? Traslados de confianza en Gualtallary, San Jos\xE9 y Cord\xF3n del Plata. Cuidado absoluto de vajilla y muebles.",
      keywords: ["mudanzas tupungato mendoza", "fletes tupungato", "mudanzas gualtallary", "fletes cordon del plata"],
      h1: "Mudanzas y Fletes en Tupungato, Mendoza"
    },
    description: "Mudanzas de alta categor\xEDa en el norte del Valle de Uco. Traslados familiares y comerciales en Tupungato Centro, San Jos\xE9 y Gualtallary.",
    content: "Mudar un hogar frente a las imponentes vistas del Cord\xF3n del Plata requiere choferes que conozcan la geograf\xEDa local, las pendientes y los accesos a bodegas y fincas en altura. Cuidamos tus pertenencias como el tesoro que son: envolvemos televisores, espejos y vajilleros delicados de forma que las vibraciones de los caminos de monta\xF1a no afecten nada.",
    highlightItems: [
      "Choferes expertos en geograf\xEDa y pendientes de Tupungato",
      "Embalaje s\xFAper acolchado ideal para vajilla y copas de cristal",
      "Operativos programados los fines de semana para evitar faltar al trabajo"
    ],
    faqs: [
      {
        question: "\xBFQu\xE9 pasa si sopla viento Zonda fuerte en Tupungato el d\xEDa de mi mudanza?",
        answer: "Por seguridad, si hay r\xE1fagas fuertes que pongan en peligro tus cosas o al personal, reprogramamos de inmediato al toque que calme, sin cobrarte ning\xFAn recargo."
      }
    ],
    localFrecuentes: ["Gualtallary", "San Jos\xE9 de Tupungato", "Cord\xF3n del Plata", "Plaza San Mart\xEDn Tupungato"]
  },
  {
    id: "general-alvear",
    name: "General Alvear",
    slug: "general-alvear",
    seo: {
      title: "Mudanzas en General Alvear Mendoza | Fletes de Larga Distancia",
      description: "Mudanzas y fletes de confianza en General Alvear. Unimos el sur de Mendoza con todo el pa\xEDs. Tarifas honestas y seguro de carga.",
      keywords: ["mudanzas general alvear mendoza", "fletes general alvear", "fletes Bowen mendoza", "mudanzas larga distancia alvear"],
      h1: "Servicios de Mudanzas en General Alvear"
    },
    description: "Servicio confiable en General Alvear, Bowen, Alvear Oeste y fletes interprovinciales conectando por Ruta Nacional 188.",
    content: "General Alvear es el n\xFAcleo productivo del sur mendocino sobre la Ruta 188. Si te mud\xE1s de Alvear a Mendoza Capital, o viceversa, planificamos la ruta al detalle. Brindamos tanto fletes locales r\xE1pidos para traslados de pocos ambientes, como grandes mudanzas familiares de larga distancia con estiba profesional para asegurar que tus cosas viajen c\xF3modas y seguras.",
    highlightItems: [
      "Especialistas en la ruta Mendoza-General Alvear y viajes interprovinciales",
      "Camiones cerrados e higienizados ideales para resguardar camas y ropa",
      "Presupuesto cerrado sin sorpresas desagradables al descargar"
    ],
    faqs: [
      {
        question: "\xBFOfrecen mudanzas compartidas desde General Alvear?",
        answer: "S\xED. Para cargas chicas que van a Mendoza Capital o Buenos Aires, pod\xE9s optar por nuestro servicio consolidado para dividir el costo de ruta."
      }
    ],
    localFrecuentes: ["Plaza Carlos Mar\xEDa de Alvear", "Bowen", "Alvear Oeste", "Ruta Nacional 188"]
  },
  {
    id: "malargue",
    name: "Malarg\xFCe",
    slug: "malargue",
    seo: {
      title: "Mudanzas en Malarg\xFCe Mendoza | Fletes en el Clima Andino",
      description: "Mudanzas y traslados de equipamiento en Malarg\xFCe y Las Le\xF1as. Veh\xEDculos preparados para el clima andino y caminos de monta\xF1a.",
      keywords: ["mudanzas malargue mendoza", "fletes malargue", "fletes las le\xF1as mendoza", "mudanza de monta\xF1a mendoza"],
      h1: "Mudanzas y Fletes en Malarg\xFCe, Mendoza"
    },
    description: "Log\xEDstica y mudanzas en el departamento m\xE1s austral de Mendoza. Preparados para traslados residenciales, petroleros y tur\xEDsticos en Las Le\xF1as.",
    content: "Malarg\xFCe tiene un clima riguroso de monta\xF1a con vientos fuertes y nevadas en invierno. Mudar una vivienda o trasladar equipos comerciales en esta zona requiere veh\xEDculos en perfecto estado mec\xE1nico, cadenas para nieve y choferes con mucha experiencia en monta\xF1a. Aseguramos que tus camas, electrodom\xE9sticos y cajas lleguen calentitos y secos a destino.",
    highlightItems: [
      "Choferes con carnet profesional habilitados para manejo en nieve y hielo",
      "Furgones de carga herm\xE9ticos que previenen la entrada de agua o polvo",
      "Asistencia para el traslado de personal petrolero y tur\xEDstico de Las Le\xF1as"
    ],
    faqs: [
      {
        question: "\xBFQu\xE9 precauciones toman por el clima fr\xEDo de Malarg\xFCe?",
        answer: "Nuestra flota cuenta con mantenimiento preventivo riguroso de calefacci\xF3n y aislamiento de furgones. Los muebles viajan doblemente envueltos en film stretch impermeable."
      }
    ],
    localFrecuentes: ["Planetario Malarg\xFCe", "Las Le\xF1as", "Laguna de la Ni\xF1a Encantada", "Manqui Malal"]
  },
  {
    id: "san-rafael",
    name: "San Rafael",
    slug: "san-rafael",
    seo: {
      title: "Mudanzas en San Rafael | Fletes e Interprovinciales",
      description: "Mudanzas locales en San Rafael y traslados de larga distancia hacia Mendoza Capital u otras provincias. Tarifas claras y puntualidad.",
      keywords: ["mudanzas san rafael mendoza", "fletes san rafael", "mudanzas de larga distancia argentina", "fletes mendoza san rafael"],
      h1: "Mudanzas Locales y de Larga Distancia en San Rafael"
    },
    description: "Servicio de fletes en San Rafael urbano, y mudanzas de larga distancia conectando el sur mendocino con todo el pa\xEDs.",
    content: "San Rafael es el coraz\xF3n del sur mendocino. Brindamos servicios locales r\xE1pidos dentro de la ciudad de San Rafael, pero nuestro fuerte es la conexi\xF3n de San Rafael con la Ciudad de Mendoza, el Gran Mendoza y destinos interprovinciales (Buenos Aires, C\xF3rdoba, San Luis, San Juan). Planificamos la log\xEDstica al detalle para que tus pertenencias viajen seguras por la ruta.",
    highlightItems: [
      "Viajes directos Mendoza-San Rafael y San Rafael-Mendoza de forma semanal",
      "Opci\xF3n de carga consolidada (compartida) para abaratar costos en viajes largos",
      "Precintos de seguridad y monitoreo de ruta GPS en tiempo real"
    ],
    faqs: [
      {
        question: "\xBFQu\xE9 es una mudanza compartida o consolidada?",
        answer: "Es un servicio ideal para traslados de pocas cosas de Mendoza a San Rafael (o viceversa), donde compart\xEDs el cami\xF3n con otra persona y divid\xEDs el costo de la ruta, ahorrando hasta un 40%."
      }
    ],
    localFrecuentes: ["Plaza San Mart\xEDn San Rafael", "Avenida Hip\xF3lito Yrigoyen", "Valle Grande", "El Nihuil"]
  },
  {
    id: "lavalle",
    name: "Lavalle",
    slug: "lavalle",
    seo: {
      title: "Mudanzas en Lavalle Mendoza | Fletes Rurales y de Cercan\xEDa",
      description: "Traslados econ\xF3micos de casas y fletes comerciales en Lavalle, Mendoza. Cobertura en Costa de Araujo, Tres de Mayo y Villa Tulumaya.",
      keywords: ["mudanzas lavalle mendoza", "fletes lavalle", "fletes costa de araujo", "traslados de fincas lavalle"],
      h1: "Mudanzas y Fletes en Lavalle, Mendoza"
    },
    description: "Fletes y acarreos seguros en Lavalle, Costa de Araujo, Villa Tulumaya y zonas hort\xEDcolas de Mendoza.",
    content: "Lavalle combina tradici\xF3n, campos f\xE9rtiles y hermosas fincas. Si te mud\xE1s a Villa Tulumaya, Costa de Araujo, El Vergel o Tres de Mayo, nuestro equipo de fletistas te acompa\xF1a con un trato de primera. Sabemos c\xF3mo estibar camas, sillones, mesas familiares y heladeras de manera que no sufran con el movimiento, ofreciendo la mejor relaci\xF3n precio-calidad del norte mendocino.",
    highlightItems: [
      "Camiones amplios ideales para viviendas rurales y de fincas",
      "Envoltura antipolvo herm\xE9tica bonificada para tus sillones",
      "Tarifas planas ultra transparentes sin recargos sorpresa"
    ],
    faqs: [
      {
        question: "\xBFTienen fletes disponibles para el traslado de herramientas en Lavalle?",
        answer: "S\xED. Adem\xE1s de mudar muebles de hogar, trasladamos insumos comerciales, mercader\xEDas y herramientas livianas para el sector hort\xEDcola."
      }
    ],
    localFrecuentes: ["Villa Tulumaya", "Costa de Araujo", "Altos de Limpia", "Tres de Mayo"]
  }
];
var SERVICES = [
  {
    id: "mudanzas-residenciales",
    name: "Mudanzas Residenciales",
    slug: "mudanzas-residenciales",
    seo: {
      title: "Mudanzas Residenciales en Mendoza | Casas y Departamentos",
      description: "Traslados integrales de hogares en Mendoza. Servicio con ayudantes profesionales, embalaje, desarme de muebles y seguro total de carga. \xA1Escribinos!",
      keywords: ["mudanzas residenciales mendoza", "mudanzas de casas mendoza", "mudar departamento mendoza", "empresa de mudanzas mendoza"],
      h1: "Mudanzas Residenciales y Familiares en Mendoza"
    },
    description: "Servicios de mudanzas completas para casas, departamentos, d\xFAplex y barrios privados. Equipos con peones expertos, estiba profesional y p\xF3lizas activas.",
    longDescription: "Una mudanza residencial es mucho m\xE1s que mover cajas: es trasladar tu historia, tu esfuerzo y tus sue\xF1os. En Mudanzas Mudanzas Mendoza nos especializamos en hacer de esta transici\xF3n un proceso c\xF3modo, seguro y libre de estr\xE9s. Ofrecemos soluciones llave en mano adaptadas a la envergadura de tu hogar, ya sea una casa amplia, un departamento c\xE9ntrico o una residencia en barrios privados. Nuestro personal experto se encarga del embalaje cuidadoso de vajilla y cristaler\xEDa delicada, la envoltura de sillones en film protector, el desarme y armado de placares o camas, y la carga/descarga con estiba profesionalizada para que nada sufra rozaduras en tr\xE1nsito. Operamos con camiones furgonados modernos y limpios, y cada servicio viaja respaldado por un seguro de carga integral suscrito con aseguradoras l\xEDderes del mercado.",
    benefits: [
      "Suministro gratuito de canastos pl\xE1sticos r\xEDgidos sanitizados para proteger tu vajilla.",
      "Personal propio y uniformado con ART activa, capacitado para ingresos a barrios cerrados exigentes.",
      "P\xF3liza de seguro civil de carga que cubre tus bienes desde la puerta de origen hasta el destino final."
    ],
    iconName: "Home"
  },
  {
    id: "fletes-economicos",
    name: "Fletes Econ\xF3micos",
    slug: "fletes-economicos",
    seo: {
      title: "Fletes Econ\xF3micos en Mendoza | Traslados Baratos al Toque",
      description: "El servicio de fletes m\xE1s barato y r\xE1pido de Mendoza. Traslados de pocos muebles, compras comerciales y electrodom\xE9sticos. \xA1Escribinos por WhatsApp!",
      keywords: ["fletes economicos mendoza", "fletes baratos mendoza", "flete mendoza precio", "transporte barato muebles"],
      h1: "Fletes Econ\xF3micos y R\xE1pidos en Mendoza"
    },
    description: "Fletes directos para traslados chicos, mudanzas de pocos ambientes o fletes expr\xE9s para tus compras. La opci\xF3n m\xE1s \xE1gil.",
    longDescription: "\xBFCompraste una heladera o un sill\xF3n y no sab\xE9s c\xF3mo llevarlo? \xBFTe mud\xE1s de un monoambiente o una habitaci\xF3n estudiantil y ten\xE9s pocas pertenencias? Nuestro servicio de fletes econ\xF3micos en Mendoza es justo lo que necesit\xE1s. Es una opci\xF3n \xE1gil, donde pag\xE1s una tarifa s\xFAper conveniente por el transporte directo con un chofer que acomoda todo a la perfecci\xF3n. Es ideal para j\xF3venes que alquilan y buscan cuidar el mango.",
    benefits: [
      "Tarifas locales s\xFAper accesibles calculadas por kilometraje real",
      "Atenci\xF3n s\xFAper veloz, muchas veces en el mismo d\xEDa",
      "Ideal para trasladar electrodom\xE9sticos, camas, armarios desarmados o cajas"
    ],
    iconName: "Truck"
  },
  {
    id: "transporte-de-muebles",
    name: "Transporte de Muebles",
    slug: "transporte-de-muebles",
    seo: {
      title: "Transporte de Muebles en Mendoza | Cuidado Absoluto de Carga",
      description: "Especialistas en el transporte de muebles pesados y delicados en Mendoza. Embalaje profesional con mantas, desarme y colocaci\xF3n.",
      keywords: ["transporte de muebles mendoza", "traslado de muebles mendoza", "flete para muebles", "mudanza de sillones camas"],
      h1: "Transporte Seguro de Muebles en Mendoza"
    },
    description: "Traslado especializado de mobiliario de todo tipo. Camas, sillones, mesas de algarrobo, placares pesados y vajilleros delicados.",
    longDescription: "Mover un mueble no es solo cargarlo al cami\xF3n. Las maderas finas, los sillones de tela clara y los vidrios templados requieren t\xE9cnicas de estiba adecuadas. En Mudanzas Mudanzas Mendoza protegemos cada mueble envolvi\xE9ndolo en film stretch y utilizando mantas acolchadas de alta densidad dentro del furg\xF3n. Aseguramos el cargamento con fajas de sujeci\xF3n profesionales para evitar cualquier roce durante el viaje.",
    benefits: [
      "Mantas de algod\xF3n de alta resistencia para amortiguar cualquier roce",
      "Servicio experto de desarme y posterior armado en el nuevo domicilio",
      "Personal entrenado para mover objetos pesados por escaleras complejas"
    ],
    iconName: "Package"
  },
  {
    id: "traslado-de-offices",
    name: "Traslado de Oficinas",
    slug: "traslado-de-offices",
    seo: {
      title: "Mudanza de Oficinas en Mendoza | Traslado Comercial Eficiente",
      description: "Mudanzas corporativas y traslados de oficinas en Mendoza. Planificaci\xF3n log\xEDstica r\xE1pida, traslado de computadoras y carpetas sin perder horas de trabajo.",
      keywords: ["traslado de oficinas mendoza", "mudanzas corporativas mendoza", "fletes oficinas mendoza", "logistica de oficinas"],
      h1: "Mudanzas de Oficinas y Empresas en Mendoza"
    },
    description: "Mudanzas corporativas \xE1giles. Nos adaptamos a tus horarios para que tu empresa o local comercial no deje de operar ni un solo minuto.",
    longDescription: "Para una empresa, estar inactiva por mudanza es perder plata. Por eso, planificamos las mudanzas corporativas al detalle: rotulamos cajas, protegemos servidores, equipos inform\xE1ticos sensibles, escritorios y archivos confidenciales. Coordinamos el traslado en horarios no laborables (como s\xE1bados por la tarde o domingos completos) para que tu oficina est\xE9 100% operativa el lunes por la ma\xF1ana.",
    benefits: [
      "Facturaci\xF3n formal Tipo A o B para rendici\xF3n imprevista",
      "Embalaje especial antiest\xE1tico para computadoras, impresoras y servidores",
      "Operativos r\xE1pidos de fin de semana para no detener la productividad"
    ],
    iconName: "Briefcase"
  },
  {
    id: "guardamuebles-mendoza",
    name: "Guardamuebles en Mendoza",
    slug: "guardamuebles-mendoza",
    seo: {
      title: "Guardamuebles en Mendoza | Dep\xF3sitos Seguros y Limpios",
      description: "Servicio de guardamuebles y bauleras privadas en Mendoza. Vigilancia las 24 hs, control de plagas, seguro contra incendio y humedad. \xA1Cotiz\xE1 hoy!",
      keywords: ["guardamuebles mendoza", "depositos de muebles mendoza", "alquiler de bauleras mendoza", "almacenamiento de muebles"],
      h1: "Guardamuebles y Bauleras Privadas en Mendoza"
    },
    description: "Dep\xF3sitos limpios, herm\xE9ticos e independientes para resguardar tus muebles de forma temporal o prolongada. Monitoreo las 24 horas.",
    longDescription: "Ya sea que est\xE9s remodelando tu casa, esperando la entrega de tu nuevo departamento o de viaje por trabajo, nuestro servicio de guardamuebles en Mendoza te ofrece la soluci\xF3n perfecta. Disponemos de dep\xF3sitos individuales, secos y completamente cerrados que previenen el ingreso de polvo, humedad o agentes nocivos. Todo el predio cuenta con monitoreo por c\xE1maras de seguridad las 24 horas, alarmas perimetrales conectadas a central de polic\xEDa, control peri\xF3dico de plagas y seguro total de incendio y robo suscrito con Sancor Seguros. Vos guard\xE1s tus pertenencias y las retir\xE1s cuando quieras, con total flexibilidad de pago mensual o diario sin plazos forzosos.",
    benefits: [
      "Predio cerrado con vigilancia f\xEDsica, cerco el\xE9ctrico perimetral y c\xE1maras 24/7.",
      "Estiba profesional sobre pallets de madera maciza para aislar de la humedad del suelo.",
      "Contratos de alquiler flexibles por d\xEDas, semanas o meses, adaptados a tu presupuesto real."
    ],
    iconName: "Warehouse"
  },
  {
    id: "embalaje-y-desarme",
    name: "Embalaje y Desarme",
    slug: "embalaje-y-desarme",
    seo: {
      title: "Servicios de Embalaje y Desarme de Muebles en Mendoza",
      description: "Protecci\xF3n profesional para tu mudanza. Embalaje con pl\xE1stico burbuja, film stretch y cajas. Personal experto para desarme de camas y placares.",
      keywords: ["embalaje para mudanzas mendoza", "desarme de muebles mendoza", "cajas de embalar mendoza", "proteccion de muebles"],
      h1: "Servicios de Embalaje Profesional y Desarme"
    },
    description: "Protecci\xF3n premium con film stretch, pl\xE1stico de burbujas (pluribol) y mantas acolchadas. Desarmamos y rearmamos tus muebles al instante.",
    longDescription: "El secreto de una mudanza exitosa, libre de rayones o golpes fortuitos, reside enteramente en la calidad del embalaje previo. Nuestro equipo de operarios embaladores profesionales asiste a tu domicilio provisto de materiales premium: film stretch de alta resistencia, pl\xE1stico de burbujas (pluribol) de gran densidad, esquineros de cart\xF3n prensado y cintas adhesivas de alto agarre. Envolvemos cada televisor, espejo, electrodom\xE9stico y adorno delicado con capas protectoras. Adem\xE1s, desarmamos placares complejos, modulares de sala, camas de dos plazas o cunas de beb\xE9, guardando la torniller\xEDa y los herrajes en bolsas etiquetadas independientes para que el armado en tu nuevo hogar sea r\xE1pido, limpio y perfecto.",
    benefits: [
      "Materiales de calidad profesional que no dejan marcas ni residuos de pegamento en tus muebles.",
      "Operarios calificados con conocimientos de carpinter\xEDa para desarmar y rearmar todo sin da\xF1os.",
      "Cajas rotuladas de alta resistencia y clasificaci\xF3n por colores seg\xFAn el ambiente de destino."
    ],
    iconName: "Shield"
  },
  {
    id: "izamientos-y-altura",
    name: "Izamientos y Altura",
    slug: "izamientos-y-altura",
    seo: {
      title: "Izamiento de Muebles por Balc\xF3n en Mendoza | Trabajo de Altura",
      description: "Servicio profesional de subida y bajada de muebles por balc\xF3n y soga en Mendoza. Traslado de pianos, sommiers y sillones por el exterior.",
      keywords: ["izamiento de muebles mendoza", "subir muebles por balcon soga", "mudanzas de altura mendoza", "traslado por balcon de muebles"],
      h1: "Izamiento de Muebles por Balc\xF3n y Trabajos de Altura"
    },
    description: "Subida y bajada de sillones, heladeras y muebles de gran porte por balcones y ventanas del exterior mediante poleas, arneses y sogas de alta resistencia.",
    longDescription: "En muchos edificios del centro de Mendoza Capital, Godoy Cruz y Guaymall\xE9n, los ascensores son peque\xF1os o las escaleras son estrechas y sinuosas para subir sillones amplios, heladeras de doble puerta, mesas de madera maciza o pianos de cola. Para estos casos, ofrecemos nuestro servicio de izamiento profesional por el exterior. Disponemos de un equipo t\xE9cnico entrenado en trabajos de altura, provisto de poleas de alta carga, sogas de alpinismo certificadas, fajas acolchadas anti-roce y arneses de seguridad homologados, garantizando un ascenso o descenso impecable y libre de riesgos tanto para el mueble como para la propiedad.",
    benefits: [
      "T\xE9cnicos certificados provistos de seguros de accidentes personales y ART activa.",
      "Envoltura s\xFAper reforzada y acolchada de los bultos para resistir cualquier contacto exterior.",
      "P\xF3liza de seguro con cobertura especial de responsabilidad civil para operaciones de altura."
    ],
    iconName: "ArrowUpCircle"
  },
  {
    id: "mudanzas-urgentes",
    name: "Mudanzas Urgentes",
    slug: "mudanzas-urgentes",
    seo: {
      title: "Mudanzas Urgentes en Mendoza | Fletes de Emergencia Hoy",
      description: "\xBFNecesit\xE1s mudarte ya mismo? Ofrecemos servicio de mudanzas urgentes en Mendoza las 24 horas. Rapidez, seguridad y respuesta inmediata.",
      keywords: ["mudanzas urgentes mendoza", "fletes de urgencia mendoza", "fletes hoy mendoza", "mudanza hoy mismo"],
      h1: "Servicios de Mudanzas Urgentes"
    },
    description: "\xBFSurgi\xF3 un imprevisto y necesit\xE1s mudarte hoy mismo? Contamos con equipos de guardia listos para darte una soluci\xF3n inmediata.",
    longDescription: "Sabemos que a veces la vida te pone en situaciones inesperadas donde necesit\xE1s desocupar un lugar o trasladarte de inmediato. No te desesperes. Contamos con camiones y ayudantes de guardia para mudanzas expr\xE9s. Ll\xE1manos o escribinos, coordinamos el precio y en poco tiempo tenemos el cami\xF3n en la puerta para resolver tu apuro con total profesionalismo.",
    benefits: [
      "Respuesta telef\xF3nica y por WhatsApp ultra veloz en minutos",
      "Ayudantes de carga listos para embalar de urgencia",
      "Soluciones log\xEDsticas inmediatas para inquilinos y comercios"
    ],
    iconName: "Clock"
  },
  {
    id: "mudanzas-24-horas",
    name: "Mudanzas 24 Horas",
    slug: "mudanzas-24-horas",
    seo: {
      title: "Mudanzas 24 Horas Mendoza | Fletes Nocturnos y S\xE1bados",
      description: "Fletes y mudanzas las 24 horas en Mendoza. Trabajamos fines de semana, feriados y en horario nocturno para tu mayor comodidad.",
      keywords: ["mudanzas 24 horas mendoza", "fletes 24 horas mendoza", "mudanzas nocturnas mendoza", "flete nocturno mendoza"],
      h1: "Fletes y Mudanzas 24 Horas"
    },
    description: "Mudanzas sin l\xEDmites de horario. Traslados nocturnos y de fin de semana para acomodarnos a tus tiempos libres.",
    longDescription: "\xBFSal\xEDs tarde de trabajar? \xBFLa administraci\xF3n de tu edificio solo permite mudanzas los domingos? \xBFQuer\xE9s evitar el calor agobiante del mediod\xEDa mendocino en verano? Ofrecemos servicio flexible las 24 horas del d\xEDa. Mudate de noche o de madrugada de manera segura y s\xFAper discreta, coordinando el horario \xF3ptimo para vos.",
    benefits: [
      "M\xE1xima flexibilidad horaria para clientes ocupados",
      "Ideal para evitar el congestionamiento del tr\xE1nsito en horas pico",
      "Coordinaci\xF3n directa para fletes nocturnos residenciales o de carga"
    ],
    iconName: "Calendar"
  }
];
var BLOG_ARTICLES = [
  {
    id: "como-organizar-una-mudanza",
    title: "C\xF3mo organizar una mudanza en Mendoza sin volverte loco",
    slug: "como-organizar-una-mudanza",
    summary: "La gu\xEDa definitiva escrita por mendocinos. Checklist paso a paso para ordenar tus cajas, dar de baja servicios y mudarte con total tranquilidad.",
    content: `## Planificar es la clave: Mudar de casa con una sonrisa

Mudar de casa suele encabezar las listas de situaciones m\xE1s estresantes. Sin embargo, con un poco de m\xE9todo y un par de termos de mate, pod\xE9s convertirlo en un proceso s\xFAper ordenado. Ac\xE1 ten\xE9s la gu\xEDa definitiva que aplicamos en Mendoza para que tu mudanza sea un \xE9xito rotundo.

### 1. Empez\xE1 con 30 d\xEDas de anticipaci\xF3n (La limpieza previa)
El mayor error es embalar cosas que ya no us\xE1s. Un mes antes de la mudanza, hac\xE9 una limpieza profunda de tus ambientes:
* **Don\xE1 o regal\xE1** ropa que lleve m\xE1s de un a\xF1o guardada en el placard.
* **Vend\xE9** esos muebles que no encajan en tu nuevo departamento de la Quinta Secci\xF3n o Godoy Cruz.
* **Tir\xE1** lo roto o inservible. Record\xE1: *menos peso equivale a un presupuesto de flete m\xE1s barato*.

### 2. Conseguir cajas de buena calidad
No escatimes en cajas. Pod\xE9s comprarlas o pedirlas en comercios amigos de tu barrio. Busc\xE1 cajas de cart\xF3n corrugado grueso:
* **Cajas chicas:** para libros, platos, vajilla pesada (as\xED no quedan imposibles de levantar).
* **Cajas medianas y grandes:** para ropa de cama, ollas, juguetes y objetos livianos.
* **Cinta de embalar ancha:** comprate al menos tres rollos. La cinta com\xFAn de librer\xEDa se despega con facilidad.

### 3. El arte de rotular las cajas
Escrib\xED con un fibr\xF3n grueso negro en los costados de cada caja (no arriba, porque al apilarlas no vas a poder leerlo):
* El **ambiente** al que va (ej: "Cocina", "Pieza Principal", "Ba\xF1o").
* Un resumen de lo que contiene (ej: "Platos cotidianos y vasos").
* Si contiene copas, platos o vidrios, escrib\xED en grande: **\xA1FR\xC1GIL!**

### 4. La "Caja de Supervivencia" para el primer d\xEDa
Este es el tip de oro que nos agradecen siempre todos los clientes. Arm\xE1 una caja o mochila especial que lleves con vos en tu auto o encima del cami\xF3n, con lo indispensable para las primeras 24 horas:
* Cepillos de dientes, toallas chicas y rollo de papel higi\xE9nico.
* Un juego de s\xE1banas para cada cama que se vaya a usar la primera noche.
* El cargador de los tel\xE9fonos celulares.
* Un termo para el mate, yerba, az\xFAcar y un par de tazas.
* Un destornillador, una pinza y curitas por las dudas.

### 5. Contrat\xE1 una empresa habilitada y de confianza
No dejes tus pertenencias de toda la vida en manos de cualquiera con una camioneta destartalada. Exig\xED que el servicio cuente con seguro de carga civil y ayudantes experimentados que conozcan el oficio. En **Mudanzas Mudanzas Mendoza** nos caracterizamos por la puntualidad mendocina: llegamos a horario, cuidamos tus esquinas al pasar muebles y te saludamos con una sonrisa.`,
    date: "2026-06-25",
    author: "Luis Grasso",
    category: "Consejos de Mudanza",
    readTime: "5 min de lectura",
    keywords: ["como organizar una mudanza", "checklist mudanza mendoza", "consejos fletes mendoza"],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "como-embalar-una-heladera",
    title: "C\xF3mo embalar una heladera de forma correcta y evitar roturas",
    slug: "como-embalar-una-heladera",
    summary: "La heladera es el electrodom\xE9stico m\xE1s delicado de la mudanza. Aprend\xE9 paso a paso c\xF3mo descongelarla, protegerla y cu\xE1ndo volver a enchufarla.",
    content: `## El manual definitivo para mudar tu heladera sin romperla

La heladera es el coraz\xF3n de la cocina y, lamentablemente, uno de los electrodom\xE9sticos que m\xE1s sufre las mudanzas si no se toman los recaudos necesarios. Su motor (motocompresor), las tuber\xEDas de gas y los estantes de vidrio templado corren peligro si se mueven a lo bruto. 

Segu\xED este instructivo paso a paso elaborado por nuestros fletistas expertos para que tu heladera llegue enfriando al 100% a tu nuevo hogar en Maip\xFA, Guaymall\xE9n o donde sea:

### Paso 1: Desocupar y descongelar (24 horas antes)
Nunca intentes mudar una heladera encendida o que acabe de apagarse:
* **Vaci\xE1 todo el contenido:** consum\xED o regal\xE1 los alimentos perecederos los d\xEDas previos.
* **Desenchufala 24 horas antes:** de esta forma, el hielo del freezer se derretir\xE1 por completo.
* **Secala bien:** us\xE1 un trapo seco para eliminar toda la humedad interior y evitar malos olores o moho.

### Paso 2: Retirar y guardar los accesorios internos
Los estantes de vidrio, cajones de pl\xE1stico y hueveras sueltas van a golpearse y romperse con el movimiento del cami\xF3n:
* **Retir\xE1 todo el interior:** estantes, rejillas, cajones de verduras y estantes de la puerta.
* **Embalalos por separado:** envolv\xE9 los estantes de vidrio templado en papel de diario o film de burbujas y ponelos en una caja rotulada como "Accesorios Heladera - Fr\xE1gil".

### Paso 3: Asegurar las puertas
Durante el acarreo por pasillos o escaleras, las puertas pueden abrirse repentinamente, descuajaringando las bisagras o golpeando las paredes:
* **Cerr\xE1 las puertas firmemente.**
* **Sujetalas** dando tres o cuatro vueltas de film stretch industrial alrededor de toda la heladera. Evit\xE1 usar cintas de embalar adhesivas directamente sobre la chapa de la heladera, ya que el pegamento puede arruinar la pintura o dejar marcas pegajosas horribles de sacar.

### Paso 4: La envoltura protectora exterior
Una vez cerradas las puertas, dale una capa extra de protecci\xF3n:
* Cubr\xED la heladera con mantas acolchadas o cart\xF3n corrugado en las esquinas.
* Volv\xE9 a dar vueltas de film stretch para fijar las mantas. Esto evitar\xE1 rayones en la pintura si roza alguna pared en pasillos angostos.

### Paso 5: El traslado (\xA1Siempre vertical!)
* **Nunca traslades la heladera acostada.** Al acostar una heladera, el aceite del compresor puede fluir por las tuber\xEDas del sistema de enfriamiento. Si al levantarla se enciende, el motor puede clavarse o dejar de enfriar de por vida.
* En nuestros camiones de Mudanzas Mudanzas Mendoza, las heladeras viajan **siempre de pie**, sujetas contra el lateral del furg\xF3n con fajas de amarre tipo crique profesionales.

### Paso 6: El reencendido (La regla de oro de las 4 horas)
Cuando la heladera llegue a tu nueva casa:
* **NO LA ENCHUFES DE INMEDIATO.** Dejala reposar en su posici\xF3n definitiva durante al menos **4 horas** (si el viaje fue largo o por calles movidas, mejor dejala 12 horas). Esto permite que el aceite vuelva a bajar por gravedad al compresor y el gas se estabilice.
* Pasado ese tiempo, enchufala y dejala funcionar vac\xEDa por un par de horas antes de meter comida nueva.`,
    date: "2026-07-02",
    author: "Equipo T\xE9cnico Mendoza",
    category: "Embalaje de Electrodom\xE9sticos",
    readTime: "4 min de lectura",
    keywords: ["como embalar una heladera", "mudar heladera mendoza", "fletes electrodomesticos mendoza"],
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "cuanto-cuesta-una-mudanza",
    title: "\xBFCu\xE1nto cuesta una mudanza en Mendoza en 2026?",
    slug: "cuanto-cuesta-una-mudanza",
    summary: "Analizamos c\xF3mo se calculan las tarifas de fletes y mudanzas en Mendoza. Distancia, ayudantes, volumen y c\xF3mo ahorrar hasta un 30% en tu presupuesto.",
    content: `## Gu\xEDa de precios transparente: Sin sorpresas al final del viaje

Una de las preguntas m\xE1s frecuentes al cambiar de casa es: **"\xBFY cu\xE1nto me va a salir?"**. La falta de claridad en los precios de algunos fleteros informales genera desconfianza y sorpresas desagradables al momento de pagar. 

En esta nota te contamos de forma s\xFAper sincera c\xF3mo se compone el precio de una mudanza en Mendoza en este a\xF1o 2026 y c\xF3mo pod\xE9s hacer para economizar al m\xE1ximo.

### Los 4 factores que definen el precio de tu mudanza

1. **El volumen de la carga (Tama\xF1o del veh\xEDculo):**
   No es lo mismo mover una cama y un ropero en una camioneta chica que mudar una casa de 4 ambientes con electrodom\xE9sticos, sillones y mesa de pool en un cami\xF3n con furg\xF3n grande. El tama\xF1o del veh\xEDculo determina la tarifa base.

2. **La distancia recorrida (Origen y Destino):**
   Las mudanzas locales dentro de un mismo departamento (ej. flete de Godoy Cruz a Godoy Cruz) suelen ser las m\xE1s baratas. Si cruzamos varios departamentos (ej. desde Las Heras hasta Luj\xE1n de Cuyo) o hacemos viajes de media distancia (ej. Mendoza a San Rafael o Valle de Uco), el valor se calcula sumando el costo de combustible y peajes por kil\xF3metro.

3. **La cantidad de peones/ayudantes necesarios:**
   Si ten\xE9s amigos o familiares j\xF3venes que te den una mano para cargar y descargar, pod\xE9s contratar solo el cami\xF3n con chofer (la opci\xF3n m\xE1s econ\xF3mica). Si prefer\xEDs no romperte la espalda levantando muebles, incluimos 1, 2 o hasta 3 ayudantes de carga profesionales.

4. **Complejidad de los accesos (Escaleras y pisos altos):**
   Subir o bajar cosas por ascensor o escalera tiene costos asociados. Si hay que subir un sommier de dos plazas por 5 pisos de escalera caracol de un edificio c\xE9ntrico, requiere mayor esfuerzo f\xEDsico, sogas especiales y tiempo extra.

---

### Estimaciones orientativas de tarifas en Mudanzas Mendoza

* **Flete Simple (Camioneta chica, chofer solo, distancia corta):** Ideal para mover una heladera, una cama desarmada o compras. Tarifa s\xFAper econ\xF3mica.
* **Mudanza Est\xE1ndar Monoambiente/1 Ambiente (Furg\xF3n mediano + 1 ayudante):** Perfecto para mudanzas de j\xF3venes que alquilan.
* **Mudanza Familiar (Cami\xF3n grande + 2 ayudantes, casa de 2-3 dormitorios):** El servicio completo, ideal para familias. Incluye mantas protectoras y carga/descarga completa.

*Nota: Te sugerimos usar nuestro **Cotizador Inteligente** interactivo en la Home para obtener un presupuesto exacto adaptado a tus necesidades espec\xEDficas.*

---

### Tips de oro para ahorrar hasta un 30% en tu mudanza

* **Desarm\xE1 todo lo que puedas por tu cuenta:** Camas, mesas, escritorios. Si lo hac\xE9s vos antes de que llegue el cami\xF3n, los ayudantes cargan m\xE1s r\xE1pido y ahorr\xE1s tiempo de servicio.
* **Embal\xE1 en cajas chicas y pesadas, grandes y livianas:** Evit\xE1 armar cajas enormes repletas de libros porque se van a romper del fondo o van a requerir dos personas para levantarlas.
* **Eleg\xED d\xEDas de menor demanda:** Los fines de semana (s\xE1bados y domingos) y los primeros o \xFAltimos d\xEDas de cada mes (coincidiendo con los contratos de alquiler) son los d\xEDas de mayor movimiento. Si ten\xE9s flexibilidad para mudarte a mitad de mes un d\xEDa martes o mi\xE9rcoles, pod\xE9s conseguir mejores tarifas.`,
    date: "2026-07-05",
    author: "Asesor Comercial Mudanzas Mendoza",
    category: "Presupuestos y Tarifas",
    readTime: "6 min de lectura",
    keywords: ["cuanto cuesta una mudanza mendoza", "precios fletes mendoza", "tarifas fletes Mudanzas Mendoza"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800"
  }
];

// src/services/sitemapService.ts
function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
}
var SitemapService = {
  /**
   * Generates a fully compliant, dynamic sitemap.xml string based on existing
   * departments, services, and blog articles.
   * 
   * @param baseUrl The canonical base URL of the website.
   */
  generateSitemapXml(baseUrl = "https://mudanzasmendoza2026.com.ar") {
    const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    const todayStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
`;
    xml += `        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
`;
    xml += `        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;
    xml += `  <url>
`;
    xml += `    <loc>${cleanBaseUrl}/</loc>
`;
    xml += `    <lastmod>${todayStr}</lastmod>
`;
    xml += `    <changefreq>daily</changefreq>
`;
    xml += `    <priority>1.0</priority>
`;
    xml += `  </url>
`;
    DEPARTMENTS.forEach((dept) => {
      const slug = escapeXml(dept.slug);
      xml += `  <url>
`;
      xml += `    <loc>${cleanBaseUrl}/departamentos/${slug}</loc>
`;
      xml += `    <lastmod>${todayStr}</lastmod>
`;
      xml += `    <changefreq>weekly</changefreq>
`;
      xml += `    <priority>0.85</priority>
`;
      xml += `  </url>
`;
    });
    SERVICES.forEach((svc) => {
      const slug = escapeXml(svc.slug);
      xml += `  <url>
`;
      xml += `    <loc>${cleanBaseUrl}/servicios/${slug}</loc>
`;
      xml += `    <lastmod>${todayStr}</lastmod>
`;
      xml += `    <changefreq>weekly</changefreq>
`;
      xml += `    <priority>0.85</priority>
`;
      xml += `  </url>
`;
    });
    BLOG_ARTICLES.forEach((art) => {
      const slug = escapeXml(art.slug);
      let artDate = todayStr;
      if (art.date) {
        if (art.date.includes("/")) {
          const parts = art.date.split("/");
          if (parts.length === 3) {
            artDate = `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`;
          }
        } else if (/^\d{4}-\d{2}-\d{2}$/.test(art.date)) {
          artDate = art.date;
        }
      }
      xml += `  <url>
`;
      xml += `    <loc>${cleanBaseUrl}/blog/${slug}</loc>
`;
      xml += `    <lastmod>${artDate}</lastmod>
`;
      xml += `    <changefreq>monthly</changefreq>
`;
      xml += `    <priority>0.65</priority>
`;
      xml += `  </url>
`;
    });
    xml += `</urlset>`;
    return xml;
  },
  /**
   * Generates a fully compliant robots.txt file, pointing search engines
   * to our dynamic sitemap URL.
   * 
   * @param baseUrl The canonical base URL of the website.
   */
  generateRobotsTxt(baseUrl = "https://mudanzasmendoza2026.com.ar") {
    const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    let text = `User-agent: *
`;
    text += `Allow: /
`;
    text += `Disallow: /api/
`;
    text += `
`;
    text += `Sitemap: ${cleanBaseUrl}/sitemap.xml
`;
    return text;
  }
};

// server.ts
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json());
var aiInstance = null;
function getGeminiClient() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      throw new Error("GEMINI_API_KEY environment variable is missing or placeholder.");
    }
    aiInstance = new import_genai.GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  return aiInstance;
}
app.get("/sitemap.xml", (req, res) => {
  res.setHeader("Content-Type", "application/xml");
  const baseUrl = process.env.APP_URL || "https://mudanzasmendoza2026.com.ar";
  const xml = SitemapService.generateSitemapXml(baseUrl);
  res.send(xml);
});
app.get("/robots.txt", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  const baseUrl = process.env.APP_URL || "https://mudanzasmendoza2026.com.ar";
  const robots = SitemapService.generateRobotsTxt(baseUrl);
  res.send(robots);
});
app.get("/manifest.json", (req, res) => {
  res.json({
    name: "Mudanzas Mudanzas Mendoza",
    short_name: "MudanzasMendoza",
    description: "Fletes y mudanzas profesionales en Mendoza. Cotizaciones en el acto e inteligencia artificial de planificaci\xF3n.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#eab308",
    icons: [
      {
        src: "https://images.unsplash.com/photo-1512418490979-92798cfc32ec?auto=format&fit=crop&q=80&w=192",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "https://images.unsplash.com/photo-1512418490979-92798cfc32ec?auto=format&fit=crop&q=80&w=512",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  });
});
app.get("/rss.xml", (req, res) => {
  res.setHeader("Content-Type", "application/xml");
  const baseUrl = process.env.APP_URL || "https://mudanzasmendoza.com.ar";
  let xml = `<?xml version="1.0" encoding="UTF-8" ?>
`;
  xml += `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
`;
  xml += `  <channel>
`;
  xml += `    <title>Mudanzas Mudanzas Mendoza - Blog de Consejos</title>
`;
  xml += `    <link>${baseUrl}</link>
`;
  xml += `    <description>Los mejores tips para mudarse f\xE1cil en la provincia de Mendoza</description>
`;
  xml += `    <language>es-AR</language>
`;
  xml += `    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
`;
  BLOG_ARTICLES.forEach((art) => {
    xml += `    <item>
`;
    xml += `      <title>${art.title}</title>
`;
    xml += `      <link>${baseUrl}/blog/${art.slug}</link>
`;
    xml += `      <description>${art.summary}</description>
`;
    xml += `      <guid>${baseUrl}/blog/${art.slug}</guid>
`;
    xml += `      <pubDate>${new Date(art.date).toUTCString()}</pubDate>
`;
    xml += `      <category>${art.category}</category>
`;
    xml += `    </item>
`;
  });
  xml += `  </channel>
`;
  xml += `</rss>`;
  res.send(xml);
});
app.post("/api/gemini/plan", async (req, res) => {
  try {
    const { origin, destination, housingType, rooms, floor, elevator, services, specialItems, date, name } = req.body;
    const prompt = `Hola Gemini. Soy ${name || "un mendocino"}. Me voy a mudar y quiero que me prepares un plan paso a paso.
Detalles:
- Origen: ${origin || "No indicado"}
- Destino: ${destination || "No indicado"}
- Tipo: ${housingType || "casa"}
- Ambientes: ${rooms || "2"}
- Piso: ${floor || "PB"}
- Ascensor: ${elevator || "No"}
- Servicios: ${services && services.length > 0 ? services.join(", ") : "Flete b\xE1sico"}
- Especiales: ${specialItems && specialItems.length > 0 ? specialItems.join(", ") : "Ninguno"}
- Fecha estimada: ${date || "Pr\xF3ximamente"}

Por favor, arm\xE1 una respuesta c\xE1lida, directa y que transmita confianza.
Us\xE1 expresiones mendocinas amigables de forma natural (ej. "darle un mate", "al toque", "no te romp\xE1s la cabeza", "viento zonda").
Inclu\xED:
1. Un checklist cronol\xF3gico recomendado (una semana antes, el d\xEDa previo, el gran d\xEDa).
2. Recomendaciones locales sobre Mendoza y el departamento de destino (${destination || "Mendoza"}).
3. Consejos puntuales para los objetos especiales seleccionados (${specialItems && specialItems.length > 0 ? specialItems.join(", ") : "embalaje seguro"}).
Hac\xE9lo en formato Markdown claro con t\xEDtulos descriptivos.`;
    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "Sos el asistente oficial de Mudanzas Mudanzas Mendoza (una divisi\xF3n digital premium y producto de Mudanzas Miranda). Tu personalidad es muy cercana, confiable, mendocina de pura cepa, s\xFAper servicial y cero formal-corporativa. Tu objetivo es calmar los nervios del cliente y darle de forma amigable los tips de oro. Siempre que sea oportuno, record\xE1 al cliente que contamos con el respaldo, infraestructura y trayectoria de m\xE1s de 50 a\xF1os de Mudanzas Miranda."
      }
    });
    res.json({ success: true, plan: response.text });
  } catch (error) {
    console.warn("Gemini is not initialized or errored. Returning elegant local fallback:", error.message);
    const { origin, destination, specialItems } = req.body;
    const hasSpecial = specialItems && specialItems.length > 0;
    const fallbackText = `### \xA1Hola! Qu\xE9 alegr\xEDa que est\xE9s planificando tu mudanza con nosotros.

Como andamos con mucha demanda o la IA est\xE1 tomando un media tarde, ac\xE1 te armamos el **Plan de Mudanza Experto de Mudanzas Mendoza** para tu traslado de **${origin || "origen"}** a **${destination || "destino"}**:

#### \u{1F4C5} Checklist de Oro para vos:
1. **7 d\xEDas antes:** Empez\xE1 a embalar lo que no us\xE1s a diario. Consegu\xED cajas resistentes y rotulalas en el lateral indicando a qu\xE9 habitaci\xF3n van.
2. **2 d\xEDas antes:** Descongel\xE1 y sec\xE1 la heladera por completo. Guard\xE1 toda la vajilla envuelta en papel.
3. **El d\xEDa previo:** Prepar\xE1 tu "Mochila de Supervivencia" con el termo, mate, cargador de celular y una muda de ropa.
4. **El Gran D\xEDa:** \xA1Relajate! Nuestro equipo llega puntual en el cami\xF3n, carga todo de forma profesional y nos encargamos de que no te romp\xE1s la cabeza cargando muebles pesados.

${hasSpecial ? `#### \u26A0\uFE0F Cuidado de objetos especiales (${specialItems.join(", ")}):
* Nos encargamos de sujetar con fajas de amarre tu ${specialItems[0]} y envolverlo en mantas protectoras gruesas de algod\xF3n para que viaje como en una nube.` : ""}

#### \u{1F377} Tip Mendocino:
* Si te mud\xE1s en \xE9poca de **Viento Zonda**, avisanos. Coordinamos al toque para resguardar la carga y que todo se haga con total seguridad.

**\xBFQuer\xE9s fijar este presupuesto?** Hac\xE9 clic en el bot\xF3n de **WhatsApp** abajo para enviar este formulario directo a un asesor de carne y hueso, \xA1te respondemos en un minuto!`;
    res.json({ success: true, plan: fallbackText });
  }
});
app.post("/api/gemini/chat", async (req, res) => {
  const { message, history } = req.body;
  try {
    const contents = [];
    if (history && history.length > 0) {
      history.forEach((msg) => {
        contents.push({
          role: msg.sender === "user" ? "user" : "model",
          parts: [{ text: msg.text }]
        });
      });
    }
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });
    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction: "Sos el asesor virtual estrella de 'Mudanzas Mudanzas Mendoza', que es la divisi\xF3n digital premium y producto de la hist\xF3rica 'Mudanzas Miranda' (www.mudanzasmiranda.com.ar). Ayud\xE1s al cliente con dudas de embalaje, fletes, consejos locales, c\xF3mo empacar heladeras o colchones. Habl\xE1s como mendocino (amigable, cercano, usando 'al toque', 'che', 'mate de por medio', 'no te romp\xE1s la cabeza'). Dej\xE1 en claro que combinamos la frescura tecnol\xF3gica de esta divisi\xF3n con el respaldo gigante de 50 a\xF1os de trayectoria, flota y seguros de Mudanzas Miranda. Ofrec\xE9 sutilmente usar el Cotizador de la web o tocar el bot\xF3n de WhatsApp para fijar fecha."
      }
    });
    res.json({ success: true, text: response.text });
  } catch (error) {
    console.warn("Gemini chat error or uninitialized. Returning elegant local rule-based response:", error.message);
    const msgLower = message.toLowerCase();
    let reply = "\xA1Hola, che! Qu\xE9 buena consulta. Mir\xE1, para darte una respuesta bien certera para tu caso, te sugiero usar nuestro **Cotizador de 8 pasos** de la Home o mandarnos un **WhatsApp** directo. \xA1Te contestamos al toque!";
    if (msgLower.includes("quien sos") || msgLower.includes("qui\xE9n sos") || msgLower.includes("empresa") || msgLower.includes("miranda") || msgLower.includes("quienes somos") || msgLower.includes("qui\xE9nes somos") || msgLower.includes("respald")) {
      reply = "\xA1Qu\xE9 buena pregunta, che! Mudanzas Mudanzas Mendoza es el producto digital estrella y la divisi\xF3n tecnol\xF3gica premium de **Mudanzas Miranda** (www.mudanzasmiranda.com.ar). Llevamos m\xE1s de 50 a\xF1os como la empresa l\xEDder de transporte y mudanzas en Mendoza. Con esta uni\xF3n ten\xE9s la tranquilidad de la mayor trayectoria de la provincia respaldando cada furg\xF3n, operario y p\xF3liza de Sancor Seguros, combinada con herramientas autom\xE1ticas inteligentes asistidas por IA.";
    } else if (msgLower.includes("heladera")) {
      reply = "\xA1Mudar la heladera tiene su ciencia! Record\xE1 desenchufarla unas 24 horas antes para que se descongele completa, limpiala bien, sacale los estantes de vidrio y record\xE1: **debe viajar siempre de pie**. Cuando llegue al destino, esper\xE1 al menos 4 horas antes de volver a enchufarla para que se asiente el aceite.";
    } else if (msgLower.includes("precio") || msgLower.includes("cuanto cuesta") || msgLower.includes("tarifa") || msgLower.includes("costo")) {
      reply = "Las tarifas de los fletes dependen del tama\xF1o del cami\xF3n y los kil\xF3metros. Son s\xFAper baratas y transparentes. Pod\xE9s calcular la tuya al instante usando el **Cotizador Inteligente** de nuestra web.";
    } else if (msgLower.includes("caja") || msgLower.includes("embalar") || msgLower.includes("vaso") || msgLower.includes("plato")) {
      reply = "Para platos y copas, us\xE1 cajas chicas de cart\xF3n grueso para que no queden pesadas. Pon\xE9 bollos de papel de diario abajo de todo como colch\xF3n, envolv\xE9 cada vajilla por separado y rellen\xE1 todos los espacios vac\xEDos con papel arrugado para que nada baile en el cami\xF3n.";
    } else if (msgLower.includes("zonda") || msgLower.includes("viento") || msgLower.includes("clima")) {
      reply = "Si sopla **Viento Zonda** fuerte, \xA1mucha precauci\xF3n! Por la seguridad de tus cosas y de nuestros operarios, coordinamos de inmediato para reprogramar la mudanza al d\xEDa siguiente o al toque que calme, sin cobrarte ning\xFAn extra.";
    } else if (msgLower.includes("chacras") || msgLower.includes("lujan") || msgLower.includes("barrio privado")) {
      reply = "Trabajamos much\xEDsimo en Luj\xE1n, Chacras de Coria y Maip\xFA. Presentamos toda la documentaci\xF3n de nuestro personal y veh\xEDculos (seguros, ART) a la administraci\xF3n del barrio privado de antemano para que entremos sin demoras el d\xEDa de la mudanza.";
    }
    res.json({ success: true, text: reply });
  }
});
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: /* @__PURE__ */ new Date() });
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware...");
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode with built assets...");
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
