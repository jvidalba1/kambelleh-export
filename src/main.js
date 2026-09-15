// Composition root: importing every context guarantees each one's
// `Object.assign(window, {...})` handler exposure (section 3 of the restructure
// plan) runs at least once, even for contexts render.js doesn't reach directly.
import "./contexts/tareas/model.js";
import "./contexts/tareas/view.js";
import "./contexts/limpieza/model.js";
import "./contexts/limpieza/view.js";
import "./contexts/mantenimiento/model.js";
import "./contexts/mantenimiento/view.js";
import "./contexts/inventario/model.js";
import "./contexts/inventario/view.js";
import "./contexts/bitacora/model.js";
import "./contexts/bitacora/view.js";
import "./contexts/equipo/model.js";
import "./contexts/equipo/view.js";
import "./contexts/resumen/view.js";
import "./contexts/reporte/view.js";
import "./contexts/proveedores/view.js";
import "./contexts/manual/view.js";
import "./contexts/busqueda/view.js";
import "./integraciones/sheets-sync/sync.js";
import "./integraciones/sheets-sync/view.js";
import "./onboarding/gate.js";
import "./plataforma/ui/tabs.js";
import "./plataforma/ui/confirm.js";
import "./plataforma/persistence.js";

import { loadData } from "./plataforma/persistence.js";

loadData();
