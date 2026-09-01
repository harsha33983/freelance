import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
export const metadata: Metadata = { title: "Four Pathways" };
export default function FourPathwaysPage() {
  return (
    <ContentPage
      badge="Four Pathways"
      title="Enter on Your Own Path"
      subtitle="Every participant enters the Mahotsav through one of four sacred gateways — each representing a distinct path of yoga taught in the Bhagavad Gita."
      body={[
        "The Mahotsav venue is designed so that every participant chooses their primary pathway into the experience — Jnana (knowledge), Karma (action), Bhakti (devotion), or Dhyana (meditation). This is not a rigid division; it is an invitation to begin the journey from your own natural inclination.",
        "The Jnana Pathway leads through discourse halls, the Experience Centre, and scholarly exhibitions. The Karma Pathway leads through community service initiatives, the Global Partnership Pavilion, and institutional displays.",
        "The Bhakti Pathway leads through the flower-adorned devotional arts space, the main stage, and the Grand Parayana ground. The Dhyana Pathway leads through the meditation gardens, yoga studios, and silent sanctuary.",
        "All four pathways converge at the central Sri Krishna mandala — a living demonstration of the Gita's teaching that all genuine paths lead to the same divine centre.",
      ]}
    />
  );
}
