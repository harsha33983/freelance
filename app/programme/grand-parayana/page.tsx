import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
export const metadata: Metadata = { title: "Grand Parayana" };
export default function GrandParayanaPage() {
  return (
    <ContentPage
      badge="Programme"
      title="Grand Gita Parayana"
      subtitle="50,000 voices. 700 verses. One act of collective sacred attention."
      body={[
        "The Grand Gita Parayana is the centrepiece of the Mega Mahotsav — a complete recitation of all 18 chapters of the Bhagavad Gita by the assembled gathering of 50,000+ participants.",
        "Led by trained parayana acharyas, the recitation will proceed chapter by chapter, with each chapter dedicated to its host country and spiritual tradition. The entire recitation is expected to take approximately three hours.",
        "All participants — regardless of their linguistic background — are invited to recite together in Sanskrit, with transliteration support provided in all 18 languages. The collective vibration of 50,000 voices reciting the Gita together is considered by spiritual authorities to be one of the most powerful forms of collective sadhana possible.",
        "The Parayana will be live-streamed globally with real-time translation and commentary in all 18 languages, enabling millions of additional participants around the world to join the recitation from their homes.",
      ]}
      cta={{ label: "Register to Participate", href: "/participate/register" }}
    />
  );
}
