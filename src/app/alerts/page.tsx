import type { Metadata } from "next";
import { AlertsManager } from "@/components/AlertsManager";

export const metadata: Metadata = {
  title: "Alerts",
};

export default function AlertsPage() {
  return <AlertsManager />;
}
