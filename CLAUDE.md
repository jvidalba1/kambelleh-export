# CLAUDE.md — `kambelleh-export`

## Scope

This file is the authoritative guidance for `kambelleh-export`. Any CLAUDE.md inherited from a
directory above this repository root belongs to a different project and does not apply here.

Workflow rules that do apply:

- Create a feature branch before making changes: `git checkout -b feature-<brief-description>`.
- **Never commit.** The user reviews and commits file by file.
- **No tests.** This project ships without them, by design. Do not add a test framework.

## What this is

An internal, Spanish-language mission-control panel for the Kambelleh hostel: room cleaning status,
maintenance by zone, inventory, suppliers, shift log, team, a recurring task checklist
(daily → quarterly) and an operations manual. Vanilla ES2022 modules, **zero runtime dependencies**,
hand-written CSS. Data lives in `localStorage` first, with optional multi-device sync through a
Google Apps Script backend (`apps-script.gs`).

## Commands

```bash
npm install
npm run dev       # vite dev server
npm run build     # -> dist/
npm run preview
npm run lint      # eslint .
npm run format    # prettier --write .   <- read the warning below first
```

- **Lint baseline is 0 errors / 23 warnings.** 22 are unused `catch (e)` bindings; 1 is an unused
  `today` at `plataforma/persistence.js:104`. All pre-existing — do not "fix" them and do not assume
  you caused them.
- `eslint .` only lints `src/**/*.js` (`eslint.config.js:5`). Root `app.js`, `vite.config.js` and
  `apps-script.gs` are never checked. One rule is configured: `no-unused-vars: "warn"`.
- **Do not run `npm run format` across the repo.** `plataforma/ui-text.js` is deliberately dense
  (many `key:"value",` pairs per line); a blanket Prettier run reflows it from ~120 to ~800 lines.
  Format only the files you touched.

## Architecture

`index.html` is one static page whose only script is `<script type="module" src="/src/main.js">`
(`index.html:56`). `main.js` is a composition root: 23 side-effect imports — contexts, platform, the
sync integration and onboarding — followed by `loadData()`. Everything else renders through
`innerHTML`.

`renderAll()` (`src/render.js:16`) rebuilds the whole UI on every change: `applyStaticUiText()`,
`renderTabs()`, `renderSheetsPanel()`, then 9 context views, then it toggles `.active` onto the
matching `.main-view`.

**11 contexts map to 9 tabs.** `reporte` and `busqueda` are sub-renderers, not tabs: `renderReporte()`
is called from inside `contexts/resumen/view.js:44`, and `renderSearch()` is `oninput`-driven into
`#search-results`.

```
src/
  main.js              composition root — imports every module for its side effects
  state.js             the single `state` object + mutate()
  render.js            renderAll()
  config/              GITIGNORED — see "Secrets & config"
  contexts/            11 bounded contexts — see src/contexts/CLAUDE.md
  plataforma/          app services
    persistence.js       save/load, import/export, badge counts
    storage.js           dual backend: window.storage probed first, else localStorage
    storage-status.js
    migrations.js        applyMigrations() + pruneOldTaskChecks()
    defaults.js          seed-data assembly
    ui-text.js           t(), UI.es / UI.en (99 keys each), applyStaticUiText()
    ui/tabs.js           NAV (9 entries) + renderTabs()
    ui/confirm.js        delBtn() two-step delete
    ui/toast.js
  shared-kernel/       pure helpers — date.js, dom.js (escapeHtml, uid), frequency.js
  integraciones/sheets-sync/
    client.js            thin layer over the Apps Script endpoint
    sync.js              20s poll, push/pull, revision conflict check
    view.js              sync panel UI
  onboarding/gate.js   first-run overlay
```

## Core patterns

1. **Handlers must be exposed on `window`.** Views build HTML strings with inline
   `onclick`/`onchange`/`oninput`, so whichever module owns a handler re-exposes it at the bottom of
   that module — `Object.assign(window, { toggleTarea, editTarea })`. 19 modules do this, and they
   are *not* only views: 7 `model.js` files plus `ui-text.js`, `persistence.js`, `ui/tabs.js`,
   `ui/confirm.js`, `sheets-sync/{sync,view}.js` and `onboarding/gate.js`. The module must also be
   reachable from the import graph rooted at `src/main.js`, or the exposure never runs and the
   handler fails with a `ReferenceError` at click time. `main.js` carries 23 side-effect imports for
   exactly this purpose; a few modules arrive transitively instead (`ui-text.js` via `render.js`).
   A new context, which nothing else imports, must be added to `main.js` explicitly.
