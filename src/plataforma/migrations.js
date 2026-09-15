import { state } from "../state.js";
import { uid } from "../shared-kernel/dom.js";
import { periodSortValue } from "../shared-kernel/frequency.js";
import { buildDefaultInventory } from "../contexts/inventario/data.js";
import {
  buildDefaultTasks,
  ensureInventoryCategories,
  ensureRealEquipo,
  ensureZoneTasks,
  ensureRoomsSync,
} from "./defaults.js";

export function applyMigrations() {
  const data = state.data;
  if (!data.taskChecks) data.taskChecks = {};
  if (!data.tasks) data.tasks = buildDefaultTasks();
  if (!data.inventory) data.inventory = buildDefaultInventory();
  if (!data.bitacora) data.bitacora = [];
  if (!data.equipo) data.equipo = [{ id: uid(), nombre: "Administrador", rol: "Administrador", turno: "General" }];
  ensureRealEquipo();
  if (!data.turnos)
    data.turnos = { Lunes: [], Martes: [], Miércoles: [], Jueves: [], Viernes: [], Sábado: [], Domingo: [] };
  ensureZoneTasks();
  ensureRoomsSync();
  ensureInventoryCategories();
  pruneOldTaskChecks();
}

export function pruneOldTaskChecks() {
  const data = state.data;
  const RETAIN = { diario: 90, semanal: 26, quincenal: 12, mensual: 12, trimestral: 8 };
  const byFreqPeriods = {};
  Object.keys(data.taskChecks).forEach((k) => {
    const parts = k.split(":");
    const freq = parts[0],
      period = parts[1];
    if (!byFreqPeriods[freq]) byFreqPeriods[freq] = new Set();
    byFreqPeriods[freq].add(period);
  });
  const keepSets = {};
  Object.keys(byFreqPeriods).forEach((freq) => {
    const periods = Array.from(byFreqPeriods[freq]);
    periods.sort((a, b) => periodSortValue(freq, a) - periodSortValue(freq, b));
    const n = RETAIN[freq] || 24;
    keepSets[freq] = new Set(periods.slice(-n));
  });
  let removed = 0;
  Object.keys(data.taskChecks).forEach((k) => {
    const parts = k.split(":");
    const freq = parts[0],
      period = parts[1];
    if (keepSets[freq] && !keepSets[freq].has(period)) {
      delete data.taskChecks[k];
      removed++;
    }
  });
  return removed;
}
