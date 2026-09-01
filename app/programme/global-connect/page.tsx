import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
export const metadata: Metadata = { title: "Global Connect" };
export default function GlobalConnectPage() {
  return (
    <ContentPage
      badge="26 February 2027"
      title="Global Connect"
      subtitle="Live-streamed chapter recitations connecting all 18 host countries simultaneously — the Gita goes truly global."
      body={[
        "Global Connect Day brings together all 18 host countries in a single live-streamed event — a rolling programme of chapter recitations, country reports, and spiritual greetings that spans every time zone.",
        "Each participating country presents a brief report on their chapter event — the highlights, the community response, and the key teachings they took from their chapter. This creates a rich mosaic of global Gita engagement.",
        "The day culminates in a live global hookup of all 18 countries simultaneously — a few minutes of shared silence followed by a joint recitation of the Gita's final verse in all 18 languages.",
        "Global Connect Day is open to virtual participation from anywhere in the world. Register to receive the streaming link and schedule.",
      ]}
      cta={{ label: "Register for Virtual Access", href: "/participate/global" }}
    />
  );
}
