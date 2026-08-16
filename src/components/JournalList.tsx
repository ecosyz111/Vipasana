"use client";

import { useEffect, useMemo, useState } from "react";
import { formatDuration, formatShortDate, formatTime } from "@/lib/format";
import { countVedana } from "@/lib/insights";
import { loadStore, localDay, subscribe } from "@/lib/storage";
import type { Store } from "@/lib/types";

export function JournalList() {
  const [store, setStore] = useState<Store | null>(null);

  useEffect(() => {
    const pull = () => setStore(loadStore());
    pull();
    return subscribe(pull);
  }, []);

  const days = useMemo(() => {
    if (!store) return [];
    const map = new Map<string, { sessions: typeof store.sessions; emotions: typeof store.emotions }>();
    for (const s of store.sessions) {
      const key = localDay(s.startedAt);
      const row = map.get(key) ?? { sessions: [], emotions: [] };
      row.sessions.push(s);
      map.set(key, row);
    }
    for (const e of store.emotions) {
      const key = localDay(e.at);
      const row = map.get(key) ?? { sessions: [], emotions: [] };
      row.emotions.push(e);
      map.set(key, row);
    }
    return [...map.entries()].sort((a, b) => b[0].localeCompare(a[0]));
  }, [store]);

  if (!store) return <div className="h-48 animate-pulse rounded-3xl bg-sand/60" />;

  if (!days.length) {
    return (
      <div className="card p-8 text-center">
        <h1 className="font-display text-3xl sm:text-4xl">The journal is empty</h1>
        <p className="mt-3 text-sm text-ink-soft">Sits and check-ins will gather here, on this device only.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.22em] text-muted">Review</p>
        <h1 className="font-display mt-2 text-[2.1rem] leading-tight sm:text-5xl">What arose, what passed</h1>
      </header>
      {days.map(([day, row]) => {
        const minutes = Math.round(row.sessions.reduce((n, s) => n + s.durationSec, 0) / 60);
        const vedana = countVedana(row.emotions.map((e) => e.vedana));
        return (
          <article key={day} className="card p-5">
            <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-2">
              <h2 className="font-display text-2xl">{formatShortDate(day)}</h2>
              <p className="text-xs uppercase tracking-[0.14em] text-muted">
                {minutes} min · {row.emotions.length} check-ins · P{vedana.pleasant} U{vedana.unpleasant} N
                {vedana.neutral}
              </p>
            </div>
            {row.sessions.length > 0 && (
              <ul className="mt-4 space-y-2">
                {row.sessions.map((s) => (
                  <li key={s.id} className="text-sm text-ink-soft">
                    Sit at {formatTime(s.startedAt)} · {formatDuration(s.durationSec)} · {s.breaths} breaths
                    {s.note ? ` — ${s.note}` : ""}
                  </li>
                ))}
              </ul>
            )}
            {row.emotions.length > 0 && (
              <ul className="mt-3 space-y-2">
                {row.emotions.map((e) => (
                  <li key={e.id} className="text-sm text-ink-soft">
                    {formatTime(e.at)} · {e.vedana} · {e.feeling} · {e.body}
                    {e.note ? ` — ${e.note}` : ""}
                  </li>
                ))}
              </ul>
            )}
          </article>
        );
      })}
    </div>
  );
}
