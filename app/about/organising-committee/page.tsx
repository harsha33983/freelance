import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
export const metadata: Metadata = { title: "Organising Committee" };
export default function OrganisingCommitteePage() {
  return (
    <ContentPage
      badge="Organising Committee"
      title="The Organising Committee"
      subtitle="The dedicated team of professionals and volunteers bringing the Mahotsav to life."
      body={[
        "The Organising Committee comprises over 200 dedicated professionals and senior volunteers responsible for the planning, execution, and delivery of the Bhagavad Gita Vishwa Mahotsav 2027.",
        "The Committee is organised into specialised sub-committees covering: Programme & Content, Venue & Logistics, Registration & Participant Services, Media & Communications, Technology & Digital, Partnerships & Sponsorship, International Relations, Youth & Education, and Finance & Governance.",
        "Each sub-committee is led by an experienced professional with deep expertise in their field, supported by a team of dedicated staff and volunteers.",
        "We are deeply grateful to the many hundreds of volunteers — most of them Gita practitioners themselves — who have offered their time, skills, and energy in the spirit of karma yoga.",
      ]}
    />
  );
}
