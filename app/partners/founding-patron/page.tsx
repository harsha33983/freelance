import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
export const metadata: Metadata = { title: "Founding Patron" };
export default function FoundingPatronPage() {
  return (
    <ContentPage
      badge="Founding Patron"
      title="Become a Founding Patron"
      subtitle="A unique, once-in-a-lifetime opportunity to be inscribed in the permanent legacy of the Bhagavad Gita Vishwa Mahotsav as a Founding Patron."
      body={[
        "The Founding Patron designation is the highest form of association with the Bhagavad Gita Vishwa Mahotsav 2027 — reserved for individuals or organisations who make an exceptional contribution to the Mahotsav's mission.",
        "Founding Patrons are recognised at every level of the Mahotsav — from the inaugural ceremony to the permanent legacy archive. Their names are inscribed on the Foundation Stone of the Gita Research & Resource Centre — the Mahotsav's most enduring legacy initiative.",
        "Founding Patronship is by invitation only. However, organisations and individuals may express their interest through the Partnership Proposal form, and the Trustees will consider all applications.",
        "The Founding Patron's contribution supports the Mahotsav's most ambitious legacy goals — ensuring that the Gita's wisdom continues to reach and transform lives long after 27 February 2027.",
      ]}
      cta={{ label: "Express Your Interest", href: "/partners/proposal" }}
    />
  );
}
