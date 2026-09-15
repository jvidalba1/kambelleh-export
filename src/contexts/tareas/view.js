import { state, mutate } from "../../state.js";
import { renderAll } from "../../render.js";
import { t } from "../../plataforma/ui-text.js";
import { escapeHtml } from "../../shared-kernel/dom.js";
import { fmtTime } from "../../shared-kernel/date.js";
import { FREQ_ORDER } from "../../shared-kernel/frequency.js";
import { delBtn } from "../../plataforma/ui/confirm.js";
import { TASKS } from "./data.js";
import { isTaskDone, isSubTaskDone, taskMeta } from "./model.js";

export function renderTareas() {
  let html = `<div class="section-title">${t("tareas_titulo")}</div>
  <div class="section-note">${t("tareas_nota")}</div>`;
  FREQ_ORDER.forEach((freq) => {
    const meta = TASKS[freq];
    const items = state.data.tasks[freq];
    const done = items.filter((t) => isTaskDone(freq, t.id)).length;
    html += `<div class="freq-panel">
      <div class="freq-head"><span class="freq-name">${t(freq)}</span><span class="sub">${done}/${items.length} · +${meta.xp} XP c/u</span></div>
      <div class="freq-reset">${t("reset_" + freq)}</div>
      <div class="panel" style="margin-top:8px;">
        ${items
          .map((item, idx) => {
            if (state.editingTask === freq + ":" + item.id) {
              return `<div class="fmission-row" style="cursor:default;">
              <div class="fmission-check" style="visibility:hidden;"></div>
              <input id="edit-${item.id}" value="${escapeHtml(item.text)}" style="flex:1; background:#0D1811; border:1px solid var(--gold); color:var(--text); padding:6px 8px; border-radius:6px; font-family:'Plus Jakarta Sans'; font-size:12.5px;" onkeydown="if(event.key==='Enter'){saveTaskEdit('${freq}','${item.id}')} if(event.key==='Escape'){cancelTaskEdit()}">
              <button class="mov-del" style="color:var(--verde);" onclick="saveTaskEdit('${freq}','${item.id}')" title="Guardar">✓</button>
              <button class="mov-del" onclick="cancelTaskEdit()" title="Cancelar">✕</button>
            </div>`;
            }
            const steps = item.steps || [];
            const expanded = !!state.expandedTasks[freq + ":" + item.id];
            const stepsDone = steps.filter((s) => isSubTaskDone(freq, item.id, s.id)).length;
            const meta = taskMeta(freq, item.id);
            let row = `<div class="fmission-row ${isTaskDone(freq, item.id) ? "checked" : ""}">
            <div class="fmission-check" onclick="toggleTask('${freq}','${item.id}')"></div>
            <div class="fmission-text" onclick="toggleExpandTask('${freq}','${item.id}')" style="cursor:pointer; display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
              <span style="color:var(--gold); font-size:10px; display:inline-block; transition:transform .15s; transform:rotate(${expanded ? 90 : 0}deg);">▸</span>
              <span>${escapeHtml(item.text)}</span>
              ${steps.length ? `<span class="sub" style="font-size:10px;">(${stepsDone}/${steps.length})</span>` : ""}
              ${meta ? `<span class="sub" style="font-size:9.5px; color:var(--verde);">✓ ${escapeHtml(meta.by)} · ${fmtTime(meta.at)}</span>` : ""}
            </div>
            <button class="mov-del" style="${idx === 0 ? "opacity:.3;" : ""}" onclick="moveTaskItem('${freq}','${item.id}',-1)" title="Subir">↑</button>
            <button class="mov-del" style="${idx === items.length - 1 ? "opacity:.3;" : ""}" onclick="moveTaskItem('${freq}','${item.id}',1)" title="Bajar">↓</button>
            <button class="mov-del" onclick="startTaskEdit('${freq}','${item.id}')" title="Editar">✎</button>
            ${delBtn("task:" + freq + ":" + item.id, `removeTaskItem('${freq}','${item.id}')`)}
          </div>`;
            if (expanded) {
              row += `<div style="margin:2px 0 10px 30px; padding:8px 10px; background:var(--bg-panel-solid); border:1px solid var(--line); border-radius:8px;">
              ${steps
                .map(
                  (s) => `
                <div class="fmission-row ${isSubTaskDone(freq, item.id, s.id) ? "checked" : ""}" style="padding:6px 0;">
                  <div class="fmission-check" style="width:16px;height:16px;" onclick="toggleSubTask('${freq}','${item.id}','${s.id}')"></div>
                  <div class="fmission-text" style="font-size:11.5px;">${escapeHtml(s.text)}</div>
                  ${delBtn("step:" + freq + ":" + item.id + ":" + s.id, `removeSubStep('${freq}','${item.id}','${s.id}')`)}
                </div>`,
                )
                .join("")}
              ${steps.length === 0 ? `<div class="sub" style="margin-bottom:6px;">${t("sin_notas_todavia")}</div>` : ""}
              <div style="display:flex; gap:6px; margin-top:6px;">
                <input id="newstep-${item.id}" placeholder="Ej. sacar papeles, barrer..." style="flex:1; background:#0D1811; border:1px solid var(--line); color:var(--text); padding:6px 8px; border-radius:6px; font-family:'Plus Jakarta Sans'; font-size:11.5px;" onkeydown="if(event.key==='Enter'){addSubStep('${freq}','${item.id}')}">
                <button class="btn gold sm" onclick="addSubStep('${freq}','${item.id}')">+</button>
              </div>
            </div>`;
            }
            return row;
          })
          .join("")}
        <div style="display:flex; gap:6px; margin-top:12px;">
          <input id="newtask-${freq}" placeholder="${t("nueva_tarea")} ${t(freq).toLowerCase()}..." style="flex:1; background:#0D1811; border:1px solid var(--line); color:var(--text); padding:8px 9px; border-radius:8px; font-family:'Plus Jakarta Sans'; font-size:12.5px;" onkeydown="if(event.key==='Enter'){addTaskItem('${freq}')}">
          <button class="btn gold sm" onclick="addTaskItem('${freq}')">${t("agregar")}</button>
        </div>
      </div>
    </div>`;
  });
  document.getElementById("view-tareas").innerHTML = html;
}

export function editTaskText(freq, id, text) {
  mutate(() => {
    const t = state.data.tasks[freq].find((x) => x.id === id);
    if (t) t.text = text;
  });
}

export function startTaskEdit(freq, id) {
  state.editingTask = freq + ":" + id;
  renderAll();
  setTimeout(() => {
    const el = document.getElementById("edit-" + id);
    if (el) {
      el.focus();
      el.select();
    }
  }, 0);
}

export function cancelTaskEdit() {
  state.editingTask = null;
  renderAll();
}

export function saveTaskEdit(freq, id) {
  const input = document.getElementById("edit-" + id);
  const val = input ? input.value.trim() : "";
  state.editingTask = null;
  if (val) editTaskText(freq, id, val);
  else renderAll();
}

Object.assign(window, { startTaskEdit, cancelTaskEdit, saveTaskEdit });
