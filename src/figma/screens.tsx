import { ALERTS, COLORS } from "./data";
import { AppNav, PhoneNav } from "./chrome";

export function CoverDesktop() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-forest px-16 text-center text-cream">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-cream/20">
        <span className="h-5 w-5 rounded-full bg-saffron" />
      </span>
      <p className="mt-8 text-xs uppercase tracking-[0.28em] text-sand/80">Practice companion</p>
      <h1 className="font-display mt-4 text-7xl leading-[0.95]">Vipasana</h1>
      <p className="font-display mt-6 text-3xl text-cream/80">Watch the breath. Name the feeling.</p>
      <p className="mt-6 max-w-md text-sm leading-relaxed text-cream/55">
        Anapana at the nostrils. Vedana as it is. Gentle bells through the day. Everything stays on
        this device.
      </p>
      <div className="mt-12 flex gap-8 text-xs uppercase tracking-[0.18em] text-sand/70">
        <span>Today</span>
        <span>Breath</span>
        <span>Feel</span>
        <span>Alerts</span>
        <span>Journal</span>
      </div>
    </div>
  );
}

export function Foundations() {
  return (
    <div className="h-full bg-stone p-12">
      <p className="text-xs uppercase tracking-[0.22em] text-muted">Foundations</p>
      <h1 className="font-display mt-2 text-5xl">Color, type, and quiet controls</h1>
      <div className="mt-10 grid grid-cols-8 gap-3">
        {COLORS.map((c) => (
          <div key={c.name} className="overflow-hidden rounded-2xl border border-line">
            <div className="h-20" style={{ background: c.hex }} />
            <div className="bg-cream px-3 py-2">
              <p className="text-xs font-medium">{c.name}</p>
              <p className="text-[11px] text-muted">{c.hex}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 grid grid-cols-2 gap-10">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-muted">Display · Cormorant Garamond</p>
          <p className="font-display mt-3 text-5xl leading-tight">Stay with the natural breath</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-muted">Body · Outfit</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Do not control it. Feel it where it enters and leaves. If the mind wanders, return. The
            point is not a better mood — it is equanimity toward whatever is here.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="btn btn-forest">Sit now</span>
            <span className="btn btn-saffron">Begin sit</span>
            <span className="btn btn-ghost">Check in</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TodayDesktop() {
  return (
    <div className="flex h-full flex-col bg-stone">
      <AppNav active="Today" />
      <div className="space-y-6 overflow-hidden px-8 py-6">
        <section className="rounded-3xl bg-forest px-10 py-9 text-cream">
          <p className="text-xs uppercase tracking-[0.22em] text-sand/80">Good afternoon</p>
          <h1 className="font-display mt-3 text-5xl leading-[1.05]">
            Watch the breath.
            <br />
            Name the feeling.
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/70">
            Anapana at the nostrils. Vedana as it is — pleasant, unpleasant, or neutral.
          </p>
          <div className="mt-7 flex gap-3">
            <span className="btn btn-saffron">Sit now</span>
            <span className="btn border border-cream/25 bg-transparent text-cream">Check in</span>
          </div>
        </section>
        <section className="grid grid-cols-4 gap-3">
          <Stat label="Minutes today" value="22" />
          <Stat label="Breaths counted" value="84" />
          <Stat label="Check-ins" value="3" />
          <Stat label="Sit streak" value="4d" />
        </section>
        <section className="grid grid-cols-[1.2fr_0.8fr] gap-5">
          <div className="card p-5">
            <h2 className="font-display text-2xl">Today’s reading</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              22 min of sitting, 3 check-ins. Return, again, without hurry.
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.16em] text-muted">
              Last noted · unpleasant · restless · 1:04 PM
            </p>
          </div>
          <div className="card p-5">
            <h2 className="font-display text-2xl">Next alert</h2>
            <p className="font-display mt-3 text-4xl text-forest">19:00</p>
            <p className="mt-1 text-sm text-ink-soft">Evening sit</p>
            <p className="mt-3 text-sm text-muted">Sit again. Watch the day leave the body.</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export function TodayDesktopBells() {
  return (
    <div className="flex h-full flex-col bg-stone">
      <AppNav active="Today" />
      <div className="px-8 py-6">
        <div className="card p-6">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-2xl">The day’s remaining bells</h2>
            <span className="text-xs uppercase tracking-[0.16em] text-muted">6 set</span>
          </div>
          <ol className="mt-4 divide-y divide-line">
            {ALERTS.map((a) => (
              <li key={a.time} className="flex items-center justify-between gap-4 py-3">
                <div>
                  <p className="text-sm font-medium">{a.label}</p>
                  <p className="text-xs text-muted">{a.note}</p>
                </div>
                <span className={`text-sm ${a.state === "done" ? "text-sage" : "text-forest"}`}>
                  {a.state === "done" ? "done" : a.time}
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-6">
          <div>
            <h2 className="font-display text-2xl">Sits</h2>
            <ul className="mt-3 space-y-2">
              <li className="card px-4 py-3 text-sm">6:42 AM · 20 min · 62 breaths · observe</li>
              <li className="card px-4 py-3 text-sm">12:10 PM · 10 min · 22 breaths · mic</li>
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl">Feelings</h2>
            <ul className="mt-3 space-y-2">
              <li className="card px-4 py-3 text-sm">7:05 AM · pleasant · ease · chest</li>
              <li className="card px-4 py-3 text-sm">1:04 PM · unpleasant · restless · shoulders</li>
              <li className="card px-4 py-3 text-sm">4:12 PM · neutral · still · nostrils</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TodayMobile() {
  return (
    <div className="flex h-full flex-col bg-stone">
      <PhoneNav active="Today" />
      <div className="space-y-4 overflow-hidden px-4 py-4">
        <section className="rounded-3xl bg-forest px-5 py-7 text-cream">
          <p className="text-[10px] uppercase tracking-[0.22em] text-sand/80">Good afternoon</p>
          <h1 className="font-display mt-2 text-[34px] leading-[1.05]">
            Watch the breath.
            <br />
            Name the feeling.
          </h1>
          <div className="mt-5 flex gap-2">
            <span className="btn btn-saffron py-2 text-sm">Sit now</span>
            <span className="btn border border-cream/25 bg-transparent py-2 text-sm text-cream">Check in</span>
          </div>
        </section>
        <div className="grid grid-cols-2 gap-2">
          <Stat label="Minutes" value="22" />
          <Stat label="Breaths" value="84" />
          <Stat label="Check-ins" value="3" />
          <Stat label="Streak" value="4d" />
        </div>
        <div className="card p-4">
          <h2 className="font-display text-xl">Next alert</h2>
          <p className="font-display mt-2 text-3xl text-forest">19:00</p>
          <p className="text-sm text-ink-soft">Evening sit</p>
        </div>
      </div>
    </div>
  );
}

export function BreathReady() {
  return (
    <div className="flex h-full flex-col bg-stone">
      <AppNav active="Breath" />
      <div className="px-8 py-6">
        <BreathPanel running={false} />
      </div>
    </div>
  );
}

export function BreathSitting() {
  return (
    <div className="flex h-full flex-col bg-stone">
      <AppNav active="Breath" />
      <div className="px-8 py-6">
        <BreathPanel running />
      </div>
    </div>
  );
}

export function BreathDone() {
  return (
    <div className="flex h-full flex-col bg-stone">
      <AppNav active="Breath" />
      <div className="space-y-4 px-8 py-6">
        <BreathPanel running={false} compact />
        <div className="card p-6">
          <h2 className="font-display text-2xl">The sitting is complete</h2>
          <p className="mt-2 text-sm text-ink-soft">10m 00s · 28 breaths · average cycle 4.8s</p>
          <div className="mt-4 rounded-xl border border-line bg-stone px-3 py-8 text-sm text-muted">
            A note, if the mind wants one
          </div>
          <div className="mt-4 flex gap-2">
            <span className="btn btn-forest">Keep this sitting</span>
            <span className="btn btn-ghost">Discard</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BreathMobile() {
  return (
    <div className="flex h-full flex-col bg-stone">
      <PhoneNav active="Breath" />
      <div className="px-3 py-3">
        <div className="rounded-3xl bg-forest px-4 py-8 text-center text-cream">
          <p className="text-[10px] uppercase tracking-[0.22em] text-sand/80">Anapana</p>
          <h1 className="font-display mt-1 text-3xl">Stay with the breath</h1>
          <div className="relative mx-auto mt-6 flex h-44 w-44 items-center justify-center">
            <div className="orb absolute inset-4 rounded-full" />
            <div className="relative z-10">
              <p className="font-display text-4xl">10:00</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-sand/80">ready</p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap justify-center gap-1.5">
            {["5", "10", "20", "30"].map((m) => (
              <span
                key={m}
                className={`rounded-full px-2.5 py-1 text-xs ${m === "10" ? "bg-saffron" : "bg-cream/10"}`}
              >
                {m} min
              </span>
            ))}
          </div>
          <span className="btn btn-saffron mt-6">Begin sit</span>
        </div>
      </div>
    </div>
  );
}

export function FeelSelect() {
  return (
    <div className="flex h-full flex-col bg-stone">
      <AppNav active="Feel" />
      <div className="px-8 py-8">
        <p className="text-xs uppercase tracking-[0.22em] text-muted">Vedana</p>
        <h1 className="font-display mt-2 text-5xl">What is here, before the story?</h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-soft">
          Name the tone of sensation. Equanimity is the practice — not choosing a better mood.
        </p>
        <div className="mt-8 grid grid-cols-3 gap-4">
          <VedanaCard title="Pleasant" body="Sukha. Warmth, ease, liking. Do not cling." />
          <VedanaCard title="Unpleasant" body="Dukkha. Tightness, dislike, unrest. Do not push." active />
          <VedanaCard title="Neutral" body="Adukkhamasukha. Ordinary. Often overlooked. Stay." />
        </div>
      </div>
    </div>
  );
}

export function FeelDetail() {
  const chips = ["restless", "anxious", "heavy", "irritable", "sad", "tight"];
  return (
    <div className="flex h-full flex-col bg-stone">
      <AppNav active="Feel" />
      <div className="px-8 py-8">
        <p className="text-xs uppercase tracking-[0.22em] text-muted">Vedana</p>
        <h1 className="font-display mt-2 text-4xl">What is here, before the story?</h1>
        <div className="mt-6 grid grid-cols-3 gap-3">
          <VedanaCard title="Pleasant" body="Sukha. Warmth, ease." compact />
          <VedanaCard title="Unpleasant" body="Dukkha. Tightness, dislike." active compact />
          <VedanaCard title="Neutral" body="Ordinary. Stay." compact />
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.16em] text-muted">A closer name</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {chips.map((f) => (
            <span key={f} className={`rounded-full px-3 py-1.5 text-sm ${f === "restless" ? "bg-saffron text-cream" : "bg-sand"}`}>
              {f}
            </span>
          ))}
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.16em] text-muted">Intensity · 4/5</p>
        <div className="mt-2 h-1.5 rounded-full bg-sand">
          <div className="h-full w-4/5 rounded-full bg-saffron" />
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.16em] text-muted">Where in the body · shoulders</p>
        <span className="btn btn-forest mt-8">Record this moment</span>
      </div>
    </div>
  );
}

export function FeelMobile() {
  return (
    <div className="flex h-full flex-col bg-stone">
      <PhoneNav active="Feel" />
      <div className="space-y-3 px-4 py-5">
        <p className="text-[10px] uppercase tracking-[0.22em] text-muted">Vedana</p>
        <h1 className="font-display text-[32px] leading-[1.05]">What is here, before the story?</h1>
        <VedanaCard title="Pleasant" body="Sukha. Do not cling." compact />
        <VedanaCard title="Unpleasant" body="Dukkha. Do not push." active compact />
        <VedanaCard title="Neutral" body="Ordinary. Stay." compact />
      </div>
    </div>
  );
}

export function AlertsDesktop() {
  return (
    <div className="flex h-full flex-col bg-stone">
      <AppNav active="Alerts" />
      <div className="px-8 py-8">
        <p className="text-xs uppercase tracking-[0.22em] text-muted">The day’s bells</p>
        <h1 className="font-display mt-2 text-5xl">Reminders to return</h1>
        <p className="mt-3 max-w-xl text-sm text-ink-soft">
          Six gentle calls. Notifications work while this tab is open.
        </p>
        <div className="card mt-6 flex items-center justify-between p-5">
          <div>
            <p className="text-sm font-medium">Browser alerts</p>
            <p className="text-sm text-muted">Enabled</p>
          </div>
          <span className="btn btn-forest">Test a bell</span>
        </div>
        <ul className="mt-4 space-y-2">
          {ALERTS.map((a) => (
            <li key={a.time} className="card flex items-center gap-4 p-4">
              <span className="flex h-5 w-5 items-center justify-center rounded border border-forest bg-forest">
                <span className="h-2 w-2 bg-cream" />
              </span>
              <span className="rounded-lg border border-line bg-stone px-2 py-1 text-sm">{a.time}</span>
              <div>
                <p className="text-sm font-medium">{a.label}</p>
                <p className="text-xs text-muted">{a.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function AlertsMobile() {
  return (
    <div className="flex h-full flex-col bg-stone">
      <PhoneNav active="Alerts" />
      <div className="px-4 py-5">
        <p className="text-[10px] uppercase tracking-[0.22em] text-muted">The day’s bells</p>
        <h1 className="font-display mt-1 text-3xl">Reminders to return</h1>
        <div className="card mt-4 p-4">
          <p className="text-sm font-medium">Browser alerts</p>
          <p className="text-xs text-muted">Enabled</p>
          <span className="btn btn-forest mt-3 py-2 text-sm">Test a bell</span>
        </div>
        <ul className="mt-3 space-y-2">
          {ALERTS.slice(0, 4).map((a) => (
            <li key={a.time} className="card p-3">
              <p className="text-sm font-medium">
                {a.time} · {a.label}
              </p>
              <p className="text-xs text-muted">{a.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function JournalDesktop() {
  return (
    <div className="flex h-full flex-col bg-stone">
      <AppNav active="Journal" />
      <div className="px-8 py-8">
        <p className="text-xs uppercase tracking-[0.22em] text-muted">Review</p>
        <h1 className="font-display mt-2 text-5xl">What arose, what passed</h1>
        <article className="card mt-8 p-5">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-2xl">Sun, Aug 16</h2>
            <p className="text-xs uppercase tracking-[0.14em] text-muted">22 min · 3 check-ins · P1 U1 N1</p>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-ink-soft">
            <li>Sit at 6:42 AM · 20 min · 62 breaths — the mind was already loud. Returned.</li>
            <li>Sit at 12:10 PM · 10 min · 22 breaths</li>
            <li>7:05 AM · pleasant · ease · chest</li>
            <li>1:04 PM · unpleasant · restless · shoulders — heat in the neck. Watched.</li>
            <li>4:12 PM · neutral · still · nostrils</li>
          </ul>
        </article>
        <article className="card mt-4 p-5">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-2xl">Sat, Aug 15</h2>
            <p className="text-xs uppercase tracking-[0.14em] text-muted">30 min · 2 check-ins · P0 U1 N1</p>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-ink-soft">
            <li>Sit at 6:30 AM · 30 min · 80 breaths</li>
            <li>8:10 PM · unpleasant · heavy · belly</li>
            <li>9:40 PM · neutral · quiet · whole body</li>
          </ul>
        </article>
      </div>
    </div>
  );
}

export function JournalMobile() {
  return (
    <div className="flex h-full flex-col bg-stone">
      <PhoneNav active="Journal" />
      <div className="px-4 py-5">
        <p className="text-[10px] uppercase tracking-[0.22em] text-muted">Review</p>
        <h1 className="font-display mt-1 text-[32px] leading-tight">What arose, what passed</h1>
        <article className="card mt-5 p-4">
          <h2 className="font-display text-xl">Sun, Aug 16</h2>
          <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-muted">22 min · 3 check-ins</p>
          <p className="mt-3 text-sm text-ink-soft">6:42 AM sit · 20 min</p>
          <p className="text-sm text-ink-soft">1:04 PM · restless · shoulders</p>
        </article>
        <article className="card mt-3 p-4">
          <h2 className="font-display text-xl">Sat, Aug 15</h2>
          <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-muted">30 min · 2 check-ins</p>
          <p className="mt-3 text-sm text-ink-soft">6:30 AM sit · 30 min</p>
        </article>
      </div>
    </div>
  );
}

export function BannerDesktop() {
  return (
    <div className="flex h-full flex-col bg-stone">
      <div className="flex items-center justify-between bg-forest px-8 py-3 text-cream">
        <p className="text-sm">
          <span className="font-medium">Afternoon pause.</span> Come back. Three breaths. Equanimity
          toward whatever is here.
        </p>
        <div className="flex gap-2">
          <span className="btn btn-saffron py-1.5 text-sm">Begin</span>
          <span className="btn border border-cream/30 bg-transparent py-1.5 text-sm text-cream">Later</span>
        </div>
      </div>
      <AppNav active="Today" />
      <div className="px-8 py-6 opacity-50">
        <section className="rounded-3xl bg-forest px-10 py-8 text-cream">
          <h1 className="font-display text-4xl">Watch the breath.</h1>
        </section>
      </div>
    </div>
  );
}

export function Components() {
  return (
    <div className="h-full bg-stone p-12">
      <p className="text-xs uppercase tracking-[0.22em] text-muted">Components</p>
      <h1 className="font-display mt-2 text-5xl">Pieces used across the day</h1>
      <div className="mt-10 grid grid-cols-3 gap-6">
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.16em] text-muted">Stat</p>
          <Stat label="Minutes today" value="22" />
        </div>
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.16em] text-muted">Primary / ghost</p>
          <div className="flex flex-wrap gap-2">
            <span className="btn btn-forest">Sit now</span>
            <span className="btn btn-saffron">Begin sit</span>
            <span className="btn btn-ghost">Later</span>
          </div>
        </div>
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.16em] text-muted">Vedana card</p>
          <VedanaCard title="Neutral" body="Ordinary. Often overlooked. Stay." />
        </div>
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.16em] text-muted">Orb</p>
          <div className="flex h-40 items-center justify-center rounded-2xl bg-forest">
            <div className="orb h-24 w-24 rounded-full" />
          </div>
        </div>
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.16em] text-muted">Feeling chip</p>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-saffron px-3 py-1.5 text-sm text-cream">restless</span>
            <span className="rounded-full bg-sand px-3 py-1.5 text-sm">ease</span>
            <span className="rounded-full bg-sand px-3 py-1.5 text-sm">still</span>
          </div>
        </div>
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.16em] text-muted">Alert row</p>
          <div className="card flex items-center justify-between p-4">
            <div>
              <p className="text-sm font-medium">Evening sit</p>
              <p className="text-xs text-muted">Watch the day leave the body.</p>
            </div>
            <span className="text-sm text-forest">19:00</span>
          </div>
        </div>
      </div>
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

function VedanaCard({
  title,
  body,
  active,
  compact,
}: {
  title: string;
  body: string;
  active?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border px-4 text-left ${compact ? "py-4" : "py-5"} ${
        active ? "border-forest bg-forest text-cream" : "border-line bg-cream"
      }`}
    >
      <p className="font-display text-2xl">{title}</p>
      <p className={`mt-2 text-sm leading-relaxed ${active ? "text-cream/75" : "text-muted"}`}>{body}</p>
    </div>
  );
}

function BreathPanel({ running, compact }: { running: boolean; compact?: boolean }) {
  return (
    <div className={`rounded-3xl bg-forest text-center text-cream ${compact ? "px-8 py-8" : "px-10 py-10"}`}>
      <p className="text-xs uppercase tracking-[0.22em] text-sand/80">Anapana</p>
      <h1 className="font-display mt-2 text-4xl">Stay with the natural breath</h1>
      {!compact && (
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-cream/70">
          Do not control it. Feel it where it enters and leaves. If the mind wanders, return.
        </p>
      )}
      <div className="relative mx-auto mt-8 flex h-56 w-56 items-center justify-center">
        <div className={`orb absolute inset-6 rounded-full ${running ? "orb-live" : ""}`} />
        <div className="relative z-10">
          <p className="font-display text-5xl">{running ? "7:12" : "10:00"}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-sand/80">
            {running ? "watching" : "ready"}
          </p>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {["5", "10", "20", "30", "45", "60"].map((m) => (
          <span key={m} className={`rounded-full px-3 py-1 text-sm ${m === "10" ? "bg-saffron" : "bg-cream/10"}`}>
            {m} min
          </span>
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-2">
        <span className="rounded-full bg-cream px-4 py-1.5 text-sm text-forest">Observe</span>
        <span className="rounded-full bg-cream/10 px-4 py-1.5 text-sm text-cream/80">Listen with mic</span>
      </div>
      <span className={`btn mt-7 ${running ? "border border-cream/30 bg-transparent text-cream" : "btn-saffron"}`}>
        {running ? "Close the sit" : "Begin sit"}
      </span>
      {running && <p className="mt-4 text-xs text-cream/60">18 breaths · 2m 48s · 28% of the sitting</p>}
    </div>
  );
}
