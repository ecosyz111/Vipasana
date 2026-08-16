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
    <>
      <header className="sticky top-0 z-30 border-b border-line/80 bg-cream/90 pt-[env(safe-area-inset-top)] backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link href="/" className="flex min-w-0 items-center gap-2.5">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest">
              <span className="h-3 w-3 rounded-full bg-saffron" />
            </span>
            <span className="font-display text-2xl leading-none tracking-tight">Vipasana</span>
          </Link>
          <nav className="hidden gap-1 md:flex">
            {links.map((l) => (
              <NavLink key={l.href} href={l.href} label={l.label} active={isActive(path, l.href)} />
            ))}
          </nav>
        </div>
      </header>
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm md:hidden">
        <div className="grid grid-cols-5">
          {links.map((l) => {
            const active = isActive(path, l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`flex min-h-12 flex-col items-center justify-center px-1 text-[11px] tracking-wide ${
                  active ? "text-forest" : "text-muted"
                }`}
              >
                <span className={`mb-1 h-1 w-1 rounded-full ${active ? "bg-saffron" : "bg-transparent"}`} />
                {l.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

function isActive(path: string, href: string) {
  return href === "/" ? path === "/" : path.startsWith(href);
}

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`rounded-full px-3 py-1.5 text-sm ${active ? "bg-forest text-cream" : "text-ink-soft hover:bg-sand"}`}
    >
      {label}
    </Link>
  );
}
