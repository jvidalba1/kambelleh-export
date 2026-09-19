# CLAUDE.md — `src/contexts/`

How to author a bounded context. For the stack, commands, secrets and app-wide patterns, see the
root `CLAUDE.md`.

## File-shape split

- `data.js` — static seed constants only, no logic (`manual` calls its equivalent `content.js`).
- `model.js` — domain operations, each going through `mutate()` from `src/state.js`.
- `view.js` — `render<Nombre>()` writing into `#view-<nombre>`, plus the edit-mode UI handlers.

Only `view.js` is mandatory. The real distribution today:

| Files | Contexts |
|---|---|
| `data` + `model` + `view` | `tareas`, `limpieza`, `mantenimiento`, `inventario`, `equipo` |
| `model` + `view` | `bitacora`, `reporte`, `resumen` |
| `content` + `view` | `manual` |
| `view` only | `busqueda`, `proveedores` |

Handlers are exposed by whichever module owns them, not all from `view.js`. `mantenimiento` is the
clearest example — `model.js` ends with `Object.assign(window, { resolveMant, removeMant, addMant })`
and `view.js` ends with `Object.assign(window, { toggleShowMantForm })`.

## Adding a context — 8 points

1. Create `src/contexts/<nombre>/`.
2. Write `render<Nombre>()` in `view.js`, assigning into `#view-<nombre>`.
3. Expose every inline handler via `Object.assign(window, { … })` at the bottom of the module that
   defines it.
4. Import the module in `src/main.js` (a bare side-effect import) — nothing else will import a new
   context, so this is what puts its `window` exposures into the graph.
5. Call the renderer inside `renderAll()` in `src/render.js`.
6. Add a `NAV` entry in `plataforma/ui/tabs.js` — `{ key, labelKey }`.
7. Add matching `es` **and** `en` keys in `plataforma/ui-text.js`.
8. Add `<div class="main-view" id="view-<nombre>">` to `index.html`.

Skipping 3 or 4 is silent until click time, then throws `ReferenceError: … is not defined`.
Skipping 6–8 yields a tab that renders nothing. A context that is a sub-renderer rather than a tab
(`reporte`, `busqueda`) skips 5–8 and is instead called from its host view.

## Boundaries

Cross-context imports exist here and are intentional. **Do not refactor them away.** The real shape:

- `tareas/model.js#isTaskDone` is the de-facto shared read model — three consumers:
  `resumen/view.js:5`, `reporte/model.js:3`, `plataforma/persistence.js:9`.
- `manual/content.js` is shared content. `proveedores/view.js:2` is a projection of it and has no
  data of its own.
- `busqueda/view.js:4` reads `tareas/data.js`; `resumen/view.js:7` calls `renderReporte`.
- `plataforma/defaults.js` and `plataforma/migrations.js` import context `data.js` seeds.

New shared **helpers** still belong in `shared-kernel/` (pure functions) or `plataforma/` (app
services) — never in another context.

## Where new state goes

Add a field to the single `state` object in `src/state.js`, under that context's comment block.
Never a module-scope `let` — imported bindings are read-only, so other modules could not write it.
