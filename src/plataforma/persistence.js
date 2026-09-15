import { state } from "../state.js";
import { STORAGE_KEY, hasClaudeStorage, storageGet, storageSet } from "./storage.js";
import { todayISO } from "../shared-kernel/date.js";
import { applyMigrations } from "./migrations.js";
import { seedData } from "./defaults.js";
import { showStorageBanner, updateStorageStatus } from "./storage-status.js";
import { renderAll } from "../render.js";
import { pullFromSheets, pushToSheets, startSheetsPolling } from "../integraciones/sheets-sync/sync.js";
import { isTaskDone } from "../contexts/tareas/model.js";

export function save() {
  // escritura inmediata y síncrona a localStorage: no se pierde nada aunque refresques de inmediato
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
  } catch (e) {}
  if (state.sheetsUrl) {
    pushToSheets(false);
  }
  const el = document.getElementById("storage-status");
  if (el && !hasClaudeStorage() && !state.sheetsUrl) {
    el.textContent = "Guardado " + new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });
    el.style.color = "var(--verde)";
  }
  // capa extra (Claude storage / re-confirmación), sin bloquear
  clearTimeout(state.saveTimer);
  state.saveTimer = setTimeout(async () => {
    const ok = await storageSet(JSON.stringify(state.data));
    if (el && !hasClaudeStorage() && !state.sheetsUrl && !ok) {
      el.textContent = "⚠ No se pudo guardar";
      el.style.color = "var(--coral)";
    }
  }, 150);
}

// red de seguridad: si el navegador va a cerrar o refrescar la pestaña, forzar guardado síncrono
window.addEventListener("beforeunload", () => {
  if (state.data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
    } catch (e) {}
  }
});

export async function saveNow() {
  clearTimeout(state.saveTimer);
  const btn = document.getElementById("save-now-btn");
  const original = btn ? btn.textContent : "";
  if (btn) {
    btn.textContent = "Guardando…";
    btn.disabled = true;
  }
  const ok = await storageSet(JSON.stringify(state.data));
  if (btn) {
    btn.textContent = ok ? "✓ Guardado" : "⚠ No se pudo guardar";
    btn.disabled = false;
    setTimeout(() => {
      btn.textContent = original;
    }, 1500);
  }
  updateStorageStatus();
}

export function exportBackup() {
  const blob = new Blob([JSON.stringify(state.data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "kambelleh-respaldo-" + todayISO() + ".json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function triggerImport() {
  document.getElementById("import-file-input").click();
}

export function importBackup(fileInput) {
  const file = fileInput.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result);
      state.data = parsed;
      applyMigrations();
      save();
      renderAll();
      try {
        alert("Respaldo importado correctamente.");
      } catch (_) {}
    } catch (err) {
      try {
        alert("El archivo no es un respaldo válido.");
      } catch (_) {}
    }
  };
  reader.readAsText(file);
  fileInput.value = "";
}

export function pendingCount(key) {
  const today = todayISO();
  if (key === "tareas") return state.data.tasks.diario.filter((t) => !isTaskDone("diario", t.id)).length;
  if (key === "limpieza") return state.data.limpieza.filter((h) => h.estado !== "limpia").length;
  if (key === "mantenimiento") return state.data.mantenimiento.filter((m) => m.estado !== "resuelta").length;
  return 0;
}

export async function loadData() {
  try {
    state.sheetsUrl = (function () {
      try {
        return localStorage.getItem("kambelleh-sheets-url") || "";
      } catch (e) {
        return "";
      }
    })();
    state.sheetsToken = (function () {
      try {
        return localStorage.getItem("kambelleh-sheets-token") || "";
      } catch (e) {
        return "";
      }
    })();
    if (state.sheetsUrl && state.sheetsToken) {
      const ok = await pullFromSheets(true);
      if (!ok && !state.sheetsSyncOk) {
        const raw = await storageGet();
        state.data = raw ? JSON.parse(raw) : seedData();
      } else if (!ok) {
        const raw = await storageGet();
        state.data = raw ? JSON.parse(raw) : seedData();
        pushToSheets(true);
      }
    } else {
      const raw = await storageGet();
      state.data = raw ? JSON.parse(raw) : seedData();
    }
    applyMigrations();
  } catch (e) {
    state.data = seedData();
    applyMigrations();
  }
  showStorageBanner();
  updateStorageStatus();
  renderAll();
  if (state.sheetsUrl && state.sheetsToken) startSheetsPolling();
}

Object.assign(window, { saveNow, exportBackup, triggerImport, importBackup });
