import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import RegistrationForm from "@/components/forms/RegistrationForm";

export const metadata: Metadata = {
  title: "Donor Registration — Bhagavad Gita Vishwa Mahotsav 2027",
  description: "Register as a donor for the Bhagavad Gita Vishwa Mahotsav 2027 to support the movement.",
};

export default function DonorPage() {
  return (
    <>
      <PageHero
        badge="Donation"
        title="Support the Mahotsav"
        subtitle="Financial contributions empower the scale of the world's largest Bhagavad Gita celebration."
      />
      <section className="bg-white section-pad">
        <div className="container-main">
          <RegistrationForm isDonorFlow={true} />
        </div>
      </section>
    </>
  );
}
