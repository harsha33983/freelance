import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
export const metadata: Metadata = { title: "Institutional Partners" };
export default function InstitutionalPartnersPage() {
  return (
    <ContentPage
      badge="Institutional Partners"
      title="Institutional Partners"
      subtitle="The academic, spiritual, and civic institutions whose partnership makes the Mahotsav possible."
      body={[
        "The Bhagavad Gita Vishwa Mahotsav is supported by a growing network of institutional partners — universities, spiritual organisations, cultural institutions, NGOs, and government bodies — from across India and the 18 participating countries.",
        "Institutional partners play a vital role in the Mahotsav ecosystem: they contribute expertise, resources, networks, and credibility; they host chapter events in their host countries; and they carry the Mahotsav's legacy into their own programmes and communities.",
        "We welcome applications from institutions wishing to join the Mahotsav as institutional partners. Partnership opportunities range from local chapter event hosts to global knowledge partners.",
        "To enquire about institutional partnership, please contact our Partnerships team or submit a Partnership Proposal through the Partners section of this website.",
      ]}
      cta={{ label: "Partner With Us", href: "/partners/proposal" }}
    />
  );
}