2. **One mutable `state` object** (`src/state.js:11`), with fields grouped by context. ES module
   imports are read-only live bindings, so write `state.showMantForm = true` — never reassign an
   imported binding, and never add a module-scope `let` for shared state. `state.js:4-10` documents
   the rationale.
3. **Domain writes go through `mutate(fn)`** (`src/state.js:68`): it runs `fn()`, bumps `_rev`,
   stamps `_updatedBy`/`_updatedAt`, syncs `state.lastKnownRev` (load-bearing for the sync conflict
   check), calls `save()` and then `renderAll()`. UI-only toggles call `renderAll()` directly
   instead, deliberately, so opening a panel doesn't dirty the sync revision.
4. **Every interpolated value goes through `escapeHtml()`** (`shared-kernel/dom.js:1`). It is the
   only XSS barrier, because all markup is assigned via `innerHTML`.

See `src/contexts/CLAUDE.md` for how to author or extend a bounded context.

## Secrets & config

`src/config/` is **gitignored** and holds real secrets: the deployed Apps Script URL
(`sheets-config.js`) and the staff contact directory (`contactos.js`). Exactly two importers:
`integraciones/sheets-sync/client.js:2` and `contexts/manual/content.js:1`.

- **A fresh clone fails at import** until both files are recreated. This is the first thing to check
  when the app won't start.
- Never re-inline these values into their consumers.
- Never commit or publish `dist/` — the build bakes the Apps Script URL into the bundle.
- These values *were* committed inline before they were extracted into `src/config/`, and they
  remain in git history. Treat the Apps Script token as exposed; rotating it means redeploying
  `apps-script.gs` and updating `sheets-config.js`.

## Gotchas

- **Root `app.js`** is the gitignored pre-restructure monolith (2,080 lines), fully superseded by
  `src/`. Do not read it for current behaviour and do not edit it.
- **Tab keys don't match their labels.** `tab_tareas` → "Limpieza", `tab_limpieza` → "Habitaciones"
  (`plataforma/ui-text.js:6`). Trust the label, not the key.
- **Sheets polling** runs every 20 s and skips the re-render while `document.activeElement` is an
  `INPUT`, `TEXTAREA` or `SELECT`, so typing isn't interrupted (`sheets-sync/sync.js:59-93`). A
  second 30 s timer refreshes the storage status.
- **Schema changes belong in `applyMigrations()`** (`plataforma/migrations.js:13`), which is
  idempotent and runs at four call sites: load, import, pull and `finalizeConnect()`. It also runs
  `pruneOldTaskChecks()`, a per-frequency retention GC.
- **Deletes use the two-step `delBtn()`** helper (`plataforma/ui/confirm.js:18`), which arms on first
  click and auto-disarms after 6 s. Don't hand-roll delete buttons.
- **Storage has two backends.** `plataforma/storage.js:3-6` probes `window.storage` and prefers it
  over `localStorage` for both read and write. Five key strings exist: `kambelleh-data-v4`,
  `kambelleh-whoami`, `kambelleh-sheets-url`, `kambelleh-sheets-token`, and the
  `__kambelleh_test__` write probe.
- **Sheets sync is last-write-wins.** It compares revisions; it does not merge concurrent edits.

## Conventions

- Spanish domain vocabulary for folders, context names and identifiers (`tareas`, `limpieza`,
  `bitacora`). Keep it — it is the ubiquitous language of this codebase.
- All user-facing strings go through `t()` (`plataforma/ui-text.js:93`), with matching `es` and `en`
  keys. Both sets are currently symmetric at 99 keys — keep them that way. A single flag,
  `state.manualLang`, drives both the manual and the rest of the UI.
- Style by reusing the 15 CSS custom properties on `:root` (`style.css:2-5`): `--bg`, `--bg-panel`,
  `--bg-panel-solid`, `--line`, `--text`, `--text-dim`, `--text-dimmer`, `--radius`, `--gold`,
  `--verde`, `--coral`, `--esmeralda`, `--turmalina`, `--zafiro`, `--berenjena`. No hard-coded hex,
  no utility-class system.
- Imports are relative (`../../`) — no Vite aliases are configured.
- `style.css`, `apps-script.gs` and `vite.config.js` are treated as stable artifacts; don't
  restructure them as a side effect of another change.

## Reference docs

- `documentation/KAMBELLEH-VERSION-1-restructure-project.md` has the full module map and the DDD
  rationale behind the `src/` split. Two caveats: `documentation/` is gitignored, so this file is
  local-only and absent from a fresh clone; and its "no code has been changed yet" header is stale —
  the restructure shipped.
- `README.md` is pre-restructure. It describes a three-file, buildless app opened by double-clicking
  `index.html`. Do not trust it on structure, build or setup.
