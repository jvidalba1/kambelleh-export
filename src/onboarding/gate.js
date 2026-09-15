import { state } from "../state.js";
import { escapeHtml } from "../shared-kernel/dom.js";
import { KAMBELLEH_SHEETS_URL } from "../integraciones/sheets-sync/client.js";
import { setSheetsCreds, finalizeConnect, disconnectSheets } from "../integraciones/sheets-sync/sync.js";

export function maybeShowGate() {
  const el = document.getElementById("gate-overlay");
  if (!el) return;
  if (state.sheetsUrl && state.sheetsToken) {
    el.classList.remove("show");
    return;
  }
  renderGate();
  el.classList.add("show");
}

export function toggleGateAdvanced() {
  state.gateShowAdvanced = !state.gateShowAdvanced;
  renderGate();
}

export function renderGate(gateError) {
  const el = document.getElementById("gate-overlay");
  if (!el) return;
  el.innerHTML = `<div class="gate-card">
    <div class="gate-title">🌊 Kambelleh</div>
    <div class="gate-sub">Ingresa la clave del equipo para trabajar con la misma información en todos los dispositivos.</div>
    ${state.gateShowAdvanced ? `<div class="field"><label>URL de Apps Script</label><input id="gate-url" placeholder="https://script.google.com/macros/s/..." value="${escapeHtml(state.sheetsUrl || KAMBELLEH_SHEETS_URL)}"></div>` : ""}
    <div class="field"><label>Clave secreta</label><input id="gate-token" type="password" placeholder="Clave del equipo" value="${escapeHtml(state.sheetsToken)}"></div>
    <button class="btn gold" id="gate-connect-btn" onclick="gateConnect()">Entrar</button>
    <div class="gate-error">${gateError ? escapeHtml(gateError) : ""}</div>
    <div style="text-align:center; margin-top:8px; display:flex; flex-direction:column; gap:6px;">
      <a href="#" onclick="toggleGateAdvanced(); return false;" class="sub" style="text-decoration:underline;">${state.gateShowAdvanced ? "Usar la conexión de Kambelleh" : "¿Necesitas usar otra hoja? (avanzado)"}</a>
      <a href="#" onclick="continueLocal(); return false;" class="sub" style="text-decoration:underline;">Continuar sin conectar (solo este dispositivo)</a>
    </div>
  </div>`;
}

export async function gateConnect() {
  const urlInput = document.getElementById("gate-url");
  const url = (urlInput ? urlInput.value.trim() : "") || KAMBELLEH_SHEETS_URL;
  const token = document.getElementById("gate-token").value.trim();
  if (!url || !token) {
    renderGate("Completa la clave.");
    return;
  }
  const btn = document.getElementById("gate-connect-btn");
  if (btn) {
    btn.textContent = "Conectando…";
    btn.disabled = true;
  }
  if (!setSheetsCreds(url, token)) return;
  await finalizeConnect();
  if (state.sheetsSyncOk) {
    document.getElementById("gate-overlay").classList.remove("show");
  } else {
    disconnectSheets();
    renderGate("⚠ No se pudo conectar. Revisa la clave secreta.");
  }
}

export function continueLocal() {
  document.getElementById("gate-overlay").classList.remove("show");
}

Object.assign(window, { gateConnect, continueLocal, toggleGateAdvanced });
