import { state } from "../../state.js";
import { renderAll } from "../../render.js";
import { t } from "../../plataforma/ui-text.js";
import { escapeHtml } from "../../shared-kernel/dom.js";
import { delBtn } from "../../plataforma/ui/confirm.js";
import { DIA_KEYS } from "./data.js";

export function toggleShowEquipoForm() {
  state.showEquipoForm = !state.showEquipoForm;
  renderAll();
}

export function renderEquipo() {
  let html = `<div class="section-title">${t("equipo_titulo")} <span class="n">${state.data.equipo.length}</span></div>
  <div class="section-note">${t("equipo_nota")}</div>
  <button class="btn ghost sm" style="margin-bottom:12px;" onclick="toggleShowEquipoForm()">${state.showEquipoForm ? t("cancelar") : t("agregar_persona")}</button>`;
  if (state.showEquipoForm) {
    html += `<div class="panel">
      <div class="field"><label>${t("nombre")}</label><input id="eq-nombre" placeholder="Nombre completo"></div>
      <div class="field-row">
        <div class="field"><label>${t("rol")}</label><input id="eq-rol" placeholder="Voluntariado / Administrador"></div>
        <div class="field"><label>${t("turno")}</label><input id="eq-turno" placeholder="Ej. mañana, fin de semana..."></div>
      </div>
      <button class="btn gold" onclick="addEquipo()">${t("agregar").replace("+ ", "")}</button>
    </div>`;
  }
  html +=
    `<div class="panel">` +
    state.data.equipo
      .map(
        (e) => `
    <div class="mov-row">
      <span class="mov-tag good">${escapeHtml(e.rol)}</span>
      <div class="mov-body"><div class="mov-desc">${escapeHtml(e.nombre)}</div><div class="mov-meta">${t("turno")}: ${escapeHtml(e.turno)}</div></div>
      ${delBtn("eq:" + e.id, `removeEquipo('${e.id}')`)}
    </div>`,
      )
      .join("") +
    `</div>`;

  const DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  html += `<div class="section-title">${t("turnos_semana")}</div>
  <div class="section-note">${t("turnos_nota")}</div>`;
  if (state.data.equipo.length === 0) {
    html += `<div class="empty">Agrega personas al equipo para poder asignarles turnos.</div>`;
  } else {
    html +=
      `<div class="panel">` +
      DIAS.map(
        (dia) => `
      <div style="margin-bottom:14px;">
        <div class="group-label" style="margin:0 0 6px;">${t(DIA_KEYS[dia])}</div>
        <div style="display:flex; gap:6px; flex-wrap:wrap;">
          ${state.data.equipo
            .map((e) => {
              const on = (state.data.turnos[dia] || []).includes(e.id);
              return `<button class="status-btn ${on ? "on" : ""}" onclick="toggleTurno('${dia}','${e.id}')">${escapeHtml(e.nombre)}</button>`;
            })
            .join("")}
        </div>
      </div>`,
      ).join("") +
      `</div>`;
  }
  document.getElementById("view-equipo").innerHTML = html;
}

Object.assign(window, { toggleShowEquipoForm });
