import type { Metadata } from "next";
import { EmotionForm } from "@/components/EmotionForm";

export const metadata: Metadata = {
  title: "Feel",
};

export default function EmotionsPage() {
  return <EmotionForm />;
}
