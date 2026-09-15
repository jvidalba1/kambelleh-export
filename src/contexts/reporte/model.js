import { state } from "../../state.js";
import { addDays, fmtDate } from "../../shared-kernel/date.js";
import { isTaskDone } from "../tareas/model.js";

export function generarTextoReporte() {
  const hoy = new Date().toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" });
  const hace7 = addDays(-7);
  const diarioDone = state.data.tasks.diario.filter((t) => isTaskDone("diario", t.id)).length;
  const diarioTotal = state.data.tasks.diario.length;
  const incAbiertas = state.data.mantenimiento.filter((m) => m.estado !== "resuelta");
  const incResueltasSemana = state.data.mantenimiento.filter((m) => m.estado === "resuelta" && m.resueltoEn && m.resueltoEn.slice(0, 10) >= hace7);
  const notasSemana = state.data.bitacora.filter((b) => b.fecha >= hace7);
  const habListas = state.data.limpieza.filter((h) => h.estado === "limpia").length;
  const habTotal = state.data.limpieza.length;

  let txt = `*Reporte Kambelleh — ${hoy}*\n\n`;
  txt += `✅ Tareas diarias: ${diarioDone}/${diarioTotal} completadas hoy\n`;
  txt += `🏠 Habitaciones listas: ${habListas}/${habTotal}\n`;
  txt += `🔧 Incidencias abiertas: ${incAbiertas.length}${incAbiertas.length ? " — " + incAbiertas.map((m) => m.item).join(", ") : ""}\n`;
  txt += `✔ Incidencias resueltas esta semana: ${incResueltasSemana.length}\n\n`;
  txt += `*Notas de bitácora (últimos 7 días):*\n`;
  txt += notasSemana.length ? notasSemana.map((n) => `• ${fmtDate(n.fecha)} (${n.autor || "—"}): ${n.texto}`).join("\n") : "Sin novedades registradas.";
  return txt;
}
