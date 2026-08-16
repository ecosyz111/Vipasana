"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { dueUnfired, kindHref } from "@/lib/alerts";
import { loadStore, markFired } from "@/lib/storage";
import type { AlertRule } from "@/lib/types";

export function AlertScheduler() {
  const [banner, setBanner] = useState<AlertRule | null>(null);

  useEffect(() => {
    const tick = () => {
      const store = loadStore();
      const due = dueUnfired(store);
      if (!due.length) return;
      const next = due[0];
      markFired(next.id);
      setBanner(next);
      if (store.notificationsEnabled && "Notification" in window && Notification.permission === "granted") {
        try {
          new Notification(next.label, {
            body: next.message,
            tag: next.id,
            silent: false,
          });
        } catch {
          /* ignore blocked notifications */
        }
      }
    };

    tick();
    const id = window.setInterval(tick, 15000);
    return () => window.clearInterval(id);
  }, []);

  if (!banner) return null;

  return (
    <div className="border-b border-saffron/40 bg-forest text-cream">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed">
          <span className="font-medium tracking-wide">{banner.label}.</span> {banner.message}
        </p>
        <div className="flex gap-2">
          <Link href={kindHref(banner.kind)} className="btn btn-saffron flex-1 py-1.5 text-sm sm:flex-none">
            Begin
          </Link>
          <button type="button" className="btn btn-ghost flex-1 border-cream/30 py-1.5 text-sm text-cream sm:flex-none" onClick={() => setBanner(null)}>
            Later
          </button>
        </div>
      </div>
    </div>
  );
}
