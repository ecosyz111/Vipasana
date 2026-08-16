import { NAV, type NavKey } from "./data";

export function Frame({
  name,
  width,
  height,
  children,
}: {
  name: string;
  width: number;
  height: number;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full" style={{ containerType: "inline-size" }}>
      <p className="mb-2 font-mono text-[11px] tracking-wide text-[#b8b8b8]">{name}</p>
      <div
        className="relative overflow-hidden bg-stone text-ink"
        style={{
          width: `min(100%, ${width}px)`,
          height: `min(${height}px, calc(${height} * 100cqi / ${width}))`,
          boxShadow: "0 0 0 1px #00000022",
        }}
      >
        <div
          className="absolute left-0 top-0"
          style={{
            width,
            height,
            transform: `scale(min(1, calc(100cqi / ${width})))`,
            transformOrigin: "top left",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export function AppNav({ active }: { active: NavKey }) {
  return (
    <header className="border-b border-line/80 bg-cream">
      <div className="flex items-center justify-between px-5 py-3">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-forest">
            <span className="h-3 w-3 rounded-full bg-saffron" />
          </span>
          <span className="font-display text-2xl leading-none">Vipasana</span>
        </div>
        <nav className="flex gap-1">
          {NAV.map((l) => (
            <span
              key={l}
              className={`rounded-full px-3 py-1.5 text-sm ${
                active === l ? "bg-forest text-cream" : "text-ink-soft"
              }`}
            >
              {l}
            </span>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function PhoneNav({ active }: { active: NavKey }) {
  return (
    <header className="border-b border-line/80 bg-cream px-4 py-3">
      <div className="flex items-center gap-2">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-forest">
          <span className="h-2.5 w-2.5 rounded-full bg-saffron" />
        </span>
        <span className="font-display text-xl leading-none">Vipasana</span>
      </div>
      <nav className="mt-3 flex flex-wrap gap-1">
        {NAV.map((l) => (
          <span
            key={l}
            className={`rounded-full px-2.5 py-1 text-xs ${
              active === l ? "bg-forest text-cream" : "text-ink-soft"
            }`}
          >
            {l}
          </span>
        ))}
      </nav>
    </header>
  );
}

export function PageLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="sticky left-0 mb-6 mt-4">
      <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#8a8a8a]">{children}</p>
    </div>
  );
}
