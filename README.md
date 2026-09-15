# Kambelleh — Panel Operativo

Panel de gestión diaria para el hostal Kambelleh (Playa La Barra, Bahía Málaga): tareas de limpieza, estado de habitaciones, mantenimiento, inventario, proveedores, bitácora, equipo y manual operativo — en español e inglés, con sincronización opcional entre dispositivos vía Google Sheets.

## Archivos de este paquete

| Archivo | Qué es |
|---|---|
| `index.html` | Estructura de la página. Es el archivo que se abre en el navegador. |
| `style.css` | Todo el diseño visual (colores, tipografías, layout). |
| `app.js` | Toda la lógica del panel (datos, tareas, sincronización, traducción, etc.). |
| `apps-script.gs` | Código para pegar en Google Apps Script — es el backend que permite compartir datos entre dispositivos. |
| `README.md` | Este archivo. |

Los tres primeros deben estar **siempre en la misma carpeta** para que el panel funcione (index.html carga a style.css y app.js por su nombre de archivo).

## Cómo usarlo

1. Descarga los 3 archivos (`index.html`, `style.css`, `app.js`) en una misma carpeta de tu computador o celular.
2. Abre `index.html` haciendo doble clic — se abre en tu navegador normal.
3. **Importante:** ábrelo siempre como archivo local (doble clic) o desde un sitio web real. Si lo ves dentro de una vista previa de chat/IA, algunas funciones (como la sincronización con Google Sheets) quedan bloqueadas por seguridad del navegador.

## Sincronización entre dispositivos (opcional)

Por defecto, cada dispositivo guarda su propia copia de los datos en el navegador (no se comparte nada). Para que todo el equipo vea la misma información:

1. Sigue las instrucciones dentro de `apps-script.gs` para publicarlo como aplicación web desde tu cuenta de Google.
2. En el panel, botón **🔗 Nube** → pega la clave secreta que definiste en el script → Conectar.
3. Repite el paso 2 en cada dispositivo del equipo.

Sin este paso, el panel funciona igual, solo que sin compartir datos entre dispositivos (usa "⬇ Exportar respaldo" / "⬆ Importar respaldo" para pasar información manualmente).

## Funcionalidades principales

- **Resumen**: estado general de un vistazo, reporte semanal para WhatsApp, historial de cumplimiento con tendencia.
- **Manual**: guía completa para el equipo (emergencias, primeros auxilios, recepción de huéspedes, atención, cocina, horarios, quiénes somos, voluntariado, tours y fauna) — bilingüe, exportable a PDF.
- **Limpieza**: tareas diarias/semanales/quincenales/mensuales/trimestrales, editables, con sub-actividades y orden manual.
- **Habitaciones**: estado de limpieza, ítems (ventilador, toldillos, colchón, puertas, sábanas), contador de almohadas y llaves.
- **Mantenimientos**: incidencias puntuales con historial de quién las resolvió.
- **Inventario**: categorías editables (Aseo, Cocina, Ropa de cama, Sala, Herramientas) con reordenamiento manual.
- **Proveedores**: directorio de contactos de servicio.
- **Bitácora**: notas diarias con autor.
- **Equipo**: roster y calendario semanal de turnos.
- **Buscador global**, **traducción ES/EN de toda la interfaz**, **confirmación antes de borrar**, **guardado automático + respaldo manual**.

## Notas técnicas

- No requiere servidor propio ni build: es HTML/CSS/JS puro.
- Usa `localStorage` del navegador como almacenamiento principal, con Google Sheets como capa opcional de sincronización centralizada.
- Dependencias externas (requieren internet la primera vez): Google Fonts (tipografías), `api.qrserver.com` (generación del código QR de conexión), y tu propio Apps Script si conectas Sheets.
- Sin conexión a internet, el panel sigue funcionando completo (guardado local), salvo la sincronización con Sheets.

## Limitaciones conocidas

- La sincronización vía Google Sheets es "el último que guarda gana" — no fusiona cambios simultáneos de dos personas en el mismo campo.
- `localStorage` está ligado al navegador y a la ruta exacta del archivo: si descargas una copia nueva con nombre distinto (ej. `index (1).html`), no compartirá los datos guardados localmente con la copia anterior (Google Sheets sí resuelve esto).
