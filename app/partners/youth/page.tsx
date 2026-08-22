import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
export const metadata: Metadata = { title: "Youth Partner" };
export default function YouthPartnerPage() {
  return (
    <ContentPage badge="Youth Partner" title="Youth Partner" subtitle="Organisations dedicated to youth empowerment who share our commitment to equipping the next generation with the Gita's wisdom."
      body={["Youth Partners co-create the Youth Gita programme and Youth Zone experience, gaining direct access to and association with 10,000+ young participants.", "Ideal for youth-focused NGOs, student organisations, educational institutions, and brands targeting the 15–35 demographic.", "Youth Partners are founding members of the Mahotsav Youth Network — carrying the partnership's impact forward into a global community of young practitioners."]}
      cta={{ label: "Apply as Youth Partner", href: "/partners/proposal" }} />
  );
}
