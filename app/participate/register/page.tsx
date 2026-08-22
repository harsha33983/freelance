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
        title="Register for the Mahotsav"
        subtitle="Secure your place at the world's largest Bhagavad Gita celebration — 27 February 2027."
      />
      <section className="bg-white section-pad">
        <div className="container-main">
          <RegistrationForm />
        </div>
      </section>
    </>
  );
}
