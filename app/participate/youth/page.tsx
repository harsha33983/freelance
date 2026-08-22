import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import RegistrationForm from "@/components/forms/RegistrationForm";

export const metadata: Metadata = { title: "Youth Participation" };
export default function YouthPage() {
  return (
    <>
      <PageHero badge="Youth Participation" title="For Ages 15–35" subtitle="Special youth registration gives you access to the full Youth Gita programme, the Youth Zone, and the inaugural Mahotsav Youth Network." />
      <section className="bg-white section-pad">
        <div className="container-main"><RegistrationForm /></div>
      </section>
    </>
  );
}
