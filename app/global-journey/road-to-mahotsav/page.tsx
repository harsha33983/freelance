import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import RoadTimeline from "@/components/global-journey/RoadTimeline";

export const metadata: Metadata = {
  title: "Road to 27 February 2027",
  description: "The complete timeline of events leading from the Curtain Raiser to the Mega Bhagavad Gita Mahotsav on 27 February 2027.",
};

export default function RoadToMahotsavPage() {
  return (
    <>
      <PageHero
        badge="The Timeline"
        title="Road to 27 February 2027"
        subtitle="Every milestone on the journey from the Curtain Raiser to the Mega Mahotsav — eighteen months of sacred preparation."
      />
      <RoadTimeline />
    </>
  );
}
