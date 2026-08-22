import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
export const metadata: Metadata = { title: "Press Releases" };
export default function PressReleasesPage() {
  return (
    <ContentPage badge="Press Releases" title="Press Releases"
      subtitle="Official press releases from the Bhagavad Gita Vishwa Mahotsav Trust for media publication."
      body={[
        "For media enquiries, accreditation, and exclusive interviews, please contact our Media Relations team at media@bgvmahotsav2027.org.",
        "Press Release 1 (01 Sep 2026): Bhagavad Gita Vishwa Mahotsav Trust Formally Announces Mega Mahotsav 2027 — The world's largest Bhagavad Gita celebration, spanning 18 countries, 18 chapters, and 18 languages, officially announced.",
        "Press Release 2 (01 Oct 2026): Registration Opens for Curtain Raiser — Gita Jayanti celebrations now accepting registrations across all 18 host countries.",
        "Press Release 3 (15 Oct 2026): 18 Host Countries Confirmed — Full list of host nations announced, with chapter assignments for each country.",
        "All press releases are available for download in the Press Kit section.",
      ]}
      cta={{ label: "Download Press Kit", href: "/media/press-kit" }}
    />
  );
}
