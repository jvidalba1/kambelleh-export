import { CONTACTOS } from "../../../documentation/contactos.js";

export const MANUAL = [
  {
    id: "quienes",
    title: "🌊 Kambelleh: quiénes somos",
    intro: "Kambelleh es un refugio auténtico en la costa del Pacífico colombiano que ofrece una experiencia inmersiva y sostenible: un hostal donde celebramos y resignificamos la idea de \u201chogar\u201d lejos de casa. Es un espacio de conexión con la naturaleza, la cultura del Pacífico y el descanso.",
    groups: [
      { label: "Nuestros principios", items: [
        ["Hospitalidad genuina"], ["Respeto por la naturaleza"], ["Honestidad"], ["Tranquilidad"], ["Sostenibilidad"], ["Experiencias memorables"],
      ]},
    ],
  },
  {
    id: "emergencias",
    title: "🚨 Emergencias y contactos",
    intro: "Lo primero que debe saber cualquier persona del equipo, antes que cualquier otra tarea. Si tienes dudas sobre algún número, pídeselo al administrador y complétalo aquí mismo (pide que se edite este manual).",
    groups: [
      { label: "Contactos clave", items: [
        [CONTACTOS.es.adminLine],
        ["Hospital más cercano — Hospital Departamental de Buenaventura E.S.E. (Av. Simón Bolívar / Cl 6 #17-40): (602) 240 1052"],
        ["DIMAR y Guardacostas — emergencias en el mar: línea 146 · canal 16 VHF marino"],
        ["Policía Nacional: 123 (línea nacional) · 112 (usado en esta zona para emergencias en el mar)"],
        ["DIMAR conmutador general: (+57) 601 220 0490 · línea gratuita 018000 115 966"],
        [CONTACTOS.es.boatLine],
      ]},
      { label: "Incendio", items: [
        ["Alejar a todos los huéspedes del área","AMBOS"],
        ["Cortar la energía eléctrica si es seguro hacerlo","VOLUNTARIADO"],
        ["Usar extintor solo si el fuego es pequeño y controlable","VOLUNTARIADO"],
        ["Si crece, evacuar a la zona verde frente al mar y llamar al administrador","AMBOS"],
      ]},
      { label: "Marejada / oleaje fuerte", items: [
        ["Sacar a todos los huéspedes del agua de inmediato"],
        ["No permitir el ingreso al mar hasta nueva indicación"],
        ["Avisar a todos los huéspedes hospedados, no solo a quienes estén en la playa"],
      ]},
      { label: "Persona perdida o en apuros en el mar", items: [
        ["Llamar de inmediato a la línea 146 (Dimar y Guardacostas) y al administrador"],
        ["No entrar solo/a al agua a rescatar sin flotador o ayuda"],
        ["Mantener a la vista el último punto donde se vio a la persona"],
      ]},
      { label: "Apagón", items: [
        ["Ubicar linternas (definir un punto fijo de almacenamiento)"],
        ["Revisar que ningún huésped quede en zonas oscuras o inseguras (escaleras, baños)"],
        ["Reportar al administrador si se extiende más de unas horas"],
      ]},
      { label: "Fuga de gas", items: [
        ["No encender fósforos, encendedores ni interruptores eléctricos"],
        ["Cerrar la válvula de la pipa de gas"],
        ["Ventilar el área abriendo puertas y ventanas"],
        ["Alejar a los huéspedes de la cocina hasta confirmar que no hay riesgo"],
      ]},
    ],
  },
  {
    id: "primeros_auxilios",
    title: "🩹 Primeros auxilios básicos",
    intro: "Situaciones comunes en un hostal de playa. Ante cualquier caso grave o que no mejore, buscar atención médica de inmediato.",
    groups: [
      { label: "Picadura de medusa (aguamala)", items: [
        ["Enjuagar con agua salada (nunca agua dulce)"], ["Retirar los restos de tentáculos con una tarjeta, no con la mano"], ["No frotar la zona"], ["Aplicar calor si hay disponible"],
      ]},
      { label: "Quemadura de sol", items: [
        ["Llevar a la persona a la sombra"], ["Hidratar con agua"], ["Aplicar loción after-sun o aloe si hay disponible"], ["Evitar más exposición al sol ese día"],
      ]},
      { label: "Pisada de erizo", items: [
        ["No intentar sacar las espinas apretando"], ["Sumergir en agua caliente (tolerable) para aliviar el dolor"], ["Buscar atención médica si las espinas no salen solas"],
      ]},
    ],
  },
  {
    id: "recepcion",
    title: "🛎️ Recepción del huésped",
    intro: "El procedimiento más importante del equipo: es la primera y la última impresión que se lleva cada huésped.",
    groups: [
      { label: "Antes de la llegada (preparación)", items: [
        ["Comunicación con el huésped y bienvenida por el canal de reserva","VOLUNTARIADO"],
        ["Cocina limpia y lista para su uso","VOLUNTARIADO"],
        ["Papeles/avisos en los baños revisados","VOLUNTARIADO"],
        ["Sanitarios y tanque sanitario limpios","VOLUNTARIADO"],
        ["Papel higiénico puesto","VOLUNTARIADO"],
        ["Duchas y lavamanos funcionando","VOLUNTARIADO"],
        ["Papeleras vacías","VOLUNTARIADO"],
        ["Desagües limpios","VOLUNTARIADO"],
        ["Camas y almohadas ordenadas, sin pelos","VOLUNTARIADO"],
        ["Toldillos bien puestos y limpios","VOLUNTARIADO"],
        ["Ventiladores funcionando","VOLUNTARIADO"],
        ["Chapas cerrando bien, con sus llaves","VOLUNTARIADO"],
        ["Esquinas y estantes aseados","VOLUNTARIADO"],
        ["Zona de zapatos limpia","VOLUNTARIADO"],
        ["Hamacas puestas","VOLUNTARIADO"],
        ["Cocina funcionando adecuadamente","VOLUNTARIADO"],
        ["Zonas comunes aseadas y organizadas","VOLUNTARIADO"],
      ]},
      { label: "Check-in (día de llegada)", items: [
        ["Entrega de la habitación","VOLUNTARIADO"],
        ["Discurso de bienvenida + reglas de la casa (sin zapatos)","VOLUNTARIADO"],
        ["Indicar bajada al mar y sitios para comer","VOLUNTARIADO"],
        ["Indicar uso de la cocina (solo cenas y desayunos)","VOLUNTARIADO"],
        ["Cobro de la reserva","ADMIN"],
        ["Ofrecer tours y actividades","ADMIN"],
      ]},
      { label: "Información obligatoria para el huésped", items: [
        ["Uso del agua"], ["Manejo de residuos"], ["Horarios de descanso"], ["Seguridad en playa"],
      ]},
      { label: "Durante la estadía", items: [
        ["Estar al tanto de la hora de salida","VOLUNTARIADO"],
        ["Seguimiento diario de dormida y comida","VOLUNTARIADO"],
        ["Seguimiento de sus actividades y planes","VOLUNTARIADO"],
        ["Ayudar con imprevistos o dificultades","VOLUNTARIADO"],
      ]},
      { label: "Check-out", items: [
        ["Revisión de la habitación","VOLUNTARIADO"],
        ["Verificar daños, llaves y consumos pendientes","AMBOS"],
        ["Cobro y cierre de la reserva","ADMIN"],
        ["Despedida y retroalimentación","AMBOS"],
        ["Indicar punto de salida de motos","VOLUNTARIADO"],
        ["Coordinar limpieza y registrar novedades","AMBOS"],
      ]},
    ],
  },
  {
    id: "atencion",
    title: "💬 Atención al huésped",
    intro: "",
    groups: [
      { label: "Reglas", items: [
        ["Responder solicitudes rápidamente"], ["Mantener actitud cordial"], ["No discutir con huéspedes"], ["Escalar conflictos importantes al administrador"],
      ]},
      { label: "Ante una queja", items: [
        ["1. Escuchar"], ["2. Comprender"], ["3. Solucionar"], ["4. Registrar"],
      ]},
      { label: "Tiempos máximos de respuesta", items: [
        ["WhatsApp: 30 minutos"], ["Instagram: 1 hora"], ["Airbnb y Booking: 1 hora"],
      ]},
      { label: "Mensaje inicial sugerido", items: [
        ["\u201cHola. Gracias por comunicarte con Kambelleh. ¿Para qué fechas deseas hospedarte y cuántas personas viajarán?\u201d"],
      ]},
      { label: "Huéspedes extranjeros", items: [
        ["Solicitar pasaporte","ADMIN"], ["Verificar ingreso legal al país","ADMIN"], ["Registrar nacionalidad y número de pasaporte","ADMIN"],
      ]},
    ],
  },
  {
    id: "cocina",
    title: "🍳 Uso de la cocina compartida",
    intro: "Kambelleh no opera restaurante permanente. La cocina se facilita únicamente para desayunos y cenas.",
    groups: [
      { label: "Normas", items: [
        ["Lavar los utensilios usados"], ["Limpiar las superficies"], ["Mantener el orden"], ["Etiquetar los alimentos"], ["Disponer los residuos correctamente"],
      ]},
      { label: "Control diario", items: [
        ["Nevera limpia","VOLUNTARIADO"], ["Estufa limpia","VOLUNTARIADO"], ["Lavaplatos limpio","VOLUNTARIADO"], ["Basura retirada","VOLUNTARIADO"],
      ]},
    ],
  },
  {
    id: "horarios",
    title: "🕐 Horarios generales de la casa",
    intro: "",
    groups: [
      { label: "Horarios", items: [
        ["Check-in: 3:00 p. m."], ["Check-out: 12:00 m. (mediodía)"],
        ["Horario de cocina compartida: solo desayunos y cenas"],
        ["Horario de silencio / descanso: a partir de las 10:00 p. m."],
      ]},
    ],
  },
  {
    id: "voluntariado",
    title: "🤝 El voluntariado en Kambelleh",
    intro: "El equipo de voluntariado es el corazón operativo diario de Kambelleh: acompaña la llegada de cada huésped, mantiene la casa funcionando y hace posible la experiencia que prometemos.",
    groups: [
      { label: "A cambio, Kambelleh ofrece", items: [ ["Alojamiento"], ["Tours (acompañamiento de huéspedes)"], ["Alimentación compartida"] ] },
      { label: "A cambio de", items: [ ["4 horas de labor prestada al día"] ] },
    ],
  },
  {
    id: "primer_dia",
    title: "🌱 Primer día del voluntario",
    intro: "Checklist para cuando llega alguien nuevo al equipo.",
    groups: [
      { label: "Al llegar", items: [
        ["Mostrar su habitación y dónde dejar sus cosas"],
        ["Recorrido completo por la casa: cocina, baños, bodega, zona social"],
        ["Dar la clave de WiFi"],
        ["Agregarlo/a al grupo de WhatsApp del voluntariado"],
        ["Explicar las 4 horas diarias de labor y cómo se coordinan"],
        ["Presentarlo/a con el resto del equipo"],
      ]},
      { label: "Primeros días", items: [
        ["Acompañarlo/a en su primer check-in real, no dejarlo/a solo/a"],
        ["Revisar junto a él/ella la pestaña Manual del panel completa"],
        ["Resolver dudas sobre las tareas de Limpieza y su frecuencia"],
      ]},
    ],
  },
  {
    id: "tours",
    title: "🧭 Tours, experiencias y fauna silvestre",
    intro: "",
    groups: [
      { label: "Antes de vender un tour", items: [
        ["Confirmar disponibilidad","ADMIN"], ["Confirmar proveedor","ADMIN"], ["Confirmar clima","ADMIN"], ["Confirmar precio","ADMIN"],
      ]},
      { label: "Después del tour", items: [
        ["Solicitar retroalimentación al huésped"], ["Registrar cualquier incidente"],
      ]},
      { label: "Avistamiento de ballenas — antes", items: [
        ["Confirmar clima"], ["Confirmar chalecos salvavidas"], ["Confirmar embarcación autorizada"],
      ]},
      { label: "Avistamiento de ballenas — durante", items: [
        ["No alimentar la fauna"], ["No arrojar basura"], ["Mantener distancia prudente"], ["No generar ruido excesivo"],
      ]},
      { label: "Manejo de fauna silvestre — regla principal", items: [
        ["NO MATAR ANIMALES SILVESTRES"],
      ]},
      { label: "Fauna silvestre — procedimiento", items: [
        ["Mantener la calma"], ["Aislar el área"], ["Alejar a los huéspedes"], ["Solicitar apoyo si es necesario"],
      ]},
      { label: "Serpientes", items: [
        ["No manipular"], ["Mantener distancia"], ["Informar inmediatamente al administrador"],
      ]},
    ],
  },
  {
    id: "proveedores",
    title: "📇 Proveedores y contactos de servicio",
    intro: "Directorio de personas y negocios de confianza con los que trabaja Kambelleh. Actualízalo apenas cambie algún número.",
    groups: [
      { label: "Lancheros y tours", items: CONTACTOS.es.lancheros.map((x) => [x]) },
      { label: "Transporte", items: CONTACTOS.es.transporte.map((x) => [x]) },
      { label: "Compras en Buenaventura", items: CONTACTOS.es.compras.map((x) => [x]) },
      { label: "Carpintería", items: CONTACTOS.es.carpinteria.map((x) => [x]) },
      { label: "Electricidad", items: CONTACTOS.es.electricidad.map((x) => [x]) },
      { label: "Poda de césped", items: CONTACTOS.es.poda.map((x) => [x]) },
      { label: "Fumigación", items: CONTACTOS.es.fumigacion.map((x) => [x]) },
      { label: "Avistamiento de aves", items: CONTACTOS.es.aves.map((x) => [x]) },
    ],
  },
  {
    id: "ingles",
    title: "🗣 Frases básicas en inglés",
    intro: "Para el check-in y necesidades comunes de un huésped extranjero.",
    groups: [
      { label: "Bienvenida", items: [
        ["Bienvenido a Kambelleh → Welcome to Kambelleh"],
        ["Por favor quítate los zapatos antes de entrar → Please take off your shoes before entering"],
        ["Esta es tu habitación → This is your room"],
      ]},
      { label: "Normas e info", items: [
        ["La cocina es solo para desayuno y cena → The kitchen is only for breakfast and dinner"],
        ["Por favor cuida el agua → Please be mindful of water use"],
        ["El mar puede ser peligroso, ten cuidado → The sea can be dangerous, please be careful"],
      ]},
      { label: "Preguntas útiles", items: [
        ["¿Cuántas noches te vas a quedar? → How many nights will you be staying?"],
        ["¿Te gustaría hacer un tour? → Would you like to book a tour?"],
        ["¿Todo bien con la habitación? → Is everything okay with the room?"],
      ]},
    ],
  },
];

