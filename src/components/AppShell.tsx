"use client";

import { usePathname } from "next/navigation";
import { AlertScheduler } from "@/components/AlertScheduler";
import { Header } from "@/components/Header";

export function AppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  if (path.startsWith("/design") || path.startsWith("/figma")) {
    return <>{children}</>;
  }
  return (
    <>
      <AlertScheduler />
      <Header />
      <main className="mx-auto min-h-[70vh] w-full max-w-5xl px-4 pb-[calc(5.75rem+env(safe-area-inset-bottom))] pt-5 sm:px-6 sm:pt-6 md:pb-16">
        {children}
      </main>
    </>
  );
}
