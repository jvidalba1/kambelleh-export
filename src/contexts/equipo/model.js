import { state, mutate } from "../../state.js";
import { uid } from "../../shared-kernel/dom.js";

export function setWhoAmI(val) {
  state.whoAmI = val.trim();
  try {
    localStorage.setItem("kambelleh-whoami", state.whoAmI);
  } catch (e) {}
}

export function addEquipo() {
  const nombre = document.getElementById("eq-nombre").value.trim();
  if (!nombre) return;
  mutate(() => {
    state.data.equipo.push({
      id: uid(),
      nombre,
      rol: document.getElementById("eq-rol").value.trim() || "Voluntariado",
      turno: document.getElementById("eq-turno").value.trim() || "—",
    });
  });
  state.showEquipoForm = false;
}

export function removeEquipo(id) {
  state.confirmingDelete = null;
  mutate(() => {
    state.data.equipo = state.data.equipo.filter((e) => e.id !== id);
    Object.keys(state.data.turnos || {}).forEach((dia) => {
      state.data.turnos[dia] = state.data.turnos[dia].filter((x) => x !== id);
    });
  });
}

export function toggleTurno(dia, equipoId) {
  mutate(() => {
    if (!state.data.turnos[dia]) state.data.turnos[dia] = [];
    const list = state.data.turnos[dia];
    const i = list.indexOf(equipoId);
    if (i >= 0) list.splice(i, 1);
    else list.push(equipoId);
  });
}

Object.assign(window, { setWhoAmI, addEquipo, removeEquipo, toggleTurno });
