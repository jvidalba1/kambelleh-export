import { state } from "../../state.js";
import { t } from "../../plataforma/ui-text.js";
import { escapeHtml } from "../../shared-kernel/dom.js";
import { fmtDate } from "../../shared-kernel/date.js";
import { isTaskDone } from "../tareas/model.js";
import { historialHtml } from "./model.js";
import { renderReporte } from "../reporte/view.js";

export function renderResumen() {
  const diarioPend = state.data.tasks.diario.filter((tk) => !isTaskDone("diario", tk.id)).length;
  const mantAbiertas = state.data.mantenimiento.filter((m) => m.estado !== "resuelta").length;
  const habNoListas = state.data.limpieza.filter((h) => h.estado !== "limpia").length;
  const llavesFaltantes = state.data.limpieza.filter((h) => (h.llaves === undefined ? 2 : h.llaves) < 2).length;
  let html = `<div class="section-title">${t("resumen_titulo")} ${state.whoAmI ? t("resumen_hola") + " " + escapeHtml(state.whoAmI) : ""}</div>
  <div class="section-note">${t("resumen_nota")}</div>
  <div class="grid">
    <div class="card" style="cursor:pointer;" onclick="setTab('tareas')"><div class="card-label">${t("tareas_hoy")}</div><div class="card-value ${diarioPend ? "neg" : "pos"}">${diarioPend}</div></div>
    <div class="card" style="cursor:pointer;" onclick="setTab('mantenimiento')"><div class="card-label">${t("incidencias_abiertas")}</div><div class="card-value ${mantAbiertas ? "neg" : "pos"}">${mantAbiertas}</div></div>
    <div class="card" style="cursor:pointer;" onclick="setTab('limpieza')"><div class="card-label">${t("hab_no_listas")}</div><div class="card-value ${habNoListas ? "neg" : "pos"}">${habNoListas}</div></div>
    <div class="card" style="cursor:pointer;" onclick="setTab('limpieza')"><div class="card-label">${t("hab_llaves")}</div><div class="card-value ${llavesFaltantes ? "neg" : "pos"}">${llavesFaltantes}</div></div>
  </div>
  <button class="btn ghost sm" style="margin-bottom:12px;" onclick="toggleReporte()">${t("generar_reporte")}</button>
  <div id="reporte-holder"></div>
  <div class="section-title">${t("ultimas_notas")}</div>`;
  if (state.data.bitacora.length === 0) {
    html += `<div class="empty">${t("sin_notas")}</div>`;
  } else {
    html +=
      `<div class="panel">` +
      state.data.bitacora
        .slice(0, 3)
        .map(
          (b) => `
      <div class="mov-row" style="align-items:flex-start;">
        <span class="mov-tag warn" style="margin-top:2px;">${fmtDate(b.fecha)}</span>
        <div class="mov-body"><div class="mov-desc" style="white-space:pre-wrap; overflow:visible;">${escapeHtml(b.texto)}</div><div class="mov-meta">${escapeHtml(b.autor || "—")}</div></div>
      </div>`,
        )
        .join("") +
      `</div>`;
  }
  html += historialHtml();
  document.getElementById("view-resumen").innerHTML = html;
  if (state.showReporte) renderReporte();
}
