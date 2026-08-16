export type Vedana = "pleasant" | "unpleasant" | "neutral";

export type AlertKind = "sit" | "breath" | "emotion" | "review";

export type BreathMode = "observe" | "mic";

export type BreathSession = {
  id: string;
  startedAt: string;
  endedAt: string;
  durationSec: number;
  breaths: number;
  avgCycleSec: number;
  mode: BreathMode;
  note: string;
};

export type EmotionEntry = {
  id: string;
  at: string;
  vedana: Vedana;
  feeling: string;
  intensity: number;
  body: string;
  note: string;
};

export type AlertRule = {
  id: string;
  label: string;
  time: string;
  enabled: boolean;
  kind: AlertKind;
  message: string;
};

export type FiredMap = Record<string, string>;

export type Store = {
  sessions: BreathSession[];
  emotions: EmotionEntry[];
  alerts: AlertRule[];
  fired: FiredMap;
  notificationsEnabled: boolean;
  lastChimeAt: string;
};

export const FEELINGS: Record<Vedana, string[]> = {
  pleasant: ["ease", "warmth", "gratitude", "joy", "calm", "tenderness"],
  unpleasant: ["restless", "anxious", "heavy", "irritable", "sad", "tight"],
  neutral: ["still", "ordinary", "watching", "even", "quiet", "plain"],
};

export const BODY_AREAS = [
  "nostrils",
  "throat",
  "chest",
  "heart",
  "belly",
  "shoulders",
  "face",
  "whole body",
];

export const DEFAULT_ALERTS: AlertRule[] = [
  {
    id: "morning-sit",
    label: "Morning sit",
    time: "06:30",
    enabled: true,
    kind: "sit",
    message: "The hall is quiet. Sit with the breath as it is.",
  },
  {
    id: "return-breath",
    label: "Return to the breath",
    time: "10:00",
    enabled: true,
    kind: "breath",
    message: "One minute. Feel the breath at the nostrils. Do not change it.",
  },
  {
    id: "midday-vedana",
    label: "Midday check-in",
    time: "13:00",
    enabled: true,
    kind: "emotion",
    message: "Name the vedana: pleasant, unpleasant, or neutral. Then let it be.",
  },
  {
    id: "afternoon-pause",
    label: "Afternoon pause",
    time: "16:30",
    enabled: true,
    kind: "breath",
    message: "Come back. Three breaths. Equanimity toward whatever is here.",
  },
  {
    id: "evening-sit",
    label: "Evening sit",
    time: "19:00",
    enabled: true,
    kind: "sit",
    message: "Sit again. Watch the day leave the body.",
  },
  {
    id: "days-review",
    label: "Day's review",
    time: "21:30",
    enabled: true,
    kind: "review",
    message: "How did the mind meet the day? Note it without a story.",
  },
];
