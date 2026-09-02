import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
export const metadata: Metadata = { title: "50,000+ Participants" };
export default function ParticipantsPage() {
  return (
    <ContentPage
      badge="50,000+ Participants"
      title="A World United in Wisdom"
      subtitle="The Mahotsav will bring together the largest gathering of Bhagavad Gita practitioners in recorded history."
      body={[
        "50,000+ registered participants will converge at the Mahotsav venue from all 18 participating countries — making this the largest Bhagavad Gita gathering in history.",
        "Participants include: individual seekers and practitioners, families with children (dedicated family programme available), institutional delegations from schools, universities, and spiritual organisations, youth groups (age 15–35), and international delegations from each host country.",
        "In addition to physical attendees, the Mahotsav's virtual participation platform is expected to reach over 5 million simultaneous viewers on 27 February 2027, with the full event archive reaching many millions more.",
        "Every registered participant — physical or virtual — is a full member of the Mahotsav community. All participants receive a participation certificate, access to the digital archive, and enrollment in the Global Gita Maitri Network.",
      ]}
      cta={{ label: "Register Now", href: "/participate/register" }}
    />
  );
}
