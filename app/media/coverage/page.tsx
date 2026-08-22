import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
export const metadata: Metadata = { title: "Media Coverage" };
export default function CoveragePage() {
  return (
    <ContentPage badge="Media Coverage" title="Media Coverage"
      subtitle="Press and media coverage of the Bhagavad Gita Vishwa Mahotsav 2027 from around the world."
      body={[
        "Media coverage of the Mahotsav will be curated and published here as the event builds momentum.",
        "For accreditation as a media partner or for press credentials at Mahotsav events, please contact media@bgvmahotsav2027.org.",
        "We welcome coverage from news organisations, cultural publications, spiritual media, and digital content creators across all 18 participating countries and beyond.",
      ]}
      cta={{ label: "Become a Media Partner", href: "/partners/media" }}
    />
  );
}
