import type { Store, Vedana } from "./types";
import { localDay, todayKey, todaysEmotions, todaysSessions } from "./storage";

export function todayInsight(store: Store): string {
  const sits = todaysSessions(store);
  const feelings = todaysEmotions(store);
  const minutes = Math.round(sits.reduce((n, s) => n + s.durationSec, 0) / 60);
  const breaths = sits.reduce((n, s) => n + s.breaths, 0);
  const counts = countVedana(feelings.map((e) => e.vedana));

  if (sits.length === 0 && feelings.length === 0) {
    return "Nothing to measure yet. The practice begins when you notice the next breath.";
  }
  if (sits.length === 0 && feelings.length > 0) {
    return "You named what was here. Sit with it later — observation without a cushion still counts.";
  }
  if (counts.unpleasant >= 3 && counts.unpleasant > counts.pleasant) {
    return "Unpleasant vedana visited often. Stay with the breath at the nostrils. Do not push the feeling away.";
  }
  if (counts.pleasant >= 3 && minutes >= 10) {
    return "Pleasant states are present. Watch them with the same evenness you would give difficulty.";
  }
  if (minutes >= 40) {
    return `${minutes} minutes on the cushion today. Let the rest of the day be a continuation, not a performance.`;
  }
  if (breaths >= 40) {
    return `${breaths} breaths counted. Each one already complete. The next one does not need improving.`;
  }
  if (feelings.length >= 4) {
    return "Several check-ins today. The point is not to collect moods — it is to see them arise and pass.";
  }
  return `${minutes} min of sitting, ${feelings.length} check-in${feelings.length === 1 ? "" : "s"}. Return, again, without hurry.`;
}

export function countVedana(list: Vedana[]) {
  return list.reduce(
    (acc, v) => {
      acc[v] += 1;
      return acc;
    },
    { pleasant: 0, unpleasant: 0, neutral: 0 },
  );
}

export function streakDays(store: Store) {
  const days = new Set(store.sessions.map((s) => localDay(s.startedAt)));
  let n = 0;
  const d = new Date();
  for (let i = 0; i < 365; i++) {
    const key = todayKey(d);
    if (!days.has(key)) {
      if (i === 0) {
        d.setDate(d.getDate() - 1);
        continue;
      }
      break;
    }
    n += 1;
    d.setDate(d.getDate() - 1);
  }
  return n;
}
