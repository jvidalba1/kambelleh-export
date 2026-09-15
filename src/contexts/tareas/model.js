import { state, mutate } from "../../state.js";
import { renderAll } from "../../render.js";
import { uid } from "../../shared-kernel/dom.js";
import { periodKey } from "../../shared-kernel/frequency.js";

export function taskKey(freq, id) {
  return freq + ":" + periodKey(freq) + ":" + id;
}

export function isTaskDone(freq, id) {
  return !!state.data.taskChecks[taskKey(freq, id)];
}

export function toggleTask(freq, id) {
  mutate(() => {
    const k = taskKey(freq, id);
    state.data.taskChecks[k] = state.data.taskChecks[k] ? null : { by: state.whoAmI || "Sin nombre", at: new Date().toISOString() };
    if (!state.data.taskChecks[k]) delete state.data.taskChecks[k];
  });
}

export function addTaskItem(freq) {
  const input = document.getElementById("newtask-" + freq);
  const text = input.value.trim();
  if (!text) return;
  mutate(() => {
    state.data.tasks[freq].push({ id: freq + "-" + uid(), text });
  });
}

export function removeTaskItem(freq, id) {
  state.confirmingDelete = null;
  mutate(() => {
    state.data.tasks[freq] = state.data.tasks[freq].filter((t) => t.id !== id);
  });
}

export function moveTaskItem(freq, id, dir) {
  mutate(() => {
    const items = state.data.tasks[freq];
    const i = items.findIndex((x) => x.id === id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= items.length) return;
    [items[i], items[j]] = [items[j], items[i]];
  });
}

export function toggleExpandTask(freq, id) {
  state.expandedTasks[freq + ":" + id] = !state.expandedTasks[freq + ":" + id];
  renderAll();
}

export function subTaskKey(freq, parentId, stepId) {
  return freq + ":" + periodKey(freq) + ":" + parentId + ":" + stepId;
}

export function isSubTaskDone(freq, parentId, stepId) {
  return !!state.data.taskChecks[subTaskKey(freq, parentId, stepId)];
}

export function toggleSubTask(freq, parentId, stepId) {
  mutate(() => {
    const k = subTaskKey(freq, parentId, stepId);
    state.data.taskChecks[k] = state.data.taskChecks[k] ? null : { by: state.whoAmI || "Sin nombre", at: new Date().toISOString() };
    if (!state.data.taskChecks[k]) delete state.data.taskChecks[k];
  });
}

export function taskMeta(freq, id) {
  return state.data.taskChecks[taskKey(freq, id)] || null;
}

export function addSubStep(freq, parentId) {
  const input = document.getElementById("newstep-" + parentId);
  const text = input.value.trim();
  if (!text) return;
  mutate(() => {
    const t = state.data.tasks[freq].find((x) => x.id === parentId);
    if (!t.steps) t.steps = [];
    t.steps.push({ id: uid(), text });
    state.expandedTasks[freq + ":" + parentId] = true;
  });
}

export function removeSubStep(freq, parentId, stepId) {
  state.confirmingDelete = null;
  mutate(() => {
    const t = state.data.tasks[freq].find((x) => x.id === parentId);
    if (t && t.steps) t.steps = t.steps.filter((s) => s.id !== stepId);
    state.expandedTasks[freq + ":" + parentId] = true;
  });
}

Object.assign(window, {
  toggleTask,
  toggleExpandTask,
  toggleSubTask,
  addTaskItem,
  removeTaskItem,
  moveTaskItem,
  addSubStep,
  removeSubStep,
});
