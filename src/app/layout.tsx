import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { AlertScheduler } from "@/components/AlertScheduler";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Vipasana — watch the breath, name the feeling",
    template: "%s · Vipasana",
  },
  description:
    "A daily companion for Anapana and vedana: sit with the breath, note pleasant / unpleasant / neutral, and receive gentle alerts through the day.",
  manifest: "/manifest.json",
  applicationName: "Vipasana",
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#1a3228",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${cormorant.variable} antialiased bg-stone text-ink`}>
        <AlertScheduler />
        <Header />
        <main className="mx-auto min-h-[70vh] w-full max-w-5xl px-4 pb-16 pt-6">{children}</main>
      </body>
    </html>
  );
}
