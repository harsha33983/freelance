import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import TeamSection from "@/components/team/TeamSection";

export const metadata: Metadata = {
  title: "Organising Committee | Bhagavadgita Vishwa Mahotsav 2027",
  description:
    "Meet the Organising Committee leadership for the Bhagavadgita Vishwa Mahotsav 2027: Godawarthy Sasidhar, Daitha Susheel Kumar, Vemuri Shravani, Pyreddy Krishna Reddy, Malladi Anand, and K. Satya Prasad.",
};

export default function OrganisingCommitteePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Top Page Hero */}
      <PageHero
        badge="Organising Committee"
        title="The Organising Committee"
        subtitle="The dedicated leadership team of experienced professionals and domain specialists bringing the Bhagavadgita Vishwa Mahotsav 2027 to life."
      />

      {/* Modern, Premium Team Section with Expandable Profiles */}
      <TeamSection />
    </main>
  );
}
