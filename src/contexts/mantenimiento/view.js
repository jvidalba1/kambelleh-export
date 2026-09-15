import { state } from "../../state.js";
import { renderAll } from "../../render.js";
import { t } from "../../plataforma/ui-text.js";
import { escapeHtml } from "../../shared-kernel/dom.js";
import { fmtDate } from "../../shared-kernel/date.js";
import { delBtn } from "../../plataforma/ui/confirm.js";
import { ZONAS } from "./data.js";

export function toggleShowMantForm() {
  state.showMantForm = !state.showMantForm;
  renderAll();
}

export function renderMantenimiento() {
  let html = `<div class="section-title">${t("mant_titulo")} <span class="n">${state.data.mantenimiento.filter((m) => m.estado !== "resuelta").length} ${t("abiertas")}</span></div>
  <div class="section-note">${t("mant_nota")}</div>
  <button class="btn ghost sm" style="margin-bottom:12px;" onclick="toggleShowMantForm()">${state.showMantForm ? t("cancelar") : t("reportar_incidencia")}</button>`;
  if (state.showMantForm) {
    html += `<div class="panel">
      <div class="field"><label>${t("descripcion")}</label><input id="mf-item" placeholder="Ej. gotera, chapa dañada..."></div>
      <div class="field-row">
        <div class="field"><label>${t("zona")}</label><select id="mf-zona">${ZONAS.map((z) => `<option>${z}</option>`).join("")}</select></div>
        <div class="field"><label>${t("notas")}</label><input id="mf-notas"></div>
      </div>
      <button class="btn gold" onclick="addMant()">${t("guardar_btn")}</button>
    </div>`;
  }
  if (state.data.mantenimiento.length === 0) {
    html += `<div class="empty">${t("sin_incidencias")}</div>`;
  } else {
    html +=
      `<div class="panel">` +
      state.data.mantenimiento
        .slice()
        .sort((a, b) => b.fecha.localeCompare(a.fecha))
        .map(
          (m) => `
      <div class="mov-row">
        <span class="mov-tag ${m.estado === "resuelta" ? "good" : "bad"}">${m.estado === "resuelta" ? "✓" : "!"}</span>
        <div class="mov-body">
          <div class="mov-desc">${m.item}</div>
          <div class="mov-meta">${m.zona} · ${fmtDate(m.fecha)}${m.notas ? ` · ${m.notas}` : ""}${m.estado === "resuelta" && m.resueltoPor ? ` · ${t("resuelto_por")} ${escapeHtml(m.resueltoPor)}` : ""}</div>
        </div>
        <button class="btn ghost sm" onclick="resolveMant('${m.id}')">${m.estado === "resuelta" ? t("reabrir") : t("resolver")}</button>
        ${delBtn("mant:" + m.id, `removeMant('${m.id}')`)}
      </div>`,
        )
        .join("") +
      `</div>`;
  }
  document.getElementById("view-mantenimiento").innerHTML = html;
}

Object.assign(window, { toggleShowMantForm });
