export function safe(value, fallback = "-") {
  if (value === null || value === undefined || value === "") return fallback;
  return value;
}

export function num(value, digit = null) {
  const n = Number(value || 0);

  if (digit !== null) {
    return n.toLocaleString("id-ID", {
      maximumFractionDigits: digit
    });
  }

  return n.toLocaleString("id-ID");
}

export function rupiah(value) {
  const n = Number(value || 0);
  return "Rp " + n.toLocaleString("id-ID");
}

export function dateText(value) {
  if (!value) return "-";

  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);

  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}

export function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
