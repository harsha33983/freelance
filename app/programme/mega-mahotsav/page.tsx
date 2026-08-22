import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";

export const metadata: Metadata = { title: "Mega Bhagavad Gita Mahotsav — 27 February 2027" };

export default function MegaMahotsavPage() {
  return (
    <ContentPage
      badge="27 February 2027"
      title="Mega Bhagavad Gita Mahotsav"
      subtitle="The grand culmination of the 18-month global journey — the largest Bhagavad Gita celebration in history."
      body={[
        "The Mega Bhagavad Gita Mahotsav on 27 February 2027 is the culmination of eighteen months of preparation, pilgrimage, and practice. It is not merely a single day's event — it is the convergence of every stream of the global journey into one magnificent, unified expression.",
        "50,000+ registered participants from all 18 countries gather at the venue, joined virtually by millions around the world. The day begins before dawn with a meditative sunrise recitation and unfolds through a full programme of spiritual, cultural, and ceremonial events.",
        "The day's centrepiece is the Grand Parayana — the complete recitation of all 18 chapters of the Bhagavad Gita by the assembled gathering. This is followed by the Gita Sankalpa — the collective vow — and the formal launch of the Mahotsav's nine legacy initiatives.",
        "The Mega Mahotsav closes at dusk with a grand procession, an illumination ceremony (deepotsava), and a cultural finale featuring performances by artists from all 18 participating nations.",
      ]}
      cta={{ label: "Register for the Mega Mahotsav", href: "/participate/register" }}
    />
  );
}
