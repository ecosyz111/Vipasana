import type { Metadata } from "next";
import { JournalList } from "@/components/JournalList";

export const metadata: Metadata = {
  title: "Journal",
};

export default function JournalPage() {
  return <JournalList />;
}
