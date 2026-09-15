import { state } from "../../state.js";
import { t } from "../../plataforma/ui-text.js";
import { escapeHtml } from "../../shared-kernel/dom.js";
import { fmtDate } from "../../shared-kernel/date.js";
import { delBtn } from "../../plataforma/ui/confirm.js";

export function renderBitacora() {
  let html = `<div class="section-title">${t("bit_titulo")} <span class="n">${state.data.bitacora.length} ${t("notas_txt")}</span></div>
  <div class="section-note">${t("bit_nota")}</div>
  <div class="panel">
    <textarea id="bitacora-input" placeholder="${t("bit_placeholder")}" style="width:100%; min-height:70px; background:#0D1811; border:1px solid var(--line); color:var(--text); padding:8px 9px; border-radius:8px; font-family:'Plus Jakarta Sans'; font-size:12.5px; resize:vertical;"></textarea>
    <div style="display:flex; justify-content:flex-end; margin-top:8px;">
      <button class="btn gold sm" onclick="addBitacora()">${t("agregar_nota")}</button>
    </div>
  </div>`;
  if (state.data.bitacora.length === 0) {
    html += `<div class="empty">${t("sin_notas_todavia")}</div>`;
  } else {
    html +=
      `<div class="panel">` +
      state.data.bitacora
        .map(
          (b) => `
      <div class="mov-row" style="align-items:flex-start;">
        <span class="mov-tag warn" style="margin-top:2px;">${fmtDate(b.fecha)}</span>
        <div class="mov-body"><div class="mov-desc" style="white-space:pre-wrap; overflow:visible;">${escapeHtml(b.texto)}</div><div class="mov-meta">${escapeHtml(b.autor || "—")}</div></div>
        ${delBtn("bit:" + b.id, `removeBitacora('${b.id}')`)}
      </div>`,
        )
        .join("") +
      `</div>`;
  }
  document.getElementById("view-bitacora").innerHTML = html;
}
