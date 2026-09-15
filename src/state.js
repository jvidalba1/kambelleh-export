import { save } from "./plataforma/persistence.js";
import { renderAll } from "./render.js";

/**
 * Single shared mutable state object. Every context reads/writes its own
 * fields directly on `state` (e.g. `state.showMantForm = true`) rather than
 * importing individual `let` bindings — ES module imports are read-only
 * live views, so a plain object is the only way for other modules to both
 * read and reassign shared fields.
 */
export const state = {
  // aggregate root
  data: null,
  tab: "resumen",

  // cross-cutting session identity (read/written by 6+ contexts)
  whoAmI: "",

  // tareas
  expandedTasks: {}, // "freq:id" -> bool
  editingTask: null, // "freq:id"

  // sheets-sync
  sheetsUrl: "",
  sheetsToken: "",
  sheetsSyncOk: null, // null = sin intentar, true/false = último resultado
  sheetsPolling: null,
  showSheetsPanel: false,
  lastKnownRev: null,
  lastSyncAt: null,
  nubeShowAdvanced: false,
  showQr: false,
  sheetsStatusTicker: null,
  sheetsSaveTimer: null,

  // onboarding
  gateShowAdvanced: false,

  // persistence
  saveTimer: null,

  // plataforma/ui confirm
  confirmingDelete: null,
  confirmTimer: null,

  // manual
  openManual: { quienes: true },
  manualLang: "es",

  // mantenimiento
  showMantForm: false,

  // inventario
  openCats: { Aseo: true, Cocina: false, "Ropa de cama": false, Sala: false, Herramientas: false },
  editingInv: null, // "cat:id"

  // equipo
  showEquipoForm: false,

  // reporte
  showReporte: false,
};

try {
  state.whoAmI = localStorage.getItem("kambelleh-whoami") || "";
} catch (e) {}

export function mutate(fn) {
  fn();
  state.data._rev = (state.data._rev || 0) + 1;
  state.data._updatedBy = state.whoAmI || "Sin nombre";
  state.data._updatedAt = new Date().toISOString();
  state.lastKnownRev = state.data._rev;
  save();
  renderAll();
}
