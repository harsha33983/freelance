import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
export const metadata: Metadata = { title: "Global Participation" };
export default function GlobalParticipationPage() {
  return (
    <ContentPage
      badge="Global Participation"
      title="Participate From Your Country"
      subtitle="You don't need to be in India to be part of the Vishwa Mahotsav — join the global movement from wherever you are."
      body={[
        "Global participation in the Bhagavad Gita Vishwa Mahotsav takes many forms. You can register as a virtual participant to receive the live-stream of all main events; you can join or host a local chapter event in your country; you can take the Global Gita Sankalpa from your home; or you can travel to India for the Mega Mahotsav itself.",
        "For participants based in one of the 18 host countries, we encourage engagement with your country's chapter event — a dedicated local celebration of the assigned Gita chapter, hosted by local spiritual organisations and partners.",
        "Virtual participants receive: full live-stream access to all main events, a digital participation certificate, access to the Mahotsav digital archive, and enrollment in the Global Gita Maitri Network.",
        "Global participation is free for virtual access. Physical attendance requires registration and, for some sessions, a modest fee to cover logistics.",
      ]}
      cta={{ label: "Register for Virtual Access", href: "/participate/register" }}
    />
  );
}
