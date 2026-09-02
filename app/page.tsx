import type { Metadata } from "next";
import HeroSlider from "@/components/home/HeroSlider";
import OpeningStatement from "@/components/home/OpeningStatement";
import SignatureGrid from "@/components/home/SignatureGrid";
import JourneyTimeline from "@/components/home/JourneyTimeline";
import ProgrammeHighlights from "@/components/home/ProgrammeHighlights";
import ClosingCTA from "@/components/home/ClosingCTA";
import GoldDivider from "@/components/ui/GoldDivider";

export const metadata: Metadata = {
  title: "Bhagavad Gita Vishwa Mahotsav 2027 — 18 Countries • 18 Chapters • 18 Languages",
  description:
    "Join the Vishwa Mahotsav of the eternal wisdom of the Bhagavad Gita. 50,000+ participants across 18 countries, 18 chapters, 18 languages. Mega Mahotsav on 27 February 2027.",
  alternates: {
    canonical: "https://divineaura.world",
  },
  openGraph: {
    title: "Bhagavad Gita Vishwa Mahotsav 2027",
    description: "A Vishwa Mahotsav of the Eternal Wisdom of the Bhagavad Gita",
    url: "https://divineaura.world",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      
      {/* Media Partner Image Section */}
      <section className="w-full bg-[#FAF8F2]">
        <img 
          src="/partners.png" 
          alt="Official Partners for Bhagavad Gita Vishwa Mahotsav 2027" 
          className="w-full h-auto block object-cover"
          loading="eager"
          fetchPriority="high"
        />
      </section>
      <OpeningStatement />
      <GoldDivider className="container-main" />
      <SignatureGrid />
      <GoldDivider className="container-main" />
      <JourneyTimeline />
      <GoldDivider className="container-main" />
      <ProgrammeHighlights />
      <ClosingCTA />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            "name": "Bhagavad Gita Vishwa Mahotsav 2027",
            "startDate": "2027-02-27",
            "endDate": "2027-02-27",
            "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
            "eventStatus": "https://schema.org/EventScheduled",
            "location": {
              "@type": "Place",
              "name": "Global Locations (18 Countries)"
            },
            "image": [
              "https://divineaura.world/og-image.jpg"
            ],
            "description": "Join the Vishwa Mahotsav of the eternal wisdom of the Bhagavad Gita. 50,000+ participants across 18 countries, 18 chapters, 18 languages.",
            "organizer": {
              "@type": "Organization",
              "name": "Bhagavad Gita Vishwa Mahotsav",
              "url": "https://divineaura.world"
            }
          })
        }}
      />
    </>
  );
}
