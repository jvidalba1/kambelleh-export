import { state } from "../../state.js";
import { escapeHtml } from "../../shared-kernel/dom.js";
import { generarTextoReporte } from "./model.js";

export function toggleReporte() {
  state.showReporte = !state.showReporte;
  renderReporte();
}

export function renderReporte() {
  const holder = document.getElementById("reporte-holder");
  if (!holder) return;
  if (!state.showReporte) {
    holder.innerHTML = "";
    return;
  }
  const txt = generarTextoReporte();
  holder.innerHTML = `<div class="panel">
    <textarea id="reporte-texto" readonly style="width:100%; min-height:180px; background:#0D1811; border:1px solid var(--line); color:var(--text); padding:10px; border-radius:8px; font-family:'IBM Plex Mono',monospace; font-size:11.5px; white-space:pre-wrap;">${escapeHtml(txt)}</textarea>
    <button class="btn gold sm" style="margin-top:8px;" onclick="copiarReporte()">📋 Copiar para WhatsApp</button>
    <span id="reporte-copy-msg" class="sub" style="margin-left:8px;"></span>
  </div>`;
}

export function copiarReporte() {
  const ta = document.getElementById("reporte-texto");
  const msg = document.getElementById("reporte-copy-msg");
  ta.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch (e) {}
  if (!ok && navigator.clipboard) {
    navigator.clipboard.writeText(ta.value).catch(() => {});
    ok = true;
  }
  if (msg) {
    msg.textContent = ok ? "✓ Copiado" : "Selecciona y copia manualmente";
    setTimeout(() => {
      msg.textContent = "";
    }, 2500);
  }
}

Object.assign(window, { toggleReporte, copiarReporte });
