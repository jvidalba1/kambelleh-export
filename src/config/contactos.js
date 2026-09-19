// Real hostel contact directory (names + phone numbers) — never committed:
// this whole `src/config/` folder is gitignored. Consumed by
// src/contexts/manual/content.js to build the "Emergencias" and
// "Proveedores" sections of the manual without any personal data in git.
//
// If this file is missing (fresh clone), the build breaks on import —
// recreate it with this same shape, filled in with your real contacts.

export const CONTACTOS = {
  es: {
    adminLine: "Administrador / responsable del hostal: +57 302 370 6969",
    boatLine: "Contacto de lancha — Destino Pacífico: +57 333 033 4088",
    lancheros: [
      "Fernando: +57 316 418 2484",
      "Amadeo: +57 317 754 6099",
      "Gustavo: +57 318 269 3584",
      "Manuel: +57 318 636 9243",
    ],
    transporte: [
      "Wilson — transporte y encomienda Cali-Buenaventura: +57 313 750 5742",
      "Jhon — transporte y encomiendas en La Barra: +57 317 831 4931",
      "Jhonny Rut: +57 321 808 0051",
      "Juanchaco VIP — encomiendas: +57 300 546 6784",
    ],
    compras: [
      "Leidy — encomienda: +57 312 747 3441",
      "Comida para mascotas — Petshop: +57 317 577 6193",
      "Ferretería / pintura — Ferre Maderas: +57 300 567 6376",
    ],
    carpinteria: ["Mario Rivas: +57 310 260 9939", "Amadeo: +57 317 754 6099"],
    electricidad: ["Hugo Ramírez: +57 311 890 2859", "Sebastián: +57 315 756 6437"],
    poda: ["Mario Rivas: +57 310 260 9939"],
    fumigacion: ["Rómulo Obando: +57 314 721 4394"],
    aves: ["Gustavo: +57 318 269 3584"],
  },
  en: {
    adminLine: "Administrator / hostel manager: +57 302 370 6969",
    boatLine: "Boat contact — Destino Pacífico: +57 333 033 4088",
    lancheros: [
      "Fernando: +57 316 418 2484",
      "Amadeo: +57 317 754 6099",
      "Gustavo: +57 318 269 3584",
      "Manuel: +57 318 636 9243",
    ],
    transporte: [
      "Wilson — transport & parcels Cali-Buenaventura: +57 313 750 5742",
      "Jhon — transport & parcels in La Barra: +57 317 831 4931",
      "Jhonny Rut: +57 321 808 0051",
      "Juanchaco VIP — parcels: +57 300 546 6784",
    ],
    compras: [
      "Leidy — parcel delivery: +57 312 747 3441",
      "Pet food — Petshop: +57 317 577 6193",
      "Hardware / paint — Ferre Maderas: +57 300 567 6376",
    ],
    carpinteria: ["Mario Rivas: +57 310 260 9939", "Amadeo: +57 317 754 6099"],
    electricidad: ["Hugo Ramírez: +57 311 890 2859", "Sebastián: +57 315 756 6437"],
    poda: ["Mario Rivas: +57 310 260 9939"],
    fumigacion: ["Rómulo Obando: +57 314 721 4394"],
    aves: ["Gustavo: +57 318 269 3584"],
  },
};
