"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { nextAlert, upcomingAlerts } from "@/lib/alerts";
import { formatDuration, formatTime, greeting } from "@/lib/format";
import { streakDays, todayInsight } from "@/lib/insights";
import { loadStore, subscribe, todaysEmotions, todaysSessions } from "@/lib/storage";
import type { Store } from "@/lib/types";

const empty: Store = {
  sessions: [],
  emotions: [],
  alerts: [],
  fired: {},
  notificationsEnabled: false,
  lastChimeAt: "",
};

export function TodayBoard() {
  const [store, setStore] = useState<Store>(empty);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const pull = () => setStore(loadStore());
    pull();
    setReady(true);
    return subscribe(pull);
  }, []);

  const sits = useMemo(() => todaysSessions(store), [store]);
  const feelings = useMemo(() => todaysEmotions(store), [store]);
  const minutes = Math.round(sits.reduce((n, s) => n + s.durationSec, 0) / 60);
  const breaths = sits.reduce((n, s) => n + s.breaths, 0);
  const upcoming = upcomingAlerts(store);
  const next = nextAlert(store);
  const streak = streakDays(store);

  if (!ready) {
    return <div className="h-64 animate-pulse rounded-3xl bg-sand/60" />;
  }

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl bg-forest px-6 py-10 text-cream sm:px-10">
        <p className="text-xs uppercase tracking-[0.22em] text-sand/80">{greeting()}</p>
        <h1 className="font-display mt-3 max-w-xl text-5xl leading-[1.05] sm:text-6xl">
          Watch the breath.
          <br />
          Name the feeling.
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/70">
          Anapana at the nostrils. Vedana as it is — pleasant, unpleasant, or neutral. Gentle
          alerts keep you returning through the day.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/breath" className="btn btn-saffron">
            Sit now
          </Link>
          <Link href="/emotions" className="btn border border-cream/25 bg-transparent text-cream">
            Check in
          </Link>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-4">
        <Stat label="Minutes today" value={String(minutes)} />
        <Stat label="Breaths counted" value={String(breaths)} />
        <Stat label="Check-ins" value={String(feelings.length)} />
        <Stat label="Sit streak" value={streak ? `${streak}d` : "—"} />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="card p-6">
          <h2 className="font-display text-2xl">Today’s reading</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{todayInsight(store)}</p>
          {feelings[0] && (
            <p className="mt-4 text-xs uppercase tracking-[0.16em] text-muted">
              Last noted · {feelings[0].vedana} · {feelings[0].feeling} · {formatTime(feelings[0].at)}
            </p>
          )}
        </div>
        <div className="card p-6">
          <h2 className="font-display text-2xl">Next alert</h2>
          {next ? (
            <>
              <p className="mt-3 font-display text-4xl text-forest">{next.time}</p>
              <p className="mt-1 text-sm text-ink-soft">{next.label}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{next.message}</p>
            </>
          ) : (
            <p className="mt-3 text-sm text-ink-soft">All of today’s reminders have sounded.</p>
          )}
          <Link href="/alerts" className="mt-5 inline-block text-sm text-saffron underline-offset-4 hover:underline">
            Adjust the day
          </Link>
        </div>
      </section>

      <section className="card p-6">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-display text-2xl">The day’s remaining bells</h2>
          <span className="text-xs uppercase tracking-[0.16em] text-muted">
            {upcoming.filter((a) => a.enabled).length} set
          </span>
        </div>
        <ol className="mt-5 divide-y divide-line">
          {upcoming.map((a) => (
            <li key={a.id} className="flex items-center justify-between gap-4 py-3">
              <div>
                <p className="text-sm font-medium">{a.label}</p>
                <p className="text-xs text-muted">{a.message}</p>
              </div>
              <span className={`shrink-0 text-sm ${a.firedToday ? "text-sage" : "text-forest"}`}>
                {a.firedToday ? "done" : a.time}
              </span>
            </li>
          ))}
        </ol>
      </section>

      {(sits.length > 0 || feelings.length > 0) && (
        <section className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl">Sits</h2>
            <ul className="mt-3 space-y-2">
              {sits.map((s) => (
                <li key={s.id} className="card px-4 py-3 text-sm">
                  {formatTime(s.startedAt)} · {formatDuration(s.durationSec)} · {s.breaths} breaths · {s.mode}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl">Feelings</h2>
            <ul className="mt-3 space-y-2">
              {feelings.map((e) => (
                <li key={e.id} className="card px-4 py-3 text-sm">
                  {formatTime(e.at)} · {e.vedana} · {e.feeling}
                  {e.body ? ` · ${e.body}` : ""}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="card px-4 py-4">
      <p className="text-xs uppercase tracking-[0.16em] text-muted">{label}</p>
      <p className="font-display mt-1 text-3xl">{value}</p>
    </div>
  );
}
