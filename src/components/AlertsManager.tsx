"use client";

import { useEffect, useState } from "react";
import { loadStore, setNotificationsEnabled, subscribe, updateAlerts } from "@/lib/storage";
import type { AlertRule, Store } from "@/lib/types";

export function AlertsManager() {
  const [store, setStore] = useState<Store | null>(null);
  const [perm, setPerm] = useState<NotificationPermission>("default");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const pull = () => setStore(loadStore());
    pull();
    if ("Notification" in window) setPerm(Notification.permission);
    return subscribe(pull);
  }, []);

  if (!store) return <div className="h-48 animate-pulse rounded-3xl bg-sand/60" />;
  const current = store;

  async function enableNotes() {
    if (!("Notification" in window)) {
      setStatus("This browser does not support notifications.");
      return;
    }
    const result = await Notification.requestPermission();
    setPerm(result);
    const ok = result === "granted";
    setNotificationsEnabled(ok);
    setStatus(ok ? "Alerts will sound in this browser while Vipasana is open." : "Permission was not granted.");
    if (ok) {
      new Notification("Vipasana", { body: "The day’s bells are set. Keep this tab nearby." });
    }
  }

  function patch(id: string, next: Partial<AlertRule>) {
    updateAlerts(current.alerts.map((a) => (a.id === id ? { ...a, ...next } : a)));
  }

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.22em] text-muted">The day’s bells</p>
        <h1 className="font-display mt-2 text-4xl sm:text-5xl">Reminders to return</h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-soft">
          Six gentle calls: morning sit, a midday vedana check, evening sitting, and short returns
          to the breath. Notifications work while this tab is open.
        </p>
      </header>

      <div className="card flex flex-wrap items-center justify-between gap-4 p-5">
        <div>
          <p className="text-sm font-medium">Browser alerts</p>
          <p className="text-sm text-muted">
            {current.notificationsEnabled && perm === "granted" ? "Enabled" : "Off — enable to receive the day’s bells"}
          </p>
        </div>
        <button type="button" className="btn btn-forest" onClick={enableNotes}>
          {perm === "granted" ? "Test a bell" : "Enable alerts"}
        </button>
      </div>
      {status && <p className="text-sm text-ink-soft">{status}</p>}

      <ul className="space-y-3">
        {current.alerts.map((a) => (
          <li key={a.id} className="card flex flex-wrap items-center gap-4 p-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={a.enabled}
                onChange={(e) => patch(a.id, { enabled: e.target.checked })}
                className="accent-forest"
              />
              On
            </label>
            <input
              type="time"
              value={a.time}
              onChange={(e) => patch(a.id, { time: e.target.value })}
              className="rounded-lg border border-line bg-stone px-2 py-1.5 text-sm"
            />
            <div className="min-w-[12rem] flex-1">
              <p className="text-sm font-medium">{a.label}</p>
              <p className="text-xs text-muted">{a.message}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
