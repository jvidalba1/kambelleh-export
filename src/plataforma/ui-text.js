import { state } from "../state.js";
import { renderAll } from "../render.js";

export const UI = {
  es: {
    tab_resumen:"Resumen", tab_manual:"Manual", tab_tareas:"Limpieza", tab_limpieza:"Habitaciones",
    tab_mantenimiento:"Mantenimientos", tab_inventario:"Inventario", tab_proveedores:"Proveedores",
    tab_bitacora:"Bitácora", tab_equipo:"Equipo",
    buscar_placeholder:"🔎 Buscar en tareas, inventario, bitácora...",
    nube_btn:"Nube", guardar_btn:"Guardar", exportar_btn:"Exportar respaldo", importar_btn:"Importar respaldo",
    tu_nombre:"Tu nombre...",

    resumen_titulo:"Resumen", resumen_hola:"· hola,", resumen_nota:"Lo más urgente de un vistazo. Toca cualquier tarjeta para ir directo a esa pestaña.",
    tareas_hoy:"Tareas hoy pendientes", incidencias_abiertas:"Incidencias abiertas", hab_no_listas:"Habitaciones no listas", hab_llaves:"Habitaciones con llaves incompletas",
    generar_reporte:"📋 Generar reporte semanal", ultimas_notas:"Últimas notas de bitácora", sin_notas:"Sin notas todavía.",
    historial_titulo:"Historial de cumplimiento", historial_nota:"Qué tan seguido se completan las tareas de cada frecuencia. Basado en las marcas guardadas.",
    tendencia_diaria:"Tendencia diaria",

    tareas_titulo:"Limpieza", tareas_nota:"Toca el check para marcarla, o el texto para desplegar sub-actividades. Usa ↑↓ para ordenar, ✎ para editar, ✕ para eliminar.",
    nueva_tarea:"Nueva tarea", agregar:"+ Agregar",

    hab_titulo:"Habitaciones", hab_nota:"Marca cada habitación cuando quede lista, y revisa el estado de ventilador, toldillos, colchón, puertas y llaves.",
    limpia:"limpia", en_proceso:"en proceso", pendiente:"pendiente", bueno:"bueno", regular:"regular", malo:"malo",
    ventilador:"Ventilador", toldillos:"Toldillos", colchon:"Colchón", puertas:"Puertas", sabanas:"Sábanas",
    almohadas:"Almohadas", llaves:"Llaves", ult_actualizacion:"Últ. actualización",

    mant_titulo:"Mantenimiento", mant_nota:"Incidencias puntuales — el mantenimiento preventivo semanal/mensual/trimestral está en la pestaña Limpieza.",
    reportar_incidencia:"+ Reportar incidencia", cancelar:"Cancelar", descripcion:"Descripción", zona:"Zona", notas:"Notas",
    resolver:"Resolver", reabrir:"Reabrir", resuelto_por:"resuelto por", sin_incidencias:"Sin incidencias registradas.", abiertas:"abiertas",

    inv_titulo:"Inventario", inv_nota:"Edita ✎, elimina ✕, reordena ↑↓ o agrega ítems nuevos en Aseo, Cocina y Ropa de cama.",
    categorias:"categorías", items_txt:"ítems", actualizado:"actualizado", nuevo_item:"Nuevo ítem", cantidad:"Cant.",
    inv_compra_nota:"Para compras o reposición, usa la tarea mensual \"Enviar lista de compras según inventario\".",

    bit_titulo:"Bitácora diaria", bit_nota:"Deja aquí cualquier novedad para que el próximo turno o administrador la vea: algo pendiente, un imprevisto, un cambio de último momento.",
    bit_placeholder:"Ej. El huésped de la 206 llega tarde, avisó que llega tipo 10pm...",
    agregar_nota:"+ Agregar nota", notas_txt:"notas", sin_notas_todavia:"Sin notas todavía.",

    equipo_titulo:"Equipo", equipo_nota:"Voluntariado y administración: quién está en el hostal y qué turno cubre.",
    agregar_persona:"+ Agregar persona", nombre:"Nombre", rol:"Rol", turno:"Turno",
    turnos_semana:"Turnos de la semana", turnos_nota:"Marca qué días cubre cada persona del equipo.",
    lunes:"Lunes", martes:"Martes", miercoles:"Miércoles", jueves:"Jueves", viernes:"Viernes", sabado:"Sábado", domingo:"Domingo",

    diario:"Diario", semanal:"Semanal", quincenal:"Quincenal", mensual:"Mensual", trimestral:"Trimestral",
    reset_diario:"se reinicia cada día", reset_semanal:"reporte cada lunes", reset_quincenal:"cada 15 y 30 del mes",
    reset_mensual:"cada 30 o última semana del mes", reset_trimestral:"junio · septiembre · diciembre",
  },
  en: {
    tab_resumen:"Overview", tab_manual:"Manual", tab_tareas:"Cleaning", tab_limpieza:"Rooms",
    tab_mantenimiento:"Maintenance", tab_inventario:"Inventory", tab_proveedores:"Suppliers",
    tab_bitacora:"Logbook", tab_equipo:"Team",
    buscar_placeholder:"🔎 Search tasks, inventory, logbook...",
    nube_btn:"Cloud", guardar_btn:"Save", exportar_btn:"Export backup", importar_btn:"Import backup",
    tu_nombre:"Your name...",

    resumen_titulo:"Overview", resumen_hola:"· hi,", resumen_nota:"The most urgent things at a glance. Tap any card to jump to that tab.",
    tareas_hoy:"Today's pending tasks", incidencias_abiertas:"Open issues", hab_no_listas:"Rooms not ready", hab_llaves:"Rooms with missing keys",
    generar_reporte:"📋 Generate weekly report", ultimas_notas:"Latest logbook notes", sin_notas:"No notes yet.",
    historial_titulo:"Completion history", historial_nota:"How consistently tasks get completed for each frequency, based on saved check-offs.",
    tendencia_diaria:"Daily trend",

    tareas_titulo:"Cleaning", tareas_nota:"Tap the check to mark it, or the text to expand sub-tasks. Use ↑↓ to reorder, ✎ to edit, ✕ to delete.",
    nueva_tarea:"New task", agregar:"+ Add",

    hab_titulo:"Rooms", hab_nota:"Mark each room when it's ready, and check the status of fan, mosquito nets, mattress, doors and keys.",
    limpia:"clean", en_proceso:"in progress", pendiente:"pending", bueno:"good", regular:"fair", malo:"bad",
    ventilador:"Fan", toldillos:"Mosquito nets", colchon:"Mattress", puertas:"Doors", sabanas:"Sheets",
    almohadas:"Pillows", llaves:"Keys", ult_actualizacion:"Last updated",

    mant_titulo:"Maintenance", mant_nota:"One-off issues — weekly/monthly/quarterly preventive maintenance is in the Cleaning tab.",
    reportar_incidencia:"+ Report issue", cancelar:"Cancel", descripcion:"Description", zona:"Area", notas:"Notes",
    resolver:"Resolve", reabrir:"Reopen", resuelto_por:"resolved by", sin_incidencias:"No issues logged.", abiertas:"open",

    inv_titulo:"Inventory", inv_nota:"Edit ✎, delete ✕, reorder ↑↓ or add new items under Cleaning supplies, Kitchen and Bedding.",
    categorias:"categories", items_txt:"items", actualizado:"updated", nuevo_item:"New item", cantidad:"Qty.",
    inv_compra_nota:"For purchases or restocking, use the monthly task \"Send shopping list based on inventory\".",

    bit_titulo:"Daily logbook", bit_nota:"Leave any updates here for the next shift or administrator to see: something pending, an unexpected issue, a last-minute change.",
    bit_placeholder:"E.g. The guest in room 206 is arriving late, said around 10pm...",
    agregar_nota:"+ Add note", notas_txt:"notes", sin_notas_todavia:"No notes yet.",

    equipo_titulo:"Team", equipo_nota:"Volunteers and administrators: who's at the hostel and which shift they cover.",
    agregar_persona:"+ Add person", nombre:"Name", rol:"Role", turno:"Shift",
    turnos_semana:"Weekly shifts", turnos_nota:"Mark which days each team member covers.",
    lunes:"Monday", martes:"Tuesday", miercoles:"Wednesday", jueves:"Thursday", viernes:"Friday", sabado:"Saturday", domingo:"Sunday",

    diario:"Daily", semanal:"Weekly", quincenal:"Biweekly", mensual:"Monthly", trimestral:"Quarterly",
    reset_diario:"resets every day", reset_semanal:"reported every Monday", reset_quincenal:"on the 15th and 30th of each month",
    reset_mensual:"on the 30th or last week of the month", reset_trimestral:"June · September · December",
  },
};

export function t(key) {
  return (UI[state.manualLang] && UI[state.manualLang][key]) || UI.es[key] || key;
}

export function toggleLang() {
  state.manualLang = state.manualLang === "es" ? "en" : "es";
  document.getElementById("lang-btn").textContent = state.manualLang === "es" ? "🌐 EN" : "🌐 ES";
  renderAll();
}

export function applyStaticUiText() {
  const wi = document.getElementById("whoami-input");
  if (wi) wi.placeholder = t("tu_nombre");
  const eb = document.getElementById("export-btn");
  if (eb) eb.textContent = "⬇ " + t("exportar_btn");
  const ib = document.getElementById("import-btn");
  if (ib) ib.textContent = "⬆ " + t("importar_btn");
  const nb = document.getElementById("nube-btn");
  if (nb) nb.textContent = "🔗 " + t("nube_btn");
  const gs = document.getElementById("global-search");
  if (gs) gs.placeholder = t("buscar_placeholder");
}

Object.assign(window, { toggleLang });
