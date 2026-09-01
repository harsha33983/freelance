import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
export const metadata: Metadata = { title: "Partnership Opportunities" };
export default function OpportunitiesPage() {
  return (
    <ContentPage
      badge="Partnership Opportunities"
      title="Partnership Opportunities"
      subtitle="A full overview of the ways to partner with the Bhagavad Gita Vishwa Mahotsav 2027."
      body={[
        "The Mahotsav offers partnership opportunities across eight distinct categories: Title, Platinum, Gold, Knowledge, Youth, Digital, Media, and Community. Each category is designed to align specific types of organisations with the dimension of the Mahotsav most relevant to their mission.",
        "In addition to these tiers, there are specific programme and zone sponsorships available — including sponsorship of the Grand Parayana, the Gita Jnana Sabha, the Cultural Programme, the Youth Zone, and the Experience.",
        "All partnerships are fully negotiated and customised. We do not offer one-size-fits-all packages — every partner works with our team to design a partnership that maximises mutual benefit.",
        "To explore partnership opportunities, visit our Partnership Tiers page or submit a Partnership Proposal. Our team will respond within 3 working days.",
      ]}
      cta={{ label: "View Partnership Tiers", href: "/partners" }}
    />
  );
}
