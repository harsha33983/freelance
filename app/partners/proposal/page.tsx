import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import PartnershipForm from "@/components/forms/PartnershipForm";

export const metadata: Metadata = {
  title: "Partnership Proposal",
  description: "Submit a partnership proposal for the Bhagavad Gita Vishwa Mahotsav 2027.",
};

export default function PartnershipProposalPage() {
  return (
    <>
      <PageHero
        badge="Partnership Proposal"
        title="Submit Your Proposal"
        subtitle="Tell us about your organisation and how you'd like to partner. Our team responds within 3 working days."
      />
      <section className="bg-white section-pad">
        <div className="container-main max-w-2xl">
          <PartnershipForm />
        </div>
      </section>
    </>
  );
}
