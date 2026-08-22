import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import HostParayanaForm from "@/components/forms/HostParayanaForm";

export const metadata: Metadata = {
  title: "Host a Gita Parayana",
  description: "Host a Bhagavad Gita Parayana in your community or institution as part of the Vishwa Mahotsav 2027.",
};

export default function HostParayanaPage() {
  return (
    <>
      <PageHero
        badge="Host a Parayana"
        title="Bring the Gita to Your Community"
        subtitle="Host an official Bhagavad Gita Parayana as part of the Vishwa Mahotsav — in your temple, school, institution, or community space."
      />
      <section className="bg-white section-pad">
        <div className="container-main">
          <div className="max-w-2xl mx-auto mb-12 text-center">
            <p className="text-ink-muted font-sans text-base leading-relaxed">
              Registered host communities receive the official Mahotsav Parayana Kit — including recitation materials, guidance from trained acharyas, and recognition in the Mahotsav's global record.
            </p>
          </div>
          <HostParayanaForm />
        </div>
      </section>
    </>
  );
}
