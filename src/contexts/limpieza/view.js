import { state } from "../../state.js";
import { t } from "../../plataforma/ui-text.js";
import { escapeHtml } from "../../shared-kernel/dom.js";
import { fmtTime } from "../../shared-kernel/date.js";
import { CLEAN_ROOMS, ROOM_ITEMS, ITEM_STATES, ROOM_ITEM_KEYS } from "./data.js";

export function renderLimpieza() {
  let html = `<div class="section-title">${t("hab_titulo")} <span class="n">${state.data.limpieza.filter((h) => h.estado === "limpia").length}/${CLEAN_ROOMS.length}</span></div>
  <div class="section-note">${t("hab_nota")}</div>`;
  state.data.limpieza.forEach((h) => {
    if (!h.items) h.items = {};
    ROOM_ITEMS.forEach(([key]) => {
      if (!h.items[key]) h.items[key] = "bueno";
    });
    if (h.llaves === undefined) h.llaves = 2;
    if (h.almohadasCount === undefined) h.almohadasCount = 2;
    html += `<div class="room-card"><div class="room-top"><span class="room-name">${h.nombre}</span><span class="mov-tag ${h.estado === "limpia" ? "good" : h.estado === "en proceso" ? "warn" : "bad"}">${t(h.estado === "en proceso" ? "en_proceso" : h.estado)}</span></div>
    <div class="status-row">
      ${["limpia", "en proceso", "pendiente"].map((e) => `<button class="status-btn ${h.estado === e ? "on" : ""}" onclick="setEstadoLimpieza('${h.id}','${e}')">${t(e === "en proceso" ? "en_proceso" : e)}</button>`).join("")}
    </div>
    <div style="margin-top:10px; display:flex; flex-direction:column; gap:8px;">
      ${ROOM_ITEMS.map(
        ([key]) => `
        <div style="display:flex; align-items:center; justify-content:space-between; gap:8px; flex-wrap:wrap;">
          <span class="sub" style="font-size:11px;">${t(ROOM_ITEM_KEYS[key])}</span>
          <div class="status-row">
            ${ITEM_STATES.map((st) => `<button class="status-btn ${h.items[key] === st ? "on" : ""}" onclick="setItemEstado('${h.id}','${key}','${st}')">${t(st)}</button>`).join("")}
          </div>
        </div>`,
      ).join("")}
      <div class="discreet-counter">
        <span class="sub" style="font-size:11px;">${t("almohadas")}</span>
        <div class="discreet-counter-controls">
          <button onclick="changeAlmohadas('${h.id}',-1)">−</button>
          <span>${h.almohadasCount}</span>
          <button onclick="changeAlmohadas('${h.id}',1)">+</button>
        </div>
      </div>
      <div class="discreet-counter">
        <span class="sub" style="font-size:11px;">${t("llaves")}</span>
        <div class="discreet-counter-controls">
          <button onclick="changeLlaves('${h.id}',-1)">−</button>
          <span>${h.llaves}</span>
          <button onclick="changeLlaves('${h.id}',1)">+</button>
        </div>
      </div>
    </div>
    ${h.actualizadoPor ? `<div class="sub" style="margin-top:8px; font-size:10px;">${t("ult_actualizacion")}: ${escapeHtml(h.actualizadoPor)} · ${fmtTime(h.actualizadoEn)}</div>` : ""}
    </div>`;
  });
  document.getElementById("view-limpieza").innerHTML = html;
}
