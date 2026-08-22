import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import VolunteerForm from "@/components/forms/VolunteerForm";

export const metadata: Metadata = {
  title: "Volunteer — Bhagavad Gita Vishwa Mahotsav 2027",
  description: "Volunteer for the Bhagavad Gita Vishwa Mahotsav 2027 — offer your seva to the world's largest Gita celebration.",
};

export default function VolunteerPage() {
  return (
    <>
      <PageHero
        badge="Volunteer"
        title="Offer Your Seva"
        subtitle="The Mahotsav runs on the energy of hundreds of dedicated volunteers — practitioners who bring the Gita's teachings on selfless action to life."
      />
      <section className="bg-white section-pad">
        <div className="container-main">
          <div className="max-w-2xl mx-auto mb-12 text-center">
            <p className="text-ink-muted font-sans text-base leading-relaxed">
              Volunteering for the Mahotsav is not merely logistical service — it is karma yoga. Every act of seva, however small, contributes to an event that will touch millions of lives.
            </p>
          </div>
          <VolunteerForm />
        </div>
      </section>
    </>
  );
}
