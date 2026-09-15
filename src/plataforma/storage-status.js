import { state } from "../state.js";
import { hasClaudeStorage, testLocalStorage } from "./storage.js";
import { relTime } from "../shared-kernel/date.js";

export function updateStorageStatus() {
  const el = document.getElementById("storage-status");
  if (!el) return;
  if (state.sheetsUrl) {
    if (state.sheetsSyncOk === true) {
      el.textContent = "🔗 Sincronizado · " + relTime(state.lastSyncAt);
      el.style.color = "var(--verde)";
    } else if (state.sheetsSyncOk === false) {
      el.textContent = "⚠ No se pudo conectar a Google Sheets";
      el.style.color = "var(--coral)";
    } else {
      el.textContent = "🔗 Conectado a Google Sheets";
      el.style.color = "var(--verde)";
    }
    return;
  }
  if (hasClaudeStorage()) {
    el.textContent = "🔗 Sincronizado entre dispositivos";
    el.style.color = "var(--verde)";
  } else if (testLocalStorage()) {
    el.textContent = "💻 Guardado solo en este navegador";
    el.style.color = "var(--gold)";
  } else {
    el.textContent = "⚠ Guardado automático NO disponible — usa Exportar/Importar";
    el.style.color = "var(--coral)";
  }
}

export function showStorageBanner() {
  const wrap = document.getElementById("app");
  if (state.sheetsUrl || hasClaudeStorage()) return;
  if (!testLocalStorage()) {
    const banner = document.createElement("div");
    banner.style.cssText =
      "background:rgba(254,34,0,.12); border:1px solid var(--coral); border-radius:10px; padding:12px 14px; margin-bottom:14px; font-size:12.5px; color:var(--coral); line-height:1.5;";
    banner.innerHTML =
      '⚠ Este navegador está bloqueando el guardado automático (modo privado, restricciones de archivo local, o similar). <b>Tus cambios NO se van a guardar solos.</b> Usa el botón “⬇ Exportar respaldo” después de cada cambio importante, y “⬆ Importar respaldo” la próxima vez que abras este archivo.';
    wrap.insertBefore(banner, wrap.firstChild.nextSibling);
  } else {
    const banner = document.createElement("div");
    banner.style.cssText =
      "background:rgba(255,183,16,.10); border:1px solid var(--gold); border-radius:10px; padding:12px 14px; margin-bottom:14px; font-size:12.5px; color:var(--gold); line-height:1.5;";
    banner.innerHTML =
      "💻 Este panel guarda los datos <b>solo en este navegador y dispositivo</b>, a menos que conectes Google Sheets (botón 🔗 Nube arriba). Si otra persona lo abre en su celular sin conectar Sheets, no va a ver lo que marques aquí.";
    wrap.insertBefore(banner, wrap.firstChild.nextSibling);
  }
}
