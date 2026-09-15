import { state } from "../../state.js";
import { escapeHtml } from "../../shared-kernel/dom.js";
import { FREQ_ORDER } from "../../shared-kernel/frequency.js";
import { TASKS } from "../tareas/data.js";

export function renderSearch() {
  const q = document.getElementById("global-search").value.trim().toLowerCase();
  const box = document.getElementById("search-results");
  if (!q) {
    box.classList.remove("open");
    box.innerHTML = "";
    return;
  }
  const results = [];
  FREQ_ORDER.forEach((freq) => {
    state.data.tasks[freq].forEach((t) => {
      if (t.text.toLowerCase().includes(q)) results.push({ tag: TASKS[freq].label, label: t.text, go: "tareas" });
      (t.steps || []).forEach((s) => {
        if (s.text.toLowerCase().includes(q)) results.push({ tag: TASKS[freq].label + " · sub", label: s.text, go: "tareas" });
      });
    });
  });
  Object.entries(state.data.inventory).forEach(([cat, info]) => {
    info.items.forEach((it) => {
      if (it.name.toLowerCase().includes(q)) results.push({ tag: cat, label: it.name + " — " + it.qty, go: "inventario" });
    });
  });
  state.data.bitacora.forEach((b) => {
    if (b.texto.toLowerCase().includes(q)) results.push({ tag: "Bitácora", label: b.texto, go: "bitacora" });
  });
  state.data.mantenimiento.forEach((m) => {
    if (m.item.toLowerCase().includes(q)) results.push({ tag: "Mantenimiento", label: m.item, go: "mantenimiento" });
  });
  if (results.length === 0) {
    box.innerHTML = `<div class="search-item">Sin resultados para "${escapeHtml(q)}"</div>`;
  } else {
    box.innerHTML = results
      .slice(0, 20)
      .map(
        (r) =>
          `<div class="search-item" onclick="setTab('${r.go}'); document.getElementById('global-search').value=''; document.getElementById('search-results').classList.remove('open');"><span class="stag">${escapeHtml(r.tag)}</span>${escapeHtml(r.label)}</div>`,
      )
      .join("");
  }
  box.classList.add("open");
}

Object.assign(window, { renderSearch });
