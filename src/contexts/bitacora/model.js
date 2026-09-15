import { state, mutate } from "../../state.js";
import { uid } from "../../shared-kernel/dom.js";
import { todayISO } from "../../shared-kernel/date.js";

export function addBitacora() {
  const input = document.getElementById("bitacora-input");
  const texto = input.value.trim();
  if (!texto) return;
  mutate(() => {
    state.data.bitacora.unshift({ id: uid(), fecha: todayISO(), texto, autor: state.whoAmI || "Sin nombre" });
  });
  input.value = "";
}

export function removeBitacora(id) {
  state.confirmingDelete = null;
  mutate(() => {
    state.data.bitacora = state.data.bitacora.filter((b) => b.id !== id);
  });
}

Object.assign(window, { addBitacora, removeBitacora });
