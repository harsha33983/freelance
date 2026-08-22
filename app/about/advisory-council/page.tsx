import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
export const metadata: Metadata = { title: "Advisory Council" };
export default function AdvisoryCouncilPage() {
  return (
    <ContentPage
      badge="Advisory Council"
      title="The Advisory Council"
      subtitle="Distinguished scholars, spiritual leaders, cultural figures, and public intellectuals who guide the vision and content of the Mahotsav."
      body={[
        "The Advisory Council of the Bhagavad Gita Vishwa Mahotsav comprises eminent individuals drawn from the worlds of spiritual practice, Gita scholarship, classical arts, education, governance, and international affairs.",
        "The Council meets quarterly to review the Mahotsav's progress, advise on programme content, ensure fidelity to the Gita's teachings, and help navigate the complex cultural and cross-national dimensions of the event.",
        "The Council operates as a body of collective wisdom — its recommendations are given serious weight in all major decisions, while the Trust's governance structure ensures clear accountability and operational effectiveness.",
        "Members of the Advisory Council include some of India's most respected Gita scholars and teachers, as well as distinguished international figures who have dedicated their lives to the study and practice of the Gita's teachings.",
      ]}
    />
  );
}
