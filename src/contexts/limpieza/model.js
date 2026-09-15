import { state, mutate } from "../../state.js";

export function touchRoom(h) {
  h.actualizadoPor = state.whoAmI || "Sin nombre";
  h.actualizadoEn = new Date().toISOString();
}

export function setEstadoLimpieza(id, estado) {
  mutate(() => {
    const h = state.data.limpieza.find((h) => h.id === id);
    h.estado = estado;
    touchRoom(h);
  });
}

export function setItemEstado(id, key, estado) {
  mutate(() => {
    const h = state.data.limpieza.find((x) => x.id === id);
    if (!h.items) h.items = {};
    h.items[key] = estado;
    touchRoom(h);
  });
}

export function changeLlaves(id, delta) {
  mutate(() => {
    const h = state.data.limpieza.find((x) => x.id === id);
    if (h.llaves === undefined) h.llaves = 2;
    h.llaves = Math.max(0, h.llaves + delta);
    touchRoom(h);
  });
}

export function changeAlmohadas(id, delta) {
  mutate(() => {
    const h = state.data.limpieza.find((x) => x.id === id);
    if (h.almohadasCount === undefined) h.almohadasCount = 2;
    h.almohadasCount = Math.max(0, h.almohadasCount + delta);
    touchRoom(h);
  });
}

Object.assign(window, { setEstadoLimpieza, setItemEstado, changeLlaves, changeAlmohadas });
