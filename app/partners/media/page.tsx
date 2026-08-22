import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
export const metadata: Metadata = { title: "Media Partner" };
export default function MediaPartnerPage() {
  return (
    <ContentPage badge="Media Partner" title="Media Partner" subtitle="News organisations, broadcasters, and digital media platforms who help the Mahotsav reach its global audience."
      body={["Media Partners receive official designation, press access at all events, co-branded digital content, and exclusive pre-event content and interviews.", "We are seeking Media Partners across television, print, digital, podcast, and social media — with preference for outlets with strong cultural, spiritual, or general interest audiences.", "Media Partnership is structured to benefit both parties — we provide exclusive access and content; you provide reach and amplification to the Mahotsav's global audience."]}
      cta={{ label: "Apply as Media Partner", href: "/partners/proposal" }} />
  );
}
