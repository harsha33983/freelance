import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
export const metadata: Metadata = { title: "Curtain Raiser Programme — 20 December 2026" };
export default function CurtainRaiserProgrammePage() {
  return (
    <ContentPage
      badge="20 December 2026"
      title="Curtain Raiser Programme"
      subtitle="The inaugural event of the Bhagavad Gita Vishwa Mahotsav — launching across 18 nations simultaneously on Gita Jayanti."
      body={[
        "The Curtain Raiser programme on 20 December 2026 marks the formal beginning of the Mahotsav journey. Held on Gita Jayanti — the day the Bhagavad Gita was revealed — it is a moment of deep historical and spiritual significance.",
        "The programme includes: an inaugural address by the Patron and Spiritual Head, the ceremonial lighting of the Mahotsav Deepa, the Parayana of Chapter 1 (Arjuna Vishada Yoga), an inaugural cultural presentation, and the announcement of all 18 host countries and their chapter assignments.",
        "Simultaneously, at coordinated times, local Curtain Raiser events take place in all 18 host countries — each lighting their own inaugural Deepa and beginning their chapter preparation.",
        "The Curtain Raiser is free to attend. Registration is required to receive the event schedule and virtual streaming links.",
      ]}
      cta={{ label: "Register for the Curtain Raiser", href: "/participate/register" }}
    />
  );
}
