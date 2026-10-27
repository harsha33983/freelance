import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ConnectSocialHub from "@/components/connect/ConnectSocialHub";

export const metadata: Metadata = {
  title: "Connect With Us | Bhagavadgita Vishwa Mahotsav 2027",
  description:
    "Connect with us across our official social media platforms and follow our journey of sharing the timeless wisdom of the Bhagavad Gita with the world.",
};

export default function ConnectPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Page Hero matching the rest of the website */}
      <PageHero
        badge="Official Channels"
        title="Connect With Us"
        subtitle="Follow our journey across our official platforms and stay connected with the global movement of the Bhagavad Gita."
      />

      {/* Main Content Section */}
      <section className="bg-cream/40 section-pad relative overflow-hidden">
        {/* Subtle Decorative Ambient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none" />

        <div className="container-main relative">
          <ConnectSocialHub />
        </div>
      </section>
    </main>
  );
}
