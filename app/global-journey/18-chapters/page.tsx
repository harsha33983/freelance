import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ChaptersGrid from "@/components/global-journey/ChaptersGrid";

export const metadata: Metadata = {
  title: "18 Chapters",
  description: "All 18 chapters of the Bhagavad Gita — each celebrated in a different country as part of the Vishwa Mahotsav 2027 global journey.",
};

export default function ChaptersPage() {
  return (
    <>
      <PageHero
        badge="18 Chapters"
        title="Every Chapter. Every Country."
        subtitle="Each of the 18 chapters of the Bhagavad Gita is assigned to a host country — creating an unprecedented global tapestry of Gita wisdom, recitation, and celebration."
      />
      <ChaptersGrid />
    </>
  );
}
