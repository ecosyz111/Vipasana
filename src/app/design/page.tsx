import type { Metadata } from "next";
import { Frame, PageLabel } from "@/figma/chrome";
import {
  AlertsDesktop,
  AlertsMobile,
  BannerDesktop,
  BreathDone,
  BreathMobile,
  BreathReady,
  BreathSitting,
  Components,
  CoverDesktop,
  FeelDetail,
  FeelMobile,
  FeelSelect,
  Foundations,
  JournalDesktop,
  JournalMobile,
  TodayDesktop,
  TodayDesktopBells,
  TodayMobile,
} from "@/figma/screens";

export const metadata: Metadata = {
  title: "Figma pages",
};

export default function DesignPage() {
  return (
    <div className="min-h-screen bg-[#2c2c2c] text-white">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#1e1e1e] px-4 py-4 sm:px-8">
        <p className="text-[11px] uppercase tracking-[0.22em] text-[#8d8d8d]">Figma file · Vipasana</p>
        <h1 className="font-display mt-1 text-2xl sm:text-3xl">Pages and frames</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#b3b3b3]">
          Desktop 1440 and mobile 390 artboards for import into Figma via{" "}
          <a className="text-[#e4d5bc] underline-offset-4 hover:underline" href="https://html.to.design">
            html.to.design
          </a>
          . Open a page HTML from <code className="text-[#e4d5bc]">/figma/</code> and import, or capture this
          board. Frames scale to the screen on a phone.
        </p>
      </header>

      <div className="space-y-12 px-4 py-8 sm:space-y-16 sm:px-8 sm:py-12">
        <section>
          <PageLabel>01 · Cover</PageLabel>
          <div className="flex flex-col gap-10">
            <Frame name="Cover / Desktop" width={1440} height={900}>
              <CoverDesktop />
            </Frame>
          </div>
        </section>

        <section>
          <PageLabel>02 · Foundations</PageLabel>
          <div className="flex flex-col gap-10">
            <Frame name="Foundations / Tokens" width={1440} height={900}>
              <Foundations />
            </Frame>
            <Frame name="Foundations / Components" width={1440} height={900}>
              <Components />
            </Frame>
          </div>
        </section>

        <section>
          <PageLabel>03 · Today</PageLabel>
          <div className="flex flex-col gap-10">
            <Frame name="Today / Desktop — Home" width={1440} height={1024}>
              <TodayDesktop />
            </Frame>
            <Frame name="Today / Desktop — Bells" width={1440} height={1024}>
              <TodayDesktopBells />
            </Frame>
            <Frame name="Today / Mobile" width={390} height={844}>
              <TodayMobile />
            </Frame>
          </div>
        </section>

        <section>
          <PageLabel>04 · Breath</PageLabel>
          <div className="flex flex-col gap-10">
            <Frame name="Breath / Ready" width={1440} height={1024}>
              <BreathReady />
            </Frame>
            <Frame name="Breath / Sitting" width={1440} height={1024}>
              <BreathSitting />
            </Frame>
            <Frame name="Breath / Complete" width={1440} height={1100}>
              <BreathDone />
            </Frame>
            <Frame name="Breath / Mobile" width={390} height={844}>
              <BreathMobile />
            </Frame>
          </div>
        </section>

        <section>
          <PageLabel>05 · Feel</PageLabel>
          <div className="flex flex-col gap-10">
            <Frame name="Feel / Select vedana" width={1440} height={900}>
              <FeelSelect />
            </Frame>
            <Frame name="Feel / Detail" width={1440} height={1024}>
              <FeelDetail />
            </Frame>
            <Frame name="Feel / Mobile" width={390} height={844}>
              <FeelMobile />
            </Frame>
          </div>
        </section>

        <section>
          <PageLabel>06 · Alerts</PageLabel>
          <div className="flex flex-col gap-10">
            <Frame name="Alerts / Desktop" width={1440} height={1200}>
              <AlertsDesktop />
            </Frame>
            <Frame name="Alerts / Mobile" width={390} height={844}>
              <AlertsMobile />
            </Frame>
            <Frame name="Alerts / In-app banner" width={1440} height={520}>
              <BannerDesktop />
            </Frame>
          </div>
        </section>

        <section>
          <PageLabel>07 · Journal</PageLabel>
          <div className="flex flex-col gap-10">
            <Frame name="Journal / Desktop" width={1440} height={1024}>
              <JournalDesktop />
            </Frame>
            <Frame name="Journal / Mobile" width={390} height={844}>
              <JournalMobile />
            </Frame>
          </div>
        </section>
      </div>
    </div>
  );
}
