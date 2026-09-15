export const FREQ_ORDER = ["diario", "semanal", "quincenal", "mensual", "trimestral"];

export function periodKey(freq) {
  const d = new Date();
  if (freq === "diario") return d.toISOString().slice(0, 10);
  if (freq === "semanal") {
    const onejan = new Date(d.getFullYear(), 0, 1);
    const week = Math.ceil(((d - onejan) / 86400000 + onejan.getDay() + 1) / 7);
    return d.getFullYear() + "-W" + week;
  }
  if (freq === "quincenal")
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + (d.getDate() <= 15 ? "1" : "2");
  if (freq === "mensual") return d.getFullYear() + "-" + (d.getMonth() + 1);
  if (freq === "trimestral") return d.getFullYear() + "-Q" + Math.ceil((d.getMonth() + 1) / 3);
}

export function periodSortValue(freq, p) {
  try {
    if (freq === "diario") return new Date(p + "T00:00:00").getTime();
    if (freq === "mensual") {
      const parts = p.split("-");
      return Number(parts[0]) * 12 + Number(parts[1]);
    }
    if (freq === "trimestral") {
      const parts = p.split("-Q");
      return Number(parts[0]) * 4 + Number(parts[1]);
    }
    if (freq === "semanal") {
      const parts = p.split("-W");
      return Number(parts[0]) * 53 + Number(parts[1]);
    }
    if (freq === "quincenal") {
      const parts = p.split("-");
      return Number(parts[0]) * 24 + (Number(parts[1]) - 1) * 2 + (Number(parts[2]) - 1);
    }
  } catch (e) {}
  return 0;
}
