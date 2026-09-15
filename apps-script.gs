/**
 * KAMBELLEH — backend de sincronización (Google Apps Script)
 *
 * Este script convierte tu Google Sheet en un pequeño servidor gratuito:
 * guarda todo el contenido del panel (tareas, reservas, inventario, etc.)
 * como un solo bloque de texto (JSON) en las "Propiedades del script" de Google,
 * y lo entrega/recibe mediante peticiones GET y POST.
 *
 * INSTALACIÓN:
 * 1. Abre (o crea) una Google Sheet con la cuenta de Kambelleh.
 * 2. Extensiones → Apps Script.
 * 3. Borra todo el contenido del editor y pega este archivo completo.
 * 4. Cambia el valor de SECRETO más abajo por una clave propia.
 * 5. Guarda (Ctrl+S).
 * 6. Implementar → Nueva implementación → tipo "Aplicación web".
 *    - Ejecutar como: Yo (tu cuenta)
 *    - Quién tiene acceso: Cualquier usuario
 * 7. Autoriza el acceso cuando Google lo pida (es tu propio script, es seguro).
 * 8. Copia la URL que termina en /exec — esa es la URL que se usa en el panel.
 *
 * Si ya tienes una implementación y solo cambiaste el código:
 * Implementar → Administrar implementaciones → ícono de lápiz →
 * Versión: "Nueva versión" → Implementar (la URL /exec no cambia).
 */

var SECRETO = "TU_CLAVE_AQUI"; // cámbiala por una clave que solo conozca tu equipo

function doGet(e) {
  if (!e.parameter.token || e.parameter.token !== SECRETO) {
    return ContentService.createTextOutput(JSON.stringify({ error: "no autorizado" }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  var props = PropertiesService.getScriptProperties();
  var data = props.getProperty('kambelleh_data');
  return ContentService.createTextOutput(data || '{}')
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  if (!e.parameter.token || e.parameter.token !== SECRETO) {
    return ContentService.createTextOutput(JSON.stringify({ error: "no autorizado" }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  var body = e.postData.contents;
  PropertiesService.getScriptProperties().setProperty('kambelleh_data', body);
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
