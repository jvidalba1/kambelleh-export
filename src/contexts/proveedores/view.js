import { state } from "../../state.js";
import { MANUAL, MANUAL_EN } from "../manual/content.js";

export function renderProveedores() {
  const source = state.manualLang === "es" ? MANUAL : MANUAL_EN;
  const sec = source.find((s) => s.id === "proveedores");
  if (!sec) {
    document.getElementById("view-proveedores").innerHTML = "";
    return;
  }
  let html = `<div class="section-title">${sec.title}</div>
  <div class="manual-intro">${sec.intro || ""}</div>`;
  sec.groups.forEach((g) => {
    html += `<div class="panel">
      ${g.label ? `<div class="group-label" style="margin-top:0;">${g.label}</div>` : ""}
      ${g.items
        .map(
          ([text]) => `
        <div class="info-row">
          <div class="info-dot"></div>
          <div class="info-text">${text}</div>
        </div>`,
        )
        .join("")}
    </div>`;
  });
  document.getElementById("view-proveedores").innerHTML = html;
}
