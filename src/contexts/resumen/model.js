import { state } from "../../state.js";
import { t } from "../../plataforma/ui-text.js";

export function pastPeriodKeys(freq, n) {
  const keys = [];
  const d = new Date();
  if (freq === "diario") {
    for (let i = 0; i < n; i++) {
      const dd = new Date(d);
      dd.setDate(dd.getDate() - i);
      keys.push({ key: dd.toISOString().slice(0, 10), label: dd.toLocaleDateString("es-CO", { weekday: "short", day: "numeric" }) });
    }
  } else if (freq === "mensual") {
    for (let i = 0; i < n; i++) {
      const dd = new Date(d.getFullYear(), d.getMonth() - i, 1);
      keys.push({ key: dd.getFullYear() + "-" + (dd.getMonth() + 1), label: dd.toLocaleDateString("es-CO", { month: "short" }) });
    }
  } else if (freq === "trimestral") {
    for (let i = 0; i < n; i++) {
      const q = Math.ceil((d.getMonth() + 1) / 3) - i;
      const yr = d.getFullYear() + Math.floor((q - 1) / 4);
      const qq = (((q - 1) % 4) + 4) % 4 + 1;
      keys.push({ key: yr + "-Q" + qq, label: "Q" + qq + " " + yr });
    }
  } else if (freq === "semanal") {
    for (let i = 0; i < n; i++) {
      const dd = new Date(d);
      dd.setDate(dd.getDate() - i * 7);
      const onejan = new Date(dd.getFullYear(), 0, 1);
      const week = Math.ceil(((dd - onejan) / 86400000 + onejan.getDay() + 1) / 7);
      keys.push({ key: dd.getFullYear() + "-W" + week, label: "S" + week });
    }
  } else if (freq === "quincenal") {
    for (let i = 0; i < n; i++) {
      const dd = new Date(d);
      dd.setDate(dd.getDate() - i * 15);
      const half = dd.getDate() <= 15 ? "1" : "2";
      keys.push({ key: dd.getFullYear() + "-" + (dd.getMonth() + 1) + "-" + half, label: dd.getMonth() + 1 + "/" + half });
    }
  }
  return keys.reverse();
}

export function completionRate(freq, periodKeyStr) {
  const items = state.data.tasks[freq];
  if (!items.length) return 0;
  const done = items.filter((t) => !!state.data.taskChecks[freq + ":" + periodKeyStr + ":" + t.id]).length;
  return Math.round((done / items.length) * 100);
}

export function trendSvg(freq, n) {
  const periods = pastPeriodKeys(freq, n);
  const rates = periods.map((p) => completionRate(freq, p.key));
  const w = 320,
    h = 90,
    pad = 8;
  const stepX = (w - pad * 2) / Math.max(1, rates.length - 1);
  const pts = rates.map((r, i) => [pad + i * stepX, pad + (h - pad * 2) * (1 - r / 100)]);
  const path = pts.map((p, i) => (i === 0 ? "M" : "L") + p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
  const dots = pts
    .map((p, i) => `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="2.5" fill="${rates[i] >= 100 ? "#3FCB9A" : rates[i] > 0 ? "#ffb710" : "#5C7062"}"/>`)
    .join("");
  const first = rates.slice(0, Math.ceil(rates.length / 2));
  const second = rates.slice(Math.ceil(rates.length / 2));
  const avg = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);
  const diff = avg(second) - avg(first);
  const trendLabel = diff > 5 ? "↑ mejorando" : diff < -5 ? "↓ bajando" : "→ estable";
  const trendColor = diff > 5 ? "var(--verde)" : diff < -5 ? "var(--coral)" : "var(--text-dim)";
  return `<div style="margin-bottom:10px;">
    <svg viewBox="0 0 ${w} ${h}" style="width:100%; height:${h}px;">
      <line x1="${pad}" y1="${h - pad}" x2="${w - pad}" y2="${h - pad}" stroke="var(--line)" stroke-width="1"/>
      <path d="${path}" fill="none" stroke="var(--gold)" stroke-width="2"/>
      ${dots}
    </svg>
    <div class="sub" style="text-align:right; color:${trendColor};">${trendLabel} (últimos ${n} periodos)</div>
  </div>`;
}

export function historialHtml() {
  let html = `<div class="section-title">${t("historial_titulo")}</div>
  <div class="section-note">${t("historial_nota")}</div>
  <div class="freq-panel"><div class="freq-head"><span class="freq-name">${t("tendencia_diaria")}</span></div>${trendSvg("diario", 14)}</div>`;
  const CONFIG = [
    ["diario", 14],
    ["semanal", 8],
    ["quincenal", 6],
    ["mensual", 6],
    ["trimestral", 4],
  ];
  CONFIG.forEach(([freq, n]) => {
    const periods = pastPeriodKeys(freq, n);
    html += `<div class="freq-panel"><div class="freq-head"><span class="freq-name">${t(freq)}</span></div>
      <div class="heatmap-labels">${periods.map((p) => `<span>${p.label}</span>`).join("")}</div>
      <div class="heatmap-row">${periods
        .map((p) => {
          const rate = completionRate(freq, p.key);
          const bg = rate === 0 ? "#0D1811" : rate < 50 ? "rgba(254,34,0,.35)" : rate < 100 ? "rgba(255,183,16,.45)" : "rgba(63,203,154,.55)";
          return `<div class="heatmap-cell" style="background:${bg};" title="${rate}%">${rate}</div>`;
        })
        .join("")}</div>
    </div>`;
  });
  return html;
}
