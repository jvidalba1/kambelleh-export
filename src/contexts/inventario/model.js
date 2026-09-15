import { state, mutate } from "../../state.js";
import { renderAll } from "../../render.js";
import { uid } from "../../shared-kernel/dom.js";
import { renderInventario } from "./view.js";

export function toggleCat(name) {
  state.openCats[name] = !state.openCats[name];
  renderInventario();
}

export function moveInvItem(cat, id, dir) {
  mutate(() => {
    const items = state.data.inventory[cat].items;
    const i = items.findIndex((x) => x.id === id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= items.length) return;
    [items[i], items[j]] = [items[j], items[i]];
  });
}

export function removeInvItem(cat, id) {
  state.confirmingDelete = null;
  mutate(() => {
    state.data.inventory[cat].items = state.data.inventory[cat].items.filter((x) => x.id !== id);
  });
}

export function startInvEdit(cat, id) {
  state.editingInv = cat + ":" + id;
  renderAll();
  setTimeout(() => {
    const el = document.getElementById("inv-edit-name-" + id);
    if (el) {
      el.focus();
      el.select();
    }
  }, 0);
}

export function cancelInvEdit() {
  state.editingInv = null;
  renderAll();
}

export function saveInvEdit(cat, id) {
  const nameEl = document.getElementById("inv-edit-name-" + id);
  const qtyEl = document.getElementById("inv-edit-qty-" + id);
  const name = nameEl ? nameEl.value.trim() : "";
  const qty = qtyEl ? qtyEl.value.trim() : "";
  state.editingInv = null;
  if (name) {
    mutate(() => {
      const it = state.data.inventory[cat].items.find((x) => x.id === id);
      if (it) {
        it.name = name;
        it.qty = qty;
      }
    });
  } else renderAll();
}

export function addInvItem(cat) {
  const nameEl = document.getElementById("newinv-name-" + cat.replace(/\s+/g, "_"));
  const qtyEl = document.getElementById("newinv-qty-" + cat.replace(/\s+/g, "_"));
  const name = nameEl.value.trim();
  const qty = qtyEl.value.trim();
  if (!name) return;
  mutate(() => {
    state.data.inventory[cat].items.push({ id: uid(), name, qty: qty || "—" });
    state.openCats[cat] = true;
  });
}

Object.assign(window, { toggleCat, moveInvItem, removeInvItem, startInvEdit, cancelInvEdit, saveInvEdit, addInvItem });