export const MANUAL_EN = [
  {
    id: "quienes",
    title: "🌊 Kambelleh: who we are",
    intro: "Kambelleh is an authentic refuge on Colombia's Pacific coast offering an immersive, sustainable experience: a hostel where we celebrate and reimagine the idea of \u201chome\u201d away from home. It's a space for connecting with nature, Pacific culture, and rest.",
    groups: [
      { label: "Our principles", items: [
        ["Genuine hospitality"], ["Respect for nature"], ["Honesty"], ["Tranquility"], ["Sustainability"], ["Memorable experiences"],
      ]},
    ],
  },
  {
    id: "emergencias",
    title: "🚨 Emergencies & contacts",
    intro: "The first thing anyone on the team should know, before any other task. If you're unsure about a number, ask the administrator and have it added here (ask for this manual to be edited).",
    groups: [
      { label: "Key contacts", items: [
        [CONTACTOS.en.adminLine],
        ["Nearest hospital — Hospital Departamental de Buenaventura E.S.E. (Av. Simón Bolívar / Cl 6 #17-40): (602) 240 1052"],
        ["DIMAR & Coast Guard — emergencies at sea: line 146 · VHF marine channel 16"],
        ["National Police: 123 (national line) · 112 (used in this area for sea emergencies)"],
        ["DIMAR general switchboard: (+57) 601 220 0490 · toll-free 018000 115 966"],
        [CONTACTOS.en.boatLine],
      ]},
      { label: "Fire", items: [
        ["Move all guests away from the area","BOTH"],
        ["Cut electrical power if it's safe to do so","VOLUNTEERS"],
        ["Use a fire extinguisher only if the fire is small and controllable","VOLUNTEERS"],
        ["If it grows, evacuate to the green area facing the sea and call the administrator","BOTH"],
      ]},
      { label: "Rough seas / strong swell", items: [
        ["Get all guests out of the water immediately"],
        ["Do not allow anyone into the sea until further notice"],
        ["Warn every guest staying at the hostel, not just those on the beach"],
      ]},
      { label: "Person missing or in trouble at sea", items: [
        ["Call line 146 (Dimar & Coast Guard) and the administrator immediately"],
        ["Do not go into the water alone to rescue without a flotation device or help"],
        ["Keep the last known location of the person in sight"],
      ]},
      { label: "Power outage", items: [
        ["Locate flashlights (define a fixed storage spot)"],
        ["Check that no guest is left in dark or unsafe areas (stairs, bathrooms)"],
        ["Report to the administrator if it lasts more than a few hours"],
      ]},
      { label: "Gas leak", items: [
        ["Do not light matches, lighters, or flip electrical switches"],
        ["Close the gas tank valve"],
        ["Ventilate the area by opening doors and windows"],
        ["Keep guests away from the kitchen until the risk is confirmed clear"],
      ]},
    ],
  },
  {
    id: "primeros_auxilios",
    title: "🩹 Basic first aid",
    intro: "Common situations at a beach hostel. For anything serious or that doesn't improve, seek medical attention immediately.",
    groups: [
      { label: "Jellyfish sting", items: [
        ["Rinse with salt water (never fresh water)"], ["Remove tentacle remains with a card, not your hand"], ["Do not rub the area"], ["Apply heat if available"],
      ]},
      { label: "Sunburn", items: [
        ["Move the person to the shade"], ["Hydrate with water"], ["Apply after-sun lotion or aloe if available"], ["Avoid further sun exposure that day"],
      ]},
      { label: "Sea urchin sting", items: [
        ["Do not try to squeeze the spines out"], ["Soak in warm (tolerable) water to ease the pain"], ["Seek medical care if the spines don't come out on their own"],
      ]},
    ],
  },
  {
    id: "recepcion",
    title: "🛎️ Welcoming guests",
    intro: "The team's most important procedure: it's the first and last impression every guest takes away.",
    groups: [
      { label: "Before arrival (prep)", items: [
        ["Communicate with the guest and welcome them through the booking channel","VOLUNTEERS"],
        ["Kitchen clean and ready for use","VOLUNTEERS"],
        ["Bathroom notices/signs checked","VOLUNTEERS"],
        ["Toilets and septic tank clean","VOLUNTEERS"],
        ["Toilet paper stocked","VOLUNTEERS"],
        ["Showers and sinks working","VOLUNTEERS"],
        ["Trash bins emptied","VOLUNTEERS"],
        ["Drains clear","VOLUNTEERS"],
        ["Beds and pillows made, hair-free","VOLUNTEERS"],
        ["Mosquito nets properly set up and clean","VOLUNTEERS"],
        ["Fans working","VOLUNTEERS"],
        ["Locks closing properly with their keys","VOLUNTEERS"],
        ["Corners and shelves clean","VOLUNTEERS"],
        ["Shoe area clean","VOLUNTEERS"],
        ["Hammocks set up","VOLUNTEERS"],
        ["Kitchen working properly","VOLUNTEERS"],
        ["Common areas clean and organized","VOLUNTEERS"],
      ]},
      { label: "Check-in (arrival day)", items: [
        ["Hand over the room","VOLUNTEERS"],
        ["Welcome speech + house rules (no shoes indoors)","VOLUNTEERS"],
        ["Point out the way to the beach and places to eat","VOLUNTEERS"],
        ["Explain kitchen use (dinner and breakfast only)","VOLUNTEERS"],
        ["Collect payment for the booking","ADMIN"],
        ["Offer tours and activities","ADMIN"],
      ]},
      { label: "Mandatory info for guests", items: [
        ["Water use"], ["Waste management"], ["Rest hours"], ["Beach safety"],
      ]},
      { label: "During the stay", items: [
        ["Keep track of guests' departure time","VOLUNTEERS"],
        ["Daily check-in on sleep and meals","VOLUNTEERS"],
        ["Follow up on their activities and plans","VOLUNTEERS"],
        ["Help with unexpected issues or difficulties","VOLUNTEERS"],
      ]},
      { label: "Check-out", items: [
        ["Room inspection","VOLUNTEERS"],
        ["Check for damages, keys, and pending charges","BOTH"],
        ["Collect payment and close the booking","ADMIN"],
        ["Farewell and feedback conversation","BOTH"],
        ["Point out the motorbike-taxi pickup spot","VOLUNTEERS"],
        ["Coordinate cleaning and log any issues","BOTH"],
      ]},
    ],
  },
  {
    id: "atencion",
    title: "💬 Guest service",
    intro: "",
    groups: [
      { label: "Rules", items: [
        ["Respond to requests quickly"], ["Keep a friendly attitude"], ["Never argue with guests"], ["Escalate major conflicts to the administrator"],
      ]},
      { label: "Handling a complaint", items: [
        ["1. Listen"], ["2. Understand"], ["3. Solve"], ["4. Log it"],
      ]},
      { label: "Maximum response times", items: [
        ["WhatsApp: 30 minutes"], ["Instagram: 1 hour"], ["Airbnb and Booking: 1 hour"],
      ]},
      { label: "Suggested opening message", items: [
        ["\u201cHi! Thanks for reaching out to Kambelleh. What dates are you looking to stay, and how many people?\u201d"],
      ]},
      { label: "Foreign guests", items: [
        ["Ask for passport","ADMIN"], ["Verify legal entry into the country","ADMIN"], ["Record nationality and passport number","ADMIN"],
      ]},
    ],
  },
  {
    id: "cocina",
    title: "🍳 Using the shared kitchen",
    intro: "Kambelleh doesn't run a permanent restaurant. The kitchen is available only for breakfast and dinner.",
    groups: [
      { label: "Rules", items: [
        ["Wash any utensils used"], ["Clean the surfaces"], ["Keep things tidy"], ["Label food"], ["Dispose of waste properly"],
      ]},
      { label: "Daily checks", items: [
        ["Fridge clean","VOLUNTEERS"], ["Stove clean","VOLUNTEERS"], ["Sink clean","VOLUNTEERS"], ["Trash taken out","VOLUNTEERS"],
      ]},
    ],
  },
  {
    id: "horarios",
    title: "🕐 General house hours",
    intro: "",
    groups: [
      { label: "Hours", items: [
        ["Check-in: 3:00 PM"], ["Check-out: 12:00 PM (noon)"],
        ["Shared kitchen hours: breakfast and dinner only"],
        ["Quiet / rest hours: from 10:00 PM"],
      ]},
    ],
  },
  {
    id: "voluntariado",
    title: "🤝 Volunteering at Kambelleh",
    intro: "The volunteer team is Kambelleh's daily operational heart: they welcome every guest, keep the house running, and make the promised experience possible.",
    groups: [
      { label: "In return, Kambelleh offers", items: [ ["Accommodation"], ["Tours (accompanying guests)"], ["Shared meals"] ] },
      { label: "In exchange for", items: [ ["4 hours of daily work"] ] },
    ],
  },
  {
    id: "primer_dia",
    title: "🌱 A volunteer's first day",
    intro: "Checklist for when someone new joins the team.",
    groups: [
      { label: "On arrival", items: [
        ["Show their room and where to leave their things"],
        ["Full tour of the house: kitchen, bathrooms, storage room, social area"],
        ["Give the WiFi password"],
        ["Add them to the volunteer WhatsApp group"],
        ["Explain the 4 daily work hours and how they're coordinated"],
        ["Introduce them to the rest of the team"],
      ]},
      { label: "First few days", items: [
        ["Accompany them through their first real check-in, don't leave them alone"],
        ["Go through the full Manual tab of the panel together"],
        ["Answer questions about Cleaning tasks and their frequency"],
      ]},
    ],
  },
  {
    id: "tours",
    title: "🧭 Tours, experiences & wildlife",
    intro: "",
    groups: [
      { label: "Before selling a tour", items: [
        ["Confirm availability","ADMIN"], ["Confirm provider","ADMIN"], ["Confirm weather","ADMIN"], ["Confirm price","ADMIN"],
      ]},
      { label: "After the tour", items: [
        ["Ask the guest for feedback"], ["Log any incident"],
      ]},
      { label: "Whale watching — before", items: [
        ["Confirm weather"], ["Confirm life jackets"], ["Confirm authorized vessel"],
      ]},
      { label: "Whale watching — during", items: [
        ["Do not feed wildlife"], ["Do not litter"], ["Keep a safe distance"], ["Avoid excessive noise"],
      ]},
      { label: "Wildlife handling — main rule", items: [
        ["NEVER KILL WILD ANIMALS"],
      ]},
      { label: "Wildlife — procedure", items: [
        ["Stay calm"], ["Isolate the area"], ["Move guests away"], ["Call for support if needed"],
      ]},
      { label: "Snakes", items: [
        ["Do not handle"], ["Keep your distance"], ["Notify the administrator immediately"],
      ]},
    ],
  },
  {
    id: "proveedores",
    title: "📇 Suppliers & service contacts",
    intro: "Directory of trusted people and businesses Kambelleh works with. Update it as soon as a number changes.",
    groups: [
      { label: "Boat drivers & tours", items: CONTACTOS.en.lancheros.map((x) => [x]) },
      { label: "Transport", items: CONTACTOS.en.transporte.map((x) => [x]) },
      { label: "Shopping in Buenaventura", items: CONTACTOS.en.compras.map((x) => [x]) },
      { label: "Carpentry", items: CONTACTOS.en.carpinteria.map((x) => [x]) },
      { label: "Electrical work", items: CONTACTOS.en.electricidad.map((x) => [x]) },
      { label: "Lawn mowing", items: CONTACTOS.en.poda.map((x) => [x]) },
      { label: "Pest control", items: CONTACTOS.en.fumigacion.map((x) => [x]) },
      { label: "Bird watching", items: CONTACTOS.en.aves.map((x) => [x]) },
    ],
  },
  {
    id: "ingles",
    title: "🗣 Basic Spanish phrases",
    intro: "For check-in and common needs when hosting a Spanish-speaking guest.",
    groups: [
      { label: "Welcome", items: [
        ["Welcome to Kambelleh → Bienvenido a Kambelleh"],
        ["Please take off your shoes before entering → Por favor quítate los zapatos antes de entrar"],
        ["This is your room → Esta es tu habitación"],
      ]},
      { label: "Rules & info", items: [
        ["The kitchen is only for breakfast and dinner → La cocina es solo para desayuno y cena"],
        ["Please be mindful of water use → Por favor cuida el agua"],
        ["The sea can be dangerous, please be careful → El mar puede ser peligroso, ten cuidado"],
      ]},
      { label: "Useful questions", items: [
        ["How many nights will you be staying? → ¿Cuántas noches te vas a quedar?"],
        ["Would you like to book a tour? → ¿Te gustaría hacer un tour?"],
        ["Is everything okay with the room? → ¿Todo bien con la habitación?"],
      ]},
    ],
  },
];
