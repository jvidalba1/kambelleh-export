import { state } from "../../state.js";
import { renderAll } from "../../render.js";
import { applyMigrations } from "../../plataforma/migrations.js";
import { updateStorageStatus } from "../../plataforma/storage-status.js";
import { showToast } from "../../plataforma/ui/toast.js";
import { relTime } from "../../shared-kernel/date.js";
import { sheetsUrlWithToken, KAMBELLEH_SHEETS_URL } from "./client.js";
import { renderSheetsPanel } from "./view.js";

export function setSheetsCreds(url, token) {
  if (!url || !token) return false;
  state.sheetsUrl = url;
  state.sheetsToken = token;
  try {
    localStorage.setItem("kambelleh-sheets-url", url);
    localStorage.setItem("kambelleh-sheets-token", token);
  } catch (e) {}
  startSheetsPolling();
  return true;
}

export async function finalizeConnect() {
  const pulled = await pullFromSheets(true);
  if (!pulled && state.sheetsSyncOk) {
    // la hoja respondió pero está vacía todavía (primera vez): la llenamos con lo que tengamos localmente
    pushToSheets(true);
  }
  applyMigrations();
  renderAll();
  renderSheetsPanel();
}

export function connectSheets() {
  const urlInput = document.getElementById("sheets-url-input");
  const url = (urlInput ? urlInput.value.trim() : "") || KAMBELLEH_SHEETS_URL;
  const token = document.getElementById("sheets-token-input").value.trim();
  if (!url || !token) {
    alert("Necesitas la clave secreta.");
    return;
  }
  if (!setSheetsCreds(url, token)) return;
  state.showSheetsPanel = true;
  finalizeConnect();
}

export function disconnectSheets() {
  state.sheetsUrl = "";
  state.sheetsToken = "";
  try {
    localStorage.removeItem("kambelleh-sheets-url");
    localStorage.removeItem("kambelleh-sheets-token");
  } catch (e) {}
  if (state.sheetsPolling) clearInterval(state.sheetsPolling);
  renderAll();
}

export function startSheetsPolling() {
  if (state.sheetsPolling) clearInterval(state.sheetsPolling);
  state.sheetsPolling = setInterval(() => {
    pullFromSheets(false);
  }, 20000);
  if (state.sheetsStatusTicker) clearInterval(state.sheetsStatusTicker);
  state.sheetsStatusTicker = setInterval(updateStorageStatus, 30000);
}

export async function pullFromSheets(isInitialLoad) {
  if (!state.sheetsUrl) return false;
  try {
    const res = await fetch(sheetsUrlWithToken(), { method: "GET" });
    const json = await res.json();
    if (json && json.error) {
      state.sheetsSyncOk = false;
      updateStorageStatus();
      return false;
    }
    if (json && typeof json === "object" && Object.keys(json).length > 0) {
      const remoteRev = json._rev;
      const remoteBy = json._updatedBy;
      const isNewerFromSomeoneElse =
        state.lastKnownRev !== null &&
        remoteRev !== undefined &&
        remoteRev !== state.lastKnownRev &&
        remoteBy &&
        remoteBy !== state.whoAmI;
      state.data = json;
      applyMigrations();
      state.sheetsSyncOk = true;
      state.lastKnownRev = remoteRev !== undefined ? remoteRev : state.lastKnownRev;
      state.lastSyncAt = new Date().toISOString();
      if (!isInitialLoad) {
        const active = document.activeElement;
        const isTyping = active && ["INPUT", "TEXTAREA", "SELECT"].includes(active.tagName);
        if (!isTyping) {
          renderAll();
          if (isNewerFromSomeoneElse) showToast("🔄 " + remoteBy + " actualizó los datos · " + relTime(json._updatedAt));
        }
      }
      updateStorageStatus();
      return true;
    }
    state.sheetsSyncOk = true; // vacío pero respondió: sheet nuevo, se llenará al primer guardado
    state.lastSyncAt = new Date().toISOString();
    return false;
  } catch (e) {
    state.sheetsSyncOk = false;
    updateStorageStatus();
    return false;
  }
}

export function pushToSheets(immediate) {
  if (!state.sheetsUrl) return;
  clearTimeout(state.sheetsSaveTimer);
  const run = async () => {
    try {
      const res = await fetch(sheetsUrlWithToken(), { method: "POST", body: JSON.stringify(state.data) });
      const json = await res.json();
      state.sheetsSyncOk = !(json && json.error);
      if (state.sheetsSyncOk) {
        state.lastSyncAt = new Date().toISOString();
        state.lastKnownRev = state.data._rev !== undefined ? state.data._rev : state.lastKnownRev;
      }
    } catch (e) {
      state.sheetsSyncOk = false;
    }
    updateStorageStatus();
  };
  if (immediate) run();
  else state.sheetsSaveTimer = setTimeout(run, 800);
}

Object.assign(window, { connectSheets, disconnectSheets, pullFromSheets });
