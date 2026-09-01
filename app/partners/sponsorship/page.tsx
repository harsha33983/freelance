import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
export const metadata: Metadata = { title: "Sponsorship" };
export default function SponsorshipPage() {
  return (
    <ContentPage
      badge="Sponsorship"
      title="Sponsorship Opportunities"
      subtitle="From naming rights to programme sponsorship — a range of opportunities to fit every budget and aspiration."
      body={[
        "The Bhagavad Gita Vishwa Mahotsav offers a comprehensive range of sponsorship opportunities — from the Title Sponsorship of the entire event to individual programme and zone sponsorships.",
        "Event-level sponsorships (Title, Platinum, Gold) provide the broadest brand exposure across all Mahotsav touchpoints — digital, print, on-site, and broadcast.",
        "Programme-level sponsorships allow you to associate specifically with the Gita Jnana Sabha, the Youth Gita, the Grand Parayana, or the Cultural Programme — aligning your brand with a specific dimension of the Mahotsav.",
        "Zone sponsorships provide naming rights for specific areas of the venue — the Youth Zone, the Experience , the Contemplative Garden, or the Cultural Pavilion.",
        "All sponsorships are fully customisable. We work with each sponsor to create a package that maximises their brand impact while serving the Mahotsav's mission.",
      ]}
      cta={{ label: "Discuss Sponsorship", href: "/partners/proposal" }}
    />
  );
}
