import { state } from "../../state.js";
import { renderAll } from "../../render.js";
import { t } from "../ui-text.js";
import { pendingCount } from "../persistence.js";

export const NAV = [
  { key: "resumen", labelKey: "tab_resumen" },
  { key: "manual", labelKey: "tab_manual" },
  { key: "tareas", labelKey: "tab_tareas" },
  { key: "limpieza", labelKey: "tab_limpieza" },
  { key: "mantenimiento", labelKey: "tab_mantenimiento" },
  { key: "inventario", labelKey: "tab_inventario" },
  { key: "proveedores", labelKey: "tab_proveedores" },
  { key: "bitacora", labelKey: "tab_bitacora" },
  { key: "equipo", labelKey: "tab_equipo" },
];

export function renderTabs() {
  document.getElementById("main-tabs").innerHTML = NAV.map((n) => {
    const pend = pendingCount(n.key);
    return `<button class="main-tab ${state.tab === n.key ? "active" : ""}" onclick="setTab('${n.key}')">${t(n.labelKey)}${pend > 0 ? `<span class="pend">${pend}</span>` : ""}</button>`;
  }).join("");
}

export function setTab(k) {
  state.tab = k;
  renderAll();
}

Object.assign(window, { setTab });
