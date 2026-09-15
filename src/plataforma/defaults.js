import { state } from "../state.js";
import { save } from "./persistence.js";
import { uid } from "../shared-kernel/dom.js";
import { addDays } from "../shared-kernel/date.js";
import { FREQ_ORDER } from "../shared-kernel/frequency.js";
import { TASKS } from "../contexts/tareas/data.js";
import { CLEAN_ROOMS } from "../contexts/limpieza/data.js";
import { INVENTORY_DEFAULTS, buildDefaultInventory } from "../contexts/inventario/data.js";

export function buildDefaultTasks() {
  const out = {};
  FREQ_ORDER.forEach((freq) => {
    out[freq] = TASKS[freq].items.map((it, idx) => ({
      id: freq + "-" + idx,
      text: it.text,
      steps: (it.steps || []).map((s) => ({ id: uid(), text: s })),
    }));
  });
  return out;
}

export function seedData() {
  return {
    limpieza: CLEAN_ROOMS.map((r) => ({
      id: uid(),
      nombre: r.label,
      estado: r.id === "101" ? "pendiente" : "limpia",
      items: { ventilador: "bueno", toldillo: "bueno", colchon: "bueno", puerta: "bueno", sabanas: "bueno" },
      almohadasCount: 2,
      llaves: 2,
    })),
    mantenimiento: [
      { id: uid(), item: "Gotera techo hab. 205", zona: "Techos", estado: "abierta", fecha: addDays(-3), notas: "Revisar tras lluvia" },
      { id: uid(), item: "Chapa puerta hab. 208", zona: "Chapas", estado: "resuelta", fecha: addDays(-6), notas: "Cambiada" },
    ],
    tasks: buildDefaultTasks(),
    inventory: buildDefaultInventory(),
    taskChecks: {},
    bitacora: [],
    equipo: [
      { id: uid(), nombre: "Rogers", rol: "Administrador", turno: "—" },
      { id: uid(), nombre: "Florentino", rol: "Administrador", turno: "—" },
      { id: uid(), nombre: "Jon", rol: "Administrador", turno: "—" },
      { id: uid(), nombre: "Voluntario", rol: "Voluntariado", turno: "—" },
    ],
    turnos: { Lunes: [], Martes: [], Miércoles: [], Jueves: [], Viernes: [], Sábado: [], Domingo: [] },
  };
}

export function ensureInventoryCategories() {
  let changed = false;
  Object.keys(INVENTORY_DEFAULTS).forEach((cat) => {
    if (!state.data.inventory[cat]) {
      state.data.inventory[cat] = {
        updated: INVENTORY_DEFAULTS[cat].updated,
        items: INVENTORY_DEFAULTS[cat].items.map(([name, qty]) => ({ id: uid(), name, qty })),
      };
      changed = true;
    }
  });
  if (changed) save();
}

export function ensureRealEquipo() {
  const soloGenerico = state.data.equipo.length === 1 && state.data.equipo[0].nombre === "Administrador";
  if (soloGenerico) {
    state.data.equipo = [
      { id: uid(), nombre: "Rogers", rol: "Administrador", turno: "—" },
      { id: uid(), nombre: "Florentino", rol: "Administrador", turno: "—" },
      { id: uid(), nombre: "Jon", rol: "Administrador", turno: "—" },
      { id: uid(), nombre: "Voluntario", rol: "Voluntariado", turno: "—" },
    ];
    save();
  }
}

export function ensureZoneTasks() {
  const zonas = ["Sala", "Cocina", "Bodega", "Lavamanos"];
  const diario = state.data.tasks.diario;
  let changed = false;
  zonas.forEach((z) => {
    const exists = diario.some((t) => t.text.trim().toLowerCase() === z.toLowerCase());
    if (!exists) {
      diario.push({ id: "diario-" + uid(), text: z });
      changed = true;
    }
  });
  if (changed) save();
}

export function ensureRoomsSync() {
  const validLabels = CLEAN_ROOMS.map((r) => r.label);
  let changed = false;
  CLEAN_ROOMS.forEach((r) => {
    const exists = state.data.limpieza.some((h) => h.nombre === r.label);
    if (!exists) {
      state.data.limpieza.push({
        id: uid(),
        nombre: r.label,
        estado: "limpia",
        items: { ventilador: "bueno", toldillo: "bueno", colchon: "bueno", puerta: "bueno", sabanas: "bueno" },
        almohadasCount: 2,
        llaves: 2,
      });
      changed = true;
    }
  });
  const before = state.data.limpieza.length;
  state.data.limpieza = state.data.limpieza.filter((h) => validLabels.includes(h.nombre));
  if (state.data.limpieza.length !== before) changed = true;
  state.data.limpieza.sort((a, b) => validLabels.indexOf(a.nombre) - validLabels.indexOf(b.nombre));
  if (changed) save();
}
