import type { AlertRule, Store } from "./types";
import { clockNow, minutesUntil } from "./format";
import { todayKey } from "./storage";

export function upcomingAlerts(store: Store, now = clockNow()) {
  return store.alerts
    .filter((a) => a.enabled)
    .map((a) => ({ ...a, mins: minutesUntil(a.time), due: a.time <= now, firedToday: store.fired[a.id] === todayKey() }))
    .sort((a, b) => a.time.localeCompare(b.time));
}

export function nextAlert(store: Store) {
  const list = upcomingAlerts(store);
  return list.find((a) => !a.due && !a.firedToday) ?? list.find((a) => !a.firedToday);
}

export function dueUnfired(store: Store): AlertRule[] {
  const day = todayKey();
  return store.alerts.filter((a) => {
    if (!a.enabled || store.fired[a.id] === day) return false;
    const mins = minutesUntil(a.time);
    return mins <= 0 && mins >= -2;
  });
}

export function kindHref(kind: AlertRule["kind"]) {
  if (kind === "sit" || kind === "breath") return "/breath";
  if (kind === "emotion") return "/emotions";
  return "/journal";
}
