export const NAV = ["Today", "Breath", "Feel", "Alerts", "Journal"] as const;

export type NavKey = (typeof NAV)[number];

export const ALERTS = [
  { time: "06:30", label: "Morning sit", note: "The hall is quiet. Sit with the breath as it is.", state: "done" },
  { time: "10:00", label: "Return to the breath", note: "One minute. Feel the breath at the nostrils.", state: "done" },
  { time: "13:00", label: "Midday check-in", note: "Name the vedana. Then let it be.", state: "done" },
  { time: "16:30", label: "Afternoon pause", note: "Come back. Three breaths.", state: "now" },
  { time: "19:00", label: "Evening sit", note: "Sit again. Watch the day leave the body.", state: "next" },
  { time: "21:30", label: "Day's review", note: "How did the mind meet the day?", state: "later" },
];

export const COLORS = [
  { name: "Stone", hex: "#F1E8D8", on: "#1B1712" },
  { name: "Cream", hex: "#FAF6EE", on: "#1B1712" },
  { name: "Forest", hex: "#1A3228", on: "#FAF6EE" },
  { name: "Moss", hex: "#2F4A3C", on: "#FAF6EE" },
  { name: "Saffron", hex: "#C56A2D", on: "#FFF8EF" },
  { name: "Sand", hex: "#E4D5BC", on: "#1B1712" },
  { name: "Sage", hex: "#7D917F", on: "#1B1712" },
  { name: "Ink", hex: "#1B1712", on: "#FAF6EE" },
];
