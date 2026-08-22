import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
export const metadata: Metadata = { title: "Knowledge Partner" };
export default function KnowledgePartnerPage() {
  return (
    <ContentPage badge="Knowledge Partner" title="Knowledge Partner" subtitle="Academic institutions, think tanks, and scholarly organisations who help shape the intellectual and scholarly programme of the Mahotsav."
      body={["Knowledge Partners co-create the Gita Jnana Sabha programme, contribute scholarly content to the Mahotsav's digital archive, and co-author publications.", "Ideal for universities, research institutions, spiritual academies, and publishing houses with a focus on Indian philosophy, comparative religion, or cultural studies.", "Knowledge Partners receive co-branding on all scholarly publications, speaking opportunities in the Gita Jnana Sabha, and access to the Gita Research & Resource Centre."]}
      cta={{ label: "Apply as Knowledge Partner", href: "/partners/proposal" }} />
  );
}
