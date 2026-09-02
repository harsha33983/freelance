import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import RegistrationForm from "@/components/forms/RegistrationForm";

export const metadata: Metadata = {
  title: "Register — Bhagavad Gita Vishwa Mahotsav 2027",
  description: "Register for the Bhagavad Gita Vishwa Mahotsav 2027 — individual, family, group, institution, or youth registration.",
};

export default function RegisterPage() {
  return (
    <>
      <PageHero
        badge="Registration"
        title="Registeration"
        subtitle="Registeration for program ."
      />
      <section className="bg-white section-pad">
        <div className="container-main">
          <RegistrationForm />
        </div>
      </section>
    </>
  );
}
