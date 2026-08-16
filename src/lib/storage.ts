import { DEFAULT_ALERTS, type AlertRule, type BreathSession, type EmotionEntry, type Store } from "./types";

const KEY = "vipasana.v1";
export const CHANGE_EVENT = "vipasana:change";

function emptyStore(): Store {
  return {
    sessions: [],
    emotions: [],
    alerts: DEFAULT_ALERTS,
    fired: {},
    notificationsEnabled: false,
    lastChimeAt: "",
  };
}

export function loadStore(): Store {
  if (typeof window === "undefined") return emptyStore();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return emptyStore();
    const parsed = JSON.parse(raw) as Partial<Store>;
    return {
      ...emptyStore(),
      ...parsed,
      alerts: mergeAlerts(parsed.alerts),
      sessions: parsed.sessions ?? [],
      emotions: parsed.emotions ?? [],
      fired: parsed.fired ?? {},
    };
  } catch {
    return emptyStore();
  }
}

function mergeAlerts(saved?: AlertRule[]): AlertRule[] {
  if (!saved?.length) return DEFAULT_ALERTS;
  const byId = new Map(saved.map((a) => [a.id, a]));
  return DEFAULT_ALERTS.map((def) => {
    const prev = byId.get(def.id);
    return prev ? { ...def, ...prev, id: def.id, kind: def.kind } : def;
  });
}

export function saveStore(next: Store) {
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function patchStore(fn: (s: Store) => Store) {
  saveStore(fn(loadStore()));
}

export function uid() {
  return crypto.randomUUID();
}

export function todayKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function localDay(iso: string) {
  return todayKey(new Date(iso));
}

export function isSameDay(iso: string, day = todayKey()) {
  return localDay(iso) === day;
}

export function todaysSessions(store: Store, day = todayKey()) {
  return store.sessions.filter((s) => isSameDay(s.startedAt, day));
}

export function todaysEmotions(store: Store, day = todayKey()) {
  return store.emotions.filter((e) => isSameDay(e.at, day));
}

export function addSession(session: BreathSession) {
  patchStore((s) => ({ ...s, sessions: [session, ...s.sessions].slice(0, 400) }));
}

export function addEmotion(entry: EmotionEntry) {
  patchStore((s) => ({ ...s, emotions: [entry, ...s.emotions].slice(0, 800) }));
}

export function updateAlerts(alerts: AlertRule[]) {
  patchStore((s) => ({ ...s, alerts }));
}

export function setNotificationsEnabled(enabled: boolean) {
  patchStore((s) => ({ ...s, notificationsEnabled: enabled }));
}

export function markFired(alertId: string, day = todayKey()) {
  patchStore((s) => ({ ...s, fired: { ...s.fired, [alertId]: day } }));
}

export function subscribe(fn: () => void) {
  window.addEventListener(CHANGE_EVENT, fn);
  window.addEventListener("storage", fn);
  return () => {
    window.removeEventListener(CHANGE_EVENT, fn);
    window.removeEventListener("storage", fn);
  };
}
