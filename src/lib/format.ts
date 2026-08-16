export function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function formatShortDate(iso: string) {
  return new Date(iso + (iso.length === 10 ? "T12:00:00" : "")).toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function formatDuration(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  if (m === 0) return `${s}s`;
  if (s === 0) return `${m} min`;
  return `${m}m ${s.toString().padStart(2, "0")}s`;
}

export function clockNow() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export function minutesUntil(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const target = new Date();
  target.setHours(h, m, 0, 0);
  const diff = Math.round((target.getTime() - Date.now()) / 60000);
  return diff;
}

export function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}
