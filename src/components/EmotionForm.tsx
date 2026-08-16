"use client";

import { useState } from "react";
import { BODY_AREAS, FEELINGS, type Vedana } from "@/lib/types";
import { addEmotion, uid } from "@/lib/storage";

const VEDANA: { id: Vedana; title: string; body: string }[] = [
  { id: "pleasant", title: "Pleasant", body: "Sukha. Warmth, ease, liking. Do not cling." },
  { id: "unpleasant", title: "Unpleasant", body: "Dukkha. Tightness, dislike, unrest. Do not push." },
  { id: "neutral", title: "Neutral", body: "Adukkhamasukha. Ordinary. Often overlooked. Stay." },
];

export function EmotionForm() {
  const [vedana, setVedana] = useState<Vedana | null>(null);
  const [feeling, setFeeling] = useState("");
  const [intensity, setIntensity] = useState(3);
  const [body, setBody] = useState("nostrils");
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!vedana) return;
    addEmotion({
      id: uid(),
      at: new Date().toISOString(),
      vedana,
      feeling: feeling || vedana,
      intensity,
      body,
      note: note.trim(),
    });
    setSaved(true);
    setFeeling("");
    setNote("");
    setIntensity(3);
    window.setTimeout(() => setSaved(false), 2400);
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.22em] text-muted">Vedana</p>
        <h1 className="font-display mt-2 text-[2.1rem] leading-tight sm:text-5xl">What is here, before the story?</h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-soft">
          Name the tone of sensation. Then, if you wish, name a feeling and where it sits in the
          body. Equanimity is the practice — not choosing a better mood.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-3">
        {VEDANA.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => {
              setVedana(v.id);
              setFeeling("");
            }}
            className={`rounded-2xl border px-4 py-5 text-left transition ${
              vedana === v.id ? "border-forest bg-forest text-cream" : "border-line bg-cream hover:border-moss"
            }`}
          >
            <p className="font-display text-2xl">{v.title}</p>
            <p className={`mt-2 text-sm leading-relaxed ${vedana === v.id ? "text-cream/75" : "text-muted"}`}>
              {v.body}
            </p>
          </button>
        ))}
      </div>

      {vedana && (
        <>
          <fieldset>
            <legend className="text-xs uppercase tracking-[0.16em] text-muted">A closer name</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {FEELINGS[vedana].map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFeeling(f)}
                  className={`min-h-10 rounded-full px-3 py-1.5 text-sm ${
                    feeling === f ? "bg-saffron text-cream" : "bg-sand text-ink"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="block">
            <span className="text-xs uppercase tracking-[0.16em] text-muted">Intensity · {intensity}/5</span>
            <input
              type="range"
              min={1}
              max={5}
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="mt-2 w-full accent-saffron"
            />
          </label>

          <label className="block">
            <span className="text-xs uppercase tracking-[0.16em] text-muted">Where in the body</span>
            <select
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="mt-2 w-full rounded-xl border border-line bg-cream px-3 py-2 text-base outline-none focus:border-moss sm:text-sm"
            >
              {BODY_AREAS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-xs uppercase tracking-[0.16em] text-muted">Note (optional)</span>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="No story required. A few words are enough."
              className="mt-2 w-full rounded-xl border border-line bg-cream px-3 py-2 text-base outline-none focus:border-moss sm:text-sm"
            />
          </label>

          <button type="submit" className="btn btn-forest w-full sm:w-auto">
            Record this moment
          </button>
          {saved && <p className="text-sm text-ok">Noted. Let it pass.</p>}
        </>
      )}
    </form>
  );
}
