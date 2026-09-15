import { state } from "../../state.js";
import { MANUAL, MANUAL_EN } from "./content.js";

export function toggleManualSection(id) {
  state.openManual[id] = !state.openManual[id];
  renderManual();
}

export function tagTone(t) {
  return t === "VOLUNTARIADO" || t === "VOLUNTEERS" ? "good" : t === "ADMIN" ? "warn" : t === "AMBOS" || t === "BOTH" ? "bad" : null;
}

export function renderManual() {
  const source = (state.manualLang === "es" ? MANUAL : MANUAL_EN).filter((s) => s.id !== "proveedores");
  const title = state.manualLang === "es" ? "Manual Kambelleh" : "Kambelleh Manual";
  const subtitle =
    state.manualLang === "es"
      ? "Guía de referencia para el equipo: quiénes somos, cómo recibir al huésped y cómo operamos día a día."
      : "Reference guide for the team: who we are, how to welcome guests, and how we operate day to day.";
  const pdfLabel = state.manualLang === "es" ? "🖨 Exportar a PDF" : "🖨 Export to PDF";
  let html = `<div class="section-title">${title}</div>
  <div class="manual-intro">${subtitle}</div>
  <button class="btn ghost sm" style="margin-bottom:12px;" onclick="exportManualPDF()">${pdfLabel}</button>`;
  source.forEach((sec) => {
    const open = !!state.openManual[sec.id];
    html += `<div class="panel">
      <div class="cat-header" onclick="toggleManualSection('${sec.id}')">
        <div class="cat-title">${sec.title}</div>
        <span class="cat-chevron ${open ? "open" : ""}">›</span>
      </div>
      <div class="cat-list ${open ? "open" : ""}">
        ${sec.intro ? `<p class="manual-intro" style="margin-top:8px;">${sec.intro}</p>` : ""}
        ${sec.groups
          .map(
            (g) => `
          ${g.label ? `<div class="group-label">${g.label}</div>` : ""}
          ${g.items
            .map(
              ([text]) => `
            <div class="info-row">
              <div class="info-dot"></div>
              <div class="info-text">${text}</div>
            </div>`,
            )
            .join("")}
        `,
          )
          .join("")}
      </div>
    </div>`;
  });
  document.getElementById("view-manual").innerHTML = html;
}

export function exportManualPDF() {
  const content = document.getElementById("view-manual").innerHTML;
  const w = window.open("", "_blank");
  w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Manual Kambelleh</title>
    <style>
      body{ font-family:Arial,sans-serif; padding:30px; color:#111; }
      .cat-list{ display:block !important; }
      .cat-chevron{ display:none; }
      .cat-header{ cursor:default; }
      .mov-tag{ border:1px solid #999; padding:1px 6px; border-radius:8px; font-size:10px; }
      h2,.section-title{ margin-top:24px; }
      .panel{ border:1px solid #ccc; border-radius:8px; padding:12px; margin-bottom:14px; }
      .info-row{ padding:4px 0; border-bottom:1px solid #eee; }
    </style></head><body>${content}</body></html>`);
  w.document.close();
  setTimeout(() => {
    w.print();
  }, 300);
}

Object.assign(window, { toggleManualSection, exportManualPDF });
