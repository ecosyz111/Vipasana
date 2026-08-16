"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Today" },
  { href: "/breath", label: "Breath" },
  { href: "/emotions", label: "Feel" },
  { href: "/alerts", label: "Alerts" },
  { href: "/journal", label: "Journal" },
];

export function Header() {
  const path = usePathname();

  return (
    <header className="border-b border-line/80 bg-cream/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-forest">
            <span className="h-3 w-3 rounded-full bg-saffron" />
          </span>
          <span className="font-display text-2xl leading-none tracking-tight">Vipasana</span>
        </Link>
        <nav className="flex flex-wrap gap-1">
          {links.map((l) => {
            const active = path === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-full px-3 py-1.5 text-sm ${
                  active ? "bg-forest text-cream" : "text-ink-soft hover:bg-sand"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
