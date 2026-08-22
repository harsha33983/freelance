import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
export const metadata: Metadata = { title: "Cultural Programme" };
export default function CulturalPage() {
  return (
    <ContentPage
      badge="25 February 2027"
      title="Cultural Programme"
      subtitle="Classical dance, devotional music, theatrical depictions, and living art — the Bhagavad Gita expressed through every form of human creativity."
      body={[
        "The Cultural Programme of the Mahotsav is a full-day festival of arts dedicated to the Bhagavad Gita — featuring classical, folk, and contemporary expressions of the Gita's stories and teachings.",
        "Highlights include: Bharatanatyam presentations of the Kurukshetra scene, Carnatic and Hindustani vocal performances of Gita slokas, a theatrical production depicting the full arc of the Gita's revelation, devotional kirtan from traditions across India and the world, and an international folk arts showcase from the 18 participating countries.",
        "The Cultural Programme takes place on an open-air stage accommodating 10,000 audience members, with live-streaming to the global audience.",
        "The programme also features an Art of the Gita Exhibition — a curated display of paintings, sculptures, and installations created specifically for the Mahotsav by artists from all 18 participating countries.",
      ]}
    />
  );
}
