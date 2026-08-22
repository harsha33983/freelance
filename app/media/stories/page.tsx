import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
export const metadata: Metadata = { title: "Stories" };
export default function StoriesPage() {
  return (
    <ContentPage badge="Stories" title="Stories of the Mahotsav"
      subtitle="Personal stories of transformation, community, and the living power of the Bhagavad Gita."
      body={[
        "Stories are the living testimony of the Mahotsav's purpose. This page will be populated with personal accounts from participants, volunteers, and communities as the journey unfolds.",
        "If you have a story to share — of how the Bhagavad Gita has transformed your life, or of your community's Gita practice — we invite you to write to us at stories@bgvmahotsav2027.org.",
        "Selected stories will be published here, in the Mahotsav's printed publications, and shared through our social media channels.",
      ]}
    />
  );
}
