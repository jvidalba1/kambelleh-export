import { state } from "../../state.js";
import { escapeHtml } from "../../shared-kernel/dom.js";
import { relTime } from "../../shared-kernel/date.js";
import { KAMBELLEH_SHEETS_URL } from "./client.js";

export function toggleSheetsPanel() {
  state.showSheetsPanel = !state.showSheetsPanel;
  renderSheetsPanel();
}

export function renderSheetsPanel() {
  const el = document.getElementById("sheets-panel");
  if (!el) return;
  if (!state.showSheetsPanel) {
    el.innerHTML = "";
    return;
  }
  if (state.sheetsUrl) {
    el.innerHTML = `<div class="panel">
      <div class="cat-title" style="margin-bottom:6px;">🔗 Conectado a Google Sheets</div>
      <div class="sub" style="margin-bottom:6px; word-break:break-all;">${escapeHtml(state.sheetsUrl)}</div>
      <div class="sub" style="margin-bottom:10px;">Clave: ${state.sheetsToken ? "•".repeat(Math.min(state.sheetsToken.length, 10)) : "(sin clave)"} · Última sincronización: ${relTime(state.lastSyncAt)}</div>
      <div id="qr-holder"></div>
      <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:8px;">
        <button class="btn ghost sm" onclick="pullFromSheets(false).then(()=>renderSheetsPanel())">🔄 Actualizar desde la nube</button>
        <button class="btn ghost sm" onclick="toggleQr()">📱 Código QR</button>
        <button class="btn ghost sm" onclick="disconnectSheets(); renderSheetsPanel();">Desconectar</button>
      </div>
    </div>`;
    if (state.showQr) renderQr();
  } else {
    el.innerHTML = `<div class="panel">
      <div class="cat-title" style="margin-bottom:6px;">🔗 Sincronizar con Google Sheets</div>
      <div class="section-note" style="margin-top:0;">Ingresa la clave secreta del equipo para conectarte a la misma información.</div>
      ${state.nubeShowAdvanced ? `<div class="field" style="margin-top:6px;"><input id="sheets-url-input" placeholder="https://script.google.com/macros/s/..." value="${escapeHtml(KAMBELLEH_SHEETS_URL)}" style="width:100%; background:#0D1811; border:1px solid var(--line); color:var(--text); padding:8px 9px; border-radius:8px; font-family:'Plus Jakarta Sans'; font-size:12px;"></div>` : ""}
      <div style="display:flex; gap:6px; margin-top:6px;">
        <input id="sheets-token-input" type="password" placeholder="Clave secreta" style="flex:1; background:#0D1811; border:1px solid var(--line); color:var(--text); padding:8px 9px; border-radius:8px; font-family:'Plus Jakarta Sans'; font-size:12px;">
        <button class="btn gold sm" onclick="connectSheets()">Conectar</button>
      </div>
      <a href="#" onclick="toggleNubeAdvanced(); return false;" class="sub" style="text-decoration:underline; display:inline-block; margin-top:8px;">${state.nubeShowAdvanced ? "Usar la conexión de Kambelleh" : "¿Necesitas usar otra hoja? (avanzado)"}</a>
    </div>`;
  }
}

export function toggleNubeAdvanced() {
  state.nubeShowAdvanced = !state.nubeShowAdvanced;
  renderSheetsPanel();
}

export function toggleQr() {
  state.showQr = !state.showQr;
  renderSheetsPanel();
}

export function renderQr() {
  const holder = document.getElementById("qr-holder");
  if (!holder) return;
  const content = "KAMBELLEH\nURL: " + state.sheetsUrl + "\nCLAVE: " + state.sheetsToken;
  const imgUrl = "https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=" + encodeURIComponent(content);
  holder.innerHTML = `<div style="background:#fff; padding:10px; border-radius:10px; display:inline-block; margin-top:8px;"><img src="${imgUrl}" width="200" height="200" alt="QR de conexión"></div><div class="sub" style="margin-top:6px;">Al escanearlo se ve el texto con la URL y la clave — cópialas desde ahí.</div>`;
}

Object.assign(window, { toggleSheetsPanel, toggleQr, toggleNubeAdvanced });
