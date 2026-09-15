import { uid } from "../../shared-kernel/dom.js";

export const INVENTORY_DEFAULTS = {
  "Aseo": {
    updated: "sep 2026",
    items: [
      ["Papel higiénico","24"], ["Jabón líquido de ropa","0 L"], ["Suavizante de tela","500 ml"],
      ["Jabón líquido de manos","8 L"], ["Limpido","0"], ["Limpiador bicarbonato","0"],
      ["Acarclin","2"], ["Aromatizantes de baño","0"], ["Bolsas de papelera","0"],
      ["Bolsas de basura grande","0"], ["Lavadora","1"], ["Botas pantaneras","2"], ["Escalera de madera","1"],
      ["Tanques de agua 1000L","4"], ["Cepillo de mano para ropa","1"], ["Porta jabones de ducha","4"],
      ["Jaboneras de vidrio","2"], ["Recogedor","1"], ["Guantes amarillos de aseo","1 en uso"], ["Rastrillo plástico","1"],
      ["Destapa baños","1"], ["Cepillo de piso","1 en uso"], ["Cepillos de inodoro","3"], ["Escobas","2 en uso"],
      ["Trapeador","1 nuevo + 2 en uso"], ["Porta basura de baño","3"], ["Esponjas de losa","0"],
      ["Paños de cocina","0"], ["Toallas de tela para limpiar","1 nueva + 9 en uso"], ["Tarros de basura grande","2"],
    ],
  },
  "Cocina": {
    updated: "sep 2026",
    items: [
      ["Nevera","1"], ["Hieleras","3"], ["Hielos en gel","6"], ["Arrocera","1"], ["Licuadora completa","1"],
      ["Tetera eléctrica","1"], ["Estufa de 2 puestos","1"], ["Pipa de gas con manguera","1"], ["Cocina integral","1"],
      ["Batidor","1"], ["Espátulas de madera","2"], ["Cuchara de madera","1"], ["Tenedor de madera","1"],
      ["Tijera de cocina","1"], ["Exprimidor de limón","1"], ["Cuchillos","3"], ["Cucharón de metal","1"],
      ["Cubiertero completo","1"], ["Cucharas","25"], ["Tenedores","15"], ["Tarros café/sal/azúcar","3"],
      ["Prensas francesas","2"], ["Soportes para tapas","2"], ["Bandeja plástica ensalada","1"], ["Colador de acero","1"],
      ["Asador de arepas","1"], ["Colador de café","3"], ["Taper completo","6"], ["Pitadora completa","1"],
      ["Rallador","1"], ["Tablas de picar","2"], ["Pataconera","1"], ["Olletas pequeñas","2"], ["Ollas de aluminio","4"],
      ["Tapas de aluminio","7"], ["Ollas de teflón","3"], ["Jarra plástica con tapa","1"], ["Tapas de vidrio","7"],
      ["Vasos plásticos transparentes","10"], ["Vasos plásticos gris","3"], ["Vasos de aluminio","3"],
      ["Tazas de vidrio","3"], ["Tazas de porcelana","2"], ["Recipientes plásticos","7"], ["Caneca de basura","1"],
      ["Platos hondos","5"], ["Platos pandos redondos","7"], ["Plato pando cuadrado","3"], ["Plato hondo cuadrado","3"],
      ["Filtros de agua","2"], ["Sartenes","4"],
    ],
  },
  "Ropa de cama": {
    updated: "sep 2026",
    items: [
      ["Fundas de almohada","54"], ["Forros de almohada en tela","11 (5 manchadas)"], ["Sábanas resortadas","16 + 2 nuevas"],
      ["Sobresábanas","28"], ["Toallas grandes huéspedes","20"], ["Toallas de mano huéspedes","2"],
      ["Mosquiteros","10"], ["Hamacas","5"], ["Forros de colchón antifluidos","10"], ["Almohadas en uso","15"],
    ],
  },
  "Sala": {
    updated: "sin registrar",
    items: [],
  },
  "Herramientas": {
    updated: "sin registrar",
    items: [],
  },
};

export function buildDefaultInventory(){
  const out = {};
  Object.entries(INVENTORY_DEFAULTS).forEach(([cat, info])=>{
    out[cat] = { updated: info.updated, items: info.items.map(([name,qty])=>({ id: uid(), name, qty })) };
  });
  return out;
}
