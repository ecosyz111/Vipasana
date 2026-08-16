"use client";

import { useEffect, useRef, useState } from "react";
import { formatDuration } from "@/lib/format";
import { addSession, uid } from "@/lib/storage";
import type { BreathMode } from "@/lib/types";

const PRESETS = [5, 10, 20, 30, 45, 60];

export function BreathStudio() {
  const [mode, setMode] = useState<BreathMode>("observe");
  const [targetMin, setTargetMin] = useState(10);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [breaths, setBreaths] = useState(0);
  const [phase, setPhase] = useState<"still" | "in" | "out">("still");
  const [level, setLevel] = useState(0);
  const [micError, setMicError] = useState("");
  const [done, setDone] = useState(false);
  const [note, setNote] = useState("");
  const [orbScale, setOrbScale] = useState(1);

  const startedAt = useRef<string>("");
  const cycles = useRef<number[]>([]);
  const lastPeak = useRef(0);
  const raf = useRef(0);
  const audio = useRef<AudioContext | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const above = useRef(false);
  const smooth = useRef(0);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setElapsed((e) => e + 1);
    }, 1000);
    return () => window.clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (running && elapsed >= targetMin * 60) {
      finish();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elapsed, running, targetMin]);

  useEffect(() => {
    return () => stopMic();
  }, []);

  async function start() {
    setDone(false);
    setNote("");
    setElapsed(0);
    setBreaths(0);
    setPhase("still");
    cycles.current = [];
    startedAt.current = new Date().toISOString();
    setRunning(true);
    if (mode === "mic") {
      try {
        await startMic();
        setMicError("");
      } catch {
        setMicError("Microphone was not allowed. Continue by watching the natural breath.");
        setMode("observe");
      }
    }
  }

  async function startMic() {
    const media = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: true },
    });
    stream.current = media;
    const ctx = new AudioContext();
    audio.current = ctx;
    const source = ctx.createMediaStreamSource(media);
    const node = ctx.createAnalyser();
    node.fftSize = 1024;
    source.connect(node);
    analyser.current = node;
    const data = new Uint8Array(node.fftSize);

    const loop = () => {
      if (!analyser.current) return;
      analyser.current.getByteTimeDomainData(data);
      let sum = 0;
      for (let i = 0; i < data.length; i++) {
        const v = (data[i] - 128) / 128;
        sum += v * v;
      }
      const rms = Math.sqrt(sum / data.length);
      smooth.current = smooth.current * 0.86 + rms * 0.14;
      const n = Math.min(1, smooth.current * 8);
      setLevel(n);
      setOrbScale(0.88 + n * 0.35);

      const threshold = 0.09;
      if (!above.current && n > threshold) {
        above.current = true;
        setPhase("in");
        const now = performance.now();
        if (lastPeak.current) {
          const cycle = (now - lastPeak.current) / 1000;
          if (cycle > 1.4 && cycle < 20) {
            cycles.current.push(cycle);
            setBreaths((b) => b + 1);
          }
        }
        lastPeak.current = now;
      } else if (above.current && n < threshold * 0.55) {
        above.current = false;
        setPhase("out");
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
  }

  function stopMic() {
    cancelAnimationFrame(raf.current);
    stream.current?.getTracks().forEach((t) => t.stop());
    stream.current = null;
    audio.current?.close();
    audio.current = null;
    analyser.current = null;
  }

  function finish() {
    if (!running) return;
    setRunning(false);
    stopMic();
    setPhase("still");
    setDone(true);
  }

  function save() {
    const avg =
      cycles.current.length > 0
        ? Math.round((cycles.current.reduce((a, b) => a + b, 0) / cycles.current.length) * 10) / 10
        : 0;
    addSession({
      id: uid(),
      startedAt: startedAt.current || new Date().toISOString(),
      endedAt: new Date().toISOString(),
      durationSec: elapsed,
      breaths,
      avgCycleSec: avg,
      mode,
      note: note.trim(),
    });
    setDone(false);
    setElapsed(0);
    setBreaths(0);
    setNote("");
  }

  const remain = Math.max(0, targetMin * 60 - elapsed);
  const progress = Math.min(1, elapsed / (targetMin * 60));

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-3xl bg-forest px-4 py-8 text-center text-cream sm:px-10 sm:py-12">
        <p className="text-[11px] uppercase tracking-[0.22em] text-sand/80 sm:text-xs">Anapana</p>
        <h1 className="font-display mt-2 text-[2rem] leading-tight sm:text-5xl">Stay with the natural breath</h1>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-cream/70">
          Do not control it. Feel it where it enters and leaves. If the mind wanders, return. The
          microphone is optional — it only watches volume so you can see the cycle.
        </p>

        <div className="relative mx-auto mt-8 flex aspect-square w-[min(16.5rem,70vw)] items-center justify-center sm:mt-10 sm:w-72">
          <div
            className={`orb absolute inset-6 rounded-full ${running && mode === "observe" ? "orb-live" : ""}`}
            style={
              mode === "mic" && running
                ? { transform: `scale(${orbScale})`, transition: "transform 120ms linear" }
                : undefined
            }
          />
          <div className="relative z-10">
            <p className="font-display text-5xl tabular-nums">{formatClock(running ? remain : targetMin * 60)}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-sand/80">
              {running ? phaseLabel(phase, mode) : "ready"}
            </p>
          </div>
        </div>

        {mode === "mic" && running && (
          <div className="mx-auto mt-4 h-1.5 w-48 max-w-full overflow-hidden rounded-full bg-cream/15">
            <div className="h-full bg-saffron" style={{ width: `${Math.round(level * 100)}%` }} />
          </div>
        )}

        <div className="mt-7 flex flex-wrap justify-center gap-2 sm:mt-8">
          {PRESETS.map((m) => (
            <button
              key={m}
              type="button"
              disabled={running}
              onClick={() => setTargetMin(m)}
              className={`min-h-10 rounded-full px-3 py-1.5 text-sm ${
                targetMin === m ? "bg-saffron text-cream" : "bg-cream/10 text-cream/80"
              }`}
            >
              {m} min
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-col justify-center gap-2 sm:mt-5 sm:flex-row sm:flex-wrap">
          <ModeButton active={mode === "observe"} disabled={running} onClick={() => setMode("observe")}>
            Observe
          </ModeButton>
          <ModeButton active={mode === "mic"} disabled={running} onClick={() => setMode("mic")}>
            Listen with mic
          </ModeButton>
        </div>

        {micError && <p className="mt-3 text-sm text-sand">{micError}</p>}

        <div className="mt-7 flex justify-center gap-3 sm:mt-8">
          {!running ? (
            <button type="button" className="btn btn-saffron w-full sm:w-auto" onClick={start}>
              Begin sit
            </button>
          ) : (
            <button type="button" className="btn w-full border border-cream/30 bg-transparent text-cream sm:w-auto" onClick={finish}>
              Close the sit
            </button>
          )}
        </div>

        {running && (
          <p className="mt-4 text-xs text-cream/60">
            {breaths} breaths · {formatDuration(elapsed)} · {Math.round(progress * 100)}% of the sitting
          </p>
        )}
      </div>

      {done && (
        <div className="card p-5 sm:p-6">
          <h2 className="font-display text-2xl">The sitting is complete</h2>
          <p className="mt-2 text-sm text-ink-soft">
            {formatDuration(elapsed)}
            {breaths ? ` · ${breaths} breaths` : ""}
            {cycles.current.length
              ? ` · average cycle ${Math.round((cycles.current.reduce((a, b) => a + b, 0) / cycles.current.length) * 10) / 10}s`
              : ""}
          </p>
          <label className="mt-4 block text-xs uppercase tracking-[0.16em] text-muted">
            A note, if the mind wants one
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              className="mt-2 w-full rounded-xl border border-line bg-stone px-3 py-2 text-base text-ink outline-none focus:border-moss sm:text-sm"
            />
          </label>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button type="button" className="btn btn-forest w-full sm:w-auto" onClick={save}>
              Keep this sitting
            </button>
            <button
              type="button"
              className="btn btn-ghost w-full sm:w-auto"
              onClick={() => {
                setDone(false);
                setElapsed(0);
              }}
            >
              Discard
            </button>
          </div>
        </div>
      )}

      <p className="text-center text-xs leading-relaxed text-muted">
        Vipasana is a practice companion, not a medical device. Breath sound is processed on this
        device only and is never uploaded.
      </p>
    </div>
  );
}

function formatClock(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function phaseLabel(phase: "still" | "in" | "out", mode: BreathMode) {
  if (mode === "observe") return "watching";
  if (phase === "in") return "in-breath";
  if (phase === "out") return "out-breath";
  return "still";
}

function ModeButton({
  active,
  disabled,
  onClick,
  children,
}: {
  active: boolean;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`min-h-10 w-full rounded-full px-4 py-1.5 text-sm sm:w-auto ${active ? "bg-cream text-forest" : "bg-cream/10 text-cream/80"}`}
    >
      {children}
    </button>
  );
}
