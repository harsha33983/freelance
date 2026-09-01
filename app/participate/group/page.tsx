import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import RegistrationForm from "@/components/forms/RegistrationForm";

export const metadata: Metadata = { title: "Group Registration" };
export default function GroupPage() {
  return (
    <>
      <PageHero badge="Group Registration" title="Register Your Group" subtitle="group of people can register." />
      <section className="bg-white section-pad">
        <div className="container-main"><RegistrationForm /></div>
      </section>
    </>
  );
}
