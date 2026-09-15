export const todayISO = () => new Date().toISOString().slice(0, 10);

export const addDays = (n) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
};

export const fmtDate = (iso) =>
  new Date(iso + "T00:00:00").toLocaleDateString("es-CO", { day: "2-digit", month: "short" });

export function relTime(iso) {
  if (!iso) return "nunca";
  const s = Math.round((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 10) return "justo ahora";
  if (s < 60) return "hace " + s + " s";
  const m = Math.round(s / 60);
  if (m < 60) return "hace " + m + " min";
  const h = Math.round(m / 60);
  return "hace " + h + " h";
}

export function fmtTime(iso) {
  try {
    return new Date(iso).toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });
  } catch (e) {
    return "";
  }
}
