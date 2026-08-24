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
    "Join the global celebration of the eternal wisdom of the Bhagavad Gita. 50,000+ participants across 18 countries, 18 chapters, 18 languages. Mega Mahotsav on 27 February 2027.",
  openGraph: {
    title: "Bhagavad Gita Vishwa Mahotsav 2027",
    description: "A Global Celebration of the Eternal Wisdom of the Bhagavad Gita",
    url: "https://bgvmahotsav2027.org",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      
      {/* Media Partner Image Section */}
      <section className="w-full bg-[#FAF8F2]">
        <img 
          src="/WEBSITE%20MEDIA%20PARTNER.png" 
          alt="Media Partner" 
          className="w-full h-auto block object-cover"
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
    </>
  );
}
