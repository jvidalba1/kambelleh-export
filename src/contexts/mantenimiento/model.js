import { state, mutate } from "../../state.js";
import { uid } from "../../shared-kernel/dom.js";
import { todayISO } from "../../shared-kernel/date.js";

export function resolveMant(id) {
  mutate(() => {
    const m = state.data.mantenimiento.find((x) => x.id === id);
    const wasOpen = m.estado !== "resuelta";
    m.estado = wasOpen ? "resuelta" : "abierta";
    if (wasOpen) {
      m.resueltoPor = state.whoAmI || "Sin nombre";
      m.resueltoEn = new Date().toISOString();
    } else {
      m.resueltoPor = null;
      m.resueltoEn = null;
    }
  });
}

export function removeMant(id) {
  state.confirmingDelete = null;
  mutate(() => {
    state.data.mantenimiento = state.data.mantenimiento.filter((m) => m.id !== id);
  });
}

export function addMant() {
  const item = document.getElementById("mf-item").value.trim();
  if (!item) return;
  mutate(() => {
    state.data.mantenimiento.push({
      id: uid(),
      item,
      zona: document.getElementById("mf-zona").value,
      notas: document.getElementById("mf-notas").value,
      estado: "abierta",
      fecha: todayISO(),
    });
  });
  state.showMantForm = false;
}

Object.assign(window, { resolveMant, removeMant, addMant });
