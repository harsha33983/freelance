import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import RegistrationForm from "@/components/forms/RegistrationForm";

export const metadata: Metadata = { title: "Group Registration" };
export default function GroupPage() {
  return (
    <>
      <PageHero badge="Group Registration" title="Register Your Group" subtitle="Groups of 10 or more receive special group rates, a dedicated group coordinator, and block seating arrangements." />
      <section className="bg-white section-pad">
        <div className="container-main"><RegistrationForm /></div>
      </section>
    </>
  );
}
