import { state } from "../../state.js";
import { t } from "../../plataforma/ui-text.js";
import { escapeHtml } from "../../shared-kernel/dom.js";
import { delBtn } from "../../plataforma/ui/confirm.js";

export function renderInventario() {
  let html = `<div class="section-title">${t("inv_titulo")} <span class="n">${Object.keys(state.data.inventory).length} ${t("categorias")}</span></div>
  <div class="section-note">${t("inv_nota")}</div>`;
  Object.entries(state.data.inventory).forEach(([cat, info]) => {
    const open = state.openCats[cat];
    const safeCat = cat.replace(/\s+/g, "_");
    html += `<div class="panel">
      <div class="cat-header" onclick="toggleCat('${cat}')">
        <div><div class="cat-title">${cat}</div><div class="sub">${t("actualizado")}: ${info.updated}</div></div>
        <div style="display:flex; align-items:center; gap:8px;"><span class="cat-count">${info.items.length} ${t("items_txt")}</span><span class="cat-chevron ${open ? "open" : ""}">›</span></div>
      </div>
      <div class="cat-list ${open ? "open" : ""}">
        ${info.items
          .map((item, idx) => {
            if (state.editingInv === cat + ":" + item.id) {
              return `<div class="item-row" style="align-items:center; gap:6px;">
              <input id="inv-edit-name-${item.id}" value="${escapeHtml(item.name)}" style="flex:1; background:#0D1811; border:1px solid var(--gold); color:var(--text); padding:5px 7px; border-radius:6px; font-family:'Plus Jakarta Sans'; font-size:11.5px;">
              <input id="inv-edit-qty-${item.id}" value="${escapeHtml(item.qty)}" style="width:90px; background:#0D1811; border:1px solid var(--gold); color:var(--text); padding:5px 7px; border-radius:6px; font-family:'IBM Plex Mono',monospace; font-size:11px;">
              <button class="mov-del" style="color:var(--verde);" onclick="saveInvEdit('${cat}','${item.id}')" title="Guardar">✓</button>
              <button class="mov-del" onclick="cancelInvEdit()" title="Cancelar">✕</button>
            </div>`;
            }
            return `<div class="item-row" style="align-items:center;">
            <span class="item-name" style="flex:1;">${escapeHtml(item.name)}</span>
            <span class="item-qty">${escapeHtml(item.qty)}</span>
            <div style="display:flex; gap:2px; margin-left:8px;">
              <button class="mov-del" style="${idx === 0 ? "opacity:.3;" : ""}" onclick="moveInvItem('${cat}','${item.id}',-1)" title="Subir">↑</button>
              <button class="mov-del" style="${idx === info.items.length - 1 ? "opacity:.3;" : ""}" onclick="moveInvItem('${cat}','${item.id}',1)" title="Bajar">↓</button>
              <button class="mov-del" onclick="startInvEdit('${cat}','${item.id}')" title="Editar">✎</button>
              ${delBtn("inv:" + cat + ":" + item.id, `removeInvItem('${cat}','${item.id}')`)}
            </div>
          </div>`;
          })
          .join("")}
        <div style="display:flex; gap:6px; margin-top:12px;">
          <input id="newinv-name-${safeCat}" placeholder="${t("nuevo_item")}" style="flex:1; background:#0D1811; border:1px solid var(--line); color:var(--text); padding:8px 9px; border-radius:8px; font-family:'Plus Jakarta Sans'; font-size:12.5px;">
          <input id="newinv-qty-${safeCat}" placeholder="${t("cantidad")}" style="width:80px; background:#0D1811; border:1px solid var(--line); color:var(--text); padding:8px 9px; border-radius:8px; font-family:'IBM Plex Mono',monospace; font-size:12px;">
          <button class="btn gold sm" onclick="addInvItem('${cat}')">${t("agregar")}</button>
        </div>
        <div class="cat-note">${t("inv_compra_nota")}</div>
      </div>
    </div>`;
  });
  document.getElementById("view-inventario").innerHTML = html;
}
