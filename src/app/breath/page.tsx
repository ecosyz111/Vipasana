import type { Metadata } from "next";
import { BreathStudio } from "@/components/BreathStudio";

export const metadata: Metadata = {
  title: "Breath",
};

export default function BreathPage() {
  return <BreathStudio />;
}
