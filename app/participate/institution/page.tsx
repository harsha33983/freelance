import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import RegistrationForm from "@/components/forms/RegistrationForm";

export const metadata: Metadata = { title: "Institution Participation" };
export default function InstitutionPage() {
  return (
    <>
      <PageHero badge="Institution Participation" title="Register Your Institution" subtitle="Schools, universities, temples, and organisations can register as institutional participants — with dedicated benefits and recognition." />
      <section className="bg-white section-pad">
        <div className="container-main"><RegistrationForm /></div>
      </section>
    </>
  );
}
