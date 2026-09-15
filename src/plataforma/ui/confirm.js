import { state } from "../../state.js";
import { renderAll } from "../../render.js";

export function isConfirming(key) {
  return state.confirmingDelete === key;
}

export function armConfirm(key) {
  state.confirmingDelete = key;
  renderAll();
  clearTimeout(state.confirmTimer);
  state.confirmTimer = setTimeout(() => {
    state.confirmingDelete = null;
    renderAll();
  }, 6000);
}

export function delBtn(key, onclickExpr, label) {
  label = label || "✕";
  if (isConfirming(key)) {
    return `<button class="mov-del" style="color:var(--coral); font-weight:700; font-size:10.5px;" onclick="${onclickExpr}">¿Borrar?</button>`;
  }
  return `<button class="mov-del" onclick="armConfirm('${key}'); event.stopPropagation();" title="Eliminar">${label}</button>`;
}

Object.assign(window, { armConfirm });
