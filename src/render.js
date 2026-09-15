import { state } from "./state.js";
import { applyStaticUiText } from "./plataforma/ui-text.js";
import { renderTabs } from "./plataforma/ui/tabs.js";
import { renderSheetsPanel } from "./integraciones/sheets-sync/view.js";
import { renderResumen } from "./contexts/resumen/view.js";
import { renderManual } from "./contexts/manual/view.js";
import { renderProveedores } from "./contexts/proveedores/view.js";
import { renderTareas } from "./contexts/tareas/view.js";
import { renderLimpieza } from "./contexts/limpieza/view.js";
import { renderMantenimiento } from "./contexts/mantenimiento/view.js";
import { renderInventario } from "./contexts/inventario/view.js";
import { renderBitacora } from "./contexts/bitacora/view.js";
import { renderEquipo } from "./contexts/equipo/view.js";

export function renderAll() {
  document.getElementById("today-date").textContent = new Date().toLocaleDateString("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const whoInput = document.getElementById("whoami-input");
  if (whoInput && document.activeElement !== whoInput) whoInput.value = state.whoAmI;
  applyStaticUiText();
  renderTabs();
  renderSheetsPanel();
  renderResumen();
  renderManual();
  renderProveedores();
  renderTareas();
  renderLimpieza();
  renderMantenimiento();
  renderInventario();
  renderBitacora();
  renderEquipo();
  document.querySelectorAll(".main-view").forEach((v) => v.classList.remove("active"));
  document.getElementById("view-" + state.tab).classList.add("active");
}

document.addEventListener("click", (e) => {
  const wrap = document.getElementById("search-wrap");
  if (wrap && !wrap.contains(e.target)) document.getElementById("search-results").classList.remove("open");
});
